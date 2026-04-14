'use client'

import React, { useState, useEffect } from 'react'
import { Search, Clock, Users, BookOpen, ChevronRight, Trophy, Target, FileText, AlertCircle } from 'lucide-react'
import { fetchExams, Exam as ApiExam } from '@/lib/api/exams'
import { PageSkeleton } from '@/components/Skeleton'

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

const categories = [
  'ทั้งหมด',
  'AI พื้นฐาน',
  'AI สร้างธุรกิจ',
  'AI บริหารองค์กร',
  'Prompt & Tools'
]

// Map difficulty from API to Thai
const mapDifficulty = (difficulty: string): 'ง่าย' | 'ปานกลาง' | 'ยาก' => {
  if (difficulty === 'beginner') return 'ง่าย'
  if (difficulty === 'advanced') return 'ยาก'
  return 'ปานกลาง'
}

// Convert API exam to display format
const convertExam = (apiExam: ApiExam): Exam => ({
  id: apiExam.id,
  title: apiExam.title,
  description: apiExam.description,
  duration: apiExam.duration_minutes,
  questions: apiExam.total_questions,
  participants: apiExam.participants_count || 0,
  difficulty: mapDifficulty(apiExam.difficulty),
  category: apiExam.category,
  rating: apiExam.rating || 4.5,
  price: apiExam.price || 0,
  tags: apiExam.tags || []
})

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'ง่าย': return 'bg-mint-500/10 text-mint-400'
    case 'ปานกลาง': return 'bg-gray-800 text-gray-400'
    case 'ยาก': return 'bg-red-500/10 text-red-400'
    default: return 'bg-gray-800 text-gray-400'
  }
}

export default function ExamsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')
  const [exams, setExams] = useState<Exam[]>([])
  const [filteredExams, setFilteredExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch exams on mount and when filters change
  useEffect(() => {
    loadExams()
  }, [selectedCategory])

  const loadExams = async () => {
    setLoading(true)
    setError(null)

    const result = await fetchExams({
      category: selectedCategory !== 'ทั้งหมด' ? selectedCategory : undefined,
    })

    if (result.error) {
      setError(result.error)
      setExams([])
      setFilteredExams([])
    } else if (result.data) {
      const convertedExams = result.data.map(convertExam)
      setExams(convertedExams)
      setFilteredExams(convertedExams)
    }

    setLoading(false)
  }

  // Handle search filtering
  useEffect(() => {
    if (searchTerm) {
      const filtered = exams.filter(exam =>
        exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredExams(filtered)
    } else {
      setFilteredExams(exams)
    }
  }, [searchTerm, exams])

  if (loading) {
    return <PageSkeleton cards={6} />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="border-b border-gray-800/40 py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">
              แบบประเมิน
            </div>
            <h1 className="text-heading font-serif text-gray-100 mb-6">
              ประเมินความพร้อมด้าน AI
            </h1>
            <p className="text-lg text-gray-400 mb-8">
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
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border-gray-700 text-gray-200 placeholder-gray-600 rounded-sm border focus:outline-none text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-900 rounded-sm p-6 border border-gray-700/50 text-center">
            <Target className="h-8 w-8 text-gray-200 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-200">{exams.length}+</div>
            <div className="text-gray-500">แบบประเมิน</div>
          </div>
          <div className="bg-gray-900 rounded-sm p-6 border border-gray-700/50 text-center">
            <Users className="h-8 w-8 text-gray-200 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-200">
              {exams.reduce((sum, exam) => sum + exam.participants, 0).toLocaleString()}+
            </div>
            <div className="text-gray-500">ผู้ทำแบบประเมิน</div>
          </div>
          <div className="bg-gray-900 rounded-sm p-6 border border-gray-700/50 text-center">
            <Trophy className="h-8 w-8 text-gray-200 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-200">87%</div>
            <div className="text-gray-500">อัตราพัฒนาขึ้น</div>
          </div>
          <div className="bg-gray-900 rounded-sm p-6 border border-gray-700/50 text-center">
            <FileText className="h-8 w-8 text-gray-200 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-200">
              {exams.reduce((sum, exam) => sum + exam.questions, 0)}+
            </div>
            <div className="text-gray-500">คำถามประเมิน</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-mint-600 text-white'
                    : 'bg-gray-900 text-gray-200 hover:bg-gray-800/50 border border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-sm p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-red-400 font-medium mb-1">เกิดข้อผิดพลาด</h3>
                <p className="text-red-400 text-sm mb-3">{error}</p>
                <button
                  onClick={loadExams}
                  className="text-sm text-red-400 hover:text-red-400 font-medium underline"
                >
                  ลองใหม่อีกครั้ง
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Exam Grid */}
        {!error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredExams.map((exam) => (
              <div key={exam.id} className="bg-gray-900 rounded-sm border border-gray-700/50 hover:border-gray-600 transition-colors">
                <div className="p-6">
                  {/* Tags */}
                  {exam.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {exam.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-sm text-xs font-medium bg-gray-800 text-gray-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-gray-200 mb-2">
                    {exam.title}
                  </h3>
                  <p className="text-gray-500 mb-4 line-clamp-2">
                    {exam.description}
                  </p>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{exam.duration} นาที</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <BookOpen className="h-4 w-4" />
                      <span>{exam.questions} ข้อ</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>{exam.participants.toLocaleString()} คน</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-sm text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}>
                        {exam.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Rating and Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-500">{exam.rating.toFixed(1)} ดาว</span>
                    </div>
                    <div className="text-lg font-bold text-gray-200">
                      ฿{exam.price}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-mint-500 hover:bg-[length:100%_150%] text-white py-3 px-4 rounded-sm font-medium transition-colors flex items-center justify-center space-x-2">
                    <span>เริ่มทำแบบประเมิน</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!error && filteredExams.length === 0 && !loading && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-200 mb-2">ไม่พบแบบทดสอบ</h3>
            <p className="text-gray-500">ลองค้นหาด้วยคำค้นอื่น หรือเลือกหมวดหมู่อื่น</p>
          </div>
        )}
      </div>
    </div>
  )
}
