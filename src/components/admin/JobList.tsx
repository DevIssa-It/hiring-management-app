// Admin JobList Component
// See IMPLEMENTATION_GUIDE.md for details

import { JobListItem } from '@/types';

export interface JobListProps {
  jobs: JobListItem[];
  onJobClick: (jobId: string) => void;
  onCreateJob: () => void;
}

export const JobList: React.FC<JobListProps> = ({ jobs, onJobClick, onCreateJob }) => {
  // TODO: Implement job list component
  return (
    <div>
      <button onClick={onCreateJob}>+ Create Job</button>
      <div>
        {jobs.map((job) => (
          <div key={job.id} onClick={() => onJobClick(job.id)}>
            <h3>{job.title}</h3>
            <p>{job.department}</p>
            <span>{job.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
