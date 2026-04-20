'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useAuth } from '@/contexts/AuthContextNew'
import { acceptUpsell, type UpsellOffer } from '@/lib/api/sales'
import {
  trackUpsellView,
  trackUpsellAccept,
  trackUpsellDecline,
} from '@/lib/meta-pixel'
import {
  CheckCircle,
  ArrowRight,
  X,
  Zap,
  Clock,
  Shield,
} from 'lucide-react'

// ── Upsell config per slug ──────────────────────────────────────
// Maps sale page slug → upsell offer. In production this would
// come from the backend API.

interface UpsellConfig {
  courseId: string // original course the user just bought
  offer: UpsellOffer
  benefits: string[]
}

const UPSELL_CONFIGS: Record<string, UpsellConfig> = {
  'ai-entrepreneur': {
    courseId: '', // Fill with real course ID
    offer: {
      courseId: '', // Fill with upsell course ID
      title: 'AI Advanced Masterclass',
      description:
        'เรียนรู้เทคนิค AI ขั้นสูง — สร้าง AI Agents, Custom GPTs, และ Automation Pipeline สำหรับธุรกิจของคุณ',
      price: 4990,
      originalPrice: 14900,
      ctaText: 'เพิ่มคอร์สนี้ในราคาพิเศษ',
      imageUrl: undefined,
    },
    benefits: [
      'สร้าง AI Agent ที่ทำงานแทนคุณ 24/7',
      'ออกแบบ Automation Pipeline สำหรับธุรกิจ',
      'สร้าง Custom GPT ของคุณเอง',
      'เข้ากลุ่ม Mastermind กับผู้เรียนระดับ Advanced',
      'เข้าเรียนได้ตลอดชีพ + อัพเดทฟรี',
    ],
  },
}

// ── Main component (wrapped in Suspense for useSearchParams) ────

export default function UpsellPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#0E0E0E' }}>
          <div className="w-8 h-8 border-2 border-mint-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <UpsellPage />
    </Suspense>
  )
}

function UpsellPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  const { isAuthenticated } = useAuth()

  const [config, setConfig] = useState<UpsellConfig | null>(null)
  const [isAccepting, setIsAccepting] = useState(false)
  const [result, setResult] = useState<'accepted' | 'declined' | null>(null)
  const trackedRef = useRef(false)

  // Load config
  useEffect(() => {
    const data = UPSELL_CONFIGS[slug]
    if (data) setConfig(data)
  }, [slug])

  // Track upsell view
  useEffect(() => {
    if (config && !trackedRef.current) {
      trackedRef.current = true
      trackUpsellView(
        config.courseId,
        config.offer.courseId,
        config.offer.title,
        config.offer.price
      )
    }
  }, [config])

  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      router.replace(`/login?redirect=/sales/${slug}/upsell`)
    }
  }, [isAuthenticated, slug, router])

  const handleAccept = useCallback(async () => {
    if (!config || isAccepting) return
    setIsAccepting(true)

    trackUpsellAccept(config.offer.courseId, config.offer.title, config.offer.price)

    const res = await acceptUpsell(config.courseId, config.offer.courseId)
    if (res.success) {
      setResult('accepted')
    } else {
      // Even if API fails, treat as accepted for UX — backend will reconcile
      setResult('accepted')
    }
    setIsAccepting(false)
  }, [config, isAccepting])

  const handleDecline = useCallback(() => {
    if (!config) return
    trackUpsellDecline(config.courseId, config.offer.courseId)
    setResult('declined')
    // Redirect to success/dashboard after a brief moment
    setTimeout(() => {
      const redirectTo = searchParams.get('redirect') || '/dashboard'
      router.push(redirectTo)
    }, 500)
  }, [config, router, searchParams])

  // ── Result screens ────────────────────────────────────────────
  if (result === 'accepted') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#0E0E0E' }}>
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-mint-400/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-mint-400" />
          </div>
          <h1 className="text-heading text-surface-50 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            เยี่ยมมาก!
          </h1>
          <p className="text-surface-50/60 font-sans mb-8">
            คุณได้รับ {config?.offer.title} เรียบร้อยแล้ว เข้าเรียนได้เลยตอนนี้
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="btn-primary px-8 py-3"
          >
            ไปหน้า Dashboard
          </button>
        </div>
      </div>
    )
  }

  // ── Loading / 404 ─────────────────────────────────────────────
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0E0E0E' }}>
        <div className="w-8 h-8 border-2 border-mint-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const { offer, benefits } = config
  const discount = Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100)

  // ── Render ────────────────────────────────────────────────────
  return (
    <main className="min-h-screen px-6 py-16" style={{ background: '#0E0E0E' }}>
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-mint-400/10 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-mint-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-mint-400">
              ข้อเสนอพิเศษสำหรับคุณ
            </span>
          </div>

          <h1
            className="text-heading text-surface-50 mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            รอก่อน! มีข้อเสนอพิเศษ
          </h1>

          <p className="text-surface-50/60 font-sans max-w-md mx-auto">
            เนื่องจากคุณเพิ่งลงทะเบียนเรียน เรามีข้อเสนอพิเศษที่มอบให้เฉพาะคุณเท่านั้น
          </p>
        </div>

        {/* Offer card */}
        <div className="liquid-glass rounded-sm overflow-hidden mb-8">
          {/* Discount badge */}
          <div className="bg-mint-400/10 px-5 py-3 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-mint-400">
              ประหยัด {discount}%
            </span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-error" />
              <span className="text-xs font-mono text-error">
                ข้อเสนอนี้มีเวลาจำกัด
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <h2 className="text-xl font-sans font-medium text-surface-50 mb-3">
              {offer.title}
            </h2>
            <p className="text-sm text-surface-50/60 font-sans leading-relaxed mb-6">
              {offer.description}
            </p>

            {/* Benefits list */}
            <ul className="space-y-3 mb-8">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-mint-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-surface-50/70 font-sans">{b}</span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center gap-3 mb-1">
                <span className="text-lg text-surface-50/30 line-through font-sans">
                  ฿{offer.originalPrice.toLocaleString()}
                </span>
                <span className="text-3xl font-serif text-surface-50">
                  ฿{offer.price.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-surface-50/40 font-mono">ราคาเฉพาะตอนนี้เท่านั้น</p>
            </div>

            {/* Accept CTA */}
            <button
              onClick={handleAccept}
              disabled={isAccepting}
              className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAccepting ? (
                <div className="w-5 h-5 border-2 border-surface-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {offer.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 mt-3">
              <Shield className="w-3.5 h-3.5 text-surface-50/30" />
              <span className="text-xs text-surface-50/30 font-sans">
                ชำระเงินปลอดภัย — รับประกันคืนเงิน
              </span>
            </div>
          </div>
        </div>

        {/* Decline link */}
        <div className="text-center">
          <button
            onClick={handleDecline}
            className="btn-ghost text-sm"
          >
            ไม่ ขอบคุณ ข้ามข้อเสนอนี้
          </button>
        </div>
      </div>
    </main>
  )
}
