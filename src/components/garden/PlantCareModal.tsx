'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Droplets, 
  Scissors, 
  Heart, 
  Clock, 
  Star,
  Sparkles,
  TreePine,
  Calendar,
  TrendingUp
} from 'lucide-react'
import { UserPlant, PlantType } from '@/lib/garden/types'
import { PLANT_CATEGORY_COLORS, PLANT_STAGE_NAMES, RARITY_COLORS } from '@/lib/garden/types'
import { formatThaiDateTime, getPlantEmoji, getStageEmoji } from '@/lib/garden/api'

interface PlantCareModalProps {
  plant: UserPlant | null
  plantType?: PlantType
  isOpen: boolean
  onClose: () => void
  onWater?: (plantId: string) => Promise<void>
  onHarvest?: (plantId: string) => Promise<void>
  isWatering?: boolean
  isHarvesting?: boolean
}

const PlantCareModal: React.FC<PlantCareModalProps> = ({
  plant,
  plantType,
  isOpen,
  onClose,
  onWater,
  onHarvest,
  isWatering = false,
  isHarvesting = false
}) => {
  const [showCareDetails, setShowCareDetails] = useState(false)

  if (!plant) return null

  // Get category colors with fallback to 'learning' if category not found
  const category = plant.category as keyof typeof PLANT_CATEGORY_COLORS
  const categoryColors = PLANT_CATEGORY_COLORS[category] || PLANT_CATEGORY_COLORS['learning']
  const rarityColors = plantType ? RARITY_COLORS[plantType.rarity] : RARITY_COLORS.common

  const handleWater = async () => {
    if (onWater && !isWatering) {
      await onWater(plant.id)
    }
  }

  const handleHarvest = async () => {
    if (onHarvest && !isHarvesting) {
      await onHarvest(plant.id)
    }
  }

  const getNextStageInfo = () => {
    if (plant.is_fully_grown) return null
    
    const nextStage = plant.stage + 1
    const nextStageName = PLANT_STAGE_NAMES[nextStage as keyof typeof PLANT_STAGE_NAMES]
    
    return {
      stage: nextStage,
      name: nextStageName,
      emoji: getStageEmoji(nextStage)
    }
  }

  const nextStageInfo = getNextStageInfo()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 rounded-sm max-w-md w-full max-h-[90vh] overflow-y-auto shadow-card"
          >
            {/* Header */}
            <div
              className="relative p-6 text-white rounded-t-lg"
              style={{
                backgroundColor: categoryColors.primary
              }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-4">
                <div className="text-6xl">
                  {plant.is_fully_grown ? getPlantEmoji(plant.category) : getStageEmoji(plant.stage)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{plant.name}</h2>
                  <p className="text-white/80">
                    {PLANT_STAGE_NAMES[plant.stage as keyof typeof PLANT_STAGE_NAMES]}
                  </p>
                  {plantType && (
                    <div className="flex items-center space-x-2 mt-1">
                      <span 
                        className="px-2 py-1 rounded-sm text-xs font-medium"
                        style={{ 
                          backgroundColor: rarityColors.light,
                          color: rarityColors.primary 
                        }}
                      >
                        {plantType.rarity.toUpperCase()}
                      </span>
                      <span className="text-white/60 text-sm">{plantType.category}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Plant Stats */}
              <div className="grid grid-cols-2 gap-4">
                {/* Health */}
                <div className="bg-gray-800/50 rounded-sm p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="w-5 h-5 text-red-400" />
                    <span className="font-medium">คุณภาพ</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${plant.health > 70 ? 'bg-mint-500' : plant.health > 40 ? 'bg-warning' : 'bg-error'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${plant.health}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    <span className="text-sm font-bold">{plant.health}%</span>
                  </div>
                </div>

                {/* Growth Progress */}
                <div className="bg-gray-800/50 rounded-sm p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">ความคืบหน้า</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-mint-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${plant.growth_progress}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    <span className="text-sm font-bold">
                      {plant.is_fully_grown ? '100%' : `${plant.growth_progress}%`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Stage Preview */}
              {nextStageInfo && (
                <div className="bg-gray-800 rounded-sm p-4 border border-gray-600">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{nextStageInfo.emoji}</div>
                    <div>
                      <h3 className="font-semibold text-ink-dark">ชั้นต่อไป</h3>
                      <p className="text-gray-400">{nextStageInfo.name}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Plant Timeline */}
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>เวลาการพัฒนา</span>
                </h3>
                <div className="bg-gray-800/50 rounded-sm p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">เริ่มโปรเจกต์เมื่อ:</span>
                    <span className="font-medium">{formatThaiDateTime(plant.planted_at)}</span>
                  </div>
                  {plant.next_water_at && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">พัฒนาต่อครั้งต่อไป:</span>
                      <span className="font-medium text-gray-400">
                        {formatThaiDateTime(plant.next_water_at)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Plant Type Info */}
              {plantType && (
                <div className="space-y-2">
                  <button
                    onClick={() => setShowCareDetails(!showCareDetails)}
                    className="w-full flex items-center justify-between p-3 bg-gray-800/50 rounded-sm hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <TreePine className="w-5 h-5" />
                      <span className="font-medium">ข้อมูลโปรเจกต์</span>
                    </div>
                    <motion.div
                      animate={{ rotate: showCareDetails ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {showCareDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-gray-800/50 rounded-sm p-4 space-y-3">
                          <p className="text-sm text-gray-400">{plantType.description}</p>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-gray-400">รางวัล XP:</span>
                              <span className="font-medium ml-2">{plantType.base_xp_reward}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">เครดิต AI:</span>
                              <span className="font-medium ml-2">{plantType.star_seeds_reward}</span>
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-400">วิธีการพัฒนา:</span>
                            <p className="mt-1">{plantType.care_requirements}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {plant.needs_watering && onWater && (
                  <motion.button
                    onClick={handleWater}
                    disabled={isWatering}
                    className="flex-1 bg-mint-500 hover:opacity-90 disabled:opacity-40 text-white py-3 px-4 rounded-sm font-medium flex items-center justify-center space-x-2 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    {isWatering ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <Droplets className="w-5 h-5" />
                    )}
                    <span>{isWatering ? 'กำลังพัฒนาต่อ...' : 'พัฒนาต่อ'}</span>
                  </motion.button>
                )}

                {plant.can_harvest && onHarvest && (
                  <motion.button
                    onClick={handleHarvest}
                    disabled={isHarvesting}
                    className="flex-1 bg-gray-700 hover:opacity-90 disabled:opacity-40 text-gray-400 py-3 px-4 rounded-sm font-medium flex items-center justify-center space-x-2 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    {isHarvesting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <Scissors className="w-5 h-5" />
                    )}
                    <span>{isHarvesting ? 'กำลังเปิดตัว...' : 'เปิดตัวโปรเจกต์'}</span>
                  </motion.button>
                )}

                {!plant.needs_watering && !plant.can_harvest && (
                  <div className="flex-1 bg-gray-800 text-gray-500 py-3 px-4 rounded-sm font-medium text-center">
                    โปรเจกต์เป็นไปตามแผน
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PlantCareModal