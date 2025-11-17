import { JobStatus } from '@/types';

export interface BadgeProps {
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'custom';
  status?: JobStatus;
  children?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  status,
  children,
  className = '',
}) => {

  const getVariantFromStatus = (status: JobStatus): BadgeProps['variant'] => {
    switch (status) {
      case 'active' : return 'success';
      case 'inactive' : return 'danger';
      case 'draft' : return 'warning';
      default: return 'info';
    }
  };

  const finalVariant = variant || (status ? getVariantFromStatus(status) : 'default') as 'success' | 'danger' | 'warning' | 'info' | 'custom' | 'default';

  const variantStyles = {
    success: 'bg-success-surface text-success-main border-success-border',
    danger: 'bg-danger-surface text-danger-main border-danger-border',
    warning: 'bg-warning-surface text-warning-main border-warning-border',
    info: 'bg-info-surface text-info-main border-info-border',
    custom: '',
    default: 'bg-neutral-20 text-neutral-100 border-neutral-40',
  };

  const defaultText = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : '';

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium border 
        ${finalVariant === 'custom' ? className : `${variantStyles[finalVariant]} ${className}`}
      `}>
      {children || defaultText}
    </span>
  );
};
