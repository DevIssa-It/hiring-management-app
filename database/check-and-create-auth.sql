-- Check existing auth users and create if needed
-- Run this in Supabase SQL Editor

-- First, check what auth users exist
SELECT id, email, encrypted_password FROM auth.users WHERE email IN ('admin@rakamin.com', 'john.doe@example.com');

-- If no users exist, create them with new UUIDs
INSERT INTO auth.users (
  email, 
  encrypted_password, 
  email_confirmed_at, 
  created_at, 
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
) 
SELECT 
  'admin@rakamin.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"role": "admin", "full_name": "Admin Rakamin"}'
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@rakamin.com');

INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
) 
SELECT
  'john.doe@example.com', 
  crypt('user123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"role": "applicant", "full_name": "John Doe"}'
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'john.doe@example.com');

-- Update existing users if they exist but password is null
UPDATE auth.users 
SET encrypted_password = crypt('admin123', gen_salt('bf'))
WHERE email = 'admin@rakamin.com' AND encrypted_password IS NULL;

UPDATE auth.users 
SET encrypted_password = crypt('user123', gen_salt('bf'))
WHERE email = 'john.doe@example.com' AND encrypted_password IS NULL;