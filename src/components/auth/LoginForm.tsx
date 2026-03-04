'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContextNew'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

interface LoginFormProps {
  onSuccess?: () => void
  onSwitchToRegister?: () => void
}

export default function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(formData.email, formData.password)

    if (result.success) {
      onSuccess?.()
    } else {
      setError(result.error || 'การเข้าสู่ระบบล้มเหลว')
    }

    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-card p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">เข้าสู่ระบบ</h1>
          <p className="text-gray-600">ยินดีต้อนรับกลับมา!</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error-light border border-error/20 rounded-lg">
            <p className="text-error-dark text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              อีเมล
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-300 transition-colors"
                placeholder="กรุณากรอกอีเมล"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              รหัสผ่าน
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-300 transition-colors"
                placeholder="กรุณากรอกรหัสผ่าน"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-600 text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        {/* Switch to Register */}
        {onSwitchToRegister && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ยังไม่มีบัญชี?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-brand-600 hover:opacity-90 font-medium"
                disabled={loading}
              >
                สมัครสมาชิก
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}