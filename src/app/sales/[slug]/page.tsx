'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContextNew'
import { fetchCourseLessons, type CourseWithLessons } from '@/lib/api'
import {
  type SalePageData,
  type SalePageHero,
  type PainPoint,
  type Benefit,
  type CurriculumModule,
  type Testimonial,
  type InstructorInfo,
  type OrderBump,
  type FAQItem,
} from '@/lib/api/sales'
import {
  trackSalePageView,
  trackSalePageCTA,
  trackOrderBumpAdd,
  trackInitiateCheckout,
} from '@/lib/meta-pixel'
import {
  Play,
  CheckCircle,
  Shield,
  Clock,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Zap,
  Target,
  TrendingUp,
  BookOpen,
  Award,
  ArrowRight,
  Download,
  MousePointerClick,
  Rocket,
} from 'lucide-react'

// ── Color system for sale funnel ────────────────────────────────
// 3-color palette optimized for conversion:
//   1. Mint (#00FFBA)  → trust, info, checkmarks, stats
//   2. Orange (#FF6B35) → CTA buttons, action elements
//   3. Red (#FF4757)    → urgency, scarcity, strikethrough prices
const CTA_COLOR = '#FF6B35'
const CTA_HOVER = '#E85A28'
const CTA_GLOW = 'rgba(255,107,53,0.3)'
const URGENCY_COLOR = '#FF4757'

// ── Sale page config ────────────────────────────────────────────
// Until the backend has a sale_pages API, content is managed here.
// Each slug maps to a SalePageData object. Add new sale pages below.

