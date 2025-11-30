# Deployment Guide

## Vercel Deployment

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel

### Steps

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import Project to Vercel**
- Go to [Vercel Dashboard](https://vercel.com/dashboard)
- Click "New Project"
- Import your GitHub repository

3. **Configure Environment Variables**
Add the following environment variables in Vercel:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Deploy**
- Click "Deploy"
- Wait for build to complete
- Your app will be live at `https://your-app.vercel.app`

### Automatic Deployments
- Every push to `main` branch triggers automatic deployment
- Pull requests create preview deployments

## Netlify Deployment

### Steps

1. **Build Command**
```bash
npm run build
```

2. **Publish Directory**
```
dist
```

3. **Environment Variables**
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

### Build and Run
```bash
docker build -t hiring-app .
docker run -p 5173:5173 hiring-app
```

## Environment Variables

Required variables:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## Post-Deployment Checklist

- [ ] Verify environment variables are set
- [ ] Test authentication flow
- [ ] Check database connections
- [ ] Test file uploads
- [ ] Verify email notifications
- [ ] Check responsive design on mobile
- [ ] Test all user roles (admin/applicant)
- [ ] Monitor error logs
