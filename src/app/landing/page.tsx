'use client';

import React from 'react';
import {
  BookOpen,
  Users,
  CheckCircle,
  Award,
  Target,
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react';

export default function LandingPage() {
  const stats = [
    { number: "3,200+", label: "ผู้เรียนที่เชื่อมั่น" },
    { number: "92%", label: "อัตราความพึงพอใจ" },
    { number: "4.7/5", label: "คะแนนรีวิวเฉลี่ย" },
    { number: "24/7", label: "เข้าถึงเนื้อหา" }
  ];

  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-brand-600" />,
      title: "เนื้อหา AI ครบจบ",
      desc: "ตั้งแต่พื้นฐาน AI ไปจนถึง Prompt Engineering, Automation และ AI Strategy สำหรับธุรกิจและองค์กร"
    },
    {
      icon: <Target className="w-6 h-6 text-brand-600" />,
      title: "2 เส้นทางชัดเจน",
      desc: "เลือกเส้นทาง Entrepreneur สร้างธุรกิจด้วย AI หรือ Leader นำ AI เข้าองค์กร ตามเป้าหมายของคุณ"
    },
    {
      icon: <Users className="w-6 h-6 text-brand-600" />,
      title: "ชุมชนคนใช้ AI",
      desc: "แลกเปลี่ยนไอเดียกับผู้เรียนที่กำลังนำ AI ไปใช้จริง ทั้งสร้างธุรกิจและบริหารองค์กร"
    },
    {
      icon: <Clock className="w-6 h-6 text-brand-600" />,
      title: "เรียนได้ทุกที่ทุกเวลา",
      desc: "เข้าถึงเนื้อหาผ่านอุปกรณ์ทุกชนิด พร้อมแบบฝึกหัดที่ลงมือทำได้ทันที"
    }
  ];

  const testimonials = [
    {
      name: "คุณพิชญา ธ.",
      text: "เรียนคอร์ส AI สร้างธุรกิจแล้วเปิดตาเลย ผมใช้ AI ทำ content และ automation จนเปิดร้านออนไลน์ได้โดยไม่ต้องจ้างคนเพิ่ม รายได้เดือนแรก 5 หลัก",
      result: "สร้างธุรกิจออนไลน์ด้วย AI",
      role: "Founder, E-commerce"
    },
    {
      name: "คุณธนภัทร ว.",
      text: "ในฐานะ CTO ผมต้องตัดสินใจเรื่อง AI ให้องค์กร คอร์ส AI Strategy ช่วยให้เห็นภาพชัด วางแผนได้ถูกจุด ตอนนี้ทีมใช้ AI ลดงานซ้ำซ้อนไปได้ 40%",
      result: "นำ AI เข้าองค์กรสำเร็จ",
      role: "CTO, Tech Startup"
    },
    {
      name: "คุณณิชา ส.",
      text: "จากที่ไม่รู้อะไรเกี่ยวกับ AI เลย ตอนนี้ใช้ Prompt Engineering ทำงาน HR ได้เร็วขึ้น 3 เท่า ทั้งเขียน JD คัดใบสมัคร และวิเคราะห์ข้อมูลพนักงาน",
      result: "เพิ่มประสิทธิภาพงาน 3 เท่า",
      role: "HR Business Partner"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-3xl">
            <h1 className="text-display font-serif mb-6 text-ink leading-tight">
              เรียนรู้ AI<br/>
              สร้างธุรกิจ &middot; บริหารองค์กร
            </h1>

            <p className="text-subheading text-ink-light mb-10 leading-relaxed max-w-2xl">
              แพลตฟอร์มเรียน AI ออนไลน์สำหรับคนที่อยากนำ AI ไปใช้จริง
              ทั้งสร้างธุรกิจส่วนตัวและบริหารองค์กรให้ก้าวหน้า
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-ink text-white px-8 py-4 rounded-lg font-medium text-lg transition-opacity hover:opacity-90">
                เริ่มต้นเรียนฟรี
              </button>
              <button className="border border-gray-200 text-ink px-8 py-4 rounded-lg font-medium text-lg transition-colors hover:bg-gray-50">
                ดูคอร์สเรียน
              </button>
            </div>

            <div className="flex items-center gap-8 text-sm text-ink-muted">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-600" />
                <span>ไม่มีค่าใช้จ่ายเริ่มต้น</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-600" />
                <span>ยกเลิกได้ทุกเวลา</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-medium text-brand-600 mb-2">{stat.number}</div>
                <div className="text-sm text-ink-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-heading font-serif text-ink mb-4">
              ออกแบบมาเพื่อการเรียน AI ที่ได้ผลจริง
            </h2>
            <p className="text-subheading text-ink-light leading-relaxed">
              ระบบที่ช่วยให้คุณนำ AI ไปใช้ได้จริง ไม่ใช่แค่รู้ทฤษฎี
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 p-8 rounded-lg transition-shadow hover:shadow-sm"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium text-ink mb-3">{feature.title}</h3>
                <p className="text-ink-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-heading font-serif text-ink mb-4">
              ผู้ที่ประสบความสำเร็จ
            </h2>
            <p className="text-subheading text-ink-light leading-relaxed">
              เรื่องเล่าจากผู้ที่ใช้แพลตฟอร์มของเราเพื่อบรรลุเป้าหมาย
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="border-t border-gray-100 pt-8"
              >
                <blockquote className="text-ink-light mb-8 leading-relaxed">
                  {testimonial.text}
                </blockquote>

                <div>
                  <div className="font-medium text-ink mb-1">{testimonial.name}</div>
                  <div className="text-sm text-brand-600 mb-1">{testimonial.result}</div>
                  <div className="text-sm text-ink-muted">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Value Section */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="mb-4">
                <Award className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-medium text-ink mb-3">อัปเดต AI ล่าสุด</h3>
              <p className="text-ink-light leading-relaxed">
                เนื้อหาอัปเดตตาม AI Tools ใหม่ล่าสุด ทั้ง ChatGPT, Claude, Midjourney
                และเครื่องมืออื่นๆ ที่เปลี่ยนแปลงเร็ว
              </p>
            </div>

            <div>
              <div className="mb-4">
                <TrendingUp className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-medium text-ink mb-3">วัดผลได้จริง</h3>
              <p className="text-ink-light leading-relaxed">
                แบบประเมิน AI Readiness และระบบติดตามความก้าวหน้า
                ช่วยให้คุณรู้ว่าต้องพัฒนาอะไรต่อ
              </p>
            </div>

            <div>
              <div className="mb-4">
                <Shield className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-medium text-ink mb-3">ลงมือทำจริง</h3>
              <p className="text-ink-light leading-relaxed">
                ทุกคอร์สมี Workshop และ Project ให้ลงมือปฏิบัติ
                จบแล้วนำไปใช้กับธุรกิจหรือองค์กรได้ทันที
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-heading font-serif text-ink mb-6">
            พร้อมที่จะเริ่มต้นแล้วหรือยัง
          </h2>

          <p className="text-subheading text-ink-light mb-10 leading-relaxed">
            เข้าร่วมกับผู้เรียนหลายพันคนที่กำลังเรียนรู้ AI เพื่อสร้างอนาคต
          </p>

          <button className="bg-ink text-white px-8 py-4 rounded-lg font-medium text-lg transition-opacity hover:opacity-90">
            เริ่มต้นเรียนวันนี้
          </button>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-ink-muted">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>ทดลองใช้ฟรี</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>ไม่ต้องใช้บัตรเครดิต</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
