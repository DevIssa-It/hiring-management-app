import { NotificationItem } from '../../hooks/useNotificationCenter';

interface NotificationCenterProps {
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onClear: () => void;
}

export const NotificationCenter = ({ notifications, onMarkAsRead, onClear }: NotificationCenterProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      default: return 'ℹ';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-80 max-h-96 overflow-y-auto">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">Notifications</h3>
        <button onClick={onClear} className="text-sm text-blue-600 hover:text-blue-800">
          Clear All
        </button>
      </div>
      <div>
        {notifications.length === 0 ? (
          <p className="p-4 text-center text-gray-500">No notifications</p>
        ) : (
          notifications.map(notif => (
            <div
              key={notif.id}
              onClick={() => onMarkAsRead(notif.id)}
              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}
            >
              <div className="flex gap-2">
                <span>{getIcon(notif.type)}</span>
                <div className="flex-1">
                  <p className="font-medium text-sm">{notif.title}</p>
                  <p className="text-xs text-gray-600">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notif.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
