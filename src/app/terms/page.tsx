'use client'

import { motion } from 'framer-motion'
import { FileText, AlertTriangle, CreditCard, Users, Shield, Scale } from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    id: 'acceptance',
    title: 'การยอมรับข้อกำหนด',
    icon: FileText,
    content: [
      'การใช้บริการแพลตฟอร์ม BoostMe ถือว่าคุณยอมรับข้อกำหนดการใช้งานนี้',
      'หากคุณไม่เห็นด้วยกับข้อกำหนดใดๆ กรุณาหยุดการใช้บริการทันที',
      'ข้อกำหนดนี้มีผลบังคับใช้กับผู้ใช้ทุกคนที่เข้าถึงหรือใช้บริการของเรา',
      'คุณต้องมีอายุ 18 ปีขึ้นไป หรือได้รับความยินยอมจากผู้ปกครอง'
    ]
  },
  {
    id: 'services',
    title: 'บริการที่เราให้',
    icon: Users,
    content: [
      'แพลตฟอร์มการเรียนรู้ออนไลน์เกี่ยวกับสุขภาพผู้หญิง',
      'คอร์สการออกกำลังกาย โยคะ และการดูแลสุขภาพ',
      'เครื่องมือติดตามความคืบหน้าและสถิติส่วนตัว',
      'คอมมิวนิตี้และการปรึกษาจากผู้เชี่ยวชาญ',
      'เนื้อหาการศึกษาและข้อมูลสุขภาพ'
    ]
  },
  {
    id: 'account',
    title: 'การสร้างและจัดการบัญชี',
    icon: Shield,
    content: [
      'คุณต้องให้ข้อมูลที่ถูกต้องและครบถ้วนในการสร้างบัญชี',
      'คุณรับผิดชอบในการรักษาความลับของรหัสผ่าน',
      'แจ้งเราทันทีหากพบการใช้งานบัญชีที่ไม่ได้รับอนุญาต',
      'บัญชีหนึ่งบัญชีสำหรับใช้งานส่วนตัวเท่านั้น ห้ามแชร์',
      'เราขอสงวนสิทธิ์ในการระงับหรือลบบัญชีที่ละเมิดข้อกำหนด'
    ]
  },
  {
    id: 'payment',
    title: 'การชำระเงินและการยกเลิก',
    icon: CreditCard,
    content: [
      'การชำระเงินทุกครั้งผ่านระบบที่ปลอดภัยและเข้ารหัส',
      'ค่าบริการจะหักอัตโนมัติตามรอบที่เลือก',
      'สามารถยกเลิกการสมัครสมาชิกได้ตลอดเวลาโดยไม่มีค่าปรับ',
      'การยกเลิกจะมีผลในรอบการชำระเงินถัดไป',
      'มีนโยบายคืนเงิน 30 วันสำหรับสมาชิกใหม่',
      'ไม่คืนเงินสำหรับการใช้บริการที่ผ่านมาแล้ว'
    ]
  },
  {
    id: 'usage',
    title: 'การใช้งานที่ยอมรับได้',
    icon: AlertTriangle,
    content: [
      'ใช้บริการเพื่อวัตถุประสงค์ส่วนตัวและถูกกฎหมายเท่านั้น',
      'ห้ามแชร์เนื้อหาหรือบัญชีให้ผู้อื่นใช้งาน',
      'ห้ามดาวน์โหลด คัดลอก หรือแจกจ่ายเนื้อหาโดยไม่ได้รับอนุญาต',
      'ห้ามใช้บริการในการดำเนินกิจกรรมที่ผิดกฎหมาย',
      'ห้ามโพสต์เนื้อหาที่ไม่เหมาะสมหรือขัดต่อศีลธรรม',
      'เคารพผู้ใช้คนอื่นและรักษามารยาทในการสื่อสาร'
    ]
  },
  {
    id: 'intellectual',
    title: 'ทรัพย์สินทางปัญญา',
    icon: Scale,
    content: [
      'เนื้อหาทั้งหมดเป็นลิขสิทธิ์ของ BoostMe หรือผู้เชี่ยวชาญของเรา',
      'คุณได้รับสิทธิ์ใช้งานส่วนตัวที่ไม่สามารถโอนได้',
      'ห้ามนำเนื้อหาไปใช้เชิงพาณิชย์หรือแจกจ่ายต่อ',
      'โลโก้ ชื่อ และเครื่องหมายการค้าเป็นทรัพย์สินของเรา',
      'การละเมิดลิขสิทธิ์อาจถูกดำเนินคดีตามกฎหมาย'
    ]
  },
  {
    id: 'limitation',
    title: 'ข้อจำกัดความรับผิดชอบ',
    icon: Shield,
    content: [
      'บริการให้เพื่อการศึกษาและไม่ทดแทนคำแนะนำทางการแพทย์',
      'คุณควรปรึกษาแพทย์ก่อนเริ่มโปรแกรมการออกกำลังกายใดๆ',
      'เราไม่รับผิดชอบต่อการบาดเจ็บจากการออกกำลังกาย',
      'ไม่รับประกันผลลัพธ์การลดน้ำหนักหรือการปรับปรุงสุขภาพ',
      'ไม่รับผิดชอบต่อความเสียหายทางอ้อมหรือการสูญเสียผลกำไร',
      'ความรับผิดชอบสูงสุดจำกัดอยู่ที่ค่าบริการที่คุณชำระ'
    ]
  }
]

