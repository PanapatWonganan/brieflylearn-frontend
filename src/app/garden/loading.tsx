'use client'

import React from 'react'
import { motion } from 'framer-motion'

const GardenLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Garden Icon */}
        <motion.div
          className="text-8xl mb-8"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🌱
        </motion.div>

        {/* Loading Text */}
        <motion.h2 
          className="text-2xl font-bold text-green-700 mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          กำลังโหลดสวนสุขภาพ...
        </motion.h2>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-green-500 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>

        <p className="text-gray-600 mt-4 text-sm">
          กำลังเตรียมพืชและข้อมูลสวนของคุณ
        </p>
      </div>
    </div>
  )
}

export default GardenLoading