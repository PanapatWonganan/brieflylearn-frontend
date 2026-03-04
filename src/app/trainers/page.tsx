'use client'

import { Award, BookOpen, User, Mail, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const instructors = [
  {
    id: 1,
    name: 'ดร.ณัฐพล วิสุทธิ์',
    title: 'ผู้เชี่ยวชาญ AI Strategy & Business',
    specialties: [
      'AI Strategy สำหรับผู้บริหาร',
      'สร้างธุรกิจด้วย AI & Automation',
      'AI Product Development',
      'Data-Driven Decision Making'
    ],
    experience: '12 ปี',
    bio: 'ดร.ณัฐพลเป็นที่ปรึกษาด้าน AI Transformation ให้กับองค์กรชั้นนำในไทย มีประสบการณ์ช่วยสตาร์ทอัพและ SME นำ AI ไปใช้สร้างธุรกิจจนเติบโตได้จริง',
    certifications: [
      'Ph.D. in Computer Science, Chulalongkorn University',
      'Google Cloud Professional Machine Learning Engineer',
      'ที่ปรึกษา AI Transformation, SCB, AIS, PTT'
    ],
    email: 'nattapon@brieflylearn.com'
  },
  {
    id: 2,
    name: 'พญ.ชนิกา ศรีวัฒนา',
    title: 'ผู้เชี่ยวชาญ AI for Productivity & Well-being',
    specialties: [
      'AI ช่วยเพิ่มประสิทธิภาพการทำงาน',
      'Prompt Engineering สำหรับ Non-Tech',
      'AI Ethics & Responsible AI',
      'Digital Well-being ยุค AI'
    ],
    experience: '8 ปี',
    bio: 'พญ.ชนิกาผสาน Background ด้าน Tech กับ Human-Centered Design เชี่ยวชาญการสอนคนที่ไม่ใช่สาย IT ให้ใช้ AI ได้อย่างมีประสิทธิภาพและมีจริยธรรม',
    certifications: [
      'M.S. in Human-Computer Interaction, Carnegie Mellon',
      'Certified Prompt Engineer, DeepLearning.AI',
      'วิทยากร AI Literacy, DEPA Thailand'
    ],
    email: 'chanika@brieflylearn.com'
  },
  {
    id: 3,
    name: 'รศ.ดร.วรพจน์ อมรเลิศ',
    title: 'ผู้เชี่ยวชาญ AI in Organization & Change Management',
    specialties: [
      'AI Governance & Policy',
      'Change Management สำหรับ AI Adoption',
      'Data Strategy & Architecture',
      'AI Team Building & Upskilling'
    ],
    experience: '15 ปี',
    bio: 'รศ.ดร.วรพจน์เป็นอาจารย์และที่ปรึกษาด้าน Digital Transformation มีประสบการณ์ช่วยองค์กรขนาดใหญ่วาง AI Roadmap และบริหาร Change Management',
    certifications: [
      'Ph.D. in Information Systems, MIT',
      'รองศาสตราจารย์ คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย',
      'ที่ปรึกษา Digital Transformation, ธนาคารแห่งประเทศไทย'
    ],
    email: 'worapoj@brieflylearn.com'
  },
  {
    id: 4,
    name: 'ธนวัฒน์ เศรษฐกุล',
    title: 'ผู้เชี่ยวชาญ AI Automation & No-Code',
    specialties: [
      'AI Workflow Automation (Make, Zapier, n8n)',
      'No-Code/Low-Code Development',
      'ChatGPT API & Custom GPTs',
      'AI สำหรับ E-commerce & Marketing'
    ],
    experience: '7 ปี',
    bio: 'ธนวัฒน์เป็น Founder ที่สร้างธุรกิจ 7 หลักด้วย AI และ Automation เชี่ยวชาญการสอนเจ้าของธุรกิจให้ใช้ AI Tools สร้างรายได้โดยไม่ต้องเขียนโค้ด',
    certifications: [
      'Make (Integromat) Certified Partner',
      'OpenAI API Developer',
      'ผู้เขียนคอลัมน์ "AI for Business" Forbes Thailand'
    ],
    email: 'thanawat@brieflylearn.com'
  }
]

export default function InstructorsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-wider text-ink-muted mb-4">
              ทีมผู้สอน
            </p>
            <h1 className="text-heading font-serif text-ink mb-4">
              ทีมผู้เชี่ยวชาญด้าน AI
            </h1>
            <p className="text-lg text-ink-light">
              ผู้เชี่ยวชาญที่มีประสบการณ์ตรงในการนำ AI ไปใช้สร้างธุรกิจและบริหารองค์กร พร้อมถ่ายทอดให้คุณทำได้จริง
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        {/* Instructors Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="border border-gray-100 rounded-xl p-8"
            >
              {/* Avatar */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-8 w-8 text-ink-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-ink mb-1">
                    {instructor.name}
                  </h3>
                  <p className="text-brand-600 font-medium mb-2">
                    {instructor.title}
                  </p>
                  <div className="flex items-center text-sm text-ink-muted">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>ประสบการณ์ {instructor.experience}</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <p className="text-ink-light text-sm leading-relaxed">
                  {instructor.bio}
                </p>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-ink mb-3">
                  ความเชี่ยวชาญ
                </h4>
                <div className="space-y-2">
                  {instructor.specialties.map((specialty, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-brand-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-ink-light">{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-ink mb-3">
                  คุณวุฒิและใบรับรอง
                </h4>
                <div className="space-y-2">
                  {instructor.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-start">
                      <Award className="h-4 w-4 text-brand-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-ink-light">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center text-sm text-ink-muted">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{instructor.email}</span>
                </div>
                <Link
                  href={`/instructors/${instructor.id}`}
                  className="text-sm text-brand-600 hover:text-brand-700 font-medium"
                >
                  ดูโปรไฟล์
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Join Our Team */}
        <div className="border border-gray-100 rounded-xl p-8 mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold font-serif text-ink mb-4">
              ร่วมเป็นอาจารย์กับเรา
            </h3>
            <p className="text-ink-light mb-8">
              หากคุณเป็นผู้เชี่ยวชาญด้าน AI, Data Science หรือ Digital Transformation
              มีประสบการณ์การสอนหรือนำ AI ไปใช้จริงในธุรกิจและองค์กร เรายินดีต้อนรับคุณเข้าสู่ทีมผู้สอนของ BrieflyLearn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors"
              >
                ติดต่อสมัครงาน
              </Link>
              <Link
                href="/about"
                className="inline-block border border-gray-200 text-ink px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                เรียนรู้เพิ่มเติม
              </Link>
            </div>
          </div>
        </div>

        {/* Why Choose Our Instructors */}
        <div>
          <h3 className="text-2xl font-semibold text-center text-ink mb-12">
            ทำไมต้องเลือกผู้สอนของเรา
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'ประสบการณ์ AI ตรงสาย',
                description: 'ผู้สอนทุกท่านเคยนำ AI ไปใช้จริงในธุรกิจและองค์กร ไม่ใช่แค่สอนทฤษฎี'
              },
              {
                icon: BookOpen,
                title: 'เน้นลงมือทำ ใช้ได้จริง',
                description: 'ทุกคอร์สมี Workshop และ Project ให้นำ AI ไปใช้กับธุรกิจหรือองค์กรได้ทันที'
              },
              {
                icon: CheckCircle,
                title: 'อัปเดตตาม AI ล่าสุด',
                description: 'เนื้อหาอัปเดตตาม AI Tools และเทรนด์ใหม่ล่าสุด ทั้ง ChatGPT, Claude และเครื่องมืออื่นๆ'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-brand-500" />
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-ink mb-2">
                  {item.title}
                </h4>
                <p className="text-ink-light text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
