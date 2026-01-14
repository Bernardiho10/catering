-- Seed Admin User for Foody
-- Run this in your Supabase SQL Editor after creating the auth user

-- STEP 1: First, create the user in Supabase Auth Dashboard:
-- Email: admin@foody.com
-- Password: FoodyAdmin123!

-- STEP 2: After the auth user is created, get their UUID from the auth.users table
-- and run this query to set them as admin:

-- Replace 'YOUR_AUTH_USER_UUID' with the actual UUID from auth.users
-- INSERT INTO public.users (id, full_name, role, avatar_url)
-- VALUES ('YOUR_AUTH_USER_UUID', 'Foody Admin', 'admin', null);

-- OR if the user already exists in public.users, update their role:
-- UPDATE public.users SET role = 'admin' WHERE id = 'YOUR_AUTH_USER_UUID';

-- ===========================================
-- DEMO ADMIN CREDENTIALS
-- ===========================================
-- Email: admin@foody.com
-- Password: FoodyAdmin123!
-- ===========================================

-- Quick way to find your user's UUID:
-- SELECT id, email FROM auth.users WHERE email = 'admin@foody.com';

-- Sample menu items (optional)
INSERT INTO public.menu_items (name, description, price, category, image_url, active, dietary_tags)
VALUES
  ('Classic Smash Burger', 'Juicy double-smashed beef patties with aged cheddar, caramelized onions, pickles, and our signature house sauce.', 1299, 'Mains', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60', true, '{}'),
  ('Rainbow Buddha Bowl', 'Protein-packed quinoa with crispy roasted chickpeas, creamy avocado, massaged kale, and lemon-tahini drizzle.', 1450, 'Mains', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60', true, '{vegan,gluten-free}'),
  ('Honey Glazed Salmon', 'Wild-caught salmon fillet with honey-soy glaze, served over jasmine rice with seasonal vegetables.', 1899, 'Mains', 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=500&q=60', true, '{gluten-free}'),
  ('Truffle Mushroom Risotto', 'Creamy arborio rice slow-cooked with wild mushrooms, white wine, parmesan, and black truffle oil.', 1650, 'Mains', 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=500&q=60', true, '{vegetarian}'),
  ('Molten Chocolate Lava Cake', 'Warm chocolate cake with a gooey molten center, served with vanilla bean gelato.', 950, 'Desserts', 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=500&q=60', true, '{vegetarian}')
ON CONFLICT DO NOTHING;

-- Daily menu table (for admin to manage)
CREATE TABLE IF NOT EXISTS public.daily_menu (
  id serial primary key,
  name text not null,
  sold_out boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
ALTER TABLE public.daily_menu ENABLE ROW LEVEL SECURITY;

-- Policies for daily_menu
CREATE POLICY "Daily menu viewable by everyone" ON public.daily_menu
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage daily menu" ON public.daily_menu
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );
