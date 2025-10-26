'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Droplets, 
  Sparkles, 
  Heart, 
  Clock, 
  Scissors,
  AlertCircle,
  Crown
} from 'lucide-react'
import { UserPlant } from '@/lib/garden/types'
import { PLANT_CATEGORY_COLORS, PLANT_STAGE_NAMES } from '@/lib/garden/types'
import { getPlantEmoji, getStageEmoji, formatThaiDateTime } from '@/lib/garden/api'

interface PlantComponentProps {
  plant: UserPlant
  onWater?: (plantId: string) => Promise<void>
  onHarvest?: (plantId: string) => Promise<void>
  onPlantClick?: (plant: UserPlant) => void
  isWatering?: boolean
  isHarvesting?: boolean
  size?: 'sm' | 'md' | 'lg'
  showDetails?: boolean
  className?: string
}

const PlantComponent: React.FC<PlantComponentProps> = ({
  plant,
  onWater,
  onHarvest,
  onPlantClick,
  isWatering = false,
  isHarvesting = false,
  size = 'md',
  showDetails = true,
  className = ''
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const categoryColors = PLANT_CATEGORY_COLORS[plant.category] || PLANT_CATEGORY_COLORS.learning
  
  const sizeClasses = {
    sm: {
      container: 'w-20 h-20',
      emoji: 'text-2xl',
      button: 'w-6 h-6',
      icon: 'w-3 h-3'
    },
    md: {
      container: 'w-32 h-32',
      emoji: 'text-4xl',
      button: 'w-8 h-8',
      icon: 'w-4 h-4'
    },
    lg: {
      container: 'w-40 h-40',
      emoji: 'text-6xl',
      button: 'w-10 h-10',
      icon: 'w-5 h-5'
    }
  }

  const sizeClass = sizeClasses[size]

  const handleWater = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onWater && !isWatering) {
      await onWater(plant.id)
    }
  }

  const handleHarvest = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onHarvest && !isHarvesting) {
      await onHarvest(plant.id)
    }
  }

  const handlePlantClick = () => {
    if (onPlantClick) {
      onPlantClick(plant)
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Plant Container */}
      <motion.div
        className={`
          ${sizeClass.container} 
          relative rounded-2xl border-2 cursor-pointer
          transition-all duration-300 hover:shadow-lg
          ${plant.needs_watering ? 'border-red-300 bg-red-50' : `border-${plant.category === 'fitness' ? 'red' : plant.category === 'nutrition' ? 'orange' : plant.category === 'mental' ? 'indigo' : 'emerald'}-200`}
        `}
        style={{
          backgroundColor: plant.needs_watering ? '#FEF2F2' : categoryColors.light,
          borderColor: plant.needs_watering ? '#FCA5A5' : categoryColors.primary
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePlantClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Plant Stage Background */}
        <div className="absolute inset-2 rounded-xl bg-white/50 flex items-center justify-center">
          {/* Plant Emoji */}
          <motion.div
            className={sizeClass.emoji}
            animate={plant.needs_watering ? { rotate: [-2, 2, -2] } : {}}
            transition={{ duration: 2, repeat: plant.needs_watering ? Infinity : 0 }}
          >
            {plant.is_fully_grown ? getPlantEmoji(plant.category) : getStageEmoji(plant.stage)}
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-1 left-1 right-1">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${plant.health > 70 ? 'bg-blue-500' : plant.health > 40 ? 'bg-indigo-500' : 'bg-red-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${plant.health}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        {/* Learning Progress */}
        {!plant.is_fully_grown && (
          <div className="absolute bottom-1 left-1 right-1">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${plant.growth_progress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        )}

        {/* Status Icons */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          {plant.needs_watering && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-red-500"
            >
              <AlertCircle className={sizeClass.icon} />
            </motion.div>
          )}
          
          {plant.can_harvest && (
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-yellow-500"
            >
              <Crown className={sizeClass.icon} />
            </motion.div>
          )}
        </div>

        {/* Action Buttons - Show only when needed */}
        <AnimatePresence>
          {(plant.needs_watering || plant.can_harvest) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-2 -right-2 flex flex-col space-y-1"
            >
              {plant.needs_watering && onWater && (
                <motion.button
                  className={`${sizeClass.button} bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all`}
                  onClick={handleWater}
                  disabled={isWatering}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 4px 6px rgba(0, 0, 0, 0.1)',
                      '0 8px 15px rgba(59, 130, 246, 0.4)', 
                      '0 4px 6px rgba(0, 0, 0, 0.1)'
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {isWatering ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className={sizeClass.icon} />
                    </motion.div>
                  ) : (
                    <Droplets className={sizeClass.icon} />
                  )}
                </motion.button>
              )}
              
              {plant.can_harvest && onHarvest && (
                <motion.button
                  className={`${sizeClass.button} bg-yellow-500 hover:bg-yellow-600 text-white rounded-full flex items-center justify-center shadow-lg`}
                  onClick={handleHarvest}
                  disabled={isHarvesting}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isHarvesting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className={sizeClass.icon} />
                    </motion.div>
                  ) : (
                    <Scissors className={sizeClass.icon} />
                  )}
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Plant Details Tooltip */}
      <AnimatePresence>
        {showTooltip && showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-10 bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg"
          >
            <div className="text-center">
              <div className="font-semibold">{plant.name}</div>
              <div className="text-gray-300">{PLANT_STAGE_NAMES[plant.stage as keyof typeof PLANT_STAGE_NAMES]}</div>
              <div className="text-xs text-gray-400">
                ความรู้ {plant.health}% • {plant.is_fully_grown ? 'เรียนจบแล้ว' : `เรียนไปแล้ว ${plant.growth_progress}%`}
              </div>
              {plant.next_water_at && (
                <div className="text-xs text-blue-300">
                  ทบทวนครั้งต่อไป: {formatThaiDateTime(plant.next_water_at)}
                </div>
              )}
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Plant Grid Layout Component
interface PlantGridProps {
  plants: UserPlant[]
  onWater?: (plantId: string) => Promise<void>
  onHarvest?: (plantId: string) => Promise<void>
  onPlantClick?: (plant: UserPlant) => void
  isWatering?: boolean
  isHarvesting?: boolean
  emptySlots?: number
  onEmptySlotClick?: () => void
  className?: string
}

export const PlantGrid: React.FC<PlantGridProps> = ({
  plants,
  onWater,
  onHarvest,
  onPlantClick,
  isWatering,
  isHarvesting,
  emptySlots = 0,
  onEmptySlotClick,
  className = ''
}) => {
  return (
    <div className={`grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ${className}`}>
      {/* Existing Plants */}
      {plants.map((plant) => (
        <PlantComponent
          key={plant.id}
          plant={plant}
          onWater={onWater}
          onHarvest={onHarvest}
          onPlantClick={onPlantClick}
          isWatering={isWatering}
          isHarvesting={isHarvesting}
        />
      ))}
      
      {/* Empty Slots */}
      {Array.from({ length: emptySlots }, (_, index) => (
        <motion.div
          key={`empty-${index}`}
          className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEmptySlotClick}
        >
          <div className="text-gray-400 text-center">
            <div className="text-2xl mb-1">📚</div>
            <div className="text-xs">เรียนวิชาใหม่</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default PlantComponent