export default function TermsPage() {
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
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <FileText className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              ข้อกำหนดการใช้งาน
            </h1>
            <p className="text-xl text-orange-600 mb-4">
              กฎระเบียบและเงื่อนไขสำหรับการใช้บริการ BoostMe
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
            ข้อกำหนดทั่วไป
          </h2>
          <p className="text-orange-600 leading-relaxed mb-4">
            ยินดีต้อนรับสู่ BoostMe แพลตฟอร์มสุขภาพผู้หญิงออนไลน์ 
            ข้อกำหนดการใช้งานนี้ควบคุมการใช้บริการของคุณ 
            กรุณาอ่านอย่างละเอียดก่อนใช้บริการ
          </p>
          <div className="bg-blue-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-800 font-medium text-sm mb-1">
                  ข้อมูลสำคัญ
                </p>
                <p className="text-orange-700 text-sm">
                  บริการของเราเป็นการให้ข้อมูลและการศึกษาเท่านั้น 
                  ไม่ใช่คำแนะนำทางการแพทย์ กรุณาปรึกษาแพทย์ก่อนเริ่มโปรแกรมการออกกำลังกาย
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Terms Sections */}
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
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
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
              
              {section.id === 'payment' && (
                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-green-800 font-medium mb-2">
                    💳 วิธีการชำระเงินที่รองรับ:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-green-700">
                    <p>• บัตรเครดิต/เดบิต</p>
                    <p>• PromptPay</p>
                    <p>• True Wallet</p>
                    <p>• Mobile Banking</p>
                  </div>
                </div>
              )}

              {section.id === 'limitation' && (
                <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-800 font-medium mb-2">
                        คำเตือนสำคัญ
                      </p>
                      <p className="text-red-700 text-sm">
                        หากคุณมีประวัติการเจ็บป่วย หรือมีข้อจำกัดทางสุขภาพ 
                        กรุณาปรึกษาแพทย์ก่อนเริ่มโปรแกรมการออกกำลังกายใดๆ
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Dispute Resolution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gray-50 rounded-2xl p-8 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            การระงับข้อพิพาท
          </h3>
          <div className="space-y-3 text-orange-600">
            <p>
              • ข้อพิพาทใดๆ จะได้รับการแก้ไขผ่านการเจรจาก่อนเป็นอันดับแรก
            </p>
            <p>
              • หากไม่สามารถแก้ไขได้ จะใช้การไกล่เกลี่ยโดยหน่วยงานที่เป็นกลาง
            </p>
            <p>
              • ข้อกำหนดนี้ใช้กฎหมายไทยเป็นหลักในการตีความ
            </p>
            <p>
              • ศาลไทยมีอำนาจพิจารณาคดีที่เกี่ยวข้องกับข้อกำหนดนี้
            </p>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            ข้อมูลการติดต่อ
          </h3>
          <p className="text-orange-600 mb-4">
            หากมีคำถามเกี่ยวกับข้อกำหนดการใช้งาน สามารถติดต่อเราได้ที่:
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-600">
            <div>
              <p><strong>ชื่อบริษัท:</strong> บูสต์มี จำกัด</p>
              <p><strong>ที่อยู่:</strong> 123 ถนนสุขภาพดี แขวงสุขใจ</p>
              <p>เขตใจดี กรุงเทพฯ 10110</p>
            </div>
            <div>
              <p><strong>อีเมล:</strong> legal@boostme.com</p>
              <p><strong>โทรศัพท์:</strong> 02-123-4567</p>
              <p><strong>เวลาทำการ:</strong> จ-ศ 9:00-18:00 น.</p>
            </div>
          </div>
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
              href="/privacy"
              className="bg-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-700 transition-colors"
            >
              อ่านนโยบายความเป็นส่วนตัว
            </Link>
            <Link
              href="/contact"
              className="border border-orange-600 text-orange-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors"
            >
              ติดต่อสอบถาม
            </Link>
          </div>
          
          <p className="text-sm text-gray-500">
            การใช้บริการแสดงว่าคุณยอมรับข้อกำหนดการใช้งานนี้
          </p>
        </motion.div>
      </div>
    </div>
  )
}