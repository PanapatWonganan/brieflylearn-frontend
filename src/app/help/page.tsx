'use client'

import { motion } from 'framer-motion'
import { ChevronRight, MessageCircle, Phone, Mail, Clock, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const faqs = [
  {
    question: 'ฉันจะเริ่มใช้งานแพลตฟอร์มได้อย่างไร?',
    answer: 'เริ่มต้นด้วยการสมัครสมาชิก จากนั้นสามารถเลือกคอร์สที่ต้องการเรียนและเริ่มเดินทางสู่สุขภาพที่ดีได้เลย'
  },
  {
    question: 'สามารถยกเลิกการสมัครสมาชิกได้ไหม?',
    answer: 'ได้ค่ะ สามารถยกเลิกได้ตลอดเวลาผ่านหน้าการตั้งค่าบัญชี โดยจะยังคงใช้งานได้จนถึงวันสิ้นสุดรอบการชำระเงิน'
  },
  {
    question: 'หากมีปัญหาทางเทคนิคควรติดต่อที่ไหน?',
    answer: 'สามารถติดต่อทีมสนับสนุนผ่านแชทสด อีเมล หรือโทรศัพท์ ทีมงานพร้อมช่วยเหลือ 24/7'
  },
  {
    question: 'สามารถเปลี่ยนแปลงแผนการสมัครสมาชิกได้ไหม?',
    answer: 'ได้ค่ะ สามารถอัปเกรดหรือดาวน์เกรดแผนได้ตลอดเวลา การเปลี่ยนแปลงจะมีผลในรอบการชำระเงินถัดไป'
  }
]

const supportChannels = [
  {
    icon: MessageCircle,
    title: 'แชทสด',
    description: 'ตอบกลับภายใน 2 นาที',
    action: 'เริ่มแชท',
    available: 'ทุกวัน 6:00 - 22:00 น.'
  },
  {
    icon: Mail,
    title: 'อีเมล',
    description: 'support@boostme.com',
    action: 'ส่งอีเมล',
    available: 'ตอบกลับภายใน 24 ชม.'
  },
  {
    icon: Phone,
    title: 'โทรศัพท์',
    description: '02-123-4567',
    action: 'โทรเลย',
    available: 'จ-ศ 8:00 - 18:00 น.'
  }
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              ศูนย์ช่วยเหลือ
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              ค้นหาคำตอบ หรือติดต่อทีมสนับสนุนของเรา
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="ค้นหาคำถามหรือหัวข้อ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Support Channels */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            ช่องทางการติดต่อ
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 mx-auto">
                  <channel.icon className="h-8 w-8 text-orange-600" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                  {channel.title}
                </h3>
                
                <p className="text-gray-600 text-center mb-2">
                  {channel.description}
                </p>
                
                <p className="text-sm text-gray-500 text-center mb-6">
                  {channel.available}
                </p>
                
                <button className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition-colors font-medium">
                  {channel.action}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            คำถามที่พบบ่อย
          </motion.h2>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <ChevronRight 
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      openFAQ === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          
          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">
                ไม่พบคำถามที่ตรงกับการค้นหา
              </p>
            </motion.div>
          )}
        </section>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-orange-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ยังไม่พบคำตอบที่ต้องการ?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              ทีมสนับสนุนของเราพร้อมช่วยเหลือคุณ 24/7
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>ติดต่อเรา</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}