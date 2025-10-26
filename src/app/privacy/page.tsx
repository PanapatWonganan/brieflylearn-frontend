'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Users, Database, Mail } from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    id: 'collection',
    title: 'ข้อมูลที่เราเก็บรวบรวม',
    icon: Database,
    content: [
      'ข้อมูลส่วนตัว เช่น ชื่อ-นามสกุล อีเมล หมายเลขโทรศัพท์',
      'ข้อมูลสุขภาพพื้นฐาน เช่น อายุ น้ำหนัก ส่วนสูง ประวัติการตั้งครรภ์',
      'ข้อมูลการใช้งาน เช่น คอร์สที่เรียน เวลาการออกกำลังกาย ความคืบหน้า',
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
      'ติดตามความคืบหน้าและผลลัพธ์การออกกำลังกาย',
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
                <Shield className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              นโยบายความเป็นส่วนตัว
            </h1>
            <p className="text-xl text-orange-600 mb-4">
              เราใส่ใจและปกป้องข้อมูลส่วนตัวของคุณ
            </p>
            <p className="text-sm text-gray-500">
              อัปเดตล่าสุด: 15 มกราคม 2024
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            คำนำ
          </h2>
          <p className="text-orange-600 leading-relaxed mb-4">
            BoostMe ("เรา", "บริษัท") ให้ความสำคัญกับการปกป้องข้อมูลส่วนตัวของผู้ใช้บริการ 
            นโยบายความเป็นส่วนตัวนี้อธิบายวิธีการที่เราเก็บรวบรวม ใช้ และปกป้องข้อมูลของคุณ
            เมื่อคุณใช้บริการแพลตฟอร์มสุขภาพผู้หญิงออนไลน์ของเรา
          </p>
          <p className="text-orange-600 leading-relaxed">
            การใช้บริการของเราถือว่าคุณยอมรับและเห็นด้วยกับนโยบายนี้ 
            หากคุณไม่เห็นด้วยกับส่วนใดส่วนหนึ่งของนโยบาย กรุณาหยุดการใช้บริการ
          </p>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <section.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {section.title}
                </h3>
              </div>
              
              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-orange-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              
              {section.id === 'contact' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-orange-600 mb-2">
                    <strong>ติดต่อเรื่องความเป็นส่วนตัว:</strong>
                  </p>
                  <div className="space-y-1 text-sm text-orange-600">
                    <p>📧 อีเมล: privacy@boostme.com</p>
                    <p>📞 โทรศัพท์: 02-123-4567</p>
                    <p>📍 ที่อยู่: 123 ถนนสุขภาพดี แขวงสุขใจ เขตใจดี กรุงเทพฯ 10110</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* GDPR Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-orange-200"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-orange-600" />
            <h3 className="text-xl font-bold text-blue-800">
              การปฏิบัติตาม GDPR และ PDPA
            </h3>
          </div>
          <p className="text-orange-700 leading-relaxed mb-4">
            เราปฏิบัติตามข้อกำหนดของ General Data Protection Regulation (GDPR) 
            และพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) อย่างเคร่งครัด
          </p>
          <ul className="space-y-2 text-sm text-orange-600">
            <li>• ได้รับการรับรองมาตรฐาน ISO 27001 ด้านความปลอดภัยข้อมูล</li>
            <li>• มีเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO) ที่ได้รับการรับรอง</li>
            <li>• ประเมินผลกระทบต่อความเป็นส่วนตัว (DPIA) ทุกระบบ</li>
            <li>• มีแผนการตอบสนองต่อการละเมิดข้อมูลภายใน 72 ชั่วโมง</li>
          </ul>
        </motion.div>

        {/* Updates Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-12 bg-yellow-50 rounded-2xl p-6 border border-yellow-200"
        >
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            การอัปเดตนโยบาย
          </h3>
          <p className="text-yellow-700 text-sm leading-relaxed">
            เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว 
            การเปลี่ยนแปลงสำคัญจะแจ้งให้ทราบล่วงหน้า 30 วัน 
            และจะมีผลบังคับใช้เมื่อมีการเผยแพร่บนเว็บไซต์
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-12 text-center space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-700 transition-colors"
            >
              ติดต่อเรื่องความเป็นส่วนตัว
            </Link>
            <Link
              href="/terms"
              className="border border-orange-600 text-orange-600 px-6 py-3 rounded-xl font-medium hover:bg-orange-50 transition-colors"
            >
              อ่านข้อกำหนดการใช้งาน
            </Link>
          </div>
          
          <p className="text-sm text-gray-500">
            หากมีข้อสงสัยเกี่ยวกับนโยบายนี้ กรุณาติดต่อเราได้ตลอดเวลา
          </p>
        </motion.div>
      </div>
    </div>
  )
}