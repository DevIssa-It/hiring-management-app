# Quick Start Guide - Mulai Ngoding! 🚀

## Setup Awal

1. **Install Dependencies**
```bash
cd hiring-management-app
npm install
```

2. **Install Additional Packages (untuk fitur lengkap)**
```bash
npm install react-router-dom zustand react-hook-form zod @hookform/resolvers date-fns
npm install @supabase/supabase-js
npm install @tensorflow/tfjs @tensorflow-models/hand-pose-detection
```

3. **Setup Environment**
```bash
copy .env.example .env
```

Edit `.env` dan pilih mode:
- Untuk LocalStorage: set `VITE_USE_LOCAL_STORAGE=true`
- Untuk Supabase: isi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`

4. **Run Development Server**
```bash
npm run dev
```

---

## Urutan Implementasi yang Disarankan

### 🎯 Step 1: Shared Components (Mulai di sini!)
File priority tinggi yang harus dibuat dulu:

1. **src/components/shared/Button.tsx**
   - Komponen paling sering dipakai
   - Sudah ada placeholder, tinggal tambah styling

2. **src/components/shared/Input.tsx**
   - Untuk semua form
   - Sudah ada struktur dasar

3. **src/components/shared/Modal.tsx**
   - Untuk dialog/popup
   - Penting untuk create job modal

4. **src/components/shared/Badge.tsx**
   - Untuk status (active/inactive/draft)
   - Simple, bisa cepat selesai

### 🎯 Step 2: Setup Routing
1. **src/router.tsx** (buat file baru)
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ADMIN_JOBS} element={<AdminJobsPage />} />
        {/* tambahkan routes lainnya */}
      </Routes>
    </BrowserRouter>
  );
};
```

2. **Update src/App.tsx**
```tsx
import { AuthProvider } from '@/context/AuthContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { AppRouter } from './router';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppRouter />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
```

### 🎯 Step 3: Mock Data (Untuk Testing)
**src/utils/mockData.ts** (buat file baru)
```tsx
import { Job, Application, JobStatus, FieldRequirement } from '@/types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    description: 'We are looking for...',
    department: 'Engineering',
    location: 'Jakarta',
    employmentType: 'full_time',
    salaryMin: 10000000,
    salaryMax: 15000000,
    status: JobStatus.ACTIVE,
    formConfiguration: {
      fullName: FieldRequirement.MANDATORY,
      email: FieldRequirement.MANDATORY,
      phone: FieldRequirement.OPTIONAL,
      // ... semua field lainnya
    },
    createdBy: 'admin-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // tambahkan job lainnya
];
```

### 🎯 Step 4: Admin Job List (Fitur Pertama yang Lengkap!)
1. **src/pages/admin/JobManagement.tsx**
```tsx
import { useState } from 'react';
import { JobList } from '@/components/admin/JobList';
import { CreateJobModal } from '@/components/admin/CreateJobModal';
import { mockJobs } from '@/utils/mockData';

export const JobManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState(mockJobs);

  const handleCreateJob = () => {
    setIsModalOpen(true);
  };

  const handleJobClick = (jobId: string) => {
    console.log('Job clicked:', jobId);
    // Navigate to detail or open edit modal
  };

  return (
    <div>
      <h1>Job Management</h1>
      <JobList
        jobs={jobs}
        onJobClick={handleJobClick}
        onCreateJob={handleCreateJob}
      />
      <CreateJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={async (job) => {
          // Save job logic
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};
```

2. Implement component `JobList` di **src/components/admin/JobList.tsx**
3. Implement component `JobCard` di **src/components/admin/JobCard.tsx**
4. Implement `CreateJobModal` dengan `JobFormConfig`

### 🎯 Step 5: Applicant Job List
Mirip dengan admin, tapi untuk applicant:
1. **src/pages/applicant/JobListPage.tsx**
2. Implement `JobList` dan `JobCard` untuk applicant

### 🎯 Step 6: Application Form (Fitur Paling Complex!)
1. **src/pages/applicant/ApplicationPage.tsx**
2. Implement `ApplicationForm` dengan dynamic fields
3. Implement `DynamicFormField` component
4. Add form validation

### 🎯 Step 7: Webcam & Gesture Detection
1. Implement `WebcamCapture` component
2. Integrate TensorFlow.js
3. Add hand gesture detection logic

### 🎯 Step 8: Candidate Table
1. Implement `CandidateTable` dengan resize/reorder columns
2. Add sorting, filtering, pagination

---

## Tips Coding

### 1. Styling
Anda bisa gunakan:
- **Inline styles** (paling cepat untuk prototype)
- **CSS Modules** (buat file `.module.css`)
- **Tailwind CSS** (install: `npm install -D tailwindcss`)

Contoh dengan Tailwind:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Testing Component
Buat halaman test untuk coba component:
```tsx
// src/pages/ComponentTest.tsx
import { Button } from '@/components/shared/Button';

export const ComponentTest = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Component Testing</h1>
      
      <h2>Buttons</h2>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      
      {/* Test components lainnya */}
    </div>
  );
};
```

### 3. Debug dengan Console.log
```tsx
const handleSubmit = (data) => {
  console.log('Form submitted:', data);
  console.log('Job config:', job.formConfiguration);
};
```

### 4. Error Handling
```tsx
try {
  await submitApplication(data);
  showNotification('success', 'Success', 'Application submitted!');
} catch (error) {
  console.error(error);
  showNotification('error', 'Error', 'Failed to submit application');
}
```

---

## File Structure Reminder

```
src/
├── components/
│   ├── admin/          ← Admin-specific components
│   ├── applicant/      ← Applicant-specific components
│   └── shared/         ← Reusable components (Button, Input, dll)
├── pages/              ← Route-level components
│   ├── admin/
│   └── applicant/
├── hooks/              ← Custom React hooks
├── services/           ← API/data layer
├── types/              ← TypeScript definitions
├── utils/              ← Helper functions
├── context/            ← React Context (Auth, Notification)
└── assets/             ← Images, icons
```

---

## Common Issues & Solutions

### Issue: Cannot find module '@/types'
**Solution:** TypeScript path alias belum terkonfigurasi dengan benar. Pastikan `tsconfig.json` dan `vite.config.ts` sudah sesuai.

### Issue: ESLint warnings
**Solution:** Untuk sekarang bisa diabaikan, fokus ke fungsi dulu. Nanti bisa diperbaiki.

### Issue: Component not rendering
**Solution:** 
1. Check console untuk error
2. Pastikan import path benar
3. Pastikan export/import statement sesuai

---

## Resources

- **React Docs:** https://react.dev
- **TypeScript Docs:** https://www.typescriptlang.org/docs/
- **React Hook Form:** https://react-hook-form.com
- **TensorFlow.js:** https://www.tensorflow.org/js

---

## Selamat Coding! 🎉

Mulai dari Step 1, buat shared components dulu.
Jangan skip, karena semua page akan pakai components ini!

Good luck! 💪
