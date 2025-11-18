-- Add admin user to users table
-- Run this in Supabase SQL Editor

INSERT INTO users (email, role, full_name, phone) VALUES
('admin@talenthunt', 'admin', 'Admin TalentHunt', '+6281234567890')
ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  full_name = 'Admin TalentHunt',
  updated_at = NOW();