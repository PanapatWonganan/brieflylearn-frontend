'use client'

import { ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const faqCategories = [
  {
    id: 'general',
    title: 'ทั่วไป',
    questions: [
      {
        question: 'Antipararell คืออะไร?',
        answer: 'Antipararell เป็นแพลตฟอร์มเรียน AI ออนไลน์ มีคอร์สเกี่ยวกับ AI Strategy, Prompt Engineering, AI Automation สำหรับสร้างธุรกิจและบริหารองค์กร'
      },
      {
        question: 'ใครสามารถใช้ Antipararell ได้บ้าง?',
        answer: 'ทุกคนที่ต้องการเรียนรู้ AI ไม่ว่าจะเป็นเจ้าของธุรกิจที่อยากใช้ AI สร้างรายได้ หรือผู้บริหารที่ต้องนำ AI เข้าองค์กร มีคอร์สที่เหมาะกับทุกระดับ'
      },
      {
        question: 'จำเป็นต้องมีพื้นฐานมาก่อนไหม?',
        answer: 'ไม่จำเป็นครับ คอร์สส่วนใหญ่เริ่มต้นจากพื้นฐาน และมีคอร์สระดับต่างๆ ให้เลือกตามความเหมาะสม'
      }
    ]
  },
  {
    id: 'subscription',
    title: 'การสมัครสมาชิก',
    questions: [
      {
        question: 'มีแผนการสมัครสมาชิกแบบไหนบ้าง?',
        answer: 'มี 3 แผน: รายเดือน (299 บาท), รายไตรมาส (699 บาท), รายปี (1,999 บาท) แต่ละแผนมีสิทธิ์เข้าถึงคอร์สทั้งหมด'
      },
      {
        question: 'สามารถยกเลิกการสมัครสมาชิกได้ตลอดเวลาไหม?',
        answer: 'ได้ครับ สามารถยกเลิกได้ตลอดเวลาโดยไม่มีค่าปรับ การยกเลิกจะมีผลในรอบการชำระเงินถัดไป'
      },
      {
        question: 'มีช่วงทดลองใช้ฟรีไหม?',
        answer: 'มีครับ ทดลองใช้ฟรี 7 วัน สามารถเข้าถึงคอร์สทั้งหมดและฟีเจอร์ต่างๆ ได้เต็มรูปแบบ'
      }
    ]
  },
  {
    id: 'courses',
    title: 'คอร์สเรียน',
    questions: [
      {
        question: 'มีคอร์สอะไรบ้าง?',
        answer: 'มีคอร์ส AI หลากหลายหมวด ทั้ง AI Strategy, Prompt Engineering, AI Automation, AI สร้างธุรกิจ และ AI บริหารองค์กร'
      },
      {
        question: 'คอร์สมีความยาวเท่าไหร่?',
        answer: 'แต่ละคอร์สมีความยาวต่างกัน โดยเฉลี่ย 4-8 สัปดาห์ แต่ละบทเรียนยาวประมาณ 15-45 นาที'
      },
      {
        question: 'สามารถเรียนซ้ำได้ไหม?',
        answer: 'ได้ครับ สามารถเรียนซ้ำได้ไม่จำกัดครั้ง และสามารถดูย้อนหลังได้ตลอดระยะเวลาการสมัครสมาชิก'
      }
    ]
  },
  {
    id: 'technical',
    title: 'เทคนิค',
    questions: [
      {
        question: 'รองรับอุปกรณ์อะไรบ้าง?',
        answer: 'รองรับทั้งมือถือ แท็บเล็ต และคอมพิวเตอร์ ทำงานได้บนเบราว์เซอร์ทุกประเภท'
      },
      {
        question: 'หากมีปัญหาการเชื่อมต่อควรทำอย่างไร?',
        answer: 'ตรวจสอบสัญญาณอินเทอร์เน็ต รีเฟรชหน้าเว็บ หรือลองใช้เบราว์เซอร์อื่น หากยังมีปัญหาให้ติดต่อทีมสนับสนุน'
      },
      {
        question: 'สามารถดาวน์โหลดวิดีโอเพื่อดูออฟไลน์ได้ไหม?',
        answer: 'ใน Mobile App สามารถดาวน์โหลดวิดีโอเพื่อดูออฟไลน์ได้ แต่ในเบราว์เซอร์ต้องเชื่อมต่ออินเทอร์เน็ต'
      }
    ]
  }
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('general')
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  const currentCategory = faqCategories.find(cat => cat.id === activeCategory)

  return (
    <div>
      {/* Header */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto pt-24 pb-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">FAQ</p>
          <h1 className="text-heading text-gray-200 mb-4">
            คำถามที่พบบ่อย
          </h1>
          <p className="text-base text-gray-400 leading-relaxed">
            ค้นหาคำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับ Antipararell
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto py-20 border-t border-gray-800/40">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="border border-gray-700/40 shadow-card rounded-sm p-6 sticky top-8">
              <h3 className="text-sm font-semibold text-gray-200 mb-4">หมวดหมู่</h3>
              <nav className="space-y-1">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id)
                      setOpenQuestion(null)
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-sm text-sm transition-colors ${
                      activeCategory === category.id
                        ? 'bg-mint-600 text-white font-medium'
                        : 'text-gray-400 hover:bg-gray-800/50'
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {currentCategory && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-200 mb-8">
                  {currentCategory.title}
                </h2>

                <div className="space-y-3">
                  {currentCategory.questions.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-700 rounded-sm overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                      >
                        <span className="text-sm font-medium text-gray-200 pr-4">
                          {faq.question}
                        </span>
                        <ChevronRight
                          className={`h-4 w-4 text-gray-600 transition-transform flex-shrink-0 ${
                            openQuestion === index ? 'rotate-90' : ''
                          }`}
                        />
                      </button>

                      {openQuestion === index && (
                        <div className="px-6 pb-4 border-t border-gray-700">
                          <p className="text-sm text-gray-400 leading-relaxed pt-4">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto py-28 border-t border-gray-800/40">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-heading text-gray-200 mb-4">
            ยังไม่พบคำตอบที่ต้องการ?
          </h2>
          <p className="text-base text-gray-500 leading-relaxed mb-8">
            ทีมสนับสนุนของเราพร้อมช่วยเหลือคุณตลอด 24 ชั่วโมง
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/help"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-mint-600 text-white text-sm font-medium rounded-sm hover:bg-mint-500 transition-colors"
            >
              ศูนย์ช่วยเหลือ
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm text-gray-400 font-medium border border-gray-700 rounded-sm hover:border-gray-600 transition-colors"
            >
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
