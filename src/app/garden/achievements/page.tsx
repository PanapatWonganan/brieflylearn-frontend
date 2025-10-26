'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGarden } from '@/contexts/GardenContext'
import { Achievement, UserAchievement } from '@/lib/garden/types'
import { gardenAPI } from '@/lib/garden/api'
import { Trophy, Star, Lock, Calendar, Award, Target, Users, Zap } from 'lucide-react'

const AchievementGallery = () => {
  const { achievements, isLoading } = useGarden()
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loadingUserAchievements, setLoadingUserAchievements] = useState(true)

  const categories = [
    { id: 'all', name: 'ทั้งหมด', icon: Trophy, color: 'from-purple-400 to-purple-600' },
    { id: 'learning', name: 'การเรียนรู้', icon: Star, color: 'from-blue-400 to-blue-600' },
    { id: 'fitness', name: 'การออกกำลังกาย', icon: Zap, color: 'from-red-400 to-red-600' },
    { id: 'mental', name: 'จิตใจ', icon: Target, color: 'from-indigo-400 to-indigo-600' },
    { id: 'social', name: 'สังคม', icon: Users, color: 'from-green-400 to-green-600' },
    { id: 'special', name: 'พิเศษ', icon: Award, color: 'from-yellow-400 to-yellow-600' }
  ]

  // Load user achievements
  useEffect(() => {
    const loadUserAchievements = async () => {
      try {
        setLoadingUserAchievements(true)
        const response = await gardenAPI.getUserAchievements()
        setUserAchievements(response.user_achievements || [])
      } catch (error) {
        console.error('Failed to load user achievements:', error)
        setUserAchievements([])
      } finally {
        setLoadingUserAchievements(false)
      }
    }

    if (!isLoading) {
      loadUserAchievements()
    }
  }, [isLoading])

  // Get all achievements in a flat array
  const allAchievements = Object.values(achievements).flat()

  // Filter achievements by category
  const filteredAchievements = selectedCategory === 'all' 
    ? allAchievements 
    : allAchievements.filter(achievement => achievement.category === selectedCategory)

  // Check if user has earned an achievement
  const hasEarned = (achievementId: string) => {
    return userAchievements.some(ua => ua.achievement_id === achievementId)
  }

  // Get user achievement progress
  const getProgress = (achievementId: string) => {
    const userAchievement = userAchievements.find(ua => ua.achievement_id === achievementId)
    return userAchievement?.progress_data || {}
  }

  // Get achievement icon based on category
  const getAchievementIcon = (category: string) => {
    const categoryData = categories.find(c => c.id === category)
    return categoryData?.icon || Trophy
  }

  // Get achievement emoji based on name or category
  const getAchievementEmoji = (achievement: Achievement) => {
    const emojiMap: { [key: string]: string } = {
      // Learning achievements
      'นักปลูกมือใหม่': '🌱',
      'นักเรียนขยัน': '📚',
      'ปราชญ์แห่งสุขภาพ': '🎓',
      // Fitness achievements
      'นักสู้ยามเช้า': '🌅',
      'มาราธอนเนอร์': '🏃‍♀️',
      // Mental achievements
      'จิตสงบ': '🧘‍♀️',
      'ชีวิตสมดุล': '⚖️',
      // Social achievements
      'เพื่อนที่ดี': '🤝',
      'ผู้นำชุมชน': '👑',
      // Special achievements
      'นักสวนระดับ 5': '🏆',
      'มาสเตอร์การ์เดนเนอร์': '🌟'
    }
    return emojiMap[achievement.name] || '🎯'
  }

  // Get achievement progress for learning achievements
  const getAchievementProgress = (achievement: Achievement) => {
    if (!achievement.criteria) return null
    
    try {
      const criteria = JSON.parse(achievement.criteria)
      // For demo purposes, get some sample progress data
      // In real implementation, this would come from the API
      return {
        current: 0,
        threshold: criteria.threshold || 1,
        type: criteria.type || 'unknown'
      }
    } catch (e) {
      return null
    }
  }

  if (isLoading || loadingUserAchievements) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-100 flex items-center justify-center">
        <motion.div
          className="text-8xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🏆
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
                <span>🏆</span>
                <span>แกลเลอรี่รางวัล</span>
              </h1>
              <p className="text-gray-600 mt-1">ความสำเร็จและรางวัลที่คุณได้รับ</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-400 to-orange-500 text-white px-6 py-3 rounded-xl flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span className="font-bold">{userAchievements.length} / {allAchievements.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              const isSelected = selectedCategory === category.id
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isSelected
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'bg-white text-gray-600 hover:text-gray-900 hover:shadow-md'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => {
            const earned = hasEarned(achievement.id)
            const progress = getProgress(achievement.id)
            const Icon = getAchievementIcon(achievement.category)
            const emoji = getAchievementEmoji(achievement)
            
            return (
              <motion.div
                key={achievement.id}
                className={`relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ${
                  earned 
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-100 border-2 border-yellow-300' 
                    : 'bg-white border-2 border-gray-200'
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Achievement Icon */}
                <div className="p-6 text-center">
                  <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                    earned ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gray-200'
                  }`}>
                    {earned ? (
                      <span className="text-3xl">{emoji}</span>
                    ) : (
                      <Lock className="h-8 w-8 text-gray-400" />
                    )}
                    
                    {earned && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Trophy className="h-3 w-3 text-white" />
                      </motion.div>
                    )}
                  </div>

                  <h3 className={`text-lg font-bold mb-2 ${earned ? 'text-gray-900' : 'text-gray-500'}`}>
                    {achievement.name}
                  </h3>
                  
                  <p className={`text-sm mb-4 ${earned ? 'text-gray-700' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>

                  {/* Rewards */}
                  <div className="flex justify-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1 text-sm">
                      <Star className="h-4 w-4 text-blue-500" />
                      <span className={earned ? 'text-orange-600 font-medium' : 'text-gray-400'}>
                        {achievement.xp_reward} XP
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <span className="text-yellow-500">⭐</span>
                      <span className={earned ? 'text-yellow-600 font-medium' : 'text-gray-400'}>
                        {achievement.star_seeds_reward} Seeds
                      </span>
                    </div>
                  </div>

                  {/* Progress or Earned Date */}
                  {earned ? (
                    <div className="flex items-center justify-center space-x-1 text-xs text-green-600">
                      <Calendar className="h-3 w-3" />
                      <span>ได้รับแล้ว</span>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500">
                      <Lock className="h-3 w-3 mx-auto mb-1" />
                      <span>ยังไม่ได้รับ</span>
                    </div>
                  )}
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    earned ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {categories.find(c => c.id === achievement.category)?.name || achievement.category}
                  </div>
                </div>

                {/* Achievement Glow Effect for Earned */}
                {earned && (
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 pointer-events-none" />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">ไม่มีรางวัลในหมวดหมู่นี้</h3>
            <p className="text-gray-500">ลองเลือกหมวดหมู่อื่นดูสิ</p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-gray-900">{userAchievements.length}</div>
            <div className="text-sm text-gray-600">รางวัลที่ได้รับ</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-yellow-600">
              {userAchievements.reduce((sum, ua) => {
                const achievement = allAchievements.find(a => a.id === ua.achievement_id)
                return sum + (achievement?.star_seeds_reward || 0)
              }, 0)}
            </div>
            <div className="text-sm text-gray-600">Seeds จากรางวัล</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-bold text-orange-600">
              {userAchievements.reduce((sum, ua) => {
                const achievement = allAchievements.find(a => a.id === ua.achievement_id)
                return sum + (achievement?.xp_reward || 0)
              }, 0)}
            </div>
            <div className="text-sm text-gray-600">XP จากรางวัล</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((userAchievements.length / allAchievements.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">ความสำเร็จ</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AchievementGallery