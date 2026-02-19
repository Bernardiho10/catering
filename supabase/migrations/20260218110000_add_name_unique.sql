-- Add unique constraint to menu_items name for upserting
ALTER TABLE public.menu_items ADD CONSTRAINT menu_items_name_key UNIQUE (name);
