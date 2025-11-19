import { ApplicationStats } from '../../utils/analytics';

interface AnalyticsDashboardProps {
  stats: ApplicationStats;
}

export const AnalyticsDashboard = ({ stats }: AnalyticsDashboardProps) => {
  const statCards = [
    { label: 'Total Applications', value: stats.total, color: 'bg-blue-500' },
    { label: 'Submitted', value: stats.submitted, color: 'bg-gray-500' },
    { label: 'Reviewed', value: stats.reviewed, color: 'bg-yellow-500' },
    { label: 'Shortlisted', value: stats.shortlisted, color: 'bg-purple-500' },
    { label: 'Accepted', value: stats.accepted, color: 'bg-green-500' },
    { label: 'Rejected', value: stats.rejected, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white p-4 rounded-lg shadow-sm">
            <div className={`w-12 h-12 ${card.color} rounded-lg mb-2 flex items-center justify-center text-white text-xl font-bold`}>
              {card.value}
            </div>
            <p className="text-sm text-gray-600">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Conversion Rate</h3>
        <div className="flex items-center">
          <div className="text-4xl font-bold text-blue-600">
            {stats.conversionRate.toFixed(1)}%
          </div>
          <p className="ml-4 text-gray-600">of applications accepted</p>
        </div>
      </div>
    </div>
  );
};
