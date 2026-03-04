'use client'

import { FileText, AlertTriangle, CreditCard, Users, Shield, Scale, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    id: 'acceptance',
    title: 'การยอมรับข้อกำหนด',
    icon: FileText,
    content: [
      'การใช้บริการแพลตฟอร์ม BrieflyLearn ถือว่าคุณยอมรับข้อกำหนดการใช้งานนี้',
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
      'แพลตฟอร์มเรียน AI ออนไลน์เพื่อสร้างธุรกิจและบริหารองค์กร',
      'คอร์ส AI Strategy, Prompt Engineering, AI Automation และอื่นๆ',
      'เครื่องมือติดตามความคืบหน้าและสถิติส่วนตัว',
      'คอมมิวนิตี้และการปรึกษาจากผู้เชี่ยวชาญ',
      'เนื้อหาการศึกษาและข้อมูลที่คัดสรรมาอย่างดี'
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
      'เนื้อหาทั้งหมดเป็นลิขสิทธิ์ของ BrieflyLearn หรือผู้เชี่ยวชาญของเรา',
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
      'บริการให้เพื่อการศึกษาเท่านั้น',
      'เราไม่รับประกันผลลัพธ์เฉพาะเจาะจงจากการเรียนรู้',
      'ไม่รับผิดชอบต่อความเสียหายทางอ้อมหรือการสูญเสียผลกำไร',
      'ความรับผิดชอบสูงสุดจำกัดอยู่ที่ค่าบริการที่คุณชำระ'
    ]
  }
]

export default function TermsPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto pt-24 pb-16">
        <div className="max-w-3xl">
          <p className="text-xs tracking-widest uppercase text-ink-muted mb-3">ข้อกำหนด</p>
          <h1 className="text-heading font-serif text-ink mb-4">
            ข้อกำหนดการใช้งาน
          </h1>
          <p className="text-base text-ink-light leading-relaxed mb-2">
            กฎระเบียบและเงื่อนไขสำหรับการใช้บริการ BrieflyLearn
          </p>
          <p className="text-xs text-ink-muted">
            อัปเดตล่าสุด: 15 มกราคม 2024
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto py-16 border-t border-gray-100">
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold text-ink mb-4">ข้อกำหนดทั่วไป</h2>
          <p className="text-sm text-ink-light leading-relaxed mb-4">
            ยินดีต้อนรับสู่ BrieflyLearn แพลตฟอร์มเรียน AI ออนไลน์
            ข้อกำหนดการใช้งานนี้ควบคุมการใช้บริการของคุณ
            กรุณาอ่านอย่างละเอียดก่อนใช้บริการ
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-ink-muted mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-ink mb-1">
                  ข้อมูลสำคัญ
                </p>
                <p className="text-sm text-ink-light">
                  บริการของเราเป็นการให้ข้อมูลและการศึกษาเท่านั้น
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Sections */}
      {sections.map((section) => (
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

            {section.id === 'payment' && (
              <div className="mt-6 p-5 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-ink mb-3">
                  วิธีการชำระเงินที่รองรับ:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-ink-light">
                  <p>- บัตรเครดิต/เดบิต</p>
                  <p>- PromptPay</p>
                  <p>- True Wallet</p>
                  <p>- Mobile Banking</p>
                </div>
              </div>
            )}

            {section.id === 'limitation' && (
              <div className="mt-6 p-5 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-ink-muted mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-ink mb-1">
                      หมายเหตุ
                    </p>
                    <p className="text-sm text-ink-light">
                      เนื้อหาทั้งหมดจัดทำเพื่อการเรียนรู้ AI และการนำไปใช้ในธุรกิจ
                      ผลลัพธ์อาจแตกต่างกันไปตามแต่ละบุคคล
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Dispute Resolution */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto py-12 border-t border-gray-100">
        <div className="max-w-3xl">
          <h3 className="text-lg font-semibold text-ink mb-4">
            การระงับข้อพิพาท
          </h3>
          <ul className="space-y-3 text-sm text-ink-light">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-ink-faint rounded-full mt-2 flex-shrink-0"></div>
              ข้อพิพาทใดๆ จะได้รับการแก้ไขผ่านการเจรจาก่อนเป็นอันดับแรก
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-ink-faint rounded-full mt-2 flex-shrink-0"></div>
              หากไม่สามารถแก้ไขได้ จะใช้การไกล่เกลี่ยโดยหน่วยงานที่เป็นกลาง
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-ink-faint rounded-full mt-2 flex-shrink-0"></div>
              ข้อกำหนดนี้ใช้กฎหมายไทยเป็นหลักในการตีความ
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-ink-faint rounded-full mt-2 flex-shrink-0"></div>
              ศาลไทยมีอำนาจพิจารณาคดีที่เกี่ยวข้องกับข้อกำหนดนี้
            </li>
          </ul>
        </div>
      </section>

      {/* Contact Information */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto py-12 border-t border-gray-100">
        <div className="max-w-3xl">
          <h3 className="text-lg font-semibold text-ink mb-4">
            ข้อมูลการติดต่อ
          </h3>
          <p className="text-sm text-ink-light mb-4">
            หากมีคำถามเกี่ยวกับข้อกำหนดการใช้งาน สามารถติดต่อเราได้ที่:
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-ink-light">
            <div className="space-y-1">
              <p><span className="font-medium text-ink">ชื่อบริษัท:</span> BrieflyLearn</p>
              <p><span className="font-medium text-ink">ที่อยู่:</span> 123 ถนนสุขภาพดี แขวงสุขใจ</p>
              <p>เขตใจดี กรุงเทพฯ 10110</p>
            </div>
            <div className="space-y-1">
              <p><span className="font-medium text-ink">อีเมล:</span> legal@brieflylearn.com</p>
              <p><span className="font-medium text-ink">โทรศัพท์:</span> 02-123-4567</p>
              <p><span className="font-medium text-ink">เวลาทำการ:</span> จ-ศ 9:00-18:00 น.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="px-5 sm:px-8 max-w-6xl mx-auto py-24 border-t border-gray-100">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/privacy"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-ink text-white text-sm font-medium rounded-lg hover:bg-ink-light transition-colors"
            >
              อ่านนโยบายความเป็นส่วนตัว
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm text-ink-light font-medium border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
            >
              ติดต่อสอบถาม
            </Link>
          </div>
          <p className="text-xs text-ink-muted mt-6">
            การใช้บริการแสดงว่าคุณยอมรับข้อกำหนดการใช้งานนี้
          </p>
        </div>
      </section>
    </div>
  )
}
