# Component Implementation Guide

## Shared Components (Priority: High)

### 1. Button Component
```tsx
// src/components/shared/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

### 2. Input Component
```tsx
// src/components/shared/Input.tsx
interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'number' | 'date' | 'password';
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}
```

### 3. Modal Component
```tsx
// src/components/shared/Modal.tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

### 4. Badge Component
```tsx
// src/components/shared/Badge.tsx
interface BadgeProps {
  status: 'active' | 'inactive' | 'draft';
  children: React.ReactNode;
}
```

### 5. Table Component
```tsx
// src/components/shared/Table.tsx
interface TableProps<T> {
  columns: TableColumn[];
  data: T[];
  onSort?: (columnId: string) => void;
  onRowClick?: (row: T) => void;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

---

## Admin Components

### 1. JobList Component
**File:** `src/components/admin/JobList.tsx`

**Purpose:** Menampilkan list jobs dengan filter dan sorting

**Features:**
- Display jobs in grid/list view
- Status badge (active/inactive/draft)
- Search by title/department
- Filter by status
- Sort by date/title
- Click to view details

**Props:**
```tsx
interface JobListProps {
  jobs: JobListItem[];
  onJobClick: (jobId: string) => void;
  onCreateJob: () => void;
}
```

### 2. CreateJobModal Component
**File:** `src/components/admin/CreateJobModal.tsx`

**Purpose:** Modal untuk create/edit job

**Features:**
- Job metadata form (title, description, department, etc.)
- Form field configuration section
- Save as draft or publish
- Validation

**Props:**
```tsx
interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job?: Job; // for editing
  onSave: (job: Partial<Job>) => Promise<void>;
}
```

### 3. JobFormConfig Component
**File:** `src/components/admin/JobFormConfig.tsx`

**Purpose:** Configure which fields are mandatory/optional/off

**Features:**
- List all available fields
- Radio buttons for each field: Mandatory / Optional / Off
- Preview form based on config

**Props:**
```tsx
interface JobFormConfigProps {
  configuration: JobFormConfiguration;
  onChange: (config: JobFormConfiguration) => void;
}
```

### 4. CandidateTable Component
**File:** `src/components/admin/CandidateTable.tsx`

**Purpose:** Display candidates with resizable/reorderable columns

**Features:**
- Resizable columns (drag column border)
- Reorderable columns (drag column header)
- Sort by any column
- Filter/search
- Pagination
- Export to CSV

**Props:**
```tsx
interface CandidateTableProps {
  jobId: string;
  applications: Application[];
  onApplicationClick: (id: string) => void;
}
```

---

## Applicant Components

### 1. JobList Component
**File:** `src/components/applicant/JobList.tsx`

**Purpose:** Display active job postings

**Features:**
- Card layout
- Show job title, salary, department
- Filter/search
- Click to view details

**Props:**
```tsx
interface ApplicantJobListProps {
  jobs: Job[];
  onJobClick: (jobId: string) => void;
}
```

### 2. ApplicationForm Component
**File:** `src/components/applicant/ApplicationForm.tsx`

**Purpose:** Dynamic form based on job configuration

**Features:**
- Render fields based on formConfiguration
- Validation (mandatory fields)
- File upload for resume
- Webcam capture for profile picture
- Submit with loading state

**Props:**
```tsx
interface ApplicationFormProps {
  job: Job;
  onSubmit: (data: ApplicationData) => Promise<void>;
}
```

### 3. DynamicFormField Component
**File:** `src/components/applicant/DynamicFormField.tsx`

**Purpose:** Render individual form field based on config

**Features:**
- Support all field types (text, email, select, date, etc.)
- Show/hide based on requirement
- Validation based on requirement
- Error messages

**Props:**
```tsx
interface DynamicFormFieldProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}
```

### 4. WebcamCapture Component
**File:** `src/components/applicant/WebcamCapture.tsx`

**Purpose:** Capture photo using hand gesture

**Features:**
- Access webcam
- Detect hand gestures (1, 2, 3 fingers)
- Countdown after 3 fingers detected
- Auto capture photo
- Preview captured image
- Retake option

**Props:**
```tsx
interface WebcamCaptureProps {
  onCapture: (imageBase64: string) => void;
  required: boolean; // based on employment type
}
```

**Implementation Notes:**
```tsx
// Use TensorFlow.js Hand Pose Detection
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-backend-webgl';

