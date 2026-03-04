'use client'

import React, { useState } from 'react'
import { Trophy, TrendingUp, Calendar, Clock, Target, ChevronRight, Medal, Star, BarChart3, Award } from 'lucide-react'

interface ExamResult {
  id: string
  examTitle: string
  category: string
  completedAt: string
  duration: number
  score: number
  totalQuestions: number
  correctAnswers: number
  percentile: number
  status: 'ผ่าน' | 'ไม่ผ่าน'
  difficulty: string
}

const mockResults: ExamResult[] = [
  {
    id: '1',
    examTitle: 'AI Readiness Assessment — คุณพร้อมใช้ AI แค่ไหน?',
    category: 'AI พื้นฐาน',
    completedAt: '2026-02-20T14:30:00',
    duration: 18,
    score: 88,
    totalQuestions: 30,
    correctAnswers: 26,
    percentile: 82,
    status: 'ผ่าน',
    difficulty: 'ง่าย'
  },
  {
    id: '2',
    examTitle: 'AI สำหรับสร้างธุรกิจ — Entrepreneur Track',
    category: 'AI สร้างธุรกิจ',
    completedAt: '2026-02-15T10:15:00',
    duration: 32,
    score: 76,
    totalQuestions: 40,
    correctAnswers: 30,
    percentile: 68,
    status: 'ผ่าน',
    difficulty: 'ปานกลาง'
  },
  {
    id: '3',
    examTitle: 'Prompt Engineering Mastery',
    category: 'Prompt & Tools',
    completedAt: '2026-02-10T16:45:00',
    duration: 25,
    score: 92,
    totalQuestions: 35,
    correctAnswers: 32,
    percentile: 91,
    status: 'ผ่าน',
    difficulty: 'ปานกลาง'
  },
  {
    id: '4',
    examTitle: 'AI Strategy for Executives',
    category: 'AI บริหารองค์กร',
    completedAt: '2026-02-05T09:20:00',
    duration: 42,
    score: 54,
    totalQuestions: 50,
    correctAnswers: 27,
    percentile: 38,
    status: 'ไม่ผ่าน',
    difficulty: 'ยาก'
  }
]

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-brand-600'
  if (score >= 70) return 'text-brand-600'
  if (score >= 60) return 'text-warning'
  return 'text-error'
}

const getScoreBackground = (score: number) => {
  return 'border border-gray-100'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) {
    return `${hours} ชม. ${mins} นาที`
  }
  return `${mins} นาที`
}

