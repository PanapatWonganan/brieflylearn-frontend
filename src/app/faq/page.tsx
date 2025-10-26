'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Heart, Star, Shield, Clock } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const faqCategories = [
  {
    id: 'general',
    title: 'ทั่วไป',
    icon: Heart,
    color: 'pink',
    questions: [
      {
        question: 'BoostMe คืออะไร?',
        answer: 'BoostMe เป็นแพลตฟอร์มสุขภาพออนไลน์ที่ออกแบบมาเพื่อผู้หญิงโดยเฉพาะ มีคอร์สการออกกำลังกาย โภชนาการ และการดูแลสุขภาพในแต่ละช่วงวัย'
      },
      {
        question: 'ใครสามารถใช้ BoostMe ได้บ้าง?',
        answer: 'ผู้หญิงทุกวัย โดยเฉพาะผู้ที่ตั้งครรภ์ หลังคลอด หรือต้องการดูแลสมดุลฮอร์โมน สามารถใช้บริการได้ มีคอร์สที่เหมาะสมกับแต่ละช่วงชีวิต'
      },
      {
        question: 'จำเป็นต้องมีอุปกรณ์พิเศษไหม?',
        answer: 'ไม่จำเป็นค่ะ คอร์สส่วนใหญ่สามารถทำได้ที่บ้านโดยไม่ต้องใช้อุปกรณ์ หรือใช้อุปกรณ์พื้นฐานที่หาได้ง่าย'
      }
    ]
  },
  {
    id: 'subscription',
    title: 'การสมัครสมาชิก',
    icon: Star,
    color: 'yellow',
    questions: [
      {
        question: 'มีแผนการสมัครสมาชิกแบบไหนบ้าง?',
        answer: 'มี 3 แผน: รายเดือน (299 บาท), รายไตรมาส (699 บาท), รายปี (1,999 บาท) แต่ละแผนมีสิทธิ์เข้าถึงคอร์สทั้งหมด'
      },
      {
        question: 'สามารถยกเลิกการสมัครสมาชิกได้ตลอดเวลาไหม?',
        answer: 'ได้ค่ะ สามารถยกเลิกได้ตลอดเวลาโดยไม่มีค่าปรับ การยกเลิกจะมีผลในรอบการชำระเงินถัดไป'
      },
      {
        question: 'มีช่วงทดลองใช้ฟรีไหม?',
        answer: 'มีค่ะ ทดลองใช้ฟรี 7 วัน สามารถเข้าถึงคอร์สทั้งหมดและฟีเจอร์ต่างๆ ได้เต็มรูปแบบ'
      }
    ]
  },
  {
    id: 'courses',
    title: 'คอร์สเรียน',
    icon: Shield,
    color: 'green',
    questions: [
      {
        question: 'มีคอร์สอะไรบ้าง?',
        answer: 'มีคอร์สออกกำลังกายขณะตั้งครรภ์ โยคะหลังคลอด การดูแลสมดุลฮอร์โมน โภชนาการ และการจัดการความเครียด'
      },
      {
        question: 'คอร์สมีความยาวเท่าไหร่?',
        answer: 'แต่ละคอร์สมีความยาวต่างกัน โดยเฉลี่ย 4-8 สัปดาห์ แต่ละบทเรียนยาวประมาณ 15-45 นาที'
      },
      {
        question: 'สามารถเรียนซ้ำได้ไหม?',
        answer: 'ได้ค่ะ สามารถเรียนซ้ำได้ไม่จำกัดครั้ง และสามารถดูย้อนหลังได้ตลอดระยะเวลาการสมัครสมาชิก'
      }
    ]
  },
  {
    id: 'technical',
    title: 'เทคนิค',
    icon: Clock,
    color: 'blue',
    questions: [
      {
        question: 'รองรับอุปกรณ์อะไรบ้าง?',
        answer: 'รองรับทั้งมือถือ แท็บเล็ต และคอมพิวเตอร์ ทำงานได้บนเบราว์เซอร์ทุกประเภท และมี Mobile App สำหรับ iOS และ Android'
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

const colorClasses = {
  pink: 'bg-orange-100 text-orange-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  green: 'bg-green-100 text-green-600',
  blue: 'bg-blue-100 text-orange-600'
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('general')
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  const currentCategory = faqCategories.find(cat => cat.id === activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              คำถามที่พบบ่อย
            </h1>
            <p className="text-xl text-orange-600">
              ค้นหาคำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับ BoostMe
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">หมวดหมู่</h3>
              <nav className="space-y-2">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id)
                      setOpenQuestion(null)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left ${
                      activeCategory === category.id
                        ? 'bg-orange-50 text-orange-600 border border-orange-200'
                        : 'hover:bg-gray-50 text-orange-600'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      activeCategory === category.id 
                        ? colorClasses[category.color as keyof typeof colorClasses]
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <category.icon className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{category.title}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {currentCategory && (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 mb-8">
                  <div className={`p-3 rounded-xl ${colorClasses[currentCategory.color as keyof typeof colorClasses]}`}>
                    <currentCategory.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {currentCategory.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {currentCategory.questions.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-800 pr-4">
                          {faq.question}
                        </span>
                        <ChevronRight 
                          className={`h-5 w-5 text-gray-400 transition-transform flex-shrink-0 ${
                            openQuestion === index ? 'rotate-90' : ''
                          }`}
                        />
                      </button>
                      
                      {openQuestion === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-4 border-t border-gray-100"
                        >
                          <p className="text-orange-600 leading-relaxed pt-4">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-orange-500 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              ยังไม่พบคำตอบที่ต้องการ?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              ทีมสนับสนุนของเราพร้อมช่วยเหลือคุณตลอด 24 ชั่วโมง
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/help"
                className="bg-white text-orange-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
              >
                ศูนย์ช่วยเหลือ
              </Link>
              <Link
                href="/contact"
                className="border border-white text-white px-6 py-3 rounded-xl font-medium hover:bg-white hover:text-orange-600 transition-colors"
              >
                ติดต่อเรา
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}