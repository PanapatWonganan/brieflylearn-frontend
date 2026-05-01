'use client';

import React from 'react';
import { useNotification } from '@/contexts/NotificationContext';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

/**
 * Toast notifications — Antiparallel dark theme.
 * Uses mint (brand) / surface / error / warning tokens from globals.css.
 * Solid dark surface backgrounds + high-contrast text for legibility.
 */

type NotificationType = 'success' | 'error' | 'warning' | 'info';

const STYLES: Record<
  NotificationType,
  {
    icon: React.ReactNode;
    wrapper: string;
    title: string;
    message: string;
    actionBtn: string;
    closeBtn: string;
  }
> = {
  success: {
    icon: <CheckCircle className="h-6 w-6 text-mint-400" />,
    wrapper: 'bg-surface-200 border-mint-500',
    title: 'text-mint-300',
    message: 'text-[#F2F2F0]',
    actionBtn: 'bg-mint-500 text-[#0E0E0E] hover:bg-mint-400',
    closeBtn: 'text-mint-300 hover:bg-mint-500/20',
  },
  error: {
    icon: <AlertCircle className="h-6 w-6 text-error" />,
    wrapper: 'bg-surface-200 border-error',
    title: 'text-error',
    message: 'text-[#F2F2F0]',
    actionBtn: 'bg-error text-white hover:bg-error-dark',
    closeBtn: 'text-error hover:bg-error/20',
  },
  warning: {
    icon: <AlertTriangle className="h-6 w-6 text-warning" />,
    wrapper: 'bg-surface-200 border-warning',
    title: 'text-warning',
    message: 'text-[#F2F2F0]',
    actionBtn: 'bg-warning text-[#0E0E0E] hover:opacity-90',
    closeBtn: 'text-warning hover:bg-warning/20',
  },
  info: {
    icon: <Info className="h-6 w-6 text-[#F2F2F0]" />,
    wrapper: 'bg-surface-200 border-surface-100',
    title: 'text-[#F2F2F0]',
    message: 'text-[#F2F2F0]/80',
    actionBtn: 'bg-mint-500 text-[#0E0E0E] hover:bg-mint-400',
    closeBtn: 'text-[#F2F2F0]/70 hover:bg-white/10',
  },
};

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 w-full max-w-sm">
      {notifications.map((notification) => {
        const type = (notification.type as NotificationType) || 'info';
        const styles = STYLES[type] || STYLES.info;
        return (
          <div
            key={notification.id}
            className={`
              ${styles.wrapper}
              relative rounded-sm border p-4 shadow-card
              transform transition-all duration-300 ease-in-out
              animate-in slide-in-from-right-full
            `}
          >
            <div className="flex">
              <div className="flex-shrink-0">{styles.icon}</div>

              <div className="ml-3 flex-1">
                <h3 className={`text-sm font-semibold ${styles.title}`}>
                  {notification.title}
                </h3>

                {notification.message && (
                  <div className={`mt-1 text-sm ${styles.message}`}>
                    {notification.message}
                  </div>
                )}

                {notification.action && (
                  <div className="mt-3">
                    <button
                      onClick={notification.action.onClick}
                      className={`
                        inline-flex items-center rounded-sm px-3 py-1.5 text-xs font-semibold
                        transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mint-400
                        ${styles.actionBtn}
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
                    inline-flex rounded-sm p-1.5 transition-colors
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-mint-400
                    ${styles.closeBtn}
                  `}
                  onClick={() => removeNotification(notification.id)}
                >
                  <span className="sr-only">Dismiss</span>
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationContainer;
