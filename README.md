# Hiring Management Web App

Aplikasi web untuk manajemen rekrutmen dengan dua role pengguna: Admin (Recruiter) dan Applicant (Job Seeker).

## 🚀 Tech Stack

- **Frontend Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **State Management:** Zustand
- **Form Management:** React Hook Form + Zod
- **Backend Options:** 
  - Supabase (recommended)
  - LocalStorage (untuk development)
- **AI/ML:** TensorFlow.js + Hand Pose Detection (untuk fitur webcam gesture)

## 📁 Struktur Folder

```
hiring-management-app/
├── public/                      # Static assets
├── src/
│   ├── assets/                  # Images, icons, fonts
│   ├── components/              # React components
│   │   ├── admin/              # Admin-specific components
│   │   │   ├── JobList.tsx
│   │   │   ├── JobCard.tsx
│   │   │   ├── CreateJobModal.tsx
│   │   │   ├── JobFormConfig.tsx
│   │   │   ├── CandidateTable.tsx
│   │   │   └── ResizableColumn.tsx
│   │   ├── applicant/          # Applicant-specific components
│   │   │   ├── JobList.tsx
│   │   │   ├── JobCard.tsx
│   │   │   ├── ApplicationForm.tsx
│   │   │   ├── DynamicFormField.tsx
│   │   │   └── WebcamCapture.tsx
│   │   └── shared/             # Shared components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       ├── Select.tsx
│   │       ├── Badge.tsx
│   │       ├── Table.tsx
│   │       ├── Pagination.tsx
│   │       └── Notification.tsx
│   ├── pages/                  # Page components
│   │   ├── admin/
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── JobManagement.tsx
│   │   │   └── CandidateManagement.tsx
│   │   └── applicant/
│   │       ├── JobListPage.tsx
│   │       ├── JobDetailPage.tsx
│   │       └── ApplicationPage.tsx
│   ├── context/                # React Context
│   │   ├── AuthContext.tsx
│   │   └── NotificationContext.tsx
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useJobs.ts
│   │   ├── useApplications.ts
│   │   ├── useWebcam.ts
│   │   ├── useHandGesture.ts
│   │   └── useTable.ts
│   ├── services/               # API services
│   │   ├── api.ts
│   │   ├── jobService.ts
│   │   ├── applicationService.ts
│   │   ├── authService.ts
│   │   └── storageService.ts
│   ├── types/                  # TypeScript types
│   │   └── index.ts
│   ├── utils/                  # Utility functions
│   │   ├── validation.ts
│   │   ├── formatters.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── App.tsx                 # Main App component
│   ├── main.tsx               # Entry point
│   └── router.tsx             # Route configuration
├── .env.example               # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Fitur Utama

### Admin (Recruiter)
1. **Job List Page**
   - Menampilkan semua lowongan kerja
   - Filter dan sorting berdasarkan status
   - Tombol "Create Job" untuk membuat lowongan baru

2. **Create Job Modal/Page**
   - Input metadata pekerjaan (title, description, department, dll)
   - Konfigurasi form aplikasi dengan 3 state:
     - Mandatory (wajib diisi)
     - Optional (boleh dikosongkan)
     - Off (tidak ditampilkan)

3. **Candidate Management**
   - Tabel kandidat dengan kolom yang bisa di-resize dan reorder
   - Sorting, filtering, dan pagination
   - View detail aplikasi kandidat

### Applicant (Job Seeker)
1. **Job List Page**
   - Menampilkan semua lowongan aktif
   - Card view dengan info pekerjaan
   - Navigasi ke detail lowongan

2. **Apply Job Page**
   - Form dinamis berdasarkan konfigurasi job
   - Validasi sesuai requirement (mandatory/optional)
   - Upload resume dan dokumen

3. **Profile Picture via Hand Gesture**
   - Deteksi 3 pose tangan (1️⃣ 2️⃣ 3️⃣ jari)
   - Foto otomatis setelah pose 3 terdeteksi
   - Preview dan save foto
   - Opsional untuk posisi Intern, mandatory untuk full-time

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v18 atau lebih tinggi)
- npm atau yarn

### Installation

1. Clone repository
```bash
git clone <repository-url>
cd hiring-management-app
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
```

Edit file `.env` sesuai kebutuhan:
- Untuk menggunakan Supabase: isi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`
- Untuk mode lokal: set `VITE_USE_LOCAL_STORAGE=true`

4. Run development server
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## 📦 Build untuk Production

```bash
npm run build
```

Build files akan tersedia di folder `dist/`

## 🧪 Testing

```bash
npm run lint
```

## 🗃️ Database Schema (Supabase)

### Table: users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'applicant')),
  name TEXT,
  department TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Table: jobs
```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  department TEXT,
  location TEXT,
  employment_type TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'draft')),
  form_configuration JSONB NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Table: applications
```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  applicant_data JSONB NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('submitted', 'reviewed', 'shortlisted', 'rejected', 'accepted')),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES users(id),
  notes TEXT
);
```

## 📝 Component Structure Guide

### Admin Components

#### JobList.tsx
Menampilkan list semua pekerjaan dengan filter dan sorting

#### CreateJobModal.tsx
Modal/form untuk membuat pekerjaan baru dengan konfigurasi form

#### CandidateTable.tsx
Tabel kandidat dengan fitur resize, reorder, sort, filter

### Applicant Components

#### ApplicationForm.tsx
Form aplikasi yang render field secara dinamis berdasarkan job config

#### WebcamCapture.tsx
Component untuk capture foto dengan deteksi hand gesture

#### DynamicFormField.tsx
Render field form berdasarkan type dan requirement

## 🎨 Styling

Anda bebas menggunakan CSS framework pilihan:
- Tailwind CSS (recommended)
- Material-UI
- Chakra UI
- Styled Components
- Atau vanilla CSS/SCSS

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| VITE_SUPABASE_URL | Supabase project URL | Yes (if using Supabase) |
| VITE_SUPABASE_ANON_KEY | Supabase anonymous key | Yes (if using Supabase) |
| VITE_USE_LOCAL_STORAGE | Use localStorage instead of Supabase | No |
| VITE_APP_NAME | Application name | No |
| VITE_APP_URL | Application URL | No |

## 📚 Referensi & Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [TensorFlow.js](https://www.tensorflow.org/js)
- [Hand Pose Detection](https://github.com/tensorflow/tfjs-models/tree/master/hand-pose-detection)

## 🤝 Contributing

Silakan buat branch baru untuk setiap fitur atau perbaikan bug.

## 📄 License

MIT License
