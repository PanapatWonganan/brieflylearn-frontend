'use client'

import { motion } from 'framer-motion'
import { Check, Star, Heart, Crown, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 299,
    period: 'เดือน',
    description: 'เหมาะสำหรับผู้เริ่มต้น',
    icon: Heart,
    color: 'pink',
    popular: false,
    features: [
      'เข้าถึงคอร์สพื้นฐาน 10+ คอร์ส',
      'วิดีโอ HD ความยาวรวม 50+ ชั่วโมง',
      'แผนการออกกำลังกายส่วนตัว',
      'การติดตามความคืบหน้า',
      'คอมมิวนิตี้สมาชิก',
      'แอปมือถือ iOS & Android'
    ],
    limitations: [
      'ไม่รวม Live Class',
      'ไม่มีการปรึกษาผู้เชี่ยวชาญ',
      'ไม่มีโปรแกรมส่วนตัว'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 699,
    period: '3 เดือน',
    description: 'ยอดนิยม! คุ้มค่าที่สุด',
    icon: Star,
    color: 'yellow',
    popular: true,
    features: [
      'เข้าถึงคอร์สทั้งหมด 50+ คอร์ส',
      'วิดีโอ 4K ความยาวรวม 200+ ชั่วโมง',
      'แผนการออกกำลังกายส่วนตัว',
      'Live Class รายสัปดาห์',
      'การปรึกษาผู้เชี่ยวชาญ (2 ครั้ง/เดือน)',
      'โปรแกรมโภชนาการส่วนตัว',
      'การติดตามความคืบหน้าแบบละเอียด',
      'คอมมิวนิตี้พรีเมียม',
      'แอปมือถือพร้อมโหมดออฟไลน์'
    ],
    limitations: []
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 1999,
    period: 'ปี',
    description: 'สำหรับผู้ที่จริงจัง',
    icon: Crown,
    color: 'purple',
    popular: false,
    features: [
      'เข้าถึงคอร์สทั้งหมด + คอร์สใหม่ก่อนใคร',
      'วิดีโอ 4K + เนื้อหาพิเศษ',
      'แผนการออกกำลังกายส่วนตัว',
      'Live Class ไม่จำกัด + เซสชั่นพิเศษ',
      'การปรึกษาผู้เชี่ยวชาญไม่จำกัด',
      'โปรแกรมโภชนาการส่วนตัว',
      'การติดตามความคืบหน้าแบบละเอียด',
      'คอมมิวนิตี้ VIP',
      'แอปมือถือพร้อมฟีเจอร์พิเศษ',
      'การสนับสนุน 24/7',
      'ส่วนลด 20% สำหรับคอร์สพิเศษ'
    ],
    limitations: []
  }
]

const colorClasses = {
  pink: {
    bg: 'from-orange-500 to-orange-500',
    border: 'border-orange-500',
    button: 'bg-orange-500 hover:bg-orange-600',
    icon: 'bg-orange-100 text-orange-600'
  },
  yellow: {
    bg: 'from-yellow-500 to-orange-500',
    border: 'border-yellow-500',
    button: 'bg-yellow-500 hover:bg-yellow-600',
    icon: 'bg-yellow-100 text-yellow-600'
  },
  purple: {
    bg: 'from-purple-500 to-indigo-500',
    border: 'border-purple-500',
    button: 'bg-purple-500 hover:bg-purple-600',
    icon: 'bg-purple-100 text-purple-600'
  }
}

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

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
              แผนการสมัครสมาชิก
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              เลือกแผนที่เหมาะสมกับคุณ เริ่มต้นเดินทางสู่สุขภาพที่ดีกว่า
            </p>
            
            {/* Free Trial Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium"
            >
              <Sparkles className="h-4 w-4" />
              <span>ทดลองใช้ฟรี 7 วัน ทุกแผน</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden relative ${
                plan.popular ? 'ring-2 ring-yellow-500 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    ยอดนิยม
                  </div>
                </div>
              )}
              
              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    colorClasses[plan.color as keyof typeof colorClasses].icon
                  }`}>
                    <plan.icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-bold text-gray-800">
                      ฿{plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600">
                      /{plan.period}
                    </span>
                  </div>
                  
                  {plan.period !== 'เดือน' && (
                    <p className="text-sm text-green-600 mt-2">
                      ประหยัด {plan.period === '3 เดือน' ? '22%' : '44%'}
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-xl text-white font-medium transition-colors ${
                    colorClasses[plan.color as keyof typeof colorClasses].button
                  }`}
                >
                  เริ่มทดลองใช้ฟรี
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-3">
                  ยกเลิกได้ตลอดเวลา ไม่มีค่าผูกมัด
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            คำถามที่พบบ่อย
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  สามารถเปลี่ยนแผนได้ไหม?
                </h4>
                <p className="text-gray-600 text-sm">
                  ได้ค่ะ สามารถอัปเกรดหรือดาวน์เกรดได้ตลอดเวลา การเปลี่ยนแปลงจะมีผลในรอบการชำระถัดไป
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  การชำระเงินมีวิธีไหนบ้าง?
                </h4>
                <p className="text-gray-600 text-sm">
                  รับชำระผ่านบัตรเครดิต/เดบิต, PromptPay, True Wallet และ Mobile Banking
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  หากยกเลิกจะเกิดอะไรขึ้น?
                </h4>
                <p className="text-gray-600 text-sm">
                  สามารถใช้งานต่อได้จนถึงวันสิ้นสุดรอบการชำระเงิน และจะไม่มีการหักเงินในรอบถัดไป
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  มี Money Back Guarantee ไหม?
                </h4>
                <p className="text-gray-600 text-sm">
                  มีค่ะ หากไม่พอใจภายใน 30 วันแรก สามารถขอเงินคืนได้ 100%
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-orange-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ต้องการคำปรึกษาเพิ่มเติม?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              ทีมงานของเราพร้อมให้คำแนะนำแผนที่เหมาะสมกับคุณ
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-orange-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              ติดต่อเรา
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}