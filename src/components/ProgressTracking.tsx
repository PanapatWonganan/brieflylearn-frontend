'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Clock, 
  Heart,
  Smile,
  Sparkles,
  Users,
  CheckCircle,
  ArrowRight,
  Flame
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
      case 'nutrition': return Sparkles;
      case 'community': return Users;
    }
  };

  const getChangeIndicator = (current: number, previous?: number) => {
    if (!previous) return null;
    const change = current - previous;
    const isPositive = change > 0;
    
    return (
      <div className={`flex items-center space-x-1 text-xs ${
        isPositive ? 'text-green-600' : change < 0 ? 'text-red-500' : 'text-gray-500'
      }`}>
        <TrendingUp className={`h-3 w-3 ${!isPositive && change < 0 ? 'rotate-180' : ''}`} />
        <span>{isPositive ? '+' : ''}{change.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Overall Wellness Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-orange-500 to-orange-500 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Overall Wellness Score</h3>
            <p className="text-orange-100 text-sm">คะแนนรวมของคุณในสัปดาห์นี้</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{overallScore}</div>
            <div className="text-orange-100 text-sm">/ 10.0</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full transition-all duration-1000"
              style={{ width: `${(overallScore / 10) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <Flame className="h-4 w-4" />
            <span>{currentStreak} วันติดต่อกัน</span>
          </div>
          <div className="text-orange-100">
            {overallScore >= 8 ? 'Excellent!' : overallScore >= 6 ? 'Good!' : 'Keep going!'}
          </div>
        </div>
      </motion.div>

      {/* Wellness Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Wellness Categories</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {wellnessMetrics.map((metric, index) => {
            const Icon = getMetricIcon(metric.category);
            
            return (
              <motion.div
                key={metric.category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className={`bg-${metric.color}-100 rounded-full p-3 w-fit mx-auto mb-3`}>
                  <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                </div>
                
                <div className="space-y-1">
                  <div className={`text-2xl font-bold text-${metric.color}-600`}>
                    {metric.value}{metric.unit || ''}
                  </div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                  
                  {getChangeIndicator(metric.value, metric.previousValue)}
                  
                  {metric.target && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-${metric.color}-500 h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        เป้าหมาย: {metric.target}{metric.unit || ''}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Weekly Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Progress</h3>
        
        <div className="space-y-4">
          {/* Chart */}
          <div className="flex justify-between items-end h-48 bg-gray-50 rounded-lg p-4">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="flex flex-col space-y-1">
                  {[
                    { value: day.physical, color: 'bg-orange-400', label: 'Physical' },
                    { value: day.mental, color: 'bg-purple-400', label: 'Mental' },
                    { value: day.nutrition, color: 'bg-green-400', label: 'Nutrition' },
                    { value: day.community, color: 'bg-blue-400', label: 'Community' }
                  ].map((bar, barIndex) => (
                    <motion.div
                      key={barIndex}
                      initial={{ height: 0 }}
                      animate={{ height: `${bar.value * 4}px` }}
                      transition={{ duration: 0.5, delay: (index * 0.1) + (barIndex * 0.05) }}
                      className={`w-6 ${bar.color} rounded-sm transition-all duration-300 hover:opacity-80`}
                      title={`${bar.label}: ${bar.value}/10`}
                    />
                  ))}
                </div>
                
                <div className="text-center">
                  <div className="text-xs text-gray-600">{day.date}</div>
                  {day.completed && (
                    <CheckCircle className="h-3 w-3 text-green-500 mx-auto mt-1" />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex justify-center space-x-6 text-xs">
            {[
              { color: 'bg-orange-400', label: 'Physical' },
              { color: 'bg-purple-400', label: 'Mental' },
              { color: 'bg-green-400', label: 'Nutrition' },
              { color: 'bg-blue-400', label: 'Community' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-1">
                <div className={`w-3 h-3 ${item.color} rounded-sm`} />
                <span className="text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Active Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Active Milestones</h3>
        
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl p-4 hover:border-orange-200 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Target className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{milestone.name}</h4>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                
                {milestone.daysLeft && (
                  <div className="text-right">
                    <div className="text-lg font-bold text-yellow-600">{milestone.daysLeft}</div>
                    <div className="text-xs text-gray-500">วันที่เหลือ</div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ความคืบหน้า</span>
                  <span className="font-medium">{milestone.progress}/{milestone.target}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(milestone.progress / milestone.target) * 100}%` }}
                  />
                </div>
                
                {milestone.reward && (
                  <div className="flex items-center space-x-2 text-sm text-yellow-600 mt-2">
                    <Sparkles className="h-4 w-4" />
                    <span>รางวัล: {milestone.reward}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}

// Streak Counter Component
export function StreakCounter({ currentStreak, longestStreak }: { currentStreak: number; longestStreak: number }) {
  return (
    <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-3 rounded-full">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Current Streak</h3>
            <p className="text-orange-100 text-sm">วันติดต่อกันที่ใช้งาน</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">{currentStreak}</div>
          <div className="text-orange-100 text-sm">วัน</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="flex justify-between items-center text-sm">
          <span className="text-orange-100">สถิติสูงสุด</span>
          <span className="font-semibold">{longestStreak} วัน</span>
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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Summary</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <div className="text-2xl font-bold text-green-600">{completedDays}</div>
          <div className="text-sm text-gray-600">วันที่เสร็จสมบูรณ์</div>
        </div>
        
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">{averageScore.toFixed(1)}</div>
          <div className="text-sm text-gray-600">คะแนนเฉลี่ย</div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-600 mb-2">ความสำเร็จของสัปดาห์</div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(completedDays / 7) * 100}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">{completedDays}/7 วัน</div>
      </div>
    </div>
  );
} 