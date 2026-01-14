# Foody Admin Setup Guide

## Demo Admin Credentials

```
Email: admin@foody.com
Password: FoodyAdmin123!
```

## Setup Instructions

### Step 1: Create the Auth User in Supabase

1. Go to your Supabase Dashboard → Authentication → Users
2. Click "Add User" → "Create New User"
3. Enter:
   - Email: `admin@foody.com`
   - Password: `FoodyAdmin123!`
4. Click "Create User"

### Step 2: Set User as Admin

1. Go to Supabase Dashboard → SQL Editor
2. First, find the user's UUID:

```sql
SELECT id, email FROM auth.users WHERE email = 'admin@foody.com';
```

3. Copy the UUID from the result
4. Insert/update the user in public.users with admin role:

```sql
-- Replace YOUR_UUID with the actual UUID from step 2
INSERT INTO public.users (id, full_name, role)
VALUES ('YOUR_UUID', 'Foody Admin', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

### Step 3: Verify Setup

1. Go to http://localhost:3000/login
2. Sign in with admin@foody.com / FoodyAdmin123!
3. Navigate to http://localhost:3000/admin
4. You should see the admin dashboard

## Troubleshooting

### "Your account doesn't have permission"
- Ensure the user exists in `public.users` table with `role = 'admin'`
- Check that the UUID matches between `auth.users` and `public.users`

### Can't create user in Supabase
- Ensure your Supabase project is running
- Check your `.env.local` has correct Supabase URL and keys

## Admin Features

Once logged in as admin, you can:
- **Manage Daily Menu**: Add, edit, and remove dishes
- **Mark Sold Out**: Flag items as unavailable
- **View Orders**: Track all customer orders
- **Monitor Activity**: See site analytics (coming soon)
