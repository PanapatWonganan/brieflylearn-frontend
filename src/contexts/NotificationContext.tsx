'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  read?: boolean;
  timestamp?: Date;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      id,
      duration: 5000, // Default 5 seconds
      read: false,
      timestamp: new Date(),
      ...notification,
    };

    setNotifications((prev) => [...prev, newNotification]);

    // Auto remove after duration
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => 
      prev.map((notification) => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => 
      prev.map((notification) => ({ ...notification, read: true }))
    );
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const contextValue: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    markAsRead,
    markAllAsRead,
    unreadCount,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

// Helper functions for common notification types
export const createNotificationHelpers = (addNotification: (notification: Omit<Notification, 'id'>) => string) => ({
  success: (title: string, message?: string, options?: Partial<Omit<Notification, 'id' | 'type' | 'title' | 'message'>>) =>
    addNotification({ type: 'success', title, message, ...options }),
  
  error: (title: string, message?: string, options?: Partial<Omit<Notification, 'id' | 'type' | 'title' | 'message'>>) =>
    addNotification({ type: 'error', title, message, duration: 8000, ...options }),
  
  warning: (title: string, message?: string, options?: Partial<Omit<Notification, 'id' | 'type' | 'title' | 'message'>>) =>
    addNotification({ type: 'warning', title, message, ...options }),
  
  info: (title: string, message?: string, options?: Partial<Omit<Notification, 'id' | 'type' | 'title' | 'message'>>) =>
    addNotification({ type: 'info', title, message, ...options }),
});

export function useNotificationHelpers() {
  const { addNotification } = useNotification();
  return createNotificationHelpers(addNotification);
}