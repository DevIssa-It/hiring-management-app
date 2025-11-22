import { useState, useEffect } from 'react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: Date;
}

export const useNotificationCenter = (userId: string) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`notifications_${userId}`);
    if (stored) setNotifications(JSON.parse(stored));
  }, [userId]);

  const addNotification = (notification: Omit<NotificationItem, 'id' | 'read' | 'timestamp'>) => {
    const newNotif: NotificationItem = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      timestamp: new Date(),
    };
    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    localStorage.setItem(`notifications_${userId}`, JSON.stringify(updated));
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem(`notifications_${userId}`, JSON.stringify(updated));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.removeItem(`notifications_${userId}`);
  };

  return {
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    addNotification,
    markAsRead,
    clearAll,
  };
};
