'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContextNew'
import { Eye, EyeOff, Lock, Mail, User, Phone, Users } from 'lucide-react'

interface RegisterFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export default function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    role: 'student' as 'student' | 'instructor',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    // Basic validation
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'กรุณากรอกอีเมล'
    }

    if (!formData.password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน'
    } else if (formData.password.length < 8) {
      newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน'
    }

    if (!formData.fullName) {
      newErrors.fullName = 'กรุณากรอกชื่อ-นามสกุล'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setLoading(false)
      return
    }

    const result = await register(formData)

    if (result.success) {
      onSuccess?.()
    } else {
      setErrors({ general: result.error || 'การสมัครสมาชิกล้มเหลว' })
    }

    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-card p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">สมัครสมาชิก</h1>
          <p className="text-gray-600">เริ่มต้นการเรียนรู้กับเรา</p>
        </div>

        {errors.general && (
          <div className="mb-6 p-4 bg-error-light border border-error/20 rounded-lg">
            <p className="text-error-dark text-sm">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Input */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              ชื่อ-นามสกุล
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-300 transition-colors ${
                  errors.fullName ? 'border-error/20 bg-error-light' : 'border-gray-300'
                }`}
                placeholder="กรุณากรอกชื่อ-นามสกุล"
                required
                disabled={loading}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-sm text-error">{errors.fullName}</p>
            )}
          </div>

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
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-300 transition-colors ${
                  errors.email ? 'border-error/20 bg-error-light' : 'border-gray-300'
                }`}
                placeholder="กรุณากรอกอีเมล"
                required
                disabled={loading}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-error">{errors.email}</p>
            )}
          </div>

          {/* Phone Input */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              เบอร์โทรศัพท์ (ไม่จำเป็น)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-300 transition-colors"
                placeholder="กรุณากรอกเบอร์โทรศัพท์"
                disabled={loading}
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              ประเภทผู้ใช้
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-300 transition-colors appearance-none"
                disabled={loading}
              >
                <option value="student">ผู้เรียน</option>
                <option value="instructor">ผู้สอน</option>
              </select>
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
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-300 transition-colors ${
                  errors.password ? 'border-error/20 bg-error-light' : 'border-gray-300'
                }`}
                placeholder="กรุณากรอกรหัสผ่าน (อย่างน้อย 8 ตัวอักษร)"
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
            {errors.password && (
              <p className="mt-1 text-sm text-error">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              ยืนยันรหัสผ่าน
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-300 transition-colors ${
                  errors.confirmPassword ? 'border-error/20 bg-error-light' : 'border-gray-300'
                }`}
                placeholder="กรุณายืนยันรหัสผ่าน"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-error">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-600 text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
          </button>
        </form>

        {/* Switch to Login */}
        {onSwitchToLogin && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              มีบัญชีแล้ว?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-brand-600 hover:opacity-90 font-medium"
                disabled={loading}
              >
                เข้าสู่ระบบ
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}