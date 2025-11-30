# Hiring Management App

![Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.6-38bdf8.svg)

## 🚀 Live Demo

**[View Live Application](https://hiring-management-app-jet.vercel.app/)**

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

## API Documentation

### Authentication
- All API calls require authentication via Supabase Auth
- JWT tokens are automatically handled by Supabase client

### Main Endpoints
- `/jobs` - Job listings management
- `/applications` - Application submissions
- `/profiles` - User profile data

## Default Users

**Admin Account:**
- Email: `admin@talenthunt.com`
- Password: `admin123`

**Applicant Account:**
- Email: `johndoe@example.com`
- Password: `user123`

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

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Documentation

- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with React and TypeScript
- Styled with Tailwind CSS
- Powered by Supabase
