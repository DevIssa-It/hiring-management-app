import type { JobListItem, JobStatus } from '@/types';
import { Badge, type BadgeProps } from '@/components/shared/Badge';
import { Button } from "@/components/shared/Button";

export interface JobCardProps {
  job: JobListItem;
  onClick: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const formatSalary = (min?:number, max?: number) => {
    if (!min || !max) return 'Salary not specified';
     return `Rp${min.toLocaleString('id-ID')} - Rp${max.toLocaleString('id-ID')}`;
  }

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
  }

  return (
    <div id="JobCard" className="bg-white rounded-lg border border-neutral-40 p-4 hover:shadow-md transition-shadow">
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
