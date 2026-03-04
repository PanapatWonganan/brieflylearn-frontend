'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'pink' | 'white' | 'gray';
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6', 
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
};

const colorClasses = {
  pink: 'text-brand-600',
  white: 'text-white',
  gray: 'text-gray-500'
};

export function LoadingSpinner({
  size = 'md',
  color = 'pink',
  className
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    >
      <svg
        className="animate-spin h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

export function LoadingDots({ 
  size = 'md', 
  color = 'pink',
  className 
}: LoadingSpinnerProps) {
  const dotSize = {
    sm: 'h-1 w-1',
    md: 'h-2 w-2',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4'
  };

  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            dotSize[size],
            'rounded-full animate-pulse',
            color === 'pink' && 'bg-brand-600',
            color === 'white' && 'bg-white',
            color === 'gray' && 'bg-gray-500'
          )}
          style={{
            animationDelay: `${index * 0.1}s`
          }}
        />
      ))}
    </div>
  );
}

export function LoadingPulse({
  size = 'md',
  color = 'pink',
  className
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        sizeClasses[size],
        'rounded-full animate-pulse',
        color === 'pink' && 'bg-brand-600',
        color === 'white' && 'bg-white',
        color === 'gray' && 'bg-gray-500',
        className
      )}
    />
  );
} 