const SALE_PAGES: Record<string, SalePageData> = {
  'ai-entrepreneur': {
    slug: 'ai-entrepreneur',
    courseId: '', // Fill with real course ID
    hero: {
      headline: 'เปลี่ยนธุรกิจของคุณด้วย AI',
      subheadline: 'คอร์สเรียนที่จะสอนให้คุณใช้ AI สร้างรายได้จริง ไม่ต้องเขียนโค้ดเป็น ไม่ต้องมีพื้นฐานด้านเทคโนโลยี',
      ctaText: 'ลงทะเบียนเรียนตอนนี้',
      ctaSubtext: 'รับประกันคืนเงิน 30 วัน',
    },
    painPoints: [
      {
        icon: 'AlertTriangle',
        title: 'เสียเวลากับงานซ้ำๆ',
        description: 'ทำงานแบบเดิมทุกวัน ไม่มีเวลาพัฒนาธุรกิจ',
      },
      {
        icon: 'TrendingUp',
        title: 'คู่แข่งก้าวนำไปแล้ว',
        description: 'ธุรกิจที่ใช้ AI กำลังแซงหน้าคุณทุกวัน',
      },
      {
        icon: 'Target',
        title: 'ไม่รู้จะเริ่มต้นยังไง',
        description: 'ข้อมูลมากมายบนอินเทอร์เน็ต แต่ไม่รู้อันไหนใช้ได้จริง',
      },
    ],
    benefits: [
      {
        icon: 'Zap',
        title: 'ใช้ AI ทำงานแทนได้ทันที',
        description: 'เรียนจบแต่ละบทเรียน ได้เครื่องมือ AI กลับไปใช้เลย',
      },
      {
        icon: 'TrendingUp',
        title: 'เพิ่มรายได้ ลดต้นทุน',
        description: 'ตัวอย่างจริงจากธุรกิจที่ใช้ AI ลดต้นทุน 40%',
      },
      {
        icon: 'Target',
        title: 'Roadmap ชัดเจน',
        description: 'แผนการเรียนรู้ที่ออกแบบมาสำหรับคนไม่มีพื้นฐาน',
      },
      {
        icon: 'BookOpen',
        title: 'เนื้อหาอัพเดทตลอด',
        description: 'เข้าถึงเนื้อหาใหม่ที่อัพเดทตาม AI ล่าสุดตลอดชีพ',
      },
    ],
    curriculum: [
      {
        title: 'บทที่ 1: AI Fundamentals',
        lessons: ['AI คืออะไร ทำไมต้องรู้ตอนนี้', 'ChatGPT, Claude, Gemini — เลือกตัวไหนดี', 'เขียน Prompt อย่างมืออาชีพ'],
        duration: '45 นาที',
      },
      {
        title: 'บทที่ 2: AI สำหรับธุรกิจ',
        lessons: ['Automate งานซ้ำๆ ด้วย AI', 'สร้าง Content Marketing ด้วย AI', 'วิเคราะห์ข้อมูลลูกค้าด้วย AI'],
        duration: '60 นาที',
      },
      {
        title: 'บทที่ 3: สร้างรายได้ด้วย AI',
        lessons: ['5 โมเดลธุรกิจ AI ที่ทำเงินจริง', 'สร้าง AI Product ตัวแรกของคุณ', 'Scale ธุรกิจ AI ให้โต'],
        duration: '75 นาที',
      },
    ],
    testimonials: [
      {
        name: 'สมชาย ก.',
        role: 'เจ้าของธุรกิจ SME',
        text: 'หลังเรียนจบ ผมใช้ AI ลดเวลาทำงาน 3 ชม./วัน รายได้เพิ่มขึ้น 2 เท่าในเดือนแรก',
        avatarInitial: 'ส',
      },
      {
        name: 'มานี จ.',
        role: 'Freelancer',
        text: 'เคยกลัวเทคโนโลยีมาก แต่คอร์สนี้สอนง่ายมาก ตอนนี้รับงานได้เพิ่มขึ้นเยอะเลย',
        avatarInitial: 'ม',
      },
      {
        name: 'วิชัย พ.',
        role: 'Marketing Manager',
        text: 'ทีมผมใช้ AI สร้าง content ได้เร็วขึ้น 5 เท่า คุณภาพดีกว่าเดิมด้วย',
        avatarInitial: 'ว',
      },
    ],
    instructor: {
      name: 'ทีม BrieflyLearn',
      title: 'AI Education Experts',
      bio: 'ทีมผู้สอนที่มีประสบการณ์ด้าน AI และ Business มากกว่า 10 ปี สอนมาแล้วกว่า 5,000 คน',
      credentials: [
        'สอนมาแล้วกว่า 5,000+ คน',
        'ประสบการณ์ AI & Business 10+ ปี',
        'ที่ปรึกษาให้บริษัทชั้นนำ',
      ],
    },
    price: 2990,
    originalPrice: 9900,
    currency: 'THB',
    orderBumps: [
      {
        id: 'prompt-templates',
        title: 'Prompt Templates Pack',
        description: '100+ Prompt สำเร็จรูปสำหรับธุรกิจ มูลค่า ฿1,990',
        price: 490,
        originalPrice: 1990,
      },
    ],
    upsellOffers: [
      {
        courseId: '',
        title: 'AI Advanced Masterclass',
        description: 'เรียนรู้เทคนิค AI ขั้นสูงสำหรับธุรกิจ — Automation, AI Agents, และ Custom GPTs',
        price: 4990,
        originalPrice: 14900,
        ctaText: 'เพิ่มคอร์สนี้ในราคาพิเศษ',
      },
    ],
    faq: [
      {
        question: 'ต้องมีพื้นฐานด้านเทคโนโลยีไหม?',
        answer: 'ไม่ต้องเลย! คอร์สนี้ออกแบบมาสำหรับคนที่ไม่มีพื้นฐานด้าน AI หรือ Programming โดยเฉพาะ',
      },
      {
        question: 'เรียนจบแล้วได้อะไร?',
        answer: 'คุณจะสามารถใช้ AI เครื่องมือต่างๆ ในธุรกิจได้ทันที ได้ Prompt Templates กว่า 50+ อัน และมี Roadmap ชัดเจนในการนำ AI มาใช้',
      },
      {
        question: 'มีการรับประกันคืนเงินไหม?',
        answer: 'มีครับ! รับประกันคืนเงิน 30 วัน หากเรียนแล้วไม่พอใจ สามารถขอเงินคืนได้เต็มจำนวน',
      },
      {
        question: 'เข้าเรียนได้นานแค่ไหน?',
        answer: 'เข้าเรียนได้ตลอดชีพ! รวมถึงเนื้อหาที่อัพเดทในอนาคตด้วย',
      },
    ],
    guarantee: {
      title: 'รับประกันคืนเงิน 100%',
      description: 'หากคุณเรียนแล้วรู้สึกว่าไม่ได้ประโยชน์ สามารถขอเงินคืนได้เต็มจำนวน ไม่มีเงื่อนไข ไม่ต้องตอบคำถาม',
      days: 30,
    },
    urgency: {
      text: 'ราคาพิเศษนี้มีจำนวนจำกัด',
    },
    stats: {
      students: '5,000+',
      rating: '4.9',
      completion: '92%',
    },
  },
}

// ── Icon resolver ───────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  AlertTriangle, Zap, Target, TrendingUp, BookOpen, Award,
  Shield, Clock, Users, Star, CheckCircle, Play, Download,
  MousePointerClick, Rocket,
}

function resolveIcon(name: string): React.ElementType {
  return ICON_MAP[name] || Zap
}

// ── Social proof names for rotating popup ───────────────────────
const SOCIAL_PROOF_NAMES = [
  'สมชาย ก.', 'มานี จ.', 'วิชัย พ.', 'นิดา ส.', 'ประยุทธ์ ล.',
  'กานดา ร.', 'ศักดิ์ชัย ว.', 'อรุณ ม.', 'ปรียา ธ.', 'ธนกร บ.',
]
const SOCIAL_PROOF_TIMES = ['2 นาทีที่แล้ว', '5 นาทีที่แล้ว', '12 นาทีที่แล้ว', '18 นาทีที่แล้ว', '25 นาทีที่แล้ว']

// ── Main page component ─────────────────────────────────────────

