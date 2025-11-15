// Dummy Data for Testing

import { 
  User, 
  Job, 
  Application, 
  UserRole, 
  JobStatus, 
  EmploymentType,
  Gender,
  FieldRequirement 
} from '@/types';

// ==================== USERS ====================

export const dummyAdmin: User & { name: string; department?: string } = {
  id: 'admin-1',
  email: 'admin@company.com',
  role: UserRole.ADMIN,
  name: 'Admin User',
  department: 'Human Resources',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const dummyApplicant1: User = {
  id: 'user-1',
  email: 'john.doe@example.com',
  role: UserRole.APPLICANT,
  createdAt: new Date('2024-11-01'),
  updatedAt: new Date('2024-11-01'),
};

export const dummyApplicant2: User = {
  id: 'user-2',
  email: 'jane.smith@example.com',
  role: UserRole.APPLICANT,
  createdAt: new Date('2024-11-05'),
  updatedAt: new Date('2024-11-05'),
};

export const dummyApplicant3: User = {
  id: 'user-3',
  email: 'mike.johnson@example.com',
  role: UserRole.APPLICANT,
  createdAt: new Date('2024-11-10'),
  updatedAt: new Date('2024-11-10'),
};

export const dummyUsers = {
  admin: dummyAdmin,
  applicants: [dummyApplicant1, dummyApplicant2, dummyApplicant3],
  all: [dummyAdmin, dummyApplicant1, dummyApplicant2, dummyApplicant3],
};

// ==================== JOBS ====================

export const dummyJob1: Job = {
  id: 'job-1',
  title: 'Senior Frontend Developer',
  description: 'We are looking for an experienced Frontend Developer to join our team. You will be responsible for building the client-side of our web applications using modern frameworks like React and TypeScript.',
  department: 'Engineering',
  location: 'Jakarta, Indonesia',
  employmentType: EmploymentType.FULL_TIME,
  salaryMin: 15000000,
  salaryMax: 25000000,
  status: JobStatus.ACTIVE,
  formConfiguration: {
    fullName: FieldRequirement.MANDATORY,
    email: FieldRequirement.MANDATORY,
    phone: FieldRequirement.MANDATORY,
    gender: FieldRequirement.OPTIONAL,
    dateOfBirth: FieldRequirement.OPTIONAL,
    linkedin: FieldRequirement.OPTIONAL,
    portfolio: FieldRequirement.MANDATORY,
    domicile: FieldRequirement.MANDATORY,
    expectedSalary: FieldRequirement.OPTIONAL,
    availability: FieldRequirement.OPTIONAL,
    profilePicture: FieldRequirement.OFF,
    resume: FieldRequirement.MANDATORY,
    coverLetter: FieldRequirement.OPTIONAL,
  },
  createdBy: 'admin-1',
  createdAt: new Date('2024-11-01'),
  updatedAt: new Date('2024-11-01'),
};

export const dummyJob2: Job = {
  id: 'job-2',
  title: 'Backend Engineer - Node.js',
  description: 'Join our backend team to build scalable microservices using Node.js and TypeScript. You will work on designing APIs, database optimization, and cloud infrastructure.',
  department: 'Engineering',
  location: 'Bandung, Indonesia',
  employmentType: EmploymentType.FULL_TIME,
  salaryMin: 12000000,
  salaryMax: 20000000,
  status: JobStatus.ACTIVE,
  formConfiguration: {
    fullName: FieldRequirement.MANDATORY,
    email: FieldRequirement.MANDATORY,
    phone: FieldRequirement.MANDATORY,
    gender: FieldRequirement.MANDATORY,
    dateOfBirth: FieldRequirement.MANDATORY,
    linkedin: FieldRequirement.OPTIONAL,
    portfolio: FieldRequirement.OPTIONAL,
    domicile: FieldRequirement.MANDATORY,
    expectedSalary: FieldRequirement.OPTIONAL,
    availability: FieldRequirement.OPTIONAL,
    profilePicture: FieldRequirement.OFF,
    resume: FieldRequirement.MANDATORY,
    coverLetter: FieldRequirement.OPTIONAL,
  },
  createdBy: 'admin-1',
  createdAt: new Date('2024-11-05'),
  updatedAt: new Date('2024-11-05'),
};

export const dummyJob3: Job = {
  id: 'job-3',
  title: 'UI/UX Designer Intern',
  description: 'Looking for a creative intern to help design user interfaces and improve user experience. Great opportunity to learn and grow in a fast-paced startup environment.',
  department: 'Design',
  location: 'Remote',
  employmentType: EmploymentType.INTERN,
  status: JobStatus.ACTIVE,
  formConfiguration: {
    fullName: FieldRequirement.MANDATORY,
    email: FieldRequirement.MANDATORY,
    phone: FieldRequirement.MANDATORY,
    gender: FieldRequirement.OFF,
    dateOfBirth: FieldRequirement.OPTIONAL,
    linkedin: FieldRequirement.OPTIONAL,
    portfolio: FieldRequirement.MANDATORY,
    domicile: FieldRequirement.OPTIONAL,
    expectedSalary: FieldRequirement.OFF,
    availability: FieldRequirement.OPTIONAL,
    profilePicture: FieldRequirement.OFF,
    resume: FieldRequirement.MANDATORY,
    coverLetter: FieldRequirement.OPTIONAL,
  },
  createdBy: 'admin-1',
  createdAt: new Date('2024-11-10'),
  updatedAt: new Date('2024-11-10'),
};

export const dummyJob4: Job = {
  id: 'job-4',
  title: 'DevOps Engineer',
  description: 'We need a DevOps engineer to manage our cloud infrastructure, CI/CD pipelines, and monitoring systems.',
  department: 'Engineering',
  location: 'Surabaya, Indonesia',
  employmentType: EmploymentType.CONTRACT,
  salaryMin: 18000000,
  salaryMax: 30000000,
  status: JobStatus.DRAFT,
  formConfiguration: {
    fullName: FieldRequirement.MANDATORY,
    email: FieldRequirement.MANDATORY,
    phone: FieldRequirement.MANDATORY,
    gender: FieldRequirement.MANDATORY,
    dateOfBirth: FieldRequirement.MANDATORY,
    linkedin: FieldRequirement.OPTIONAL,
    portfolio: FieldRequirement.OPTIONAL,
    domicile: FieldRequirement.MANDATORY,
    expectedSalary: FieldRequirement.OPTIONAL,
    availability: FieldRequirement.MANDATORY,
    profilePicture: FieldRequirement.OFF,
    resume: FieldRequirement.MANDATORY,
    coverLetter: FieldRequirement.OPTIONAL,
  },
  createdBy: 'admin-1',
  createdAt: new Date('2024-11-12'),
  updatedAt: new Date('2024-11-14'),
};

export const dummyJob5: Job = {
  id: 'job-5',
  title: 'Product Manager',
  description: 'Lead product strategy and roadmap for our SaaS platform. Work closely with engineering and design teams.',
  department: 'Product',
  location: 'Jakarta, Indonesia',
  employmentType: EmploymentType.FULL_TIME,
  salaryMin: 20000000,
  salaryMax: 35000000,
  status: JobStatus.INACTIVE,
  formConfiguration: {
    fullName: FieldRequirement.MANDATORY,
    email: FieldRequirement.MANDATORY,
    phone: FieldRequirement.MANDATORY,
    gender: FieldRequirement.OPTIONAL,
    dateOfBirth: FieldRequirement.OPTIONAL,
    linkedin: FieldRequirement.MANDATORY,
    portfolio: FieldRequirement.OPTIONAL,
    domicile: FieldRequirement.MANDATORY,
    expectedSalary: FieldRequirement.OPTIONAL,
    availability: FieldRequirement.OPTIONAL,
    profilePicture: FieldRequirement.OFF,
    resume: FieldRequirement.MANDATORY,
    coverLetter: FieldRequirement.MANDATORY,
  },
  createdBy: 'admin-1',
  createdAt: new Date('2024-10-20'),
  updatedAt: new Date('2024-11-01'),
};

export const dummyJobs = [
  dummyJob1,
  dummyJob2,
  dummyJob3,
  dummyJob4,
  dummyJob5,
];

// ==================== APPLICATIONS ====================

export const dummyApplication1: Application = {
  id: 'app-1',
  jobId: 'job-1',
  applicantData: {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+62812-3456-7890',
    domicile: 'Jakarta',
    dateOfBirth: new Date('1995-05-15'),
    gender: Gender.MALE,
  },
  status: 'submitted',
  appliedAt: new Date('2024-11-02'),
};

export const dummyApplication2: Application = {
  id: 'app-2',
  jobId: 'job-1',
  applicantData: {
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+62813-9876-5432',
    domicile: 'Jakarta',
    dateOfBirth: new Date('1993-08-22'),
    gender: Gender.FEMALE,
  },
  status: 'accepted',
  appliedAt: new Date('2024-11-03'),
  reviewedAt: new Date('2024-11-04'),
};

export const dummyApplication3: Application = {
  id: 'app-3',
  jobId: 'job-2',
  applicantData: {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+62812-3456-7890',
    domicile: 'Bandung',
    dateOfBirth: new Date('1995-05-15'),
    gender: Gender.MALE,
  },
  status: 'submitted',
  appliedAt: new Date('2024-11-06'),
};

export const dummyApplication4: Application = {
  id: 'app-4',
  jobId: 'job-3',
  applicantData: {
    fullName: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+62814-5555-6666',
    domicile: 'Yogyakarta',
  },
  status: 'rejected',
  appliedAt: new Date('2024-11-11'),
  reviewedAt: new Date('2024-11-13'),
};

export const dummyApplication5: Application = {
  id: 'app-5',
  jobId: 'job-2',
  applicantData: {
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+62813-9876-5432',
    domicile: 'Bandung',
    dateOfBirth: new Date('1993-08-22'),
    gender: Gender.FEMALE,
  },
  status: 'accepted',
  appliedAt: new Date('2024-11-07'),
  reviewedAt: new Date('2024-11-09'),
};

export const dummyApplications = [
  dummyApplication1,
  dummyApplication2,
  dummyApplication3,
  dummyApplication4,
  dummyApplication5,
];

// ==================== HELPER FUNCTIONS ====================

// Get jobs by status
export const getJobsByStatus = (status: JobStatus) => {
  return dummyJobs.filter(job => job.status === status);
};

// Get active jobs
export const getActiveJobs = () => {
  return dummyJobs.filter(job => job.status === JobStatus.ACTIVE);
};

// Get applications by job
export const getApplicationsByJob = (jobId: string) => {
  return dummyApplications.filter(app => app.jobId === jobId);
};

// Get applications by applicant
export const getApplicationsByApplicant = (applicantEmail: string) => {
  return dummyApplications.filter(app => app.applicantData.email === applicantEmail);
};

// Get applications by status
export const getApplicationsByStatus = (status: Application['status']) => {
  return dummyApplications.filter(app => app.status === status);
};

// Get job by ID
export const getJobById = (jobId: string) => {
  return dummyJobs.find(job => job.id === jobId);
};

// Get application by ID
export const getApplicationById = (appId: string) => {
  return dummyApplications.find(app => app.id === appId);
};

// Get user by email (for login simulation)
export const getUserByEmail = (email: string) => {
  return dummyUsers.all.find(user => user.email === email);
};

// Stats for dashboard
export const getDashboardStats = () => {
  return {
    totalJobs: dummyJobs.length,
    activeJobs: getActiveJobs().length,
    totalApplications: dummyApplications.length,
    submittedApplications: getApplicationsByStatus('submitted').length,
    acceptedApplications: getApplicationsByStatus('accepted').length,
    rejectedApplications: getApplicationsByStatus('rejected').length,
  };
};

// ==================== DEMO CREDENTIALS ====================

export const demoCredentials = {
  admin: {
    email: 'admin@company.com',
    password: 'admin123',
    user: dummyAdmin,
  },
  applicant1: {
    email: 'john.doe@example.com',
    password: 'user123',
    user: dummyApplicant1,
  },
  applicant2: {
    email: 'jane.smith@example.com',
    password: 'user123',
    user: dummyApplicant2,
  },
  applicant3: {
    email: 'mike.johnson@example.com',
    password: 'user123',
    user: dummyApplicant3,
  },
};
