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
import { getPlantSprite, getSpriteTheme } from '@/lib/garden/spriteConfig'
import SpriteRenderer from './SpriteRenderer'
import { useGarden } from '@/contexts/GardenContext'

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

  // Get rendering mode from GardenContext (always called - React hooks rules)
  const gardenCtx = useGarden()
  const renderingMode = gardenCtx.renderingMode
  const spriteThemeId = gardenCtx.spriteThemeId

  // Get sprite for current plant if in sprite mode
  const spriteAnim = renderingMode === 'sprite'
    ? getPlantSprite(spriteThemeId, plant.category, plant.stage)
    : null
  const spriteTheme = renderingMode === 'sprite'
    ? getSpriteTheme(spriteThemeId)
    : null

  const sizeClasses = {
    sm: {
      container: 'w-20 h-20',
      emoji: 'text-2xl',
      spriteScale: 3,    // 16 * 3 = 48px
      button: 'w-6 h-6',
      icon: 'w-3 h-3'
    },
    md: {
      container: 'w-32 h-32',
      emoji: 'text-4xl',
      spriteScale: 5,    // 16 * 5 = 80px
      button: 'w-8 h-8',
      icon: 'w-4 h-4'
    },
    lg: {
      container: 'w-40 h-40',
      emoji: 'text-6xl',
      spriteScale: 7,    // 16 * 7 = 112px
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
          relative rounded-sm border-2 cursor-pointer
          transition-all duration-300
          ${plant.needs_watering ? 'border-gray-600 bg-red-500/10' : `border-${plant.category === 'fitness' ? 'red' : plant.category === 'nutrition' ? 'orange' : plant.category === 'mental' ? 'mint' : 'emerald'}-200`}
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
        <div className="absolute inset-2 rounded-sm bg-white/50 flex items-center justify-center">
          {/* Render sprite or emoji based on mode */}
          {renderingMode === 'sprite' && spriteAnim ? (
            <SpriteRenderer
              sprite={spriteAnim}
              scale={sizeClass.spriteScale}
              pixelated={spriteTheme?.pixelated ?? true}
              playing={plant.is_fully_grown}
            />
          ) : (
            <div className={sizeClass.emoji}>
              {plant.is_fully_grown ? getPlantEmoji(plant.category) : getStageEmoji(plant.stage)}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="absolute top-1 left-1 right-1">
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${plant.health > 70 ? 'bg-mint-500' : plant.health > 40 ? 'bg-warning' : 'bg-error'}`}
              initial={{ width: 0 }}
              animate={{ width: `${plant.health}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        {/* Learning Progress */}
        {!plant.is_fully_grown && (
          <div className="absolute bottom-1 left-1 right-1">
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-mint-600"
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
            <div className="text-red-400">
              <AlertCircle className={sizeClass.icon} />
            </div>
          )}

          {plant.can_harvest && (
            <div className="text-warning">
              <Crown className={sizeClass.icon} />
            </div>
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
                  className={`${sizeClass.button} bg-mint-500 hover:opacity-90 text-white rounded-full flex items-center justify-center shadow-card transition-all`}
                  onClick={handleWater}
                  disabled={isWatering}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
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
                  className={`${sizeClass.button} bg-gray-700 hover:opacity-90 text-gray-400 rounded-full flex items-center justify-center shadow-card`}
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
            className="absolute z-10 bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-sm text-sm whitespace-nowrap shadow-card"
          >
            <div className="text-center">
              <div className="font-semibold">{plant.name}</div>
              <div className="text-gray-300">{PLANT_STAGE_NAMES[plant.stage as keyof typeof PLANT_STAGE_NAMES]}</div>
              <div className="text-xs text-gray-400">
                คุณภาพ {plant.health}% • {plant.is_fully_grown ? 'เปิดตัวแล้ว' : `พัฒนาแล้ว ${plant.growth_progress}%`}
              </div>
              {plant.next_water_at && (
                <div className="text-xs text-gray-400">
                  พัฒนาต่อครั้งต่อไป: {formatThaiDateTime(plant.next_water_at)}
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
          className="w-32 h-32 border-2 border-dashed border-gray-600 rounded-sm flex items-center justify-center cursor-pointer hover:border-gray-500 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEmptySlotClick}
        >
          <div className="text-gray-400 text-center">
            <div className="text-2xl mb-1">💡</div>
            <div className="text-xs">เริ่มโปรเจกต์ใหม่</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default PlantComponent