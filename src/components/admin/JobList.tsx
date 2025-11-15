import {useState} from 'react';
import { FiSearch } from 'react-icons/fi';
import type { JobListItem } from '@/types';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { JobCard } from './JobCard';
import EmptyState from '../../assets/EmptyState.svg'
export interface JobListProps {
  jobs: JobListItem[];
  onJobClick: (jobId: string) => void;
  onCreateJob: () => void;
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  onJobClick,
  onCreateJob
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.departement?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="joblist" className="w-full">
      <div id="search-bar" className="relative mb-6">
        <FiSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-60 z-10"
        size={20} 
        />
        <Input
          type="text"
          placeholder="Search by job details..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="pl-10"
        />
      </div>

        {filteredJobs.length === 0 ? (
          <div id="empty-state" className="flex flex-col items-center justify-center py-16">
            <div className="w-64 h-64 mb-6 flex items-center justify-center">
              <img
                src={EmptyState}
                alt="No jobs found"
              />
            </div>

          <h3 className="text-xl font-semibold text-neutral-100 mb-2">
            No job openings available.
          </h3>

          <p className="text-xl font-semibold text-neutral-100 mb-2">
            Create a job opening now and start the candidate process.
          </p>

          <Button onClick={onCreateJob} variant="primary">
            Create a new job
          </Button>
        </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={onJobClick}
              />              
            ))}
          </div>
        )}
    </div>
  );
};
