'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trophy, 
  Star, 
  Gift, 
  Sparkles, 
  Award, 
  CheckCircle,
  X
} from 'lucide-react'

interface CourseCompletionData {
  course: {
    id: string
    title: string
    total_lessons: number
  }
  rewards: {
    xp_earned: number
    star_seeds_earned: number
    bonus_xp: number
    bonus_star_seeds: number
  }
  achievements: Array<{
    id: string
    name: string
    description: string
    xp_reward: number
    star_seeds_reward: number
  }>
  new_level?: number
}

interface CourseCompletionCelebrationProps {
  data: CourseCompletionData
  isVisible: boolean
  onClose: () => void
}

const CourseCompletionCelebration: React.FC<CourseCompletionCelebrationProps> = ({
  data,
  isVisible,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const totalXP = data.rewards.xp_earned + data.rewards.bonus_xp
  const totalStarSeeds = data.rewards.star_seeds_earned + data.rewards.bonus_star_seeds

  useEffect(() => {
    if (isVisible) {
      // Auto advance through steps
      const timer1 = setTimeout(() => setCurrentStep(1), 1000)
      const timer2 = setTimeout(() => setCurrentStep(2), 2500)
      const timer3 = setTimeout(() => setCurrentStep(3), 4000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Main Modal */}
          <motion.div
            className="relative bg-white rounded-lg shadow-card max-w-md w-full mx-4 overflow-hidden"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>

            {/* Header */}
            <div className="bg-brand-600 text-white p-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: currentStep >= 0 ? 1 : 0 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Trophy className="h-16 w-16 mx-auto mb-4 text-sand-300" />
              </motion.div>

              <motion.h2
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: currentStep >= 0 ? 1 : 0, y: currentStep >= 0 ? 0 : 20 }}
                transition={{ delay: 0.4 }}
              >
                🎉 ยินดีด้วย!
              </motion.h2>

              <motion.p
                className="text-brand-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: currentStep >= 0 ? 1 : 0, y: currentStep >= 0 ? 0 : 20 }}
                transition={{ delay: 0.6 }}
              >
                คุณเรียนจบคอร์สแล้ว
              </motion.p>
            </div>

            <div className="p-6 space-y-6">
              {/* Course Info */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: currentStep >= 0 ? 1 : 0, y: currentStep >= 0 ? 0 : 30 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {data.course.title}
                </h3>
                <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-brand-600" />
                    <span>{data.course.total_lessons} บทเรียน</span>
                  </div>
                </div>
              </motion.div>

              {/* Rewards */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: currentStep >= 1 ? 1 : 0, y: currentStep >= 1 ? 0 : 30 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="text-lg font-semibold text-center text-gray-800 flex items-center justify-center space-x-2">
                  <Gift className="h-5 w-5 text-brand-500" />
                  <span>รางวัลที่ได้รับ</span>
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  {/* XP Reward */}
                  <div className="bg-sand-100 rounded-lg p-4 text-center">
                    <Star className="h-6 w-6 text-brand-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-brand-600">+{totalXP}</p>
                    <p className="text-xs text-gray-600">XP</p>
                    {data.rewards.bonus_xp > 0 && (
                      <p className="text-xs text-brand-600 mt-1">
                        (โบนัส +{data.rewards.bonus_xp})
                      </p>
                    )}
                  </div>

                  {/* Star Seeds Reward */}
                  <div className="bg-sand-200 rounded-lg p-4 text-center">
                    <Sparkles className="h-6 w-6 text-sand-300 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-sand-300">+{totalStarSeeds}</p>
                    <p className="text-xs text-gray-600">⭐ Seeds</p>
                    {data.rewards.bonus_star_seeds > 0 && (
                      <p className="text-xs text-sand-300 mt-1">
                        (โบนัส +{data.rewards.bonus_star_seeds})
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Level Up */}
              {data.new_level && (
                <motion.div
                  className="bg-brand-50 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: currentStep >= 2 ? 1 : 0, scale: currentStep >= 2 ? 1 : 0.8 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-4xl mb-2">🎊</div>
                  <p className="text-lg font-bold text-brand-600">Level Up!</p>
                  <p className="text-sm text-gray-600">ขึ้นเป็นระดับ {data.new_level} แล้ว</p>
                </motion.div>
              )}

              {/* Achievements */}
              {data.achievements.length > 0 && (
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: currentStep >= 3 ? 1 : 0, y: currentStep >= 3 ? 0 : 30 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-lg font-semibold text-center text-gray-800 flex items-center justify-center space-x-2">
                    <Award className="h-5 w-5 text-brand-700" />
                    <span>รางวัลใหม่ที่ปลดล็อค</span>
                  </h4>

                  <div className="space-y-2">
                    {data.achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        className="bg-sand-100 border border-brand-200 rounded-lg p-3 flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <div className="w-10 h-10 bg-sand-300 rounded-full flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">
                            {achievement.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {achievement.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-brand-600 font-medium">
                            +{achievement.xp_reward} XP
                          </p>
                          <p className="text-xs text-brand-600">
                            +{achievement.star_seeds_reward} ⭐
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Continue Button */}
              <motion.button
                onClick={onClose}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: currentStep >= 3 ? 1 : 0, y: currentStep >= 3 ? 0 : 20 }}
                transition={{ delay: 1 }}
              >
                ดูสวนของฉัน 🌱
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CourseCompletionCelebration