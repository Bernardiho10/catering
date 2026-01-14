
-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- USERS (Public Profiles)
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.users enable row level security;

-- MENU ITEMS
create table public.menu_items (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price integer not null, -- stored in cents
  category text not null,
  image_url text,
  active boolean default true,
  dietary_tags text[], -- e.g. ['vegan', 'gluten-free']
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.menu_items enable row level security;

-- ORDERS
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete set null,
  status text default 'received' check (status in ('received', 'preparing', 'out_for_delivery', 'delivered', 'cancelled')),
  total_amount integer not null,
  stripe_payment_intent_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.orders enable row level security;

-- ORDER ITEMS
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  menu_item_id uuid references public.menu_items(id) on delete set null,
  quantity integer not null default 1,
  price_at_time integer not null,
  options jsonb, -- for customizations
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.order_items enable row level security;

-- CHECKPOINTS (Order History/Tracking)
create table public.checkpoints (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  status text not null,
  message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.checkpoints enable row level security;

-- POLICIES

-- Users
create policy "Public profiles are viewable by everyone." on public.users
  for select using (true);

create policy "Users can insert their own profile." on public.users
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.users
  for update using (auth.uid() = id);

-- Menu Items
create policy "Menu items are viewable by everyone." on public.menu_items
  for select using (true);

create policy "Admins can insert/update/delete menu items." on public.menu_items
  for all using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

-- Orders
create policy "Users can view their own orders." on public.orders
  for select using (auth.uid() = user_id);

create policy "Admins can view all orders." on public.orders
  for select using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

create policy "Users can create orders." on public.orders
  for insert with check (auth.uid() = user_id);

-- Order Items
create policy "Users can view their own order items." on public.order_items
  for select using (
    exists (select 1 from public.orders where id = public.order_items.order_id and user_id = auth.uid())
  );

create policy "Admins can view all order items." on public.order_items
  for select using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

-- Checkpoints
create policy "Users can view checkpoints for their orders." on public.checkpoints
  for select using (
    exists (select 1 from public.orders where id = public.checkpoints.order_id and user_id = auth.uid())
  );

-- Trigger to create user profile on signup (optional but recommended)
-- implementation left for supabase auth hooks or client side for now.
