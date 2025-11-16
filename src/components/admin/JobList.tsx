import { JobCard } from './JobCard';
import type { JobListItem } from '@/types';

export interface JobListProps {
  jobs: JobListItem[];
  onJobClick: (jobId: string) => void;
  onStatusChange?: (jobId: string, status: 'active' | 'inactive') => void;
}

export const JobList: React.FC<JobListProps> = ({ jobs, onJobClick, onStatusChange }) => {
  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <JobCard 
          key={job.id} 
          job={job} 
          onClick={onJobClick}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};
