'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpen, Brain, Target, Users, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fetchCourses, Course } from '@/lib/api';

gsap.registerPlugin(ScrollTrigger);

/* ── Fallback course data when API is unavailable ── */
const FALLBACK_COURSES = [
  {
    id: 'ai-entrepreneur',
    title: 'AI สำหรับผู้ประกอบการ',
    description: 'เรียนรู้การนำ AI มาใช้สร้างธุรกิจใหม่ ตั้งแต่ไอเดียจนถึงการเปิดตัวผลิตภัณฑ์ ด้วยเครื่องมือ AI ล่าสุด',
    level: 'beginner',
    lessons_count: 12,
  },
  {
    id: 'ai-leader',
    title: 'AI สำหรับผู้บริหาร',
    description: 'วางกลยุทธ์ AI สำหรับองค์กร ตั้งแต่การประเมินความพร้อมจนถึงการ implement AI อย่างมีประสิทธิภาพ',
    level: 'intermediate',
    lessons_count: 15,
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering Masterclass',
    description: 'เทคนิคการเขียน Prompt ระดับสูง สำหรับ ChatGPT, Claude, Midjourney เพื่อผลลัพธ์ที่ดีที่สุด',
    level: 'intermediate',
    lessons_count: 10,
  },
];

/* ── Testimonials data ── */
const TESTIMONIALS = [
  {
    name: 'สมชาย ว.',
    role: 'CEO, Tech Startup',
    content: 'เนื้อหาเข้าใจง่าย ใช้ได้จริง ผมนำ AI ไปปรับใช้กับธุรกิจได้ทันทีหลังเรียนจบ คอร์สแรก ประหยัดเวลาทำงานไปเยอะมาก',
  },
  {
    name: 'วิภา ศ.',
    role: 'Marketing Director',
    content: 'ชอบที่สอนทั้ง AI Tools และวิธีคิดเชิงกลยุทธ์ ไม่ใช่แค่สอนกดปุ่ม แต่สอนให้เข้าใจว่าทำไมต้องใช้ AI แบบนี้',
  },
  {
    name: 'ภาคิน ล.',
    role: 'Product Manager',
    content: 'Platform ใช้งานง่าย เนื้อหาอัปเดตตลอด ได้ลองทำ Workshop จริงทำให้มั่นใจว่านำไปใช้งานได้',
  },
  {
    name: 'ณัฐพล ก.',
    role: 'Freelancer',
    content: 'เปลี่ยนชีวิตการทำงานเลย จากที่ทำงาน 10 ชั่วโมงต่อวัน ตอนนี้ใช้ AI ช่วยได้เหลือ 6 ชั่วโมง ผลงานดีขึ้นด้วย',
  },
  {
    name: 'ปณิดา ม.',
    role: 'HR Manager',
    content: 'นำ AI ไปใช้ในการคัดกรองใบสมัครงาน ประหยัดเวลาได้ 70% คอร์สนี้คุ้มค่ามากๆ',
  },
  {
    name: 'ธนกร จ.',
    role: 'Content Creator',
    content: 'ได้เรียนรู้วิธีใช้ AI ที่ถูกต้อง ไม่ใช่แค่ copy-paste แต่สร้างคอนเทนต์ที่มีคุณภาพจริงๆ',
  },
];

