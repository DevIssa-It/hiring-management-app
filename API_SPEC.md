# API Specification

## Base URL
- Production: `https://your-api.com/api`
- Development: `http://localhost:5173/api`
- Supabase: Auto-configured via SDK

## Authentication
All protected endpoints require authentication header:
```
Authorization: Bearer <token>
```

---

## Jobs API

### GET /jobs
Get list of jobs

**Query Parameters:**
- `status` (optional): Filter by status (active, inactive, draft)
- `search` (optional): Search by title or department
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Senior Frontend Developer",
      "description": "We are looking for...",
      "department": "Engineering",
      "location": "Jakarta",
      "employmentType": "full_time",
      "salaryMin": 10000000,
      "salaryMax": 15000000,
      "status": "active",
      "formConfiguration": {
        "fullName": "mandatory",
        "email": "mandatory",
        "phone": "optional",
        "gender": "optional",
        "dateOfBirth": "off",
        "linkedin": "mandatory",
        "portfolio": "optional",
        "domicile": "optional",
        "expectedSalary": "optional",
        "availability": "mandatory",
        "profilePicture": "mandatory",
        "resume": "mandatory",
        "coverLetter": "optional"
      },
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z"
    }
  ],
  "total": 50,
  "page": 1,
  "pageSize": 10,
  "totalPages": 5
}
```

### GET /jobs/:id
Get job details by ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Senior Frontend Developer",
    "description": "We are looking for...",
    "department": "Engineering",
    "location": "Jakarta",
    "employmentType": "full_time",
    "salaryMin": 10000000,
    "salaryMax": 15000000,
    "status": "active",
    "formConfiguration": { /* ... */ },
    "createdBy": "admin-uuid",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z"
  }
}
```

### POST /jobs (Admin only)
Create new job

**Request Body:**
```json
{
  "title": "Senior Frontend Developer",
  "description": "We are looking for...",
  "department": "Engineering",
  "location": "Jakarta",
  "employmentType": "full_time",
  "salaryMin": 10000000,
  "salaryMax": 15000000,
  "status": "draft",
  "formConfiguration": {
    "fullName": "mandatory",
    "email": "mandatory",
    "phone": "optional",
    "gender": "optional",
    "dateOfBirth": "off",
    "linkedin": "mandatory",
    "portfolio": "optional",
    "domicile": "optional",
    "expectedSalary": "optional",
    "availability": "mandatory",
    "profilePicture": "mandatory",
    "resume": "mandatory",
    "coverLetter": "optional"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    /* ... job data ... */
  },
  "message": "Job created successfully"
}
```

### PUT /jobs/:id (Admin only)
Update job

**Request Body:** Same as POST /jobs

**Response:**
```json
{
  "success": true,
  "data": { /* ... updated job data ... */ },
  "message": "Job updated successfully"
}
```

### DELETE /jobs/:id (Admin only)
Delete job

**Response:**
```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

---

## Applications API

### GET /jobs/:jobId/applications (Admin only)
Get all applications for a job

**Query Parameters:**
- `status` (optional): Filter by status
- `search` (optional): Search by name or email
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "jobId": "job-uuid",
      "applicantData": {
        "fullName": "John Doe",
        "email": "john@example.com",
        "phone": "+628123456789",
        "gender": "male",
        "linkedin": "https://linkedin.com/in/johndoe",
        "domicile": "Jakarta",
        "profilePicture": "base64_or_url",
        "resume": "url_to_resume"
      },
      "status": "submitted",
      "appliedAt": "2025-01-15T10:00:00Z"
    }
  ],
  "total": 25,
  "page": 1,
  "pageSize": 10,
  "totalPages": 3
}
```

### GET /applications/:id
Get application details

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "jobId": "job-uuid",
    "job": {
      "title": "Senior Frontend Developer",
      "department": "Engineering"
    },
    "applicantData": { /* ... */ },
    "status": "submitted",
    "appliedAt": "2025-01-15T10:00:00Z",
    "reviewedAt": null,
    "reviewedBy": null,
    "notes": null
  }
}
```

### POST /jobs/:jobId/apply
Submit job application

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+628123456789",
  "gender": "male",
  "linkedin": "https://linkedin.com/in/johndoe",
  "portfolio": "https://johndoe.com",
  "domicile": "Jakarta",
  "expectedSalary": 12000000,
  "availability": "2025-02-01",
  "profilePicture": "base64_string",
  "resume": "file_or_url",
  "coverLetter": "I am interested in..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    /* ... application data ... */
  },
  "message": "Application submitted successfully"
}
```

### PATCH /applications/:id/status (Admin only)
Update application status

**Request Body:**
```json
{
  "status": "shortlisted",
  "notes": "Great candidate, proceed to interview"
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* ... updated application ... */ },
  "message": "Application status updated"
}
```

---

## Authentication API

### POST /auth/register
Register new user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "role": "applicant",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "applicant",
      "name": "John Doe"
    },
    "token": "jwt_token"
  },
  "message": "Registration successful"
}
```

### POST /auth/login
Login user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "applicant",
      "name": "John Doe"
    },
    "token": "jwt_token"
  },
  "message": "Login successful"
}
```

### POST /auth/logout
Logout user

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### GET /auth/me
Get current user info

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "applicant",
    "name": "John Doe"
  }
}
```

---

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### Forbidden (403)
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "You don't have permission to access this resource"
}
```

### Not Found (404)
```json
{
  "success": false,
  "error": "Not found",
  "message": "Resource not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

---

## LocalStorage Mock Data Structure

Jika menggunakan LocalStorage mode, data disimpan dengan struktur:

```javascript
// localStorage keys
const STORAGE_KEYS = {
  JOBS: 'hiring_app_jobs',
  APPLICATIONS: 'hiring_app_applications',
  USERS: 'hiring_app_users',
  CURRENT_USER: 'hiring_app_current_user',
};

// Example data
localStorage.setItem('hiring_app_jobs', JSON.stringify([
  {
    id: '1',
    title: 'Frontend Developer',
    // ... other fields
  }
]));
```