export default function SalePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const { isAuthenticated, loading: authLoading } = useAuth()

  const [saleData, setSaleData] = useState<SalePageData | null>(null)
  const [courseData, setCourseData] = useState<CourseWithLessons | null>(null)
  const [selectedBumps, setSelectedBumps] = useState<Set<string>>(new Set())
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const pricingRef = useRef<HTMLDivElement>(null)
  const trackedRef = useRef(false)

  // Load sale page data
  useEffect(() => {
    const data = SALE_PAGES[slug]
    if (data) {
      setSaleData(data)
      if (data.courseId) {
        fetchCourseLessons(data.courseId).then((res) => {
          if (res.data) setCourseData(res.data)
        })
      }
    }
    setIsLoading(false)
  }, [slug])

  // Track page view
  useEffect(() => {
    if (saleData && !trackedRef.current) {
      trackedRef.current = true
      trackSalePageView(saleData.courseId, saleData.hero.headline, saleData.price, saleData.slug)
    }
  }, [saleData])

  const scrollToPricing = useCallback(() => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const userHasPaidAccess = courseData?.user_has_paid_access

  const handleCTA = useCallback(() => {
    if (!saleData) return
    trackSalePageCTA(saleData.courseId, saleData.hero.headline, saleData.price)
    trackInitiateCheckout(saleData.courseId, saleData.price)

    if (!isAuthenticated) {
      router.push(`/login?redirect=/courses/${saleData.courseId}`)
      return
    }
    if (userHasPaidAccess) {
      const firstLesson = courseData?.lessons?.find((l) => !l.locked)
      router.push(firstLesson ? `/lessons/${firstLesson.id}` : `/courses/${saleData.courseId}`)
      return
    }
    router.push(`/courses/${saleData.courseId}/checkout`)
  }, [saleData, isAuthenticated, userHasPaidAccess, courseData, router])

  const toggleBump = useCallback(
    (bumpId: string) => {
      setSelectedBumps((prev) => {
        const next = new Set(prev)
        if (next.has(bumpId)) {
          next.delete(bumpId)
        } else {
          next.add(bumpId)
          const bump = saleData?.orderBumps.find((b) => b.id === bumpId)
          if (bump && saleData) {
            trackOrderBumpAdd(bump.id, bump.title, bump.price, saleData.courseId)
          }
        }
        return next
      })
    },
    [saleData]
  )

  const totalPrice = saleData
    ? saleData.price + saleData.orderBumps.filter((b) => selectedBumps.has(b.id)).reduce((sum, b) => sum + b.price, 0)
    : 0

  const ctaLabel = !isAuthenticated
    ? 'เข้าสู่ระบบเพื่อซื้อคอร์ส'
    : userHasPaidAccess
      ? 'เข้าเรียนต่อ'
      : `ลงทะเบียนเลย — ฿${totalPrice.toLocaleString()}`

  // ── Loading / 404 ─────────────────────────────────────────────
  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0E0E0E' }}>
        <div className="w-8 h-8 border-2 border-mint-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!saleData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#0E0E0E' }}>
        <p className="text-surface-50 font-sans text-lg">ไม่พบหน้า Sale Page นี้</p>
        <button onClick={() => router.push('/courses')} className="btn-secondary px-6 py-2">
          ดูคอร์สทั้งหมด
        </button>
      </div>
    )
  }

  // ── Render ─────────────────────────────────────────────────────
  return (
    <main className="min-h-screen" style={{ background: '#0E0E0E' }}>
      {/* ▸ Sticky Price Header Bar */}
      <StickyPriceHeader
        price={totalPrice}
        originalPrice={saleData.originalPrice}
        ctaLabel={ctaLabel}
        onCTA={handleCTA}
      />

      {/* ▸ Hero Section */}
      <HeroSection hero={saleData.hero} stats={saleData.stats} onCTA={scrollToPricing} />

      {/* ▸ 3-Step How It Works */}
      <HowItWorksSection />

      {/* ▸ Pain Points */}
      <PainPointsSection painPoints={saleData.painPoints} />

      {/* ▸ Benefits / Solution */}
      <BenefitsSection benefits={saleData.benefits} />

      {/* ▸ Curriculum */}
      <CurriculumSection modules={saleData.curriculum} totalLessons={courseData?.total_lessons} />

      {/* ▸ Testimonials */}
      <TestimonialsSection testimonials={saleData.testimonials} />

      {/* ▸ Instructor */}
      <InstructorSection instructor={saleData.instructor} />

      {/* ▸ Pricing Breakdown + Order Bumps */}
      <div ref={pricingRef}>
        <PricingSection
          price={saleData.price}
          originalPrice={saleData.originalPrice}
          currency={saleData.currency}
          orderBumps={saleData.orderBumps}
          selectedBumps={selectedBumps}
          onToggleBump={toggleBump}
          totalPrice={totalPrice}
          ctaLabel={ctaLabel}
          onCTA={handleCTA}
          urgency={saleData.urgency}
        />
      </div>

      {/* ▸ Guarantee */}
      <GuaranteeSection guarantee={saleData.guarantee} />

      {/* ▸ FAQ */}
      <FAQSection
        faq={saleData.faq}
        expandedIndex={expandedFaq}
        onToggle={(i) => setExpandedFaq(expandedFaq === i ? null : i)}
      />

      {/* ▸ Final CTA */}
      <FinalCTASection
        price={saleData.price}
        originalPrice={saleData.originalPrice}
        ctaLabel={ctaLabel}
        onCTA={handleCTA}
      />

      {/* ▸ Social Proof Popup */}
      <SocialProofPopup />

      {/* ▸ Sticky Mobile CTA (bottom bar, mobile only) */}
      <StickyMobileCTA ctaLabel={ctaLabel} onCTA={handleCTA} price={totalPrice} />
    </main>
  )
}

