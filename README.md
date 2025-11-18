# Hiring Management App

A modern hiring management application built with React, TypeScript, and Supabase.

## 🚀 Features

- **Authentication System**: Secure login/logout with role-based access
- **Admin Dashboard**: Manage job postings and view applications
- **Applicant Portal**: Browse jobs and submit applications
- **Real-time Data**: Powered by Supabase for live updates
- **File Upload**: Resume and profile picture uploads
- **Responsive Design**: Works on desktop and mobile

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Storage)
- **Build Tool**: Vite
- **Icons**: React Icons
- **Routing**: React Router DOM

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hiring-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase credentials in `.env`

4. **Setup database**
   ```bash
   # Run database setup (tables, seed data)
   psql -f database/setup.sql
   
   # Setup storage buckets
   psql -f database/setup-storage.sql
   
   # Setup authentication users
   psql -f database/setup-auth-users.sql
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🔐 Demo Credentials

Use these credentials to test the application:

### Admin Access
- Email: `admin@rakamin.com`
- Password: `admin123`
- Access: Job management, view applications

### Applicant Access
- Email: `john.doe@example.com`
- Password: `user123`
- Access: Browse jobs, submit applications

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── applicant/      # Applicant-specific components
│   └── shared/         # Shared components
├── context/            # React contexts
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🧪 Testing

Run integration tests:
```bash
node database/test-complete-integration.js
```

## 📚 Documentation

- [Authentication System](./AUTHENTICATION_SYSTEM.md)
- [Supabase Integration](./SUPABASE_INTEGRATION_COMPLETE.md)
- [API Specification](./API_SPEC.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.