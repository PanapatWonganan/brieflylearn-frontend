'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, Volume2, VolumeX, SkipBack, SkipForward,
  Baby, AlertTriangle, CheckCircle, ArrowLeft, ArrowRight,
  Award, Sparkles, Shield, Target
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContextNew';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface LessonData {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  safetyReminders: string[];
  keyPoints: string[];
  nextLesson?: number;
  prevLesson?: number;
}

const lessonData: { [key: number]: LessonData } = {
  1: {
    id: 1,
    title: "ทำความรู้จักระบบฮอร์โมนผู้หญิง",
    duration: "18:00",
    videoUrl: "/hormone-lesson-1.mp4", // Mock URL
    description: "เรียนรู้ระบบฮอร์โมนผู้หญิงและวิธีการใช้การออกกำลังกายเพื่อปรับสมดุลให้ดีขึ้น",
    safetyReminders: [
      "หยุดทันทีหากรู้สึกเหนื่อยผิดปกติ",
      "ดื่มน้ำเพียงพอและพักตามความต้องการ",
      "ฟังสัญญาณจากร่างกายและไม่บังคับตัวเอง"
    ],
    keyPoints: [
      "ระบบฮอร์โมนผู้หญิงและวงจรประจำเดือน",
      "อาหารและการออกกำลังกายที่ส่งผลต่อฮอร์โมน",
      "การประเมินสัญญาณร่างกายและระดับฮอร์โมน"
    ],
    nextLesson: 2
  }
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = parseInt(params.id as string);
  const lessonId = parseInt(params.lessonId as string);
  const lesson = lessonData[lessonId];
  const { user, isAuthenticated } = useAuth();

  // Video State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Lesson State
  const [pauseForBaby, setPauseForBaby] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0);

  // Progress tracking - only enabled if user is authenticated
  const progressTracking = useProgressTracking({
    lessonId: lessonId.toString(),
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      const updateTime = () => setCurrentTime(video.currentTime);
      const updateDuration = () => setDuration(video.duration);
      const updateProgress = () => {
        const progressPercent = (video.currentTime / video.duration) * 100;
        setProgress(progressPercent);

        // Update progress tracking with current watch time
        progressTracking.updateWatchTime(video.currentTime);

        // Award points based on progress
        if (progressPercent >= 25 && earnedPoints < 10) setEarnedPoints(10);
        if (progressPercent >= 50 && earnedPoints < 25) setEarnedPoints(25);
        if (progressPercent >= 75 && earnedPoints < 40) setEarnedPoints(40);
        if (progressPercent >= 95) {
          setEarnedPoints(50);
          setLessonCompleted(true);
          // Mark lesson as complete in the backend
          progressTracking.markComplete();
        }
      };

      const handlePlay = () => {
        setIsPlaying(true);
        // Start progress tracking when video plays
        progressTracking.startTracking();
      };

      const handlePause = () => {
        setIsPlaying(false);
        // Pause progress tracking when video pauses
        progressTracking.pauseTracking();
      };

      video.addEventListener('timeupdate', updateTime);
      video.addEventListener('timeupdate', updateProgress);
      video.addEventListener('loadedmetadata', updateDuration);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);

      return () => {
        video.removeEventListener('timeupdate', updateTime);
        video.removeEventListener('timeupdate', updateProgress);
        video.removeEventListener('loadedmetadata', updateDuration);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, [earnedPoints, progressTracking]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      // setIsPlaying is now handled by play/pause event listeners
    }
  };


  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePauseForBaby = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      // setIsPlaying is now handled by pause event listener
      setPauseForBaby(true);
    }
  };

  const handleCompleteLesson = () => {
    router.push(`/courses/${courseId}/lessons/${lessonId}/complete`);
  };

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-gray-100 mb-2">ไม่พบบทเรียน</h1>
          <Link href={`/courses/${courseId}`} className="text-mint-400 hover:text-mint-300">
            กลับไปหน้าคอร์ส
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href={`/courses/${courseId}`}
                className="flex items-center space-x-2 text-gray-400 hover:text-mint-400 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>กลับไปคอร์ส</span>
              </Link>
              <div className="h-6 w-px bg-gray-600" />
              <div>
                <h1 className="text-lg font-semibold text-gray-100">บทเรียนที่ {lesson.id}</h1>
                <p className="text-sm text-gray-400">{lesson.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-mint-900/50 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-mint-300">{progress.toFixed(0)}% สำเร็จ</span>
              </div>
              {earnedPoints > 0 && (
                <div className="bg-gray-800 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-warning">+{earnedPoints} คะแนน</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-sm shadow-lg overflow-hidden"
            >
              {/* Video Container */}
              <div className="relative aspect-video bg-gray-950">
                {/* Mock Video Player */}
                <div className="absolute inset-0 bg-mint-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-20 w-20 mx-auto mb-4 opacity-80" />
                    <p className="text-lg">Mock Video Player</p>
                    <p className="text-sm opacity-80">{lesson.title}</p>
                  </div>
                </div>

                {/* Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-white text-sm mb-2">
                      <span>{formatTime(currentTime)}</span>
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-mint-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={togglePlay}
                        className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6 text-white" />
                        ) : (
                          <Play className="h-6 w-6 text-white ml-1" />
                        )}
                      </button>
                      
                      <button className="text-white/80 hover:text-white p-2">
                        <SkipBack className="h-5 w-5" />
                      </button>
                      
                      <button className="text-white/80 hover:text-white p-2">
                        <SkipForward className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Pause for Baby Button */}
                      <motion.button
                        onClick={handlePauseForBaby}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gray-600 hover:opacity-90 text-gray-100 px-4 py-2 rounded-full font-medium transition-colors flex items-center space-x-2"
                      >
                        <Baby className="h-4 w-4" />
                        <span>Pause for Baby</span>
                      </motion.button>

                      <div className="flex items-center space-x-2">
                        <button onClick={toggleMute} className="text-white/80 hover:text-white p-2">
                          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                          className="w-20"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lesson Info */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-100 mb-3">{lesson.title}</h2>
                <p className="text-gray-400 mb-4">{lesson.description}</p>

                {/* Key Points */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-100">จุดสำคัญในบทเรียนนี้:</h3>
                  <ul className="space-y-1">
                    {lesson.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-400">
                        <CheckCircle className="h-4 w-4 text-mint-400 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Lesson Navigation */}
            <div className="mt-6 flex justify-between">
              {lesson.prevLesson ? (
                <Link 
                  href={`/courses/${courseId}/lessons/${lesson.prevLesson}`}
                  className="flex items-center space-x-2 bg-gray-900 px-6 py-3 rounded-sm shadow-sm border border-gray-700 hover:bg-gray-800/50 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>บทเรียนก่อนหน้า</span>
                </Link>
              ) : (
                <div></div>
              )}

              {lessonCompleted ? (
                <motion.button
                  onClick={handleCompleteLesson}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-mint-600 text-white px-8 py-3 rounded-sm font-semibold shadow-card hover:opacity-90 transition-all flex items-center space-x-2"
                >
                  <Award className="h-5 w-5" />
                  <span>รับรางวัลและจบบทเรียน</span>
                </motion.button>
              ) : lesson.nextLesson ? (
                <Link 
                  href={`/courses/${courseId}/lessons/${lesson.nextLesson}`}
                  className="flex items-center space-x-2 bg-mint-600 text-white px-6 py-3 rounded-sm hover:bg-mint-700 transition-colors"
                >
                  <span>บทเรียนถัดไป</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Safety Reminders */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-red-500/10 border border-red-400/20 rounded-sm p-6"
            >
              <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                ข้อควรระวัง
              </h3>
              <ul className="space-y-2">
                {lesson.safetyReminders.map((reminder, index) => (
                  <li key={index} className="flex items-start space-x-2 text-red-400">
                    <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{reminder}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 p-3 bg-red-500/10 rounded-sm">
                <p className="text-sm text-red-400 font-medium">
                  🚨 ฉุกเฉิน: 1669 | สอบถาม: 1646
                </p>
              </div>
            </motion.div>

            {/* Progress Tracking */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 border border-gray-700/50 rounded-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2 text-mint-400" />
                ความคืบหน้า
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>การดูวิดีโอ</span>
                    <span>{progress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-mint-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {earnedPoints > 0 && (
                  <div className="bg-gray-800 border border-gray-600 rounded-sm p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-warning">คะแนนที่ได้</span>
                      <span className="text-lg font-bold text-warning">+{earnedPoints}</span>
                    </div>
                  </div>
                )}

                {lessonCompleted && (
                  <div className="bg-mint-900/50 border border-mint-700 rounded-sm p-3">
                    <div className="flex items-center space-x-2 text-mint-300">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">บทเรียนสำเร็จ!</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Wellness Garden Link */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-mint-600 text-white rounded-sm p-6"
            >
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                Wellness Garden
              </h3>
              <p className="text-mint-100 text-sm mb-4">
                ดูความคืบหน้าทั้งหมดและรับรางวัลในสวนแห่งสุขภาพของคุณ
              </p>
              <Link
                href="/dashboard"
                className="bg-gray-900 text-mint-600 px-4 py-2 rounded-sm font-medium hover:opacity-90 transition-colors inline-block"
              >
                เข้าสู่ Wellness Garden
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Pause for Baby Modal */}
      <AnimatePresence>
        {pauseForBaby && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-sm p-8 max-w-md w-full text-center"
            >
              <div className="text-6xl mb-4">👶💕</div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">
                พักผ่อนสำหรับลูกน้อย
              </h3>
              <p className="text-gray-400 mb-6">
                ไม่เป็นไร! คุณแม่ลูกอ่อนต้องการพักผ่อน<br />
                เราจะรอคุณที่นี่ ❤️
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setPauseForBaby(false);
                    togglePlay();
                  }}
                  className="w-full bg-mint-600 text-white py-3 rounded-sm hover:opacity-90 transition-colors font-medium"
                >
                  เล่นต่อเลย
                </button>
                <button
                  onClick={() => {
                    setPauseForBaby(false);
                    router.push(`/courses/${courseId}`);
                  }}
                  className="w-full bg-gray-700 text-gray-200 py-3 rounded-sm hover:bg-gray-600 transition-colors"
                >
                  กลับไปหน้าคอร์ส
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 