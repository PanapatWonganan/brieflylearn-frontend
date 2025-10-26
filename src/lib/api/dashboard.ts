interface DashboardStats {
  totalCourses: number
  enrolledCourses: number
  completedCourses: number
  totalLessons: number
  completedLessons: number
  totalProgress: number
  certificatesEarned: number
  studyTimeHours: number
}

interface RecentActivity {
  id: string
  type: 'course_start' | 'lesson_complete' | 'certificate_earned' | 'quiz_passed'
  title: string
  description: string
  timestamp: string
  courseTitle?: string
}

interface DashboardData {
  stats: DashboardStats
  recentActivities: RecentActivity[]
  upcomingLessons: any[]
  recommendations: any[]
}

export class DashboardAPI {
  private baseURL = 'http://localhost:8001/api/v1'

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('boostme_token')
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Dashboard API Error: ${response.status} - ${error}`)
    }

    return response.json()
  }

  async getDashboardData(): Promise<DashboardData> {
    try {
      // Get user enrollments and progress
      const [enrollmentsResponse, progressResponse] = await Promise.allSettled([
        this.fetchWithAuth('/enrollments/my'),
        this.fetchWithAuth('/progress/my-summary')
      ])

      // Extract data or use defaults
      const enrollments = enrollmentsResponse.status === 'fulfilled' ? enrollmentsResponse.value : []
      const progress = progressResponse.status === 'fulfilled' ? progressResponse.value : null

      // Calculate stats from available data
      const stats: DashboardStats = {
        totalCourses: 0,
        enrolledCourses: Array.isArray(enrollments) ? enrollments.length : 0,
        completedCourses: Array.isArray(enrollments) ? enrollments.filter((e: any) => e.status === 'completed').length : 0,
        totalLessons: progress?.total_lessons || 0,
        completedLessons: progress?.completed_lessons || 0,
        totalProgress: progress?.overall_progress || 0,
        certificatesEarned: progress?.certificates_earned || 0,
        studyTimeHours: progress?.study_time_hours || 0
      }

      // Generate recent activities from enrollments
      const recentActivities: RecentActivity[] = Array.isArray(enrollments) 
        ? enrollments.slice(0, 5).map((enrollment: any) => ({
            id: enrollment.id || Math.random().toString(),
            type: 'course_start' as const,
            title: `เริ่มเรียนคอร์ส`,
            description: enrollment.course_title || enrollment.title || 'คอร์สใหม่',
            timestamp: enrollment.enrolled_at || enrollment.created_at || new Date().toISOString(),
            courseTitle: enrollment.course_title || enrollment.title
          }))
        : []

      return {
        stats,
        recentActivities,
        upcomingLessons: [],
        recommendations: []
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      
      // Return fallback data
      return {
        stats: {
          totalCourses: 0,
          enrolledCourses: 0,
          completedCourses: 0,
          totalLessons: 0,
          completedLessons: 0,
          totalProgress: 0,
          certificatesEarned: 0,
          studyTimeHours: 0
        },
        recentActivities: [],
        upcomingLessons: [],
        recommendations: []
      }
    }
  }

  async getCourseStats() {
    try {
      const response = await this.fetchWithAuth('/courses/stats')
      return response
    } catch (error) {
      console.error('Failed to fetch course stats:', error)
      return { total: 0, enrolled: 0, completed: 0 }
    }
  }

  async getRecentActivities() {
    try {
      const response = await this.fetchWithAuth('/activities/recent')
      return response.activities || []
    } catch (error) {
      console.error('Failed to fetch recent activities:', error)
      return []
    }
  }
}

export const dashboardAPI = new DashboardAPI()
export type { DashboardData, DashboardStats, RecentActivity }