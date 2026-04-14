'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Sparkles, Target, ArrowRight,
  Share2, Download, BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface CompletionData {
  lessonTitle: string;
  pointsEarned: number;
  timeSpent: string;
  badgesEarned: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
  }>;
  milestoneProgress: {
    current: number;
    total: number;
    nextMilestone: string;
  };
  wellnessScore: {
    previous: number;
    current: number;
    increase: number;
  };
  streakInfo: {
    currentStreak: number;
    isNewRecord: boolean;
    previousRecord?: number;
  };
  nextRecommendation: {
    type: 'lesson' | 'rest' | 'assessment';
    title: string;
    description: string;
    link: string;
  };
}

const completionData: CompletionData = {
  lessonTitle: "การเตรียมความพร้อมสำหรับคุณแม่ตั้งครรภ์",
  pointsEarned: 50,
  timeSpent: "15:30",
  badgesEarned: [
    {
      id: "first_lesson",
      name: "First Step Warrior",
      description: "เริ่มต้นการเดินทางสู่สุขภาพ",
      icon: "🌱",
      rarity: "common"
    },
    {
      id: "prenatal_beginner", 
      name: "Prenatal Champion",
      description: "จบบทเรียน Prenatal แรก",
      icon: "🤰",
      rarity: "rare"
    }
  ],
  milestoneProgress: {
    current: 1,
    total: 12,
    nextMilestone: "Complete 3 Lessons"
  },
  wellnessScore: {
    previous: 45,
    current: 55,
    increase: 10
  },
  streakInfo: {
    currentStreak: 3,
    isNewRecord: true,
    previousRecord: 2
  },
  nextRecommendation: {
    type: "rest",
    title: "พักผ่อน 24 ชั่วโมง",
    description: "ให้ร่างกายฟื้นฟูก่อนบทเรียนต่อไป",
    link: "/dashboard"
  }
};

