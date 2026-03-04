'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContextNew'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const result = await login(formData.email, formData.password)

    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ')
    }

    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen">
        {/* Left Side - Brand Statement (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 xl:px-24 bg-gray-50 border-r border-gray-100">
          <div className="max-w-lg">
            <h1 className="text-5xl xl:text-6xl font-bold font-serif text-ink mb-6 leading-tight">
              BrieflyLearn
            </h1>
            <p className="text-xl text-ink-light leading-relaxed mb-4">
              เรียนรู้ AI สร้างธุรกิจ & บริหารองค์กร
            </p>
            <p className="text-base text-ink-muted leading-relaxed">
              แพลตฟอร์มเรียน AI ออนไลน์ เพื่อนำ AI ไปใช้จริงทั้งสร้างธุรกิจและบริหารองค์กร
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden mb-12">
              <h1 className="text-3xl font-bold font-serif text-ink mb-2">
                BrieflyLearn
              </h1>
              <p className="text-sm text-ink-muted">
                เรียนรู้ AI สร้างธุรกิจ & บริหารองค์กร
              </p>
            </div>

            {/* Form Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-ink mb-2">
                เข้าสู่ระบบ
              </h2>
              <p className="text-sm text-ink-muted">
                ยินดีต้อนรับกลับมา กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ
              </p>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink-light mb-2">
                  อีเมล
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-lg text-ink placeholder-ink-faint focus:outline-none transition-all"
                  placeholder="กรอกอีเมลของคุณ"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-ink-light mb-2">
                  รหัสผ่าน
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg text-ink placeholder-ink-faint focus:outline-none transition-all"
                    placeholder="กรอกรหัสผ่านของคุณ"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-ink-faint hover:text-ink-muted transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-ink-faint hover:text-ink-muted transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-error-light border border-sand-300 rounded-lg p-4 flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-error flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-error-dark">{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-ink hover:opacity-90 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      กำลังเข้าสู่ระบบ...
                    </>
                  ) : (
                    'เข้าสู่ระบบ'
                  )}
                </button>

                <p className="text-center text-sm text-ink-muted">
                  ยังไม่มีบัญชี?{' '}
                  <Link href="/register" className="font-medium text-brand-600 hover:opacity-90 transition-colors">
                    สมัครสมาชิก
                  </Link>
                </p>
              </div>
            </form>

            {/* Back to Home */}
            <div className="mt-8 text-center">
              <Link
                href="/"
                className="text-sm text-ink-muted hover:text-ink-light transition-colors inline-flex items-center"
              >
                <span className="mr-1">←</span>
                กลับหน้าแรก
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
