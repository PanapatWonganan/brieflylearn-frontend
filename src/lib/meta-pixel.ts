/**
 * Meta Pixel utility functions for Antipararell
 * Handles browser-side event tracking + event_id generation for CAPI deduplication
 */

// Extend Window interface for fbq
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
    _fbq: (...args: unknown[]) => void
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''

/**
 * Check if Meta Pixel is loaded and configured
 */
export function isPixelEnabled(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function' && !!PIXEL_ID
}

/**
 * Generate a unique event ID for deduplication between Pixel and CAPI
 */
export function generateEventId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Initialize Meta Pixel (called once on app load)
 */
export function initPixel(): void {
  if (typeof window === 'undefined' || !PIXEL_ID) return

  // fbq snippet (standard Meta initialization)
  if (!window.fbq) {
    const n: unknown = (window.fbq = function (...args: unknown[]) {
      if ((n as { callMethod?: (...a: unknown[]) => void }).callMethod) {
        (n as { callMethod: (...a: unknown[]) => void }).callMethod(...args)
      } else {
        (n as { queue: unknown[] }).queue.push(args)
      }
    })
    const nObj = n as { push: typeof Array.prototype.push; loaded: boolean; version: string; queue: unknown[] }
    if (!window._fbq) window._fbq = n as typeof window._fbq
    nObj.push = nObj.push
    nObj.loaded = true
    nObj.version = '2.0'
    nObj.queue = []
  }

  window.fbq('init', PIXEL_ID)
  window.fbq('track', 'PageView')
}

/**
 * Track a standard Meta Pixel event
 * @param eventName - Standard event name (ViewContent, CompleteRegistration, AddToCart, Purchase, etc.)
 * @param params - Event parameters
 * @param eventId - Optional event ID for deduplication with CAPI
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>, eventId?: string): void {
  if (!isPixelEnabled()) return

  if (eventId) {
    window.fbq('track', eventName, params || {}, { eventID: eventId })
  } else {
    window.fbq('track', eventName, params || {})
  }
}

/**
 * Track a custom Meta Pixel event
 * @param eventName - Custom event name (LessonComplete, ExamComplete, GardenAction, etc.)
 * @param params - Event parameters
 * @param eventId - Optional event ID for deduplication with CAPI
 */
export function trackCustomEvent(eventName: string, params?: Record<string, unknown>, eventId?: string): void {
  if (!isPixelEnabled()) return

  if (eventId) {
    window.fbq('trackCustom', eventName, params || {}, { eventID: eventId })
  } else {
    window.fbq('trackCustom', eventName, params || {})
  }
}

/**
 * Track PageView (called on route changes)
 */
export function trackPageView(): void {
  if (!isPixelEnabled()) return
  window.fbq('track', 'PageView')
}

// ============================================================
// Convenience functions for Antipararell-specific events
// ============================================================

/**
 * Track when user views a course detail page
 */
export function trackViewCourse(courseId: string, courseTitle: string, category?: string): void {
  trackEvent('ViewContent', {
    content_type: 'product',
    content_ids: [courseId],
    content_name: courseTitle,
    content_category: category || 'course',
  })
}

/**
 * Track when user views a blog post
 */
export function trackViewBlogPost(postId: string, postTitle: string): void {
  trackEvent('ViewContent', {
    content_type: 'article',
    content_ids: [postId],
    content_name: postTitle,
  })
}

/**
 * Track successful registration
 * Returns eventId for CAPI deduplication
 */
export function trackRegistration(method: 'email' | 'google' = 'email'): string {
  const eventId = generateEventId()
  trackEvent('CompleteRegistration', {
    value: 0,
    currency: 'THB',
    content_name: `${method}_registration`,
    status: 'complete',
  }, eventId)
  return eventId
}

/**
 * Track course enrollment (AddToCart equivalent)
 * Returns eventId for CAPI deduplication
 */
export function trackCourseEnrollment(courseId: string, courseTitle: string, price: number = 0): string {
  const eventId = generateEventId()
  trackEvent('AddToCart', {
    content_type: 'product',
    content_ids: [courseId],
    content_name: courseTitle,
    value: price,
    currency: 'THB',
  }, eventId)
  return eventId
}

/**
 * Track course completion (Purchase equivalent)
 * Returns eventId for CAPI deduplication
 */
export function trackCourseCompletion(courseId: string, courseTitle: string, price: number = 0): string {
  const eventId = generateEventId()
  trackEvent('Purchase', {
    content_type: 'product',
    content_ids: [courseId],
    content_name: courseTitle,
    value: price,
    currency: 'THB',
    num_items: 1,
  }, eventId)
  return eventId
}

/**
 * Track lesson completion (custom event)
 * Returns eventId for CAPI deduplication
 */
export function trackLessonComplete(lessonId: string, lessonTitle: string, courseId: string): string {
  const eventId = generateEventId()
  trackCustomEvent('LessonComplete', {
    lesson_id: lessonId,
    lesson_title: lessonTitle,
    course_id: courseId,
  }, eventId)
  return eventId
}

/**
 * Track exam completion (custom event)
 */
export function trackExamComplete(examId: string, examTitle: string, score: number, passed: boolean): void {
  trackCustomEvent('ExamComplete', {
    exam_id: examId,
    exam_title: examTitle,
    score,
    passed,
  })
}

/**
 * Track when user initiates checkout (enters payment page)
 */
export function trackInitiateCheckout(courseId: string, price: number = 0): void {
  trackEvent('InitiateCheckout', {
    content_type: 'product',
    content_ids: [courseId],
    value: price,
    currency: 'THB',
    num_items: 1,
  })
}

/**
 * Track successful payment (Purchase event)
 * Returns eventId for CAPI deduplication
 */
export function trackPurchase(courseId: string, courseTitle: string, price: number = 0): string {
  const eventId = generateEventId()
  trackEvent('Purchase', {
    content_type: 'product',
    content_ids: [courseId],
    content_name: courseTitle,
    value: price,
    currency: 'THB',
    num_items: 1,
  }, eventId)
  return eventId
}

/**
 * Track onboarding completion (Lead event)
 */
export function trackLead(goals: string[], interests: string[], experienceLevel: string): void {
  trackEvent('Lead', {
    content_name: 'onboarding_complete',
    content_category: experienceLevel,
    num_items: goals.length + interests.length,
  })
}
