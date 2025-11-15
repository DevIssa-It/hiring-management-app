// Admin JobCard Component

import { JobListItem } from '@/types';
import { Badge } from '@/components/shared/Badge';

export interface JobCardProps {
  job: JobListItem;
  onClick: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  // TODO: Implement job card component
  return (
    <div onClick={onClick} className="job-card">
      <h3>{job.title}</h3>
      <p>{job.department}</p>
      <Badge status={job.status} />
      {job.salaryMin && job.salaryMax && (
        <p>
          Rp {job.salaryMin.toLocaleString()} - Rp {job.salaryMax.toLocaleString()}
        </p>
      )}
      <small>{job.applicantsCount} applicants</small>
    </div>
  );
};
