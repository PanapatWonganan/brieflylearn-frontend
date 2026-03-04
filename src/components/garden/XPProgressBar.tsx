'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Crown } from 'lucide-react'
import { formatXP } from '@/lib/garden/api'

interface XPProgressBarProps {
  level: number
  currentXP: number
  xpForNextLevel: number
  canLevelUp: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showLevelIcon?: boolean
}

const XPProgressBar: React.FC<XPProgressBarProps> = ({
  level,
  currentXP,
  xpForNextLevel,
  canLevelUp,
  className = '',
  size = 'md',
  showLevelIcon = true
}) => {
  const progressPercentage = xpForNextLevel > 0 ? (currentXP / xpForNextLevel) * 100 : 0
  
  const sizeClasses = {
    sm: {
      height: 'h-2',
      text: 'text-xs',
      padding: 'px-2 py-1',
      icon: 'w-4 h-4'
    },
    md: {
      height: 'h-3',
      text: 'text-sm',
      padding: 'px-3 py-2',
      icon: 'w-5 h-5'
    },
    lg: {
      height: 'h-4',
      text: 'text-base',
      padding: 'px-4 py-3',
      icon: 'w-6 h-6'
    }
  }

  const sizeClass = sizeClasses[size]

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Level Display */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {showLevelIcon && (
            <div className={`${sizeClass.padding} bg-brand-600 text-white rounded-full flex items-center space-x-1`}>
              <Crown className={sizeClass.icon} />
              <span className={`font-bold ${sizeClass.text}`}>
                Level {level}
              </span>
            </div>
          )}
          {canLevelUp && (
            <div className="flex items-center space-x-1 text-warning">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-medium">พร้อมเลื่อนระดับความรู้!</span>
            </div>
          )}
        </div>
        
        <div className={`${sizeClass.text} text-gray-600`}>
          {formatXP(currentXP)} / {formatXP(xpForNextLevel)} XP
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className={`w-full ${sizeClass.height} bg-gray-200 rounded-full overflow-hidden`}>
          <motion.div
            className={`${sizeClass.height} bg-brand-600 rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* XP Gain Animation Container */}
      <div className="relative h-6">
        {/* This will be used for floating XP gain animations */}
      </div>
    </div>
  )
}

// XP Gain Animation Component (สำหรับแสดงเมื่อได้ XP)
interface XPGainAnimationProps {
  xpGained: number
  onComplete?: () => void
}

export const XPGainAnimation: React.FC<XPGainAnimationProps> = ({
  xpGained,
  onComplete
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 0.8 }}
      animate={{ opacity: 1, y: -40, scale: 1 }}
      exit={{ opacity: 0, y: -60, scale: 0.8 }}
      transition={{ duration: 2 }}
      onAnimationComplete={onComplete}
      className="absolute right-0 pointer-events-none"
    >
      <div className="flex items-center space-x-1 bg-brand-500 text-white px-2 py-1 rounded-full text-sm font-bold shadow-card">
        <Sparkles className="w-3 h-3" />
        <span>+{formatXP(xpGained)} XP</span>
      </div>
    </motion.div>
  )
}

// Level Up Animation Component
export const LevelUpAnimation: React.FC<{ newLevel: number; onComplete?: () => void }> = ({
  newLevel,
  onComplete
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 3 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
    >
      <div className="bg-brand-700 text-white px-8 py-6 rounded-lg shadow-card text-center">
        <Crown className="w-12 h-12 mx-auto mb-2" />
        <h2 className="text-2xl font-bold mb-1">เลื่อนระดับความรู้แล้ว!</h2>
        <p className="text-lg">Level {newLevel}</p>
      </div>
    </motion.div>
  )
}

export default XPProgressBar