export default function ResultsPage() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'passed' | 'failed'>('all')

  const filteredResults = mockResults.filter(result => {
    if (selectedTab === 'passed') return result.status === 'ผ่าน'
    if (selectedTab === 'failed') return result.status === 'ไม่ผ่าน'
    return true
  })

  const totalExams = mockResults.length
  const passedExams = mockResults.filter(r => r.status === 'ผ่าน').length
  const averageScore = mockResults.reduce((sum, r) => sum + r.score, 0) / totalExams
  const bestScore = Math.max(...mockResults.map(r => r.score))

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center">
            <div className="text-xs uppercase tracking-wider text-ink/60 mb-4">
              ผลประเมิน
            </div>
            <h1 className="text-heading font-serif text-ink mb-6">
              ผลการประเมิน
            </h1>
            <p className="text-base text-ink-light leading-relaxed mb-8">
              ติดตามและวิเคราะห์ผลการประเมินด้าน AI เพื่อวางแผนการเรียนรู้ต่อไป
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white border border-gray-100/60 shadow-card rounded-lg p-6 text-center">
            <BarChart3 className="h-8 w-8 text-ink mx-auto mb-2" />
            <div className="text-2xl font-bold text-ink">{totalExams}</div>
            <div className="text-sm text-ink-muted">แบบประเมินทั้งหมด</div>
          </div>
          <div className="bg-white border border-gray-100/60 shadow-card rounded-lg p-6 text-center">
            <Trophy className="h-8 w-8 text-ink mx-auto mb-2" />
            <div className="text-2xl font-bold text-ink">{passedExams}</div>
            <div className="text-sm text-ink-muted">ผ่านการประเมิน</div>
          </div>
          <div className="bg-white border border-gray-100/60 shadow-card rounded-lg p-6 text-center">
            <Target className="h-8 w-8 text-ink mx-auto mb-2" />
            <div className="text-2xl font-bold text-ink">{averageScore.toFixed(1)}%</div>
            <div className="text-sm text-ink-muted">คะแนนเฉลี่ย</div>
          </div>
          <div className="bg-white border border-gray-100/60 shadow-card rounded-lg p-6 text-center">
            <Award className="h-8 w-8 text-ink mx-auto mb-2" />
            <div className="text-2xl font-bold text-ink">{bestScore}%</div>
            <div className="text-sm text-ink-muted">คะแนนสูงสุด</div>
          </div>
        </div>

        {/* Progress Chart Placeholder */}
        <div className="bg-white border border-gray-100/60 shadow-card rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold font-serif text-ink mb-4 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>แนวโน้มคะแนนการประเมิน</span>
          </h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-ink-muted">กราฟแสดงแนวโน้มการพัฒนาทักษะ AI</p>
              <p className="text-ink-faint text-sm">จะแสดงเมื่อมีข้อมูลเพิ่มเติม</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'all'
                ? 'bg-ink text-white'
                : 'bg-white text-ink-light hover:bg-gray-50 border border-gray-100'
            }`}
          >
            ทั้งหมด ({totalExams})
          </button>
          <button
            onClick={() => setSelectedTab('passed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'passed'
                ? 'bg-ink text-white'
                : 'bg-white text-ink-light hover:bg-gray-50 border border-gray-100'
            }`}
          >
            ผ่าน ({passedExams})
          </button>
          <button
            onClick={() => setSelectedTab('failed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'failed'
                ? 'bg-ink text-white'
                : 'bg-white text-ink-light hover:bg-gray-50 border border-gray-100'
            }`}
          >
            ไม่ผ่าน ({totalExams - passedExams})
          </button>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {filteredResults.map((result) => (
            <div
              key={result.id}
              className={`bg-white rounded-lg p-6 shadow-card transition-all ${getScoreBackground(result.score)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-ink">
                      {result.examTitle}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      result.status === 'ผ่าน'
                        ? 'bg-brand-50 text-brand-700'
                        : 'bg-error-light text-error-dark'
                    }`}>
                      {result.status}
                    </span>
                  </div>

                  <div className="text-sm text-ink-muted mb-4">
                    หมวดหมู่: {result.category} • ระดับ: {result.difficulty}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-ink-muted">
                        คะแนน: <span className={`font-bold ${getScoreColor(result.score)}`}>
                          {result.score}%
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Medal className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-ink-muted">
                        อันดับ: {result.percentile}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-ink-muted">
                        {formatDuration(result.duration)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-ink-muted">
                        {formatDate(result.completedAt)}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm text-ink-muted mb-1">
                      <span>ตอบถูก {result.correctAnswers} จาก {result.totalQuestions} ข้อ</span>
                      <span>{result.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-brand-600"
                        style={{ width: `${result.score}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="ml-6">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-ink hover:opacity-90 text-white rounded-lg transition-colors">
                    <span>ดูรายละเอียด</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-ink mb-2">ไม่พบผลการประเมิน</h3>
            <p className="text-ink-muted">
              {selectedTab === 'passed' && 'ยังไม่มีผลประเมินที่ผ่าน'}
              {selectedTab === 'failed' && 'ไม่มีผลประเมินที่ไม่ผ่าน'}
              {selectedTab === 'all' && 'ยังไม่มีผลการประเมิน เริ่มทำแบบประเมินเพื่อดูผลลัพธ์'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
