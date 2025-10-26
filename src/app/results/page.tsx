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
    examTitle: 'แบบประเมินภาวะผู้นำและการจัดการ',
    category: 'ภาวะผู้นำ',
    completedAt: '2025-09-05T14:30:00',
    duration: 42,
    score: 85,
    totalQuestions: 50,
    correctAnswers: 43,
    percentile: 78,
    status: 'ผ่าน',
    difficulty: 'ปานกลาง'
  },
  {
    id: '2',
    examTitle: 'แบบประเมินสติและการจัดการอารมณ์',
    category: 'สติและจิตใจ',
    completedAt: '2025-09-03T10:15:00',
    duration: 28,
    score: 92,
    totalQuestions: 40,
    correctAnswers: 37,
    percentile: 89,
    status: 'ผ่าน',
    difficulty: 'ง่าย'
  },
  {
    id: '3',
    examTitle: 'แบบประเมินทักษะการสื่อสาร',
    category: 'การสื่อสาร',
    completedAt: '2025-09-01T16:45:00',
    duration: 38,
    score: 76,
    totalQuestions: 45,
    correctAnswers: 34,
    percentile: 65,
    status: 'ผ่าน',
    difficulty: 'ปานกลาง'
  },
  {
    id: '4',
    examTitle: 'แบบประเมินความฉลาดทางการเงิน',
    category: 'การเงินส่วนบุคคล',
    completedAt: '2025-08-30T09:20:00',
    duration: 47,
    score: 58,
    totalQuestions: 60,
    correctAnswers: 35,
    percentile: 42,
    status: 'ไม่ผ่าน',
    difficulty: 'ยาก'
  }
]

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600'
  if (score >= 70) return 'text-orange-600'  
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

const getScoreBackground = (score: number) => {
  if (score >= 80) return 'bg-green-50 border-green-200'
  if (score >= 70) return 'bg-blue-50 border-orange-200'
  if (score >= 60) return 'bg-yellow-50 border-yellow-200'
  return 'bg-red-50 border-red-200'
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ผลการประเมิน
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              ติดตามและวิเคราะห์ผลการประเมินของคุณเพื่อพัฒนาทักษะต่อไป
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{totalExams}</div>
            <div className="text-gray-600">แบบประเมินทั้งหมด</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{passedExams}</div>
            <div className="text-gray-600">ผ่านการประเมิน</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <Target className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{averageScore.toFixed(1)}%</div>
            <div className="text-gray-600">คะแนนเฉลี่ย</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{bestScore}%</div>
            <div className="text-gray-600">คะแนนสูงสุด</div>
          </div>
        </div>

        {/* Progress Chart Placeholder */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>แนวโน้มคะแนนการประเมิน</span>
          </h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">กราฟแสดงแนวโน้มการพัฒนาตัวเอง</p>
              <p className="text-gray-400 text-sm">จะแสดงเมื่อมีข้อมูลเพิ่มเติม</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'all'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 hover:bg-blue-50'
            }`}
          >
            ทั้งหมด ({totalExams})
          </button>
          <button
            onClick={() => setSelectedTab('passed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'passed'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-green-50'
            }`}
          >
            ผ่าน ({passedExams})
          </button>
          <button
            onClick={() => setSelectedTab('failed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'failed'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 hover:bg-red-50'
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
              className={`bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-all ${getScoreBackground(result.score)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      {result.examTitle}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      result.status === 'ผ่าน' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {result.status}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    หมวดหมู่: {result.category} • ระดับ: {result.difficulty}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        คะแนน: <span className={`font-bold ${getScoreColor(result.score)}`}>
                          {result.score}%
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Medal className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        อันดับ: {result.percentile}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {formatDuration(result.duration)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {formatDate(result.completedAt)}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>ตอบถูก {result.correctAnswers} จาก {result.totalQuestions} ข้อ</span>
                      <span>{result.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          result.score >= 80 ? 'bg-green-500' :
                          result.score >= 70 ? 'bg-orange-500' :
                          result.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${result.score}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="ml-6">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบผลการประเมิน</h3>
            <p className="text-gray-600">
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