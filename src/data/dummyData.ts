// Dummy Data for Testing

import { 
  User, 
  Admin, 
  Job, 
  Application, 
  UserRole, 
  JobStatus, 
  EmploymentType,
  Gender,
  FieldRequirement 
} from '@/types';

// ==================== USERS ====================

export const dummyAdmin: Admin = {
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
  requirements: [
    'Minimum 3 years experience with React',
    'Strong knowledge of TypeScript',
    'Experience with state management (Redux/Zustand)',
    'Familiar with Tailwind CSS',
    'Good understanding of REST APIs',
  ],
  location: 'Jakarta, Indonesia',
  employmentType: EmploymentType.FULL_TIME,
  status: JobStatus.ACTIVE,
  formConfiguration: {
    fullNameRequired: FieldRequirement.MANDATORY,
    emailRequired: FieldRequirement.MANDATORY,
    phoneRequired: FieldRequirement.MANDATORY,
    currentAddressRequired: FieldRequirement.OPTIONAL,
    permanentAddressRequired: FieldRequirement.OFF,
    cityRequired: FieldRequirement.MANDATORY,
    zipCodeRequired: FieldRequirement.OPTIONAL,
    birthDateRequired: FieldRequirement.OPTIONAL,
    genderRequired: FieldRequirement.OPTIONAL,
  },
  createdAt: new Date('2024-11-01'),
  updatedAt: new Date('2024-11-01'),
};

export const dummyJob2: Job = {
  id: 'job-2',
  title: 'Backend Engineer - Node.js',
  description: 'Join our backend team to build scalable microservices using Node.js and TypeScript. You will work on designing APIs, database optimization, and cloud infrastructure.',
  requirements: [
    '2+ years experience with Node.js',
    'Knowledge of Express.js or NestJS',
    'Experience with SQL and NoSQL databases',
    'Understanding of microservices architecture',
    'Familiar with Docker and Kubernetes',
  ],
  location: 'Bandung, Indonesia',
  employmentType: EmploymentType.FULL_TIME,
  status: JobStatus.ACTIVE,
  formConfiguration: {
    fullNameRequired: FieldRequirement.MANDATORY,
    emailRequired: FieldRequirement.MANDATORY,
    phoneRequired: FieldRequirement.MANDATORY,
    currentAddressRequired: FieldRequirement.MANDATORY,
    permanentAddressRequired: FieldRequirement.OPTIONAL,
    cityRequired: FieldRequirement.MANDATORY,
    zipCodeRequired: FieldRequirement.MANDATORY,
    birthDateRequired: FieldRequirement.MANDATORY,
    genderRequired: FieldRequirement.MANDATORY,
  },
  createdAt: new Date('2024-11-05'),
  updatedAt: new Date('2024-11-05'),
};

export const dummyJob3: Job = {
  id: 'job-3',
  title: 'UI/UX Designer Intern',
  description: 'Looking for a creative intern to help design user interfaces and improve user experience. Great opportunity to learn and grow in a fast-paced startup environment.',
  requirements: [
    'Currently pursuing degree in Design or related field',
    'Proficient in Figma or Adobe XD',
    'Basic understanding of design principles',
    'Portfolio showcasing UI/UX projects',
    'Good communication skills',
  ],
  location: 'Remote',
  employmentType: EmploymentType.INTERN,
  status: JobStatus.ACTIVE,
  formConfiguration: {
    fullNameRequired: FieldRequirement.MANDATORY,
    emailRequired: FieldRequirement.MANDATORY,
    phoneRequired: FieldRequirement.MANDATORY,
    currentAddressRequired: FieldRequirement.OPTIONAL,
    permanentAddressRequired: FieldRequirement.OFF,
    cityRequired: FieldRequirement.OPTIONAL,
    zipCodeRequired: FieldRequirement.OFF,
    birthDateRequired: FieldRequirement.OPTIONAL,
    genderRequired: FieldRequirement.OFF,
  },
  createdAt: new Date('2024-11-10'),
  updatedAt: new Date('2024-11-10'),
};

export const dummyJob4: Job = {
  id: 'job-4',
  title: 'DevOps Engineer',
  description: 'We need a DevOps engineer to manage our cloud infrastructure, CI/CD pipelines, and monitoring systems.',
  requirements: [
    '3+ years in DevOps role',
    'Experience with AWS or GCP',
    'Strong knowledge of Docker and Kubernetes',
    'CI/CD tools (Jenkins, GitLab CI, GitHub Actions)',
    'Infrastructure as Code (Terraform)',
  ],
  location: 'Surabaya, Indonesia',
  employmentType: EmploymentType.CONTRACT,
  status: JobStatus.DRAFT,
  formConfiguration: {
    fullNameRequired: FieldRequirement.MANDATORY,
    emailRequired: FieldRequirement.MANDATORY,
    phoneRequired: FieldRequirement.MANDATORY,
    currentAddressRequired: FieldRequirement.MANDATORY,
    permanentAddressRequired: FieldRequirement.MANDATORY,
    cityRequired: FieldRequirement.MANDATORY,
    zipCodeRequired: FieldRequirement.MANDATORY,
    birthDateRequired: FieldRequirement.MANDATORY,
    genderRequired: FieldRequirement.MANDATORY,
  },
  createdAt: new Date('2024-11-12'),
  updatedAt: new Date('2024-11-14'),
};

