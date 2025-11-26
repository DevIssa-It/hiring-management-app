// Constants

export const APP_NAME = 'Hiring Management App';

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

export const JOB_STATUS_LABELS = {
  active: 'Active',
  inactive: 'Inactive',
  draft: 'Draft',
} as const;

export const EMPLOYMENT_TYPE_LABELS = {
  intern: 'Intern',
  full_time: 'Full Time',
  part_time: 'Part Time',
  contract: 'Contract',
} as const;

export const APPLICATION_STATUS_LABELS = {
  submitted: 'Submitted',
  reviewed: 'Reviewed',
  shortlisted: 'Shortlisted',
  rejected: 'Rejected',
  accepted: 'Accepted',
} as const;

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export const FIELD_REQUIREMENT_OPTIONS = [
  { value: 'mandatory', label: 'Mandatory' },
  { value: 'optional', label: 'Optional' },
  { value: 'off', label: 'Off' },
];

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export const CURRENCY_SYMBOL = 'Rp';
export const CURRENCY_LOCALE = 'id-ID';

export const APPLICATION_STATUS_COLORS = {
  submitted: 'blue',
  reviewed: 'yellow',
  shortlisted: 'green',
  rejected: 'red',
  accepted: 'purple',
} as const;

export const JOB_LEVEL_OPTIONS = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
];
