// ==================== ENUMS ====================

export enum UserRole {
  ADMIN = 'admin',
  APPLICANT = 'applicant',
}

export enum JobStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
}

export enum FieldRequirement {
  MANDATORY = 'mandatory',
  OPTIONAL = 'optional',
  OFF = 'off',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum EmploymentType {
  INTERN = 'intern',
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
}

// ==================== USER TYPES ====================

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Admin extends User {
  role: UserRole.ADMIN;
  name: string;
  department?: string;
}

// ==================== JOB TYPES ====================

export interface JobFormConfiguration {
  fullName: FieldRequirement;
  email: FieldRequirement;
  phone: FieldRequirement;
  gender: FieldRequirement;
  dateOfBirth: FieldRequirement;
  linkedin: FieldRequirement;
  portfolio: FieldRequirement;
  domicile: FieldRequirement;
  expectedSalary: FieldRequirement;
  availability: FieldRequirement;
  profilePicture: FieldRequirement;
  resume: FieldRequirement;
  coverLetter: FieldRequirement;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  salaryMin?: number;
  salaryMax?: number;
  status: JobStatus;
  formConfiguration: JobFormConfiguration;
  createdBy: string; // Admin ID
  createdAt: Date;
  updatedAt: Date;
}

export interface JobListItem {
  id: string;
  title: string;
  department: string;
  status: JobStatus;
  salaryMin?: number;
  salaryMax?: number;
  applicantsCount: number;
  createdAt: Date;
}

// ==================== APPLICATION TYPES ====================

export interface ApplicationData {
  fullName?: string;
  email?: string;
  phone?: string;
  gender?: Gender;
  dateOfBirth?: Date;
  linkedin?: string;
  portfolio?: string;
  domicile?: string;
  expectedSalary?: number;
  availability?: Date;
  profilePicture?: string; // Base64 or URL
  resume?: File | string;
  coverLetter?: string;
}

export interface Application {
  id: string;
  jobId: string;
  applicantData: ApplicationData;
  status: 'submitted' | 'reviewed' | 'shortlisted' | 'rejected' | 'accepted';
  appliedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string; // Admin ID
  notes?: string;
}

export interface CandidateTableRow {
  id: string;
  name: string;
  email: string;
  phone?: string;
  gender?: Gender;
  linkedin?: string;
  domicile?: string;
  appliedDate: Date;
  status: Application['status'];
}

// ==================== TABLE TYPES ====================

export interface TableColumn {
  id: string;
  label: string;
  width: number;
  order: number;
  visible: boolean;
  sortable: boolean;
}

export interface TableState {
  columns: TableColumn[];
  sortBy?: string;
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  pageSize: number;
  filters: Record<string, string>;
}

// ==================== WEBCAM TYPES ====================

export enum HandGesture {
  ONE = 1,
  TWO = 2,
  THREE = 3,
}

export interface WebcamCaptureState {
  isActive: boolean;
  currentGesture?: HandGesture;
  countdown?: number;
  capturedImage?: string;
  error?: string;
}

// ==================== FORM VALIDATION ====================

export interface FormField {
  name: keyof ApplicationData;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'number' | 'select' | 'textarea' | 'file' | 'webcam';
  requirement: FieldRequirement;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    pattern?: RegExp;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
  };
}

// ==================== API RESPONSE TYPES ====================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ==================== NOTIFICATION TYPES ====================

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  createdAt: Date;
}
