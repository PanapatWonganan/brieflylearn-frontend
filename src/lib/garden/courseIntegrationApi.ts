const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8002/api/v1'

export interface LessonCompletionRequest {
  watch_time?: number
}

export interface LessonCompletionResponse {
  success: boolean
  message: string
  data: {
    lesson_progress: {
      id: string
      user_id: string
      lesson_id: string
      enrollment_id: string
      completed_at: string
      is_completed: boolean
      watch_time: number
    }
    course_completed: boolean
    garden_progress: {
      garden_level: number
      garden_xp: number
      star_seeds: number
      completed_lessons: number
      completed_courses: number
      total_learning_xp: number
      recent_learning_activities: Array<{
        id: string
        description: string
        icon: string
        color: string
        xp_earned: number
        star_seeds_earned: number
        time_ago: string
        created_at: string
      }>
    }
    rewards_info: string
  }
}

export interface LearningProgressResponse {
  success: boolean
  data: {
    garden_level: number
    garden_xp: number
    star_seeds: number
    completed_lessons: number
    completed_courses: number
    total_learning_xp: number
    recent_learning_activities: Array<{
      id: string
      description: string
      icon: string
      color: string
      xp_earned: number
      star_seeds_earned: number
      time_ago: string
      created_at: string
    }>
  }
}

export interface CourseRewardsPreviewResponse {
  success: boolean
  data: {
    course: {
      id: string
      title: string
      total_lessons: number
      duration_weeks: number
    }
    completion_rewards: {
      bonus_xp: number
      bonus_star_seeds: number
      description: string
    }
    potential_achievements: Array<{
      name: string
      description: string
      type: string
    }>
  }
}

class CourseIntegrationAPI {
  private baseUrl: string

  constructor() {
    this.baseUrl = `${API_BASE_URL}/course-integration`
  }

  /**
   * Complete a lesson and award garden rewards
   */
  async completeLessonWithRewards(
    lessonId: string, 
    data: LessonCompletionRequest = {}
  ): Promise<LessonCompletionResponse> {
    const response = await fetch(`${this.baseUrl}/lessons/${lessonId}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  /**
   * Get user's learning progress with garden integration
   */
  async getLearningProgress(): Promise<LearningProgressResponse> {
    // Get auth token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    const response = await fetch(`${this.baseUrl}/learning-progress`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  /**
   * Get course completion rewards preview
   */
  async getCourseRewardsPreview(courseId: string): Promise<CourseRewardsPreviewResponse> {
    // Get auth token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    const response = await fetch(`${this.baseUrl}/courses/${courseId}/rewards-preview`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }
}

export const courseIntegrationAPI = new CourseIntegrationAPI()