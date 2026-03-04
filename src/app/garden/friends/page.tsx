'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Users } from 'lucide-react'
import FriendsList from '@/components/garden/FriendsList'

const FriendsPage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/garden"
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-ink-muted" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold font-serif text-ink flex items-center space-x-2">
                  <Users className="h-6 w-6 text-purple-500" />
                  <span>เครือข่าย AI</span>
                </h1>
                <p className="text-ink-muted mt-1">เชื่อมต่อและพัฒนาโปรเจกต์ร่วมกับเครือข่าย</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        <div className="mb-8 bg-white rounded-xl border border-gray-100 p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-ink mb-2">
              🌸 AI Network Demo
            </h2>
            <p className="text-ink-muted">
              ระบบเครือข่ายสำหรับ AI Lab ที่ให้คุณเชื่อมต่อกับเพื่อนและช่วยเหลือกันในพัฒนาโปรเจกต์
            </p>
          </div>

          {/* Features Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-ink mb-2 flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>ฟีเจอร์ AI Network</span>
            </h3>
            <div className="text-sm text-ink-light space-y-1">
              <p>• ✅ เพิ่มเพื่อนด้วยอีเมล</p>
              <p>• ✅ ส่งและรับคำขอเป็นเพื่อน</p>
              <p>• ✅ ค้นหาผู้ใช้ในระบบ</p>
              <p>• ✅ จัดการรายชื่อเพื่อน</p>
              <p>• 🚧 เยี่ยมชมแล็บเพื่อน (กำลังพัฒนา)</p>
              <p>• 🚧 ช่วยพัฒนาโปรเจกต์เพื่อน (กำลังพัฒนา)</p>
            </div>
          </div>
        </div>

        {/* Friends List Component */}
        <FriendsList />

        {/* Instructions */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="font-bold text-ink mb-3 flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>วิธีใช้งาน</span>
          </h3>
          <div className="text-sm text-ink-light space-y-2">
            <p>1. 👫 **แท็บเพื่อน**: ดูรายชื่อเพื่อนทั้งหมด สามารถเยี่ยมชมสวนหรือลบเพื่อนได้</p>
            <p>2. 📨 **แท็บคำขอ**: ดูคำขอเป็นเพื่อนที่ได้รับ และส่งคำขอใหม่ด้วยอีเมล</p>
            <p>3. 🔍 **แท็บค้นหา**: ค้นหาผู้ใช้ในระบบด้วยชื่อหรืออีเมล</p>
            <p>4. ⭐ **การโต้ตอบ**: ในอนาคตจะสามารถช่วยเหลือเพื่อนในพัฒนาโปรเจกต์ได้</p>
          </div>
        </div>

        {/* Back to Garden */}
        <div className="mt-8 text-center">
          <Link 
            href="/garden"
            className="inline-flex items-center space-x-2 bg-ink text-white hover:bg-ink-light px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>กลับไปแล็บ</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FriendsPage