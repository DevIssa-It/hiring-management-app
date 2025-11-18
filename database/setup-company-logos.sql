-- Create company logos bucket
INSERT INTO storage.buckets (id, name, public) VALUES 
('company-logos', 'company-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for company logos
CREATE POLICY "Anyone can view company logos" ON storage.objects
FOR SELECT USING (bucket_id = 'company-logos');

CREATE POLICY "Admins can upload company logos" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'company-logos' AND 
  auth.jwt() ->> 'role' = 'admin'
);