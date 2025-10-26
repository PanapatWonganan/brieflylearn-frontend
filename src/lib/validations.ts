import { z } from 'zod'

// Auth Validation Schemas
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'กรุณากรอกอีเมล')
    .email('รูปแบบอีเมลไม่ถูกต้อง'),
  password: z
    .string()
    .min(1, 'กรุณากรอกรหัสผ่าน')
    .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'),
})

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'กรุณากรอกอีเมล')
    .email('รูปแบบอีเมลไม่ถูกต้อง'),
  password: z
    .string()
    .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'รหัสผ่านต้องมีตัวอักษรพิมพ์เล็ก พิมพ์ใหญ่ และตัวเลข'
    ),
  confirmPassword: z.string().min(1, 'กรุณายืนยันรหัสผ่าน'),
  fullName: z
    .string()
    .min(1, 'กรุณากรอกชื่อ-นามสกุล')
    .min(2, 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร')
    .max(100, 'ชื่อต้องไม่เกิน 100 ตัวอักษร'),
  phone: z
    .string()
    .optional()
    .refine(
      (phone) => !phone || /^[0-9]{9,10}$/.test(phone),
      'รูปแบบเบอร์โทรไม่ถูกต้อง (9-10 หลัก)'
    ),
  role: z.enum(['student', 'instructor'], {
    errorMap: () => ({ message: 'กรุณาเลือกประเภทผู้ใช้' }),
  }).optional().default('student'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'รหัสผ่านไม่ตรงกัน',
  path: ['confirmPassword'],
})

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(2, 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร')
    .max(100, 'ชื่อต้องไม่เกิน 100 ตัวอักษร')
    .optional(),
  phone: z
    .string()
    .regex(/^[0-9]{9,10}$/, 'รูปแบบเบอร์โทรไม่ถูกต้อง (9-10 หลัก)')
    .optional()
    .or(z.literal('')),
  avatarUrl: z
    .string()
    .url('รูปแบบ URL ไม่ถูกต้อง')
    .optional()
    .or(z.literal('')),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'กรุณากรอกรหัสผ่านปัจจุบัน'),
  newPassword: z
    .string()
    .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'รหัสผ่านต้องมีตัวอักษรพิมพ์เล็ก พิมพ์ใหญ่ และตัวเลข'
    ),
  confirmNewPassword: z.string().min(1, 'กรุณายืนยันรหัสผ่านใหม่'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'รหัสผ่านใหม่ไม่ตรงกัน',
  path: ['confirmNewPassword'],
})

// Type exports
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>