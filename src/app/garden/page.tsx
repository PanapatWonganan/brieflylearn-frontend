'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Crown,
  Gift,
  Target,
  Users,
  Settings,
  Plus,
  Droplets,
  Star,
  TrendingUp,
  Calendar,
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react'

import { useAuth } from '@/contexts/AuthContextNew'
import { useGarden } from '@/contexts/GardenContext'
import { useNotification } from '@/contexts/NotificationContext'
import XPProgressBar, { XPGainAnimation, LevelUpAnimation } from '@/components/garden/XPProgressBar'
import PlantComponent, { PlantGrid } from '@/components/garden/PlantComponent'
import PlantCareModal from '@/components/garden/PlantCareModal'
import PlantShopModal from '@/components/garden/PlantShopModal'
import LearningProgressWidget from '@/components/garden/LearningProgressWidget'
import { UserPlant, PlantType } from '@/lib/garden/types'
import { formatXP, formatThaiDateTime } from '@/lib/garden/api'
import { GardenSkeleton } from '@/components/Skeleton'

const GardenDashboard = () => {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()

  const {
    gardenData,
    plantTypes,
    todayChallenges,
    isLoading,
    isWatering,
    isHarvesting,
    plantSeed,
    waterPlant,
    harvestPlant,
    waterGarden,
    updateChallengeProgress,
    getPlantTypeById,
    canAffordPlant
  } = useGarden()

  const { addNotification } = useNotification()

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      const timer = setTimeout(() => {
        router.push('/auth')
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [authLoading, isAuthenticated, router])

  const [selectedPlant, setSelectedPlant] = useState<UserPlant | null>(null)
  const [selectedPlantType, setSelectedPlantType] = useState<PlantType | null>(null)
  const [showPlantShop, setShowPlantShop] = useState(false)
  const [showXPGain, setShowXPGain] = useState<number | null>(null)
  const [showLevelUp, setShowLevelUp] = useState<number | null>(null)

  const handleWaterPlant = async (plantId: string) => {
    try {
      const result = await waterPlant(plantId)
      addNotification({
        type: 'success',
        message: `พัฒนาต่อสำเร็จ! ได้รับ ${result.rewards.xp} Impact Points และ ${result.rewards.star_seeds} AI Credits`
      })
      if (result.grew_up) {
        addNotification({
          type: 'info',
          message: 'โปรเจกต์ของคุณพัฒนาขึ้นแล้ว!'
        })
      }
      setShowXPGain(result.rewards.xp)
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error?.message || 'ไม่สามารถพัฒนาต่อได้ กรุณาลองใหม่อีกครั้ง'
      })
    }
  }

  const handleHarvestPlant = async (plantId: string) => {
    try {
      const result = await harvestPlant(plantId)
      addNotification({
        type: 'success',
        message: result.rewards.message
      })
      setShowXPGain(result.rewards.xp)
      setSelectedPlant(null)
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error?.message || 'ไม่สามารถเปิดตัวโปรเจกต์ได้ กรุณาลองใหม่อีกครั้ง'
      })
    }
  }

  const handleWaterGarden = async () => {
    try {
      const result = await waterGarden()
      addNotification({
        type: 'success',
        message: `พัฒนาทั้งหมดสำเร็จ! พัฒนา ${result.plants_watered} โปรเจกต์ ได้รับ ${result.rewards.xp} Impact Points`
      })
      setShowXPGain(result.rewards.xp)
    } catch (error: any) {
      const msg = error?.message || ''
      const nextWaterAt = error?.data?.next_water_at
      const isWateringCooldown = msg.includes('does not need watering')

      if (isWateringCooldown) {
        const timeStr = nextWaterAt ? ` (พร้อมพัฒนาอีกครั้ง: ${new Date(nextWaterAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })})` : ''
        addNotification({
          type: 'warning',
          message: `โปรเจกต์ยังไม่พร้อมพัฒนาต่อ${timeStr}`
        })
      } else {
        addNotification({
          type: 'error',
          message: msg || 'ไม่สามารถพัฒนาทั้งหมดได้ กรุณาลองใหม่อีกครั้ง'
        })
      }
    }
  }

  const handlePlantSeed = async (plantTypeId: string, customName?: string) => {
    try {
      const result = await plantSeed(plantTypeId, { custom_name: customName })
      addNotification({
        type: 'success',
        message: `เริ่มโปรเจกต์${result.plant.name}สำเร็จ! ได้รับ 10 Impact Points`
      })
      setShowPlantShop(false)
      setShowXPGain(10)
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error?.message || 'ไม่สามารถเริ่มโปรเจกต์ได้ กรุณาตรวจสอบ AI Credits'
      })
    }
  }

  const handlePlantClick = (plant: UserPlant) => {
    setSelectedPlant(plant)
    setSelectedPlantType(getPlantTypeById(plant.type) || null)
  }

  const handleUpdateChallenge = async (challengeId: string) => {
    try {
      const result = await updateChallengeProgress(challengeId)
      if (result.challenge.is_completed) {
        addNotification({
          type: 'success',
          message: result.rewards?.message || 'ทำภารกิจสำเร็จ!'
        })
        if (result.rewards?.xp) {
          setShowXPGain(result.rewards.xp)
        }
      }
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'ไม่สามารถอัปเดตภารกิจได้'
      })
    }
  }

  // Loading / Auth states
  if (authLoading || !isAuthenticated) {
    return <GardenSkeleton />
  }

  if (isLoading) {
    return <GardenSkeleton />
  }

  if (!gardenData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-ink mb-2">ไม่พบข้อมูลห้องปฏิบัติการ AI</h2>
          <p className="text-sm text-ink-muted">กรุณาลองใหม่อีกครั้ง</p>
        </div>
      </div>
    )
  }

  const { garden, plants, recent_activities, stats } = gardenData
  const plantsNeedingWater = plants.filter(plant => plant.needs_watering)
  const plantsReadyToHarvest = plants.filter(plant => plant.can_harvest)
  const completedChallenges = todayChallenges.filter(c => c.is_completed).length

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-xs tracking-widest uppercase text-ink-muted mb-2">ห้องปฏิบัติการ AI</p>
              <h1 className="text-heading text-ink">
                แล็บของคุณ
              </h1>
              <p className="text-sm text-ink-light mt-1">พัฒนาทักษะ AI และธุรกิจไปด้วยกัน</p>
            </div>

            {/* Garden Stats */}
            <div className="flex flex-wrap gap-3">
              <div className="border border-gray-100 rounded-lg px-4 py-2.5 flex items-center gap-2">
                <span className="text-ink">🔷</span>
                <span className="text-sm font-semibold text-ink">{garden.star_seeds} AI Credits</span>
              </div>
              <div className="border border-gray-100 rounded-lg px-4 py-2.5 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-ink" />
                <span className="text-sm font-semibold text-ink">{formatXP(garden?.xp ?? 0)} Impact Points</span>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-6">
            <XPProgressBar
              level={garden.level}
              currentXP={garden.xp}
              xpForNextLevel={garden.xp_for_next_level}
              canLevelUp={garden.can_level_up}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border border-gray-100/60 shadow-card rounded-xl p-6 space-y-3">
              <h3 className="text-sm font-semibold text-ink flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Quick Actions</span>
              </h3>

              {/* Water Garden */}
              <button
                onClick={handleWaterGarden}
                disabled={isWatering || !garden.needs_watering}
                className="w-full bg-ink hover:bg-ink-light disabled:opacity-40 text-white py-2.5 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Droplets className="w-4 h-4" />
                <span>
                  {isWatering
                    ? 'กำลังพัฒนา...'
                    : !garden.needs_watering
                      ? 'รอคูลดาวน์...'
                      : plantsNeedingWater.length > 0
                        ? `พัฒนาทั้งหมด (${plantsNeedingWater.length})`
                        : 'พัฒนาทั้งหมด'
                  }
                </span>
              </button>

              {/* Plant New Seed */}
              <button
                onClick={() => setShowPlantShop(true)}
                className="w-full border border-gray-200 hover:border-gray-400 text-ink py-2.5 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>เริ่มโปรเจกต์ใหม่</span>
              </button>

              {/* Navigation links */}
              <div className="pt-3 border-t border-gray-100 space-y-1">
                {[
                  { href: '/garden/demo-lesson', icon: BookOpen, label: 'ทดสอบ Demo' },
                  { href: '/garden/friends', icon: Users, label: 'เครือข่าย AI' },
                  { href: '/garden/themes', icon: Settings, label: 'ปรับแต่งธีมแล็บ' },
                  { href: '/garden/community', icon: Users, label: 'ชุมชน AI' },
                  { href: '/garden/advanced-plants', icon: Sparkles, label: 'โปรเจกต์ขั้นสูง' },
                  { href: '/garden/seasonal', icon: Calendar, label: 'AI Events' },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-light hover:bg-gray-50 hover:text-ink transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100" />
                  </a>
                ))}
              </div>

              {/* Project Summary */}
              <div className="pt-3 border-t border-gray-100">
                <h4 className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">สรุปโปรเจกต์</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-muted">โปรเจกต์ทั้งหมด:</span>
                    <span className="font-medium text-ink">{stats.total_plants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">กำลังพัฒนา:</span>
                    <span className="font-medium text-ink">{stats.growing_plants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">เปิดตัวแล้ว:</span>
                    <span className="font-medium text-ink">{stats.mature_plants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">ต้องพัฒนาต่อ:</span>
                    <span className="font-medium text-ink">{stats.plants_need_water}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Challenges */}
            <div className="border border-gray-100/60 shadow-card rounded-xl p-6">
              <h3 className="text-sm font-semibold text-ink flex items-center gap-2 mb-4">
                <Target className="w-4 h-4" />
                <span>AI Challenge วันนี้</span>
              </h3>

              <div className="space-y-3">
                {todayChallenges.slice(0, 3).map((challenge) => (
                  <div
                    key={challenge.id}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                      challenge.is_completed
                        ? 'bg-gray-50 border-gray-200'
                        : 'border-gray-100 hover:border-gray-300'
                    }`}
                    onClick={() => !challenge.is_completed && handleUpdateChallenge(challenge.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-ink">{challenge.name}</h4>
                        <p className="text-xs text-ink-muted mt-1">{challenge.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-brand-500 transition-all duration-300"
                              style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-ink-muted">
                            {challenge.progress}/{challenge.target}
                          </span>
                        </div>
                      </div>
                      {challenge.is_completed && (
                        <div className="ml-2 text-brand-500">
                          <Award className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="text-center text-xs text-ink-muted mt-3">
                  สำเร็จแล้ว {completedChallenges}/{todayChallenges.length} ภารกิจ
                </div>
              </div>
            </div>

            {/* Learning Progress Widget */}
            <LearningProgressWidget />
          </div>

          {/* Main Garden Area */}
          <div className="lg:col-span-3">
            <div className="border border-gray-100/60 shadow-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-ink">โปรเจกต์ของคุณ</h2>
                <div className="flex items-center gap-2 text-xs text-ink-muted">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>อัปเดตล่าสุด: {formatThaiDateTime(new Date().toISOString())}</span>
                </div>
              </div>

              {/* Plant Grid */}
              <PlantGrid
                plants={plants}
                onWater={handleWaterPlant}
                onHarvest={handleHarvestPlant}
                onPlantClick={handlePlantClick}
                isWatering={isWatering}
                isHarvesting={isHarvesting}
                emptySlots={Math.max(0, 6 - plants.length)}
                onEmptySlotClick={() => setShowPlantShop(true)}
              />

              {/* Recent Activities */}
              {recent_activities.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-ink mb-4">กิจกรรมล่าสุด</h3>
                  <div className="space-y-2">
                    {recent_activities.slice(0, 5).map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="text-lg">{activity.icon}</div>
                        <div className="flex-1">
                          <p className="text-sm text-ink">{activity.description}</p>
                          <p className="text-xs text-ink-muted">{activity.time_ago}</p>
                        </div>
                        {activity.xp_earned > 0 && (
                          <div className="text-xs text-brand-600 font-medium">
                            +{activity.xp_earned} XP
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PlantCareModal
        plant={selectedPlant}
        plantType={selectedPlantType}
        isOpen={!!selectedPlant}
        onClose={() => setSelectedPlant(null)}
        onWater={handleWaterPlant}
        onHarvest={handleHarvestPlant}
        isWatering={isWatering}
        isHarvesting={isHarvesting}
      />

      <PlantShopModal
        isOpen={showPlantShop}
        onClose={() => setShowPlantShop(false)}
        plantTypes={plantTypes}
        userLevel={gardenData?.garden.level || 1}
        starSeeds={gardenData?.garden.star_seeds || 0}
        onPlantSeed={handlePlantSeed}
        canAffordPlant={canAffordPlant}
      />

      <AnimatePresence>
        {showXPGain && (
          <XPGainAnimation
            xpGained={showXPGain}
            onComplete={() => setShowXPGain(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLevelUp && (
          <LevelUpAnimation
            newLevel={showLevelUp}
            onComplete={() => setShowLevelUp(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default GardenDashboard
