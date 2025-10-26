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
    title: 'แบบประเมินภาวะผู้นำและการจัดการ',
    description: 'ประเมินความสามารถด้านภาวะผู้นำ การตัดสินใจ และการจัดการทีม',
    duration: 45,
    questions: 50,
    participants: 1250,
    difficulty: 'ปานกลาง',
    category: 'ภาวะผู้นำ',
    rating: 4.8,
    price: 299,
    tags: ['แนะนำ', 'ยอดนิยม']
  },
  {
    id: '2',
    title: 'แบบประเมินสติและการจัดการอารมณ์',
    description: 'ทดสอบความเข้าใจตนเอง การจัดการอารมณ์ และทักษะสติ',
    duration: 30,
    questions: 40,
    participants: 890,
    difficulty: 'ง่าย',
    category: 'สติและจิตใจ',
    rating: 4.9,
    price: 249,
    tags: ['ใหม่']
  },
  {
    id: '3',
    title: 'แบบประเมินทักษะการสื่อสาร',
    description: 'วัดความสามารถในการสื่อสาร การนำเสนอ และการเจรจาต่อรอง',
    duration: 40,
    questions: 45,
    participants: 2100,
    difficulty: 'ปานกลาง',
    category: 'การสื่อสาร',
    rating: 4.7,
    price: 279,
    tags: ['ยอดนิยม']
  },
  {
    id: '4',
    title: 'แบบประเมินการบริหารเวลาและประสิทธิภาพ',
    description: 'ทดสอบทักษะการจัดการเวลา การวางแผน และเพิ่มประสิทธิภาพในการทำงาน',
    duration: 35,
    questions: 40,
    participants: 1680,
    difficulty: 'ปานกลาง',
    category: 'ประสิทธิภาพ',
    rating: 4.6,
    price: 299,
    tags: ['แนะนำ']
  },
  {
    id: '5',
    title: 'แบบประเมินความฉลาดทางการเงิน',
    description: 'วัดความรู้เรื่องการเงินส่วนบุคคล การลงทุน และการวางแผนทางการเงิน',
    duration: 50,
    questions: 60,
    participants: 950,
    difficulty: 'ยาก',
    category: 'การเงินส่วนบุคคล',
    rating: 4.5,
    price: 349,
    tags: []
  }
]

const categories = [
  'ทั้งหมด',
  'ภาวะผู้นำ',
  'สติและจิตใจ',
  'การสื่อสาร',
  'ประสิทธิภาพ',
  'การเงินส่วนบุคคล'
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'ง่าย': return 'bg-green-100 text-green-700'
    case 'ปานกลาง': return 'bg-yellow-100 text-yellow-700' 
    case 'ยาก': return 'bg-red-100 text-red-700'
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              แบบประเมินความสามารถ
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              ทดสอบและประเมินทักษะของคุณเพื่อพัฒนาตัวเองอย่างมีประสิทธิภาพ
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="ค้นหาแบบทดสอบ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-xl border-0 shadow-lg focus:ring-2 focus:ring-orange-300 focus:outline-none text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <Target className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">50+</div>
            <div className="text-gray-600">แบบทดสอบ</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">25,000+</div>
            <div className="text-gray-600">ผู้เข้าสอบ</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">89%</div>
            <div className="text-gray-600">อัตราผ่าน</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">5,000+</div>
            <div className="text-gray-600">ข้อสอบ</div>
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
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
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
            <div key={exam.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="p-6">
                {/* Tags */}
                {exam.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {exam.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tag === 'ยอดนิยม' ? 'bg-green-100 text-green-700' :
                          tag === 'แนะนำ' ? 'bg-blue-100 text-orange-700' :
                          'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {exam.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {exam.description}
                </p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{exam.duration} นาที</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <BookOpen className="h-4 w-4" />
                    <span>{exam.questions} ข้อ</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
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
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{exam.rating}</span>
                  </div>
                  <div className="text-lg font-bold text-orange-600">
                    ฿{exam.price}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบแบบทดสอบ</h3>
            <p className="text-gray-600">ลองค้นหาด้วยคำค้นอื่น หรือเลือกหมวดหมู่อื่น</p>
          </div>
        )}
      </div>
    </div>
  )
}