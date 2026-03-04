'use client'

import { useAuth } from '@/contexts/AuthContextNew'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { dashboardAPI, DashboardData } from '@/lib/api/dashboard'
import {
  BookOpen,
  Trophy,
  TrendingUp,
  User,
  Target,
  Users
} from 'lucide-react'
import Link from 'next/link'
import { DashboardSkeleton } from '@/components/Skeleton'

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
    return <DashboardSkeleton />
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'instructor':
        return 'อาจารย์ผู้สอน'
      case 'admin':
        return 'ผู้ดูแลระบบ'
      default:
        return 'ผู้เรียน'
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">

        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-heading text-ink mb-2">
            สวัสดี{user.fullName ? `, ${user.fullName}` : ''}
          </h1>
          <p className="text-ink-muted">
            {getRoleTitle(user.role)}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border border-gray-100/60 shadow-card rounded-xl p-6">
            <div className="flex items-center space-x-4">
              <div className="text-ink">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-semibold text-ink mb-1">
                  {dashboardData?.stats.enrolledCourses || 0}
                </p>
                <p className="text-ink-muted text-sm">
                  {user.role === 'student' ? 'คอร์สที่ลงทะเบียน' : 'คอร์สทั้งหมด'}
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-100/60 shadow-card rounded-xl p-6">
            <div className="flex items-center space-x-4">
              <div className="text-ink">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-semibold text-ink mb-1">
                  {Math.round(dashboardData?.stats.totalProgress || 0)}%
                </p>
                <p className="text-ink-muted text-sm">ความก้าวหน้า</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-100/60 shadow-card rounded-xl p-6">
            <div className="flex items-center space-x-4">
              <div className="text-ink">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-semibold text-ink mb-1">
                  {dashboardData?.stats.certificatesEarned || 0}
                </p>
                <p className="text-ink-muted text-sm">ใบประกาศนียบัตร</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - Main Content (2/3) */}
          <div className="lg:col-span-2">
            <div className="border border-gray-100/60 shadow-card rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-ink mb-8">คอร์สของคุณ</h2>

              {/* Empty State */}
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-sand-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-ink-light" />
                </div>
                <h3 className="text-xl font-medium text-ink mb-3">
                  {user.role === 'student'
                    ? 'คุณยังไม่มีคอร์สที่ลงทะเบียน'
                    : user.role === 'instructor'
                    ? 'เริ่มสร้างคอร์สแรกของคุณ'
                    : 'จัดการระบบ'
                  }
                </h3>
                <p className="text-ink-muted mb-8 max-w-md mx-auto">
                  {user.role === 'student'
                    ? 'เลือกคอร์สที่เหมาะกับคุณและเริ่มต้นการเรียนรู้'
                    : user.role === 'instructor'
                    ? 'แชร์ความรู้และประสบการณ์ของคุณกับผู้เรียน'
                    : 'ดูแลระบบและช่วยเหลือผู้ใช้'
                  }
                </p>

                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center px-6 py-3 bg-ink text-white rounded-lg font-medium hover:bg-ink/90 transition-colors"
                >
                  {user.role === 'student'
                    ? 'เริ่มเรียนเลย'
                    : user.role === 'instructor'
                    ? 'สร้างคอร์ส'
                    : 'จัดการระบบ'
                  }
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions (1/3) */}
          <div className="space-y-8">

            {/* Quick Actions */}
            <div className="border border-gray-100/60 shadow-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-ink mb-6">การดำเนินการด่วน</h3>

              <div className="space-y-3">
                <Link
                  href="/profile"
                  className="block text-ink-light hover:text-ink transition-colors"
                >
                  แก้ไขโปรไฟล์
                </Link>

                <Link
                  href="/courses"
                  className="block text-ink-light hover:text-ink transition-colors"
                >
                  ดูคอร์สทั้งหมด
                </Link>

                <Link
                  href="/community"
                  className="block text-ink-light hover:text-ink transition-colors"
                >
                  เข้าร่วมชุมชน
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
