'use client'

import React, { useState } from 'react'
import { Search, Clock, Users, BookOpen, Filter, Star, ChevronRight, Trophy, Target, FileText } from 'lucide-react'

interface Exam {
  id: string
  title: string
  description: string
  duration: number
  questions: number
  participants: number
  difficulty: 'ง่าย' | 'ปานกลาง' | 'ยาก'
  category: string
  rating: number
  price: number
  tags: string[]
}

const mockExams: Exam[] = [
  {
    id: '1',
    title: 'AI Readiness Assessment — คุณพร้อมใช้ AI แค่ไหน?',
    description: 'ประเมินความเข้าใจพื้นฐานเกี่ยวกับ AI, Machine Learning และ Generative AI เพื่อวางแผนการเรียนรู้ที่เหมาะกับคุณ',
    duration: 20,
    questions: 30,
    participants: 2450,
    difficulty: 'ง่าย',
    category: 'AI พื้นฐาน',
    rating: 4.9,
    price: 0,
    tags: ['ฟรี', 'แนะนำ', 'ยอดนิยม']
  },
  {
    id: '2',
    title: 'AI สำหรับสร้างธุรกิจ — Entrepreneur Track',
    description: 'ทดสอบความพร้อมในการนำ AI ไปสร้างรายได้ ตั้งแต่ไอเดีย MVP การทำ Automation ไปจนถึงการ Scale ธุรกิจด้วย AI',
    duration: 35,
    questions: 40,
    participants: 1820,
    difficulty: 'ปานกลาง',
    category: 'AI สร้างธุรกิจ',
    rating: 4.8,
    price: 299,
    tags: ['ยอดนิยม']
  },
  {
    id: '3',
    title: 'AI สำหรับบริหารองค์กร — Leader Track',
    description: 'วัดทักษะการนำ AI มาใช้ในองค์กร ทั้งด้านกลยุทธ์ การจัดการทีม การเลือก AI Tools และการวัดผล ROI',
    duration: 40,
    questions: 45,
    participants: 1350,
    difficulty: 'ปานกลาง',
    category: 'AI บริหารองค์กร',
    rating: 4.7,
    price: 299,
    tags: ['แนะนำ']
  },
  {
    id: '4',
    title: 'Prompt Engineering Mastery',
    description: 'ประเมินทักษะการเขียน Prompt สำหรับ ChatGPT, Claude และ AI อื่นๆ ตั้งแต่พื้นฐานไปจนถึงเทคนิคขั้นสูง',
    duration: 30,
    questions: 35,
    participants: 3100,
    difficulty: 'ปานกลาง',
    category: 'Prompt & Tools',
    rating: 4.8,
    price: 199,
    tags: ['ยอดนิยม']
  },
  {
    id: '5',
    title: 'AI Automation & No-Code — สร้างระบบอัตโนมัติ',
    description: 'ทดสอบความรู้ด้าน AI Workflow Automation, No-Code/Low-Code Tools เช่น Make, Zapier, n8n สำหรับธุรกิจ',
    duration: 30,
    questions: 35,
    participants: 980,
    difficulty: 'ปานกลาง',
    category: 'AI สร้างธุรกิจ',
    rating: 4.6,
    price: 249,
    tags: ['ใหม่']
  },
  {
    id: '6',
    title: 'AI Strategy for Executives',
    description: 'แบบประเมินสำหรับผู้บริหาร ครอบคลุม AI Governance, Data Strategy, Change Management และ AI Ethics ในองค์กร',
    duration: 45,
    questions: 50,
    participants: 720,
    difficulty: 'ยาก',
    category: 'AI บริหารองค์กร',
    rating: 4.7,
    price: 399,
    tags: []
  }
]

const categories = [
  'ทั้งหมด',
  'AI พื้นฐาน',
  'AI สร้างธุรกิจ',
  'AI บริหารองค์กร',
  'Prompt & Tools'
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'ง่าย': return 'bg-brand-50 text-brand-700'
    case 'ปานกลาง': return 'bg-sand-100 text-ink-light'
    case 'ยาก': return 'bg-error-light text-error-dark'
    default: return 'bg-gray-100 text-gray-700'
  }
}

export default function ExamsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')
  const [filteredExams, setFilteredExams] = useState(mockExams)

  const handleSearch = () => {
    let filtered = mockExams

    if (searchTerm) {
      filtered = filtered.filter(exam =>
        exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'ทั้งหมด') {
      filtered = filtered.filter(exam => exam.category === selectedCategory)
    }

    setFilteredExams(filtered)
  }

  React.useEffect(() => {
    handleSearch()
  }, [searchTerm, selectedCategory])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center">
            <div className="text-xs uppercase tracking-wider text-ink-muted mb-3">
              แบบประเมิน
            </div>
            <h1 className="text-heading font-serif text-ink mb-6">
              ประเมินความพร้อมด้าน AI
            </h1>
            <p className="text-lg text-ink-light mb-8">
              ค้นหาจุดแข็งและสิ่งที่ต้องพัฒนา เพื่อวางแผนเรียนรู้ AI ได้ตรงจุด
              ไม่ว่าจะสร้างธุรกิจหรือบริหารองค์กร
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="ค้นหาแบบประเมิน AI..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-ink bg-white rounded-lg border border-gray-200 focus:outline-none text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 border border-gray-100 text-center">
            <Target className="h-8 w-8 text-ink mx-auto mb-2" />
            <div className="text-2xl font-bold text-ink">15+</div>
            <div className="text-ink-muted">แบบประเมิน</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-100 text-center">
            <Users className="h-8 w-8 text-ink mx-auto mb-2" />
            <div className="text-2xl font-bold text-ink">3,200+</div>
            <div className="text-ink-muted">ผู้ทำแบบประเมิน</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-100 text-center">
            <Trophy className="h-8 w-8 text-ink mx-auto mb-2" />
            <div className="text-2xl font-bold text-ink">87%</div>
            <div className="text-ink-muted">อัตราพัฒนาขึ้น</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-100 text-center">
            <FileText className="h-8 w-8 text-ink mx-auto mb-2" />
            <div className="text-2xl font-bold text-ink">500+</div>
            <div className="text-ink-muted">คำถามประเมิน</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-ink text-white'
                    : 'bg-white text-ink hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Exam Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredExams.map((exam) => (
            <div key={exam.id} className="bg-white rounded-lg border border-gray-100 hover:border-gray-300 transition-colors">
              <div className="p-6">
                {/* Tags */}
                {exam.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {exam.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-ink-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-ink mb-2">
                  {exam.title}
                </h3>
                <p className="text-ink-muted mb-4 line-clamp-2">
                  {exam.description}
                </p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-ink-muted">
                    <Clock className="h-4 w-4" />
                    <span>{exam.duration} นาที</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-ink-muted">
                    <BookOpen className="h-4 w-4" />
                    <span>{exam.questions} ข้อ</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-ink-muted">
                    <Users className="h-4 w-4" />
                    <span>{exam.participants.toLocaleString()} คน</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}>
                      {exam.difficulty}
                    </span>
                  </div>
                </div>

                {/* Rating and Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-ink-muted">{exam.rating} ดาว</span>
                  </div>
                  <div className="text-lg font-bold text-ink">
                    ฿{exam.price}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-ink hover:opacity-90 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <span>เริ่มทำแบบประเมิน</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-ink mb-2">ไม่พบแบบทดสอบ</h3>
            <p className="text-ink-muted">ลองค้นหาด้วยคำค้นอื่น หรือเลือกหมวดหมู่อื่น</p>
          </div>
        )}
      </div>
    </div>
  )
}
