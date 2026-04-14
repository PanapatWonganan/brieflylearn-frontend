const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';

export interface LessonProgress {
  id: string;
  lesson_id: string;
  user_id: string;
  is_completed: boolean;
  watch_time: number;
  completed_at: string | null;
}

export interface ProgressSummary {
  total_lessons: number;
  completed_lessons: number;
  total_watch_time: number;
  courses_in_progress: number;
  courses_completed: number;
}

export interface CourseProgress {
  course_id: string;
  total_lessons: number;
  completed_lessons: number;
  progress_percentage: number;
  lessons: LessonProgress[];
}

// Get auth token from localStorage
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token') || localStorage.getItem('boostme_token');
}

export async function updateLessonProgress(
  lessonId: string,
  data: { watch_time: number; is_completed?: boolean }
): Promise<{ data?: LessonProgress; error?: string }> {
  try {
    const token = getAuthToken();
    if (!token) {
      return { error: 'Not authenticated' };
    }

    const response = await fetch(`${API_BASE}/progress/lessons/${lessonId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.message || 'Failed to update progress' };
    }

    return { data: result.data || result };
  } catch (error) {
    return { error: 'Network error' };
  }
}

export async function getProgressSummary(): Promise<{ data?: ProgressSummary; error?: string }> {
  try {
    const token = getAuthToken();
    if (!token) {
      return { error: 'Not authenticated' };
    }

    const response = await fetch(`${API_BASE}/progress/my-summary`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.message || 'Failed to fetch progress summary' };
    }

    return { data: result.data || result };
  } catch (error) {
    return { error: 'Network error' };
  }
}

export async function getCourseProgress(courseId: string): Promise<{ data?: CourseProgress; error?: string }> {
  try {
    const token = getAuthToken();
    if (!token) {
      return { error: 'Not authenticated' };
    }

    const response = await fetch(`${API_BASE}/progress/courses/${courseId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.message || 'Failed to fetch course progress' };
    }

    return { data: result.data || result };
  } catch (error) {
    return { error: 'Network error' };
  }
}
