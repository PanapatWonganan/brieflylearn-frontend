'use client';

import React, { useEffect, useRef, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fetchCourses, Course } from '@/lib/api';

const HeroScene = dynamic(() => import('@/components/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 rounded-full border border-gray-100 animate-pulse" />
    </div>
  ),
});

gsap.registerPlugin(ScrollTrigger);

/* ── tiny helper: split text into words wrapped in overflow-hidden spans ── */
function SplitText({ children, className = '' }: { children: string; className?: string }) {
  return (
    <>
      {children.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className={`inline-block word-inner ${className}`}>
            {word}&nbsp;
          </span>
        </span>
      ))}
    </>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const coursesRef = useRef<HTMLElement>(null);
  const philosophyRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const [courses, setCourses] = useState<Course[]>([]);

  /* ── Fetch real courses from API ── */
  useEffect(() => {
    fetchCourses().then((res) => {
      if (res.data) {
        // Show first 3 courses as featured
        const list = Array.isArray(res.data) ? res.data : [];
        setCourses(list.slice(0, 3));
      }
    });
  }, []);

  /* ── GSAP Animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero: staggered word reveal */
      gsap.to('.hero-word .word-inner', {
        y: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.3,
      });

      gsap.to('.hero-sub', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1,
        ease: 'power2.out',
      });

      gsap.to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1.2,
        ease: 'power2.out',
      });

      /* Courses: each card slides in */
      gsap.utils.toArray<HTMLElement>('.course-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power2.out',
        });
      });

      /* Philosophy section: text reveal on scroll */
      gsap.utils.toArray<HTMLElement>('.reveal-line').forEach((line) => {
        gsap.from(line, {
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
        });
      });

      /* CTA section */
      gsap.from('.cta-content', {
        scrollTrigger: {
          trigger: '.cta-content',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white">

      {/* ═══════ HERO ═══════ */}
      <section ref={heroRef} className="min-h-[90vh] px-5 sm:px-8 max-w-6xl mx-auto pt-24 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[70vh]">
          {/* Left — text content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-display hero-word leading-[1.05]">
              <SplitText>เรียนรู้ AI</SplitText>
              <br />
              <SplitText>สร้างธุรกิจ</SplitText>
              <br />
              <span className="text-brand-600">
                <SplitText>บริหารองค์กร</SplitText>
              </span>
            </h1>

            <p className="hero-sub mt-8 max-w-xl text-lg text-ink-muted font-light leading-relaxed opacity-0 translate-y-4">
              แพลตฟอร์มเรียน AI ออนไลน์สำหรับคนที่อยากนำ AI ไปใช้จริง
              ทั้งสร้างธุรกิจส่วนตัวและบริหารองค์กรให้ก้าวหน้า
            </p>

            <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 opacity-0 translate-y-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-white text-sm font-medium rounded-lg hover:bg-ink-light transition-colors"
              >
                เริ่มเรียน AI
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/exams"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm text-ink-light font-medium border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
              >
                ประเมินความพร้อมด้าน AI
              </Link>
            </div>

            {/* minimal stats */}
            <div className="hero-cta mt-16 flex items-center gap-8 text-sm text-ink-muted opacity-0 translate-y-4">
              <span><strong className="text-ink font-semibold">3,200+</strong> ผู้เรียน</span>
              <span className="w-px h-4 bg-gray-200" />
              <span><strong className="text-ink font-semibold">15+</strong> คอร์ส AI</span>
              <span className="w-px h-4 bg-gray-200" />
              <span><strong className="text-ink font-semibold">4.7</strong> คะแนนรีวิว</span>
            </div>
          </div>

          {/* Right — 3D scene */}
          <div className="hidden lg:block h-[500px] xl:h-[560px]">
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURED COURSES ═══════ */}
      <section ref={coursesRef} className="px-5 sm:px-8 max-w-6xl mx-auto py-28 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-20">
          <div>
            <p className="text-xs tracking-widest uppercase text-ink-muted mb-3">คอร์สแนะนำ</p>
            <h2 className="text-heading text-ink">เส้นทางที่ได้รับความนิยม</h2>
          </div>
          <Link
            href="/courses"
            className="text-sm text-ink-light hover:text-ink flex items-center gap-1.5 transition-colors group"
          >
            ดูทั้งหมด
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <article className="course-card group p-8 border border-gray-100/60 shadow-card rounded-lg hover:opacity-90 transition-all duration-500 h-full flex flex-col">
                <span className="text-xs text-ink-faint font-mono tracking-wider">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-ink tracking-tight group-hover:text-brand-600 transition-colors duration-300">
                  {course.title}
                </h3>
                <p className="text-sm text-ink-muted mt-1 capitalize">{course.level}</p>

                <p className="mt-4 text-sm text-ink-light leading-relaxed flex-1 line-clamp-3">
                  {course.description}
                </p>

                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-ink-muted">
                    {course.lessons_count > 0 ? `${course.lessons_count} บทเรียน` : 'เร็วๆ นี้'}
                  </span>
                  <span className="text-sm text-ink-light group-hover:text-brand-600 flex items-center gap-1 transition-colors">
                    เรียนรู้เพิ่มเติม
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════ PHILOSOPHY / WHY US ═══════ */}
      <section ref={philosophyRef} className="px-5 sm:px-8 max-w-6xl mx-auto py-28 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left — big statement */}
          <div className="lg:col-span-3 space-y-8">
            <p className="text-xs tracking-widest uppercase text-ink-muted reveal-line">แนวทางของเรา</p>
            <h2 className="text-heading text-ink leading-snug reveal-line">
              เรียน AI ไม่ใช่แค่รู้ทฤษฎี แต่ต้องนำไปใช้สร้างผลลัพธ์ได้จริง
            </h2>
            <p className="text-base text-ink-light leading-relaxed reveal-line">
              ทุกคอร์สออกแบบมาให้ลงมือทำ ไม่ใช่แค่ดูวิดีโอ
              เลือกเส้นทาง Entrepreneur สร้างธุรกิจด้วย AI หรือ Leader นำ AI เข้าองค์กร
              จากผู้เชี่ยวชาญที่นำ AI ไปใช้จริงมาแล้ว
            </p>
            <div className="pt-4 reveal-line">
              <Link
                href="/exams"
                className="inline-flex items-center gap-2 text-sm text-ink font-medium border-b border-ink pb-1 hover:text-brand-600 hover:border-brand-600 transition-colors"
              >
                ทำแบบประเมิน AI Readiness ฟรี
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right — key points as short list */}
          <div className="lg:col-span-2 space-y-8 lg:pt-12">
            {[
              { label: '2 เส้นทาง AI', desc: 'เลือก Entrepreneur สร้างธุรกิจ หรือ Leader บริหารองค์กรด้วย AI' },
              { label: 'อัปเดต AI ล่าสุด', desc: 'เนื้อหาอัปเดตตาม AI Tools ใหม่ ทั้ง ChatGPT, Claude, Midjourney' },
              { label: 'ลงมือทำจริง', desc: 'Workshop และ Project ให้นำ AI ไปใช้ได้ทันที' },
              { label: 'รับประกันความพอใจ', desc: 'ไม่พอใจ คืนเงิน 100% ภายใน 30 วัน' },
            ].map((item, i) => (
              <div key={i} className="reveal-line">
                <h4 className="text-sm font-semibold text-ink">{item.label}</h4>
                <p className="text-sm text-ink-muted mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section ref={ctaRef} className="px-5 sm:px-8 max-w-6xl mx-auto py-32 border-t border-gray-100">
        <div className="cta-content text-center max-w-2xl mx-auto">
          <h2 className="text-heading text-ink">
            พร้อมเริ่มเรียน AI แล้วหรือยัง?
          </h2>
          <p className="mt-4 text-base text-ink-muted leading-relaxed">
            เริ่มต้นเส้นทาง AI วันนี้ ไม่ว่าจะสร้างธุรกิจหรือบริหารองค์กร
          </p>
          <div className="mt-8">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-white text-sm font-medium rounded-lg hover:bg-ink-light transition-colors"
            >
              เริ่มเรียน AI เลย
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
