'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SeasonalEventsPanel from '@/components/garden/SeasonalEventsPanel'
import { Calendar, ArrowLeft, Sparkles, CloudRain, Sun } from 'lucide-react'
import Link from 'next/link'

const SeasonalEventsPage = () => {
  const currentSeason = (() => {
    const month = new Date().getMonth() + 1
    if (month >= 3 && month <= 5) return { name: 'ฤดูร้อน', emoji: '🌞', color: 'bg-brand-500' }
    if (month >= 6 && month <= 10) return { name: 'ฤดูฝน', emoji: '🌧️', color: 'bg-brand-500' }
    return { name: 'ฤดูหนาว', emoji: '❄️', color: 'bg-sand-400' }
  })()

  const upcomingFestivals = [
    { name: 'วันลอยกระทง', date: '2024-11-15', emoji: '🏮', daysLeft: 45 },
    { name: 'วันปีใหม่', date: '2025-01-01', emoji: '🎊', daysLeft: 92 },
    { name: 'วันตรุษจีน', date: '2025-01-29', emoji: '🐍', daysLeft: 120 },
    { name: 'วันสงกรานต์', date: '2025-04-13', emoji: '💦', daysLeft: 194 }
  ]

  const currentWeather = {
    type: 'cloudy',
    temp: 28,
    description: 'อากาศเมฆเยอะ เหมาะกับการสร้างโปรเจกต์',
    effect: 'เพิ่มอัตราการขยายผล 20%'
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-5 sm:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/garden" 
            className="inline-flex items-center space-x-2 text-ink-light hover:text-ink mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>กลับสู่แล็บ</span>
          </Link>
          
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gray-50 rounded-xl">
              <Calendar className="h-8 w-8 text-ink" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-serif text-ink">AI Events</h1>
              <p className="text-ink-muted">เทศกาล สภาพอากาศ และเหตุการณ์พิเศษ</p>
            </div>
          </div>

          {/* Season and Weather Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${currentSeason.color} rounded-lg p-6 text-white`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl">{currentSeason.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold">{currentSeason.name}</h3>
                  <p className="text-white/80">ฤดูกาลปัจจุบัน</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-brand-500 rounded-lg p-6 text-white"
            >
              <div className="flex items-center space-x-3 mb-2">
                <CloudRain className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">{currentWeather.temp}°C</h3>
                  <p className="text-white/80">สภาพอากาศ</p>
                </div>
              </div>
              <p className="text-sm text-white/90">{currentWeather.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-brand-600 rounded-lg p-6 text-white"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Sparkles className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">+20%</h3>
                  <p className="text-white/80">การขยายผล</p>
                </div>
              </div>
              <p className="text-sm text-white/90">{currentWeather.effect}</p>
            </motion.div>
          </div>

          {/* Upcoming Festivals */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold font-serif text-ink mb-4">เทศกาลที่จะมาถึง</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {upcomingFestivals.map((festival, index) => (
                <motion.div
                  key={festival.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200"
                >
                  <div className="text-2xl mb-2">{festival.emoji}</div>
                  <h3 className="font-semibold text-ink mb-1">{festival.name}</h3>
                  <p className="text-sm text-ink-muted mb-2">
                    {new Date(festival.date).toLocaleDateString('th-TH', {
                      day: 'numeric',
                      month: 'long'
                    })}
                  </p>
                  <span className="inline-block bg-sand-100 text-brand-700 px-2 py-1 rounded-full text-xs font-medium">
                    อีก {festival.daysLeft} วัน
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Seasonal Events Panel */}
        <SeasonalEventsPanel />

        {/* Feature Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-100 p-6 text-center"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🏮</span>
            </div>
            <h3 className="text-lg font-bold text-ink mb-2">เทศกาลไทย</h3>
            <p className="text-ink-muted text-sm">
              เข้าร่วมเทศกาลประจำปีของไทย รับรางวัลพิเศษและพืชหายาก
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-100 p-6 text-center"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CloudRain className="h-6 w-6 text-ink" />
            </div>
            <h3 className="text-lg font-bold text-ink mb-2">ระบบสภาพอากาศ</h3>
            <p className="text-ink-muted text-sm">
              สภาพอากาศมีผลต่อการขยายผลของพืชและให้โบนัสพิเศษ
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-100 p-6 text-center"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🌸</span>
            </div>
            <h3 className="text-lg font-bold text-ink mb-2">โปรเจกต์พิเศษ</h3>
            <p className="text-ink-muted text-sm">
              สร้างโปรเจกต์พิเศษที่มีเฉพาะในช่วงเทศกาลหรือฤดูกาลต่างๆ
            </p>
          </motion.div>
        </div>

        {/* Weather Tips */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-ink mb-3 flex items-center space-x-2">
            <Sun className="h-5 w-5" />
            <span>เคล็ดลับพัฒนาโปรเจกต์ตามเงื่อนไข</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-ink mb-2">🌞 ฤดูร้อน</h4>
              <p className="text-ink-light">รดน้ำบ่อยขึ้น เลือกสร้างโปรเจกต์ทนแล้ง ใช้ร่มเงาป้องกันแสงแดดจัด</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-ink mb-2">🌧️ ฤดูฝน</h4>
              <p className="text-ink-light">ระวังน้ำท่วม สร้างโปรเจกต์ที่ชอบความชื้น ระบายน้ำให้ดี</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeasonalEventsPage