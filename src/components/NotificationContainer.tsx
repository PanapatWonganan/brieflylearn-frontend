'use client';

import React from 'react';
import { useNotification } from '@/contexts/NotificationContext';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-400" />;
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-400" />;
      case 'info':
        return <Info className="h-6 w-6 text-blue-400" />;
      default:
        return <Info className="h-6 w-6 text-gray-400" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getTextColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-4 w-full max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            ${getBackgroundColor(notification.type)}
            ${getTextColor(notification.type)}
            relative rounded-lg border p-4 shadow-lg
            transform transition-all duration-300 ease-in-out
            animate-in slide-in-from-right-full
          `}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              {getIcon(notification.type)}
            </div>
            
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium">
                {notification.title}
              </h3>
              
              {notification.message && (
                <div className="mt-1 text-sm opacity-90">
                  {notification.message}
                </div>
              )}
              
              {notification.action && (
                <div className="mt-3">
                  <button
                    onClick={notification.action.onClick}
                    className={`
                      inline-flex items-center rounded-md px-2.5 py-1.5 text-xs font-medium
                      transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                      ${notification.type === 'success' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500'
                        : notification.type === 'error'
                        ? 'bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-500'
                        : notification.type === 'warning'
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-500'
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500'
                      }
                    `}
                  >
                    {notification.action.label}
                  </button>
                </div>
              )}
            </div>
            
            <div className="ml-4 flex flex-shrink-0">
              <button
                className={`
                  inline-flex rounded-md p-1.5 transition-colors
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${notification.type === 'success' 
                    ? 'text-green-500 hover:bg-green-100 focus:ring-green-500'
                    : notification.type === 'error'
                    ? 'text-red-500 hover:bg-red-100 focus:ring-red-500'
                    : notification.type === 'warning'
                    ? 'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-500'
                    : 'text-blue-500 hover:bg-blue-100 focus:ring-blue-500'
                  }
                `}
                onClick={() => removeNotification(notification.id)}
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;