/* ── Stats data ── */
const STATS = [
  { value: '2,500+', label: 'ผู้เรียน' },
  { value: '15+', label: 'คอร์สเรียน' },
  { value: '98%', label: 'ความพึงพอใจ' },
  { value: '50+', label: 'Workshop' },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const [courses, setCourses] = useState<(Course | typeof FALLBACK_COURSES[0])[]>(FALLBACK_COURSES);

  /* ── Fetch real courses from API ── */
  useEffect(() => {
    fetchCourses().then((res) => {
      if (res.data) {
        const list = Array.isArray(res.data) ? res.data : [];
        if (list.length >= 3) {
          setCourses(list.slice(0, 3));
        }
      }
    }).catch(() => {
      // Keep fallback data
    });
  }, []);

  /* ── GSAP Animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Hero word-by-word reveal ── */
      const heroWords = gsap.utils.toArray<HTMLElement>('.hero-word');
      gsap.set(heroWords, { y: '100%', opacity: 0 });
      gsap.to(heroWords, {
        y: '0%',
        opacity: 1,
        duration: 1.2,
        stagger: 0.08,
        delay: 0.2,
        ease: 'power4.out',
      });

      /* Hero tagline line */
      gsap.to('.hero-rule', { scaleX: 1, duration: 1.4, delay: 0.6, ease: 'power3.inOut' });
      gsap.to('.hero-sub', { opacity: 1, y: 0, duration: 1, delay: 1.0, ease: 'power3.out' });
      gsap.to('.hero-cta', { opacity: 1, y: 0, duration: 0.8, delay: 1.3, ease: 'power2.out' });
      gsap.to('.hero-stats', { opacity: 1, y: 0, duration: 0.8, delay: 1.5, ease: 'power2.out' });

      /* Scroll-triggered sections */
      gsap.utils.toArray<HTMLElement>('.animate-section').forEach((section) => {
        gsap.from(section, { scrollTrigger: { trigger: section, start: 'top 85%' }, y: 40, opacity: 0, duration: 1, ease: 'power3.out' });
      });

      gsap.utils.toArray<HTMLElement>('.course-card').forEach((card, i) => {
        gsap.from(card, { scrollTrigger: { trigger: card, start: 'top 88%' }, y: 60, opacity: 0, duration: 1, delay: i * 0.15, ease: 'power3.out' });
      });

      gsap.utils.toArray<HTMLElement>('.feature-item').forEach((item, i) => {
        gsap.from(item, { scrollTrigger: { trigger: item, start: 'top 90%' }, y: 30, opacity: 0, duration: 0.8, delay: i * 0.1, ease: 'power3.out' });
      });

      gsap.utils.toArray<HTMLElement>('.testimonial-card').forEach((card, i) => {
        gsap.from(card, { scrollTrigger: { trigger: card, start: 'top 90%' }, y: 30, opacity: 0, duration: 0.8, delay: i * 0.08, ease: 'power3.out' });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-hidden">

      {/* ═══════ HERO ═══════ */}
      <section ref={heroRef} className="relative px-4 sm:px-6 max-w-6xl mx-auto pt-20 md:pt-32 pb-16 md:pb-24">
        <div className="flex flex-col items-center text-center">

          {/* Mono label */}
          <div
            className="hero-word mb-6"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: '#00FFBA' }}
          >
            AI Learning Platform
          </div>

          {/* Main headline — word-by-word reveal */}
          <h1 className="max-w-4xl" style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1 }}>
            {/* Line 1 */}
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-100">
              <span className="inline-block overflow-hidden"><span className="hero-word inline-block">เรียนรู้</span></span>{' '}
              <span className="inline-block overflow-hidden"><span className="hero-word inline-block text-mint-400">AI</span></span>
            </span>
            {/* Line 2 */}
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-100 mt-2">
              <span className="inline-block overflow-hidden"><span className="hero-word inline-block">สร้าง</span></span>{' '}
              <span className="inline-block overflow-hidden"><span className="hero-word inline-block text-mint-400">ธุรกิจ</span></span>
            </span>
            {/* Line 3 */}
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-100 mt-2">
              <span className="inline-block overflow-hidden"><span className="hero-word inline-block">บริหาร</span></span>{' '}
              <span className="inline-block overflow-hidden"><span className="hero-word inline-block">องค์กร</span></span>
            </span>
          </h1>

          {/* Horizontal rule — reveals from center */}
          <div
            className="hero-rule mt-10 mb-10 w-full max-w-md"
            style={{ height: '0.5px', background: 'rgba(0,255,186,0.3)', transform: 'scaleX(0)', transformOrigin: 'center' }}
          />

          {/* Subtitle */}
          <p className="hero-sub max-w-lg text-base text-gray-400 leading-relaxed opacity-0 translate-y-4" style={{ fontWeight: 300 }}>
            แพลตฟอร์มเรียน AI ออนไลน์สำหรับคนที่อยากนำ AI ไปใช้จริง
            <br className="hidden sm:block" />
            ทั้งสร้างธุรกิจส่วนตัวและบริหารองค์กรให้ก้าวหน้า
          </p>

          {/* CTA buttons */}
          <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 opacity-0 translate-y-4">
            <Link href="/courses" className="btn-primary group">
              เริ่มเรียน AI
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/exams" className="btn-secondary">
              ประเมินความพร้อมด้าน AI
            </Link>
          </div>

          {/* Stats bar */}
          <div className="hero-stats mt-14 grid grid-cols-4 gap-6 sm:gap-10 opacity-0 translate-y-4">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-xl md:text-2xl text-gray-100" style={{ fontWeight: 400 }}>{stat.value}</div>
                <div className="mt-0.5" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#888885' }}>{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════ TRUSTED BY / LOGOS BAR ═══════ */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto pb-12 md:pb-20">
        <div className="animate-section flex flex-col items-center gap-6">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#888885' }}>เครื่องมือ AI ที่สอนในคอร์ส</p>
          <div className="flex items-center gap-8 md:gap-12 flex-wrap justify-center opacity-50">
            {['ChatGPT', 'Claude', 'Midjourney', 'Gemini', 'Cursor'].map((tool) => (
              <span key={tool} className="text-sm md:text-base text-gray-400" style={{ fontWeight: 400, letterSpacing: '0.05em' }}>{tool}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FEATURED COURSES ═══════ */}
      <section className="relative px-4 sm:px-6 max-w-6xl mx-auto py-12 md:py-20">
        {/* Section divider */}
        <div style={{ height: '0.5px', background: 'rgba(0,255,180,0.12)' }} />

        <div className="pt-12 md:pt-20">
          {/* Section header — Brandbook style */}
          <div className="animate-section mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <div className="pb-3" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#00FFBA' }}>
              คอร์สแนะนำ
            </div>
            <h2 className="pb-4 text-3xl md:text-4xl text-gray-100" style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.01em' }}>
              เส้นทางที่ได้รับความนิยม
            </h2>
            <p className="text-base text-gray-400" style={{ fontWeight: 300 }}>
              เลือกคอร์สที่เหมาะกับเป้าหมายของคุณ ไม่ว่าจะสร้างธุรกิจหรือบริหารองค์กร
            </p>
          </div>

          {/* Course cards — Brandbook solid style */}
          <div className="mx-auto grid max-w-sm items-start gap-[0.5px] lg:max-w-none lg:grid-cols-3" style={{ background: 'rgba(0,255,180,0.12)' }}>
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="course-card group/card relative h-full overflow-hidden transition-all duration-300 hover:shadow-hover"
                style={{ background: '#1A1A1A', borderRadius: '0' }}
              >
                {/* Card image area — solid background */}
                <div className="relative h-44 overflow-hidden" style={{ background: '#141414' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-mint-400/20" />
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span
                      className="inline-block px-2.5 py-0.5 text-mint-400"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase' as const,
                        background: 'rgba(0,255,186,0.06)',
                        border: '0.5px solid rgba(0,255,186,0.2)',
                        borderRadius: '1px',
                      }}
                    >
                      {course.level === 'beginner' ? 'เริ่มต้น' : course.level === 'intermediate' ? 'ปานกลาง' : 'ขั้นสูง'}
                    </span>
                  </div>

                  <h3 className="text-lg text-gray-100 group-hover/card:text-white transition-colors duration-300" style={{ fontWeight: 400 }}>
                    {course.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-400 leading-relaxed line-clamp-2" style={{ fontWeight: 300 }}>
                    {course.description}
                  </p>

                  <div className="mt-4 pt-4 flex items-center justify-between text-xs" style={{ borderTop: '0.5px solid rgba(0,255,180,0.12)' }}>
                    <span className="text-gray-500" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em' }}>
                      {course.lessons_count > 0 ? `${course.lessons_count} LESSONS` : 'COMING SOON'}
                    </span>
                    <span className="flex items-center gap-1 text-mint-400 opacity-0 group-hover/card:opacity-100 transition-opacity" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em' }}>
                      START <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/courses" className="btn-ghost">
              ดูคอร์สทั้งหมด
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section className="relative px-4 sm:px-6 max-w-6xl mx-auto py-12 md:py-20">
        {/* Section divider */}
        <div style={{ height: '0.5px', background: 'rgba(0,255,180,0.12)' }} />

        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="animate-section mx-auto max-w-3xl pb-4 text-center md:pb-12">
            <div className="pb-3" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#00FFBA' }}>
              ทำไมต้อง Antipararell
            </div>
            <h2 className="pb-4 text-3xl md:text-4xl text-gray-100" style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.01em' }}>
              เรียน AI ที่นำไปใช้สร้างผลลัพธ์ได้จริง
            </h2>
            <p className="text-base text-gray-400" style={{ fontWeight: 300 }}>
              ไม่ใช่แค่รู้ทฤษฎี แต่ต้องลงมือทำจริงและเห็นผลลัพธ์
            </p>
          </div>

          {/* Feature grid */}
          <div className="mx-auto grid max-w-sm gap-12 sm:max-w-none sm:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:grid-cols-3">
            {[
              { icon: <Target className="h-5 w-5" />, title: '2 เส้นทาง AI', desc: 'เลือก Entrepreneur สร้างธุรกิจ หรือ Leader บริหารองค์กรด้วย AI' },
              { icon: <Zap className="h-5 w-5" />, title: 'อัปเดต AI ล่าสุด', desc: 'เนื้อหาอัปเดตตาม AI Tools ใหม่ ทั้ง ChatGPT, Claude, Midjourney' },
              { icon: <BookOpen className="h-5 w-5" />, title: 'ลงมือทำจริง', desc: 'Workshop และ Project ให้นำ AI ไปใช้ได้ทันที ไม่ใช่แค่นั่งดูวิดีโอ' },
              { icon: <Shield className="h-5 w-5" />, title: 'รับประกันความพอใจ', desc: 'ไม่พอใจ คืนเงิน 100% ภายใน 30 วัน ไม่มีเงื่อนไข' },
              { icon: <Brain className="h-5 w-5" />, title: 'สอนโดยผู้เชี่ยวชาญ', desc: 'จากผู้เชี่ยวชาญที่นำ AI ไปใช้จริงในธุรกิจและองค์กร' },
              { icon: <Users className="h-5 w-5" />, title: 'ชุมชนผู้เรียน', desc: 'เรียนรู้ร่วมกับชุมชนผู้สนใจ AI และแลกเปลี่ยนประสบการณ์' },
            ].map((feature, i) => (
              <article key={i} className="feature-item">
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center text-mint-400"
                  style={{ background: '#1A1A1A', border: '0.5px solid rgba(0,255,180,0.12)', borderRadius: '2px' }}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-1 text-base text-gray-100" style={{ fontWeight: 400 }}>
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed" style={{ fontWeight: 300 }}>
                  {feature.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="relative px-4 sm:px-6 max-w-6xl mx-auto py-12 md:py-20">
        {/* Section divider */}
        <div style={{ height: '0.5px', background: 'rgba(0,255,180,0.12)' }} />

        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="animate-section mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <div className="pb-3" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#00FFBA' }}>
              เสียงจากผู้เรียน
            </div>
            <h2 className="pb-4 text-3xl md:text-4xl text-gray-100" style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.01em' }}>
              ผู้เรียนของเราพูดว่าอะไร
            </h2>
            <p className="text-base text-gray-400" style={{ fontWeight: 300 }}>
              ดูผลลัพธ์จริงจากผู้ที่เรียนจบและนำ AI ไปใช้งานได้แล้ว
            </p>
          </div>

          {/* Testimonials grid — Brandbook card style */}
          <div className="mx-auto grid max-w-sm items-start gap-[0.5px] sm:max-w-none sm:grid-cols-2 lg:grid-cols-3" style={{ background: 'rgba(0,255,180,0.12)' }}>
            {TESTIMONIALS.map((testimonial, i) => (
              <article
                key={i}
                className="testimonial-card p-6"
                style={{ background: '#141414' }}
              >
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-gray-400 leading-relaxed" style={{ fontWeight: 300 }}>
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center text-mint-400 text-sm"
                      style={{ background: 'rgba(0,255,186,0.06)', border: '1px solid rgba(0,255,186,0.2)', borderRadius: '50%', fontWeight: 500 }}
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-200" style={{ fontWeight: 400 }}>{testimonial.name}</span>
                      <span className="text-gray-700"> &mdash; </span>
                      <span className="text-gray-500" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.05em' }}>{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="relative overflow-hidden px-4 sm:px-6 max-w-6xl mx-auto py-12 md:py-20">
        {/* Section divider */}
        <div style={{ height: '0.5px', background: 'rgba(0,255,180,0.12)' }} />

        <div className="py-12 md:py-20 mt-12 md:mt-20" style={{ background: '#141414', border: '0.5px solid rgba(0,255,180,0.12)', borderRadius: '2px' }}>
          <div className="animate-section mx-auto max-w-3xl text-center px-6">
            <h2 className="pb-8 text-3xl md:text-4xl text-gray-100" style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.01em' }}>
              พร้อมเริ่มเรียน AI แล้วหรือยัง?
            </h2>
            <p className="text-base text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto" style={{ fontWeight: 300 }}>
              เริ่มต้นเส้นทาง AI วันนี้ เรียนรู้จากผู้เชี่ยวชาญ ลงมือทำจริง และนำไปใช้ได้ทันที
            </p>
            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center gap-4">
              <Link href="/courses" className="btn-primary group mb-4 w-full sm:mb-0 sm:w-auto">
                เริ่มเรียน AI เลย
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/exams" className="btn-secondary w-full sm:w-auto">
                ประเมินความพร้อมด้าน AI
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
