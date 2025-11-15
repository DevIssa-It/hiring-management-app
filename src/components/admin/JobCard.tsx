import type { JobListItem } from '@/types';
import { Badge } from '@/components/shared/Badge';
import { Button } from "@/components/shared/Button";

export interface JobCardProps {
  job: JobListItem;
  onClick: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const formatSalary = (min?:number, max?: number) => {
    if (!min || !max) return 'Salary not specified';
     return `Rp${min / 1000000}.toFixed(1)M - Rp${max /1000000}.toFixed(1)M`;
  }

  const formatDate = (date: String) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
  }

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'success';
      case 'inactive': return 'danger';
      case 'draft': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div id="JobCard" className="bg-white rounded-lg border border-neutral-40 p-4 hover:shadow-md transition-shadow">
      <div id="header" className="flex items-start justify-between mb-3">
        <Badge variant={getStatusVariant(job.status)}>
          {job.status}
        </Badge>
        <span id="date" className="text-sm text-neutral-60">
          started on {formatDate(job.createdAt || new Date().toISOString())}
        </span>
      </div>

      <h3 id="title" className="text-lg font-semibold text-neutral-100 mb-2">
        {job.title}
      </h3>

      <p id="salary" className="text-sm text-neutral-70 mb-4">
        {formatSalary(job.salaryMin, job.salaryMax)}
      </p>

      <Button
        variant="primary"
        size="sm"
        onClick={() => onClick(job.id)}
        className="w-full">
          Manage Job
        </Button>
    </div>
  );
};
