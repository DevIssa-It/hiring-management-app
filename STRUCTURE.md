# Project Structure Documentation

## Penjelasan Struktur Folder

### `/src/components`
Berisi semua React components yang reusable

#### `/src/components/admin`
Components khusus untuk admin/recruiter:
- **JobList.tsx** - List semua lowongan kerja
- **JobCard.tsx** - Card component untuk menampilkan info job
- **CreateJobModal.tsx** - Modal untuk create/edit job
- **JobFormConfig.tsx** - Component untuk konfigurasi form fields (mandatory/optional/off)
- **CandidateTable.tsx** - Tabel untuk menampilkan kandidat
- **ResizableColumn.tsx** - Component untuk kolom yang bisa di-resize dan reorder

#### `/src/components/applicant`
Components khusus untuk pelamar kerja:
- **JobList.tsx** - List lowongan yang tersedia
- **JobCard.tsx** - Card untuk menampilkan info lowongan
- **ApplicationForm.tsx** - Form aplikasi kerja
- **DynamicFormField.tsx** - Component untuk render field secara dinamis
- **WebcamCapture.tsx** - Component untuk capture foto dengan hand gesture

#### `/src/components/shared`
Components yang digunakan bersama:
- **Button.tsx** - Reusable button component
- **Input.tsx** - Reusable input field
- **Modal.tsx** - Modal/dialog component
- **Select.tsx** - Dropdown select component
- **Badge.tsx** - Badge untuk status (active/inactive/draft)
- **Table.tsx** - Generic table component
- **Pagination.tsx** - Pagination component
- **Notification.tsx** - Toast/notification component

### `/src/pages`
Berisi page components (route-level components)

#### `/src/pages/admin`
- **AdminDashboard.tsx** - Dashboard utama admin
- **JobManagement.tsx** - Halaman manage semua jobs
- **CandidateManagement.tsx** - Halaman manage kandidat per job

#### `/src/pages/applicant`
- **JobListPage.tsx** - Halaman list semua lowongan
- **JobDetailPage.tsx** - Detail lowongan tertentu
- **ApplicationPage.tsx** - Halaman untuk apply job

### `/src/context`
React Context untuk state management global
- **AuthContext.tsx** - Context untuk authentication & user info
- **NotificationContext.tsx** - Context untuk notification system

### `/src/hooks`
Custom React hooks
- **useAuth.ts** - Hook untuk authentication logic
- **useJobs.ts** - Hook untuk job CRUD operations
- **useApplications.ts** - Hook untuk application management
- **useWebcam.ts** - Hook untuk webcam operations
- **useHandGesture.ts** - Hook untuk hand gesture detection
- **useTable.ts** - Hook untuk table state (sort, filter, pagination)

### `/src/services`
API services dan data layer
- **api.ts** - Base API client (Axios/Fetch wrapper)
- **jobService.ts** - Job-related API calls
- **applicationService.ts** - Application-related API calls
- **authService.ts** - Authentication API calls
- **storageService.ts** - LocalStorage/Supabase abstraction

### `/src/types`
TypeScript type definitions
- **index.ts** - All interfaces, types, and enums

### `/src/utils`
Utility functions
- **validation.ts** - Form validation helpers
- **formatters.ts** - Date, currency, text formatters
- **constants.ts** - App constants
- **helpers.ts** - General helper functions

### `/src/assets`
Static assets seperti images, icons, fonts

## File Flow Examples

### Admin Create Job Flow
```
JobManagement.tsx (page)
  └── CreateJobModal.tsx (component)
      └── JobFormConfig.tsx (component)
          └── Select.tsx (shared component)
      └── useJobs.ts (hook)
          └── jobService.ts (service)
              └── api.ts (base service)
```

### Applicant Apply Job Flow
```
ApplicationPage.tsx (page)
  └── ApplicationForm.tsx (component)
      └── DynamicFormField.tsx (component)
          └── Input.tsx / Select.tsx (shared components)
      └── WebcamCapture.tsx (component)
          └── useWebcam.ts (hook)
          └── useHandGesture.ts (hook)
      └── useApplications.ts (hook)
          └── applicationService.ts (service)
```

## Naming Conventions

### Files
- Components: PascalCase (e.g., `JobList.tsx`)
- Hooks: camelCase with 'use' prefix (e.g., `useAuth.ts`)
- Services: camelCase with 'Service' suffix (e.g., `jobService.ts`)
- Utils: camelCase (e.g., `validation.ts`)

### Variables & Functions
- Variables: camelCase (e.g., `jobList`, `currentUser`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- Functions: camelCase (e.g., `handleSubmit`, `fetchJobs`)
- React Components: PascalCase (e.g., `JobCard`, `ApplicationForm`)

### Types & Interfaces
- Interfaces: PascalCase (e.g., `Job`, `Application`)
- Enums: PascalCase (e.g., `JobStatus`, `UserRole`)
- Type aliases: PascalCase (e.g., `JobListItem`)

## State Management Strategy

### Local State
Gunakan `useState` untuk:
- Form input values
- UI state (modal open/close, loading, etc.)
- Component-specific data

### Context API
Gunakan Context untuk:
- Authentication state
- Current user info
- Global notifications
- Theme/settings

### Zustand (Optional)
Bisa digunakan untuk:
- Complex state management
- Cache query results
- Shared state across multiple components

## Best Practices

1. **Component Size**: Keep components small (< 200 lines)
2. **Single Responsibility**: One component = one purpose
3. **Prop Drilling**: Avoid deep prop drilling, use Context
4. **Type Safety**: Always define proper TypeScript types
5. **Error Handling**: Handle errors gracefully with try-catch
6. **Loading States**: Show loading indicators for async operations
7. **Validation**: Validate on both client and server side
8. **Accessibility**: Use semantic HTML and ARIA labels
9. **Performance**: Use React.memo, useMemo, useCallback when needed
10. **Code Reusability**: Extract common logic into hooks/utils
