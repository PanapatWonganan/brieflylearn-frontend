'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Trophy, TrendingUp, Calendar, Clock, Target, ChevronRight, Medal, BarChart3, Award, AlertCircle } from 'lucide-react'
import { fetchExamResults, ExamResult as ApiExamResult } from '@/lib/api/exams'
import { useAuth } from '@/contexts/AuthContextNew'
import { DashboardSkeleton } from '@/components/Skeleton'

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

const convertResult = (apiResult: ApiExamResult): ExamResult => ({
  id: apiResult.id,
  examTitle: apiResult.exam?.title || 'ไม่ระบุ',
  category: apiResult.exam?.category || 'ไม่ระบุ',
  completedAt: apiResult.completed_at,
  duration: apiResult.duration_minutes || 0,
  score: apiResult.score,
  totalQuestions: apiResult.total_questions || 0,
  correctAnswers: apiResult.correct_answers || 0,
  percentile: apiResult.percentile || 0,
  status: apiResult.passed ? 'ผ่าน' : 'ไม่ผ่าน',
  difficulty: apiResult.exam?.difficulty || 'intermediate'
})

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-mint-400'
  if (score >= 70) return 'text-mint-400'
  if (score >= 60) return 'text-warning'
  return 'text-red-400'
}

const getScoreBackground = (score: number) => {
  return 'border border-gray-700/50'
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
  const router = useRouter()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const [selectedTab, setSelectedTab] = useState<'all' | 'passed' | 'failed'>('all')
  const [results, setResults] = useState<ExamResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authLoading && !isAuthenticated) {
      router.push('/auth')
      return
    }

    if (isAuthenticated) {
      loadResults()
    }
  }, [isAuthenticated, authLoading, router])

  const loadResults = async () => {
    setLoading(true)
    setError(null)

    const result = await fetchExamResults()

    if (result.error) {
      setError(result.error)
      setResults([])
    } else if (result.data) {
      const convertedResults = result.data.map(convertResult)
      setResults(convertedResults)
    }

    setLoading(false)
  }

  const filteredResults = results.filter(result => {
    if (selectedTab === 'passed') return result.status === 'ผ่าน'
    if (selectedTab === 'failed') return result.status === 'ไม่ผ่าน'
    return true
  })

  const totalExams = results.length
  const passedExams = results.filter(r => r.status === 'ผ่าน').length
  const averageScore = totalExams > 0 ? results.reduce((sum, r) => sum + r.score, 0) / totalExams : 0
  const bestScore = totalExams > 0 ? Math.max(...results.map(r => r.score)) : 0

  if (authLoading || (loading && isAuthenticated)) {
    return <DashboardSkeleton />
  }

  // Don't render anything if redirecting to auth
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="border-b border-gray-800/40 py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-4">
              ผลประเมิน
            </div>
            <h1 className="text-heading font-serif text-gray-100 mb-6">
              ผลการประเมิน
            </h1>
            <p className="text-base text-gray-400 leading-relaxed mb-8">
              ติดตามและวิเคราะห์ผลการประเมินด้าน AI เพื่อวางแผนการเรียนรู้ต่อไป
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gray-900 border border-gray-700/50 shadow-card rounded-sm p-6 text-center">
            <BarChart3 className="h-8 w-8 text-gray-200 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-200">{totalExams}</div>
            <div className="text-sm text-gray-500">แบบประเมินทั้งหมด</div>
          </div>
          <div className="bg-gray-900 border border-gray-700/50 shadow-card rounded-sm p-6 text-center">
            <Trophy className="h-8 w-8 text-gray-200 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-200">{passedExams}</div>
            <div className="text-sm text-gray-500">ผ่านการประเมิน</div>
          </div>
          <div className="bg-gray-900 border border-gray-700/50 shadow-card rounded-sm p-6 text-center">
            <Target className="h-8 w-8 text-gray-200 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-200">{averageScore.toFixed(1)}%</div>
            <div className="text-sm text-gray-500">คะแนนเฉลี่ย</div>
          </div>
          <div className="bg-gray-900 border border-gray-700/50 shadow-card rounded-sm p-6 text-center">
            <Award className="h-8 w-8 text-gray-200 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-200">{bestScore}%</div>
            <div className="text-sm text-gray-500">คะแนนสูงสุด</div>
          </div>
        </div>

        {/* Progress Chart Placeholder */}
        {totalExams > 0 && (
          <div className="bg-gray-900 border border-gray-700/50 shadow-card rounded-sm p-6 mb-8">
            <h2 className="text-xl font-semibold font-serif text-gray-200 mb-4 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>แนวโน้มคะแนนการประเมิน</span>
            </h2>
            <div className="h-64 bg-gray-800/50 rounded-sm flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">กราฟแสดงแนวโน้มการพัฒนาทักษะ AI</p>
                <p className="text-gray-600 text-sm">จะแสดงเมื่อมีข้อมูลเพิ่มเติม</p>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-sm p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-red-400 font-medium mb-1">เกิดข้อผิดพลาด</h3>
                <p className="text-red-400 text-sm mb-3">{error}</p>
                <button
                  onClick={loadResults}
                  className="text-sm text-red-400 hover:text-red-400 font-medium underline"
                >
                  ลองใหม่อีกครั้ง
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        {totalExams > 0 && (
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                selectedTab === 'all'
                  ? 'bg-mint-600 text-white'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800/50 border border-gray-700/50'
              }`}
            >
              ทั้งหมด ({totalExams})
            </button>
            <button
              onClick={() => setSelectedTab('passed')}
              className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                selectedTab === 'passed'
                  ? 'bg-mint-600 text-white'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800/50 border border-gray-700/50'
              }`}
            >
              ผ่าน ({passedExams})
            </button>
            <button
              onClick={() => setSelectedTab('failed')}
              className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                selectedTab === 'failed'
                  ? 'bg-mint-600 text-white'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800/50 border border-gray-700/50'
              }`}
            >
              ไม่ผ่าน ({totalExams - passedExams})
            </button>
          </div>
        )}

        {/* Results List */}
        {!error && filteredResults.length > 0 && (
          <div className="space-y-4">
            {filteredResults.map((result) => (
              <div
                key={result.id}
                className={`bg-gray-900 rounded-sm p-6 shadow-card transition-all ${getScoreBackground(result.score)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-200">
                        {result.examTitle}
                      </h3>
                      <span className={`px-3 py-1 rounded-sm text-sm font-medium ${
                        result.status === 'ผ่าน'
                          ? 'bg-mint-500/10 text-mint-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        {result.status}
                      </span>
                    </div>

                    <div className="text-sm text-gray-500 mb-4">
                      หมวดหมู่: {result.category} • ระดับ: {result.difficulty}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          คะแนน: <span className={`font-bold ${getScoreColor(result.score)}`}>
                            {result.score}%
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Medal className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          อันดับ: {result.percentile}%
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {formatDuration(result.duration)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {formatDate(result.completedAt)}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                        <span>ตอบถูก {result.correctAnswers} จาก {result.totalQuestions} ข้อ</span>
                        <span>{result.score}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-mint-600"
                          style={{ width: `${result.score}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="ml-6">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-mint-500 hover:bg-[length:100%_150%] text-white rounded-sm transition-colors">
                      <span>ดูรายละเอียด</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!error && filteredResults.length === 0 && !loading && (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-200 mb-2">ไม่พบผลการประเมิน</h3>
            <p className="text-gray-500">
              {selectedTab === 'passed' && 'ยังไม่มีผลประเมินที่ผ่าน'}
              {selectedTab === 'failed' && 'ไม่มีผลประเมินที่ไม่ผ่าน'}
              {selectedTab === 'all' && 'ยังไม่มีผลการประเมิน เริ่มทำแบบประเมินเพื่อดูผลลัพธ์'}
            </p>
            {selectedTab === 'all' && (
              <button
                onClick={() => router.push('/exams')}
                className="mt-4 bg-mint-600 text-white px-6 py-2 rounded-sm hover:opacity-90 transition-colors"
              >
                ไปที่หน้าแบบประเมิน
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
