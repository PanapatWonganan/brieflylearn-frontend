const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  phone?: string;
  avatar_url?: string;
  onboarding_completed?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
  errors?: any;
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Login failed',
        errors: data.errors,
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message: 'Network error occurred',
    };
  }
}

export async function registerUser(userData: {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
}): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Registration failed',
        errors: data.errors,
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message: 'Network error occurred',
    };
  }
}

export async function getUserProfile(token: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to fetch profile',
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message: 'Network error occurred',
    };
  }
}

export async function logoutUser(token: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: 'Network error occurred',
    };
  }
}

export async function googleLogin(idToken: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/google-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ id_token: idToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Google login failed',
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message: 'Network error occurred',
    };
  }
}

export interface OnboardingData {
  goals: string[];
  interests: string[];
  experience_level: 'beginner' | 'intermediate' | 'advanced';
}

export interface RecommendedCourse {
  id: string;
  title: string;
  description: string;
  level: string;
  price: string;
  thumbnail_url: string | null;
  category: string | null;
  category_slug: string | null;
  total_lessons: number;
}

export interface OnboardingResponse {
  success: boolean;
  message?: string;
  data?: {
    goals: string[];
    interests: string[];
    experience_level: string;
    recommended_courses: RecommendedCourse[];
  };
  errors?: Record<string, string[]>;
}

export async function submitOnboarding(data: OnboardingData): Promise<OnboardingResponse> {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return { success: false, message: 'Not authenticated' };
    }

    const response = await fetch(`${API_BASE_URL}/auth/onboarding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Onboarding failed',
        errors: result.errors,
      };
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message: 'Network error occurred',
    };
  }
}

export async function getOnboardingCourses(): Promise<{ success: boolean; courses?: RecommendedCourse[]; message?: string }> {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return { success: false, message: 'Not authenticated' };
    }

    const response = await fetch(`${API_BASE_URL}/auth/onboarding/courses`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || 'Failed to fetch courses' };
    }

    return data;
  } catch (error) {
    return { success: false, message: 'Network error occurred' };
  }
}