// Notification/Toast component with Tailwind CSS styling

import type { Notification as NotificationType } from '@/types';
import { useEffect } from 'react';

export interface NotificationProps {
  notification: NotificationType;
  onClose: (id: string) => void;
  autoClose?: boolean;
  duration?: number;
}

const notificationStyles = {
  success: 'bg-success-50 border-success-500 text-success-800',
  error: 'bg-danger-50 border-danger-500 text-danger-800',
  warning: 'bg-warning-50 border-warning-500 text-warning-800',
  info: 'bg-primary-50 border-primary-500 text-primary-800',
};

const iconStyles = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

export const Notification: React.FC<NotificationProps> = ({ 
  notification, 
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose(notification.id);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, notification.id, onClose]);

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-lg
        animate-slide-in-right max-w-md w-full
        ${notificationStyles[notification.type]}
      `}
      role="alert"
    >
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center font-bold">
        {iconStyles[notification.type]}
      </div>
      
      <div className="flex-1 min-w-0">
        {notification.title && (
          <h4 className="font-semibold mb-1">{notification.title}</h4>
        )}
        <p className="text-sm">{notification.message}</p>
      </div>
      
      <button
        onClick={() => onClose(notification.id)}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close notification"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};
