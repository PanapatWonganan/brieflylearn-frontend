'use client'

import { motion } from 'framer-motion'
import { Star, Heart, Award, BookOpen, Users, Instagram, Youtube, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const trainers = [
  {
    id: 1,
    name: 'ครูแนน',
    title: 'ผู้เชี่ยวชาญด้านโยคะสำหรับคุณแม่',
    specialties: ['โยคะขณะตั้งครรภ์', 'โยคะหลังคลอด', 'การฟื้นฟูร่างกาย'],
    experience: '8 ปี',
    rating: 4.9,
    students: 2500,
    bio: 'ครูแนนเป็นผู้เชี่ยวชาญด้านโยคะสำหรับผู้หญิงที่มีประสบการณ์กว่า 8 ปี เคยเป็นอินสตรักเตอร์ใน studio ชื่อดังหลายแห่ง และมีใบรับรองนานาชาติ',
    certifications: ['RYT 500 Yoga Alliance', 'Prenatal Yoga Specialist', 'Postnatal Recovery Expert'],
    achievements: ['อันดับ 1 Prenatal Yoga Instructor Thailand 2023', 'รางวัล Best Online Instructor 2022'],
    socialMedia: {
      instagram: '@trainer_nan_yoga',
      youtube: 'TrainerNanYoga',
      email: 'nan@boostme.com'
    },
    avatar: '/trainers/nan.jpg',
    coverImage: '/trainers/nan-cover.jpg'
  },
  {
    id: 2,
    name: 'ครูมิ้นต์',
    title: 'นักโภชนาการและผู้เชี่ยวชาญด้านสมดุลฮอร์โมน',
    specialties: ['โภชนาการสำหรับผู้หญิง', 'การสมดุลฮอร์โมน', 'การลดน้ำหนักหลังคลอด'],
    experience: '10 ปี',
    rating: 4.8,
    students: 3200,
    bio: 'ครูมิ้นต์เป็นนักโภชนาการที่มีความเชี่ยวชาญเฉพาะด้านสุขภาพผู้หญิง มีประสบการณ์ให้คำปรึกษากับคุณแม่มากกว่า 1000 คน',
    certifications: ['นักโภชนาการหลัก', 'Hormone Health Specialist', 'PCOS Nutrition Expert'],
    achievements: ['นักโภชนาการยอดเยี่ยม 2023', 'ผู้เขียนหนังสือ "สมดุลฮอร์โมนด้วยอาหาร"'],
    socialMedia: {
      instagram: '@nutritionist_mint',
      youtube: 'MintNutrition',
      email: 'mint@boostme.com'
    },
    avatar: '/trainers/mint.jpg',
    coverImage: '/trainers/mint-cover.jpg'
  },
  {
    id: 3,
    name: 'ครูเอิร์ท',
    title: 'ผู้เชี่ยวชาญด้านฟิตเนสและการออกกำลังกาย',
    specialties: ['การออกกำลังกายหลังคลอด', 'ฟิตเนสสำหรับผู้หญิง', 'การเสริมสร้างกล้ามเนื้อ'],
    experience: '12 ปี',
    rating: 4.9,
    students: 4100,
    bio: 'ครูเอิร์ทเป็นเทรนเนอร์ส่วนตัวที่มีประสบการณ์มากกว่า 12 ปี เชี่ยวชาญในการออกแบบโปรแกรมการออกกำลังกายที่ปลอดภัยสำหรับผู้หญิงทุกช่วงวัย',
    certifications: ['ACSM Certified Personal Trainer', 'Pre/Postnatal Exercise Specialist', 'Women\'s Fitness Expert'],
    achievements: ['Personal Trainer of the Year 2022', 'ผู้ก่อตั้ง Women Strong Community'],
    socialMedia: {
      instagram: '@trainer_earth_fit',
      youtube: 'EarthFitnessChannel',
      email: 'earth@boostme.com'
    },
    avatar: '/trainers/earth.jpg',
    coverImage: '/trainers/earth-cover.jpg'
  },
  {
    id: 4,
    name: 'ครูปิ๊ก',
    title: 'ผู้เชี่ยวชาญด้านจิตใจและการจัดการความเครียด',
    specialties: ['สมาธิและการผ่อนคลาย', 'การจัดการความเครียด', 'จิตวิทยาสำหรับคุณแม่'],
    experience: '6 ปี',
    rating: 4.7,
    students: 1800,
    bio: 'ครูปิ๊กเป็นนักจิตวิทยาที่เชี่ยวชาญเรื่องสุขภาพจิตของผู้หญิง โดยเฉพาะในช่วงตั้งครรภ์และหลังคลอด มีประสบการณ์ให้คำปรึกษากว่า 500 ราย',
    certifications: ['จิตวิทยาคลินิก', 'Mindfulness Instructor', 'Maternal Mental Health Specialist'],
    achievements: ['รางวัลนักจิตวิทยายอดเยี่ยม 2023', 'ผู้เขียน "จิตใจแข็งแรงสำหรับคุณแม่"'],
    socialMedia: {
      instagram: '@mindful_pick',
      youtube: 'PickMindfulness',
      email: 'pick@boostme.com'
    },
    avatar: '/trainers/pick.jpg',
    coverImage: '/trainers/pick-cover.jpg'
  }
]

export default function TrainersPage() {
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
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              พบกับทีมผู้เชี่ยวชาญของเรา
            </h1>
            <p className="text-xl text-gray-600">
              ผู้เชี่ยวชาญด้านสุขภาพผู้หญิงที่มีประสบการณ์และใบรับรองระดับสากล
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Trainers Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Cover Image */}
              <div className="h-32 bg-gradient-to-r from-orange-400 to-purple-500 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>

              <div className="relative px-6 pb-6">
                {/* Avatar */}
                <div className="flex justify-center -mt-12 mb-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <Heart className="h-12 w-12 text-orange-500" />
                  </div>
                </div>

                {/* Trainer Info */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">
                    {trainer.name}
                  </h3>
                  <p className="text-orange-600 font-medium mb-3">
                    {trainer.title}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex justify-center items-center space-x-6 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{trainer.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{trainer.students.toLocaleString()} นักเรียน</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{trainer.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">ความเชี่ยวชาญ</h4>
                  <div className="flex flex-wrap gap-2">
                    {trainer.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">เกี่ยวกับครู</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {trainer.bio}
                  </p>
                </div>

                {/* Certifications */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">ใบรับรอง</h4>
                  <div className="space-y-2">
                    {trainer.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex justify-center space-x-4 pt-4 border-t border-gray-100">
                  <button className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors">
                    <Instagram className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Youtube className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
                    <Mail className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Our Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            ต้องการเป็นส่วนหนึ่งของทีมเรา?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            หากคุณเป็นผู้เชี่ยวชาญด้านสุขภาพผู้หญิง มีประสบการณ์และใบรับรองที่เกี่ยวข้อง 
            เราเปิดรับสมัครผู้เชี่ยวชาญใหม่เพื่อขยายทีมงานของเรา
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-700 transition-colors"
            >
              ติดต่อสมัครงาน
            </Link>
            <Link
              href="/about"
              className="border border-orange-600 text-orange-600 px-6 py-3 rounded-xl font-medium hover:bg-orange-50 transition-colors"
            >
              เรียนรู้เพิ่มเติม
            </Link>
          </div>
        </motion.div>

        {/* Why Choose Our Trainers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            ทำไมต้องเลือกผู้เชี่ยวชาญของเรา
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'ใบรับรองระดับสากล',
                description: 'ผู้เชี่ยวชาญทุกคนมีใบรับรองและประสบการณ์ระดับมืออาชีพ'
              },
              {
                icon: Heart,
                title: 'เข้าใจความต้องการผู้หญิง',
                description: 'เชี่ยวชาญเฉพาะด้านสุขภาพผู้หญิงในทุกช่วงวัย'
              },
              {
                icon: Users,
                title: 'ประสบการณ์จริง',
                description: 'มีประสบการณ์ให้คำปรึกษาและสอนผู้หญิงมากกว่า 10,000 คน'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}