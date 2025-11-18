# Supabase Setup Guide

## Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login
3. Click "New Project"
4. Fill project details and create

## Step 2: Get Credentials
1. Go to Project Settings > API
2. Copy **Project URL**
3. Copy **anon public** key

## Step 3: Setup Environment
1. Replace values in `.env`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

## Step 4: Install Dependencies
```bash
npm install
```

## Step 5: Run Database Setup
```bash
# Run migrations and seeders
npm run db:fresh
```

## Step 6: Enable RLS Function (Important!)
Go to Supabase SQL Editor and run:
```sql
CREATE OR REPLACE FUNCTION exec_sql(sql text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql;
END;
$$;
```

## Step 7: Start Development
```bash
npm run dev
```

## Test Login Credentials
- **Admin**: admin@rakamin.com
- **Applicant**: john.doe@example.com

## Available Commands
- `npm run db:migrate` - Run migrations only
- `npm run db:seed` - Run seeders only  
- `npm run db:fresh` - Run migrations + seeders