// ══════════════════════════════════════════════════════════════════
// Section Components
// ══════════════════════════════════════════════════════════════════

// ── Sticky Price Header (like aiflowlab top bar) ────────────────
function StickyPriceHeader({
  price,
  originalPrice,
  ctaLabel,
  onCTA,
}: {
  price: number
  originalPrice?: number
  ctaLabel: string
  onCTA: () => void
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        background: 'rgba(14, 14, 14, 0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-center gap-6">
        <div className="flex items-baseline gap-3">
          {originalPrice && (
            <span className="text-sm line-through font-mono" style={{ color: URGENCY_COLOR }}>
              ฿{originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-surface-50/40 text-sm">&rarr;</span>
          <span className="text-xl font-serif font-bold text-surface-50">
            ฿{price.toLocaleString()}
          </span>
        </div>
        <button
          onClick={onCTA}
          className="px-6 py-2 text-xs font-sans font-medium text-white rounded-sm transition-all"
          style={{
            background: CTA_COLOR,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = CTA_HOVER)}
          onMouseLeave={(e) => (e.currentTarget.style.background = CTA_COLOR)}
        >
          {ctaLabel}
        </button>
      </div>

    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────
function HeroSection({
  hero,
  stats,
  onCTA,
}: {
  hero: SalePageHero
  stats: SalePageData['stats']
  onCTA: () => void
}) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(255,107,53,0.05) 0%, transparent 50%), radial-gradient(ellipse at 50% 60%, rgba(0,255,186,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Tagline pill */}
        <div className="inline-flex items-center gap-2 liquid-glass rounded-full px-5 py-2 mb-8">
          <Zap className="w-4 h-4 text-mint-400" />
          <span className="text-xs font-mono uppercase tracking-widest text-surface-50/70">
            Limited Offer
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-heading md:text-display text-surface-50 mb-6"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {hero.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-surface-50/60 font-sans max-w-2xl mx-auto mb-10 leading-relaxed">
          {hero.subheadline}
        </p>

        {/* CTA */}
        <button
          onClick={onCTA}
          className="px-10 py-4 text-base font-sans font-medium text-white rounded-sm transition-all shadow-lg"
          style={{ background: CTA_COLOR, boxShadow: `0 4px 24px ${CTA_GLOW}` }}
          onMouseEnter={(e) => (e.currentTarget.style.background = CTA_HOVER)}
          onMouseLeave={(e) => (e.currentTarget.style.background = CTA_COLOR)}
        >
          {hero.ctaText}
        </button>
        {hero.ctaSubtext && (
          <p className="mt-3 text-sm text-surface-50/40 font-sans">{hero.ctaSubtext}</p>
        )}

        {/* Trust badges */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-surface-50/30 font-mono">
          <span className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-mint-400/50" /> ปลอดภัย 100%</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-mint-400/50" /> เรียนได้ตลอดชีพ</span>
          <span className="flex items-center gap-1.5"><Award className="w-3 h-3 text-mint-400/50" /> ใบรับรอง</span>
        </div>

        {/* Stats bar */}
        <div className="mt-14 grid grid-cols-3 gap-6 max-w-md mx-auto">
          <StatItem icon={Users} label="นักเรียน" value={stats.students} />
          <StatItem icon={Star} label="คะแนน" value={stats.rating} />
          <StatItem icon={Award} label="เรียนจบ" value={stats.completion} />
        </div>
      </div>
    </section>
  )
}

function StatItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="text-center">
      <Icon className="w-5 h-5 text-mint-400 mx-auto mb-2" />
      <p className="text-xl font-serif text-surface-50">{value}</p>
      <p className="text-xs text-surface-50/40 font-mono uppercase tracking-wider">{label}</p>
    </div>
  )
}

// ── 3-Step "How It Works" (inspired by aiflowlab) ───────────────
function HowItWorksSection() {
  const steps = [
    { num: '01', icon: Download, title: 'ลงทะเบียน', desc: 'สมัครเรียนและเข้าถึงเนื้อหาทั้งหมดได้ทันที' },
    { num: '02', icon: MousePointerClick, title: 'เรียนตามจังหวะคุณ', desc: 'เรียนผ่านวิดีโอและแบบฝึกหัด เลือกเรียนได้ทุกที่ทุกเวลา' },
    { num: '03', icon: Rocket, title: 'นำไปใช้จริง', desc: 'เอาเครื่องมือและ Prompt ไปใช้กับธุรกิจได้เลย เห็นผลทันที' },
  ]

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-mono uppercase tracking-widest text-mint-400 mb-4 text-center">
          ง่ายมาก 3 ขั้นตอน
        </p>
        <h2 className="text-heading text-surface-50 text-center mb-14" style={{ fontFamily: 'var(--font-serif)' }}>
          เริ่มต้นยังไง?
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div key={i} className="liquid-glass rounded-sm p-8 text-center">
              <span className="text-3xl font-serif text-mint-400 mb-3 block">{s.num}</span>
              <s.icon className="w-8 h-8 text-mint-400 mx-auto mb-4" />
              <h3 className="text-base font-sans font-medium text-surface-50 mb-2">{s.title}</h3>
              <p className="text-sm text-surface-50/50 font-sans leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Pain Points ─────────────────────────────────────────────────
function PainPointsSection({ painPoints }: { painPoints: PainPoint[] }) {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-mono uppercase tracking-widest mb-4 text-center" style={{ color: URGENCY_COLOR }}>
          ปัญหาที่คุณกำลังเจอ
        </p>
        <h2 className="text-heading text-surface-50 text-center mb-14" style={{ fontFamily: 'var(--font-serif)' }}>
          คุณกำลังเจอปัญหาเหล่านี้อยู่ไหม?
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {painPoints.map((point, i) => {
            const Icon = resolveIcon(point.icon)
            return (
              <div key={i} className="rounded-sm p-7 text-center" style={{ background: '#1A1A1A', borderLeft: `3px solid ${URGENCY_COLOR}` }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: `${URGENCY_COLOR}15` }}>
                  <Icon className="w-6 h-6" style={{ color: URGENCY_COLOR }} />
                </div>
                <h3 className="text-lg font-sans font-medium text-surface-50 mb-3">{point.title}</h3>
                <p className="text-sm text-surface-50/50 font-sans leading-relaxed">{point.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Benefits ────────────────────────────────────────────────────
function BenefitsSection({ benefits }: { benefits: Benefit[] }) {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-mono uppercase tracking-widest text-mint-400 mb-4 text-center">
          สิ่งที่คุณจะได้รับ
        </p>
        <h2 className="text-heading text-surface-50 text-center mb-14" style={{ fontFamily: 'var(--font-serif)' }}>
          ทำไมคอร์สนี้ถึงเปลี่ยนชีวิตคุณได้
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {benefits.map((benefit, i) => {
            const Icon = resolveIcon(benefit.icon)
            return (
              <div key={i} className="liquid-glass rounded-sm p-7 flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-mint-400/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-mint-400" />
                </div>
                <div>
                  <h3 className="text-base font-sans font-medium text-surface-50 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-surface-50/50 font-sans leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Curriculum ──────────────────────────────────────────────────
function CurriculumSection({ modules, totalLessons }: { modules: CurriculumModule[]; totalLessons?: number }) {
  const [expandedModule, setExpandedModule] = useState<number | null>(0)

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-mono uppercase tracking-widest text-mint-400 mb-4 text-center">หลักสูตร</p>
        <h2 className="text-heading text-surface-50 text-center mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          เนื้อหาที่คุณจะได้เรียน
        </h2>
        {totalLessons && (
          <p className="text-center text-sm text-surface-50/40 font-mono mb-12">{totalLessons} บทเรียน</p>
        )}

        <div className="space-y-3">
          {modules.map((mod, i) => {
            const isOpen = expandedModule === i
            return (
              <div key={i} className="liquid-glass rounded-sm overflow-hidden">
                <button onClick={() => setExpandedModule(isOpen ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-mint-400/10 flex items-center justify-center text-xs font-mono text-mint-400">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-sans font-medium text-surface-50">{mod.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {mod.duration && <span className="text-xs text-surface-50/40 font-mono">{mod.duration}</span>}
                    {isOpen ? <ChevronUp className="w-4 h-4 text-surface-50/40" /> : <ChevronDown className="w-4 h-4 text-surface-50/40" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0">
                    <div className="border-t border-surface-50/5 pt-4 space-y-3">
                      {mod.lessons.map((lesson, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <Play className="w-3.5 h-3.5 text-mint-400/60" />
                          <span className="text-sm text-surface-50/60 font-sans">{lesson}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Testimonials ────────────────────────────────────────────────
function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-mono uppercase tracking-widest text-mint-400 mb-4 text-center">รีวิวจากผู้เรียน</p>
        <h2 className="text-heading text-surface-50 text-center mb-14" style={{ fontFamily: 'var(--font-serif)' }}>
          คนที่เรียนแล้วพูดว่าอะไร
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="liquid-glass rounded-sm p-7">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 text-mint-400 fill-mint-400" />
                ))}
              </div>
              <p className="text-sm text-surface-50/70 font-sans leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-mint-400/10 flex items-center justify-center text-sm font-mono text-mint-400">
                  {t.avatarInitial}
                </div>
                <div>
                  <p className="text-sm font-sans font-medium text-surface-50">{t.name}</p>
                  <p className="text-xs text-surface-50/40 font-sans">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Instructor ──────────────────────────────────────────────────
function InstructorSection({ instructor }: { instructor: InstructorInfo }) {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-mono uppercase tracking-widest text-mint-400 mb-4 text-center">ผู้สอน</p>
        <h2 className="text-heading text-surface-50 text-center mb-12" style={{ fontFamily: 'var(--font-serif)' }}>
          เรียนกับผู้เชี่ยวชาญตัวจริง
        </h2>

        <div className="liquid-glass rounded-sm p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0 w-24 h-24 rounded-full bg-mint-400/10 flex items-center justify-center">
            {instructor.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={instructor.avatarUrl} alt={instructor.name} className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <Users className="w-10 h-10 text-mint-400" />
            )}
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-sans font-medium text-surface-50 mb-1">{instructor.name}</h3>
            <p className="text-sm text-mint-400 font-mono mb-4">{instructor.title}</p>
            <p className="text-sm text-surface-50/60 font-sans leading-relaxed mb-4">{instructor.bio}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {instructor.credentials.map((cred, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 text-xs font-mono text-surface-50/50 bg-surface-50/5 px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-3 h-3 text-mint-400" />
                  {cred}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Pricing Section (with breakdown table + order bump toggle) ──
function PricingSection({
  price,
  originalPrice,
  orderBumps,
  selectedBumps,
  onToggleBump,
  totalPrice,
  ctaLabel,
  onCTA,
  urgency,
}: {
  price: number
  originalPrice?: number
  currency: string
  orderBumps: OrderBump[]
  selectedBumps: Set<string>
  onToggleBump: (id: string) => void
  totalPrice: number
  ctaLabel: string
  onCTA: () => void
  urgency?: SalePageData['urgency']
}) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  // Pricing breakdown items (aiflowlab-style value table)
  const breakdownItems = [
    { label: 'คอร์สเรียนเต็มรูปแบบ', originalValue: 5900 },
    { label: 'Prompt Templates 50+ ชิ้น', originalValue: 1990 },
    { label: 'เข้าถึงเนื้อหาอัพเดทตลอดชีพ', originalValue: 2990 },
    { label: 'กลุ่มนักเรียนส่วนตัว', originalValue: 1490 },
    { label: 'ใบรับรองเมื่อจบคอร์ส', originalValue: 990 },
  ]
  const totalOriginalValue = breakdownItems.reduce((sum, item) => sum + item.originalValue, 0)

  return (
    <section className="px-6 py-16 md:py-24" id="pricing">
      <div className="max-w-lg mx-auto">
        {/* Urgency badge */}
        {urgency && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider"
              style={{ background: `${URGENCY_COLOR}15`, color: URGENCY_COLOR }}
            >
              <Clock className="w-3.5 h-3.5" />
              {urgency.text}
            </span>
          </div>
        )}

        <div className="liquid-glass rounded-sm overflow-hidden">
          {/* Header */}
          <div className="p-8 text-center border-b border-surface-50/5">
            <p className="text-xs font-mono uppercase tracking-widest text-mint-400 mb-6">ลงทะเบียนวันนี้</p>
          </div>

          {/* Pricing breakdown table (aiflowlab-style) */}
          <div className="px-8 py-6 border-b border-surface-50/5">
            <table className="w-full text-sm">
              <tbody>
                {breakdownItems.map((item, i) => (
                  <tr key={i} className="border-b border-surface-50/5 last:border-0">
                    <td className="py-3 text-surface-50/70 font-sans">{item.label}</td>
                    <td className="py-3 text-right line-through font-mono text-xs" style={{ color: `${URGENCY_COLOR}80` }}>
                      ฿{item.originalValue.toLocaleString()}
                    </td>
                  </tr>
                ))}
                {/* Total row */}
                <tr className="border-t-2 border-surface-50/20">
                  <td className="pt-4 pb-2 text-surface-50 font-sans font-bold">มูลค่ารวม</td>
                  <td className="pt-4 pb-2 text-right line-through font-mono font-bold" style={{ color: URGENCY_COLOR }}>
                    ฿{totalOriginalValue.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Big price */}
          <div className="px-8 py-8 text-center border-b border-surface-50/5">
            <p className="text-xs text-surface-50/40 font-mono mb-2 uppercase tracking-wider">ราคาวันนี้</p>
            <div className="flex items-baseline justify-center gap-3">
              {originalPrice && (
                <span className="text-xl line-through font-sans" style={{ color: `${URGENCY_COLOR}90` }}>
                  ฿{originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-5xl md:text-6xl font-serif text-surface-50 font-bold">
                ฿{price.toLocaleString()}
              </span>
            </div>
            {discount > 0 && (
              <span className="inline-block mt-3 bg-mint-400/10 text-mint-400 text-xs font-mono px-3 py-1 rounded-full">
                ประหยัด {discount}%
              </span>
            )}
            <p className="mt-2 text-xs text-surface-50/30 font-mono">จ่ายครั้งเดียว เข้าเรียนตลอดชีพ</p>
          </div>

          {/* Order Bumps (toggle style like aiflowlab) */}
          {orderBumps.length > 0 && (
            <div className="px-8 py-6 border-b border-surface-50/5">
              {orderBumps.map((bump) => (
                <OrderBumpToggle
                  key={bump.id}
                  bump={bump}
                  isSelected={selectedBumps.has(bump.id)}
                  onToggle={() => onToggleBump(bump.id)}
                />
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="p-8">
            <button
              onClick={onCTA}
              className="w-full py-4 text-base font-sans font-medium text-white rounded-sm flex items-center justify-center gap-2 transition-all shadow-lg"
              style={{ background: CTA_COLOR, boxShadow: `0 4px 24px ${CTA_GLOW}` }}
              onMouseEnter={(e) => (e.currentTarget.style.background = CTA_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.background = CTA_COLOR)}
            >
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </button>

            {selectedBumps.size > 0 && (
              <p className="text-center text-xs text-surface-50/40 font-mono mt-3">
                รวมทั้งหมด: ฿{totalPrice.toLocaleString()}
              </p>
            )}

            <div className="flex items-center justify-center gap-6 mt-5">
              <span className="flex items-center gap-1.5 text-xs text-surface-50/30 font-mono">
                <Shield className="w-3.5 h-3.5 text-mint-400/50" /> ปลอดภัย
              </span>
              <span className="flex items-center gap-1.5 text-xs text-surface-50/30 font-mono">
                <CheckCircle className="w-3.5 h-3.5 text-mint-400/50" /> คืนเงิน 30 วัน
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Order Bump Toggle (aiflowlab-style with toggle switch) ──────
function OrderBumpToggle({
  bump,
  isSelected,
  onToggle,
}: {
  bump: OrderBump
  isSelected: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`relative rounded-sm overflow-hidden transition-all duration-300 ${
        isSelected ? 'border' : 'border border-surface-50/10'
      }`}
      style={{
        ...(isSelected ? { borderColor: `${CTA_COLOR}60` } : {}),
        animation: 'orderBumpSlideIn 0.5s ease-out both',
        animationDelay: '0.3s',
      }}
    >
      {/* Recommended badge */}
      <div
        className="absolute -top-px left-4 px-3 py-1 rounded-b-sm text-xs font-mono uppercase tracking-wider z-10"
        style={{
          background: `linear-gradient(135deg, ${CTA_COLOR}, ${CTA_HOVER})`,
          color: '#FFFFFF',
          fontWeight: 700,
        }}
      >
        แนะนำ
      </div>

      {/* Toggle row */}
      <button onClick={onToggle} className="w-full flex items-center justify-between px-5 py-5 pt-8 text-left">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-sans font-medium text-surface-50 mb-1">{bump.title}</h4>
          <p className="text-xs text-surface-50/50 font-sans">{bump.description}</p>
          <div className="flex items-baseline gap-2 mt-2">
            {bump.originalPrice && (
              <span className="text-xs text-surface-50/30 line-through">฿{bump.originalPrice.toLocaleString()}</span>
            )}
            <span className="text-sm font-mono text-mint-400 font-bold">+฿{bump.price.toLocaleString()}</span>
          </div>
        </div>

        {/* Toggle switch */}
        <div className="shrink-0 ml-4 flex items-center gap-2">
          <span className="text-xl" style={{ color: CTA_COLOR, animation: 'nudgeArrow 1s ease-in-out infinite' }}>
            &raquo;
          </span>
          <div
            className="relative w-12 h-7 rounded-full transition-colors duration-300"
            style={{ background: isSelected ? CTA_COLOR : 'rgba(255,255,255,0.15)' }}
          >
            <div
              className={`absolute top-[3px] left-[3px] w-[22px] h-[22px] rounded-full bg-white shadow-sm transition-transform duration-300 ${
                isSelected ? 'translate-x-[18px]' : ''
              }`}
            />
          </div>
        </div>
      </button>

    </div>
  )
}

// ── Guarantee ───────────────────────────────────────────────────
function GuaranteeSection({ guarantee }: { guarantee: SalePageData['guarantee'] }) {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-mint-400/10 flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-mint-400" />
        </div>
        <h2 className="text-heading text-surface-50 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          {guarantee.title}
        </h2>
        <p className="text-sm text-surface-50/60 font-sans leading-relaxed max-w-lg mx-auto mb-4">
          {guarantee.description}
        </p>
        <p className="text-xs font-mono text-mint-400 uppercase tracking-wider">{guarantee.days} วัน — ไม่มีเงื่อนไข</p>
      </div>
    </section>
  )
}

// ── FAQ ─────────────────────────────────────────────────────────
function FAQSection({
  faq,
  expandedIndex,
  onToggle,
}: {
  faq: FAQItem[]
  expandedIndex: number | null
  onToggle: (i: number) => void
}) {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs font-mono uppercase tracking-widest text-mint-400 mb-4 text-center">คำถามที่พบบ่อย</p>
        <h2 className="text-heading text-surface-50 text-center mb-12" style={{ fontFamily: 'var(--font-serif)' }}>
          FAQ
        </h2>

        <div className="space-y-3">
          {faq.map((item, i) => {
            const isOpen = expandedIndex === i
            return (
              <div key={i} className="liquid-glass rounded-sm overflow-hidden">
                <button onClick={() => onToggle(i)} className="w-full flex items-center justify-between p-5 text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-mint-400 font-mono font-bold text-sm shrink-0">&gt;</span>
                    <span className="font-sans text-sm font-medium text-surface-50">{item.question}</span>
                  </div>
                  <span className="text-surface-50/40 font-mono text-sm shrink-0 ml-4">{isOpen ? '[-]' : '[+]'}</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0">
                    <div className="border-t border-surface-50/5 pt-4 pl-6">
                      <p className="text-sm text-surface-50/60 font-sans leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Final CTA (with blinking cursor) ────────────────────────────
function FinalCTASection({
  price,
  originalPrice,
  ctaLabel,
  onCTA,
}: {
  price: number
  originalPrice?: number
  ctaLabel: string
  onCTA: () => void
}) {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-heading text-surface-50 mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
          พร้อมที่จะเปลี่ยนแปลงหรือยัง?
          <span
            className="inline-block w-3 h-7 ml-1 align-middle"
            style={{
              background: CTA_COLOR,
              animation: 'blinkCursor 1s step-end infinite',
            }}
          />
        </h2>

        <p className="text-surface-50/50 font-sans mb-8 max-w-lg mx-auto">
          อย่ารอจนสายเกินไป เริ่มต้นการเรียนรู้ AI วันนี้ แล้วคุณจะเห็นผลลัพธ์ที่แตกต่าง
        </p>

        <div className="flex items-baseline justify-center gap-3 mb-8">
          {originalPrice && (
            <span className="text-lg line-through font-sans" style={{ color: `${URGENCY_COLOR}90` }}>฿{originalPrice.toLocaleString()}</span>
          )}
          <span className="text-3xl font-serif text-surface-50 font-bold">฿{price.toLocaleString()}</span>
        </div>

        <button
          onClick={onCTA}
          className="px-12 py-4 text-base font-sans font-medium text-white rounded-sm transition-all shadow-lg"
          style={{ background: CTA_COLOR, boxShadow: `0 4px 24px ${CTA_GLOW}` }}
          onMouseEnter={(e) => (e.currentTarget.style.background = CTA_HOVER)}
          onMouseLeave={(e) => (e.currentTarget.style.background = CTA_COLOR)}
        >
          {ctaLabel}
        </button>

      </div>
    </section>
  )
}

// ── Social Proof Popup (bottom-left notification) ───────────────
function SocialProofPopup() {
  const [visible, setVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // First popup after 8 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true)
      // Hide after 4 seconds
      setTimeout(() => setVisible(false), 4000)
    }, 8000)

    // Rotate every 15 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SOCIAL_PROOF_NAMES.length)
      setVisible(true)
      setTimeout(() => setVisible(false), 4000)
    }, 15000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [])

  const name = SOCIAL_PROOF_NAMES[currentIndex]
  const time = SOCIAL_PROOF_TIMES[currentIndex % SOCIAL_PROOF_TIMES.length]

  return (
    <div
      className="fixed bottom-6 left-5 z-40 hidden md:flex items-center gap-3 rounded-sm px-4 py-3 max-w-[320px] transition-all duration-500"
      style={{
        background: '#1A1A1A',
        border: '1px solid rgba(255,255,255,0.08)',
        transform: visible ? 'translateX(0)' : 'translateX(-120%)',
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: `${CTA_COLOR}15` }}>
        <CheckCircle className="w-4 h-4" style={{ color: CTA_COLOR }} />
      </div>
      <div>
        <p className="text-xs text-surface-50 font-sans">
          <span className="font-medium">{name}</span> เพิ่งลงทะเบียนเรียน
        </p>
        <p className="text-xs text-surface-50/30 font-mono">{time}</p>
      </div>
    </div>
  )
}

// ── Sticky Mobile CTA (bottom bar, mobile only) ─────────────────
function StickyMobileCTA({
  ctaLabel,
  onCTA,
  price,
}: {
  ctaLabel: string
  onCTA: () => void
  price: number
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div
        className="px-4 py-3 flex items-center justify-between gap-3"
        style={{
          background: 'rgba(14, 14, 14, 0.95)',
          backdropFilter: 'blur(12px)',
          borderTop: `2px solid ${CTA_COLOR}40`,
        }}
      >
        <div>
          <p className="text-lg font-serif text-surface-50 font-bold">฿{price.toLocaleString()}</p>
        </div>
        <button
          onClick={onCTA}
          className="px-6 py-3 text-sm font-sans font-medium text-white rounded-sm flex-1 max-w-[220px] transition-all"
          style={{ background: CTA_COLOR }}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  )
}
