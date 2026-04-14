'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContextNew'
import { submitOnboarding, RecommendedCourse } from '@/lib/api/auth'
import { ArrowRight, ArrowLeft, Check, BookOpen, Briefcase, Building2, Sparkles, Brain, Zap, Target, BarChart3, Layers } from 'lucide-react'
import Link from 'next/link'
import gsap from 'gsap'

type Step = 'welcome' | 'goals' | 'interests' | 'experience' | 'courses'

const GOALS = [
  { id: 'build-business', label: 'สร้างธุรกิจด้วย AI', description: 'ใช้ AI สร้างรายได้และธุรกิจใหม่', icon: Briefcase },
  { id: 'manage-org', label: 'บริหารองค์กรด้วย AI', description: 'นำ AI ไปใช้ในการบริหารจัดการ', icon: Building2 },
  { id: 'self-improve', label: 'พัฒนาตัวเอง', description: 'เรียนรู้ AI เพื่อเพิ่มทักษะส่วนตัว', icon: Sparkles },
  { id: 'career-change', label: 'เปลี่ยนสายงาน', description: 'เรียนรู้ AI เพื่อเปลี่ยนสายอาชีพ', icon: Target },
]

const INTERESTS = [
  { id: 'ai-fundamentals', label: 'AI พื้นฐาน', icon: Brain },
  { id: 'ai-business', label: 'AI สร้างธุรกิจ', icon: Briefcase },
  { id: 'ai-organization', label: 'AI บริหารองค์กร', icon: Building2 },
  { id: 'prompt-engineering', label: 'Prompt Engineering', icon: Zap },
  { id: 'ai-automation', label: 'AI Automation', icon: Layers },
  { id: 'ai-strategy', label: 'AI Strategy', icon: BarChart3 },
]

const EXPERIENCE_LEVELS = [
  { id: 'beginner', label: 'เริ่มต้น', description: 'ยังไม่เคยใช้ AI หรือเพิ่งเริ่มสนใจ' },
  { id: 'intermediate', label: 'พอใช้บ้าง', description: 'ใช้ ChatGPT หรือ AI tools บ้างแล้ว' },
  { id: 'advanced', label: 'ใช้งานเป็นประจำ', description: 'ใช้ AI ในการทำงานจริงทุกวัน' },
]

