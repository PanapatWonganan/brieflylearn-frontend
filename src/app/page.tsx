'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const courses = [
    {
      id: 1,
      title: "Leadership",
      titleThai: "ภาวะผู้นำ",
      students: "3,250",
      duration: "12 สัปดาห์",
      gradient: "from-orange-400 to-orange-600"
    },
    {
      id: 2,
      title: "Mindfulness",
      titleThai: "สติและจิตใจ",
      students: "2,890",
      duration: "10 สัปดาห์",
      gradient: "from-orange-500 to-orange-700"
    },
    {
      id: 3,
      title: "Communication",
      titleThai: "การสื่อสาร",
      students: "2,150",
      duration: "8 สัปดาห์",
      gradient: "from-orange-600 to-orange-800"
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section - Ultra Luxury */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">

        {/* Premium Background Gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50/30 to-white"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-orange-500/10 via-orange-500/5 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-orange-400/10 via-transparent to-transparent blur-3xl"></div>
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                             linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="text-center space-y-16">

            {/* Premium Badge with Glow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative inline-flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-full border border-orange-100/50 shadow-lg">
                  <Sparkles className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-gray-700 font-medium tracking-wide">15,000+ learners worldwide</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Title - Premium Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-8"
            >
              <h1 className="text-7xl sm:text-8xl lg:text-9xl xl:text-[12rem] font-bold tracking-tighter leading-[0.9]">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="block bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
                >
                  Become
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="block bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
                >
                  Your Best
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent"
                  style={{
                    backgroundSize: '200% auto',
                  }}
                >
                  Self
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-2xl sm:text-3xl lg:text-4xl text-gray-400 font-light tracking-wide max-w-4xl mx-auto"
              >
                Transform your potential into excellence
              </motion.p>
            </motion.div>

            {/* Premium CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
            >
              <Link href="/courses">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-10 py-5 bg-gradient-to-r from-gray-900 to-black text-white rounded-full text-lg font-medium overflow-hidden shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center tracking-wide">
                    Start Learning
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>

              <Link href="/courses">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-10 py-5 text-gray-600 rounded-full text-lg font-medium hover:text-gray-900 transition-all flex items-center tracking-wide border border-gray-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                >
                  Explore Courses
                  <Play className="ml-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Premium Stats with Dividers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="pt-20 flex flex-wrap items-center justify-center gap-16"
            >
              {[
                { value: "4.9", label: "Rating", icon: Star },
                { value: "50+", label: "Courses" },
                { value: "15k+", label: "Students" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  className="text-center group cursor-default"
                >
                  <div className="relative">
                    {stat.icon && <stat.icon className="h-4 w-4 text-orange-500 mx-auto mb-2" />}
                    <div className="text-5xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-500">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500 mt-2 tracking-widest uppercase">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Elegant Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
        >
          <div className="relative w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-white/30">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-gradient-to-b from-gray-400 to-gray-300 rounded-full"
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* Premium Featured Courses */}
      <section className="relative py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50/50 to-white">

        <div className="max-w-7xl mx-auto">

          {/* Section Header - Luxury */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24 space-y-6"
          >
            <div className="inline-block px-6 py-2 bg-orange-50 rounded-full border border-orange-100">
              <span className="text-sm text-orange-900 font-medium tracking-wide">FEATURED COURSES</span>
            </div>
            <h2 className="text-6xl sm:text-7xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Popular Paths
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto tracking-wide">
              Choose your journey to excellence
            </p>
          </motion.div>

          {/* Luxury Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <Link href={`/courses/${course.id}`}>
                  <div className="group relative h-[480px] bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-200 transition-all duration-700 shadow-lg hover:shadow-2xl">

                    {/* Card Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-600/0 group-hover:from-orange-500/5 group-hover:to-orange-600/10 transition-all duration-700"></div>

                    {/* Content Container */}
                    <div className="relative h-full flex flex-col p-10">

                      {/* Index Number - Large & Elegant */}
                      <div className="mb-8">
                        <motion.div
                          className="text-8xl font-bold tracking-tighter bg-gradient-to-br from-gray-100 to-gray-200 bg-clip-text text-transparent group-hover:from-orange-100 group-hover:to-orange-200 transition-all duration-700"
                        >
                          0{index + 1}
                        </motion.div>
                      </div>

                      {/* Course Info */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-500 tracking-tight mb-2">
                            {course.title}
                          </h3>
                          <p className="text-base text-gray-500 tracking-wide">
                            {course.titleThai}
                          </p>
                        </div>

                        {/* Separator Line */}
                        <div className="w-12 h-0.5 bg-gradient-to-r from-gray-200 to-transparent group-hover:from-orange-500 group-hover:to-transparent transition-all duration-500"></div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
                          <span className="tracking-wide">{course.students} students</span>
                          <span className="tracking-wide">{course.duration}</span>
                        </div>
                      </div>

                      {/* Learn More Link */}
                      <div className="flex items-center text-orange-500 group-hover:text-orange-600 transition-colors pt-6 border-t border-gray-100 group-hover:border-orange-200">
                        <span className="text-sm font-medium tracking-wide">Learn More</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
                      </div>
                    </div>

                    {/* Bottom Gradient Accent */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${course.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Button - Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-20"
          >
            <Link href="/courses">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-gradient-to-r from-gray-900 to-black text-white rounded-full text-lg font-medium hover:shadow-2xl transition-all duration-500 tracking-wide"
              >
                View All Courses
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us - Premium Split */}
      <section className="relative py-40 px-4 sm:px-6 lg:px-8 overflow-hidden">

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50/20 to-white"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-10"
            >
              <div className="inline-block px-6 py-2 bg-orange-50 rounded-full border border-orange-100">
                <span className="text-sm text-orange-900 font-medium tracking-wide">WHY CHOOSE US</span>
              </div>

              <h2 className="text-6xl font-bold tracking-tight leading-tight">
                <span className="block bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">Learn from</span>
                <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mt-2">the Experts</span>
              </h2>

              <p className="text-xl text-gray-500 leading-relaxed tracking-wide">
                Over 10 years of experience developing more than 15,000 learners
                with meticulously designed curricula
              </p>

              {/* Premium Benefits List */}
              <div className="space-y-6 pt-6">
                {[
                  'Comprehensive curriculum for every skill',
                  'Learn anywhere, anytime',
                  '100% satisfaction guarantee',
                  'Certificate upon course completion'
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-4 group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      <CheckCircle className="h-4 w-4 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-gray-700 text-lg tracking-wide">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6">
                <Link href="/courses">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-5 bg-gradient-to-r from-gray-900 to-black text-white rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-500 tracking-wide"
                  >
                    Start Free 7-Day Trial
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right: Premium Visual Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative aspect-square bg-gradient-to-br from-orange-50 via-white to-orange-50 rounded-[3rem] p-16 flex items-center justify-center border border-orange-100 shadow-2xl overflow-hidden">

                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-orange-300/20 rounded-full blur-3xl"></div>

                {/* Content */}
                <div className="relative text-center space-y-8 z-10">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl shadow-2xl"
                  >
                    <Sparkles className="h-12 w-12 text-white" strokeWidth={1.5} />
                  </motion.div>

                  <div>
                    <div className="text-7xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                      4.9
                    </div>
                    <div className="text-xl text-gray-600 tracking-wide">Satisfaction Rating</div>
                  </div>

                  <div className="text-sm text-gray-500 tracking-widest uppercase">
                    From 15,000+ Reviews
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}></div>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-block"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mx-auto flex items-center justify-center shadow-2xl">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
            </motion.div>

            <h2 className="text-6xl sm:text-7xl font-bold tracking-tight text-white leading-tight">
              Ready to Start?
            </h2>

            <p className="text-2xl text-gray-400 max-w-3xl mx-auto tracking-wide leading-relaxed">
              Begin your self-development journey today with courses designed for you
            </p>

            <div className="pt-8">
              <Link href="/courses">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-14 py-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-xl font-medium shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 inline-flex items-center tracking-wide overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started Now
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
