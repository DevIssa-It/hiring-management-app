// Applicant JobCard Component

import type { Job } from '@/types';

export interface JobCardProps {
  job: Job;
  onClick: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  return (
    <div onClick={onClick} className="job-card">
      <h3>{job.title}</h3>
      <p className="department">{job.department}</p>
      <p className="location">{job.location}</p>
      <p className="employment-type">{job.employmentType}</p>
      {job.salaryMin && job.salaryMax && (
        <p className="salary">
          Rp {job.salaryMin.toLocaleString()} - Rp {job.salaryMax.toLocaleString()}
        </p>
      )}
      <button>View Details</button>
    </div>
  );
};
