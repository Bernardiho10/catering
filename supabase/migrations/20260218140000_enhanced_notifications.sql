-- Database Webhooks for Notifications
-- Note: These usually require the 'supabase_functions' extension and are often managed in the dashboard,
-- but we can define the triggers here if using the 'net' extension or similar.
-- However, for Supabase Edge Functions, the standard way is using the dashboard "Database Webhooks" feature.
-- Since I can only run SQL, I will ensure the orders table has a trigger that hits an endpoint if possible,
-- OR I will assume the user will enable Webhooks in the dashboard pointing to the deployed function.
-- Actually, let's verify if we can use the 'http' or 'net' extension.

-- For this simulation, I'll create a simple trigger that logs to a 'notifications' table,
-- which we already have. The Edge Function can then be triggered by that table or directly.

-- Let's update the existing order status trigger to be more robust for ALL events.
DROP TRIGGER IF EXISTS on_order_status_change ON public.orders;

CREATE OR REPLACE FUNCTION public.notify_order_change()
RETURNS TRIGGER AS $$
BEGIN
  -- We rely on Supabase Database Webhooks to actually call the Edge Function.
  -- This function just ensures we have a record in the notifications table for internal tracking.
  INSERT INTO public.notifications (user_id, title, message, type)
  VALUES (
    new.user_id,
    CASE 
      WHEN TG_OP = 'INSERT' THEN 'Order Received'
      WHEN new.status = 'delivered' THEN 'Delivered!'
      ELSE 'Order Update'
    END,
    CASE 
      WHEN TG_OP = 'INSERT' THEN 'We have received your order #' || new.id
      WHEN new.status = 'delivered' THEN 'Your treats have arrived at their destination.'
      ELSE 'Your order status has changed to ' || new.status
    END,
    'order_update'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_order_change
  AFTER INSERT OR UPDATE OF status ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.notify_order_change();


-- New User Welcome Notification
CREATE OR REPLACE FUNCTION public.notify_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type)
  VALUES (
    new.id,
    'Welcome!',
    'Welcome to The A Cake family!',
    'welcome'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_new_user_notification ON public.users;
CREATE TRIGGER on_new_user_notification
  AFTER INSERT ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_user();
