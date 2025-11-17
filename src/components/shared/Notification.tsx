import type { Notification as NotificationType } from '@/types';
import { useEffect } from 'react';

export interface NotificationProps {
  notification: NotificationType;
  onClose: (id: string) => void;
  autoClose?: boolean;
  duration?: number;
}

const notificationStyles = {
  success: {
    border: 'border-l-success-main',
    icon: 'text-success-main border-success-main',
  },
  error: {
    border: 'border-l-danger-main',
    icon: 'text-danger-main border-danger-main',
  },
  warning: {
    border: 'border-l-warning-main',
    icon: 'text-warning-main border-warning-main',
  },
  info: {
    border: 'border-l-primary-main',
    icon: 'text-primary-main border-primary-main',
  },
};

const iconStyles = {
  success: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
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

  const styles = notificationStyles[notification.type];

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 shadow-lg
        bg-white border ${styles.border}
        animate-slide-in-right max-w-md w-full
      `}
      role="alert"
    >
      {/* Icon dalam Lingkaran dengan Border */}
      <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${styles.icon}`}>
        {iconStyles[notification.type]}
      </div>
      
      {/* Message - Single Line */}
      <p className="flex-1 text-sm text-neutral-90">
        {notification.message}
      </p>
      
      {/* Close button */}
      <button
        onClick={() => onClose(notification.id)}
        className="flex-shrink-0 text-neutral-60 hover:text-neutral-90 transition-colors"
        aria-label="Close notification"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};
