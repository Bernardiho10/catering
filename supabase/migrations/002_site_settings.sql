-- Site Settings table for tax and delivery configuration
CREATE TABLE IF NOT EXISTS public.site_settings (
  id integer PRIMARY KEY DEFAULT 1,
  tax_rate decimal(5,2) DEFAULT 8.00,
  delivery_fee integer DEFAULT 299, -- stored in cents
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT single_row CHECK (id = 1)
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read settings
CREATE POLICY "Site settings are viewable by everyone" ON public.site_settings
  FOR SELECT USING (true);

-- Only admins can update settings
CREATE POLICY "Admins can update site settings" ON public.site_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Insert default settings
INSERT INTO public.site_settings (id, tax_rate, delivery_fee)
VALUES (1, 8.00, 299)
ON CONFLICT (id) DO NOTHING;
