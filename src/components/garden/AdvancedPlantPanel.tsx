'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Star, 
  Clock, 
  Zap, 
  Heart, 
  Users, 
  BookOpen,
  Crown,
  ArrowUp,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Lock,
  Timer
} from 'lucide-react'
import { 
  advancedPlantAPI, 
  PlantAbility,
  PlantAdvancedInfo,
  getAbilityTypeEmoji,
  getAbilityColor,
  formatDuration,
  formatCooldown,
  canActivateAbility,
  getAbilityCooldownRemaining,
  getEvolutionRarity,
  getEvolutionRarityColor
} from '@/lib/garden/advancedPlantApi'
import { useNotification } from '@/contexts/NotificationContext'

interface AdvancedPlantPanelProps {
  plantId: string
  plantName: string
  plantStage: number
  onAbilityUsed?: () => void
  onEvolutionComplete?: () => void
}

const AdvancedPlantPanel: React.FC<AdvancedPlantPanelProps> = ({
  plantId,
  plantName,
  plantStage,
  onAbilityUsed,
  onEvolutionComplete
}) => {
  const [plantInfo, setPlantInfo] = useState<PlantAdvancedInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isActivating, setIsActivating] = useState<string | null>(null)
  const [isEvolving, setIsEvolving] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'abilities' | 'evolution' | 'breeding'>('abilities')

  const { addNotification } = useNotification()

  const tabs = [
    { id: 'abilities', name: 'ความสามารถ', emoji: '✨' },
    { id: 'evolution', name: 'วิวัฒนาการ', emoji: '🔮' },
    { id: 'breeding', name: 'ผสมพันธุ์', emoji: '🧬' }
  ]

  useEffect(() => {
    if (plantId) {
      loadPlantInfo()
    }
  }, [plantId])

  const loadPlantInfo = async () => {
    try {
      setIsLoading(true)
      const info = await advancedPlantAPI.getPlantAbilities(plantId)
      setPlantInfo(info)
    } catch (error: any) {
      console.error('Failed to load plant info:', error)
      addNotification({
        type: 'error',
        message: 'ไม่สามารถโหลดข้อมูลพืชได้: ' + error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleActivateAbility = async (ability: PlantAbility) => {
    try {
      setIsActivating(ability.type)
      const result = await advancedPlantAPI.activateAbility(plantId, ability.type)
      
      addNotification({
        type: 'success',
        title: `${getAbilityTypeEmoji(ability.type)} ${ability.name}`,
        message: result.message,
        duration: 5000
      })

      // Refresh plant info
      loadPlantInfo()
      onAbilityUsed?.()
      
    } catch (error: any) {
      console.error('Failed to activate ability:', error)
      addNotification({
        type: 'error',
        message: error.message || 'ไม่สามารถใช้ความสามารถได้'
      })
    } finally {
      setIsActivating(null)
    }
  }

  const handleEvolvePlant = async () => {
    try {
      setIsEvolving(true)
      const result = await advancedPlantAPI.evolvePlant(plantId)
      
      addNotification({
        type: 'success',
        title: '🔮 วิวัฒนาการสำเร็จ!',
        message: result.message,
        duration: 5000
      })

      loadPlantInfo()
      onEvolutionComplete?.()
      
    } catch (error: any) {
      console.error('Failed to evolve plant:', error)
      addNotification({
        type: 'error',
        message: error.message || 'ไม่สามารถวิวัฒนาการได้'
      })
    } finally {
      setIsEvolving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!plantInfo) {
    return (
      <div className="bg-white rounded-lg shadow-card p-6 text-center">
        <div className="text-6xl mb-4">🌱</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">ไม่พบข้อมูลพืช</h2>
        <p className="text-gray-500">กรุณาลองใหม่อีกครั้ง</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-brand-600 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <Sparkles className="h-6 w-6" />
            <span>ระบบพืชขั้นสูง</span>
          </h2>
          <button
            onClick={loadPlantInfo}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            title="รีเฟรช"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-2xl">🌿</div>
          <div>
            <h3 className="text-lg font-bold">{plantInfo.plant_name}</h3>
            <p className="text-brand-100">
              {plantInfo.plant_type} • Stage {plantInfo.current_stage}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center space-x-2 transition-colors ${
                selectedTab === tab.id
                  ? 'border-b-2 border-brand-600 text-brand-600 bg-brand-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {selectedTab === 'abilities' && (
            <motion.div
              key="abilities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold mb-4">ความสามารถพิเศษ</h3>
              
              {plantInfo.abilities.length === 0 ? (
                <div className="text-center py-8">
                  <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">ยังไม่มีความสามารถพิเศษ</h4>
                  <p className="text-gray-500">
                    พืชต้องเติบโตถึง Stage 2 ขึ้นไปจึงจะมีความสามารถพิเศษ
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {plantInfo.abilities.map((ability, index) => {
                    const cooldownRemaining = getAbilityCooldownRemaining(ability, undefined)
                    const canUse = canActivateAbility(ability, undefined)

                    return (
                      <motion.div
                        key={ability.type}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative overflow-hidden rounded-lg border-2 p-4 transition-all ${
                          canUse
                            ? 'border-brand-200 bg-brand-50 hover:border-brand-300'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-2xl">{ability.icon}</span>
                              <h4 className="font-bold text-gray-900">{ability.name}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                canUse
                                  ? 'bg-brand-100 text-brand-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {canUse ? 'พร้อมใช้' : `คูลดาวน์ ${cooldownRemaining}h`}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{ability.description}</p>
                            
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="bg-sand-100 text-text-ink-light px-2 py-1 rounded-full">
                                เพิ่ม {ability.boost_percentage}%
                              </span>
                              <span className="bg-sand-100 text-brand-700 px-2 py-1 rounded-full">
                                นาน {formatDuration(ability.duration_hours)}
                              </span>
                              <span className="bg-brand-100 text-brand-700 px-2 py-1 rounded-full">
                                คูลดาวน์ {formatCooldown(ability.cooldown_hours)}
                              </span>
                            </div>
                          </div>

                          <div className="ml-4">
                            <button
                              onClick={() => handleActivateAbility(ability)}
                              disabled={!canUse || isActivating === ability.type}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                                canUse
                                  ? 'bg-brand-600 hover:bg-brand-700 text-white'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              {isActivating === ability.type ? (
                                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                              ) : canUse ? (
                                <>
                                  <Zap className="h-4 w-4" />
                                  <span>ใช้</span>
                                </>
                              ) : (
                                <>
                                  <Timer className="h-4 w-4" />
                                  <span>รอ</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          )}

          {selectedTab === 'evolution' && (
            <motion.div
              key="evolution"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold mb-4">วิวัฒนาการ</h3>
              
              {!plantInfo.next_evolution.available ? (
                <div className="text-center py-8">
                  <ArrowUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">ยังไม่สามารถวิวัฒนาการได้</h4>
                  <p className="text-gray-500">{plantInfo.next_evolution.reason}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {plantInfo.next_evolution.evolutions?.map((evolution, index) => {
                    const rarity = getEvolutionRarity(evolution)
                    const rarityColor = getEvolutionRarityColor(rarity)

                    return (
                      <motion.div
                        key={evolution.type}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-gray-200 rounded-lg p-6 transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <Crown className="h-6 w-6 text-sand-300" />
                              <h4 className="text-xl font-bold">{evolution.name}</h4>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${rarityColor} text-white`}>
                                {rarity}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-4">{evolution.description}</p>
                            
                            <div className="bg-gray-50 rounded-lg p-4">
                              <h5 className="font-semibold text-gray-900 mb-2">ความต้องการ:</h5>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center space-x-2">
                                  <Star className="h-4 w-4 text-sand-300" />
                                  <span>Level {evolution.requirements.level}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Sparkles className="h-4 w-4 text-brand-600" />
                                  <span>{evolution.requirements.star_seeds} Seeds</span>
                                </div>
                                {evolution.requirements.days_mature && (
                                  <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-brand-600" />
                                    <span>โตเต็มที่ {evolution.requirements.days_mature} วัน</span>
                                  </div>
                                )}
                                {evolution.requirements.friend_help && (
                                  <div className="flex items-center space-x-2">
                                    <Users className="h-4 w-4 text-brand-600" />
                                    <span>ความช่วยเหลือ {evolution.requirements.friend_help} ครั้ง</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="ml-4">
                            <button
                              onClick={handleEvolvePlant}
                              disabled={isEvolving}
                              className="bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2"
                            >
                              {isEvolving ? (
                                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                              ) : (
                                <>
                                  <ArrowUp className="h-4 w-4" />
                                  <span>วิวัฒนาการ</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          )}

          {selectedTab === 'breeding' && (
            <motion.div
              key="breeding"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold mb-4">การผสมพันธุ์</h3>
              
              {!plantInfo.breeding_potential.can_breed ? (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">ยังไม่สามารถผสมพันธุ์ได้</h4>
                  <p className="text-gray-500">{plantInfo.breeding_potential.reason}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-sand-100 border border-brand-200 rounded-lg p-6">
                    <h4 className="font-bold text-brand-700 mb-3">ศักยภาพการผสมพันธุ์</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-brand-700 font-medium">คะแนนผสมพันธุ์:</span>
                        <span className="ml-2 font-bold">{plantInfo.breeding_potential.breeding_value}/100</span>
                      </div>
                      <div>
                        <span className="text-brand-700 font-medium">ลักษณะหายาก:</span>
                        <div className="ml-2">
                          {plantInfo.breeding_potential.rare_traits?.map((trait, index) => (
                            <span key={index} className="inline-block bg-brand-100 text-brand-700 px-2 py-1 rounded-full text-xs mr-1 mt-1">
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-gray-600 text-sm mb-3">
                      ระบบการผสมพันธุ์กำลังพัฒนา - จะเปิดให้ใช้งานในอนาคต
                    </p>
                    <button
                      disabled
                      className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
                    >
                      เร็วๆ นี้
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AdvancedPlantPanel