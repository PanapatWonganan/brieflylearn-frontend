const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: string;
  level: string;
  lessons_count: number;
  duration_minutes: number | null;
  created_at: string;
  free_preview?: {
    id: string;
    title: string;
  } | null;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export async function fetchCourses(): Promise<ApiResponse<Course[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.courses) {
      return { data: result.courses };
    } else {
      return { error: 'No courses data received' };
    }
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Failed to fetch courses' 
    };
  }
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  order_index: number;
  is_free: boolean;
  /** Backend-computed: true when caller cannot watch (not free + not paid). */
  locked?: boolean;
  video_url: string | null;
  video: {
    id: string;
    status: string;
    duration: string;
    size: string;
    ready: boolean;
    processing_error?: string;
  } | null;
  created_at: string;
}

export interface CourseWithLessons {
  course: {
    id: string;
    title: string;
    description: string;
  };
  lessons: Lesson[];
  total_lessons: number;
  /** True when the authenticated caller has a completed enrollment for this course. */
  user_has_paid_access?: boolean;
}

export async function fetchCourseLessons(courseId: string): Promise<ApiResponse<CourseWithLessons>> {
  try {
    // Send auth if we have it, so backend can compute `user_has_paid_access`.
    // Endpoint is public (guest preview still works), token is purely informational.
    const token = typeof window !== 'undefined'
      ? (localStorage.getItem('auth_token') || localStorage.getItem('boostme_token'))
      : null;

    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/lessons`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return { data: result };
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Failed to fetch course lessons' 
    };
  }
}

export interface LessonDetail {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  order_index: number;
  is_free: boolean;
  video_url: string | null;
  course: {
    id: string;
    title: string;
  };
  video: {
    id: string;
    status: string;
    duration: string;
    size: string;
    ready: boolean;
    processing_error?: string;
    stream_available?: boolean;
  } | null;
  can_watch: boolean;
}

export async function fetchLessonDetail(lessonId: string): Promise<ApiResponse<LessonDetail>> {
  try {
    // Get auth token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return { data: result };
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Failed to fetch lesson detail' 
    };
  }
}

export interface StreamUrlResponse {
  stream_url: string;
  expires_at: string;
  video: {
    id: string;
    title: string;
    duration: string;
  };
  lesson: {
    id: string;
    title: string;
  };
}

export async function fetchStreamUrl(lessonId: string): Promise<ApiResponse<StreamUrlResponse>> {
  try {
    // Get auth token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}/stream-url`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return { data: result };
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Failed to fetch stream URL' 
    };
  }
}