'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Users, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Play,
  Baby,
  Target,
  BookOpen,
  Award,
  MessageCircle,
  ChevronRight,
  Calendar,
  Stethoscope,
  Lock,
  Gift
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { fetchCourseLessons, CourseWithLessons } from '@/lib/api';

// Mock course data - in real app, this would come from API
const courseData = {
  1: {
    id: 1,
    title: "Hormone Reset: คอร์สออกกำลังปรับฮอร์โมน",
    instructor: "ดร.นิศา ฮอร์โมนแคร์",
    instructorTitle: "แพทย์เฉพาะทางต่อมไร้ท่อ",
    instructorExperience: "ประสบการณ์ 12+ ปี",
    duration: "10 สัปดาห์",
    totalLessons: 20,
    students: 1890,
    rating: 4.8,
    reviews: 298,
    price: 4490,
    originalPrice: 6490,
    category: "Hormonal Balance",
    level: "เริ่มต้น - ปานกลาง",
    language: "ภาษาไทย",
    image: "https://scontent.fbkk2-8.fna.fbcdn.net/v/t39.30808-6/481298223_1217952123033831_5937761994390873059_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=40lNCr78dCoQ7kNvwH2KfkB&_nc_oc=AdnfZ00IyMApu3eF6zX7w05KcCWfqeEqS7YQX1cIkzasI9QBvsla4HbBkTz5DtGR5v1cdUMOWwOMeooklUYwb--w&_nc_zt=23&_nc_ht=scontent.fbkk2-8.fna&_nc_gid=4HKY7h2LeYd2AV8-wt8gBg&oh=00_AfQ3WwIgKKSAP6DrvWjjNemDHMv5Gc-mfgRES7qN7fmtkw&oe=688D7CC5",
    description: "รีเซ็ตระบบฮอร์โมน ลดอาการ PMS, ปวดประจำเดือน, เครียด, นอนไม่หลับ, น้ำหนักขึ้นง่าย ด้วยการออกกำลังกายเฉพาะทาง",
    safetyInfo: {
      suitable: [
        "ผู้หญิงวัย 18-45 ปี",
        "มีปัญหาฮอร์โมนเบื้องต้น",
        "ต้องการปรับสมดุลร่างกาย",
        "สามารถออกกำลังกายได้ปกติ"
      ],
      notSuitable: [
        "มีภาวะหัวใจร้ายแรง",
        "ความดันโลหิตสูงไม่ได้รับการรักษา",
        "บาดเจ็บที่ข้อต่อหรือกระดูกสันหลัง",
        "วิงเวียนศีรษะรุนแรง",
        "มีปัญหาต่อมไทรอยด์รุนแรง"
      ],
      stopSigns: [
        "ปวดหน้าอก หรือ หายใจลำบาก",
        "ปวดศีรษะรุนแรงผิดปกติ",
        "วิงเวียนมากผิดปกติ",
        "ปวดข้อต่อหรือกล้ามเนื้อรุนแรง",
        "อาการปวดท้องรุนแรงที่ไม่ทราบสาเหตุ",
        "เหนื่อยล้าผิดปกติ"
      ]
    },
    curriculum: [
      {
        week: "สัปดาห์ที่ 1-3",
        title: "ทำความเข้าใจฮอร์โมนและการรีเซ็ต",
        lessons: [
          { title: "ทำความรู้จักระบบฮอร์โมนผู้หญิง", duration: "18 นาที", type: "theory" },
          { title: "การออกกำลังกายเบื้องต้นสำหรับสมดุลฮอร์โมน", duration: "25 นาที", type: "practice" },
          { title: "เทคนิคการหายใจเพื่อลดความเครียด", duration: "15 นาที", type: "meditation" },
          { title: "การติดตามอาการและความรู้สึก", duration: "12 นาที", type: "theory" }
        ]
      },
      {
        week: "สัปดาห์ที่ 4-7", 
        title: "การเสริมสร้างความแข็งแรงและสมดุล",
        lessons: [
          { title: "ออกกำลังกายแบบ HIIT เพื่อเผาผลาญ", duration: "30 นาที", type: "practice" },
          { title: "โยคะฮอร์โมนเฉพาะทาง", duration: "28 นาที", type: "practice" },
          { title: "การจัดการความเครียดและอารมณ์", duration: "15 นาที", type: "theory" },
          { title: "สตรองมูฟเมนต์เพื่อกล้ามเนื้อแกนกาย", duration: "22 นาที", type: "practice" }
        ]
      }
    ],
    benefits: [
      "ลดอาการ PMS และปวดประจำเดือน",
      "ปรับปรุงการนอนหลับและระดับพลังงาน", 
      "ลดความเครียดและปรับอารมณ์",
      "ควบคุมน้ำหนักได้ดีขึ้น",
      "ผิวพรรณและสุขภาพจิตดีขึ้น",
      "รอบเดือนสม่ำเสมอขึ้น"
    ],
    requirements: [
      "เสื่อโยคะ",
      "ดัมเบลเบา 1-3 กิโลกรัม (หรือใช้ขวดน้ำ)",
      "พื้นที่ออกกำลังกายขนาด 2x2 เมตร",
      "เครื่องเล่นวิดีโอ (มือถือ/แท็บเล็ต/คอมพิวเตอร์)"
    ]
  }
};

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
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดข้อมูลคอร์ส...</p>
        </div>
      </div>
    );
  }

  if (error || !courseData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-500 text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบข้อมูลคอร์ส</h2>
          <p className="text-gray-600 mb-6">
            {error || 'ไม่สามารถหาคอร์สที่คุณต้องการได้'}
          </p>
          <div className="space-y-3">
            <Link 
              href="/courses"
              className="block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              ดูคอร์สทั้งหมด
            </Link>
            <button 
              onClick={() => router.back()}
              className="block w-full text-gray-500 hover:text-orange-600 transition-colors"
            >
              ← กลับหน้าก่อน
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { course, lessons } = courseData;
  const freeLessons = lessons.filter(lesson => lesson.is_free);
  const paidLessons = lessons.filter(lesson => !lesson.is_free);

  // Default safety information for courses that don't have it in the API
  const defaultSafetyInfo = {
    suitable: [
      "ผู้หญิงวัย 18-50 ปี",
      "สามารถออกกำลังกายได้ปกติ",
      "ต้องการปรับปรุงสุขภาพ",
      "ไม่มีข้อจำกัดทางการแพทย์"
    ],
    notSuitable: [
      "มีปัญหาสุขภาพรุนแรง",
      "ได้รับคำแนะนำจากแพทย์ให้หลีกเลี่ยงการออกกำลังกาย",
      "มีการบาดเจ็บที่ยังไม่หาย",
      "ตั้งครรภ์โดยไม่ได้รับอนุญาตจากแพทย์"
    ],
    stopSigns: [
      "ปวดหน้าอก หรือ หายใจลำบาก",
      "ปวดศีรษะรุนแรงผิดปกติ",
      "วิงเวียนมากผิดปกติ",
      "ปวดข้อต่อหรือกล้ามเนื้อรุนแรง"
    ]
  };

  const safetyInfo = course.safetyInfo || defaultSafetyInfo;

  // Add default values for missing course properties
  const courseWithDefaults = {
    ...course,
    benefits: course.benefits || [
      "เพิ่มความแข็งแรงและความยืดหยุ่น",
      "ลดความเครียดและเพิ่มสมาธิ",
      "ปรับปรุงการนอนหลับ",
      "เสริมสร้างสมดุลและการประสานงาน",
      "เพิ่มพลังงานและความมั่นใจ",
      "ปรับปรุงสุขภาพโดยรวม"
    ],
    requirements: course.requirements || [
      "เสื่อโยคะ",
      "พื้นที่ออกกำลังกายขนาด 2x2 เมตร",
      "เครื่องเล่นวิดีโอ (มือถือ/แท็บเล็ต/คอมพิวเตอร์)",
      "น้ำดื่ม"
    ],
    instructor: course.instructor || "ทีม BoostMe",
    instructorTitle: course.instructorTitle || "ผู้เชี่ยวชาญสุขภาพผู้หญิง",
    instructorExperience: course.instructorExperience || "ประสบการณ์ 10+ ปี",
    students: course.students || 500,
    rating: course.rating || 4.8,
    image: course.image || "https://scontent.fbkk2-8.fna.fbcdn.net/v/t39.30808-6/481298223_1217952123033831_5937761994390873059_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=40lNCr78dCoQ7kNvwH2KfkB&_nc_oc=AdnfZ00IyMApu3eF6zX7w05KcCWfqeEqS7YQX1cIkzasI9QBvsla4HbBkTz5DtGR5v1cdUMOWwOMeooklUYwb--w&_nc_zt=23&_nc_ht=scontent.fbkk2-8.fna&_nc_gid=4HKY7h2LeYd2AV8-wt8gBg&oh=00_AfQ3WwIgKKSAP6DrvWjjNemDHMv5Gc-mfgRES7qN7fmtkw&oe=688D7CC5"
  };

  const handleStartCourse = () => {
    // Navigate to health assessment
    window.location.href = `/courses/${courseId}/assessment`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-50">
      
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-r from-orange-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Course Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2 text-orange-100">
                <Baby className="h-5 w-5" />
                <span className="text-sm font-medium">Exercise X Bebe</span>
                <span className="text-orange-200">•</span>
                <span className="text-sm">เริ่มต้น</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                {courseWithDefaults.title}
              </h1>
              
              <p className="text-lg text-orange-100 leading-relaxed">
                {courseWithDefaults.description || 'คอร์สออกกำลังกายเฉพาะผู้หญิง เพื่อสุขภาพที่ดีและรูปร่างที่สวยงาม'}
              </p>
              
              {/* Instructor */}
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold">ทีม BoostMe</div>
                  <div className="text-orange-100 text-sm">ผู้เชี่ยวชาญสุขภาพผู้หญิง</div>
                  <div className="text-orange-200 text-sm">ประสบการณ์ 10+ ปี</div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-orange-100">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>500+ คน</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-300 fill-current" />
                  <span>4.8 (100+ รีวิว)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{lessons.reduce((total, lesson) => total + lesson.duration_minutes, 0)} นาที</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{lessons.length} บทเรียน</span>
                </div>
              </div>
            </motion.div>

            {/* Course Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-orange-300/50 to-orange-400/50 rounded-xl mb-4 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url('${courseWithDefaults.image}')`
                    }}
                  >
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-4 hover:bg-white/30 transition-all duration-300"
                      >
                        <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
                      </motion.button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">฿1,000</div>
                      <div className="text-orange-200 line-through text-sm">฿1,400</div>
                    </div>
                    <div className="bg-yellow-300 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      ประหยัด 29%
                    </div>
                  </div>
                  
                  <button
                    onClick={handleStartCourse}
                    className="w-full bg-yellow-300 text-gray-900 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-200 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Stethoscope className="h-5 w-5" />
                    <span>ประเมินสุขภาพและเริ่มเรียน</span>
                  </button>
                  
                  <button 
                    onClick={() => setShowSafetyModal(true)}
                    className="w-full border-2 border-white text-white py-3 rounded-xl font-medium hover:bg-white hover:text-orange-500 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Shield className="h-5 w-5" />
                    <span>ข้อมูลความปลอดภัย</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Safety Information */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-red-50 border border-red-200 rounded-2xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-6 w-6 text-red-600" />
                  <h3 className="text-xl font-bold text-red-800">ข้อมูลความปลอดภัยสำคัญ</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      เหมาะสำหรับ:
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {safetyInfo.suitable.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      ไม่เหมาะสำหรับ:
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {safetyInfo.notSuitable.slice(0, 3).map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => setShowSafetyModal(true)}
                      className="text-red-600 text-sm font-medium mt-2 hover:text-red-700"
                    >
                      ดูข้อมูลเพิ่มเติม →
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Course Overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">เนื้อหาในคอร์ส</h3>
                
                {/* Free Lessons */}
                {freeLessons.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <Gift className="w-5 h-5 text-green-500" />
                      <h4 className="text-lg font-semibold text-gray-900">บทเรียนฟรี</h4>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        ดูได้ฟรี
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {freeLessons.map((lesson, index) => (
                        <motion.div
                          key={lesson.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Play className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                                  {lesson.order_index}. {lesson.title}
                                </h5>
                                <p className="text-sm text-gray-500">
                                  {lesson.description || 'บทเรียนพื้นฐาน'} • {lesson.duration_minutes} นาที
                                </p>
                              </div>
                            </div>
                            <Link 
                              href={`/lessons/${lesson.id}`}
                              className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
                            >
                              ดูฟรี
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Paid Lessons */}
                {paidLessons.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Lock className="w-5 h-5 text-orange-500" />
                      <h4 className="text-lg font-semibold text-gray-900">บทเรียนแบบเต็ม</h4>
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                        ต้องซื้อคอร์ส
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {paidLessons.map((lesson, index) => (
                        <motion.div
                          key={lesson.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (freeLessons.length + index) * 0.1 }}
                          className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Lock className="w-5 h-5 text-gray-400" />
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-700">
                                  {lesson.order_index}. {lesson.title}
                                </h5>
                                <p className="text-sm text-gray-500">
                                  {lesson.description || 'บทเรียนขั้นสูง'} • {lesson.duration_minutes} นาที
                                </p>
                              </div>
                            </div>
                            <div className="text-gray-400 text-sm">
                              ล็อค
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">ประโยชน์ที่คุณจะได้รับ</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseWithDefaults.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">สิ่งที่ต้องเตรียม</h3>
                
                <ul className="space-y-3">
                  {courseWithDefaults.requirements.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Instructor Details */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-orange-50 to-orange-50 rounded-2xl p-6 border border-orange-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">ผู้สอน</h3>
                
                <div className="text-center">
                  <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="h-8 w-8 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">{courseWithDefaults.instructor}</h4>
                  <p className="text-orange-600 text-sm font-medium">{courseWithDefaults.instructorTitle}</p>
                  <p className="text-gray-600 text-sm mt-2">{courseWithDefaults.instructorExperience}</p>
                  
                  <div className="mt-4 p-4 bg-white rounded-xl">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-orange-600">{courseWithDefaults.students.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">นักเรียน</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">{courseWithDefaults.rating}</div>
                        <div className="text-xs text-gray-600">คะแนน</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Support */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-blue-50 rounded-2xl p-6 border border-orange-200"
              >
                <div className="text-center">
                  <MessageCircle className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">ต้องการความช่วยเหลือ?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    ทีมผู้เชี่ยวชาญพร้อมให้คำปรึกษา
                  </p>
                  <button className="w-full bg-orange-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                    ปรึกษาผู้เชี่ยวชาญ
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Modal */}
      {showSafetyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Shield className="h-6 w-6 text-red-600 mr-3" />
                ข้อมูลความปลอดภัยครบถ้วน
              </h3>
              <button
                onClick={() => setShowSafetyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  หยุดออกกำลังกายทันทีเมื่อมีอาการเหล่านี้:
                </h4>
                <ul className="space-y-2">
                  {safetyInfo.stopSigns.map((sign, index) => (
                    <li key={index} className="flex items-start text-red-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="font-semibold text-green-800 mb-3">✅ เหมาะสำหรับ:</h4>
                  <ul className="space-y-1">
                    {safetyInfo.suitable.map((item, index) => (
                      <li key={index} className="text-green-700 text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <h4 className="font-semibold text-red-800 mb-3">❌ ไม่เหมาะสำหรับ:</h4>
                  <ul className="space-y-1">
                    {safetyInfo.notSuitable.map((item, index) => (
                      <li key={index} className="text-red-700 text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ ข้อควรระวัง:</h4>
                <p className="text-yellow-700 text-sm">
                  กรุณาปรึกษาแพทย์ผู้ดูแลการตั้งครรภ์ก่อนเริ่มโปรแกรมการออกกำลังกายใดๆ 
                  และหยุดทันทีหากมีอาการผิดปกติ
                </p>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setShowSafetyModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  ปิด
                </button>
                <button
                  onClick={() => {
                    setShowSafetyModal(false);
                    handleStartCourse();
                  }}
                  className="flex-1 bg-orange-600 text-white py-3 rounded-xl font-medium hover:bg-orange-700 transition-colors"
                >
                  เข้าใจแล้ว เริ่มประเมินสุขภาพ
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 