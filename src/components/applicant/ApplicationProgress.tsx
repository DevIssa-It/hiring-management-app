import { ProgressBar } from '../shared/ProgressBar';

interface ApplicationProgressProps {
  completedFields: number;
  totalFields: number;
}

export const ApplicationProgress = ({ completedFields, totalFields }: ApplicationProgressProps) => {
  const percentage = Math.round((completedFields / totalFields) * 100);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-sm font-semibold mb-3">Application Progress</h3>
      <ProgressBar current={completedFields} total={totalFields} />
      <p className="text-xs text-gray-600 mt-2">
        {percentage === 100 ? '✓ Ready to submit' : `${percentage}% complete`}
      </p>
    </div>
  );
};
