'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContextNew'
import { motion } from 'framer-motion'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
  showLoadingMessage?: boolean
}

export function AuthGuard({ 
  children, 
  redirectTo = '/auth',
  showLoadingMessage = true 
}: AuthGuardProps) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const timer = setTimeout(() => {
        router.push(redirectTo)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [loading, isAuthenticated, router, redirectTo])

  // แสดง loading หรือ redirect หาก auth กำลังโหลดหรือไม่ได้ login
  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
        />
        {showLoadingMessage && (
          <div className="ml-4 text-gray-600">
            {loading ? 'กำลังตรวจสอบการเข้าสู่ระบบ...' : 'กำลังนำไปยังหน้าเข้าสู่ระบบ...'}
          </div>
        )}
      </div>
    )
  }

  return <>{children}</>
}

// Hook สำหรับใช้ใน component ที่ต้องการ auth protection
export function useRequireAuth(redirectTo: string = '/auth') {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const timer = setTimeout(() => {
        router.push(redirectTo)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [loading, isAuthenticated, router, redirectTo])

  return { isAuthenticated, loading, shouldRender: !loading && isAuthenticated }
}

export default AuthGuard