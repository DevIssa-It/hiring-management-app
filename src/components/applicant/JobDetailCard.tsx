import type { Job } from '@/types';
import Logo1 from '@/assets/Logo1.svg';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { HiOutlineLocationMarker, HiOutlineBriefcase } from 'react-icons/hi';
import { HiOutlineBanknotes } from 'react-icons/hi2';

interface JobDetailCardProps {
  job: Job;
  showApplyButton?: boolean;
  onApply?: () => void;
  isApplied?: boolean;
}

export const JobDetailCard: React.FC<JobDetailCardProps> = ({ 
  job, 
  showApplyButton = false, 
  onApply,
  isApplied = false
}) => {
  return (
    <div className="bg-neutral-10 dark:bg-gray-800 rounded-lg border border-neutral-40 dark:border-gray-700 shadow-soft p-8">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-lg bg-neutral-40 dark:bg-gray-700 flex items-center justify-center p-2">
          <img 
            src={job.logoUrl || Logo1} 
            alt="Company Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="mb-1">
            <Badge 
              variant="custom"
              className="bg-success-main text-white text-xs font-bold border-success-main rounded-md">
              {job.employmentType ? job.employmentType.replace('_', '-').toUpperCase() : 'FULL-TIME'}
            </Badge>
          </div>
          <div className="font-semibold text-lg text-neutral-100 dark:text-gray-100">{job.title}</div>
          <div className="text-neutral-70 dark:text-gray-300">{job.companyName}</div>
        </div>
        {showApplyButton && (
          <Button 
            onClick={isApplied ? undefined : onApply}
            variant={isApplied ? "neutral" : "alternative"}
            className="w-20 h-8"
            disabled={isApplied}
          >
            {isApplied ? 'Applied' : 'Apply'}
          </Button>
        )}
      </div>
      
      <hr className="border-neutral-40 dark:border-gray-700 my-4" />
      
      <div className="text-neutral-80 dark:text-gray-300 whitespace-pre-line">
        {job.description}
      </div>
    </div>
  );
};