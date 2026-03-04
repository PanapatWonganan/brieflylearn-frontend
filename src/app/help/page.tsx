'use client'

import { ChevronRight, MessageCircle, Phone, Mail, Search, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const faqs = [
  {
    question: 'ฉันจะเริ่มใช้งานแพลตฟอร์มได้อย่างไร?',
    answer: 'เริ่มต้นด้วยการสมัครสมาชิก จากนั้นทำแบบประเมิน AI Readiness เพื่อเลือกเส้นทาง AI ที่เหมาะกับคุณ แล้วเริ่มเรียนได้เลย'
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
    description: 'support@brieflylearn.com',
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
    <div className="bg-white">
      {/* Header */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto pt-24 pb-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-ink-muted mb-3">ศูนย์ช่วยเหลือ</p>
          <h1 className="text-heading font-serif text-ink mb-4">
            เราพร้อมช่วยเหลือคุณ
          </h1>
          <p className="text-base text-ink-light leading-relaxed mb-10">
            ค้นหาคำตอบ หรือติดต่อทีมสนับสนุนของเรา
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-ink-faint h-4 w-4" />
            <input
              type="text"
              placeholder="ค้นหาคำถามหรือหัวข้อ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-lg border border-gray-200 focus:ring-1 focus:ring-ink focus:border-ink text-sm transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto py-24 border-t border-gray-100">
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-ink-muted mb-3">ช่องทาง</p>
          <h2 className="text-heading font-serif text-ink">ช่องทางการติดต่อ</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {supportChannels.map((channel, index) => (
            <div
              key={index}
              className="group p-8 border border-gray-100/60 shadow-card rounded-xl hover:shadow-lifted transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-lg mb-6">
                <channel.icon className="h-5 w-5 text-ink" />
              </div>

              <h3 className="text-lg font-semibold text-ink mb-1">
                {channel.title}
              </h3>

              <p className="text-sm text-ink-light mb-1">
                {channel.description}
              </p>

              <p className="text-xs text-ink-muted mb-6">
                {channel.available}
              </p>

              <button className="w-full px-5 py-2.5 bg-ink text-white text-sm font-medium rounded-lg hover:bg-ink-light transition-colors">
                {channel.action}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto py-24 border-t border-gray-100">
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-ink-muted mb-3">FAQ</p>
          <h2 className="text-heading font-serif text-ink">คำถามที่พบบ่อย</h2>
        </div>

        <div className="max-w-3xl space-y-3">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-ink pr-4">{faq.question}</span>
                <ChevronRight
                  className={`h-4 w-4 text-ink-faint transition-transform flex-shrink-0 ${
                    openFAQ === index ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {openFAQ === index && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <p className="text-sm text-ink-light leading-relaxed pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-ink-muted">
              ไม่พบคำถามที่ตรงกับการค้นหา
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto py-28 border-t border-gray-100">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-heading font-serif text-ink mb-4">
            ยังไม่พบคำตอบที่ต้องการ?
          </h2>
          <p className="text-base text-ink-muted leading-relaxed mb-8">
            ทีมสนับสนุนของเราพร้อมช่วยเหลือคุณ
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-white text-sm font-medium rounded-lg hover:bg-ink-light transition-colors"
          >
            ติดต่อเรา
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
