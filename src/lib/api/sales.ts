/**
 * Sale page API client and types
 * Sale pages are ClickFunnel-style landing pages for individual courses.
 * Until the backend has a dedicated sale_pages API, content is managed
 * per-slug in the frontend (see SALE_PAGES config in the page component).
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1'

// ── Types ──────────────────────────────────────────────────────────

export interface SalePageHero {
  headline: string
  subheadline: string
  videoUrl?: string
  imageUrl?: string
  ctaText: string
  ctaSubtext?: string
}

export interface PainPoint {
  icon: string // lucide icon name
  title: string
  description: string
}

export interface Benefit {
  icon: string
  title: string
  description: string
}

export interface CurriculumModule {
  title: string
  lessons: string[]
  duration?: string
}

export interface Testimonial {
  name: string
  role: string
  text: string
  avatarInitial: string
}

export interface InstructorInfo {
  name: string
  title: string
  bio: string
  avatarUrl?: string
  credentials: string[]
}

export interface OrderBump {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
}

export interface UpsellOffer {
  courseId: string
  title: string
  description: string
  price: number
  originalPrice: number
  ctaText: string
  imageUrl?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface SalePageData {
  slug: string
  courseId: string
  hero: SalePageHero
  painPoints: PainPoint[]
  benefits: Benefit[]
  curriculum: CurriculumModule[]
  testimonials: Testimonial[]
  instructor: InstructorInfo
  price: number
  originalPrice?: number
  currency: string
  orderBumps: OrderBump[]
  upsellOffers: UpsellOffer[]
  faq: FAQItem[]
  guarantee: {
    title: string
    description: string
    days: number
  }
  urgency?: {
    text: string
    endDate?: string // ISO date
  }
  stats: {
    students: string
    rating: string
    completion: string
  }
}

// ── API Functions ──────────────────────────────────────────────────

/**
 * Fetch sale page data by slug.
 * For now returns null — data comes from frontend config.
 * Will connect to backend API when available.
 */
export async function fetchSalePage(slug: string): Promise<SalePageData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/sales-pages/${slug}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
    if (!response.ok) return null
    const result = await response.json()
    return result.data || null
  } catch {
    return null
  }
}

/**
 * Accept an upsell offer after successful purchase.
 */
export async function acceptUpsell(courseId: string, upsellCourseId: string): Promise<{ success: boolean; message?: string }> {
  try {
    const token = typeof window !== 'undefined'
      ? (localStorage.getItem('auth_token') || localStorage.getItem('boostme_token'))
      : null
    if (!token) return { success: false, message: 'Not authenticated' }

    const response = await fetch(`${API_BASE_URL}/upsell/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        original_course_id: courseId,
        upsell_course_id: upsellCourseId,
      }),
    })
    return await response.json()
  } catch {
    return { success: false, message: 'Network error' }
  }
}
