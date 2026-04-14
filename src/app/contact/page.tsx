'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Users,
  BookOpen,
  Award,
  Target,
  Loader2
} from 'lucide-react';
import { submitContactForm } from '@/lib/api/contact';
import { useNotificationHelpers } from '@/contexts/NotificationContext';

export default function Contact() {
  const notification = useNotificationHelpers();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        category: formData.category
      });

      if (result.success) {
        setIsSubmitted(true);
        notification.success('ส่งข้อความสำเร็จ', 'เราจะติดต่อกลับภายใน 24 ชั่วโมง');

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          category: '',
          message: ''
        });

        // Hide success message after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        notification.error(
          'เกิดข้อผิดพลาด',
          result.message || 'ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง'
        );
      }
    } catch (error) {
      notification.error(
        'เกิดข้อผิดพลาด',
        'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง'
      );
    } finally {
      setIsSubmitting(false);
    }
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
      value: "hello@antipararell.com",
      description: "ตอบกลับภายใน 24 ชั่วโมง",
      action: "mailto:hello@antipararell.com"
    },
    {
      icon: Phone,
      title: "โทรศัพท์",
      value: "02-024-9955",
      description: "จันทร์-ศุกร์ 9:00-18:00",
      action: "tel:0202499055"
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
      description: "อาคารสยามพิวรรธน์ ชั้น 12 ถนนพระราม 1 เขตปทุมวัน",
      action: "#"
    }
  ];

  const supportCategories = [
    {
      icon: BookOpen,
      title: "คำปรึกษาเลือกเส้นทาง AI",
      description: "แนะนำคอร์ส AI ที่เหมาะกับเป้าหมาย ทั้ง Entrepreneur Track และ Leader Track",
      available: "ทุกวัน 8:00-20:00"
    },
    {
      icon: Target,
      title: "วาง AI Roadmap",
      description: "วางแผนเส้นทางเรียนรู้ AI ตั้งแต่พื้นฐานจนถึงนำไปใช้จริงในธุรกิจหรือองค์กร",
      available: "จันทร์-ศุกร์ 9:00-18:00"
    },
    {
      icon: Award,
      title: "ปัญหาด้านเทคนิค",
      description: "แก้ปัญหาการใช้งานแพลตฟอร์ม การเข้าสู่ระบบ และการชำระเงิน",
      available: "จันทร์-เสาร์ 9:00-18:00"
    },
    {
      icon: Users,
      title: "ชุมชนคนใช้ AI",
      description: "เข้าร่วมชุมชนผู้เรียน AI เพื่อแลกเปลี่ยนไอเดียและประสบการณ์",
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
      category: "การเรียนรู้",
      questions: [
        "ใช้เวลาเรียนแต่ละคอร์สนานเท่าไร?",
        "เรียนจบแล้วจะได้ใบรับรองหรือไม่?",
        "สามารถเรียนซ้ำได้กี่ครั้ง?"
      ]
    },
    {
      category: "การใช้งาน",
      questions: [
        "ใช้งานผ่านมือถือได้หรือไม่?",
        "ดาวน์โหลดเนื้อหาเก็บไว้ได้หรือไม่?",
        "เข้าใช้งานไม่ได้ควรทำอย่างไร?"
      ]
    }
  ];

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="border-b border-gray-800/40 py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-gray-500 mb-4">
              <MessageCircle className="h-6 w-6" />
              <span className="text-sm uppercase tracking-wider font-medium">ติดต่อเรา</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold font-serif text-gray-200 mb-4">
              ให้เราช่วยคุณ
              <br />
              เรียนรู้ AI ให้ได้ผลจริง
            </h1>

            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              ทีมผู้เชี่ยวชาญ AI พร้อมให้คำปรึกษาและแนะนำเส้นทางการเรียน AI
              ไม่ว่าจะเป็นการเลือกคอร์ส การวาง AI Roadmap หรือแนวทางนำ AI ไปใช้จริง
            </p>

            <div className="flex items-center justify-center space-x-8 mt-8 text-gray-500 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>ตอบภายใน 24 ชม.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>ปรึกษาฟรี</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>20+ ผู้เชี่ยวชาญ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-serif text-gray-200 mb-3">
              วิธีติดต่อเรา
            </h2>
            <p className="text-lg text-gray-400">
              เลือกช่องทางที่สะดวกสำหรับคุณ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a
                  key={index}
                  href={info.action}
                  className="bg-gray-900 border border-gray-700/50 p-6 hover:border-mint-500 transition-colors text-center group"
                >
                  <div className="mb-4">
                    <Icon className="h-8 w-8 text-gray-200 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-2">{info.title}</h3>
                  <p className="text-mint-400 font-medium mb-2">{info.value}</p>
                  <p className="text-gray-500 text-sm">{info.description}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Support */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div className="bg-gray-900 border border-gray-700/50 p-8">
              <div className="text-center mb-8">
                <Mail className="h-8 w-8 text-gray-200 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-200 mb-2">ส่งข้อความถึงเรา</h3>
                <p className="text-gray-400">เราจะติดต่อกลับภายใน 24 ชั่วโมง</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      ชื่อ-นามสกุล *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 text-gray-200 placeholder-gray-600 focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20 transition-colors"
                      placeholder="กรุณากรอกชื่อ-นามสกุล"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 text-gray-200 placeholder-gray-600 focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20 transition-colors"
                      placeholder="08X-XXX-XXXX"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    อีเมล *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 text-gray-200 placeholder-gray-600 focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20 transition-colors"
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    ประเภทการติดต่อ *
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 text-gray-200 placeholder-gray-600 focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20 transition-colors"
                    disabled={isSubmitting}
                  >
                    <option value="">เลือกประเภท</option>
                    <option value="course">สอบถามเกี่ยวกับคอร์ส AI</option>
                    <option value="ai_roadmap">ปรึกษาเส้นทางเรียน AI</option>
                    <option value="study_plan">วางแผนการเรียน</option>
                    <option value="technical">ปัญหาทางเทคนิค</option>
                    <option value="payment">การชำระเงิน</option>
                    <option value="other">อื่นๆ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    หัวข้อ *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 text-gray-200 placeholder-gray-600 focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20 transition-colors"
                    placeholder="หัวข้อที่ต้องการปรึกษา"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    รายละเอียด *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 text-gray-200 placeholder-gray-600 focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20 transition-colors resize-none"
                    placeholder="กรุณาอธิบายรายละเอียดที่ต้องการปรึกษา..."
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted || isSubmitting}
                  className={`w-full py-4 font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSubmitted
                      ? 'bg-mint-500 text-white'
                      : isSubmitting
                      ? 'bg-gray-700 text-white cursor-not-allowed'
                      : 'bg-mint-600 text-white hover:bg-mint-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>กำลังส่ง...</span>
                    </>
                  ) : isSubmitted ? (
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
            </div>

            {/* Support Categories */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-200 mb-4">
                  บริการให้คำปรึกษาเฉพาะทาง
                </h3>
                <p className="text-gray-400">
                  ทีมผู้เชี่ยวชาญพร้อมให้คำปรึกษาในแต่ละสาขา
                </p>
              </div>

              <div className="space-y-4">
                {supportCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={index}
                      className="bg-gray-900 border border-gray-700/50 p-6 hover:border-mint-500 transition-colors"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <Icon className="h-6 w-6 text-gray-200" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-200 mb-2">
                            {category.title}
                          </h4>
                          <p className="text-gray-400 mb-3">{category.description}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{category.available}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-serif text-gray-200 mb-3">
              คำถามที่พบบ่อย
            </h2>
            <p className="text-lg text-gray-400">
              ตอบข้อสงสัยที่ผู้เรียนถามบ่อยที่สุด
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {faqTopics.map((topic, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-700/50 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-200 mb-4 text-center">
                  {topic.category}
                </h3>
                <ul className="space-y-3">
                  {topic.questions.map((question, qIndex) => (
                    <li key={qIndex} className="flex items-start space-x-2">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-1.5 h-1.5 bg-mint-500 rounded-full" />
                      </div>
                      <span className="text-gray-400 text-sm leading-relaxed">{question}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-4 text-mint-400 hover:text-mint-300 text-sm font-medium">
                  ดูคำถามทั้งหมด →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="border border-gray-700/50 p-8">
            <div className="text-center mb-8">
              <Clock className="h-8 w-8 text-gray-200 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-200 mb-2">
                เวลาให้บริการ
              </h3>
              <p className="text-gray-400">
                เวลาที่ทีมงานพร้อมให้คำปรึกษา
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                { service: 'Live Chat & Email', time: 'ทุกวัน 24 ชั่วโมง', status: 'เปิดตลอดเวลา' },
                { service: 'โทรศัพท์', time: 'จันทร์-ศุกร์ 9:00-18:00', status: 'เวลาทำการ' },
                { service: 'คำปรึกษาผู้เชี่ยวชาญ', time: 'จันทร์-เสาร์ 8:00-20:00', status: 'นัดหมายล่วงหน้า' },
                { service: 'สนับสนุนเทคนิค', time: 'ทุกวัน 24 ชั่วโมง', status: 'เปิดตลอดเวลา' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 border border-gray-700/50">
                  <div>
                    <div className="font-medium text-gray-200">{item.service}</div>
                    <div className="text-sm text-gray-400">{item.time}</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="border border-gray-700/50 bg-gray-900 p-12 text-center">
            <Award className="h-10 w-10 text-gray-200 mx-auto mb-6" />

            <h2 className="text-3xl font-bold font-serif text-gray-200 mb-4">
              รับประกันผลลัพธ์
            </h2>

            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              เราเชื่อมั่นในคุณภาพการสอน AI ของเรา หากไม่พอใจภายใน 30 วัน คืนเงิน 100%
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-mint-600 text-white px-8 py-4 font-semibold text-lg hover:bg-mint-700 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <BookOpen className="h-5 w-5" />
                <span>เริ่มเรียนเลยวันนี้</span>
              </Link>
              <Link
                href="/about"
                className="border-2 border-gray-700 text-gray-200 px-8 py-4 font-semibold text-lg hover:bg-gray-800 hover:border-gray-600 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Users className="h-5 w-5" />
                <span>ดูเพิ่มเติม</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
