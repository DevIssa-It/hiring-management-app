-- Drop all existing policies to fix infinite recursion
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Admins can read all users" ON users;
DROP POLICY IF EXISTS "Everyone can read companies" ON companies;
DROP POLICY IF EXISTS "Admins can modify companies" ON companies;
DROP POLICY IF EXISTS "Everyone can read active jobs" ON jobs;
DROP POLICY IF EXISTS "Admins can read all jobs" ON jobs;
DROP POLICY IF EXISTS "Admins can modify jobs" ON jobs;
DROP POLICY IF EXISTS "Users can read own applications" ON applications;
DROP POLICY IF EXISTS "Users can create applications" ON applications;
DROP POLICY IF EXISTS "Admins can read all applications" ON applications;
DROP POLICY IF EXISTS "Admins can update applications" ON applications;

-- Disable RLS temporarily for testing
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE jobs DISABLE ROW LEVEL SECURITY;
ALTER TABLE applications DISABLE ROW LEVEL SECURITY;

-- Simple policies without recursion
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Allow read access for all authenticated users
CREATE POLICY "Allow read for authenticated users" ON users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read for all" ON companies FOR SELECT USING (true);
CREATE POLICY "Allow read for all" ON jobs FOR SELECT USING (true);
CREATE POLICY "Allow read for authenticated users" ON applications FOR SELECT TO authenticated USING (true);

-- Allow insert for authenticated users
CREATE POLICY "Allow insert for authenticated users" ON applications FOR INSERT TO authenticated WITH CHECK (true);