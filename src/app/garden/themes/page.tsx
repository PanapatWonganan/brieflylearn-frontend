'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Palette } from 'lucide-react'
import Link from 'next/link'
import ThemeGallery from '@/components/garden/ThemeGallery'

const GardenThemesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link 
              href="/garden"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>กลับสู่สวน</span>
            </Link>
            <div className="h-5 border-l border-gray-300" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
                <Palette className="h-8 w-8 text-purple-500" />
                <span>ปรับแต่งธีมสวน</span>
              </h1>
              <p className="text-gray-600 mt-1">เลือกธีมที่ใช่สำหรับสวนของคุณ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ThemeGallery />
        </motion.div>

        {/* Demo Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-orange-200 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <span>การทำงานของระบบธีม</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">🎨 ธีมที่มีให้เลือก</h4>
              <ul className="space-y-1 text-orange-700">
                <li>• <strong>สวนเมืองร้อน</strong> - ธีมฟรีเริ่มต้น</li>
                <li>• <strong>สวนเซน</strong> - ปลดล็อคที่เลเวล 5</li>
                <li>• <strong>สวนคอทเทจ</strong> - ปลดล็อคที่เลเวล 10</li>
                <li>• <strong>สวนโมเดิร์น</strong> - ปลดล็อคที่เลเวล 15</li>
                <li>• <strong>ฤดูใบไม้ผลิ</strong> - ธีมตามฤดูกาล</li>
                <li>• <strong>สวนทองคำ</strong> - ธีมพรีเมียม</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">✨ คุณสมบัติ</h4>
              <ul className="space-y-1 text-orange-700">
                <li>• เปลี่ยนสีพื้นหลังและสีเน้น</li>
                <li>• เอฟเฟกต์พิเศษตามธีม</li>
                <li>• รางวัล XP เมื่อเปลี่ยนธีม</li>
                <li>• ปลดล็อคตามระดับและ Star Seeds</li>
                <li>• ตัวอย่างธีมแบบเรียลไทม์</li>
                <li>• บันทึกการใช้งานในประวัติ</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>💡 เคล็ดลับ:</strong> คุณสามารถดูตัวอย่างธีมได้โดยกดปุ่ม "ดูตัวอย่าง" 
              ธีมจะถูกเปลี่ยนชั่วคราวเพื่อให้คุณเห็นการเปลี่ยนแปลง
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GardenThemesPage