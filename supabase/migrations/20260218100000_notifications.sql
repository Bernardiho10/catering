-- Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'order_status' CHECK (type IN ('order_status', 'reward', 'promo', 'system')),
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Policies for Notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications (mark as read)" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Function to handle order status notifications
CREATE OR REPLACE FUNCTION public.handle_order_status_notification()
RETURNS TRIGGER AS $$
DECLARE
    user_name TEXT;
    notification_title TEXT;
    notification_message TEXT;
BEGIN
    -- Only notify if status changed to 'completed' or 'delivered' or 'out_for_delivery'
    IF (NEW.status <> OLD.status) AND (NEW.status IN ('preparing', 'out_for_delivery', 'delivered', 'completed')) THEN
        
        -- Get user full name
        SELECT full_name INTO user_name FROM public.users WHERE id = NEW.user_id;
        
        notification_title := 'Order Update';
        
        CASE NEW.status
            WHEN 'preparing' THEN
                notification_message := 'Your order #' || NEW.id || ' is being prepared with love!';
            WHEN 'out_for_delivery' THEN
                notification_message := 'Your treats are on the way! The Treats Truck is nearby.';
            WHEN 'delivered' THEN
                notification_message := 'Order #' || NEW.id || ' has been delivered. Enjoy your blessing!';
            WHEN 'completed' THEN
                notification_message := 'Order #' || NEW.id || ' is officially complete. Thank you for choosing The A Cake!';
            ELSE
                notification_message := 'Your order status has been updated to ' || NEW.status;
        END CASE;

        -- Insert In-App Notification
        INSERT INTO public.notifications (user_id, title, message, type)
        VALUES (NEW.user_id, notification_title, notification_message, 'order_status');

        -- NOTE: For Email notifications, we could use an Edge Function or a pg_net request here.
        -- For now, we rely on the In-App notification system.
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for order status updates
DROP TRIGGER IF EXISTS on_order_status_change ON public.orders;
CREATE TRIGGER on_order_status_change
    AFTER UPDATE OF status ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_order_status_notification();
