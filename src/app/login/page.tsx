'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/auth')
  }, [router])

  return (
    <div className="min-h-screen bg-surface-400 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-400 mx-auto" />
        <p className="mt-3 text-sm text-ink-muted">กำลังโหลด...</p>
      </div>
    </div>
  )
}
