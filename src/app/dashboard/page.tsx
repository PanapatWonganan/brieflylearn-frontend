'use client'

import { useAuth } from '@/contexts/AuthContextNew'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { dashboardAPI, DashboardData } from '@/lib/api/dashboard'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Star, 
  BookOpen, 
  Trophy, 
  Users, 
  Calendar,
  CheckCircle,
  Target,
  Award,
  Crown,
  Gift,
  TrendingUp,
  Play,
  Clock,
  FileText
} from 'lucide-react'

export default function DashboardPage() {
  const { user, logout, loading, isAuthenticated } = useAuth()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [dashboardLoading, setDashboardLoading] = useState(true)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth')
    }
  }, [isAuthenticated, loading, router])

  useEffect(() => {
    if (isAuthenticated && user) {
      loadDashboardData()
    }
  }, [isAuthenticated, user])

  const loadDashboardData = async () => {
    try {
      setDashboardLoading(true)
      const data = await dashboardAPI.getDashboardData()
      setDashboardData(data)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setDashboardLoading(false)
    }
  }

  if (loading || dashboardLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-700 mx-auto"></div>
          <p className="mt-4 text-orange-600 dark:text-gray-300">
            {loading ? 'กำลังตรวจสอบการเข้าสู่ระบบ...' : 'กำลังโหลดข้อมูล Dashboard...'}
          </p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const getRoleInfo = (role: string) => {
    switch (role) {
      case 'instructor':
        return {
          title: 'อาจารย์ผู้สอน',
          subtitle: 'แชร์ความรู้และช่วยพัฒนาผู้เรียน',
          color: 'from-purple-600 to-orange-600',
          icon: Crown
        }
      case 'admin':
        return {
          title: 'ผู้ดูแลระบบ',
          subtitle: 'จัดการระบบและช่วยเหลือผู้ใช้',
          color: 'from-gray-900 to-gray-800',
          icon: Award
        }
      default:
        return {
          title: 'ผู้เรียน',
          subtitle: 'เริ่มต้นการเดินทางสู่การพัฒนาตัวเองอย่างยั่งยืน',
          color: 'from-orange-600 to-orange-700',
          icon: GraduationCap
        }
    }
  }

  const roleInfo = getRoleInfo(user.role)
  const RoleIcon = roleInfo.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-gray-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className={`bg-gradient-to-r ${roleInfo.color} p-3 rounded-2xl shadow-lg`}>
              <RoleIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            สวัสดี{user.fullName ? `คุณ${user.fullName}` : ''} 🎓
          </h1>
          <p className="text-orange-600 dark:text-gray-300 text-lg">
            {roleInfo.subtitle}
          </p>
        </motion.div>

        {/* User Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`bg-gradient-to-r ${roleInfo.color} rounded-3xl p-8 text-white mb-8 shadow-xl`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName || user.email}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                ) : (
                  <RoleIcon className="w-10 h-10 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {user.fullName || user.email}
                </h2>
                <p className="text-white/80 mb-2">{roleInfo.title}</p>
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                    user.emailVerified ? 'bg-green-400/30' : 'bg-yellow-400/30'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      user.emailVerified ? 'bg-green-300' : 'bg-yellow-300'
                    }`}></div>
                    <span className="text-xs">
                      {user.emailVerified ? 'ยืนยันแล้ว' : 'รอยืนยัน'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/20">
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs">สมาชิกใหม่</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">
                {dashboardData?.stats.enrolledCourses || 0}
              </div>
              <div className="text-white/80 text-sm">
                {user.role === 'student' ? 'คอร์สที่เรียน' : user.role === 'instructor' ? 'คอร์สที่สอน' : 'ระบบทั้งหมด'}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-3 rounded-xl">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-orange-600 dark:text-gray-300 text-sm font-medium">
                      {user.role === 'student' ? 'คอร์สที่ลงทะเบียน' : 'คอร์สทั้งหมด'}
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {dashboardData?.stats.enrolledCourses || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-orange-600 dark:text-gray-300 text-sm font-medium">ความก้าวหน้า</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {Math.round(dashboardData?.stats.totalProgress || 0)}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-purple-500 to-orange-600 p-3 rounded-xl">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-orange-600 dark:text-gray-300 text-sm font-medium">ใบประกาศนียบัตร</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {dashboardData?.stats.certificatesEarned || 0}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
            >
              <div className="text-center py-12">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    {user.role === 'student' ? (
                      <GraduationCap className="w-12 h-12 text-orange-600" />
                    ) : user.role === 'instructor' ? (
                      <Crown className="w-12 h-12 text-purple-500" />
                    ) : (
                      <Award className="w-12 h-12 text-gray-900" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {user.role === 'student'
                      ? 'พร้อมเริ่มต้นการเรียนแล้วหรือยัง?'
                      : user.role === 'instructor'
                      ? 'เริ่มสร้างคอร์สแรกของคุณ'
                      : 'จัดการระบบ'
                    }
                  </h3>
                  <p className="text-orange-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                    {user.role === 'student'
                      ? 'เลือกคอร์สพัฒนาตัวเองที่เหมาะกับคุณ และเริ่มเดินทางสู่ความสำเร็จ'
                      : user.role === 'instructor'
                      ? 'แชร์ความรู้และประสบการณ์ของคุณกับผู้เรียนทั่วประเทศ ช่วยพัฒนาพวกเขา'
                      : 'ดูแลระบบและช่วยให้ผู้ใช้ได้รับประสบการณ์การเรียนรู้ที่ดีที่สุด'
                    }
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="/courses"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-3 bg-gradient-to-r ${roleInfo.color} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 justify-center`}
                  >
                    <Play className="w-5 h-5" />
                    <span>
                      {user.role === 'student' 
                        ? 'เริ่มเรียนเลย' 
                        : user.role === 'instructor'
                        ? 'สร้างคอร์ส'
                        : 'จัดการระบบ'
                      }
                    </span>
                  </motion.a>
                  
                  <motion.a
                    href="/courses"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600 flex items-center space-x-2 justify-center"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>ดูทั้งหมด</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <Target className="w-5 h-5 text-orange-600" />
                <span>การดำเนินการด่วน</span>
              </h3>

              <div className="space-y-4">
                <button className="w-full flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 hover:from-orange-100 hover:to-orange-200 dark:hover:from-orange-900/30 dark:hover:to-orange-800/30 transition-all duration-300 text-left">
                  <GraduationCap className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">แก้ไขโปรไฟล์</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">อัปเดตข้อมูลส่วนตัว</div>
                  </div>
                </button>

                <button className="w-full flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-orange-50 dark:from-purple-900/20 dark:to-orange-900/20 hover:from-purple-100 hover:to-orange-100 dark:hover:from-purple-900/30 dark:hover:to-orange-900/30 transition-all duration-300 text-left">
                  <Target className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">ตั้งเป้าหมายการเรียน</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">วางแผนการเรียนรู้</div>
                  </div>
                </button>

                <button className="w-full flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all duration-300 text-left">
                  <Users className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">เข้าร่วมชุมชนผู้เรียน</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">พูดคุยกับผู้เรียนอื่น</div>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Achievement Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-3xl p-6 text-white shadow-xl"
            >
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">ยินดีต้อนรับ!</h3>
                <p className="text-yellow-100 text-sm mb-4">
                  คุณได้รับ badge "ผู้เรียนใหม่" แล้ว
                </p>
                <div className="bg-white/20 rounded-xl p-3">
                  <div className="text-2xl mb-1">🏆</div>
                  <div className="text-xs">Badge แรกของคุณ</div>
                </div>
              </div>
            </motion.div>

            {/* Progress Summary - Debug Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-2 border-dashed border-gray-300 dark:border-gray-600"
            >
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>ข้อมูลผู้ใช้ (Debug)</span>
              </h3>
              <div className="text-xs text-orange-600 dark:text-gray-400 space-y-2">
                <div><span className="font-medium">ID:</span> {String(user.id).slice(0, 8)}...</div>
                <div><span className="font-medium">Email:</span> {user.email}</div>
                <div><span className="font-medium">Role:</span> {user.role}</div>
                <div><span className="font-medium">Verified:</span> {user.emailVerified ? 'Yes' : 'No'}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}