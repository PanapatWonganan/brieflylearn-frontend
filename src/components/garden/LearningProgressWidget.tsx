'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { courseIntegrationAPI, LearningProgressResponse } from '@/lib/garden/courseIntegrationApi'
import { BookOpen, Award, Star, TrendingUp, Target, CheckCircle } from 'lucide-react'

const LearningProgressWidget = () => {
  const [learningData, setLearningData] = useState<LearningProgressResponse['data'] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadLearningProgress()
  }, [])

  const loadLearningProgress = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await courseIntegrationAPI.getLearningProgress()
      setLearningData(response.data)
    } catch (err) {
      console.error('Failed to load learning progress:', err)
      setError('ไม่สามารถโหลดข้อมูลการตรียมสอบได้')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="text-center text-error">
          <Target className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm">{error}</p>
          <button
            onClick={loadLearningProgress}
            className="mt-2 text-brand-600 hover:text-brand-700 text-xs underline"
          >
            ลองใหม่
          </button>
        </div>
      </div>
    )
  }

  const progressPercentage = learningData ? Math.min((learningData.garden_xp / 1000) * 100, 100) : 0

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-brand-600" />
          <span>ความก้าวหน้าการตรียมสอบ</span>
        </h3>
        <button 
          onClick={loadLearningProgress}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="รีเฟรช"
        >
          <TrendingUp className="h-4 w-4" />
        </button>
      </div>

      {learningData && (
        <div className="space-y-6">
          {/* Garden Level & XP */}
          <div className="bg-brand-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">ระดับการเรียน {learningData.garden_level}</p>
                  <p className="text-xs text-gray-500">{learningData.garden_xp} / 1000 XP</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-brand-600">{learningData.star_seeds}</p>
                <p className="text-xs text-gray-500">⭐ Star Seeds</p>
              </div>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-brand-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Learning Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-sand-100 rounded-lg p-4 text-center">
              <CheckCircle className="h-6 w-6 text-brand-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-brand-600">{learningData.completed_lessons}</p>
              <p className="text-xs text-gray-600">เนื้อหาที่เรียนจบ</p>
            </div>

            <div className="bg-sand-100 rounded-lg p-4 text-center">
              <Award className="h-6 w-6 text-brand-700 mx-auto mb-2" />
              <p className="text-2xl font-bold text-brand-700">{learningData.completed_courses}</p>
              <p className="text-xs text-gray-600">วิชาที่จบ</p>
            </div>
          </div>

          {/* Recent Learning Activities */}
          {learningData.recent_learning_activities && learningData.recent_learning_activities.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">กิจกรรมการตรียมสอบล่าสุด</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {learningData.recent_learning_activities.slice(0, 3).map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="text-xl">{activity.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time_ago}</p>
                    </div>
                    <div className="text-xs text-brand-600 font-medium">
                      +{activity.xp_earned} XP
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Learning Progress Summary */}
          <div className="bg-brand-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">XP จากการตรียมสอบ</p>
                <p className="text-xs text-gray-500">รวมทั้งหมดที่ได้รับ</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-brand-600">{learningData.total_learning_xp}</p>
                <p className="text-xs text-gray-500">Study XP</p>
              </div>
            </div>
          </div>

          {/* Motivational Message */}
          {learningData.completed_lessons === 0 ? (
            <div className="text-center py-4">
              <p className="text-sm text-gray-600 mb-2">📚 เริ่มต้นการตรียมสอบเพื่อสร้างสวนการเรียน</p>
              <p className="text-xs text-gray-500">เรียนจบบทเรียนแรกเพื่อรับ XP และ Star Seeds!</p>
            </div>
          ) : learningData.completed_courses === 0 ? (
            <div className="text-center py-4">
              <p className="text-sm text-gray-600 mb-2">🎯 เตรียมสอบไปได้ดีแล้ว!</p>
              <p className="text-xs text-gray-500">เรียนจบวิชาแรกเพื่อรับโบนัสพิเศษ</p>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-gray-600 mb-2">🏆 ยอดเยี่ยม!</p>
              <p className="text-xs text-gray-500">คุณเป็นนักตรียมสอบที่ขยันมาก</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default LearningProgressWidget