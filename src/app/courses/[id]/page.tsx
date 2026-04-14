'use client';

import React, { useState, useEffect } from 'react';
import {
  Star,
  Clock,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle,
  Play,
  Target,
  BookOpen,
  MessageCircle,
  Lock,
  Gift,
  AlertCircle,
  User
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { fetchCourseLessons, CourseWithLessons } from '@/lib/api';

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const [courseData, setCourseData] = useState<CourseWithLessons | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSafetyModal, setShowSafetyModal] = useState(false);

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    setLoading(true);
    setError(null);

    // If courseId is a number like "198", try to find a course from the courses list
    if (/^\d+$/.test(courseId)) {
      // For demo purposes, redirect to the existing course
      const demoCoursesMapping: { [key: string]: string } = {
        '1': '0198b253-9405-705d-bd25-8a0a5b787401',
        '2': '0198b253-9405-705d-bd25-8a0a5b787401',
        '198': '0198b253-9405-705d-bd25-8a0a5b787401'
      };

      const realCourseId = demoCoursesMapping[courseId];
      if (realCourseId) {
        router.replace(`/courses/${realCourseId}`);
        return;
      }
    }

    const result = await fetchCourseLessons(courseId);

    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setCourseData(result.data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-700 border-t-mint-400 mx-auto mb-4"></div>
          <p className="text-gray-400">กำลังโหลดข้อมูลคอร์ส...</p>
        </div>
      </div>
    );
  }

  if (error || !courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-5">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-200 mb-4">ไม่พบข้อมูลคอร์ส</h2>
          <p className="text-gray-400 mb-6">
            {error || 'ไม่สามารถหาคอร์สที่คุณต้องการได้'}
          </p>
          <div className="space-y-3">
            <Link
              href="/courses"
              className="block bg-mint-600 text-white px-6 py-3 rounded-sm hover:opacity-90 transition-colors"
            >
              ดูคอร์สทั้งหมด
            </Link>
            <button
              onClick={() => router.back()}
              className="block w-full text-gray-500 hover:text-gray-200 transition-colors"
            >
              กลับหน้าก่อน
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { course, lessons } = courseData;
  const freeLessons = lessons.filter(lesson => lesson.is_free);
  const paidLessons = lessons.filter(lesson => !lesson.is_free);

  // Default prerequisite information for AI courses
  const defaultSafetyInfo = {
    suitable: [
      "ผู้ที่ต้องการเรียนรู้ AI เพื่อพัฒนาธุรกิจ",
      "ผู้ประกอบการที่อยากใช้ AI สร้างรายได้",
      "ผู้บริหารที่ต้องนำ AI เข้าองค์กร",
      "ไม่จำเป็นต้องมีพื้นฐานโปรแกรมมิ่ง"
    ],
    notSuitable: [
      "ผู้ที่ต้องการเรียนเขียนโค้ด AI เชิงลึก (แนะนำคอร์ส Developer)",
      "ผู้ที่ไม่มีคอมพิวเตอร์หรืออินเทอร์เน็ต",
      "ผู้ที่ต้องการใบรับรองวิชาชีพ (Professional Certification)"
    ],
    stopSigns: [
      "หากรู้สึกว่าเนื้อหายากเกินไป สามารถย้อนกลับไปทบทวนบทเรียนก่อนหน้า",
      "หากมีข้อสงสัย สามารถตั้งคำถามในคอมมิวนิตี้ได้ทันที",
      "หากต้องการคำปรึกษาเฉพาะทาง สามารถจอง 1-on-1 กับผู้เชี่ยวชาญ"
    ]
  };

  const safetyInfo = defaultSafetyInfo;

  // Add default values for missing course properties
  const courseWithDefaults = {
    ...course,
    benefits: [
      "เข้าใจหลักการทำงานของ AI และนำไปประยุกต์ใช้ได้จริง",
      "ใช้ AI เครื่องมือต่างๆ เพิ่มประสิทธิภาพการทำงาน",
      "สร้างรายได้หรือลดต้นทุนด้วย AI",
      "เขียน Prompt ที่ได้ผลลัพธ์ตรงใจ",
      "เข้าถึงคอมมิวนิตี้และผู้เชี่ยวชาญด้าน AI",
      "ได้ Certificate หลังเรียนจบคอร์ส"
    ],
    requirements: [
      "คอมพิวเตอร์หรือแท็บเล็ตที่เชื่อมต่ออินเทอร์เน็ต",
      "บัญชี ChatGPT หรือ Claude (ฟรีหรือ Pro)",
      "ไม่ต้องมีพื้นฐานโปรแกรมมิ่ง",
      "ใจที่พร้อมเรียนรู้สิ่งใหม่"
    ],
    instructor: "ทีม Antipararell",
    instructorTitle: "ผู้เชี่ยวชาญด้าน AI",
    instructorExperience: "ประสบการณ์ด้าน AI 5+ ปี",
    students: 500,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800"
  };

  const handleStartCourse = () => {
    // Navigate to health assessment
    window.location.href = `/courses/${courseId}/assessment`;
  };

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="bg-gray-900/50 border-b border-gray-700/50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Course Info - Left 2/3 */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-2 text-gray-500">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm font-medium">AI Course</span>
                <span className="text-gray-600">•</span>
                <span className="text-sm">เริ่มต้น</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-200 leading-tight">
                {courseWithDefaults.title}
              </h1>

              <p className="text-lg text-gray-400 leading-relaxed">
                {courseWithDefaults.description || 'คอร์สเรียน AI สำหรับสร้างธุรกิจและบริหารองค์กรอย่างชาญฉลาด'}
              </p>

              {/* Instructor */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-mint-900/50 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-mint-400" />
                </div>
                <div>
                  <div className="font-semibold text-gray-200">{courseWithDefaults.instructor}</div>
                  <div className="text-gray-400 text-sm">{courseWithDefaults.instructorTitle}</div>
                  <div className="text-gray-500 text-sm">{courseWithDefaults.instructorExperience}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-gray-500">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">{courseWithDefaults.students.toLocaleString()}+ คน</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-gray-200" fill="currentColor" />
                  <span className="text-sm">{courseWithDefaults.rating} (100+ รีวิว)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm">{lessons.reduce((total, lesson) => total + lesson.duration_minutes, 0)} นาที</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span className="text-sm">{lessons.length} บทเรียน</span>
                </div>
              </div>
            </div>

            {/* Price Card - Right 1/3 */}
            <div className="lg:col-span-1">
              <div className="border border-gray-700/50 rounded-sm p-6 space-y-4 sticky top-24">
                <div className="aspect-video bg-gray-800/50 rounded-sm overflow-hidden mb-4">
                  <div
                    className="w-full h-full bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url('${courseWithDefaults.image}')`
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors">
                        <Play className="h-5 w-5 text-gray-900 ml-0.5" fill="currentColor" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-200">฿1,000</div>
                    <div className="text-gray-500 line-through text-sm">฿1,400</div>
                  </div>
                  <div className="bg-mint-900/50 text-mint-300 px-3 py-1 rounded-full text-sm font-medium">
                    ประหยัด 29%
                  </div>
                </div>

                <button
                  onClick={handleStartCourse}
                  className="w-full bg-mint-600 text-white py-3 rounded-sm font-semibold hover:opacity-90 transition-colors flex items-center justify-center space-x-2"
                >
                  <Target className="h-5 w-5" />
                  <span>ทำแบบประเมินและเริ่มเรียน</span>
                </button>

                <button
                  onClick={() => setShowSafetyModal(true)}
                  className="w-full border border-gray-700 text-gray-200 py-3 rounded-sm font-medium hover:bg-gray-800/50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Shield className="h-5 w-5" />
                  <span>ข้อมูลเพิ่มเติม</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Content - Left 2/3 */}
            <div className="lg:col-span-2 space-y-8">

              {/* Prerequisites Information */}
              <div className="bg-gray-800 border border-gray-600 rounded-sm p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-6 w-6 text-mint-400" />
                  <h3 className="text-xl font-bold text-gray-200">ข้อมูลสำคัญก่อนเรียน</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-mint-300 mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      เหมาะสำหรับ:
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-400">
                      {safetyInfo.suitable.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-mint-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-warning mb-3 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      หมายเหตุ:
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-400">
                      {safetyInfo.notSuitable.slice(0, 3).map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-warning rounded-full mt-2 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setShowSafetyModal(true)}
                      className="text-mint-400 text-sm font-medium mt-2 hover:opacity-90"
                    >
                      ดูข้อมูลเพิ่มเติม →
                    </button>
                  </div>
                </div>
              </div>

              {/* Course Overview */}
              <div className="bg-gray-900 border border-gray-700/50 rounded-sm p-6">
                <h3 className="text-2xl font-bold text-gray-200 mb-6">เนื้อหาในคอร์ส</h3>

                {/* Free Lessons */}
                {freeLessons.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <Gift className="w-5 h-5 text-mint-400" />
                      <h4 className="text-lg font-semibold text-gray-200">บทเรียนฟรี</h4>
                      <span className="bg-mint-900/50 text-mint-300 px-2 py-1 rounded-full text-xs border border-mint-700">
                        ดูได้ฟรี
                      </span>
                    </div>

                    <div className="space-y-3">
                      {freeLessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="border border-gray-700/50 rounded-sm p-4 hover:border-gray-700 transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-mint-900/50 rounded-sm flex items-center justify-center">
                                <Play className="w-5 h-5 text-mint-400" />
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-200 group-hover:text-mint-400 transition-colors">
                                  {lesson.order_index}. {lesson.title}
                                </h5>
                                <p className="text-sm text-gray-400">
                                  {lesson.description || 'บทเรียนพื้นฐาน'} • {lesson.duration_minutes} นาที
                                </p>
                              </div>
                            </div>
                            <Link
                              href={`/lessons/${lesson.id}`}
                              className="bg-mint-600 text-white px-4 py-2 rounded-sm text-sm hover:opacity-90 transition-colors"
                            >
                              ดูฟรี
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Paid Lessons */}
                {paidLessons.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Lock className="w-5 h-5 text-mint-400" />
                      <h4 className="text-lg font-semibold text-gray-200">บทเรียนแบบเต็ม</h4>
                      <span className="bg-mint-900/50 text-mint-300 px-2 py-1 rounded-full text-xs border border-gray-700/50">
                        ต้องซื้อคอร์ส
                      </span>
                    </div>

                    <div className="space-y-3">
                      {paidLessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="border border-gray-700/50 rounded-sm p-4 bg-gray-800/50"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gray-700 rounded-sm flex items-center justify-center">
                                <Lock className="w-5 h-5 text-gray-400" />
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-500">
                                  {lesson.order_index}. {lesson.title}
                                </h5>
                                <p className="text-sm text-gray-400">
                                  {lesson.description || 'บทเรียนขั้นสูง'} • {lesson.duration_minutes} นาที
                                </p>
                              </div>
                            </div>
                            <div className="text-gray-500 text-sm">
                              ล็อค
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Benefits */}
              <div className="bg-gray-900 border border-gray-700/50 rounded-sm p-6">
                <h3 className="text-2xl font-bold text-gray-200 mb-6">ประโยชน์ที่คุณจะได้รับ</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseWithDefaults.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-mint-400 flex-shrink-0" />
                      <span className="text-gray-400">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Right 1/3 */}
            <div className="space-y-6">

              {/* Requirements */}
              <div className="bg-gray-900 border border-gray-700/50 rounded-sm p-6">
                <h3 className="text-lg font-bold text-gray-200 mb-4">สิ่งที่ต้องเตรียม</h3>

                <ul className="space-y-3">
                  {courseWithDefaults.requirements.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-mint-400 rounded-full flex-shrink-0" />
                      <span className="text-gray-400 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructor Details */}
              <div className="bg-gray-900 border border-gray-700/50 rounded-sm p-6">
                <h3 className="text-lg font-bold text-gray-200 mb-4">ผู้สอน</h3>

                <div className="text-center">
                  <div className="bg-mint-900/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-mint-400" />
                  </div>
                  <h4 className="font-semibold text-gray-200">{courseWithDefaults.instructor}</h4>
                  <p className="text-mint-400 text-sm font-medium">{courseWithDefaults.instructorTitle}</p>
                  <p className="text-gray-500 text-sm mt-2">{courseWithDefaults.instructorExperience}</p>

                  <div className="mt-4 p-4 bg-gray-800/50 rounded-sm border border-gray-700/50">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-mint-400">{courseWithDefaults.students.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">นักเรียน</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-mint-400">{courseWithDefaults.rating}</div>
                        <div className="text-xs text-gray-500">คะแนน</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-gray-900 border border-gray-700/50 rounded-sm p-6">
                <div className="text-center">
                  <MessageCircle className="h-8 w-8 text-mint-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-200 mb-2">ต้องการความช่วยเหลือ?</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    ทีมผู้เชี่ยวชาญพร้อมให้คำปรึกษา
                  </p>
                  <button className="w-full bg-mint-600 text-white py-2 rounded-sm text-sm font-medium hover:opacity-90 transition-colors">
                    ปรึกษาผู้เชี่ยวชาญ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Modal */}
      {showSafetyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-sm p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-200 flex items-center">
                <Shield className="h-6 w-6 text-mint-400 mr-3" />
                ข้อมูลคอร์สเพิ่มเติม
              </h3>
              <button
                onClick={() => setShowSafetyModal(false)}
                className="text-gray-500 hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800 border border-gray-600 rounded-sm p-4">
                <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  คำแนะนำระหว่างเรียน:
                </h4>
                <ul className="space-y-2">
                  {safetyInfo.stopSigns.map((sign, index) => (
                    <li key={index} className="flex items-start text-gray-400">
                      <div className="w-2 h-2 bg-mint-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-mint-900/50 border border-mint-700 rounded-sm p-4">
                  <h4 className="font-semibold text-mint-300 mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    เหมาะสำหรับ:
                  </h4>
                  <ul className="space-y-1">
                    {safetyInfo.suitable.map((item, index) => (
                      <li key={index} className="text-mint-300 text-sm">{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-800 border border-gray-600 rounded-sm p-4">
                  <h4 className="font-semibold text-warning mb-3 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    หมายเหตุ:
                  </h4>
                  <ul className="space-y-1">
                    {safetyInfo.notSuitable.map((item, index) => (
                      <li key={index} className="text-warning text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-mint-900/50 border border-mint-700 rounded-sm p-4">
                <h4 className="font-semibold text-mint-300 mb-2 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  สิ่งที่คุณจะได้รับ:
                </h4>
                <p className="text-mint-300 text-sm">
                  เข้าถึงเนื้อหาคอร์สทั้งหมด พร้อม Prompt Templates, Case Study จริง
                  และสิทธิ์เข้าคอมมิวนิตี้ถามตอบกับผู้เชี่ยวชาญด้าน AI
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowSafetyModal(false)}
                  className="flex-1 border border-gray-700 text-gray-200 py-3 rounded-sm font-medium hover:bg-gray-800/50 transition-colors"
                >
                  ปิด
                </button>
                <button
                  onClick={() => {
                    setShowSafetyModal(false);
                    handleStartCourse();
                  }}
                  className="flex-1 bg-mint-600 text-white py-3 rounded-sm font-medium hover:opacity-90 transition-colors"
                >
                  เข้าใจแล้ว เริ่มเรียนเลย
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
