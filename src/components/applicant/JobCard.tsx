import type { Job } from '@/types';
import Logo1 from '@/assets/Logo1.svg';
import { HiOutlineLocationMarker, HiOutlineBriefcase } from 'react-icons/hi';
import { HiOutlineBanknotes } from 'react-icons/hi2';

export interface JobCardProps {
  job: Job;
  onClick: () => void;
  isSelected?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick, isSelected = false }) => {
  const isOpen = job.status === 'active';

  return (
    <div onClick={onClick} 
      className={`rounded-xl shadow-soft cursor-pointer transition
        ${isSelected
          ? 'bg-primary-surface border-2 border-primary-main p-4'
          : isOpen
          ? 'bg-neutral-10 border-2 border-neutral-40 p-4'
          : 'bg-neutral-30 border-2 border-neutral-40 p-4 opacity-60'}
      `}>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-lg bg-neutral-40 flex items-center justify-center p-2">
          <img 
            src={job.logoUrl || Logo1} 
            alt="Company Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <div className={`font-semibold text-lg ${isOpen ? 'text-neutral-100' : 'text-neutral-70'}`}>
            {job.title}
          </div>
          <div className={`text-sm ${isOpen ? 'text-neutral-70' : 'text-neutral-50'}`}>
            {job.companyName}
          </div>
        </div>
      </div>

      <hr className="border-dashed border-neutral-40 my-3" />
      
      <div className="space-y-2">
        <div className={`flex items-center gap-2 text-sm ${isOpen ? 'text-neutral-80' : 'text-neutral-60'}`}>
          <HiOutlineLocationMarker className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        
        {job.salaryMin && job.salaryMax && (
          <div className={`flex items-center gap-2 text-sm ${isOpen ? 'text-neutral-80' : 'text-neutral-60'}`}>
            <HiOutlineBanknotes className="w-4 h-4" />
            <span>Rp {job.salaryMin.toLocaleString('id-ID')} - Rp {job.salaryMax.toLocaleString('id-ID')}</span>
          </div>
        )}
      </div>
    </div>
  );
};
