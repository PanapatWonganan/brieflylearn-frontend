const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';

export interface Exam {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  passing_score: number;
  total_questions: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  price: number | null;
  course_id: string | null;
  is_published: boolean;
  participants_count?: number;
  rating?: number;
  tags?: string[];
}

export interface ExamQuestion {
  id: string;
  question_text: string;
  question_type: string;
  options: { label: string; text: string }[];
  points: number;
  order_index: number;
}

export interface ExamResult {
  id: string;
  exam_id: string;
  exam?: Exam;
  score: number;
  total_points: number;
  passed: boolean;
  answers: Record<string, string>;
  started_at: string;
  completed_at: string;
  correct_answers?: number;
  total_questions?: number;
  percentile?: number;
  duration_minutes?: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

export async function fetchExams(params?: {
  search?: string;
  category?: string;
  difficulty?: string;
}): Promise<ApiResponse<Exam[]>> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.category && params.category !== 'ทั้งหมด') {
      queryParams.append('category', params.category);
    }
    if (params?.difficulty) queryParams.append('difficulty', params.difficulty);

    const url = `${API_BASE}/exams${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

    const response = await fetch(url, {
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

    if (result.exams || Array.isArray(result)) {
      return { data: result.exams || result };
    } else {
      return { error: 'No exams data received' };
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch exams'
    };
  }
}

export async function fetchExamDetail(id: string): Promise<ApiResponse<Exam>> {
  try {
    const response = await fetch(`${API_BASE}/exams/${id}`, {
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
    return { data: result };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch exam detail'
    };
  }
}

export async function startExam(id: string): Promise<ApiResponse<{ exam_attempt_id: string }>> {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE}/exams/${id}/start`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return { data: result };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to start exam'
    };
  }
}

export async function submitExam(
  id: string,
  answers: Record<string, string>
): Promise<ApiResponse<ExamResult>> {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE}/exams/${id}/submit`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify({ answers }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return { data: result };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to submit exam'
    };
  }
}

export async function fetchExamResults(): Promise<ApiResponse<ExamResult[]>> {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE}/exams/results`, {
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

    if (result.results || Array.isArray(result)) {
      return { data: result.results || result };
    } else {
      return { error: 'No results data received' };
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch exam results'
    };
  }
}

export async function fetchExamResultDetail(id: string): Promise<ApiResponse<ExamResult>> {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE}/exams/results/${id}`, {
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
      error: error instanceof Error ? error.message : 'Failed to fetch exam result detail'
    };
  }
}
