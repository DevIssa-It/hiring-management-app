-- Update passwords for existing auth users
-- Run this in Supabase SQL Editor

-- Update admin password
UPDATE auth.users 
SET encrypted_password = crypt('admin123', gen_salt('bf'))
WHERE email = 'admin@rakamin.com';

-- Update applicant password  
UPDATE auth.users 
SET encrypted_password = crypt('user123', gen_salt('bf'))
WHERE email = 'john.doe@example.com';