'use client';

import React from 'react';
import {
  GraduationCap,
  Users,
  Target,
  BookOpen,
  Shield,
  Award,
  Star,
  TrendingUp,
  User
} from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: GraduationCap,
      title: "AI-First Education",
      subtitle: "การศึกษา AI ที่เป็นเลิศ",
      description: "เราออกแบบหลักสูตร AI ด้วยความใส่ใจและมาตรฐานสูง เพื่อให้ผู้เรียนนำ AI ไปใช้สร้างธุรกิจและบริหารองค์กรได้จริง"
    },
    {
      icon: Shield,
      title: "Practical Results",
      subtitle: "ผลลัพธ์ที่จับต้องได้",
      description: "ผู้เรียนกว่า 3,200 คนได้นำ AI ไปใช้จริง ทั้งสร้างธุรกิจออนไลน์ ทำ Automation และเพิ่มประสิทธิภาพการทำงานในองค์กร"
    },
    {
      icon: Users,
      title: "AI Community",
      subtitle: "ชุมชนคนใช้ AI",
      description: "ผู้สอนทุกคนเป็นผู้เชี่ยวชาญที่นำ AI ไปใช้จริง พร้อมชุมชนผู้เรียนที่แลกเปลี่ยนไอเดียและประสบการณ์ AI ระหว่างกัน"
    },
    {
      icon: TrendingUp,
      title: "Always Updated",
      subtitle: "อัปเดตตาม AI ล่าสุด",
      description: "เนื้อหาอัปเดตตาม AI Tools และเทรนด์ใหม่อยู่เสมอ ทั้ง ChatGPT, Claude, Midjourney และเครื่องมืออื่นๆ ที่เปลี่ยนแปลงเร็ว"
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "ก่อตั้ง Antipararell",
      description: "เริ่มต้นด้วยวิสัยทัศน์ช่วยคนไทยนำ AI ไปใช้สร้างธุรกิจและบริหารองค์กร"
    },
    {
      year: "Q3 2024",
      title: "เปิดตัว 2 เส้นทาง AI",
      description: "เปิดตัว Entrepreneur Track และ Leader Track สำหรับผู้เรียนที่มีเป้าหมายต่างกัน"
    },
    {
      year: "Q1 2025",
      title: "1,000+ ผู้เรียน",
      description: "มีผู้เรียนนำ AI ไปใช้จริงมากกว่า 1,000 คน ทั้งสร้างธุรกิจและบริหารทีม"
    },
    {
      year: "2026",
      title: "3,200+ ผู้เรียน",
      description: "ขยายคอร์ส AI ครอบคลุม Prompt Engineering, Automation และ AI Strategy"
    }
  ];

  const teamMembers = [
    {
      name: "ดร.ณัฐพล วิสุทธิ์",
      role: "AI Strategy & Business",
      specialty: "ผู้เชี่ยวชาญ AI Transformation",
      description: "ที่ปรึกษา AI ให้องค์กรชั้นนำ ประสบการณ์ 12 ปี"
    },
    {
      name: "พญ.ชนิกา ศรีวัฒนา",
      role: "AI for Productivity",
      specialty: "ผู้เชี่ยวชาญ Prompt Engineering",
      description: "M.S. HCI จาก Carnegie Mellon, Certified Prompt Engineer"
    },
    {
      name: "รศ.ดร.วรพจน์ อมรเลิศ",
      role: "AI in Organization",
      specialty: "ผู้เชี่ยวชาญ Digital Transformation",
      description: "Ph.D. จาก MIT, ที่ปรึกษา AI Governance"
    },
    {
      name: "ธนวัฒน์ เศรษฐกุล",
      role: "AI Automation & No-Code",
      specialty: "ผู้เชี่ยวชาญ AI Workflow Automation",
      description: "Founder ที่สร้างธุรกิจ 7 หลักด้วย AI"
    }
  ];

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="py-24 bg-gray-900 border-b border-gray-700/50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-6 font-medium">
              เกี่ยวกับเรา
            </p>

            <h1 className="text-heading font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              แพลตฟอร์มเรียน AI เพื่อสร้างธุรกิจและบริหารองค์กร
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed">
              เราคือแพลตฟอร์มเรียน AI ออนไลน์ที่ช่วยให้คนไทยมากกว่า 3,200 คน
              นำ AI ไปใช้จริง ทั้งสร้างธุรกิจส่วนตัวและบริหารองค์กรให้ก้าวหน้า
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            <div className="space-y-12">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="h-6 w-6 text-mint-400" />
                  <h2 className="text-2xl font-bold font-serif text-gray-200">พันธกิจของเรา</h2>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed">
                  ช่วยให้คนไทยทุกคนสามารถเรียนรู้และนำ AI ไปใช้จริงได้ ไม่ว่าจะเป็นการสร้างธุรกิจส่วนตัว
                  หรือบริหารองค์กรให้ก้าวหน้า ด้วยหลักสูตรที่เน้นลงมือทำจริงจากผู้เชี่ยวชาญ
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <BookOpen className="h-6 w-6 text-mint-400" />
                  <h2 className="text-2xl font-bold font-serif text-gray-200">วิสัยทัศน์</h2>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed">
                  เป็นแพลตฟอร์มเรียน AI อันดับ 1 ของประเทศไทย ที่ช่วยให้ทุกคนนำ AI ไปใช้สร้างธุรกิจ
                  และบริหารองค์กรได้จริง ด้วยเนื้อหาที่อัปเดตตาม AI ล่าสุดเสมอ
                </p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-sm p-8 border border-gray-700/50 shadow-card">
              <h3 className="text-2xl font-bold text-gray-200 mb-6">ทำไมถึงเลือก Antipararell?</h3>

              <div className="space-y-6 text-gray-400 leading-relaxed">
                <p>
                  เราเห็นว่า AI กำลังเปลี่ยนโลกธุรกิจ แต่คนส่วนใหญ่ยังไม่รู้จะเริ่มต้นอย่างไร
                </p>
                <p>
                  คอร์ส AI ที่มีอยู่มักเน้นทฤษฎีเทคนิค ขาดการเชื่อมโยงกับการใช้งานจริงในธุรกิจและองค์กร
                </p>
                <p>
                  เราจึงสร้าง Antipararell เพื่อให้ทุกคนเรียนรู้ AI แล้วนำไปใช้ได้จริง
                  ไม่ว่าจะสร้างธุรกิจส่วนตัวหรือบริหารทีมในองค์กร
                </p>

                <p className="text-gray-200 font-medium pt-4">
                  - ทีมก่อตั้ง Antipararell
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-200 mb-4">
              ค่านิยมของเรา
            </h2>
            <p className="text-xl text-gray-400">
              หลักการที่เราใช้ในการสร้างสรรค์หลักสูตรและให้บริการ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-900 rounded-sm p-8 border border-gray-700/50 shadow-card"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Icon className="h-6 w-6 text-mint-400" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-200">{value.title}</h3>
                        <p className="text-gray-400 font-medium">{value.subtitle}</p>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline/Milestones */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-200 mb-4">
              เส้นทางความสำเร็จ
            </h2>
            <p className="text-xl text-gray-400">
              การเติบโตและพัฒนาของ Antipararell
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="space-y-4">
                <div className="text-4xl font-bold text-mint-400">
                  {milestone.year}
                </div>
                <h3 className="text-lg font-semibold text-gray-200">{milestone.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-200 mb-4">
              ทีมผู้เชี่ยวชาญด้าน AI
            </h2>
            <p className="text-xl text-gray-400">
              ผู้สอนที่มีประสบการณ์ตรงในการนำ AI ไปใช้สร้างธุรกิจและบริหารองค์กร
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-sm p-6 border border-gray-700/50 shadow-card"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-200 mb-1 text-center">{member.name}</h3>
                <p className="text-gray-400 text-sm mb-2 text-center">{member.role}</p>
                <p className="text-gray-200 text-sm font-medium mb-3 text-center">{member.specialty}</p>
                <p className="text-gray-500 text-xs leading-relaxed text-center">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-900 border-t border-gray-700/50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-200 mb-4">
              ผลงานที่เราภูมิใจ
            </h2>
            <p className="text-xl text-gray-400">
              ความสำเร็จของผู้เรียนคือความสำเร็จของเรา
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "3,200+", label: "ผู้เรียน AI ทั่วประเทศ", icon: Users },
              { number: "4.7", label: "คะแนนความพึงพอใจ", icon: Star },
              { number: "15+", label: "คอร์ส AI ครบทุกเส้นทาง", icon: BookOpen },
              { number: "92%", label: "นำ AI ไปใช้จริงได้", icon: Award }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-3">
                  <Icon className="h-8 w-8 text-mint-400 mx-auto" />
                  <div className="text-3xl font-bold text-gray-200">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-900 border border-gray-700/50 flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-mint-400" />
            </div>
          </div>

          <h2 className="text-3xl font-bold font-serif text-gray-200 mb-4">
            พร้อมเริ่มต้นเส้นทางสู่ความสำเร็จแล้วหรือยัง?
          </h2>

          <p className="text-xl text-gray-400 mb-8">
            เข้าร่วมกับผู้เรียนกว่า 3,200 คนที่กำลังเรียนรู้ AI เพื่อสร้างอนาคตกับ Antipararell
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-mint-600 text-white px-8 py-4 rounded-sm font-semibold text-lg hover:bg-mint-500 transition-colors">
              เริ่มเรียนเลย
            </button>
            <button className="border-2 border-gray-700 text-gray-200 px-8 py-4 rounded-sm font-semibold text-lg hover:bg-gray-800/50 transition-colors">
              ดูคอร์สทั้งหมด
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