export default function LessonCompletePage() {
  const params = useParams();
  const courseId = parseInt(params.id as string);
  
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Trigger celebration animation
    setShowCelebration(true);

    // Step through completion sequence
    const stepTimers = [
      setTimeout(() => setCurrentStep(1), 1000),  // Show points
      setTimeout(() => setCurrentStep(2), 2000),  // Show badges
      setTimeout(() => setCurrentStep(3), 3000),  // Show progress
      setTimeout(() => setCurrentStep(4), 4000),  // Show next steps
      setTimeout(() => setAnimationComplete(true), 5000)
    ];

    return () => stepTimers.forEach(clearTimeout);
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-800/500';
      case 'rare': return 'bg-mint-500';
      case 'epic': return 'bg-mint-700';
      case 'legendary': return 'bg-gray-800/500';
      default: return 'bg-gray-800/500';
    }
  };

  const shareAchievement = () => {
    const text = `🎉 เพิ่งจบบทเรียน "${completionData.lessonTitle}" ใน BoostMe! ได้ ${completionData.pointsEarned} คะแนน และ ${completionData.badgesEarned.length} badges ใหม่! 💕 #BoostMe #HealthyMom`;
    
    if (navigator.share) {
      navigator.share({
        title: 'BoostMe Achievement',
        text: text,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('คัดลอกข้อความแล้ว!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-mint-700 rounded-full opacity-20" />
        <div className="absolute top-32 right-20 w-16 h-16 bg-gray-700 rounded-full opacity-30" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-mint-700 rounded-full opacity-25" />
        <div className="absolute bottom-40 right-40 w-12 h-12 bg-mint-600 rounded-full opacity-20" />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/courses/${courseId}`}
              className="text-gray-400 hover:text-mint-400 transition-colors"
            >
              ← กลับไปคอร์ส
            </Link>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-100">บทเรียนสำเร็จ! 🎉</h1>
            </div>
            <div></div>
          </div>
        </div>
      </div>

      {/* Main Celebration Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          {/* Main Celebration */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 0.8
                }}
                className="mb-8"
              >
                <div className="text-8xl mb-4">🎊</div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-4">
                  ยินดีด้วยค่ะ!
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  คุณได้จบบทเรียน <span className="font-semibold text-mint-400">&ldquo;{completionData.lessonTitle}&rdquo;</span>
                  เรียบร้อยแล้ว สุดยอดเลยค่ะ! 💕
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Achievement Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Points Earned */}
            <AnimatePresence>
              {currentStep >= 1 && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gray-800 rounded-sm p-6 shadow-card border border-gray-700 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gray-800 rounded-full -translate-y-10 translate-x-10" />
                  <div className="relative">
                    <div className="text-3xl mb-2">⭐</div>
                    <div className="text-3xl font-bold text-warning mb-1">
                      +{completionData.pointsEarned}
                    </div>
                    <p className="text-gray-400 font-medium">คะแนนที่ได้รับ</p>
                    <p className="text-sm text-gray-500 mt-1">ใช้เวลา {completionData.timeSpent}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Wellness Score */}
            <AnimatePresence>
              {currentStep >= 1 && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-gray-800 rounded-sm p-6 shadow-card border border-gray-700/50 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-mint-900/50 rounded-full -translate-y-10 translate-x-10" />
                  <div className="relative">
                    <div className="text-3xl mb-2">💗</div>
                    <div className="flex items-center justify-center space-x-2 mb-1">
                      <span className="text-lg text-gray-400 line-through">{completionData.wellnessScore.previous}</span>
                      <ArrowRight className="h-4 w-4 text-mint-400" />
                      <span className="text-3xl font-bold text-mint-400">{completionData.wellnessScore.current}</span>
                    </div>
                    <p className="text-gray-400 font-medium">Wellness Score</p>
                    <p className="text-sm text-mint-400 font-medium">+{completionData.wellnessScore.increase} คะแนน!</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Streak Info */}
            <AnimatePresence>
              {currentStep >= 1 && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gray-900 rounded-sm p-6 shadow-card border border-gray-700/50 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-mint-900 rounded-full -translate-y-10 translate-x-10" />
                  <div className="relative">
                    <div className="text-3xl mb-2">🔥</div>
                    <div className="text-3xl font-bold text-mint-400 mb-1">
                      {completionData.streakInfo.currentStreak}
                    </div>
                    <p className="text-gray-400 font-medium">วันติดต่อกัน</p>
                    {completionData.streakInfo.isNewRecord && (
                      <p className="text-sm text-mint-400 font-medium">🏆 สถิติใหม่!</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Badges Earned */}
          <AnimatePresence>
            {currentStep >= 2 && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-900 rounded-sm p-8 shadow-card border border-gray-600 mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center justify-center">
                  <Trophy className="h-6 w-6 mr-2 text-warning" />
                  Badges ใหม่ที่ได้รับ!
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {completionData.badgesEarned.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 200
                      }}
                      className={`${getRarityColor(badge.rarity)} p-6 rounded-sm text-white text-center relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-50" />
                      <div className="relative">
                        <div className="text-4xl mb-3">{badge.icon}</div>
                        <h3 className="font-bold text-lg mb-2">{badge.name}</h3>
                        <p className="text-sm opacity-90">{badge.description}</p>
                        <div className="mt-3">
                          <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium uppercase">
                            {badge.rarity}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Update */}
          <AnimatePresence>
            {currentStep >= 3 && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-mint-700 text-white rounded-sm p-8 mb-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
                  <Target className="h-6 w-6 mr-2" />
                  ความคืบหน้าในคอร์ส
                </h2>

                <div className="max-w-md mx-auto">
                  <div className="flex justify-between text-mint-200 mb-2">
                    <span>บทเรียนที่เสร็จสิ้น</span>
                    <span>{completionData.milestoneProgress.current}/{completionData.milestoneProgress.total}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 mb-4">
                    <motion.div
                      initial={{ width: `${((completionData.milestoneProgress.current - 1) / completionData.milestoneProgress.total) * 100}%` }}
                      animate={{ width: `${(completionData.milestoneProgress.current / completionData.milestoneProgress.total) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-gray-600 h-3 rounded-full"
                    />
                  </div>
                  <p className="text-mint-200">
                    เป้าหมายต่อไป: <span className="font-semibold">{completionData.milestoneProgress.nextMilestone}</span>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Recommendation */}
          <AnimatePresence>
            {currentStep >= 4 && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-900 rounded-sm p-8 shadow-card border border-mint-700 mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 mr-2 text-mint-400" />
                  แนะนำสำหรับคุณ
                </h2>

                <div className="bg-mint-900/50 border border-mint-700 rounded-sm p-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🌸</div>
                    <h3 className="text-xl font-semibold text-mint-300 mb-2">
                      {completionData.nextRecommendation.title}
                    </h3>
                    <p className="text-mint-400 mb-4">
                      {completionData.nextRecommendation.description}
                    </p>
                    <div className="text-sm text-mint-400">
                      💡 การพักผ่อนที่เพียงพอช่วยให้ร่างกายและจิตใจฟื้นฟูได้ดีที่สุด
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <AnimatePresence>
            {animationComplete && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/dashboard"
                    className="bg-mint-600 text-white px-8 py-4 rounded-sm font-semibold shadow-card hover:opacity-90 transition-all flex items-center space-x-2 group"
                  >
                    <Sparkles className="h-5 w-5" />
                    <span>ดู Wellness Garden</span>
                  </Link>

                  <Link
                    href={`/courses/${courseId}`}
                    className="bg-gray-900 text-mint-400 border-2 border-mint-600 px-8 py-4 rounded-sm font-semibold hover:opacity-90 transition-all flex items-center space-x-2"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>กลับไปคอร์ส</span>
                  </Link>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={shareAchievement}
                    className="bg-gray-800 text-gray-400 px-6 py-3 rounded-sm hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>แชร์ความสำเร็จ</span>
                  </button>
                  
                  <button className="bg-gray-800 text-gray-400 px-6 py-3 rounded-sm hover:bg-gray-700 transition-colors flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>ดาวน์โหลดใบประกาศ</span>
                  </button>
                </div>

                {/* Fun Stats */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-800 rounded-sm p-4">
                    <div className="text-2xl font-bold text-mint-400">{completionData.milestoneProgress.current}</div>
                    <div className="text-sm text-mint-300">บทเรียนที่จบ</div>
                  </div>
                  <div className="bg-gray-800 rounded-sm p-4">
                    <div className="text-2xl font-bold text-mint-300">{completionData.badgesEarned.length}</div>
                    <div className="text-sm text-mint-300">Badge ใหม่วันนี้</div>
                  </div>
                  <div className="bg-mint-900/50 rounded-sm p-4">
                    <div className="text-2xl font-bold text-mint-400">{completionData.timeSpent}</div>
                    <div className="text-sm text-mint-300">เวลาที่ใช้เรียน</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 