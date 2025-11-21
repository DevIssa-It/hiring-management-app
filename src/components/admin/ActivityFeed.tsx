import { ActivityLog } from '../../types/activity';

interface ActivityFeedProps {
  activities: ActivityLog[];
}

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  const getIcon = (action: string) => {
    if (action.includes('create')) return '➕';
    if (action.includes('update')) return '✏️';
    if (action.includes('delete')) return '🗑️';
    if (action.includes('status')) return '🔄';
    return '📝';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent activity</p>
        ) : (
          activities.map(activity => (
            <div key={activity.id} className="flex gap-3 pb-3 border-b last:border-0">
              <span className="text-2xl">{getIcon(activity.action)}</span>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.userName}</span> {activity.action}
                </p>
                {activity.details && (
                  <p className="text-xs text-gray-600">{activity.details}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
