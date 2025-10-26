'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { loginUser, registerUser, getUserProfile, logoutUser, User as ApiUser } from '@/lib/api/auth'

interface User {
  id: string
  email: string
  fullName: string
  role: string
  phone?: string
  avatarUrl?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  loading: boolean
  isAuthenticated: boolean
}

interface RegisterData {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  phone?: string
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setLoading(false)
        return
      }

      const response = await getUserProfile(token)
      if (response.success && response.user) {
        setUser({
          id: response.user.id,
          email: response.user.email,
          fullName: response.user.full_name,
          role: response.user.role,
          phone: response.user.phone,
          avatarUrl: response.user.avatar_url,
        })
      } else {
        localStorage.removeItem('auth_token')
      }
    } catch (error) {
      console.error('Auth check error:', error)
      localStorage.removeItem('auth_token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password)

      console.log('🔐 Login response:', {
        success: response.success,
        hasUser: !!response.user,
        hasToken: !!response.token,
        tokenLength: response.token?.length,
        userId: response.user?.id,
      })

      if (response.success && response.user && response.token) {
        console.log('✅ Saving token to localStorage:', response.token.substring(0, 20) + '...')
        localStorage.setItem('auth_token', response.token)

        // Verify token was saved
        const savedToken = localStorage.getItem('auth_token')
        console.log('✅ Token saved verification:', {
          saved: !!savedToken,
          matches: savedToken === response.token,
        })

        setUser({
          id: response.user.id,
          email: response.user.email,
          fullName: response.user.full_name,
          role: response.user.role,
          phone: response.user.phone,
          avatarUrl: response.user.avatar_url,
        })
        return { success: true }
      } else {
        console.error('❌ Login failed:', response.message)
        return { success: false, error: response.message || 'Login failed' }
      }
    } catch (error) {
      console.error('❌ Login error:', error)
      return { success: false, error: 'Network error' }
    }
  }

  const register = async (data: RegisterData) => {
    try {
      if (data.password !== data.confirmPassword) {
        return { success: false, error: 'Passwords do not match' }
      }

      const response = await registerUser({
        email: data.email,
        password: data.password,
        full_name: data.fullName,
        phone: data.phone,
      })
      
      if (response.success && response.user && response.token) {
        localStorage.setItem('auth_token', response.token)
        setUser({
          id: response.user.id,
          email: response.user.email,
          fullName: response.user.full_name,
          role: response.user.role,
          phone: response.user.phone,
          avatarUrl: response.user.avatar_url,
        })
        return { success: true }
      } else {
        return { success: false, error: response.message || 'Registration failed' }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Network error' }
    }
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (token) {
        await logoutUser(token)
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('auth_token')
      setUser(null)
    }
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}