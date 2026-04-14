'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export function Skeleton({ className, children, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-700",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-sm shadow-card overflow-hidden border border-gray-700">
      {/* Video Preview Skeleton */}
      <Skeleton className="h-48 w-full bg-gray-700" />

      {/* Content Skeleton */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* Title */}
        <Skeleton className="h-6 w-4/5" />

        {/* Instructor */}
        <Skeleton className="h-4 w-2/3" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>

        {/* Stats */}
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Price and Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="space-y-1">
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-10 w-full sm:w-24 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Current Journey Status */}
        <Skeleton className="h-32 w-full rounded-sm mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Wellness Score Chart */}
            <div className="bg-gray-800 rounded-sm p-6 shadow-card border border-gray-700">
              <Skeleton className="h-6 w-48 mb-4" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Badge Collection */}
            <div className="bg-gray-800 rounded-sm p-6 shadow-card border border-gray-700">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="grid grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-16 rounded-sm" />
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-gray-800 rounded-sm p-6 shadow-card border border-gray-700">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LessonPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header Skeleton */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-5 w-20" />
              <div className="h-6 w-px bg-gray-600" />
              <div>
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-sm shadow-card overflow-hidden">
              {/* Video Container */}
              <Skeleton className="aspect-video w-full" />

              {/* Lesson Info */}
              <div className="p-6 space-y-4">
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Safety Reminders */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-sm p-6">
              <Skeleton className="h-5 w-24 mb-4" />
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <Skeleton className="h-4 w-4 mt-0.5 rounded" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
              <Skeleton className="h-5 w-28 mb-4" />
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-3 w-20 mb-1" />
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
                <Skeleton className="h-16 w-full rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CoursesPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-96 mx-auto mb-4" />
          <Skeleton className="h-5 w-2/3 mx-auto mb-6" />
          <div className="flex items-center justify-center space-x-4 text-sm">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Search and Filter */}
        <Skeleton className="h-20 w-full rounded-sm mb-6" />

        {/* Results Count */}
        <Skeleton className="h-4 w-40 mb-6" />

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {[...Array(9)].map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
} 