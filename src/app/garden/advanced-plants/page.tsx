'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AdvancedPlantPanel from '@/components/garden/AdvancedPlantPanel'
import { Sparkles, ArrowLeft, Crown, Zap } from 'lucide-react'
import Link from 'next/link'

const AdvancedPlantsPage = () => {
  // Demo plant data - in real app this would come from user's garden
  const [selectedPlant, setSelectedPlant] = useState({
    id: '12345',
    name: 'ดอกบัวทอง',
    stage: 3
  })

  const demoPlants = [
    { id: '12345', name: 'ดอกบัวทอง', type: 'บัว', stage: 3, abilities: 2 },
    { id: '12346', name: 'กุหลาบรุ้ง', type: 'กุหลาบ', stage: 2, abilities: 1 },
    { id: '12347', name: 'มะลิกาญจน์', type: 'มะลิ', stage: 4, abilities: 3 },
    { id: '12348', name: 'ออร์คิดม่วง', type: 'กล้วยไม้', stage: 1, abilities: 0 }
  ]

  const getStageColor = (stage: number) => {
    if (stage >= 4) return 'bg-mint-700'
    if (stage >= 3) return 'bg-mint-600'
    if (stage >= 2) return 'bg-mint-500'
    return 'bg-gray-600'
  }

  const getStageEmoji = (stage: number) => {
    if (stage >= 4) return '👑'
    if (stage >= 3) return '⭐'
    if (stage >= 2) return '🌟'
    return '🌱'
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-5 sm:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/garden"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-gray-200 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>กลับสู่แล็บ</span>
          </Link>

          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-gray-800/50 rounded-sm">
              <Sparkles className="h-8 w-8 text-gray-200" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-200">ระบบโปรเจกต์ขั้นสูง</h1>
              <p className="text-gray-500">จัดการความสามารถพิเศษและวิวัฒนาการของโปรเจกต์</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plant Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-sm border border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-200 mb-4 flex items-center space-x-2">
                <Crown className="h-6 w-6 text-yellow-500" />
                <span>โปรเจกต์ในแล็บของคุณ</span>
              </h2>

              <div className="space-y-3">
                {demoPlants.map((plant) => (
                  <motion.button
                    key={plant.id}
                    onClick={() => setSelectedPlant(plant)}
                    className={`w-full text-left p-4 rounded-sm border-2 transition-all ${
                      selectedPlant.id === plant.id
                        ? 'border-emerald-500 bg-gray-800/50'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-200">{plant.name}</h3>
                      <span className="text-xl">{getStageEmoji(plant.stage)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{plant.type} • Stage {plant.stage}</span>
                      <div className="flex items-center space-x-1">
                        <Zap className="h-3 w-3 text-yellow-500" />
                        <span className="text-yellow-400 font-medium">{plant.abilities}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className={`h-1 rounded-full ${getStageColor(plant.stage)}`} />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 p-4 bg-gray-800/50 rounded-sm">
                <h3 className="font-semibold text-gray-200 mb-3">สถิติรวม</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-mint-400">
                      {demoPlants.reduce((sum, plant) => sum + plant.abilities, 0)}
                    </div>
                    <div className="text-gray-500">ความสามารถ</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-mint-500">
                      {demoPlants.filter(plant => plant.stage >= 3).length}
                    </div>
                    <div className="text-gray-500">โปรเจกต์ขั้นสูง</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Plant Panel */}
          <div className="lg:col-span-2">
            <AdvancedPlantPanel
              plantId={selectedPlant.id}
              plantName={selectedPlant.name}
              plantStage={selectedPlant.stage}
              onAbilityUsed={() => {
              }}
              onEvolutionComplete={() => {
                // In real app, this would refresh the plant list
              }}
            />
          </div>
        </div>

        {/* Feature Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900 rounded-sm border border-gray-700 p-6 text-center"
          >
            <div className="w-12 h-12 bg-gray-800/50 rounded-sm flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-gray-200" />
            </div>
            <h3 className="text-lg font-bold text-gray-200 mb-2">ความสามารถพิเศษ</h3>
            <p className="text-gray-500 text-sm">
              ใช้พลังพิเศษของพืชเพื่อเพิ่ม Impact Points, AI Credits และเอฟเฟกต์ต่างๆ
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900 rounded-sm border border-gray-700 p-6 text-center"
          >
            <div className="w-12 h-12 bg-gray-800/50 rounded-sm flex items-center justify-center mx-auto mb-4">
              <Crown className="h-6 w-6 text-gray-200" />
            </div>
            <h3 className="text-lg font-bold text-gray-200 mb-2">วิวัฒนาการ</h3>
            <p className="text-gray-500 text-sm">
              พัฒนาพืชให้เป็นรูปแบบที่หายากและมีความสามารถที่แกร่งขึ้น
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900 rounded-sm border border-gray-700 p-6 text-center"
          >
            <div className="w-12 h-12 bg-gray-800/50 rounded-sm flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🧬</span>
            </div>
            <h3 className="text-lg font-bold text-gray-200 mb-2">การผสมผสาน</h3>
            <p className="text-gray-500 text-sm">
              ผสมพันธุ์โปรเจกต์เพื่อสร้างโซลูชันใหม่ที่มีลักษณะพิเศษ (เร็วๆ นี้)
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedPlantsPage