# API Documentation

## Authentication

All API requests require authentication using Supabase Auth JWT tokens.

### Login
```typescript
POST /auth/login
Body: { email: string, password: string }
Response: { user, session }
```

### Logout
```typescript
POST /auth/logout
Response: { success: boolean }
```

## Jobs API

### Get All Jobs
```typescript
GET /jobs
Query: { status?: 'draft' | 'published', limit?: number }
Response: Job[]
```

### Get Job by ID
```typescript
GET /jobs/:id
Response: Job
```

### Create Job (Admin only)
```typescript
POST /jobs
Body: JobCreateInput
Response: Job
```

### Update Job (Admin only)
```typescript
PUT /jobs/:id
Body: JobUpdateInput
Response: Job
```

### Delete Job (Admin only)
```typescript
DELETE /jobs/:id
Response: { success: boolean }
```

## Applications API

### Get Applications
```typescript
GET /applications
Query: { job_id?: string, status?: string }
Response: Application[]
```

### Submit Application
```typescript
POST /applications
Body: ApplicationInput
Response: Application
```

### Update Application Status (Admin only)
```typescript
PATCH /applications/:id
Body: { status: string }
Response: Application
```

## Profiles API

### Get User Profile
```typescript
GET /profiles/:id
Response: Profile
```

### Update Profile
```typescript
PUT /profiles/:id
Body: ProfileUpdateInput
Response: Profile
```
