import React from 'react';
import EmptyStateIcon from '@/assets/EmptyState.svg';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <img 
        src={EmptyStateIcon} 
        alt="Empty state" 
        className="w-48 h-48 mb-6 opacity-50"
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />
      <h3 className="text-xl font-semibold text-neutral-90 mb-2">{title}</h3>
      {description && (
        <p className="text-neutral-70 text-center max-w-md mb-6">{description}</p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2 bg-primary-main text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
