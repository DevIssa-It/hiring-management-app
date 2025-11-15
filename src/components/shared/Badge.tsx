// Badge component with Tailwind CSS styling

import { JobStatus } from '@/types';

export interface BadgeProps {
  status: JobStatus;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  const statusStyles = {
    active: 'bg-success-100 text-success-700 border-success-200',
    inactive: 'bg-gray-100 text-gray-700 border-gray-200',
    draft: 'bg-warning-100 text-warning-700 border-warning-200',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusStyles[status]}`}>
      {children || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
