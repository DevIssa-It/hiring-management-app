// Applicant JobList Component

import type { Job } from '@/types';

export interface ApplicantJobListProps {
  jobs: Job[];
  onJobClick: (jobId: string) => void;
}

export const JobList: React.FC<ApplicantJobListProps> = ({ jobs, onJobClick }) => {
  // TODO: Implement applicant job list
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div key={job.id} onClick={() => onJobClick(job.id)} className="job-card">
          <h3>{job.title}</h3>
          <p>{job.department}</p>
          <p>{job.location}</p>
          {job.salaryMin && job.salaryMax && (
            <p>
              Rp {job.salaryMin.toLocaleString()} - Rp {job.salaryMax.toLocaleString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
