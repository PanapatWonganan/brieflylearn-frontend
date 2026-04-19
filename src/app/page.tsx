'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpen, Brain, Target, Users, Shield } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fetchCourses, Course } from '@/lib/api';

gsap.registerPlugin(ScrollTrigger);

/* ── Hero background video with fade loop ── */
const HeroVideo = () => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let raf: number;
    const animateOpacity = (from: number, to: number, dur = 500) => {
      cancelAnimationFrame(raf);
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        v.style.opacity = String(from + (to - from) * t);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const onCanPlay = () => { v.play().catch(() => {}); animateOpacity(0, 1); };
    const onTimeUpdate = () => {
      if (v.duration && v.duration - v.currentTime <= 0.55) {
        const cur = parseFloat(v.style.opacity || '1');
        if (cur > 0.95) animateOpacity(cur, 0);
      }
    };
    const onEnded = () => {
      v.style.opacity = '0';
      setTimeout(() => { v.currentTime = 0; v.play().catch(() => {}); animateOpacity(0, 1); }, 100);
    };
    v.addEventListener('canplay', onCanPlay);
    v.addEventListener('timeupdate', onTimeUpdate);
    v.addEventListener('ended', onEnded);
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener('canplay', onCanPlay);
      v.removeEventListener('timeupdate', onTimeUpdate);
      v.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 w-full h-full object-cover object-bottom"
      style={{ opacity: 0 }}
      muted
      autoPlay
      playsInline
      preload="auto"
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
    />
  );
};


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
  const [courses, setCourses] = useState<Course[]>([]);

  /* ── Fetch courses from API ── */
  useEffect(() => {
    fetchCourses().then((res) => {
      if (res.data) {
        const list = Array.isArray(res.data) ? res.data : [];
        setCourses(list);
      }
    }).catch(() => {});
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

      /* Hero elements reveal */
      gsap.to('.hero-cta', { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power3.out' });
      gsap.to('.hero-sub', { opacity: 1, y: 0, duration: 1, delay: 1.0, ease: 'power3.out' });
      gsap.to('.hero-stats', { opacity: 1, y: 0, duration: 0.8, delay: 1.3, ease: 'power2.out' });

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

      {/* ═══════ HERO — Full-screen with video background ═══════ */}
      <section ref={heroRef} className="min-h-screen overflow-hidden relative flex flex-col" style={{ background: '#0E0E0E' }}>
        {/* Background video */}
        <div className="absolute inset-0 w-full h-full">
          <HeroVideo />
          {/* Vignette overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none" />
        </div>

        {/* Hero content — centered */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center" style={{ paddingTop: '100px' }}>
          {/* Mono label */}
          <div
            className="hero-word mb-6"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: '#00FFBA' }}
          >
            AI Learning Platform
          </div>

          {/* Main headline */}
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1 }}>
            <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap">
              <span className="inline-block overflow-hidden"><span className="hero-word inline-block">100M</span></span>{' '}
              <span className="inline-block overflow-hidden"><span className="hero-word inline-block italic" style={{ color: '#00FFBA' }}>Minds</span></span>
              <span className="inline-block overflow-hidden"><span className="hero-word inline-block">.</span></span>
            </span>
          </h1>

          {/* Email input pill — liquid glass */}
          <div className="hero-cta max-w-xl w-full mt-10 opacity-0 translate-y-4">
            <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-sm py-2"
              />
              <Link
                href="/courses"
                className="rounded-full p-3 transition-colors hover:opacity-90 flex-shrink-0"
                style={{ background: '#00FFBA', color: '#0E0E0E' }}
                aria-label="Submit"
              >
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Subtitle */}
          <p className="hero-sub text-white/80 text-sm leading-relaxed px-4 mt-6 max-w-xl opacity-0 translate-y-4" style={{ fontWeight: 300 }}>
            แพลตฟอร์มเรียน AI ออนไลน์สำหรับคนที่อยากนำ AI ไปใช้จริง
            <br className="hidden sm:block" />
            ทั้งสร้างธุรกิจส่วนตัวและบริหารองค์กรให้ก้าวหน้า
          </p>

          {/* CTA buttons */}
          <div className="hero-stats mt-8 flex flex-col sm:flex-row gap-4 opacity-0 translate-y-4">
            <Link
              href="/courses"
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              เริ่มเรียน AI
            </Link>
            <Link
              href="/exams"
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              ประเมินความพร้อมด้าน AI
            </Link>
          </div>
        </div>

        {/* Stats bar — bottom of hero */}
        <div className="relative z-10 pb-16 px-6">
          <div className="hero-stats max-w-3xl mx-auto grid grid-cols-4 gap-6 sm:gap-10 opacity-0 translate-y-4">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-xl md:text-2xl text-white" style={{ fontWeight: 400 }}>{stat.value}</div>
                <div className="mt-0.5" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ABOUT — Big serif statement ═══════ */}
      <section
        className="animate-section pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden relative"
        style={{ background: 'radial-gradient(ellipse at top, rgba(0,255,186,0.04) 0%, transparent 70%), #0E0E0E' }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className="text-white/40 text-sm tracking-widest uppercase mb-8"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em' }}
          >
            About Us
          </div>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          >
            <span className="block">สร้าง <em className="italic text-white/60">ความเชี่ยวชาญ</em> ให้</span>
            <span className="block"><em className="italic text-white/60">ผู้คนที่พร้อมเปลี่ยนโลกด้วย AI</em></span>
          </h2>
        </div>
      </section>

      {/* ═══════ FEATURED COURSES — Liquid glass cards ═══════ */}
      {courses.length > 0 && (
      <section className="pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="animate-section flex items-end justify-between mb-12 md:mb-16">
            <h2
              className="text-3xl md:text-5xl text-white tracking-tight"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
            >
              คอร์สแนะนำ
            </h2>
            <div
              className="text-white/40 text-sm hidden md:block tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em' }}
            >
              Featured Courses
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {courses.map((course, i) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="course-card liquid-glass rounded-3xl overflow-hidden group transition-transform duration-300 hover:scale-[1.02]"
              >
                {/* Card image area */}
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105" style={{ background: 'rgba(0,255,186,0.03)' }}>
                    <BookOpen className="h-12 w-12 text-mint-400/20" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>

                {/* Card content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="text-white/40 text-xs tracking-widest uppercase"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em' }}
                    >
                      {course.level === 'beginner' ? 'เริ่มต้น' : course.level === 'intermediate' ? 'ปานกลาง' : 'ขั้นสูง'}
                    </span>
                    <div className="liquid-glass rounded-full p-2 text-white">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                  <h3
                    className="text-white text-xl md:text-2xl mb-3 tracking-tight group-hover:text-white/90 transition-colors"
                    style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
                  >
                    {course.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-2" style={{ fontWeight: 300 }}>
                    {course.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/courses"
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors inline-flex items-center gap-2"
            >
              ดูคอร์สทั้งหมด
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* ═══════ PHILOSOPHY — Big heading + 2-col ═══════ */}
      <section className="animate-section py-28 md:py-40 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          >
            <span>Intelligence <em className="italic text-white/40">x</em> Mastery</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left — featured card */}
            <div className="liquid-glass rounded-3xl p-6 md:p-8">
              <div
                className="text-white/50 text-xs tracking-widest uppercase mb-3"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em' }}
              >
                Our Approach
              </div>
              <p className="text-white text-sm md:text-base leading-relaxed" style={{ fontWeight: 300 }}>
                เราเชื่อว่าทุกคนสามารถ master AI ได้ ไม่ว่าจะเป็นผู้ประกอบการ ผู้บริหาร หรือคนทำงาน
                ระบบการเรียนรู้ของเราออกแบบมาเพื่อเปลี่ยนความอยากรู้ให้เป็นความเชี่ยวชาญ
              </p>
            </div>

            {/* Right — 2 blocks with divider */}
            <div className="flex flex-col">
              <div className="pb-10">
                <div
                  className="text-white/40 text-xs tracking-widest uppercase mb-4"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em' }}
                >
                  Precision
                </div>
                <p className="text-white/70 text-base md:text-lg leading-relaxed" style={{ fontWeight: 300 }}>
                  เนื้อหาทุกบทเรียนผ่านการออกแบบอย่างพิถีพิถัน ไม่มีสิ่งที่ไม่จำเป็น
                  เรียนรู้เฉพาะสิ่งที่นำไปใช้สร้างผลลัพธ์ได้จริง
                </p>
              </div>
              <div className="w-full h-px bg-white/10" />
              <div className="pt-10">
                <div
                  className="text-white/40 text-xs tracking-widest uppercase mb-4"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em' }}
                >
                  Scale
                </div>
                <p className="text-white/70 text-base md:text-lg leading-relaxed" style={{ fontWeight: 300 }}>
                  สร้างมาเพื่อรองรับ 100 ล้านผู้เรียน ไม่ใช่แค่ 100 คน
                  โครงสร้างพื้นฐานระดับ enterprise พร้อมประสบการณ์ที่เข้าถึงได้ทุกคน
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES — Service cards ═══════ */}
      <section
        className="py-28 md:py-40 px-6 overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 60%), #0E0E0E' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="animate-section flex items-end justify-between mb-12 md:mb-16">
            <h2
              className="text-3xl md:text-5xl text-white tracking-tight"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
            >
              ทำไมต้อง Antiparallel
            </h2>
            <div
              className="text-white/40 text-sm hidden md:block tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em' }}
            >
              Why Us
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { tag: 'Intelligence', icon: <Brain className="h-5 w-5" />, title: 'AI-Native Learning', desc: 'ระบบเรียนรู้ที่ปรับตัวตามผู้เรียน ใช้ AI ออกแบบเส้นทางที่เหมาะสมที่สุดสำหรับแต่ละคน' },
              { tag: 'Precision', icon: <Target className="h-5 w-5" />, title: 'เนื้อหาที่ใช้ได้จริง', desc: 'ไม่มีทฤษฎีที่ไม่จำเป็น Workshop และ Project ให้นำ AI ไปใช้ได้ทันที' },
              { tag: 'Scale', icon: <Users className="h-5 w-5" />, title: 'Built for 100M', desc: 'โครงสร้างพื้นฐานระดับ enterprise รองรับผู้เรียนจำนวนมหาศาล เข้าถึงได้จากทุกที่' },
              { tag: 'Humanity', icon: <Shield className="h-5 w-5" />, title: 'เทคโนโลยีเพื่อคน', desc: 'รับประกันความพอใจ 100% เพราะเราเชื่อว่าทุกคนสมควรได้เรียนรู้ AI อย่างมีคุณภาพ' },
            ].map((feature, i) => (
              <div key={i} className="feature-item liquid-glass rounded-3xl overflow-hidden group">
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <span
                      className="text-white/40 text-xs tracking-widest uppercase"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em' }}
                    >
                      {feature.tag}
                    </span>
                    <div className="liquid-glass rounded-full p-2.5 text-mint-400">
                      {feature.icon}
                    </div>
                  </div>
                  <h3
                    className="text-white text-xl md:text-2xl mb-3 tracking-tight"
                    style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS — Glass cards ═══════ */}
      <section className="py-28 md:py-40 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="animate-section flex items-end justify-between mb-12 md:mb-16">
            <h2
              className="text-3xl md:text-5xl text-white tracking-tight"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
            >
              เสียงจากผู้เรียน
            </h2>
            <div
              className="text-white/40 text-sm hidden md:block tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em' }}
            >
              Testimonials
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <article
                key={i}
                className="testimonial-card liquid-glass rounded-3xl p-6 md:p-8"
              >
                <div className="flex flex-col gap-6">
                  <p className="text-white/70 text-sm leading-relaxed flex-1" style={{ fontWeight: 300 }}>
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center text-mint-400 text-sm liquid-glass rounded-full"
                      style={{ fontWeight: 500 }}
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white text-sm" style={{ fontWeight: 400 }}>{testimonial.name}</div>
                      <div
                        className="text-white/40"
                        style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.05em' }}
                      >
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA — Final glass card ═══════ */}
      <section className="pb-20 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="animate-section liquid-glass rounded-3xl p-10 md:p-16 text-center">
            <h2
              className="text-3xl md:text-5xl text-white tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
            >
              พร้อมเริ่มเรียน <em className="italic text-white/60">AI</em> แล้วหรือยัง?
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-10 max-w-xl mx-auto" style={{ fontWeight: 300 }}>
              เริ่มต้นเส้นทาง AI วันนี้ เรียนรู้จากผู้เชี่ยวชาญ ลงมือทำจริง และนำไปใช้ได้ทันที
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="rounded-full px-8 py-3 text-sm font-medium transition-colors hover:opacity-90 inline-flex items-center justify-center gap-2"
                style={{ background: '#00FFBA', color: '#0E0E0E' }}
              >
                เริ่มเรียน AI เลย
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/exams"
                className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors inline-flex items-center justify-center"
              >
                ประเมินความพร้อมด้าน AI
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
