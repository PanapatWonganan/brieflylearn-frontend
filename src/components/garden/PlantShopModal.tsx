'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Lock, Sparkles, Info } from 'lucide-react'
import { PlantType } from '@/lib/garden/types'

interface PlantShopModalProps {
  isOpen: boolean
  onClose: () => void
  plantTypes: PlantType[]
  userLevel: number
  starSeeds: number
  onPlantSeed: (plantTypeId: string, customName?: string) => Promise<void>
  canAffordPlant: (plantType: PlantType) => boolean
}

const PlantShopModal: React.FC<PlantShopModalProps> = ({
  isOpen,
  onClose,
  plantTypes,
  userLevel,
  starSeeds,
  onPlantSeed,
  canAffordPlant
}) => {
  const [selectedPlant, setSelectedPlant] = useState<PlantType | null>(null)
  const [customName, setCustomName] = useState('')
  const [isPlanting, setIsPlanting] = useState(false)

  const getCategoryEmoji = (category: string) => {
    const emojis: { [key: string]: string } = {
      fitness: '🎯',
      nutrition: '📝',
      mental: '🧠',
      learning: '📚'
    }
    return emojis[category] || '📚'
  }

  const getRarityColor = (rarity: string) => {
    const colors: { [key: string]: string } = {
      common: 'from-gray-400 to-gray-600',
      rare: 'from-blue-400 to-blue-600',
      epic: 'from-purple-400 to-purple-600',
      legendary: 'from-yellow-400 to-yellow-600'
    }
    return colors[rarity] || 'from-gray-400 to-gray-600'
  }

  const getRarityLabel = (rarity: string) => {
    const labels: { [key: string]: string } = {
      common: 'ทั่วไป',
      rare: 'หายาก',
      epic: 'หาได้ยาก',
      legendary: 'ตำนาน'
    }
    return labels[rarity] || rarity
  }

  const handlePlant = async () => {
    if (!selectedPlant) return
    
    setIsPlanting(true)
    try {
      await onPlantSeed(selectedPlant.id, customName || undefined)
      setSelectedPlant(null)
      setCustomName('')
      onClose()
    } catch (error) {
      console.error('Failed to plant seed:', error)
    }
    setIsPlanting(false)
  }

  const getPlantCost = (plantType: PlantType) => {
    // ราคาตามความหายาก
    const costs: { [key: string]: number } = {
      common: 50,
      rare: 100,
      epic: 200,
      legendary: 500
    }
    return costs[plantType.rarity] || 50
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-6 max-w-4xl max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                <span>ร้านหลักสูตร</span>
              </h2>
              <p className="text-gray-600 mt-1">เลือกวิชาที่คุณต้องการเรียน</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 px-4 py-2 rounded-xl flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <span className="font-bold text-yellow-900">{starSeeds}</span>
                <span className="text-sm text-yellow-700">Seeds</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Plant Selection */}
          {!selectedPlant ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {plantTypes.map((plant) => {
                const canAfford = canAffordPlant(plant)
                const isLocked = plant.unlock_level > userLevel
                const cost = getPlantCost(plant)

                return (
                  <motion.div
                    key={plant.id}
                    className={`relative rounded-xl p-4 border-2 transition-all ${
                      isLocked 
                        ? 'bg-gray-100 border-gray-300 opacity-60' 
                        : canAfford
                        ? 'bg-white border-gray-200 hover:border-blue-400 cursor-pointer'
                        : 'bg-gray-50 border-gray-200 opacity-75'
                    }`}
                    onClick={() => !isLocked && canAfford && setSelectedPlant(plant)}
                    whileHover={!isLocked && canAfford ? { scale: 1.02 } : {}}
                    whileTap={!isLocked && canAfford ? { scale: 0.98 } : {}}
                  >
                    {/* Rarity Badge */}
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getRarityColor(plant.rarity)}`}>
                      {getRarityLabel(plant.rarity)}
                    </div>

                    {/* Plant Icon */}
                    <div className="text-4xl mb-3 text-center">
                      {plant.icon_path}
                    </div>

                    {/* Plant Name */}
                    <h3 className="font-bold text-gray-900 mb-1">{plant.name}</h3>
                    
                    {/* Category */}
                    <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                      <span>{getCategoryEmoji(plant.category)}</span>
                      <span>{plant.category}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {plant.description}
                    </p>

                    {/* Rewards */}
                    <div className="flex items-center justify-between text-xs mb-3">
                      <div className="flex items-center space-x-1">
                        <span className="text-blue-600">⭐</span>
                        <span>{plant.base_xp_reward} XP</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-600">🌟</span>
                        <span>{plant.star_seeds_reward} Seeds</span>
                      </div>
                    </div>

                    {/* Price / Status */}
                    {isLocked ? (
                      <div className="bg-gray-200 text-gray-600 py-2 px-3 rounded-lg text-center text-sm font-medium flex items-center justify-center space-x-1">
                        <Lock className="h-4 w-4" />
                        <span>Level {plant.unlock_level}</span>
                      </div>
                    ) : (
                      <div className={`py-2 px-3 rounded-lg text-center text-sm font-medium ${
                        canAfford 
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {canAfford ? `เริ่มเรียน ${cost} Seeds` : `ต้องการ ${cost} Seeds`}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          ) : (
            /* Plant Details */
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="text-6xl">{selectedPlant.icon_path}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{selectedPlant.name}</h3>
                  <p className="text-gray-600 mt-1">{selectedPlant.description}</p>
                  
                  <div className="mt-3 flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getRarityColor(selectedPlant.rarity)}`}>
                      {getRarityLabel(selectedPlant.rarity)}
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <span>{getCategoryEmoji(selectedPlant.category)}</span>
                      <span>{selectedPlant.category}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Growth Stages */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
                  <Info className="h-4 w-4" />
                  <span>ระยะการพัฒนา</span>
                </h4>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: selectedPlant.growth_stages || 5 }).map((_, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl mb-1">
                        {['🌱', '🪴', '🌿', '🌳', '🎓'][index] || '📚'}
                      </div>
                      <p className="text-xs text-gray-600">ขั้นที่ {index + 1}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  ทบทวนเป็นประจำเพื่อพัฒนาทักษะ
                </p>
              </div>

              {/* Custom Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ตั้งชื่อวิชา (ไม่บังคับ)
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder={`เช่น "${selectedPlant.name}ของฉัน"`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={50}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setSelectedPlant(null)
                    setCustomName('')
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-xl font-medium transition-colors"
                >
                  กลับ
                </button>
                <button
                  onClick={handlePlant}
                  disabled={isPlanting || !canAffordPlant(selectedPlant)}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 ${
                    canAffordPlant(selectedPlant)
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isPlanting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>เริ่มเรียน ({getPlantCost(selectedPlant)} Seeds)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PlantShopModal