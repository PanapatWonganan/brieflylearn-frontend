import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { executeQuery, executeQuerySingle } from './db'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'
const JWT_EXPIRES_IN = '7d' // Token expires in 7 days

export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: 'student' | 'instructor' | 'admin'
  email_verified: boolean
  phone: string | null
  created_at: string
  updated_at: string
}

export interface JWTPayload {
  userId: string
  email: string
  role: string
}

// Password Hashing
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

// JWT Token Management
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

// User Database Operations
export async function createUser(userData: {
  email: string
  password: string
  fullName?: string
  role?: 'student' | 'instructor' | 'admin'
}): Promise<User> {
  const { email, password, fullName, role = 'student' } = userData
  
  // Check if user already exists
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    throw new Error('User with this email already exists')
  }
  
  // Hash password
  const hashedPassword = await hashPassword(password)
  
  // Generate UUID for user ID
  const userId = crypto.randomUUID()
  
  // Insert user into database
  const query = `
    INSERT INTO users (id, email, password_hash, full_name, role, email_verified, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, FALSE, NOW(), NOW())
  `
  
  await executeQuery(query, [userId, email, hashedPassword, fullName || null, role])
  
  // Return the created user (without password)
  const user = await getUserById(userId)
  if (!user) {
    throw new Error('Failed to create user')
  }
  
  return user
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const query = `
    SELECT id, email, full_name, avatar_url, role, email_verified, phone, created_at, updated_at
    FROM users 
    WHERE email = ?
  `
  
  return await executeQuerySingle<User>(query, [email])
}

export async function getUserById(userId: string): Promise<User | null> {
  const query = `
    SELECT id, email, full_name, avatar_url, role, email_verified, phone, created_at, updated_at
    FROM users 
    WHERE id = ?
  `
  
  return await executeQuerySingle<User>(query, [userId])
}

export async function getUserWithPassword(email: string): Promise<(User & { password_hash: string }) | null> {
  const query = `
    SELECT id, email, password_hash, full_name, avatar_url, role, email_verified, phone, created_at, updated_at
    FROM users 
    WHERE email = ?
  `
  
  return await executeQuerySingle<User & { password_hash: string }>(query, [email])
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const userWithPassword = await getUserWithPassword(email)
  
  if (!userWithPassword) {
    return null
  }
  
  const isValidPassword = await verifyPassword(password, userWithPassword.password_hash)
  
  if (!isValidPassword) {
    return null
  }
  
  // Return user without password
  const { password_hash, ...user } = userWithPassword
  return user
}

export async function updateUserProfile(userId: string, updates: {
  fullName?: string
  phone?: string
  avatarUrl?: string
}): Promise<User | null> {
  const setParts: string[] = []
  const values: any[] = []
  
  if (updates.fullName !== undefined) {
    setParts.push('full_name = ?')
    values.push(updates.fullName)
  }
  
  if (updates.phone !== undefined) {
    setParts.push('phone = ?')
    values.push(updates.phone)
  }
  
  if (updates.avatarUrl !== undefined) {
    setParts.push('avatar_url = ?')
    values.push(updates.avatarUrl)
  }
  
  if (setParts.length === 0) {
    return await getUserById(userId)
  }
  
  setParts.push('updated_at = NOW()')
  values.push(userId)
  
  const query = `
    UPDATE users 
    SET ${setParts.join(', ')} 
    WHERE id = ?
  `
  
  await executeQuery(query, values)
  return await getUserById(userId)
}

export async function verifyUserEmail(userId: string): Promise<boolean> {
  const query = `
    UPDATE users 
    SET email_verified = TRUE, updated_at = NOW() 
    WHERE id = ?
  `
  
  try {
    await executeQuery(query, [userId])
    return true
  } catch (error) {
    return false
  }
}

// Validation helpers
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}