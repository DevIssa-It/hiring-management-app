// Constants

export const APP_NAME = 'Hiring Management App' as const;

// Route constants with centralized path definitions
export const ROUTES = {
  HOME: '/',
  // Admin routes
  ADMIN_DASHBOARD: '/admin',
  ADMIN_JOBS: '/admin/jobs',
  ADMIN_CANDIDATES: '/admin/candidates/:jobId',
  // Applicant routes
  APPLICANT_JOBS: '/jobs',
  APPLICANT_JOB_DETAIL: '/jobs/:id',
  APPLICANT_APPLY: '/jobs/:id/apply',
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
} as const;

// Enums for better type safety and autocomplete
export enum JobStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
  PUBLISHED = 'published'
}

export enum EmploymentType {
  INTERN = 'intern',
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract'
}

export enum ApplicationStatus {
  SUBMITTED = 'submitted',
  REVIEWED = 'reviewed',
  SHORTLISTED = 'shortlisted',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted'
}

export enum JobLevel {
  ENTRY = 'entry',
  JUNIOR = 'junior',
  MID = 'mid',
  SENIOR = 'senior',
  LEAD = 'lead'
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export enum FieldRequirement {
  MANDATORY = 'mandatory',
  OPTIONAL = 'optional',
  OFF = 'off'
}

// Display labels mapped from enums
export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  [JobStatus.ACTIVE]: 'Active',
  [JobStatus.INACTIVE]: 'Inactive',
  [JobStatus.DRAFT]: 'Draft',
  [JobStatus.PUBLISHED]: 'Published',
} as const;

export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  [EmploymentType.INTERN]: 'Intern',
  [EmploymentType.FULL_TIME]: 'Full Time',
  [EmploymentType.PART_TIME]: 'Part Time',
  [EmploymentType.CONTRACT]: 'Contract',
} as const;

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  [ApplicationStatus.SUBMITTED]: 'Submitted',
  [ApplicationStatus.REVIEWED]: 'Reviewed',
  [ApplicationStatus.SHORTLISTED]: 'Shortlisted',
  [ApplicationStatus.REJECTED]: 'Rejected',
  [ApplicationStatus.ACCEPTED]: 'Accepted',
} as const;

// Select options arrays
export const GENDER_OPTIONS = [
  { value: Gender.MALE, label: 'Male' },
  { value: Gender.FEMALE, label: 'Female' },
  { value: Gender.OTHER, label: 'Other' },
] as const;

export const FIELD_REQUIREMENT_OPTIONS = [
  { value: FieldRequirement.MANDATORY, label: 'Mandatory' },
  { value: FieldRequirement.OPTIONAL, label: 'Optional' },
  { value: FieldRequirement.OFF, label: 'Off' },
] as const;

export const JOB_LEVEL_OPTIONS = [
  { value: JobLevel.ENTRY, label: 'Entry Level' },
  { value: JobLevel.JUNIOR, label: 'Junior' },
  { value: JobLevel.MID, label: 'Mid Level' },
  { value: JobLevel.SENIOR, label: 'Senior' },
  { value: JobLevel.LEAD, label: 'Lead' },
] as const;

// Pagination constants
export const DEFAULT_PAGE_SIZE = 10 as const;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

// Localization constants
export const CURRENCY_SYMBOL = 'Rp' as const;
export const CURRENCY_LOCALE = 'id-ID' as const;

// Status color mapping for UI components
export const APPLICATION_STATUS_COLORS: Record<ApplicationStatus, string> = {
  [ApplicationStatus.SUBMITTED]: 'blue',
  [ApplicationStatus.REVIEWED]: 'yellow',
  [ApplicationStatus.SHORTLISTED]: 'green',
  [ApplicationStatus.REJECTED]: 'red',
  [ApplicationStatus.ACCEPTED]: 'purple',
} as const;

// File upload constraints
export const MAX_FILE_SIZE = 5 * 1024 * 1024 as const; // 5MB
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
] as const;

// Performance constants
export const DEBOUNCE_DELAY = 300 as const; // ms
export const TOAST_DURATION = 3000 as const; // ms

// Legacy exports for backward compatibility (deprecated)
/** @deprecated Use JobStatus enum instead */
export const JOB_STATUSES = {
  ACTIVE: JobStatus.ACTIVE,
  INACTIVE: JobStatus.INACTIVE,
  DRAFT: JobStatus.DRAFT,
  PUBLISHED: JobStatus.PUBLISHED,
} as const;

/** @deprecated Use EmploymentType enum instead */
export const EMPLOYMENT_TYPES = {
  INTERN: EmploymentType.INTERN,
  FULL_TIME: EmploymentType.FULL_TIME,
  PART_TIME: EmploymentType.PART_TIME,
  CONTRACT: EmploymentType.CONTRACT,
} as const;

/** @deprecated Use ApplicationStatus enum instead */
export const APPLICATION_STATUSES = {
  SUBMITTED: ApplicationStatus.SUBMITTED,
  REVIEWED: ApplicationStatus.REVIEWED,
  SHORTLISTED: ApplicationStatus.SHORTLISTED,
  REJECTED: ApplicationStatus.REJECTED,
  ACCEPTED: ApplicationStatus.ACCEPTED,
} as const;
