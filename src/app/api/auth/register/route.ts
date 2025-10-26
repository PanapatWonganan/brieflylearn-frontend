import { NextRequest, NextResponse } from 'next/server'
import { createUser, generateToken } from '@/lib/auth'
import { registerSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = registerSchema.parse(body)
    const { email, password, fullName, phone, role } = validatedData
    
    // Create user
    const user = await createUser({
      email,
      password,
      fullName,
      role: role || 'student',
    })
    
    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })
    
    // Create response with token in cookie
    const response = NextResponse.json({
      message: 'สมัครสมาชิกสำเร็จ',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        avatarUrl: user.avatar_url,
        emailVerified: user.email_verified,
      },
    }, { status: 201 })
    
    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/',
    })
    
    return response
    
  } catch (error) {
    console.error('Register error:', error)
    
    if (error instanceof Error) {
      if (error.name === 'ZodError') {
        return NextResponse.json(
          { error: 'ข้อมูลไม่ถูกต้อง', details: error },
          { status: 400 }
        )
      }
      
      if (error.message.includes('already exists')) {
        return NextResponse.json(
          { error: 'อีเมลนี้ถูกใช้งานแล้ว' },
          { status: 409 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    )
  }
}