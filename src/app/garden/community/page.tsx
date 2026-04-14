'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Users } from 'lucide-react'
import Link from 'next/link'
import CommunityDashboard from '@/components/garden/CommunityDashboard'

const CommunityGardenPage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-800/40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/garden"
              className="flex items-center space-x-2 text-gray-400 hover:text-gray-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>กลับสู่แล็บ</span>
            </Link>
            <div className="h-5 border-l border-gray-700" />
            <div>
              <h1 className="text-3xl font-bold font-serif text-gray-200 flex items-center space-x-2">
                <Users className="h-8 w-8 text-green-500" />
                <span>ชุมชน AI</span>
              </h1>
              <p className="text-gray-500 mt-1">ร่วมสร้างโปรเจกต์ AI ไปด้วยกัน</p>
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
          <CommunityDashboard />
        </motion.div>

        {/* Demo Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-gray-800/50 border border-gray-700 rounded-sm p-6"
        >
          <h3 className="text-lg font-bold text-gray-200 mb-3 flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>เกี่ยวกับชุมชน AI</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-200 mb-2">🌍 ชุมชนแห่งการแบ่งปัน</h4>
              <ul className="space-y-1 text-gray-400">
                <li>• <strong>แล็บยอดนิยม</strong> - ชมและเรียนรู้จากแล็บที่ประสบความสำเร็จ</li>
                <li>• <strong>โครงการชุมชน</strong> - ร่วมทำกิจกรรมเพื่อเป้าหมายร่วม</li>
                <li>• <strong>อันดับคะแนน</strong> - แข่งขันกับเพื่อน AI Builder</li>
                <li>• <strong>การช่วยเหลือ</strong> - พัฒนาโปรเจกต์ร่วมกัน</li>
                <li>• <strong>แรงบันดาลใจ</strong> - เรียนรู้เทคนิคการพัฒนาใหม่ๆ</li>
                <li>• <strong>รางวัลพิเศษ</strong> - ได้ Impact Points และ AI Credits เพิ่ม</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-200 mb-2">✨ กิจกรรมที่ทำได้</h4>
              <ul className="space-y-1 text-gray-400">
                <li>• เยี่ยมชมแล็บของสมาชิก</li>
                <li>• ถูกใจแล็บที่ชอบ (+5 Impact Points)</li>
                <li>• ช่วยพัฒนาโปรเจกต์เพื่อน (+10 Impact Points, +3 Seeds)</li>
                <li>• เข้าร่วมโครงการชุมชนรายเดือน</li>
                <li>• ดูอันดับAI Builder ยอดเยี่ยม</li>
                <li>• แลกเปลี่ยนประสบการณ์การพัฒนาโปรเจกต์</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-900/50 border border-gray-700 rounded-sm">
            <p className="text-sm text-gray-400">
              <strong>💡 เคล็ดลับ:</strong> การมีส่วนร่วมในชุมชนจะช่วยให้คุณได้รับ Impact Points และ AI Credits เพิ่มเติม
              พร้อมทั้งแรงบันดาลใจจากสวนสวยๆ ของเพื่อนสมาชิก!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CommunityGardenPage