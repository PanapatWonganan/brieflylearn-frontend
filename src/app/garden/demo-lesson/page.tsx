'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  CheckCircle, 
  Star, 
  BookOpen, 
  Clock, 
  Trophy,
  ArrowLeft,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { courseIntegrationAPI, LessonCompletionResponse } from '@/lib/garden/courseIntegrationApi'
import CourseCompletionCelebration from '@/components/garden/CourseCompletionCelebration'
import { useNotification } from '@/contexts/NotificationContext'

const DemoLessonPage = () => {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [completingLesson, setCompletingLesson] = useState<string | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationData, setCelebrationData] = useState<any>(null)
  const { addNotification } = useNotification()

  // Demo lessons from our course
  const demoLessons = [
    {
      id: '0198b255-70b6-70e0-b85e-8815faa3cb7e',
      title: 'โยคะพื้นฐาน - บทที่ 1',
      description: 'เรียนรู้ท่าโยคะพื้นฐานสำหรับการเริ่มต้น',
      duration: 10,
      isCompleted: true // Already completed in our tests
    },
    {
      id: '0198b25a-0787-739c-aa62-2841ee3b84dd',
      title: 'โยคะพื้นฐาน - บทที่ 2',
      description: 'ท่าโยคะสำหรับผ่อนคลายกล้ามเนื้อ',
      duration: 5,
      isCompleted: true // Already completed in our tests
    },
    {
      id: '0198b25b-ccc3-71a2-b7be-b8693edd86a3',
      title: 'โยคะพื้นฐาน - บทที่ 3',
      description: 'การหายใจที่ถูกต้องในการทำโยคะ',
      duration: 5,
      isCompleted: true // Already completed in our tests
    },
    {
      id: '0198b25c-2920-7080-895d-05359419ee2b',
      title: 'โยคะพื้นฐาน - บทที่ 4',
      description: 'การฝึกโยคะเพื่อสุขภาพโดยรวม',
      duration: 4,
      isCompleted: true // Already completed in our tests
    }
  ]

  const handleCompleteLesson = async (lessonId: string, duration: number) => {
    try {
      setCompletingLesson(lessonId)
      
      // Call the course integration API
      const response: LessonCompletionResponse = await courseIntegrationAPI.completeLessonWithRewards(
        lessonId,
        { watch_time: duration }
      )

      if (response.success) {
        // Update lesson status
        const lesson = demoLessons.find(l => l.id === lessonId)
        if (lesson) {
          lesson.isCompleted = true
        }

        // Show success notification
        addNotification({
          type: 'success',
          title: 'เรียนจบบทเรียนแล้ว! 🎉',
          message: `ได้รับ ${response.data.garden_progress.garden_xp} XP และ ${response.data.garden_progress.star_seeds} Star Seeds`,
          duration: 5000
        })

        // If course completed, show celebration
        if (response.data.course_completed) {
          setCelebrationData({
            course: {
              id: '0198b253-9405-705d-bd25-8a0a5b787401',
              title: 'โยคะเริ่มต้น',
              total_lessons: 4
            },
            rewards: {
              xp_earned: 25, // Base lesson XP
              star_seeds_earned: 8,
              bonus_xp: 150, // Course completion bonus
              bonus_star_seeds: 75
            },
            achievements: [
              {
                id: '1',
                name: 'นักเรียนขยัน',
                description: 'เรียนจบ 10 บทเรียน',
                xp_reward: 100,
                star_seeds_reward: 50
              }
            ],
            new_level: response.data.garden_progress.garden_level > 1 ? response.data.garden_progress.garden_level : undefined
          })
          setShowCelebration(true)
        }

        console.log('Lesson completion response:', response)
      }
    } catch (error) {
      console.error('Failed to complete lesson:', error)
      addNotification({
        type: 'error',
        title: 'เกิดข้อผิดพลาด',
        message: 'ไม่สามารถบันทึกความก้าวหน้าได้',
        duration: 5000
      })
    } finally {
      setCompletingLesson(null)
    }
  }

  const simulateWatchLesson = (lessonId: string, duration: number) => {
    setSelectedLesson(lessonId)
    
    // Simulate watching the lesson
    setTimeout(() => {
      handleCompleteLesson(lessonId, duration)
    }, 2000) // 2 seconds to simulate watching
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/garden"
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                  <span>ทดสอบ Course Integration</span>
                </h1>
                <p className="text-gray-600 mt-1">เรียนจบบทเรียนเพื่อรับ Garden Rewards</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              🌱 Course-Garden Integration Demo
            </h2>
            <p className="text-gray-600">
              เลือกบทเรียนเพื่อทดสอบระบบเชื่อมโยงระหว่างการเรียนกับ Garden Rewards
            </p>
          </div>

          {/* Integration Info */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>ระบบ Garden Integration</span>
            </h3>
            <div className="text-sm text-green-700 space-y-1">
              <p>• ✅ เรียนจบ lesson → ได้ XP + Star Seeds อัตโนมัติ</p>
              <p>• ✅ เรียนจบ course → ได้โบนัส reward พิเศษ</p>
              <p>• ✅ Achievement system → ปลดล็อคตาม progress</p>
              <p>• ✅ Real-time garden updates → เห็นผลทันที</p>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demoLessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                lesson.isCompleted 
                  ? 'border-2 border-green-200 bg-green-50' 
                  : 'hover:shadow-xl'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{lesson.title}</h3>
                  {lesson.isCompleted && (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{lesson.duration} นาที</span>
                  </div>
                </div>

                {lesson.isCompleted ? (
                  <div className="flex items-center justify-center py-3 bg-green-100 rounded-xl">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-green-700 font-medium">เรียนจบแล้ว</span>
                  </div>
                ) : (
                  <motion.button
                    onClick={() => simulateWatchLesson(lesson.id, lesson.duration)}
                    disabled={completingLesson === lesson.id || selectedLesson === lesson.id}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-blue-300 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    {completingLesson === lesson.id ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        <span>กำลังบันทึก...</span>
                      </>
                    ) : selectedLesson === lesson.id ? (
                      <>
                        <Play className="h-5 w-5" />
                        <span>กำลังดู...</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" />
                        <span>เริ่มเรียน</span>
                      </>
                    )}
                  </motion.button>
                )}

                {/* Expected Rewards Preview */}
                {!lesson.isCompleted && (
                  <div className="mt-4 bg-yellow-50 rounded-xl p-3">
                    <h4 className="text-sm font-semibold text-yellow-800 mb-2 flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>รางวัลที่จะได้รับ</span>
                    </h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-yellow-700">XP: +{20 + lesson.duration}</span>
                      <span className="text-yellow-700">⭐ Seeds: +{Math.floor((20 + lesson.duration) * 0.3)}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center space-x-2">
            <Trophy className="h-5 w-5" />
            <span>วิธีทดสอบ</span>
          </h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>1. 📚 คลิก "เริ่มเรียน" ในบทเรียนที่ยังไม่จบ</p>
            <p>2. ⏱️ รอ 2 วินาที (จำลองการดูบทเรียน)</p>
            <p>3. 🎉 ระบบจะเรียก API เพื่อบันทึกความก้าวหน้า</p>
            <p>4. 🌱 ได้รับ Garden Rewards อัตโนมัติ</p>
            <p>5. 🏆 ถ้าเรียนจบครบทุกบท จะเห็น Course Completion Celebration</p>
          </div>
        </div>

        {/* Back to Garden */}
        <div className="mt-8 text-center">
          <Link 
            href="/garden"
            className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>กลับไปสวน</span>
          </Link>
        </div>
      </div>

      {/* Course Completion Celebration Modal */}
      {celebrationData && (
        <CourseCompletionCelebration
          data={celebrationData}
          isVisible={showCelebration}
          onClose={() => {
            setShowCelebration(false)
            setCelebrationData(null)
          }}
        />
      )}
    </div>
  )
}

export default DemoLessonPage