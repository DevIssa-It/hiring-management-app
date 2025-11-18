# Hiring Management App

## Project Overview

A comprehensive hiring management application that streamlines the recruitment process for companies and job seekers. The system features role-based access control with separate interfaces for administrators and applicants.

### Key Features
- **Admin Dashboard**: Create and manage job postings, review applications, track candidates
- **Applicant Portal**: Browse available positions, submit applications with resume upload
- **Real-time Updates**: Live status tracking for applications
- **Secure Authentication**: Role-based access with Supabase Auth
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Tech Stack Used

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **React Router DOM** for client-side routing
- **React Icons** for consistent iconography

### Backend & Database
- **Supabase** (PostgreSQL) for database and real-time features
- **Supabase Auth** for authentication and authorization
- **Row Level Security (RLS)** for data protection

### Development & Testing
- **Vitest** for unit testing
- **React Testing Library** for component testing
- **ESLint** for code linting
- **TypeScript** for static type checking

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

## How to Run Locally

### 1. Clone and Install
```bash
git clone <repository-url>
cd hiring-management-app
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Add your Supabase credentials to `.env`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Start Development Server
```bash
npm run dev
```

Application will be available at `http://localhost:5173`

### 5. Testing
```bash
# Run all tests
npm test

# Run tests once
npm run test:run

# Run with coverage
npm test -- --coverage
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once


## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── applicant/      # Applicant-specific components
│   └── shared/         # Shared components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API and external services
├── context/            # React context providers
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Default Users

**Admin Account:**
- Email: `admin@rakamin.com`
- Password: `admin123`

**Applicant Account:**
- Email: `john.doe@example.com`
- Password: `applicant123`

## Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Verify your `.env` file has correct credentials
   - Check if Supabase project is active

2. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npm run build`

3. **Test Failures**
   - Ensure all dependencies are installed
   - Run `npm run test:run` for detailed output

### Getting Help

- Check the browser console for errors
- Review Supabase dashboard for database issues
- Verify your environment variables are correct