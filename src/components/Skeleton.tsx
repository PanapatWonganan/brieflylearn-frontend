'use client'

import React from 'react'

// Base shimmer skeleton block
function Bone({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm bg-gray-800 ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-700/60 to-transparent" />
    </div>
  )
}

// Skeleton for dashboard stat cards
export function StatCardSkeleton() {
  return (
    <div className="bg-gray-900 border border-gray-700/50 shadow-card rounded-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <Bone className="h-10 w-10 rounded-sm" />
        <Bone className="h-4 w-16" />
      </div>
      <Bone className="h-8 w-24 mb-2" />
      <Bone className="h-4 w-32" />
    </div>
  )
}

// Skeleton for course cards
export function CourseCardSkeleton() {
  return (
    <div className="bg-gray-900 border border-gray-700/50 shadow-card rounded-sm overflow-hidden">
      <Bone className="h-48 w-full rounded-none" />
      <div className="p-6">
        <Bone className="h-3 w-20 mb-3" />
        <Bone className="h-6 w-full mb-2" />
        <Bone className="h-4 w-3/4 mb-4" />
        <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
          <Bone className="h-4 w-16" />
          <Bone className="h-4 w-20" />
        </div>
      </div>
    </div>
  )
}

// Skeleton for a full page with header area + content grid
export function PageSkeleton({ cards = 3 }: { cards?: number }) {
  return (
    <div className="min-h-screen">
      {/* Hero area */}
      <div className="border-b border-gray-700/50 py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <Bone className="h-4 w-24 mx-auto mb-4" />
          <Bone className="h-10 w-72 mx-auto mb-4" />
          <Bone className="h-5 w-96 mx-auto" />
        </div>
      </div>
      {/* Content grid */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: cards }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Skeleton for dashboard layout
export function DashboardSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-gray-700/50 py-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Bone className="h-8 w-48 mb-2" />
          <Bone className="h-4 w-64" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <div className="bg-gray-900 border border-gray-700/50 shadow-card rounded-sm p-8">
          <Bone className="h-6 w-40 mb-6" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Bone className="h-12 w-12 rounded-sm" />
                <div className="flex-1">
                  <Bone className="h-5 w-3/4 mb-2" />
                  <Bone className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Skeleton for garden page
export function GardenSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-gray-700/50 py-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Bone className="h-14 w-14 rounded-sm" />
            <div>
              <Bone className="h-7 w-48 mb-2" />
              <Bone className="h-4 w-32" />
            </div>
          </div>
          <div className="flex gap-4">
            <Bone className="h-10 w-28 rounded-sm" />
            <Bone className="h-10 w-28 rounded-sm" />
            <Bone className="h-10 w-28 rounded-sm" />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-700/50 shadow-card rounded-sm p-6">
              <Bone className="h-5 w-32 mb-4" />
              <div className="space-y-3">
                <Bone className="h-10 w-full rounded-sm" />
                <Bone className="h-10 w-full rounded-sm" />
                <Bone className="h-10 w-full rounded-sm" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="bg-gray-900 border border-gray-700/50 shadow-card rounded-sm p-6">
              <Bone className="h-6 w-36 mb-6" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Bone key={i} className="h-32 w-full rounded-sm" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Bone }
