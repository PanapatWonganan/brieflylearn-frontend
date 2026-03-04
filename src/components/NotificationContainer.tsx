'use client';

import React from 'react';
import { useNotification } from '@/contexts/NotificationContext';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-brand-600" />;
      case 'error':
        return <AlertCircle className="h-6 w-6 text-error" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-warning" />;
      case 'info':
        return <Info className="h-6 w-6 text-ink-light" />;
      default:
        return <Info className="h-6 w-6 text-gray-400" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-brand-50 border-brand-200';
      case 'error':
        return 'bg-error-light border-error/20';
      case 'warning':
        return 'bg-sand-100 border-sand-300';
      case 'info':
        return 'bg-sand-100 border-sand-300';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getTextColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-brand-700';
      case 'error':
        return 'text-error-dark';
      case 'warning':
        return 'text-ink-light';
      case 'info':
        return 'text-ink-light';
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
            relative rounded-lg border p-4 shadow-card
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
                      transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-300
                      ${notification.type === 'success'
                        ? 'bg-brand-50 text-brand-700 hover:opacity-90'
                        : notification.type === 'error'
                        ? 'bg-error-light text-error-dark hover:opacity-90'
                        : notification.type === 'warning'
                        ? 'bg-sand-100 text-ink-light hover:opacity-90'
                        : 'bg-sand-100 text-ink-light hover:opacity-90'
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
                  focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-300
                  ${notification.type === 'success'
                    ? 'text-brand-600 hover:bg-brand-50'
                    : notification.type === 'error'
                    ? 'text-error hover:bg-error-light'
                    : notification.type === 'warning'
                    ? 'text-warning hover:bg-sand-100'
                    : 'text-ink-light hover:bg-sand-100'
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