export default function OnboardingPage() {
  const { user, loading, isAuthenticated, setOnboardingCompleted } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState<Step>('welcome')
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [experienceLevel, setExperienceLevel] = useState<string>('')
  const [recommendedCourses, setRecommendedCourses] = useState<RecommendedCourse[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const stepRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth')
    }
  }, [isAuthenticated, loading, router])

  // Track whether user completed onboarding during THIS session
  // so we don't redirect to dashboard while showing course recommendations
  const completedDuringSession = useRef(false)

  useEffect(() => {
    if (!loading && isAuthenticated && user?.onboardingCompleted && !completedDuringSession.current) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, loading, user, router])

  // Animate step transitions
  useEffect(() => {
    if (stepRef.current) {
      gsap.fromTo(
        stepRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      )
    }
  }, [step])

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')

    const result = await submitOnboarding({
      goals: selectedGoals,
      interests: selectedInterests,
      experience_level: experienceLevel as 'beginner' | 'intermediate' | 'advanced',
    })

    if (result.success && result.data) {
      setRecommendedCourses(result.data.recommended_courses)
      completedDuringSession.current = true
      setOnboardingCompleted()
      setStep('courses')
    } else {
      setError(result.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่')
    }

    setSubmitting(false)
  }

  const goNext = () => {
    const steps: Step[] = ['welcome', 'goals', 'interests', 'experience']
    const currentIndex = steps.indexOf(step)
    if (step === 'experience') {
      handleSubmit()
    } else if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1])
    }
  }

  const goBack = () => {
    const steps: Step[] = ['welcome', 'goals', 'interests', 'experience']
    const currentIndex = steps.indexOf(step)
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1])
    }
  }

  const canProceed = () => {
    switch (step) {
      case 'welcome': return true
      case 'goals': return selectedGoals.length > 0
      case 'interests': return selectedInterests.length > 0
      case 'experience': return experienceLevel !== ''
      default: return false
    }
  }

  const stepNumber = () => {
    const steps: Step[] = ['welcome', 'goals', 'interests', 'experience', 'courses']
    return steps.indexOf(step)
  }

  if (loading || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-surface-400 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-400" />
      </div>
    )
  }

  const firstName = user.fullName?.split(' ')[0] || user.fullName

  return (
    <div className="min-h-screen bg-surface-400 flex flex-col">
      {/* Progress bar */}
      {step !== 'courses' && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="h-[2px] bg-surface-200">
            <div
              className="h-full bg-mint-400 transition-all duration-700 ease-out"
              style={{ width: `${((stepNumber()) / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step indicator */}
      {step !== 'welcome' && step !== 'courses' && (
        <div className="fixed top-6 right-8 z-50">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
            {stepNumber()}/4
          </span>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-16">
        <div ref={stepRef} className="w-full max-w-xl">
          {/* ── Welcome Step ── */}
          {step === 'welcome' && (
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint-400 mb-6">
                WELCOME TO BRIEFLYLEARN
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl font-light text-surface-50 mb-4 leading-tight">
                {firstName ? (
                  <>
                    สวัสดี,{' '}
                    <span className="italic text-mint-400">{firstName}</span>
                  </>
                ) : (
                  'ยินดีต้อนรับ'
                )}
              </h1>
              <p className="text-ink-muted text-base sm:text-lg font-light max-w-md mx-auto mb-12 leading-relaxed">
                ให้เราช่วยแนะนำเส้นทางการเรียนรู้ที่เหมาะกับคุณ
                <br />
                ใช้เวลาไม่ถึง 1 นาที
              </p>
              <button
                onClick={goNext}
                className="btn-primary inline-flex items-center gap-3 text-base px-8 py-3"
              >
                <span>เริ่มต้น</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ── Goals Step ── */}
          {step === 'goals' && (
            <div>
              <button
                onClick={goBack}
                className="inline-flex items-center gap-2 text-ink-muted hover:text-surface-50 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.15em]">BACK</span>
              </button>

              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint-400 mb-3">
                STEP 1 — YOUR GOALS
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-surface-50 mb-2">
                คุณอยากใช้ AI เพื่ออะไร?
              </h2>
              <p className="text-ink-muted text-sm mb-8">เลือกได้มากกว่า 1 ข้อ</p>

              <div className="space-y-3">
                {GOALS.map(goal => {
                  const Icon = goal.icon
                  const selected = selectedGoals.includes(goal.id)
                  return (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`w-full text-left p-4 rounded-sm border transition-all duration-200 ${
                        selected
                          ? 'border-mint-400 bg-mint-400/5'
                          : 'border-surface-100 bg-surface-300 hover:border-surface-50/20'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 ${
                          selected ? 'bg-mint-400/10 text-mint-400' : 'bg-surface-200 text-ink-muted'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${selected ? 'text-surface-50' : 'text-surface-50/80'}`}>
                            {goal.label}
                          </p>
                          <p className="text-xs text-ink-muted mt-0.5">{goal.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-sm border flex items-center justify-center shrink-0 transition-all ${
                          selected
                            ? 'border-mint-400 bg-mint-400 text-surface-400'
                            : 'border-surface-100'
                        }`}>
                          {selected && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-8">
                <button
                  onClick={goNext}
                  disabled={!canProceed()}
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 py-3 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span>ถัดไป</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── Interests Step ── */}
          {step === 'interests' && (
            <div>
              <button
                onClick={goBack}
                className="inline-flex items-center gap-2 text-ink-muted hover:text-surface-50 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.15em]">BACK</span>
              </button>

              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint-400 mb-3">
                STEP 2 — YOUR INTERESTS
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-surface-50 mb-2">
                หัวข้อไหนที่คุณสนใจ?
              </h2>
              <p className="text-ink-muted text-sm mb-8">เลือกได้มากกว่า 1 ข้อ</p>

              <div className="grid grid-cols-2 gap-3">
                {INTERESTS.map(interest => {
                  const Icon = interest.icon
                  const selected = selectedInterests.includes(interest.id)
                  return (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`text-left p-4 rounded-sm border transition-all duration-200 ${
                        selected
                          ? 'border-mint-400 bg-mint-400/5'
                          : 'border-surface-100 bg-surface-300 hover:border-surface-50/20'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-sm flex items-center justify-center mb-3 ${
                        selected ? 'bg-mint-400/10 text-mint-400' : 'bg-surface-200 text-ink-muted'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <p className={`text-sm font-medium ${selected ? 'text-surface-50' : 'text-surface-50/80'}`}>
                        {interest.label}
                      </p>
                    </button>
                  )
                })}
              </div>

              <div className="mt-8">
                <button
                  onClick={goNext}
                  disabled={!canProceed()}
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 py-3 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span>ถัดไป</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── Experience Level Step ── */}
          {step === 'experience' && (
            <div>
              <button
                onClick={goBack}
                className="inline-flex items-center gap-2 text-ink-muted hover:text-surface-50 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.15em]">BACK</span>
              </button>

              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint-400 mb-3">
                STEP 3 — YOUR EXPERIENCE
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-surface-50 mb-2">
                ประสบการณ์ AI ของคุณ?
              </h2>
              <p className="text-ink-muted text-sm mb-8">เลือก 1 ข้อที่ตรงกับคุณมากที่สุด</p>

              <div className="space-y-3">
                {EXPERIENCE_LEVELS.map(level => {
                  const selected = experienceLevel === level.id
                  return (
                    <button
                      key={level.id}
                      onClick={() => setExperienceLevel(level.id)}
                      className={`w-full text-left p-4 rounded-sm border transition-all duration-200 ${
                        selected
                          ? 'border-mint-400 bg-mint-400/5'
                          : 'border-surface-100 bg-surface-300 hover:border-surface-50/20'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${selected ? 'text-surface-50' : 'text-surface-50/80'}`}>
                            {level.label}
                          </p>
                          <p className="text-xs text-ink-muted mt-0.5">{level.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          selected
                            ? 'border-mint-400'
                            : 'border-surface-100'
                        }`}>
                          {selected && <div className="w-2.5 h-2.5 rounded-full bg-mint-400" />}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {error && (
                <p className="text-error text-sm mt-4">{error}</p>
              )}

              <div className="mt-8">
                <button
                  onClick={goNext}
                  disabled={!canProceed() || submitting}
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 py-3 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-surface-400" />
                      <span>กำลังประมวลผล...</span>
                    </>
                  ) : (
                    <>
                      <span>ดูคอร์สที่แนะนำ</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ── Recommended Courses Step ── */}
          {step === 'courses' && (
            <div>
              <div className="text-center mb-10">
                <div className="w-12 h-12 rounded-sm bg-mint-400/10 text-mint-400 flex items-center justify-center mx-auto mb-5">
                  <BookOpen className="w-6 h-6" />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint-400 mb-3">
                  RECOMMENDED FOR YOU
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-surface-50 mb-2">
                  คอร์สที่เหมาะกับคุณ
                </h2>
                <p className="text-ink-muted text-sm">
                  เราเลือกคอร์สเหล่านี้จากความสนใจของคุณ
                </p>
              </div>

              {recommendedCourses.length > 0 ? (
                <div className="space-y-3 mb-10">
                  {recommendedCourses.map(course => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.id}`}
                      className="block p-4 rounded-sm border border-surface-100 bg-surface-300 hover:border-mint-400/30 transition-all duration-200 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-sm bg-surface-200 flex items-center justify-center shrink-0 group-hover:bg-mint-400/10 transition-colors">
                          <BookOpen className="w-5 h-5 text-ink-muted group-hover:text-mint-400 transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-surface-50 group-hover:text-mint-400 transition-colors">
                            {course.title}
                          </p>
                          {course.description && (
                            <p className="text-xs text-ink-muted mt-1 line-clamp-2">
                              {course.description}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-2">
                            {course.category && (
                              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-mint-400/70">
                                {course.category}
                              </span>
                            )}
                            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-muted">
                              {course.level === 'beginner' ? 'เริ่มต้น' : course.level === 'intermediate' ? 'กลาง' : 'สูง'}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-ink-muted group-hover:text-mint-400 shrink-0 mt-1 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 mb-10">
                  <p className="text-ink-muted text-sm">
                    ยังไม่มีคอร์สที่ตรงกับความสนใจของคุณในขณะนี้
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Link
                  href="/courses"
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 py-3"
                >
                  <span>ดูคอร์สทั้งหมด</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/dashboard"
                  className="btn-ghost w-full inline-flex items-center justify-center gap-2 py-3"
                >
                  <span>ไปหน้าหลัก</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Skip link */}
      {step !== 'courses' && step !== 'welcome' && (
        <div className="fixed bottom-8 left-0 right-0 text-center">
          <button
            onClick={async () => {
              // Submit with whatever was selected so far (use defaults for empty fields)
              await submitOnboarding({
                goals: selectedGoals.length > 0 ? selectedGoals : ['self-improve'],
                interests: selectedInterests.length > 0 ? selectedInterests : ['ai-fundamentals'],
                experience_level: (experienceLevel || 'beginner') as 'beginner' | 'intermediate' | 'advanced',
              })
              setOnboardingCompleted()
              router.push('/dashboard')
            }}
            className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted hover:text-surface-50 transition-colors"
          >
            SKIP FOR NOW
          </button>
        </div>
      )}
    </div>
  )
}
