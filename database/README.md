# Database Migration & Seeding

Sistem migration dan seeding untuk Supabase, mirip dengan Laravel.

## Setup

1. Install dependencies:
```bash
npm install @supabase/supabase-js
```

2. Set environment variables:
```bash
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Usage

### Run Migrations Only
```bash
node database/migrate.js migrate
```

### Run Seeders Only
```bash
node database/migrate.js seed
```

### Run Fresh (Migrations + Seeders)
```bash
node database/migrate.js fresh
```

## File Structure

```
database/
├── migrations/
│   ├── 001_create_users_table.sql
│   ├── 002_create_companies_table.sql
│   ├── 003_create_jobs_table.sql
│   └── 004_create_applications_table.sql
├── seeders/
│   ├── 001_seed_companies.sql
│   ├── 002_seed_jobs.sql
│   └── 003_seed_users.sql
├── migrate.js
└── README.md
```

## Database Schema

### Tables Created:
- **users** - User accounts (admin/applicant)
- **companies** - Company information
- **jobs** - Job postings
- **applications** - Job applications

### Features:
- Row Level Security (RLS) policies
- UUID primary keys
- Proper foreign key relationships
- Timestamps (created_at, updated_at)
- Data validation with CHECK constraints

## Notes

- Migrations run in alphabetical order
- Seeders run in alphabetical order
- All tables have RLS enabled for security
- Use `ON CONFLICT DO NOTHING` in seeders to prevent duplicates