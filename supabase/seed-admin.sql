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

-- Sample menu items (The A Cake - Organic Blessings)
INSERT INTO public.menu_items (name, description, price, category, image_url, active, dietary_tags)
VALUES
  ('The Signature Blessing', 'Our crown jewel. A triple-layered organic chocolate masterpiece crafted with heritage cocoa and celestial velvet cream.', 8500, 'organic-cakes', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', true, '{organic,premium}'),
  ('Lavender Dream Bliss', 'An ethereal sponge infused with organic French lavender and vanilla bean. Light as a morning prayer.', 7200, 'organic-cakes', 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80', true, '{organic,gluten-optional}'),
  ('Golden Pecan Radiance', 'A warm, sun-kissed delight filled with toasted organic pecans and a hint of Canadian maple syrup.', 6800, 'organic-cakes', 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=800&q=80', true, '{contains-nuts,organic}'),
  ('Lemon Sunshine Grace', 'Zesty organic lemons harvest from heritage groves meeting our signature velvet crumb. Pure radiance.', 6500, 'organic-cakes', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80', true, '{organic,citrus}'),
  ('The Mother’s Blessing', 'Our sacred recipe. Nutrient-dense organic ingredients specifically balanced to support and celebrate new mothers.', 7800, 'organic-cakes', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', true, '{lactation-support,organic}')
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
