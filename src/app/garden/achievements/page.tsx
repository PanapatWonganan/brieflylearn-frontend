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
    { id: 'all', name: 'ทั้งหมด', icon: Trophy, color: 'bg-brand-700' },
    { id: 'learning', name: 'AI Mastery', icon: Star, color: 'bg-brand-500' },
    { id: 'fitness', name: 'Business Impact', icon: Zap, color: 'bg-error' },
    { id: 'mental', name: 'Innovation', icon: Target, color: 'bg-brand-600' },
    { id: 'social', name: 'Knowledge Sharing', icon: Users, color: 'bg-brand-600' },
    { id: 'special', name: 'Continuous Learning', icon: Award, color: 'bg-sand-400' }
  ]

  // Load user achievements
  useEffect(() => {
    const loadUserAchievements = async () => {
      try {
        setLoadingUserAchievements(true)
        const response = await gardenAPI.getMyAchievements()
        setUserAchievements(response.achievements || [])
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
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-ink flex items-center space-x-2">
                <span>🏆</span>
                <span>Hall of Fame</span>
              </h1>
              <p className="text-ink-muted mt-1">ความสำเร็จและรางวัลที่คุณได้รับ</p>
            </div>
            
            <div className="border border-gray-100 rounded-lg px-6 py-2.5 flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-ink" />
              <span className="font-bold text-ink">{userAchievements.length} / {allAchievements.length}</span>
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
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isSelected
                      ? 'bg-ink text-white'
                      : 'border border-gray-100 text-ink-light hover:text-ink'
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
                className={`relative overflow-hidden rounded-lg border border-gray-100 transition-all duration-300 ${
                  earned
                    ? 'bg-gray-50 border-2 border-sand-300'
                    : 'bg-white border-2 border-gray-200'
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Achievement Icon */}
                <div className="p-6 text-center">
                  <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                    earned ? 'bg-gray-50' : 'bg-gray-50'
                  }`}>
                    {earned ? (
                      <span className="text-3xl">{emoji}</span>
                    ) : (
                      <Lock className="h-8 w-8 text-ink-faint" />
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

                  <h3 className={`text-lg font-bold mb-2 ${earned ? 'text-ink' : 'text-ink-muted'}`}>
                    {achievement.name}
                  </h3>
                  
                  <p className={`text-sm mb-4 ${earned ? 'text-ink-light' : 'text-ink-faint'}`}>
                    {achievement.description}
                  </p>

                  {/* Rewards */}
                  <div className="flex justify-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1 text-sm">
                      <Star className="h-4 w-4 text-blue-500" />
                      <span className={earned ? 'text-ink-light font-medium' : 'text-ink-faint'}>
                        {achievement.xp_reward} Impact Points
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <span className="text-warning">⭐</span>
                      <span className={earned ? 'text-warning font-medium' : 'text-ink-faint'}>
                        {achievement.star_seeds_reward} AI Credits
                      </span>
                    </div>
                  </div>

                  {/* Progress or Earned Date */}
                  {earned ? (
                    <div className="flex items-center justify-center space-x-1 text-xs text-brand-600">
                      <Calendar className="h-3 w-3" />
                      <span>ได้รับแล้ว</span>
                    </div>
                  ) : (
                    <div className="text-xs text-ink-muted">
                      <Lock className="h-3 w-3 mx-auto mb-1" />
                      <span>ยังไม่ได้รับ</span>
                    </div>
                  )}
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    earned ? 'bg-sand-200 text-warning' : 'bg-gray-50 text-ink-muted'
                  }`}>
                    {categories.find(c => c.id === achievement.category)?.name || achievement.category}
                  </div>
                </div>

                {/* Achievement Glow Effect for Earned */}
                {earned && (
                  <div className="absolute inset-0 bg-brand-50 pointer-events-none" />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-ink-light mb-2">ไม่มีรางวัลในหมวดหมู่นี้</h3>
            <p className="text-ink-muted">ลองเลือกหมวดหมู่อื่นดูสิ</p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-ink">{userAchievements.length}</div>
            <div className="text-sm text-ink-muted">รางวัลที่ได้รับ</div>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center border border-gray-100">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-warning">
              {userAchievements.reduce((sum, ua) => {
                return ua.is_earned ? sum + (ua.star_seeds_reward || 0) : sum
              }, 0)}
            </div>
            <div className="text-sm text-ink-muted">AI Credits จากรางวัล</div>
          </div>

          <div className="bg-white rounded-lg p-6 text-center border border-gray-100">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-bold text-ink-light">
              {userAchievements.reduce((sum, ua) => {
                return ua.is_earned ? sum + (ua.xp_reward || 0) : sum
              }, 0)}
            </div>
            <div className="text-sm text-ink-muted">Impact Points จากรางวัล</div>
          </div>

          <div className="bg-white rounded-lg p-6 text-center border border-gray-100">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-brand-700">
              {Math.round((userAchievements.length / allAchievements.length) * 100)}%
            </div>
            <div className="text-sm text-ink-muted">ความสำเร็จ</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AchievementGallery