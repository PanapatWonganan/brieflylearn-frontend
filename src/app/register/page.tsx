'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to auth page with register mode
    router.replace('/auth?mode=register')
  }, [router])

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-700 mx-auto"></div>
        <p className="mt-2 text-gray-600">กำลังโหลดหน้าลงทะเบียน...</p>
      </div>
    </div>
  )
}