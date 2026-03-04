'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageSkeleton } from '@/components/Skeleton'

// Simple Garden Page without complex API calls
const SimpleGardenPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [gardenLevel, setGardenLevel] = useState(1)
  const [aiCredits, setAiCredits] = useState(100)
  const [impactPoints, setImpactPoints] = useState(250)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <PageSkeleton cards={6} />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-serif text-ink flex items-center space-x-2">
                <span>💡</span>
                <span>แล็บ AI ของคุณ</span>
              </h1>
              <p className="text-ink-muted mt-1">สร้างและพัฒนาโปรเจกต์ AI ไปด้วยกัน</p>
            </div>

            <div className="flex space-x-4">
              <div className="border border-gray-100 rounded-lg px-4 py-2.5 flex items-center space-x-2">
                <span>🔷</span>
                <span className="font-bold text-ink">{aiCredits} AI Credits</span>
              </div>
              <div className="border border-gray-100 rounded-lg px-4 py-2.5 flex items-center space-x-2">
                <span>📈</span>
                <span className="font-bold text-ink">{impactPoints} Impact Points</span>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1 border border-gray-100 rounded-full flex items-center space-x-1">
                  <span>👑</span>
                  <span className="font-bold text-sm text-ink">Level {gardenLevel}</span>
                </div>
              </div>
              <span className="text-sm text-ink-muted">{impactPoints} / 1000 Impact Points</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-brand-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(impactPoints / 1000) * 100}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
              <h3 className="font-bold text-lg flex items-center space-x-2">
                <span>✨</span>
                <span>Quick Actions</span>
              </h3>

              <motion.button
                className="w-full bg-ink hover:bg-ink-light text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                <span>💧</span>
                <span>พัฒนาแล็บ</span>
              </motion.button>

              <motion.button
                className="w-full border border-gray-200 text-ink hover:border-gray-300 py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                <span>➕</span>
                <span>สร้างโปรเจกต์ใหม่</span>
              </motion.button>

              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <h4 className="font-semibold text-sm text-ink-light">สรุปแล็บ</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-muted">โปรเจกต์ทั้งหมด:</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">กำลังพัฒนา:</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">ขยายผลแล้ว:</span>
                    <span className="font-medium">1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Goals */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 mt-6">
              <h3 className="font-bold text-lg flex items-center space-x-2 mb-4">
                <span>🎯</span>
                <span>เป้าหมายวันนี้</span>
              </h3>

              <div className="space-y-3">
                {[
                  { name: 'พัฒนาโปรเจกต์ 3 อัน', progress: 66, completed: false },
                  { name: 'ทำ AI Challenge 1 ครั้ง', progress: 100, completed: true },
                  { name: 'เข้าระบบ 1 ครั้ง', progress: 100, completed: true }
                ].map((goal, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 ${
                      goal.completed
                        ? 'bg-brand-50 border-brand-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{goal.name}</span>
                      {goal.completed && <span className="text-brand-600">🏆</span>}
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${goal.completed ? 'bg-brand-600' : 'bg-ink'} transition-all duration-300`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Lab Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">แล็บของคุณ</h2>
                <span className="text-sm text-ink-muted">อัปเดตล่าสุด: เมื่อสักครู่</span>
              </div>

              {/* Sample Projects Grid */}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

                {/* Sample Projects */}
                {[
                  { emoji: '🚀', name: 'Chatbot', stage: 'ขยายผล', health: 95, needsIteration: false },
                  { emoji: '💡', name: 'Image AI', stage: 'พร้อมใช้', health: 100, needsIteration: false },
                  { emoji: '🔧', name: 'Data Model', stage: 'ทดสอบ', health: 70, needsIteration: true }
                ].map((project, index) => (
                  <motion.div
                    key={index}
                    className={`w-32 h-32 relative rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      project.needsIteration ? 'border-error/20 bg-error-light' : 'border-brand-200 bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-2 rounded-xl bg-white/50 flex items-center justify-center">
                      <div className="text-4xl">{project.emoji}</div>
                    </div>

                    {/* Health Bar */}
                    <div className="absolute top-1 left-1 right-1">
                      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${project.health > 70 ? 'bg-brand-600' : 'bg-warning'}`}
                          style={{ width: `${project.health}%` }}
                        />
                      </div>
                    </div>

                    {/* Iteration Alert */}
                    {project.needsIteration && (
                      <div className="absolute top-2 right-2 text-error">
                        ⚠️
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Empty Slots */}
                {[1, 2, 3].map((slot) => (
                  <motion.div
                    key={`empty-${slot}`}
                    className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-ink-faint text-center">
                      <div className="text-2xl mb-1">💡</div>
                      <div className="text-xs">เริ่มโปรเจกต์</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activities */}
              <div className="mt-8">
                <h3 className="font-bold text-lg mb-4">กิจกรรมล่าสุด</h3>
                <div className="space-y-2">
                  {[
                    { icon: '💧', text: 'พัฒนา Chatbot ต่อ', time: '5 นาทีที่แล้ว', points: 5 },
                    { icon: '💡', text: 'สร้าง Data Model ใหม่', time: '1 ชั่วโมงที่แล้ว', points: 10 },
                    { icon: '🚀', text: 'เปิดตัว Image AI', time: '2 ชั่วโมงที่แล้ว', points: 20 }
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.text}</p>
                        <p className="text-xs text-ink-muted">{activity.time}</p>
                      </div>
                      <div className="text-xs text-brand-600 font-medium">
                        +{activity.points} Impact Points
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleGardenPage
