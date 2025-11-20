import React from 'react';

export const JobCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-neutral-30 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-4 bg-neutral-30 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-neutral-30 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-neutral-30 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
};

export const JobDetailSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
      <div className="h-6 bg-neutral-30 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-neutral-30 rounded w-1/2 mb-6"></div>
      <div className="space-y-3">
        <div className="h-3 bg-neutral-30 rounded w-full"></div>
        <div className="h-3 bg-neutral-30 rounded w-full"></div>
        <div className="h-3 bg-neutral-30 rounded w-3/4"></div>
      </div>
    </div>
  );
};
