import { useState } from 'react';
import type { JobListItem } from '@/types';
import { Badge } from '@/components/shared/Badge';
import { Button } from "@/components/shared/Button";

export interface JobCardProps {
  job: JobListItem;
  onClick: (jobId: string) => void;
  onStatusChange?: (jobId: string, status: 'active' | 'inactive') => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick, onStatusChange }) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatSalary = (min?:number, max?: number) => {
    if (!min || !max) return 'Salary not specified';
    return `Rp${min.toLocaleString('id-ID')} - Rp${max.toLocaleString('id-ID')}`;
  }

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
  }

  const handleStatusChange = (status: 'active' | 'inactive') => {
    if (onStatusChange) {
      onStatusChange(job.id, status);
    }
    setShowMenu(false);
  }

  return (
    <div id="JobCard" className="bg-white rounded-lg border border-neutral-40 p-4 hover:shadow-md transition-shadow relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-neutral-70 hover:text-neutral-100 p-1"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
          </svg>
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-40 py-2 z-10">
            {job.status === 'active' ? (
              <button
                onClick={() => handleStatusChange('inactive')}
                className="w-full text-left px-4 py-2 text-sm text-neutral-90 hover:bg-neutral-20 transition-colors"
              >
                Mark as Inactive
              </button>
            ) : (
              <button
                onClick={() => handleStatusChange('active')}
                className="w-full text-left px-4 py-2 text-sm text-neutral-90 hover:bg-neutral-20 transition-colors"
              >
                Mark as Active
              </button>
            )}
          </div>
        )}
      </div>

      <div id="header" className="flex items-start gap-3 mb-3">
        <Badge status={job.status} />
        <span id="date" className="text-sm text-neutral-90 border border-neutral-40 rounded-md px-2 py-1">
          started on {formatDate(job.createdAt || new Date().toISOString())}
        </span>
      </div>

      <h3 id="title" className="text-lg font-semibold text-neutral-100 mb-2">
        {job.title}
      </h3>
      <div className="flex justify-between items-center">
        <p id="salary" className="text-sm text-neutral-70 mb-4">
          {formatSalary(job.salaryMin, job.salaryMax)}
        </p>

        <Button
          variant="primary"
          onClick={() => onClick(job.id)}
          className="w-28 h-8 text-sm font-semibold">
          Manage Job
        </Button>
      </div>
    </div>
  );
};
