import type { JobListItem } from '@/types';
import { JobCard } from './JobCard';
export interface JobListProps {
  jobs: JobListItem[];
  onJobClick: (jobId: string) => void;
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  onJobClick,
}) => {
  return (
          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={onJobClick}
              />              
            ))}
          </div>

  );
};
