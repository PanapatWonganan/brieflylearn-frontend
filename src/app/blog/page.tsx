'use client'

import { Calendar, Clock, User, ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const blogCategories = [
  { id: 'all', name: 'ทั้งหมด', count: 18 },
  { id: 'ai-business', name: 'AI สร้างธุรกิจ', count: 6 },
  { id: 'ai-org', name: 'AI ในองค์กร', count: 5 },
  { id: 'prompt', name: 'Prompt & Tools', count: 4 },
  { id: 'ai-trends', name: 'AI Trends', count: 3 }
]

const blogPosts = [
  {
    id: 1,
    title: 'เริ่มต้นธุรกิจด้วย AI — คู่มือฉบับ Step-by-Step',
    excerpt: 'จากไอเดียสู่รายได้จริง วิธีใช้ AI สร้าง Content, ทำ Marketing Automation และ Scale ธุรกิจออนไลน์โดยไม่ต้องจ้างทีมใหญ่',
    category: 'ai-business',
    author: 'ดร.ณัฐพล วิสุทธิ์',
    publishDate: '2026-02-15',
    readTime: '10 นาที',
    image: '/blog/ai-business-start.jpg',
    featured: true,
    tags: ['AI สร้างธุรกิจ', 'Automation', 'ธุรกิจออนไลน์']
  },
  {
    id: 2,
    title: 'Prompt Engineering 101 — เขียน Prompt ให้ได้ผลลัพธ์ดีกว่า 10 เท่า',
    excerpt: 'เทคนิคการเขียน Prompt ตั้งแต่ขั้นพื้นฐานจนถึงขั้นสูง ครอบคลุม Chain of Thought, Few-Shot Learning และ System Prompting',
    category: 'prompt',
    author: 'วิศวกร AI Team',
    publishDate: '2026-02-10',
    readTime: '12 นาที',
    image: '/blog/prompt-engineering.jpg',
    featured: false,
    tags: ['Prompt', 'ChatGPT', 'Claude']
  },
  {
    id: 3,
    title: 'ผู้บริหารต้องรู้อะไรเกี่ยวกับ AI ในปี 2026',
    excerpt: 'สรุปสิ่งที่ผู้บริหารต้องเข้าใจเกี่ยวกับ AI Strategy, Data Governance และ Change Management เพื่อนำองค์กรสู่ยุค AI อย่างมั่นใจ',
    category: 'ai-org',
    author: 'รศ.ดร.วรพจน์ อมรเลิศ',
    publishDate: '2026-02-05',
    readTime: '8 นาที',
    image: '/blog/ai-executive.jpg',
    featured: true,
    tags: ['AI Strategy', 'ผู้บริหาร', 'องค์กร']
  },
  {
    id: 4,
    title: '5 AI Tools ที่เจ้าของธุรกิจต้องใช้ในปี 2026',
    excerpt: 'รวม AI Tools ที่ช่วยลดต้นทุน เพิ่มรายได้ และทำงานเร็วขึ้น ตั้งแต่ Content Creation, Design ไปจนถึง Customer Service',
    category: 'ai-business',
    author: 'ธนวัฒน์ เศรษฐกุล',
    publishDate: '2026-01-28',
    readTime: '7 นาที',
    image: '/blog/ai-tools-business.jpg',
    featured: false,
    tags: ['AI Tools', 'ธุรกิจ', 'Productivity']
  },
  {
    id: 5,
    title: 'AI จะมาแทนที่งานของคุณจริงหรือ? — มุมมองที่สมดุล',
    excerpt: 'วิเคราะห์ผลกระทบของ AI ต่อตลาดแรงงานไทย งานไหนจะเปลี่ยน งานไหนจะหายไป และทักษะอะไรที่ต้องเรียนรู้เพื่อรับมือ',
    category: 'ai-trends',
    author: 'ดร.ณัฐพล วิสุทธิ์',
    publishDate: '2026-01-20',
    readTime: '9 นาที',
    image: '/blog/ai-future-work.jpg',
    featured: false,
    tags: ['AI Trends', 'อนาคต', 'ตลาดแรงงาน']
  },
  {
    id: 6,
    title: 'สร้าง AI Workflow ให้องค์กรด้วย Make + ChatGPT',
    excerpt: 'Workshop ฉบับย่อ วิธีสร้าง Automated Workflow ที่เชื่อมต่อ AI เข้ากับระบบที่มีอยู่ ลดงานซ้ำซ้อนและเพิ่ม Productivity ทั้งทีม',
    category: 'ai-org',
    author: 'พญ.ชนิกา ศรีวัฒนา',
    publishDate: '2026-01-15',
    readTime: '11 นาที',
    image: '/blog/ai-workflow.jpg',
    featured: false,
    tags: ['Automation', 'No-Code', 'องค์กร']
  }
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredPosts = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory)

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-ink-muted mb-4">
              บทความ
            </p>
            <h1 className="text-4xl font-bold font-serif text-ink mb-4">
              บทความ AI & ธุรกิจ
            </h1>
            <p className="text-lg text-ink-light max-w-2xl mx-auto">
              แนวคิด เทคนิค และเทรนด์ AI ล่าสุด เพื่อสร้างธุรกิจและบริหารองค์กรอย่างชาญฉลาด
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        {/* Category Filter */}
        <section className="mb-16">
          <div className="flex flex-wrap gap-3">
            {blogCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-ink text-white'
                    : 'border border-gray-200 text-ink-light hover:border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Posts */}
        {activeCategory === 'all' && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-ink mb-8">
              บทความแนะนำ
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white border border-gray-100/60 shadow-card rounded-xl overflow-hidden hover:shadow-lifted transition-colors group"
                >
                  <div className="h-48 bg-gray-50 relative flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-gray-300" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-ink-muted mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.publishDate).toLocaleDateString('th-TH')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-ink mb-3 group-hover:text-brand-600 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-ink-light mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-50 text-ink-muted px-3 py-1 rounded-full text-xs border border-gray-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/blog/${post.id}`}
                        className="text-brand-600 hover:text-brand-700 font-medium flex items-center space-x-1"
                      >
                        <span>อ่านต่อ</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-8">
            {activeCategory === 'all' ? 'บทความทั้งหมด' : `บทความ${blogCategories.find(cat => cat.id === activeCategory)?.name}`}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-gray-100/60 shadow-card rounded-xl overflow-hidden hover:shadow-lifted transition-colors group"
              >
                <div className="h-40 bg-gray-50 relative flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-gray-300" />
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 text-xs text-ink-muted mb-3">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-ink mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-ink-light mb-4 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 1).map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-50 text-ink-muted px-2 py-1 rounded-full text-xs border border-gray-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.id}`}
                      className="text-brand-600 hover:text-brand-700 font-medium text-sm flex items-center space-x-1"
                    >
                      <span>อ่าน</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-ink-muted text-lg">
                ไม่พบบทความในหมวดหมู่นี้
              </p>
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <div className="bg-white border border-gray-100/60 shadow-card rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold font-serif text-ink mb-4">
              รับบทความใหม่ทุกสัปดาห์
            </h3>
            <p className="text-lg text-ink-light mb-6">
              สมัครรับบทความและอัปเดต AI ใหม่ล่าสุดส่งตรงถึงอีเมลของคุณ
            </p>
            <div className="max-w-md mx-auto flex space-x-3">
              <input
                type="email"
                placeholder="อีเมลของคุณ"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-ink focus:outline-none focus:border-brand-500"
              />
              <button className="bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors">
                สมัคร
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
