-- 1. Enhance menu_items
ALTER TABLE public.menu_items
ADD COLUMN IF NOT EXISTS images text[],
ADD COLUMN IF NOT EXISTS rating numeric(2,1),
ADD COLUMN IF NOT EXISTS review_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS prep_time integer,
ADD COLUMN IF NOT EXISTS serves integer,
ADD COLUMN IF NOT EXISTS calories integer,
ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS seasonal text,
ADD COLUMN IF NOT EXISTS benefits text[];

-- 2. Create Catering Requests
CREATE TABLE IF NOT EXISTS public.catering_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  event_date date,
  guest_count integer,
  event_type text,
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'booked', 'completed')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.catering_requests ENABLE ROW LEVEL SECURITY;
-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can create catering requests" ON public.catering_requests FOR INSERT WITH CHECK (true);
-- Only admin can view
CREATE POLICY "Admins can view catering requests" ON public.catering_requests FOR SELECT USING (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- 3. Create Addresses
CREATE TABLE IF NOT EXISTS public.addresses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  label text, -- e.g. "Home", "Work"
  address_line1 text NOT NULL,
  address_line2 text,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own addresses" ON public.addresses USING (auth.uid() = user_id);

-- 4. Add Points to Users
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS points integer DEFAULT 0;
