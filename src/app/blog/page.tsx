'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, User, ArrowRight, Heart, Star, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const blogCategories = [
  { id: 'all', name: 'ทั้งหมด', count: 24 },
  { id: 'pregnancy', name: 'ตั้งครรภ์', count: 8 },
  { id: 'postpartum', name: 'หลังคลอด', count: 6 },
  { id: 'nutrition', name: 'โภชนาการ', count: 5 },
  { id: 'exercise', name: 'การออกกำลังกาย', count: 3 },
  { id: 'mental-health', name: 'สุขภาพจิต', count: 2 }
]

const blogPosts = [
  {
    id: 1,
    title: '10 ท่าโยคะที่ปลอดภัยสำหรับคุณแม่ตั้งครรภ์',
    excerpt: 'การออกกำลังกายขณะตั้งครรภ์เป็นสิ่งสำคัญ ลองมาดูท่าโยคะที่ปลอดภัยและมีประโยชน์กันค่ะ',
    category: 'pregnancy',
    author: 'ครูแนน',
    publishDate: '2024-01-15',
    readTime: '8 นาที',
    image: '/blog/yoga-pregnancy.jpg',
    featured: true,
    tags: ['โยคะ', 'ตั้งครรภ์', 'ออกกำลังกาย']
  },
  {
    id: 2,
    title: 'อาหารบำรุงน้ำนมแม่ที่ควรทานหลังคลอด',
    excerpt: 'การเลือกอาหารที่เหมาะสมหลังคลอดช่วยเพิ่มปริมาณและคุณภาพน้ำนมแม่ได้อย่างมีประสิทธิภาพ',
    category: 'nutrition',
    author: 'ครูมิ้นต์',
    publishDate: '2024-01-12',
    readTime: '6 นาที',
    image: '/blog/breastfeeding-nutrition.jpg',
    featured: false,
    tags: ['โภชนาการ', 'หลังคลอด', 'น้ำนมแม่']
  },
  {
    id: 3,
    title: 'วิธีจัดการกับ Baby Blues อย่างมีประสิทธิภาพ',
    excerpt: 'ความรู้สึกหลังคลอดที่แม่ๆ หลายคนประสบ และวิธีการดูแลตัวเองในช่วงเวลานี้',
    category: 'mental-health',
    author: 'ครูปิ๊ก',
    publishDate: '2024-01-10',
    readTime: '10 นาที',
    image: '/blog/baby-blues.jpg',
    featured: false,
    tags: ['สุขภาพจิต', 'หลังคลอด', 'การดูแลตัวเอง']
  },
  {
    id: 4,
    title: 'การออกกำลังกายเพื่อลดน้ำหนักหลังคลอดอย่างปลอดภัย',
    excerpt: 'เทคนิคและแนวทางการออกกำลังกายที่เหมาะสมสำหรับแม่หลังคลอดเพื่อฟื้นฟูร่างกาย',
    category: 'exercise',
    author: 'ครูเอิร์ท',
    publishDate: '2024-01-08',
    readTime: '12 นาที',
    image: '/blog/postpartum-exercise.jpg',
    featured: true,
    tags: ['การออกกำลังกาย', 'หลังคลอด', 'ลดน้ำหนัก']
  },
  {
    id: 5,
    title: 'อาหารเสริมที่จำเป็นสำหรับคุณแม่ตั้งครรภ์',
    excerpt: 'วิตามินและแร่ธาตุที่สำคัญในระหว่างตั้งครรภ์ และวิธีการเลือกอาหารเสริมที่เหมาะสม',
    category: 'nutrition',
    author: 'ครูมิ้นต์',
    publishDate: '2024-01-05',
    readTime: '7 นาที',
    image: '/blog/pregnancy-supplements.jpg',
    featured: false,
    tags: ['โภชนาการ', 'ตั้งครรภ์', 'อาหารเสริม']
  },
  {
    id: 6,
    title: 'สร้างสมดุลระหว่างการเป็นแม่และการดูแลตัวเอง',
    excerpt: 'เทคนิคการจัดการเวลาและพลังงานเพื่อให้แม่ๆ สามารถดูแลลูกและตัวเองได้อย่างสมดุล',
    category: 'mental-health',
    author: 'ครูปิ๊ก',
    publishDate: '2024-01-03',
    readTime: '9 นาที',
    image: '/blog/work-life-balance.jpg',
    featured: false,
    tags: ['สุขภาพจิต', 'การดูแลตัวเอง', 'ความสมดุล']
  }
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory)

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              บล็อกสุขภาพ
            </h1>
            <p className="text-xl text-gray-600">
              ความรู้และเทคนิคดูแลสุขภาพสำหรับผู้หญิงทุกช่วงวัย
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Posts */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-800 mb-8"
          >
            บทความแนะนำ
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="h-48 bg-gradient-to-r from-orange-400 to-purple-500 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                      แนะนำ
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
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
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-orange-600 hover:text-orange-700 font-medium flex items-center space-x-1"
                    >
                      <span>อ่านต่อ</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">หมวดหมู่</h3>
            <div className="flex flex-wrap gap-3">
              {blogCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* All Posts */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-gray-800 mb-8"
          >
            {activeCategory === 'all' ? 'บทความทั้งหมด' : `บทความ ${blogCategories.find(cat => cat.id === activeCategory)?.name}`}
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="h-32 bg-gradient-to-r from-orange-400 to-purple-500 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 1).map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center space-x-1"
                    >
                      <span>อ่าน</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                ไม่พบบทความในหมวดหมู่นี้
              </p>
            </motion.div>
          )}
        </section>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-orange-500 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              ไม่พลาดบทความใหม่
            </h3>
            <p className="text-lg mb-6 opacity-90">
              สมัครรับข่าวสารและบทความใหม่ๆ ส่งตรงถึงอีเมลของคุณ
            </p>
            <div className="max-w-md mx-auto flex space-x-3">
              <input
                type="email"
                placeholder="อีเมลของคุณ"
                className="flex-1 px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                สมัคร
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}