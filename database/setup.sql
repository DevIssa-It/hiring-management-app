-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create exec_sql function for migrations
CREATE OR REPLACE FUNCTION exec_sql(sql text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql;
END;
$$;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(20) DEFAULT 'applicant' CHECK (role IN ('admin', 'applicant')),
  full_name VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  description TEXT,
  website VARCHAR(255),
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  employment_type VARCHAR(50) DEFAULT 'full_time' CHECK (employment_type IN ('full_time', 'part_time', 'contract', 'internship')),
  location VARCHAR(255),
  salary_min INTEGER,
  salary_max INTEGER,
  requirements TEXT,
  benefits TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(10) CHECK (gender IN ('male', 'female')),
  domicile VARCHAR(255),
  linkedin_url TEXT,
  profile_picture_url TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'interview', 'accepted', 'rejected')),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, user_id)
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for companies
CREATE POLICY "Everyone can read companies" ON companies FOR SELECT USING (true);

-- RLS Policies for jobs
CREATE POLICY "Everyone can read active jobs" ON jobs FOR SELECT USING (status = 'active');

-- RLS Policies for applications
CREATE POLICY "Users can read own applications" ON applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create applications" ON applications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert seed data
-- Companies
INSERT INTO companies (id, name, logo_url, description, website, location) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Rakamin Academy', 'https://example.com/rakamin-logo.png', 'Leading tech education platform in Indonesia', 'https://rakamin.com', 'Jakarta, Indonesia'),
('550e8400-e29b-41d4-a716-446655440002', 'Gojek', 'https://example.com/gojek-logo.png', 'Southeast Asia''s leading on-demand platform', 'https://gojek.com', 'Jakarta, Indonesia'),
('550e8400-e29b-41d4-a716-446655440003', 'Tokopedia', 'https://example.com/tokopedia-logo.png', 'Indonesia''s largest e-commerce platform', 'https://tokopedia.com', 'Jakarta, Indonesia')
ON CONFLICT (id) DO NOTHING;

-- Jobs
INSERT INTO jobs (id, company_id, title, description, employment_type, location, salary_min, salary_max, status) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Frontend Developer', 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user-facing web applications using modern technologies like React, TypeScript, and Tailwind CSS.', 'full_time', 'Jakarta, Indonesia', 8000000, 15000000, 'active'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Backend Developer', 'Join our backend team to build scalable and reliable systems that power millions of users across Southeast Asia.', 'full_time', 'Jakarta, Indonesia', 12000000, 20000000, 'active'),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Product Manager', 'Lead product development initiatives and drive product strategy for our e-commerce platform.', 'full_time', 'Jakarta, Indonesia', 15000000, 25000000, 'active')
ON CONFLICT (id) DO NOTHING;

-- Users
INSERT INTO users (id, email, role, full_name, phone) VALUES
('770e8400-e29b-41d4-a716-446655440001', 'admin@rakamin.com', 'admin', 'Admin Rakamin', '+6281234567890'),
('770e8400-e29b-41d4-a716-446655440002', 'john.doe@example.com', 'applicant', 'John Doe', '+6281234567891')
ON CONFLICT (id) DO NOTHING;