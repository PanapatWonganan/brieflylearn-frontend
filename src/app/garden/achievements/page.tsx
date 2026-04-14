'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGarden } from '@/contexts/GardenContext'
import { Achievement } from '@/lib/garden/types'
import { gardenAPI } from '@/lib/garden/api'
import { Trophy, Star, Lock, Calendar, Award, Target, Users, Zap } from 'lucide-react'
import { PageSkeleton } from '@/components/Skeleton'

const AchievementGallery = () => {
  const { achievements, isLoading } = useGarden()
  const [userAchievements, setUserAchievements] = useState<Achievement[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loadingUserAchievements, setLoadingUserAchievements] = useState(true)

  const categories = [
    { id: 'all', name: 'ทั้งหมด', icon: Trophy, color: 'bg-mint-700' },
    { id: 'learning', name: 'AI Mastery', icon: Star, color: 'bg-mint-500' },
    { id: 'fitness', name: 'Business Impact', icon: Zap, color: 'bg-red-500' },
    { id: 'mental', name: 'Innovation', icon: Target, color: 'bg-mint-600' },
    { id: 'social', name: 'Knowledge Sharing', icon: Users, color: 'bg-mint-600' },
    { id: 'special', name: 'Continuous Learning', icon: Award, color: 'bg-gray-600' }
  ]

  // Load user achievements
  useEffect(() => {
    const loadUserAchievements = async () => {
      try {
        setLoadingUserAchievements(true)
        const response = await gardenAPI.getMyAchievements()
        setUserAchievements(response.achievements || [])
      } catch (error) {
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
    return userAchievements.some(ua => ua.id === achievementId && ua.is_earned)
  }

  // Get user achievement progress
  const getProgress = (achievementId: string) => {
    const userAchievement = userAchievements.find(ua => ua.id === achievementId)
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
      const criteria = typeof achievement.criteria === 'string'
        ? JSON.parse(achievement.criteria)
        : achievement.criteria
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
      <div className="min-h-screen">
        <PageSkeleton cards={6} />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-800/40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-200 flex items-center space-x-2">
                <span>🏆</span>
                <span>Hall of Fame</span>
              </h1>
              <p className="text-gray-500 mt-1">ความสำเร็จและรางวัลที่คุณได้รับ</p>
            </div>

            <div className="border border-gray-700 rounded-sm px-6 py-2.5 flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-gray-200" />
              <span className="font-bold text-gray-200">{userAchievements.length} / {allAchievements.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
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
                  className={`flex items-center space-x-2 px-4 py-2 rounded-sm font-medium transition-all duration-300 ${
                    isSelected
                      ? 'bg-mint-600 text-white'
                      : 'border border-gray-700 text-gray-400 hover:text-gray-200'
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
                className={`relative overflow-hidden rounded-sm border transition-all duration-300 ${
                  earned
                    ? 'bg-gray-800/50 border-2 border-mint-500/30'
                    : 'bg-gray-900 border-2 border-gray-700'
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Achievement Icon */}
                <div className="p-6 text-center">
                  <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                    earned ? 'bg-gray-800/50' : 'bg-gray-800/50'
                  }`}>
                    {earned ? (
                      <span className="text-3xl">{emoji}</span>
                    ) : (
                      <Lock className="h-8 w-8 text-gray-600" />
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

                  <h3 className={`text-lg font-bold mb-2 ${earned ? 'text-gray-200' : 'text-gray-500'}`}>
                    {achievement.name}
                  </h3>

                  <p className={`text-sm mb-4 ${earned ? 'text-gray-400' : 'text-gray-600'}`}>
                    {achievement.description}
                  </p>

                  {/* Rewards */}
                  <div className="flex justify-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1 text-sm">
                      <Star className="h-4 w-4 text-mint-500" />
                      <span className={earned ? 'text-gray-400 font-medium' : 'text-gray-600'}>
                        {achievement.xp_reward} Impact Points
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <span className="text-amber-500">⭐</span>
                      <span className={earned ? 'text-amber-500 font-medium' : 'text-gray-600'}>
                        {achievement.star_seeds_reward} AI Credits
                      </span>
                    </div>
                  </div>

                  {/* Progress or Earned Date */}
                  {earned ? (
                    <div className="flex items-center justify-center space-x-1 text-xs text-mint-400">
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
                  <div className={`px-2 py-1 rounded-sm text-xs font-medium ${
                    earned ? 'bg-mint-500/20 text-amber-500' : 'bg-gray-800/50 text-gray-500'
                  }`}>
                    {categories.find(c => c.id === achievement.category)?.name || achievement.category}
                  </div>
                </div>

                {/* Achievement Glow Effect for Earned */}
                {earned && (
                  <div className="absolute inset-0 bg-mint-500/5 pointer-events-none" />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">ไม่มีรางวัลในหมวดหมู่นี้</h3>
            <p className="text-gray-500">ลองเลือกหมวดหมู่อื่นดูสิ</p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 rounded-sm p-6 text-center border border-gray-700">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-gray-200">{userAchievements.length}</div>
            <div className="text-sm text-gray-500">รางวัลที่ได้รับ</div>
          </div>

          <div className="bg-gray-900 rounded-sm p-6 text-center border border-gray-700">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-amber-500">
              {userAchievements.reduce((sum, ua) => {
                return ua.is_earned ? sum + (ua.star_seeds_reward || 0) : sum
              }, 0)}
            </div>
            <div className="text-sm text-gray-500">AI Credits จากรางวัล</div>
          </div>

          <div className="bg-gray-900 rounded-sm p-6 text-center border border-gray-700">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-bold text-gray-400">
              {userAchievements.reduce((sum, ua) => {
                return ua.is_earned ? sum + (ua.xp_reward || 0) : sum
              }, 0)}
            </div>
            <div className="text-sm text-gray-500">Impact Points จากรางวัล</div>
          </div>

          <div className="bg-gray-900 rounded-sm p-6 text-center border border-gray-700">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-mint-500">
              {Math.round((userAchievements.length / allAchievements.length) * 100)}%
            </div>
            <div className="text-sm text-gray-500">ความสำเร็จ</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AchievementGallery