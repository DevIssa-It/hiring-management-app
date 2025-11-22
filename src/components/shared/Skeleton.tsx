interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export const Skeleton = ({ width = 'w-full', height = 'h-4', className = '' }: SkeletonProps) => {
  return (
    <div className={`${width} ${height} bg-gray-200 rounded animate-pulse ${className}`} />
  );
};

export const JobCardSkeleton = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
    <Skeleton height="h-6" width="w-3/4" />
    <Skeleton height="h-4" width="w-1/2" />
    <Skeleton height="h-4" width="w-full" />
    <Skeleton height="h-4" width="w-full" />
    <div className="flex gap-2">
      <Skeleton height="h-8" width="w-20" />
      <Skeleton height="h-8" width="w-20" />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-2">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4">
        <Skeleton width="w-1/4" />
        <Skeleton width="w-1/4" />
        <Skeleton width="w-1/4" />
        <Skeleton width="w-1/4" />
      </div>
    ))}
  </div>
);
