'use client'

import { Calendar, Clock, User, ArrowRight, BookOpen, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { fetchBlogPosts, BlogPost } from '@/lib/api/blog'
import { PageSkeleton } from '@/components/Skeleton'

const blogCategories = [
  { id: 'all', name: 'ทั้งหมด', count: 0 },
  { id: 'ai-business', name: 'AI สร้างธุรกิจ', count: 0 },
  { id: 'ai-org', name: 'AI ในองค์กร', count: 0 },
  { id: 'prompt', name: 'Prompt & Tools', count: 0 },
  { id: 'ai-trends', name: 'AI Trends', count: 0 }
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPosts()
  }, [activeCategory])

  const loadPosts = async () => {
    setLoading(true)
    setError(null)

    const result = await fetchBlogPosts({
      category: activeCategory !== 'all' ? activeCategory : undefined
    })

    if (result.error) {
      setError(result.error)
      setPosts([])
    } else if (result.data) {
      setPosts(result.data)
    }

    setLoading(false)
  }

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(post => post.category === activeCategory)

  const featuredPosts = posts.filter(post => post.featured)

  // Update category counts
  const categoriesWithCounts = blogCategories.map(cat => ({
    ...cat,
    count: cat.id === 'all' ? posts.length : posts.filter(p => p.category === cat.id).length
  }))

  if (loading) {
    return <PageSkeleton cards={6} />
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-800/40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">
              บทความ
            </p>
            <h1 className="text-4xl font-bold font-serif text-gray-200 mb-4">
              บทความ AI & ธุรกิจ
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              แนวคิด เทคนิค และเทรนด์ AI ล่าสุด เพื่อสร้างธุรกิจและบริหารองค์กรอย่างชาญฉลาด
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        {/* Category Filter */}
        <section className="mb-16">
          <div className="flex flex-wrap gap-3">
            {categoriesWithCounts.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-mint-600 text-white'
                    : 'border border-gray-700 text-gray-400 hover:border-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-400 rounded-sm p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-red-400 font-medium mb-1">เกิดข้อผิดพลาด</h3>
                <p className="text-red-400 text-sm mb-3">{error}</p>
                <button
                  onClick={loadPosts}
                  className="text-sm text-red-400 hover:text-red-300 font-medium underline"
                >
                  ลองใหม่อีกครั้ง
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Featured Posts */}
        {!error && activeCategory === 'all' && featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-200 mb-8">
              บทความแนะนำ
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-gray-900 border border-gray-700/40 shadow-card rounded-sm overflow-hidden hover:shadow-lifted transition-colors group"
                >
                  <div className="h-48 bg-gray-800/50 relative flex items-center justify-center">
                    {post.cover_image_url ? (
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BookOpen className="h-16 w-16 text-gray-600" />
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author_name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.published_at).toLocaleDateString('th-TH')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.read_time_minutes || 5} นาที</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-200 mb-3 group-hover:text-mint-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-800/50 text-gray-500 px-3 py-1 rounded-sm text-xs border border-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-mint-400 hover:text-mint-300 font-medium flex items-center space-x-1"
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
        {!error && (
          <section>
            <h2 className="text-2xl font-bold text-gray-200 mb-8">
              {activeCategory === 'all' ? 'บทความทั้งหมด' : `บทความ${categoriesWithCounts.find(cat => cat.id === activeCategory)?.name}`}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-gray-900 border border-gray-700/40 shadow-card rounded-sm overflow-hidden hover:shadow-lifted transition-colors group"
                >
                  <div className="h-40 bg-gray-800/50 relative flex items-center justify-center">
                    {post.cover_image_url ? (
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BookOpen className="h-12 w-12 text-gray-600" />
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author_name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.read_time_minutes || 5} นาที</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-200 mb-2 group-hover:text-mint-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 mb-4 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 1).map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-800/50 text-gray-500 px-2 py-1 rounded-sm text-xs border border-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-mint-400 hover:text-mint-300 font-medium text-sm flex items-center space-x-1"
                      >
                        <span>อ่าน</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && !loading && (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  ไม่พบบทความในหมวดหมู่นี้
                </p>
              </div>
            )}
          </section>
        )}

        {/* Newsletter Signup */}
        {!error && (
          <div className="mt-16">
            <div className="bg-gray-900 border border-gray-700/40 shadow-card rounded-sm p-8 text-center">
              <h3 className="text-2xl font-bold font-serif text-gray-200 mb-4">
                รับบทความใหม่ทุกสัปดาห์
              </h3>
              <p className="text-lg text-gray-400 mb-6">
                สมัครรับบทความและอัปเดต AI ใหม่ล่าสุดส่งตรงถึงอีเมลของคุณ
              </p>
              <div className="max-w-md mx-auto flex space-x-3">
                <input
                  type="email"
                  placeholder="อีเมลของคุณ"
                  className="flex-1 px-4 py-3 rounded-sm bg-gray-900/50 border border-gray-700 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-mint-500"
                />
                <button className="bg-mint-600 text-white px-6 py-3 rounded-sm font-medium hover:bg-mint-500 transition-colors">
                  สมัคร
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
