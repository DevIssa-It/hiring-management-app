import { JobCategory } from '../../types';

interface JobCategoryBadgeProps {
  category: JobCategory;
}

const categoryColors: Record<JobCategory, string> = {
  [JobCategory.ENGINEERING]: 'bg-blue-100 text-blue-800',
  [JobCategory.DESIGN]: 'bg-purple-100 text-purple-800',
  [JobCategory.MARKETING]: 'bg-pink-100 text-pink-800',
  [JobCategory.SALES]: 'bg-green-100 text-green-800',
  [JobCategory.PRODUCT]: 'bg-yellow-100 text-yellow-800',
  [JobCategory.HR]: 'bg-red-100 text-red-800',
  [JobCategory.FINANCE]: 'bg-indigo-100 text-indigo-800',
  [JobCategory.OPERATIONS]: 'bg-gray-100 text-gray-800',
  [JobCategory.OTHER]: 'bg-gray-100 text-gray-600',
};

const categoryLabels: Record<JobCategory, string> = {
  [JobCategory.ENGINEERING]: 'Engineering',
  [JobCategory.DESIGN]: 'Design',
  [JobCategory.MARKETING]: 'Marketing',
  [JobCategory.SALES]: 'Sales',
  [JobCategory.PRODUCT]: 'Product',
  [JobCategory.HR]: 'Human Resources',
  [JobCategory.FINANCE]: 'Finance',
  [JobCategory.OPERATIONS]: 'Operations',
  [JobCategory.OTHER]: 'Other',
};

export const JobCategoryBadge = ({ category }: JobCategoryBadgeProps) => {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[category]}`}>
      {categoryLabels[category]}
    </span>
  );
};
