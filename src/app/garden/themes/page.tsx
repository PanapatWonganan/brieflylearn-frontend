'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Palette } from 'lucide-react'
import Link from 'next/link'
import ThemeGallery from '@/components/garden/ThemeGallery'

const GardenThemesPage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link 
              href="/garden"
              className="flex items-center space-x-2 text-ink-light hover:text-ink transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>กลับสู่แล็บ</span>
            </Link>
            <div className="h-5 border-l border-gray-300" />
            <div>
              <h1 className="text-3xl font-bold font-serif text-ink flex items-center space-x-2">
                <Palette className="h-8 w-8 text-purple-500" />
                <span>ปรับแต่งธีมแล็บ</span>
              </h1>
              <p className="text-ink-muted mt-1">เลือกธีมที่ใช่สำหรับแล็บของคุณ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
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
          className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-ink mb-3 flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <span>การทำงานของระบบธีม</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-ink mb-2">🎨 ธีมที่มีให้เลือก</h4>
              <ul className="space-y-1 text-ink-light">
                <li>• <strong>แล็บโมเดิร์น</strong> - ธีมฟรีเริ่มต้น</li>
                <li>• <strong>แล็บมินิมัล</strong> - ปลดล็อคที่เลเวล 5</li>
                <li>• <strong>แล็บคลาสสิก</strong> - ปลดล็อคที่เลเวล 10</li>
                <li>• <strong>แล็บฟิวเจอร์</strong> - ปลดล็อคที่เลเวล 15</li>
                <li>• <strong>ฤดูใบไม้ผลิ</strong> - ธีมตามฤดูกาล</li>
                <li>• <strong>แล็บพรีเมียม</strong> - ธีมพรีเมียม</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-ink mb-2">✨ คุณสมบัติ</h4>
              <ul className="space-y-1 text-ink-light">
                <li>• เปลี่ยนสีพื้นหลังและสีเน้น</li>
                <li>• เอฟเฟกต์พิเศษตามธีม</li>
                <li>• รางวัล Impact Points เมื่อเปลี่ยนธีม</li>
                <li>• ปลดล็อคตามระดับและ AI Credits</li>
                <li>• ตัวอย่างธีมแบบเรียลไทม์</li>
                <li>• บันทึกการใช้งานในประวัติ</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-ink-light">
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