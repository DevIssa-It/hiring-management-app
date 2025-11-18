-- Fix RLS policies for jobs table
-- Run this in Supabase SQL Editor

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow admin to insert jobs" ON jobs;
DROP POLICY IF EXISTS "Allow admin to update jobs" ON jobs;
DROP POLICY IF EXISTS "Allow admin to delete jobs" ON jobs;
DROP POLICY IF EXISTS "Allow all to read jobs" ON jobs;

-- Create new policies
CREATE POLICY "Allow admin to insert jobs" ON jobs
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.email = auth.email() 
    AND users.role = 'admin'
  )
);

CREATE POLICY "Allow admin to update jobs" ON jobs
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.email = auth.email() 
    AND users.role = 'admin'
  )
);

CREATE POLICY "Allow admin to delete jobs" ON jobs
FOR DELETE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.email = auth.email() 
    AND users.role = 'admin'
  )
);

CREATE POLICY "Allow all to read jobs" ON jobs
FOR SELECT TO authenticated
USING (true);

-- Also fix companies table
DROP POLICY IF EXISTS "Allow admin to manage companies" ON companies;
DROP POLICY IF EXISTS "Allow all to read companies" ON companies;

CREATE POLICY "Allow admin to manage companies" ON companies
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.email = auth.email() 
    AND users.role = 'admin'
  )
);

CREATE POLICY "Allow all to read companies" ON companies
FOR SELECT TO authenticated
USING (true);