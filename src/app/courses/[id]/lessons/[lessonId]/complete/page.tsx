'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Sparkles, Target, ArrowRight, 
  CheckCircle, Users,
  Share2, Download, BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

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
  const router = useRouter();
  const courseId = parseInt(params.id as string);
  
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Trigger celebration animation
    setShowCelebration(true);
    
    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#EC4899', '#F472B6', '#FBBF24', '#34D399']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#EC4899', '#F472B6', '#FBBF24', '#34D399']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

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
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-bounce" />
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-200 rounded-full opacity-30 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-200 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 right-40 w-12 h-12 bg-orange-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href={`/courses/${courseId}`}
              className="text-gray-600 hover:text-orange-600 transition-colors"
            >
              ← กลับไปคอร์ส
            </Link>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-900">บทเรียนสำเร็จ! 🎉</h1>
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
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  ยินดีด้วยค่ะ! 
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  คุณได้จบบทเรียน <span className="font-semibold text-orange-600">&ldquo;{completionData.lessonTitle}&rdquo;</span> 
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
                  className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-100 rounded-full -translate-y-10 translate-x-10" />
                  <div className="relative">
                    <div className="text-3xl mb-2">⭐</div>
                    <div className="text-3xl font-bold text-yellow-600 mb-1">
                      +{completionData.pointsEarned}
                    </div>
                    <p className="text-gray-600 font-medium">คะแนนที่ได้รับ</p>
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
                  className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100 rounded-full -translate-y-10 translate-x-10" />
                  <div className="relative">
                    <div className="text-3xl mb-2">💗</div>
                    <div className="flex items-center justify-center space-x-2 mb-1">
                      <span className="text-lg text-gray-400 line-through">{completionData.wellnessScore.previous}</span>
                      <ArrowRight className="h-4 w-4 text-orange-500" />
                      <span className="text-3xl font-bold text-orange-600">{completionData.wellnessScore.current}</span>
                    </div>
                    <p className="text-gray-600 font-medium">Wellness Score</p>
                    <p className="text-sm text-green-600 font-medium">+{completionData.wellnessScore.increase} คะแนน!</p>
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
                  className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100 rounded-full -translate-y-10 translate-x-10" />
                  <div className="relative">
                    <div className="text-3xl mb-2">🔥</div>
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {completionData.streakInfo.currentStreak}
                    </div>
                    <p className="text-gray-600 font-medium">วันติดต่อกัน</p>
                    {completionData.streakInfo.isNewRecord && (
                      <p className="text-sm text-orange-600 font-medium">🏆 สถิติใหม่!</p>
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
                className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100 mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
                  <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
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
                      className={`bg-gradient-to-br ${getRarityColor(badge.rarity)} p-6 rounded-xl text-white text-center relative overflow-hidden`}
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
                className="bg-gradient-to-r from-orange-500 to-orange-500 text-white rounded-2xl p-8 mb-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
                  <Target className="h-6 w-6 mr-2" />
                  ความคืบหน้าในคอร์ส
                </h2>
                
                <div className="max-w-md mx-auto">
                  <div className="flex justify-between text-orange-100 mb-2">
                    <span>บทเรียนที่เสร็จสิ้น</span>
                    <span>{completionData.milestoneProgress.current}/{completionData.milestoneProgress.total}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 mb-4">
                    <motion.div 
                      initial={{ width: `${((completionData.milestoneProgress.current - 1) / completionData.milestoneProgress.total) * 100}%` }}
                      animate={{ width: `${(completionData.milestoneProgress.current / completionData.milestoneProgress.total) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-gradient-to-r from-yellow-300 to-yellow-400 h-3 rounded-full"
                    />
                  </div>
                  <p className="text-orange-100">
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
                className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 mr-2 text-green-500" />
                  แนะนำสำหรับคุณ
                </h2>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🌸</div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      {completionData.nextRecommendation.title}
                    </h3>
                    <p className="text-green-700 mb-4">
                      {completionData.nextRecommendation.description}
                    </p>
                    <div className="text-sm text-green-600">
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
                    className="bg-gradient-to-r from-orange-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 group"
                  >
                    <Sparkles className="h-5 w-5 group-hover:animate-spin" />
                    <span>ดู Wellness Garden</span>
                  </Link>
                  
                  <Link 
                    href={`/courses/${courseId}`}
                    className="bg-white text-orange-600 border-2 border-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all flex items-center space-x-2"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>กลับไปคอร์ส</span>
                  </Link>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={shareAchievement}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>แชร์ความสำเร็จ</span>
                  </button>
                  
                  <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>ดาวน์โหลดใบประกาศ</span>
                  </button>
                </div>

                {/* Fun Stats */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-orange-600">{completionData.milestoneProgress.current}</div>
                    <div className="text-sm text-orange-700">บทเรียนที่จบ</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600">{completionData.badgesEarned.length}</div>
                    <div className="text-sm text-purple-700">Badge ใหม่วันนี้</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">{completionData.timeSpent}</div>
                    <div className="text-sm text-green-700">เวลาที่ใช้เรียน</div>
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