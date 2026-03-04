'use client'

import { Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 299,
    period: 'เดือน',
    description: 'เหมาะสำหรับผู้เริ่มต้นเรียน AI',
    popular: false,
    features: [
      'เข้าถึงคอร์ส AI พื้นฐาน',
      'วิดีโอบทเรียนคุณภาพสูง',
      'แบบประเมิน AI Readiness',
      'เอกสาร Prompt Templates',
      'ติดตามความคืบหน้า',
      'ใบประกาศนียบัตร'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 699,
    period: '3 เดือน',
    description: 'เข้าถึงคอร์ส AI ทั้งหมด',
    popular: true,
    features: [
      'เข้าถึงคอร์ส AI ทั้งหมด (Entrepreneur + Leader)',
      'วิดีโอบทเรียนคุณภาพสูง',
      'Workshop AI ลงมือทำจริง',
      'Live Class รายสัปดาห์',
      'แบบประเมินทุกหมวด AI',
      'ชุมชนคนใช้ AI ออนไลน์',
      'ใบประกาศนียบัตร',
      'อัปเดต AI Tools ใหม่ล่าสุด'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 1999,
    period: 'ปี',
    description: 'สำหรับผู้ที่จริงจังกับ AI',
    popular: false,
    features: [
      'เข้าถึงคอร์ส AI ทั้งหมด + คอร์สใหม่',
      'Workshop AI ลงมือทำจริงไม่จำกัด',
      'Live Class ไม่จำกัด',
      'แบบประเมินและ AI Project',
      'ชุมชน AI ระดับ Premium',
      'ปรึกษาผู้เชี่ยวชาญ AI ส่วนตัว',
      'ใบประกาศนียบัตร',
      'AI Tools & Templates พิเศษ',
      'อัปเดต AI Trends รายสัปดาห์',
      'การสนับสนุน 24/7'
    ]
  }
]

const faqs = [
  {
    question: 'สามารถเปลี่ยนแผนได้ไหม?',
    answer: 'ได้ค่ะ สามารถอัปเกรดหรือดาวน์เกรดได้ตลอดเวลา การเปลี่ยนแปลงจะมีผลในรอบการชำระถัดไป'
  },
  {
    question: 'การชำระเงินมีวิธีไหนบ้าง?',
    answer: 'รับชำระผ่านบัตรเครดิต/เดบิต, PromptPay, True Wallet และ Mobile Banking'
  },
  {
    question: 'หากยกเลิกจะเกิดอะไรขึ้น?',
    answer: 'สามารถใช้งานต่อได้จนถึงวันสิ้นสุดรอบการชำระเงิน และจะไม่มีการหักเงินในรอบถัดไป'
  },
  {
    question: 'มี Money Back Guarantee ไหม?',
    answer: 'มีค่ะ หากไม่พอใจภายใน 30 วันแรก สามารถขอเงินคืนได้ 100%'
  }
]

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-ink-muted mb-4">
              แผนสมาชิก
            </p>
            <h1 className="text-heading text-4xl sm:text-5xl font-bold font-serif text-ink mb-4">
              เลือกแผนที่เหมาะกับคุณ
            </h1>
            <p className="text-lg text-ink-light max-w-2xl mx-auto">
              เริ่มต้นเรียนรู้ AI เพื่อสร้างธุรกิจหรือบริหารองค์กร ด้วยแผนที่ออกแบบมาเพื่อคุณ
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-xl p-8 shadow-card hover:shadow-lifted transition-all ${
                plan.popular
                  ? 'border-brand-500'
                  : 'border-gray-100/60'
              }`}
            >
              {plan.popular && (
                <div className="mb-6">
                  <span className="inline-block text-xs uppercase tracking-wider text-brand-600 font-medium">
                    ยอดนิยม
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-ink mb-2">
                  {plan.name}
                </h3>

                <p className="text-sm text-ink-light mb-6">
                  {plan.description}
                </p>

                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-bold text-ink">
                    ฿{plan.price.toLocaleString()}
                  </span>
                  <span className="text-ink-light">
                    /{plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-ink flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-ink-light">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-ink text-white hover:bg-ink/90'
                    : 'border border-gray-200 text-ink hover:bg-sand-50'
                }`}
              >
                เริ่มต้นใช้งาน
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="border border-gray-100/60 shadow-card rounded-xl p-8 sm:p-12 mb-12">
          <h3 className="text-2xl font-bold font-serif text-ink text-center mb-12">
            คำถามที่พบบ่อย
          </h3>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {faqs.map((faq, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-ink mb-2">
                  {faq.question}
                </h4>
                <p className="text-sm text-ink-light leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="border border-gray-100/60 shadow-card rounded-xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl font-bold font-serif text-ink mb-4">
            ต้องการคำปรึกษาเพิ่มเติม?
          </h3>
          <p className="text-ink-light mb-6 max-w-2xl mx-auto">
            ทีมงานของเราพร้อมให้คำแนะนำแผนที่เหมาะสมกับคุณ
          </p>
          <Link
            href="/contact"
            className="inline-block bg-ink text-white px-6 py-3 rounded-lg font-medium hover:bg-ink/90 transition-colors"
          >
            ติดต่อเรา
          </Link>
        </div>
      </div>
    </div>
  )
}
