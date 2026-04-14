'use client'

import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContextNew'

interface GoogleSignInButtonProps {
  onSuccess?: () => void
}

export default function GoogleSignInButton({ onSuccess }: GoogleSignInButtonProps) {
  const { loginWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      setError('ไม่ได้รับข้อมูลจาก Google')
      return
    }

    setLoading(true)
    setError('')

    loginWithGoogle(credentialResponse.credential).then((result) => {
      if (result.success) {
        onSuccess?.()
      } else {
        setError(result.error || 'เข้าสู่ระบบด้วย Google ล้มเหลว')
      }
      setLoading(false)
    }).catch(() => {
      setError('เข้าสู่ระบบด้วย Google ล้มเหลว')
      setLoading(false)
    })
  }

  return (
    <div className="w-full">
      {error && (
        <div className="mb-3 p-3 bg-error-light border border-error/20 rounded-sm">
          <p className="text-error-dark text-sm text-center">{error}</p>
        </div>
      )}

      <div className="flex justify-center">
        {loading ? (
          <div className="flex items-center justify-center py-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-600 mr-2"></div>
            <span className="text-sm text-ink-muted">กำลังเข้าสู่ระบบ...</span>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('เข้าสู่ระบบด้วย Google ล้มเหลว')}
            theme="outline"
            size="large"
            width="100%"
            text="signin_with"
            shape="rectangular"
          />
        )}
      </div>
    </div>
  )
}
