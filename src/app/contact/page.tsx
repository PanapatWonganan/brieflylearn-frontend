'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  CheckCircle,
  Facebook,
  Instagram,
  Youtube,
  Users,
  BookOpen,
  Award,
  Target,
  HeadphonesIcon
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "อีเมล",
      value: "info@exammaster.com",
      description: "ตอบกลับภายใน 24 ชั่วโมง",
      action: "mailto:info@exammaster.com"
    },
    {
      icon: Phone,
      title: "โทรศัพท์",
      value: "02-987-6543",
      description: "จันทร์-ศุกร์ 9:00-18:00",
      action: "tel:029876543"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      value: "แชทสด",
      description: "พร้อมให้คำปรึกษาทันที",
      action: "#"
    },
    {
      icon: MapPin,
      title: "ที่ตั้ง",
      value: "กรุงเทพมหานคร",
      description: "เลขที่ 123 ถนนราชดำเนิน เขตพระนคร",
      action: "#"
    }
  ];

  const supportCategories = [
    {
      icon: BookOpen,
      title: "คำปรึกษาการเลือกคอร์ส",
      description: "แนะนำคอร์สที่เหมาะสมกับเป้าหมายและระดับการศึกษา",
      available: "ทุกวัน 8:00-20:00"
    },
    {
      icon: Target,
      title: "เทคนิคการสอบ",
      description: "วิธีการทำข้อสอบและกลยุทธ์การสอบแต่ละภาค",
      available: "จันทร์-ศุกร์ 9:00-18:00"
    },
    {
      icon: Award,
      title: "การเตรียมตัวสอบ",
      description: "วางแผนการเรียนและตารางเวลาคอร์สเรียน",
      available: "จันทร์,พุธ,ศุกร์ 10:00-16:00"
    },
    {
      icon: Users,
      title: "ชุมชนผู้เรียน",
      description: "เข้าร่วมกลุ่มสนับสนุนและแชร์ประสบการณ์การเรียน",
      available: "ตลอด 24 ชั่วโมง"
    }
  ];

  const faqTopics = [
    {
      category: "คอร์สเรียน",
      questions: [
        "คอร์สไหนเหมาะกับผู้เริ่มต้น?",
        "ราคาและแพ็กเกจมีอะไรบ้าง?",
        "สามารถยกเลิกการสมัครได้หรือไม่?"
      ]
    },
    {
      category: "การสอบ",
      questions: [
        "วิธีสมัครพัฒนาตัวเองอย่างไร?",
        "เทคนิคการทำข้อสอบแต่ละภาคคืออะไร?",
        "ถ้าสอบไม่ผ่านควรทำอย่างไร?"
      ]
    },
    {
      category: "เทคนิค",
      questions: [
        "ใช้งานผ่านมือถือได้หรือไม่?",
        "ดาวน์โหลดเนื้อหาเก็บไว้ได้หรือไม่?",
        "เข้าใช้งานไม่ได้ควรทำอย่างไร?"
      ]
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
              <MessageCircle className="h-8 w-8" />
              <span className="text-2xl font-semibold">ติดต่อเรา</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              ให้เราช่วยคุณ
              <br />
              <span className="text-accent-400">ผ่านการพัฒนาตัวเอง</span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              ทีมผู้เชี่ยวชาญของเราพร้อมให้คำปรึกษาและแนะนำเส้นทางการเตรียมพัฒนาตัวเอง
              ไม่ว่าจะเป็นการเลือกคอร์ส วิธีการเรียน หรือเทคนิคการสอบ
            </p>
            
            <div className="flex items-center justify-center space-x-8 mt-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>ตอบภายใน 24 ชม.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>ปรึกษาฟรี</span>
              </div>
              <div className="flex items-center space-x-2">
                <HeadphonesIcon className="h-5 w-5" />
                <span>20+ ผู้เชี่ยวชาญ</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
              วิธีติดต่อเรา
            </h2>
            <p className="text-xl text-orange-600">
              เลือกช่องทางที่สะดวกสำหรับคุณ
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={index}
                  href={info.action}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 hover:shadow-lg transition-all duration-300 text-center group"
                >
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <Icon className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">{info.title}</h3>
                  <p className="text-orange-600 font-medium mb-2">{info.value}</p>
                  <p className="text-orange-600 text-sm">{info.description}</p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Support */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 border border-orange-100"
            >
              <div className="text-center mb-8">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">ส่งข้อความถึงเรา</h3>
                <p className="text-orange-600">เราจะติดต่อกลับภายใน 24 ชั่วโมง</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-orange-700 mb-2">
                      ชื่อ-นามสกุล *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                      placeholder="กรุณากรอกชื่อ-นามสกุล"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-orange-700 mb-2">
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                      placeholder="08X-XXX-XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-orange-700 mb-2">
                    อีเมล *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-orange-700 mb-2">
                    ประเภทการติดต่อ *
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                  >
                    <option value="">เลือกประเภท</option>
                    <option value="course">สอบถามเกี่ยวกับคอร์ส</option>
                    <option value="exam_tips">ขอคำแนะนำการสอบ</option>
                    <option value="study_plan">วางแผนการเรียน</option>
                    <option value="technical">ปัญหาทางเทคนิค</option>
                    <option value="payment">การชำระเงิน</option>
                    <option value="other">อื่นๆ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-orange-700 mb-2">
                    หัวข้อ *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                    placeholder="หัวข้อที่ต้องการปรึกษา"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-orange-700 mb-2">
                    รายละเอียด *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors resize-none"
                    placeholder="กรุณาอธิบายรายละเอียดที่ต้องการปรึกษา..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSubmitted
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-blue-600 hover:to-indigo-600'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>ส่งข้อความเรียบร้อย!</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>ส่งข้อความ</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Support Categories */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  บริการให้คำปรึกษาเฉพาะทาง
                </h3>
                <p className="text-orange-600">
                  ทีมผู้เชี่ยวชาญพร้อมให้คำปรึกษาในแต่ละสาขา
                </p>
              </div>

              <div className="space-y-4">
                {supportCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white rounded-xl p-6 border border-orange-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                          <Icon className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-blue-900 mb-2">
                            {category.title}
                          </h4>
                          <p className="text-orange-600 mb-3">{category.description}</p>
                          <div className="flex items-center space-x-2 text-sm text-orange-600">
                            <Clock className="h-4 w-4" />
                            <span>{category.available}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
              คำถามที่พบบ่อย
            </h2>
            <p className="text-xl text-orange-600">
              ตอบข้อสงสัยที่ผู้เรียนถามบ่อยที่สุด
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {faqTopics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100"
              >
                <h3 className="text-lg font-semibold text-blue-900 mb-4 text-center">
                  {topic.category}
                </h3>
                <ul className="space-y-3">
                  {topic.questions.map((question, qIndex) => (
                    <li key={qIndex} className="flex items-start space-x-2">
                      <div className="bg-blue-100 rounded-full p-1 flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      </div>
                      <span className="text-orange-600 text-sm leading-relaxed">{question}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-4 text-orange-600 hover:text-orange-700 text-sm font-medium">
                  ดูคำถามทั้งหมด →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media & Hours */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                ติดตามเราบน Social Media
              </h3>
              <p className="text-orange-600 mb-8">
                อัปเดตเทคนิคการสอบและข่าวสารการเปิดรับสมัครการพัฒนาตัวเองใหม่ๆ ทุกวัน
              </p>
              
              <div className="flex justify-center space-x-6">
                {[
                  { icon: Facebook, name: 'Facebook', followers: '45K', color: 'blue' },
                  { icon: Instagram, name: 'Instagram', followers: '32K', color: 'blue' },
                  { icon: Youtube, name: 'YouTube', followers: '28K', color: 'red' }
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 hover:shadow-md transition-all duration-300 text-center"
                    >
                      <Icon className={`h-8 w-8 text-${social.color}-600 mx-auto mb-2`} />
                      <div className="text-sm font-medium text-blue-900">{social.name}</div>
                      <div className="text-xs text-blue-500">{social.followers} followers</div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 border border-orange-100"
            >
              <div className="text-center mb-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">
                  เวลาให้บริการ
                </h3>
                <p className="text-orange-600">
                  เวลาที่ทีมงานพร้อมให้คำปรึกษา
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { service: 'Live Chat & Email', time: 'ทุกวัน 24 ชั่วโมง', status: 'online' },
                  { service: 'โทรศัพท์', time: 'จันทร์-ศุกร์ 9:00-18:00', status: 'business' },
                  { service: 'คำปรึกษาผู้เชี่ยวชาญ', time: 'จันทร์-เสาร์ 8:00-20:00', status: 'expert' },
                  { service: 'สนับสนุนเทคนิค', time: 'ทุกวัน 24 ชั่วโมง', status: 'support' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl">
                    <div>
                      <div className="font-medium text-blue-900">{item.service}</div>
                      <div className="text-sm text-orange-600">{item.time}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'online' ? 'bg-green-100 text-green-700' :
                      item.status === 'business' ? 'bg-blue-100 text-orange-700' :
                      item.status === 'expert' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {item.status === 'online' ? 'Online' :
                       item.status === 'business' ? 'Business' :
                       item.status === 'expert' ? 'Expert' :
                       'Support'}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Guarantee */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/20 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Award className="h-10 w-10" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4">
              การันตีความสำเร็จ
            </h2>
            
            <p className="text-xl text-blue-100 mb-8">
              เราเชื่อมั่นในคุณภาพการสอนของเรา หากคุณไม่ผ่านการสอบ สามารถเรียนซ้ำได้ฟรี
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/courses"
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-300 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <BookOpen className="h-5 w-5" />
                <span>เริ่มเรียนเลยวันนี้</span>
              </a>
              <a
                href="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-orange-600 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <HeadphonesIcon className="h-5 w-5" />
                <span>ดูเพิ่มเติม</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}