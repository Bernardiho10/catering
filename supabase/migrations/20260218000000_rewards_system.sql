-- Create function to safely increment user points
CREATE OR REPLACE FUNCTION public.increment_user_points(user_uuid UUID, points_to_add INTEGER)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.users
  SET points = COALESCE(points, 0) + points_to_add
  WHERE id = user_uuid;
END;
$$;

-- Add points_earned column to orders if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'points_earned') THEN
        ALTER TABLE public.orders ADD COLUMN points_earned INTEGER DEFAULT 0;
    END IF;
END $$;
