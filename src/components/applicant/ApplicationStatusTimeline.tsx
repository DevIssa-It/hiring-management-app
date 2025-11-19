import { Application } from '../../types';

interface ApplicationStatusTimelineProps {
  application: Application;
}

const statusSteps = [
  { key: 'submitted', label: 'Submitted' },
  { key: 'reviewed', label: 'Reviewed' },
  { key: 'shortlisted', label: 'Shortlisted' },
  { key: 'accepted', label: 'Accepted' },
];

export const ApplicationStatusTimeline = ({ application }: ApplicationStatusTimelineProps) => {
  const currentIndex = statusSteps.findIndex(step => step.key === application.status);
  const isRejected = application.status === 'rejected';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Application Status</h3>
      
      {isRejected ? (
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-2">
            <span className="text-2xl">✕</span>
          </div>
          <p className="text-red-600 font-medium">Application Rejected</p>
        </div>
      ) : (
        <div className="relative">
          {statusSteps.map((step, index) => (
            <div key={step.key} className="flex items-center mb-4 last:mb-0">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentIndex ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {index < currentIndex ? '✓' : index + 1}
              </div>
              <div className="ml-4">
                <p className={`font-medium ${index <= currentIndex ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step.label}
                </p>
              </div>
              {index < statusSteps.length - 1 && (
                <div className={`absolute left-4 w-0.5 h-8 ${
                  index < currentIndex ? 'bg-blue-600' : 'bg-gray-200'
                }`} style={{ top: `${(index + 1) * 3.5}rem` }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
