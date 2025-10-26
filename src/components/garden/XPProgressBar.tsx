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
  const progressPercentage = xpForNextLevel > 0 ? (currentXP / xpForNextLevel) * 100 : 100
  
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
            <div className={`${sizeClass.padding} bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full flex items-center space-x-1`}>
              <Crown className={sizeClass.icon} />
              <span className={`font-bold ${sizeClass.text}`}>
                Level {level}
              </span>
            </div>
          )}
          {canLevelUp && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex items-center space-x-1 text-yellow-500"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-medium">พร้อมเลื่อนระดับความรู้!</span>
            </motion.div>
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
            className={`${sizeClass.height} bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full relative`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: [-100, 300] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: "100px" }}
            />
          </motion.div>
        </div>

        {/* Level Up Glow Effect */}
        {canLevelUp && (
          <motion.div
            className={`absolute inset-0 ${sizeClass.height} bg-gradient-to-r from-yellow-400/50 to-orange-500/50 rounded-full`}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
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
      <div className="flex items-center space-x-1 bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-bold shadow-lg">
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
      <div className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 text-white px-8 py-6 rounded-2xl shadow-2xl text-center">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: 2 }}
        >
          <Crown className="w-12 h-12 mx-auto mb-2" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-1">เลื่อนระดับความรู้แล้ว!</h2>
        <p className="text-lg">Level {newLevel}</p>
        
        {/* Sparkle Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: 1,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default XPProgressBar