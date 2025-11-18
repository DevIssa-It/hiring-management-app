-- Insert authentication users to match existing users table
-- Run this in Supabase SQL Editor

-- Admin user
INSERT INTO auth.users (
  id, 
  email, 
  encrypted_password, 
  email_confirmed_at, 
  created_at, 
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
) VALUES (
  '770e8400-e29b-41d4-a716-446655440001',
  'admin@rakamin.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"role": "admin", "full_name": "Admin Rakamin"}'
);

-- Applicant user  
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
) VALUES (
  '770e8400-e29b-41d4-a716-446655440002',
  'john.doe@example.com', 
  crypt('user123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"role": "applicant", "full_name": "John Doe"}'
);

-- Create identities for the users
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  created_at,
  updated_at
) VALUES 
(
  gen_random_uuid(),
  '770e8400-e29b-41d4-a716-446655440001',
  '{"sub": "770e8400-e29b-41d4-a716-446655440001", "email": "admin@rakamin.com"}',
  'email',
  NOW(),
  NOW()
),
(
  gen_random_uuid(), 
  '770e8400-e29b-41d4-a716-446655440002',
  '{"sub": "770e8400-e29b-41d4-a716-446655440002", "email": "john.doe@example.com"}',
  'email',
  NOW(),
  NOW()
);