import type { Job } from '@/types';
import Logo from '@/assets/Logo.svg';
import { HiLocationMarker, HiBriefcase, HiCurrencyDollar } from 'react-icons/hi';

export interface JobCardProps {
  job: Job;
  onClick: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const isOpen = job.status === 'active';

  return (
    <div onClick={onClick} 
      className={`p-4 rounded-lg shadow-soft cursor-pointer transition
        ${isOpen
          ? 'bg-primary-surface border-2 border-primary-main'
          : 'bg-neutral-30 border-2 border-neutral-40 opacity-60'}
      `}>
      
      <div className="flex items-center gap-3 mb-3">
        <img src={job.logoUrl || Logo} 
          alt="Company Logo" 
          className="w-12 h-12 rounded-lg bg-neutral-39 object-contain"/>
        <div>
          <div className={`font-bold text-lg ${isOpen ? 'text-neutral-100' : 'text-neutral-70'}`}>
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
          <HiLocationMarker className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        
        <div className={`flex items-center gap-2 text-sm ${isOpen ? 'text-neutral-80' : 'text-neutral-60'}`}>
          <HiBriefcase className="w-4 h-4" />
          <span>{job.employmentType}</span>
        </div>
        
        {job.salaryMin && job.salaryMax && (
          <div className={`flex items-center gap-2 text-sm ${isOpen ? 'text-neutral-80' : 'text-neutral-60'}`}>
            <HiCurrencyDollar className="w-4 h-4" />
            <span>Rp {job.salaryMin.toLocaleString('id-ID')} - Rp {job.salaryMax.toLocaleString('id-ID')}</span>
          </div>
        )}
      </div>
    </div>
  );
};
