const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8002/api/v1';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  phone?: string;
  avatar_url?: string;
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
    console.error('Login error:', error);
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
    console.error('Registration error:', error);
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
    console.error('Profile fetch error:', error);
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
    console.error('Logout error:', error);
    return {
      success: false,
      message: 'Network error occurred',
    };
  }
}