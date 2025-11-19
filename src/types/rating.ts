export interface CandidateRating {
  id: string;
  applicationId: string;
  reviewerId: string;
  technicalSkills: number;
  communication: number;
  cultureFit: number;
  experience: number;
  overall: number;
  feedback: string;
  createdAt: Date;
}

export interface RatingCriteria {
  name: string;
  weight: number;
  description: string;
}
