import { NextRequest, NextResponse } from 'next/server'
import { getUserById, verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value
    
    if (!token) {
      return NextResponse.json(
        { error: 'ไม่พบ token การยืนยันตัวตน' },
        { status: 401 }
      )
    }
    
    // Verify token
    const payload = verifyToken(token)
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Token ไม่ถูกต้องหรือหมดอายุ' },
        { status: 401 }
      )
    }
    
    // Get user data
    const user = await getUserById(payload.userId)
    
    if (!user) {
      return NextResponse.json(
        { error: 'ไม่พบข้อมูลผู้ใช้' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        avatarUrl: user.avatar_url,
        emailVerified: user.email_verified,
        phone: user.phone,
        createdAt: user.created_at,
      },
    })
    
  } catch (error) {
    console.error('Profile error:', error)
    
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    )
  }
}