'use client';

import React from 'react';
import { useNotification } from '@/contexts/NotificationContext';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-mint-400" />;
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-400" />;
      case 'info':
        return <Info className="h-6 w-6 text-gray-400" />;
      default:
        return <Info className="h-6 w-6 text-gray-400" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-mint-500/10 border-mint-500/20';
      case 'error':
        return 'bg-red-500/10 border-red-500/20';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/20';
      case 'info':
        return 'bg-gray-800/50 border-gray-700';
      default:
        return 'bg-gray-800/50 border-gray-700';
    }
  };

  const getTextColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-mint-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-gray-400';
      case 'info':
        return 'text-gray-400';
      default:
        return 'text-gray-200';
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
            relative rounded-sm border p-4 shadow-card
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
                      transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-mint-400
                      ${notification.type === 'success'
                        ? 'bg-mint-500/10 text-mint-400 hover:opacity-90'
                        : notification.type === 'error'
                        ? 'bg-red-500/10 text-red-400 hover:opacity-90'
                        : notification.type === 'warning'
                        ? 'bg-yellow-500/10 text-gray-400 hover:opacity-90'
                        : 'bg-gray-800/50 text-gray-400 hover:opacity-90'
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
                  focus:outline-none focus-visible:ring-1 focus-visible:ring-mint-400
                  ${notification.type === 'success'
                    ? 'text-mint-400 hover:bg-mint-500/10'
                    : notification.type === 'error'
                    ? 'text-red-400 hover:bg-red-500/10'
                    : notification.type === 'warning'
                    ? 'text-yellow-400 hover:bg-yellow-500/10'
                    : 'text-gray-400 hover:bg-gray-800/50'
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