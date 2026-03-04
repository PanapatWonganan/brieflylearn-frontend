'use client'

import { Shield, Eye, Lock, Users, Database, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    id: 'collection',
    title: 'ข้อมูลที่เราเก็บรวบรวม',
    icon: Database,
    content: [
      'ข้อมูลส่วนตัว เช่น ชื่อ-นามสกุล อีเมล หมายเลขโทรศัพท์',
      'ข้อมูลการใช้งาน เช่น คอร์สที่เรียน เวลาการเรียน ความคืบหน้า',
      'ข้อมูลทางเทคนิค เช่น IP Address, Browser, Device Information',
      'ข้อมูลการชำระเงิน (ผ่านระบบของธนาคารเท่านั้น)'
    ]
  },
  {
    id: 'usage',
    title: 'การใช้ข้อมูลของคุณ',
    icon: Eye,
    content: [
      'ให้บริการแพลตฟอร์มและคอร์สต่างๆ แก่คุณ',
      'ปรับแต่งเนื้อหาและคำแนะนำให้เหมาะสมกับคุณ',
      'ติดตามความคืบหน้าและผลลัพธ์การเรียนรู้',
      'ส่งข่าวสาร อัปเดต และข้อมูลสำคัญ',
      'ปรับปรุงและพัฒนาบริการให้ดีขึ้น',
      'รักษาความปลอดภัยและป้องกันการใช้งานที่ผิดกฎหมาย'
    ]
  },
  {
    id: 'sharing',
    title: 'การแบ่งปันข้อมูล',
    icon: Users,
    content: [
      'เราไม่ขายหรือเช่าข้อมูลส่วนตัวของคุณให้บุคคลที่สาม',
      'อาจแบ่งปันข้อมูลกับผู้ให้บริการที่เชื่อถือได้ เช่น ระบบชำระเงิน',
      'แบ่งปันข้อมูลเมื่อได้รับความยินยอมจากคุณ',
      'เปิดเผยข้อมูลเมื่อกฎหมายกำหนดหรือเพื่อปกป้องสิทธิของเรา',
      'ข้อมูลที่ไม่สามารถระบุตัวตนได้อาจใช้เพื่อการวิเคราะห์และวิจัย'
    ]
  },
  {
    id: 'security',
    title: 'ความปลอดภัยของข้อมูล',
    icon: Lock,
    content: [
      'ใช้การเข้ารหัส SSL/TLS สำหรับการส่งข้อมูลทั้งหมด',
      'จัดเก็บข้อมูลในเซิร์ฟเวอร์ที่มีความปลอดภัยสูง',
      'ควบคุมการเข้าถึงข้อมูลเฉพาะพนักงานที่จำเป็น',
      'สำรองข้อมูลและมีแผนกู้คืนข้อมูล',
      'ตรวจสอบและปรับปรุงระบบรักษาความปลอดภัยอย่างสม่ำเสมอ',
      'แจ้งเตือนทันทีหากเกิดการละเมิดข้อมูล'
    ]
  },
  {
    id: 'rights',
    title: 'สิทธิของคุณ',
    icon: Shield,
    content: [
      'สิทธิในการเข้าถึงข้อมูลส่วนตัวของคุณ',
      'สิทธิในการแก้ไขข้อมูลที่ไม่ถูกต้อง',
      'สิทธิในการลบข้อมูลส่วนตัว (Right to be Forgotten)',
      'สิทธิในการถอนความยินยอมการใช้ข้อมูล',
      'สิทธิในการโอนย้ายข้อมูล (Data Portability)',
      'สิทธิในการคัดค้านการประมวลผลข้อมูล'
    ]
  },
  {
    id: 'contact',
    title: 'การติดต่อเรา',
    icon: Mail,
    content: [
      'หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว',
      'ต้องการใช้สิทธิเกี่ยวกับข้อมูลส่วนตัว',
      'รายงานการละเมิดข้อมูลหรือปัญหาด้านความปลอดภัย',
      'ข้อเสนอแนะเพื่อปรับปรุงการปกป้องข้อมูล'
    ]
  }
]

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto pt-24 pb-16">
        <div className="max-w-3xl">
          <p className="text-xs tracking-widest uppercase text-ink-muted mb-3">นโยบาย</p>
          <h1 className="text-heading font-serif text-ink mb-4">
            นโยบายความเป็นส่วนตัว
          </h1>
          <p className="text-base text-ink-light leading-relaxed mb-2">
            เราใส่ใจและปกป้องข้อมูลส่วนตัวของคุณ
          </p>
          <p className="text-xs text-ink-muted">
            อัปเดตล่าสุด: 15 มกราคม 2024
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto py-16 border-t border-gray-100">
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold text-ink mb-4">คำนำ</h2>
          <p className="text-sm text-ink-light leading-relaxed mb-4">
            BrieflyLearn ("เรา", "บริษัท") ให้ความสำคัญกับการปกป้องข้อมูลส่วนตัวของผู้ใช้บริการ
            นโยบายความเป็นส่วนตัวนี้อธิบายวิธีการที่เราเก็บรวบรวม ใช้ และปกป้องข้อมูลของคุณ
            เมื่อคุณใช้บริการแพลตฟอร์มเรียน AI ออนไลน์ของเรา
          </p>
          <p className="text-sm text-ink-light leading-relaxed">
            การใช้บริการของเราถือว่าคุณยอมรับและเห็นด้วยกับนโยบายนี้
            หากคุณไม่เห็นด้วยกับส่วนใดส่วนหนึ่งของนโยบาย กรุณาหยุดการใช้บริการ
          </p>
        </div>
      </section>

      {/* Policy Sections */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          className="px-5 sm:px-8 max-w-6xl mx-auto py-12 border-t border-gray-100"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                <section.icon className="h-5 w-5 text-ink" />
              </div>
              <h3 className="text-lg font-semibold text-ink">
                {section.title}
              </h3>
            </div>

            <ul className="space-y-3 pl-1">
              {section.content.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-ink-faint rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-ink-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            {section.id === 'contact' && (
              <div className="mt-6 p-5 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-ink mb-3">
                  ติดต่อเรื่องความเป็นส่วนตัว:
                </p>
                <div className="space-y-1 text-sm text-ink-light">
                  <p>อีเมล: privacy@brieflylearn.com</p>
                  <p>โทรศัพท์: 02-123-4567</p>
                  <p>ที่อยู่: 123 ถนนสุขภาพดี แขวงสุขใจ เขตใจดี กรุงเทพฯ 10110</p>
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* GDPR/PDPA Compliance */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto py-12 border-t border-gray-100">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-5 w-5 text-ink" />
            <h3 className="text-lg font-semibold text-ink">
              การปฏิบัติตาม GDPR และ PDPA
            </h3>
          </div>
          <p className="text-sm text-ink-light leading-relaxed mb-4">
            เราปฏิบัติตามข้อกำหนดของ General Data Protection Regulation (GDPR)
            และพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) อย่างเคร่งครัด
          </p>
          <ul className="space-y-2 text-sm text-ink-light">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-ink-faint rounded-full mt-2 flex-shrink-0"></div>
              ได้รับการรับรองมาตรฐาน ISO 27001 ด้านความปลอดภัยข้อมูล
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-ink-faint rounded-full mt-2 flex-shrink-0"></div>
              มีเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO) ที่ได้รับการรับรอง
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-ink-faint rounded-full mt-2 flex-shrink-0"></div>
              ประเมินผลกระทบต่อความเป็นส่วนตัว (DPIA) ทุกระบบ
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-ink-faint rounded-full mt-2 flex-shrink-0"></div>
              มีแผนการตอบสนองต่อการละเมิดข้อมูลภายใน 72 ชั่วโมง
            </li>
          </ul>
        </div>
      </section>

      {/* Updates Notice */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto py-12 border-t border-gray-100">
        <div className="max-w-3xl">
          <h3 className="text-sm font-semibold text-ink mb-2">
            การอัปเดตนโยบาย
          </h3>
          <p className="text-sm text-ink-muted leading-relaxed">
            เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว
            การเปลี่ยนแปลงสำคัญจะแจ้งให้ทราบล่วงหน้า 30 วัน
            และจะมีผลบังคับใช้เมื่อมีการเผยแพร่บนเว็บไซต์
          </p>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto py-24 border-t border-gray-100">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-ink text-white text-sm font-medium rounded-lg hover:bg-ink-light transition-colors"
            >
              ติดต่อเรื่องความเป็นส่วนตัว
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm text-ink-light font-medium border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
            >
              อ่านข้อกำหนดการใช้งาน
            </Link>
          </div>
          <p className="text-xs text-ink-muted mt-6">
            หากมีข้อสงสัยเกี่ยวกับนโยบายนี้ กรุณาติดต่อเราได้ตลอดเวลา
          </p>
        </div>
      </section>
    </div>
  )
}
