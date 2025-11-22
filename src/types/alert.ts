export interface JobAlert {
  id: string;
  userId: string;
  keywords: string[];
  location?: string;
  employmentType?: string;
  salaryMin?: number;
  active: boolean;
  createdAt: Date;
}
