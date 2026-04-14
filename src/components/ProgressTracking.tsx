'use client';

import React from 'react';
import {
  TrendingUp,
  Target,
  Calendar,
  Clock,
  Heart,
  Smile,
  Users,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface WellnessMetric {
  category: 'physical' | 'mental' | 'nutrition' | 'community';
  label: string;
  value: number;
  previousValue?: number;
  target?: number;
  icon: React.ElementType;
  color: string;
  unit?: string;
}

interface DailyProgress {
  date: string;
  physical: number;
  mental: number;
  nutrition: number;
  community: number;
  completed: boolean;
}

interface Milestone {
  id: number;
  name: string;
  description: string;
  progress: number;
  target: number;
  category: string;
  reward?: string;
  daysLeft?: number;
}

interface ProgressTrackingProps {
  wellnessMetrics: WellnessMetric[];
  weeklyProgress: DailyProgress[];
  milestones: Milestone[];
  currentStreak: number;
  overallScore: number;
}

export function ProgressTracking({
  wellnessMetrics,
  weeklyProgress,
  milestones,
  currentStreak,
  overallScore
}: ProgressTrackingProps) {

  const getMetricIcon = (category: WellnessMetric['category']) => {
    switch (category) {
      case 'physical': return Heart;
      case 'mental': return Smile;
      case 'nutrition': return Calendar;
      case 'community': return Users;
    }
  };

  const getChangeIndicator = (current: number, previous?: number) => {
    if (!previous) return null;
    const change = current - previous;
    const isPositive = change > 0;

    return (
      <div className={`flex items-center space-x-1 text-xs ${
        isPositive ? 'text-mint-600' : change < 0 ? 'text-gray-500' : 'text-gray-400'
      }`}>
        <TrendingUp className={`h-3 w-3 ${!isPositive && change < 0 ? 'rotate-180' : ''}`} />
        <span>{isPositive ? '+' : ''}{change.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">

      {/* Overall Wellness Score */}
      <div className="bg-gray-800/50 rounded-sm p-6 border border-gray-700/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-1">Overall Wellness Score</h3>
            <p className="text-gray-400 text-sm">คะแนนรวมของคุณในสัปดาห์นี้</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-gray-200">{overallScore}</div>
            <div className="text-gray-400 text-sm">/ 10.0</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className="bg-mint-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${(overallScore / 10) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center space-x-2 text-gray-200">
            <span>{currentStreak} วันติดต่อกัน</span>
          </div>
          <div className="text-gray-400">
            {overallScore >= 8 ? 'Excellent!' : overallScore >= 6 ? 'Good!' : 'Keep going!'}
          </div>
        </div>
      </div>

      {/* Wellness Categories */}
      <div className="bg-gray-900 rounded-sm p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Wellness Categories</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {wellnessMetrics.map((metric) => {
            const Icon = getMetricIcon(metric.category);

            return (
              <div
                key={metric.category}
                className="text-center p-4 rounded-sm bg-gray-800/50"
              >
                <div className="bg-gray-800 border border-gray-700/50 rounded-full p-3 w-fit mx-auto mb-3">
                  <Icon className="h-6 w-6 text-mint-500" />
                </div>

                <div className="space-y-1">
                  <div className="text-2xl font-bold text-gray-200">
                    {metric.value}{metric.unit || ''}
                  </div>
                  <div className="text-sm text-gray-400">{metric.label}</div>

                  {getChangeIndicator(metric.value, metric.previousValue)}

                  {metric.target && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-mint-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        เป้าหมาย: {metric.target}{metric.unit || ''}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-gray-900 rounded-sm p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Weekly Progress</h3>

        <div className="space-y-4">
          {/* Chart */}
          <div className="flex justify-between items-end h-48 bg-gray-800/50 rounded-sm p-4">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="flex flex-col space-y-1">
                  {[
                    { value: day.physical, label: 'Physical' },
                    { value: day.mental, label: 'Mental' },
                    { value: day.nutrition, label: 'Nutrition' },
                    { value: day.community, label: 'Community' }
                  ].map((bar, barIndex) => (
                    <div
                      key={barIndex}
                      className="w-6 bg-mint-500 rounded-sm transition-all duration-300"
                      style={{ height: `${bar.value * 4}px` }}
                      title={`${bar.label}: ${bar.value}/10`}
                    />
                  ))}
                </div>

                <div className="text-center">
                  <div className="text-xs text-gray-400">{day.date}</div>
                  {day.completed && (
                    <CheckCircle className="h-3 w-3 text-mint-500 mx-auto mt-1" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center space-x-6 text-xs">
            {[
              { label: 'Physical' },
              { label: 'Mental' },
              { label: 'Nutrition' },
              { label: 'Community' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-mint-500 rounded-sm" />
                <span className="text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Milestones */}
      <div className="bg-gray-900 rounded-sm p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Active Milestones</h3>

        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="border border-gray-700/50 rounded-sm p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-800/50 p-2 rounded-full">
                    <Target className="h-5 w-5 text-mint-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200">{milestone.name}</h4>
                    <p className="text-sm text-gray-400">{milestone.description}</p>
                  </div>
                </div>

                {milestone.daysLeft && (
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-200">{milestone.daysLeft}</div>
                    <div className="text-xs text-gray-500">วันที่เหลือ</div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">ความคืบหน้า</span>
                  <span className="font-medium text-gray-200">{milestone.progress}/{milestone.target}</span>
                </div>

                <div className="w-full bg-gray-800/50 rounded-full h-3">
                  <div
                    className="bg-mint-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(milestone.progress / milestone.target) * 100}%` }}
                  />
                </div>

                {milestone.reward && (
                  <div className="flex items-center space-x-2 text-sm text-gray-400 mt-2">
                    <span>รางวัล: {milestone.reward}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// Streak Counter Component
export function StreakCounter({ currentStreak, longestStreak }: { currentStreak: number; longestStreak: number }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-200">Current Streak</h3>
          <p className="text-gray-400 text-sm">วันติดต่อกันที่ใช้งาน</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-200">{currentStreak}</div>
          <div className="text-gray-400 text-sm">วัน</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">สถิติสูงสุด</span>
          <span className="font-semibold text-gray-200">{longestStreak} วัน</span>
        </div>
      </div>
    </div>
  );
}

// Weekly Summary Component
export function WeeklySummary({ weeklyData }: { weeklyData: DailyProgress[] }) {
  const completedDays = weeklyData.filter(day => day.completed).length;
  const averageScore = weeklyData.reduce((sum, day) =>
    sum + (day.physical + day.mental + day.nutrition + day.community) / 4, 0
  ) / weeklyData.length;

  return (
    <div className="bg-gray-900 rounded-sm p-6 border border-gray-700/50">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Weekly Summary</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-gray-800/50 rounded-sm">
          <div className="text-2xl font-bold text-gray-200">{completedDays}</div>
          <div className="text-sm text-gray-400">วันที่เสร็จสมบูรณ์</div>
        </div>

        <div className="text-center p-4 bg-gray-800/50 rounded-sm">
          <div className="text-2xl font-bold text-gray-200">{averageScore.toFixed(1)}</div>
          <div className="text-sm text-gray-400">คะแนนเฉลี่ย</div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="text-sm text-gray-400 mb-2">ความสำเร็จของสัปดาห์</div>
        <div className="w-full bg-gray-800/50 rounded-full h-3">
          <div
            className="bg-mint-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(completedDays / 7) * 100}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">{completedDays}/7 วัน</div>
      </div>
    </div>
  );
}
