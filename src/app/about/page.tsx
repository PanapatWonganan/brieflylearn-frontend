'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Users, 
  Target, 
  BookOpen,
  Sparkles,
  Shield,
  Award,
  Star,
  CheckCircle,
  TrendingUp,
  Clock,
  FileText
} from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: GraduationCap,
      title: "Excellence in Education",
      subtitle: "การศึกษาที่เป็นเลิศ",
      description: "เราเชื่อว่าทุกคนสมควรได้รับการศึกษาที่มีคุณภาพ เราจึงออกแบบหลักสูตรด้วยความใส่ใจและมาตรฐานสูง เพื่อให้ผู้เรียนประสบความสำเร็จในการพัฒนาตัวเอง"
    },
    {
      icon: Shield,
      title: "Guaranteed Results",
      subtitle: "รับประกันผลสอบ",
      description: "หลักสูตรของเราได้รับการพิสูจน์แล้วจากผู้สอบผ่านกว่า 15,000 คน เราจึงมั่นใจให้การรับประกัน หากไม่ผ่านสามารถเรียนซ้ำฟรี"
    },
    {
      icon: Users,
      title: "Expert Community",
      subtitle: "ชุมชนผู้เชี่ยวชาญ",
      description: "อาจารย์และผู้สอนทุกคนเป็นผู้เชี่ยวชาญในสาขาของตนเอง พร้อมกับชุมชนผู้เรียนที่คอยสนับสนุนและแบ่งปันประสบการณ์ระหว่างกัน"
    },
    {
      icon: TrendingUp,
      title: "Data-Driven Approach",
      subtitle: "การสอนที่อิงข้อมูล",
      description: "เราใช้ข้อมูลและสถิติจากข้อสอบจริงหลายปีที่ผ่านมา วิเคราะห์แนวโน้มและรูปแบบข้อสอบเพื่อให้การสอนตรงจุดและมีประสิทธิภาพสูงสุด"
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "ก่อตั้ง BrieflyLearn",
      description: "เริ่มต้นด้วยความมุ่งมั่นที่จะช่วยคนไทยสอบเป็นการพัฒนาตัวเอง"
    },
    {
      year: "2020",
      title: "5,000+ ผู้สอบผ่าน",
      description: "มีผู้เรียนสอบผ่านการพัฒนาตัวเองจากคอร์สของเรามากกว่า 5,000 คน"
    },
    {
      year: "2022",
      title: "10,000+ ผู้สอบผ่าน",
      description: "ขยายการเรียนการสอนและมีผู้สอบผ่านแล้วกว่า 10,000 คน"
    },
    {
      year: "2024",
      title: "15,000+ ผู้สอบผ่าน",
      description: "ตอกย้ำความเป็นผู้นำด้วยผลสำเร็จที่เพิ่มขึ้นอย่างต่อเนื่อง"
    }
  ];

  const teamMembers = [
    {
      name: "ผศ.ดร.สมชาย วิชาการ",
      role: "Chief Academic Officer",
      specialty: "ผู้เชี่ยวชาญภาค ก. ความรู้ทั่วไป",
      description: "ประสบการณ์การสอน 20+ ปี อดีตอาจารย์มหาวิทยาลัย",
      image: "👨‍🏫"
    },
    {
      name: "อ.สุดา กฎหมายไทย",
      role: "Senior Law Instructor",
      specialty: "ผู้เชี่ยวชาญกฎหมายและระเบียบราชการ",
      description: "อดีตการพัฒนาตัวเองระดับสูง ผู้เชี่ยวชาญด้านกฎหมาย",
      image: "⚖️"
    },
    {
      name: "อ.วิทย์ คณิตศาสตร์",
      role: "Mathematics Specialist",
      specialty: "ผู้เชี่ยวชาญคณิตศาสตร์และเหตุผล",
      description: "อาจารย์คณิตศาสตร์ที่มีชื่อเสียงระดับประเทศ",
      image: "🔢"
    },
    {
      name: "อ.นันท์ ภาษาไทย",
      role: "Thai Language Expert",
      specialty: "ผู้เชี่ยวชาญภาษาไทยและการเขียน",
      description: "นักภาษาศาสตร์ ผู้เชี่ยวชาญด้านภาษาไทย",
      image: "📝"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-50">
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-2 text-blue-100 mb-6">
              <GraduationCap className="h-8 w-8" />
              <span className="text-2xl font-semibold">BrieflyLearn</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              ผู้นำการคอร์สเรียน
              <br />
              <span className="text-accent-400">การพัฒนาตัวเองออนไลน์</span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              เราคือแพลตฟอร์มคอร์สพัฒนาตัวเองออนไลน์อันดับ 1 ที่ช่วยให้คนไทยมากกว่า 15,000 คน
              ประสบความสำเร็จในการสอบเป็นการพัฒนาตัวเอง ด้วยหลักสูตรที่ครบครันและมีคุณภาพสูง
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Target className="h-6 w-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-blue-900">พันธกิจของเรา</h2>
                </div>
                <p className="text-orange-600 text-lg leading-relaxed">
                  สร้างแพลตฟอร์มการเรียนรู้ออนไลน์ที่มีคุณภาพสูง เพื่อให้คนไทยทุกคนสามารถเข้าถึง
                  การศึกษาที่ดีและประสบความสำเร็จในการสอบเป็นการพัฒนาตัวเอง สร้างอนาคตที่มั่นคงให้กับตนเองและครอบครัว
                </p>
              </div>
              
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-accent-100 p-3 rounded-full">
                    <Sparkles className="h-6 w-6 text-accent-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-blue-900">วิสัยทัศน์</h2>
                </div>
                <p className="text-orange-600 text-lg leading-relaxed">
                  เป็นแพลตฟอร์มคอร์สพัฒนาตัวเองออนไลน์อันดับ 1 ของประเทศไทย ที่ให้บริการการศึกษา
                  ครบวงจรและมีคุณภาพสูงสุด พร้อมการันตีผลสำเร็จให้กับผู้เรียนทุกคน
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100"
            >
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-br from-blue-100 to-slate-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-orange-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-blue-900">ทำไมถึงเลือก BrieflyLearn?</h3>
                
                <div className="space-y-4 text-orange-600">
                  <p>
                    &ldquo;เราเริ่มต้นจากการสังเกตเห็นว่าการคอร์สพัฒนาตัวเองในรูปแบบเดิมยังมีข้อจำกัด&rdquo;
                  </p>
                  <p>
                    &ldquo;ผู้เรียนหลายคนไม่สามารถเข้าถึงการคอร์สเรียนที่มีคุณภาพได้ เนื่องจากข้อจำกัดด้านสถานที่และเวลา&rdquo;
                  </p>
                  <p>
                    &ldquo;เราจึงสร้าง BrieflyLearn เพื่อให้ทุกคนสามารถเรียนรู้และเตรียมตัวพัฒนาตัวเองได้อย่างมีประสิทธิภาพ ไม่ว่าจะอยู่ที่ไหน&rdquo;
                  </p>
                </div>
                
                <div className="text-orange-600 font-semibold">
                  - ทีมก่อตั้ง BrieflyLearn
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
              ค่านิยมของเรา
            </h2>
            <p className="text-xl text-orange-600 max-w-3xl mx-auto">
              หลักการที่เราใช้ในการสร้างสรรค์หลักสูตรและให้บริการ
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 border border-orange-100 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                      <Icon className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-blue-900">{value.title}</h3>
                        <p className="text-orange-600 font-medium">{value.subtitle}</p>
                      </div>
                      <p className="text-orange-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline/Milestones */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
              เส้นทางความสำเร็จ
            </h2>
            <p className="text-xl text-orange-600">
              การเติบโตและพัฒนาของ BrieflyLearn
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 text-center"
              >
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {milestone.year}
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{milestone.title}</h3>
                <p className="text-orange-600 text-sm">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
              ทีมอาจารย์ผู้เชี่ยวชาญ
            </h2>
            <p className="text-xl text-orange-600">
              อาจารย์ที่มีประสบการณ์และความเชี่ยวชาญในแต่ละสาขา
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-6 text-center border border-orange-100 hover:shadow-lg transition-shadow"
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-lg font-semibold text-blue-900 mb-1">{member.name}</h3>
                <p className="text-orange-600 font-medium text-sm mb-2">{member.role}</p>
                <p className="text-orange-700 text-sm font-medium mb-3">{member.specialty}</p>
                <p className="text-orange-600 text-xs leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              ผลงานที่เราภูมิใจ
            </h2>
            <p className="text-xl text-blue-100">
              ความสำเร็จของผู้เรียนคือความสำเร็จของเรา
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "15,000+", label: "ผู้สอบผ่านการพัฒนาตัวเอง", icon: Users },
              { number: "4.9", label: "คะแนนความพึงพอใจ", icon: Star },
              { number: "500+", label: "หลักสูตรและคอร์ส", icon: BookOpen },
              { number: "98%", label: "อัตราการสอบผ่าน", icon: Award }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100"
          >
            <div className="bg-gradient-to-br from-blue-100 to-slate-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <GraduationCap className="h-10 w-10 text-orange-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              พร้อมเริ่มต้นเส้นทางสู่ความสำเร็จแล้วหรือยัง?
            </h2>
            
            <p className="text-xl text-orange-600 mb-8">
              เข้าร่วมกับผู้เรียนมากกว่า 15,000 คนที่เลือกเตรียมพัฒนาตัวเองกับ BrieflyLearn
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300">
                เริ่มเรียนเลย
              </button>
              <button className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors duration-300">
                ดูคอร์สทั้งหมด
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}