// Detect number of extended fingers
// Trigger countdown when 3 fingers detected
// Capture after countdown
```

---

## Services Implementation

### 1. jobService.ts
```tsx
// src/services/jobService.ts
export const jobService = {
  getJobs: (params?: QueryParams) => Promise<PaginatedResponse<Job>>,
  getJobById: (id: string) => Promise<Job>,
  createJob: (data: Partial<Job>) => Promise<Job>,
  updateJob: (id: string, data: Partial<Job>) => Promise<Job>,
  deleteJob: (id: string) => Promise<void>,
};
```

### 2. applicationService.ts
```tsx
// src/services/applicationService.ts
export const applicationService = {
  getApplications: (jobId: string) => Promise<Application[]>,
  getApplicationById: (id: string) => Promise<Application>,
  submitApplication: (jobId: string, data: ApplicationData) => Promise<Application>,
  updateApplicationStatus: (id: string, status: string) => Promise<Application>,
};
```

### 3. storageService.ts
```tsx
// src/services/storageService.ts
// Abstract storage layer (Supabase or LocalStorage)
export const storageService = {
  get: <T>(key: string) => Promise<T>,
  set: <T>(key: string, value: T) => Promise<void>,
  remove: (key: string) => Promise<void>,
  query: <T>(table: string, filters?: any) => Promise<T[]>,
};
```

---

## Custom Hooks

### 1. useAuth
```tsx
// src/hooks/useAuth.ts
export const useAuth = () => {
  const login = (email: string, password: string) => Promise<void>;
  const logout = () => Promise<void>;
  const register = (data: RegisterData) => Promise<void>;
  
  return { user, isAuthenticated, isLoading, login, logout, register };
};
```

### 2. useJobs
```tsx
// src/hooks/useJobs.ts
export const useJobs = () => {
  const fetchJobs = () => Promise<void>;
  const createJob = (data: Partial<Job>) => Promise<void>;
  const updateJob = (id: string, data: Partial<Job>) => Promise<void>;
  
  return { jobs, isLoading, error, fetchJobs, createJob, updateJob };
};
```

### 3. useHandGesture
```tsx
// src/hooks/useHandGesture.ts
export const useHandGesture = () => {
  const startDetection = () => void;
  const stopDetection = () => void;
  
  return { 
    currentGesture, 
    isDetecting, 
    startDetection, 
    stopDetection 
  };
};
```

### 4. useTable
```tsx
// src/hooks/useTable.ts
export const useTable = <T>(data: T[]) => {
  const [tableState, setTableState] = useState<TableState>();
  
  const sort = (columnId: string) => void;
  const filter = (filters: Record<string, string>) => void;
  const paginate = (page: number) => void;
  
  return { 
    tableState, 
    sortedData, 
    sort, 
    filter, 
    paginate 
  };
};
```

---

## Implementation Priority

### Phase 1: Setup & Core (Week 1)
1. ✅ Project setup with Vite
2. ✅ TypeScript types
3. Shared components (Button, Input, Modal, Badge)
4. Auth context & service
5. Storage service (LocalStorage mode)

### Phase 2: Admin Features (Week 2)
1. Job list page & components
2. Create job modal
3. Job form configuration
4. Job CRUD operations

### Phase 3: Applicant Features (Week 3)
1. Job list page for applicants
2. Job detail page
3. Application form (dynamic fields)
4. Form validation
5. Submit application

### Phase 4: Advanced Features (Week 4)
1. Candidate table with resize/reorder
2. Webcam capture component
3. Hand gesture detection
4. Profile picture upload
5. Application status management

### Phase 5: Polish & Testing (Week 5)
1. Error handling
2. Loading states
3. Notifications
4. Responsive design
5. Testing & bug fixes

---

## Development Tips

1. **Start with mock data** - Create mock data in `src/utils/mockData.ts`
2. **Build UI first** - Implement components with static data
3. **Add functionality** - Wire up state management and API calls
4. **Validate thoroughly** - Ensure form validation works correctly
5. **Test edge cases** - Test with different configurations
6. **Optimize** - Add memoization where needed
7. **Document** - Add comments for complex logic

## Testing Strategy

1. **Component Testing**
   - Test each component in isolation
   - Mock props and callbacks
   - Verify rendering and interactions

2. **Integration Testing**
   - Test complete flows (create job, apply job)
   - Verify data persistence
   - Test error scenarios

3. **E2E Testing** (Optional)
   - Full user journeys
   - Admin creates job → Applicant applies
   - Verify data consistency