export const dummyJob5: Job = {
  id: 'job-5',
  title: 'Product Manager',
  description: 'Lead product strategy and roadmap for our SaaS platform. Work closely with engineering and design teams.',
  requirements: [
    '4+ years in product management',
    'Experience with B2B SaaS products',
    'Strong analytical and communication skills',
    'Familiar with Agile methodologies',
    'Technical background preferred',
  ],
  location: 'Jakarta, Indonesia',
  employmentType: EmploymentType.FULL_TIME,
  status: JobStatus.INACTIVE,
  formConfiguration: {
    fullNameRequired: FieldRequirement.MANDATORY,
    emailRequired: FieldRequirement.MANDATORY,
    phoneRequired: FieldRequirement.MANDATORY,
    currentAddressRequired: FieldRequirement.OPTIONAL,
    permanentAddressRequired: FieldRequirement.OFF,
    cityRequired: FieldRequirement.MANDATORY,
    zipCodeRequired: FieldRequirement.OPTIONAL,
    birthDateRequired: FieldRequirement.OPTIONAL,
    genderRequired: FieldRequirement.OPTIONAL,
  },
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
  applicantId: 'user-1',
  formData: {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+62812-3456-7890',
    currentAddress: 'Jl. Sudirman No. 123, Jakarta',
    city: 'Jakarta',
    zipCode: '12190',
    birthDate: '1995-05-15',
    gender: Gender.MALE,
  },
  webcamImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...', // Mock base64
  status: 'pending',
  createdAt: new Date('2024-11-02'),
  updatedAt: new Date('2024-11-02'),
};

export const dummyApplication2: Application = {
  id: 'app-2',
  jobId: 'job-1',
  applicantId: 'user-2',
  formData: {
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+62813-9876-5432',
    currentAddress: 'Jl. Thamrin No. 45, Jakarta',
    city: 'Jakarta',
    zipCode: '10350',
    birthDate: '1993-08-22',
    gender: Gender.FEMALE,
  },
  webcamImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
  status: 'approved',
  createdAt: new Date('2024-11-03'),
  updatedAt: new Date('2024-11-04'),
};

export const dummyApplication3: Application = {
  id: 'app-3',
  jobId: 'job-2',
  applicantId: 'user-1',
  formData: {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+62812-3456-7890',
    currentAddress: 'Jl. Sudirman No. 123, Jakarta',
    permanentAddress: 'Jl. Gatot Subroto No. 78, Bandung',
    city: 'Bandung',
    zipCode: '40123',
    birthDate: '1995-05-15',
    gender: Gender.MALE,
  },
  webcamImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
  status: 'pending',
  createdAt: new Date('2024-11-06'),
  updatedAt: new Date('2024-11-06'),
};

export const dummyApplication4: Application = {
  id: 'app-4',
  jobId: 'job-3',
  applicantId: 'user-3',
  formData: {
    fullName: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+62814-5555-6666',
    city: 'Yogyakarta',
  },
  webcamImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
  status: 'rejected',
  createdAt: new Date('2024-11-11'),
  updatedAt: new Date('2024-11-13'),
};

export const dummyApplication5: Application = {
  id: 'app-5',
  jobId: 'job-2',
  applicantId: 'user-2',
  formData: {
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+62813-9876-5432',
    currentAddress: 'Jl. Thamrin No. 45, Jakarta',
    permanentAddress: 'Jl. Asia Afrika No. 12, Bandung',
    city: 'Bandung',
    zipCode: '40111',
    birthDate: '1993-08-22',
    gender: Gender.FEMALE,
  },
  webcamImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
  status: 'approved',
  createdAt: new Date('2024-11-07'),
  updatedAt: new Date('2024-11-09'),
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
export const getApplicationsByApplicant = (applicantId: string) => {
  return dummyApplications.filter(app => app.applicantId === applicantId);
};

// Get applications by status
export const getApplicationsByStatus = (status: string) => {
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
    pendingApplications: getApplicationsByStatus('pending').length,
    approvedApplications: getApplicationsByStatus('approved').length,
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
