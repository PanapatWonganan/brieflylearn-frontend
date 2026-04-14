"use client";

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Eye,
  AlertCircle,
  CheckCircle,
  Loader2,
  PlayCircle,
  Star,
  Sparkles,
  Trophy,
  Award,
} from 'lucide-react';
import WorkingSecureVideoPlayer from '@/components/WorkingSecureVideoPlayer';
import { fetchLessonDetail, fetchStreamUrl, LessonDetail, StreamUrlResponse } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContextNew';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { LessonCompletionResponse } from '@/lib/garden/courseIntegrationApi';
import CourseCompletionCelebration from '@/components/garden/CourseCompletionCelebration';

// Helper functions for extracting video IDs
function getYouTubeVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function getVimeoVideoId(url: string): string | null {
  const regex = /(?:vimeo\.com\/)(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;
  const { user, isAuthenticated } = useAuth();

  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [streamData, setStreamData] = useState<StreamUrlResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [streamLoading, setStreamLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watchProgress, setWatchProgress] = useState({ currentTime: 0, duration: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Reward/completion state
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [rewardData, setRewardData] = useState<LessonCompletionResponse | null>(null);
  const [showRewardToast, setShowRewardToast] = useState(false);
  const [showCourseCompletion, setShowCourseCompletion] = useState(false);

  // Handle rewards earned callback
  const handleRewardsEarned = useCallback((response: LessonCompletionResponse) => {
    setRewardData(response);
    setLessonCompleted(true);
    setShowRewardToast(true);

    // Auto-hide toast after 6 seconds
    setTimeout(() => setShowRewardToast(false), 6000);

    // If course completed, show celebration modal after a short delay
    if (response.data?.course_completed) {
      setTimeout(() => setShowCourseCompletion(true), 2000);
    }
  }, []);

  // Progress tracking - only enabled if user is authenticated
  const progressTracking = useProgressTracking({
    lessonId,
    enabled: isAuthenticated,
    onRewardsEarned: handleRewardsEarned,
  });

  // Fetch lesson data
  useEffect(() => {
    const loadLesson = async () => {
      const result = await fetchLessonDetail(lessonId);

      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setLesson(result.data);
      }

      setLoading(false);
    };

    if (lessonId) {
      loadLesson();
    }
  }, [lessonId]);

  // Fetch stream URL when lesson is ready
  const getStreamUrl = async () => {

    if (!lesson?.video?.ready || !lesson.can_watch) {
      alert(`Cannot play video: ${!lesson?.video?.ready ? 'Video not ready' : 'No permission to watch'}`);
      return;
    }

    setStreamLoading(true);

    try {
      const result = await fetchStreamUrl(lessonId);

      if (result.error) {
        setError(result.error);
        alert(`Error loading video: ${result.error}`);
      } else if (result.data) {
        setStreamData(result.data);
      } else {
        alert('Failed to load video: No data received');
      }
    } catch (error) {
      alert(`Failed to load video: ${error}`);
    }

    setStreamLoading(false);
  };

  const handleProgress = (currentTime: number, duration: number) => {
    setWatchProgress({ currentTime, duration });

    // Update progress tracking with current watch time
    progressTracking.updateWatchTime(currentTime);

    // Mark as complete if user watched 90% or more
    const progressPercent = (currentTime / duration) * 100;
    if (progressPercent >= 90) {
      progressTracking.markComplete();
    }
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    progressTracking.startTracking();
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
    progressTracking.pauseTracking();
  };

  const progressPercent = watchProgress.duration > 0
    ? Math.round((watchProgress.currentTime / watchProgress.duration) * 100)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-mint-400" />
          <p className="text-gray-400">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 rounded-sm p-8 shadow-card text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-100 mb-2">เกิดข้อผิดพลาด</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="bg-mint-600 text-white px-6 py-2 rounded-sm hover:opacity-90"
          >
            กลับหน้าก่อน
          </button>
        </div>
      </div>
    );
  }

  const canWatchVideo = lesson.can_watch && lesson.video?.ready;
  const isVideoProcessing = lesson.video?.status === 'processing';
  const isVideoPending = lesson.video?.status === 'pending';
  const hasVideoError = lesson.video?.status === 'failed';

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-400 hover:opacity-90 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            กลับ
          </button>

          <div className="bg-gray-800 rounded-sm shadow-sm p-4">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span>{lesson.course.title}</span>
              <span className="mx-2">•</span>
              <span>บทที่ {lesson.order_index}</span>
              {lesson.is_free && (
                <>
                  <span className="mx-2">•</span>
                  <span className="bg-mint-900/50 text-mint-300 px-2 py-1 rounded text-xs">
                    ดูฟรี
                  </span>
                </>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-100 mb-2">{lesson.title}</h1>
            <div className="flex items-center text-gray-400 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              <span>{lesson.duration_minutes} นาที</span>
              {lesson.video && (
                <>
                  <span className="mx-2">•</span>
                  <span>{lesson.video.duration}</span>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-sm shadow-card overflow-hidden"
            >
              {/* Video Status Messages */}
              {!lesson.video && !lesson.video_url && (
                <div className="aspect-video bg-gray-800 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>ยังไม่มีวิดีโอสำหรับบทเรียนนี้</p>
                  </div>
                </div>
              )}

              {!lesson.video_url && lesson.video && (isVideoProcessing || isVideoPending) && (
                <div className="aspect-video bg-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-mint-400" />
                    <p className="text-gray-200 font-medium">
                      {isVideoPending ? 'กำลังรอการประมวลผลวิดีโอ...' : 'กำลังประมวลผลวิดีโอ...'}
                    </p>
                    <p className="text-mint-400 text-sm">กรุณารอสักครู่</p>
                  </div>
                </div>
              )}

              {!lesson.video_url && lesson.video && hasVideoError && (
                <div className="aspect-video bg-red-500/10 flex items-center justify-center">
                  <div className="text-center">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
                    <p className="text-red-400 font-medium">เกิดข้อผิดพลาดในการประมวลผลวิดีโอ</p>
                    {lesson.video.processing_error && (
                      <p className="text-red-400 text-sm mt-2">{lesson.video.processing_error}</p>
                    )}
                  </div>
                </div>
              )}

              {!lesson.video_url && !lesson.can_watch && lesson.video?.ready && (
                <div className="aspect-video bg-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <Eye className="w-12 h-12 mx-auto mb-4 text-warning" />
                    <p className="text-gray-200 font-medium">ต้องซื้อคอร์สเพื่อดูบทเรียนนี้</p>
                    <button className="mt-4 bg-mint-600 text-white px-6 py-2 rounded-sm hover:opacity-90">
                      ซื้อคอร์ส
                    </button>
                  </div>
                </div>
              )}

              {/* Notice when both YouTube and uploaded video exist */}
              {lesson.video_url && lesson.video?.ready && lesson.can_watch && (
                <div className="bg-gray-800 border border-gray-600 p-2 mb-2 rounded text-sm text-mint-300">
                  <p>บทเรียนนี้มีทั้งวิดีโอ YouTube และวิดีโอที่อัปโหลด กำลังแสดงวิดีโอ YouTube</p>
                </div>
              )}

              {/* Priority 1: YouTube/External Video Player */}
              {lesson.video_url && lesson.can_watch && (
                <div className="aspect-video bg-black">
                  {lesson.video_url.includes('youtube.com') || lesson.video_url.includes('youtu.be') ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(lesson.video_url)}?rel=0&modestbranding=1`}
                      title={lesson.title}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : lesson.video_url.includes('vimeo.com') ? (
                    <iframe
                      src={`https://player.vimeo.com/video/${getVimeoVideoId(lesson.video_url)}?title=0&byline=0&portrait=0`}
                      title={lesson.title}
                      className="w-full h-full"
                      allowFullScreen
                      allow="autoplay; fullscreen; picture-in-picture"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <div className="text-center p-8">
                        <PlayCircle className="w-16 h-16 text-mint-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-100 mb-2">วิดีโอภายนอก</h3>
                        <p className="text-gray-400 mb-4">คลิกเพื่อดูวิดีโอในหน้าต่างใหม่</p>
                        <a
                          href={lesson.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 bg-mint-600 text-white px-6 py-3 rounded-sm hover:opacity-90 transition-colors"
                        >
                          <span>ดูวิดีโอ</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Priority 2: Secure Video Player for uploaded files (only show if no YouTube URL) */}
              {!lesson.video_url && canWatchVideo && !streamData && (
                <div className="aspect-video bg-gray-900 flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      getStreamUrl();
                    }}
                    disabled={streamLoading}
                    className="bg-mint-600 text-white px-8 py-4 rounded-sm hover:opacity-90 disabled:opacity-50 flex items-center cursor-pointer"
                    style={{ pointerEvents: streamLoading ? 'none' : 'auto' }}
                  >
                    {streamLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        กำลังโหลด...
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-5 h-5 mr-2" />
                        เริ่มดูวิดีโอ
                      </>
                    )}
                  </button>
                </div>
              )}


              {/* Secure Video Player - Show when stream URL is loaded (only if no YouTube URL) */}
              {!lesson.video_url && streamData && (
                <>
                  <WorkingSecureVideoPlayer
                    streamUrl={streamData.stream_url || ''}
                    title={lesson.title}
                    userName={user?.fullName || 'Guest'}
                    userEmail={user?.email || 'guest@example.com'}
                    onProgress={handleProgress}
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                  />
                </>
              )}
            </motion.div>
          </div>

          {/* Lesson Details Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900 rounded-sm shadow-card p-6"
            >
              <h3 className="text-lg font-semibold text-gray-100 mb-4">ความคืบหน้า</h3>

              {/* Progress bar */}
              {watchProgress.duration > 0 ? (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>การดูวิดีโอ</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-mint-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  {progressPercent < 90 && progressPercent > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                      ดูถึง 90% เพื่อรับคะแนน
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-4">เริ่มดูวิดีโอเพื่อติดตามความคืบหน้า</p>
              )}

              {/* Completion status */}
              {lessonCompleted && (
                <div className="bg-mint-900/50 border border-mint-700 rounded-sm p-3 mb-4">
                  <div className="flex items-center space-x-2 text-mint-300">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">เรียนจบบทเรียนนี้แล้ว</span>
                  </div>
                </div>
              )}

              {/* Rewards earned */}
              {rewardData?.data?.garden_progress && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-400 flex items-center">
                    <Award className="w-4 h-4 mr-1.5 text-mint-400" />
                    รางวัลที่ได้รับ
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-800 rounded-sm p-3 text-center">
                      <Star className="h-5 w-5 text-mint-400 mx-auto mb-1" />
                      <p className="text-lg font-bold text-mint-400">
                        {rewardData.data.garden_progress.total_learning_xp}
                      </p>
                      <p className="text-xs text-gray-400">Impact Points</p>
                    </div>
                    <div className="bg-gray-800 rounded-sm p-3 text-center">
                      <Sparkles className="h-5 w-5 text-mint-400 mx-auto mb-1" />
                      <p className="text-lg font-bold text-mint-400">
                        {rewardData.data.garden_progress.star_seeds}
                      </p>
                      <p className="text-xs text-gray-400">AI Credits</p>
                    </div>
                  </div>

                  {/* New achievements */}
                  {rewardData.data.new_achievements && rewardData.data.new_achievements.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {rewardData.data.new_achievements.map((achievement) => (
                        <div key={achievement.id} className="bg-gray-800 border border-mint-700 rounded-sm p-2 flex items-center space-x-2">
                          <Trophy className="h-4 w-4 text-mint-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-100 truncate">{achievement.name}</p>
                            <p className="text-xs text-gray-400">+{achievement.xp_reward} XP</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Lesson Details Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900 rounded-sm shadow-card p-6"
            >
              <h3 className="text-lg font-semibold text-gray-100 mb-4">รายละเอียดบทเรียน</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-100 mb-2">คำอธิบาย</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {lesson.description || 'ไม่มีคำอธิบาย'}
                  </p>
                </div>

                {lesson.video && (
                  <div>
                    <h4 className="font-medium text-gray-100 mb-2">สถานะวิดีโอ</h4>
                    <div className="flex items-center text-sm">
                      {lesson.video.status === 'ready' && (
                        <><CheckCircle className="w-4 h-4 text-mint-400 mr-2" />
                        <span className="text-mint-300">พร้อมใช้งาน</span></>
                      )}
                      {lesson.video.status === 'processing' && (
                        <><Loader2 className="w-4 h-4 text-gray-400 mr-2 animate-spin" />
                        <span className="text-mint-300">กำลังประมวลผล</span></>
                      )}
                      {lesson.video.status === 'failed' && (
                        <><AlertCircle className="w-4 h-4 text-red-400 mr-2" />
                        <span className="text-red-400">เกิดข้อผิดพลาด</span></>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Reward Toast Notification */}
      <AnimatePresence>
        {showRewardToast && rewardData?.data?.garden_progress && (
          <motion.div
            initial={{ opacity: 0, y: 80, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 80, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-50 bg-gray-900 rounded-sm shadow-card border border-mint-700 p-4 max-w-sm w-full mx-4"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-mint-900 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-mint-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-100">เรียนจบบทเรียนแล้ว!</p>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-sm text-mint-400 font-medium flex items-center">
                    <Star className="h-3.5 w-3.5 mr-1" />
                    +{rewardData.data.garden_progress.total_learning_xp} XP
                  </span>
                  <span className="text-sm text-mint-400 font-medium flex items-center">
                    <Sparkles className="h-3.5 w-3.5 mr-1" />
                    +{rewardData.data.garden_progress.star_seeds} Seeds
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowRewardToast(false)}
                className="text-gray-400 hover:text-gray-400 flex-shrink-0"
              >
                <span className="sr-only">ปิด</span>
                &times;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Course Completion Celebration Modal */}
      {rewardData?.data?.course_completed && lesson && (
        <CourseCompletionCelebration
          data={{
            course: {
              id: lesson.course.id,
              title: lesson.course.title,
              total_lessons: rewardData.data.garden_progress?.completed_lessons ?? 0,
            },
            rewards: {
              xp_earned: rewardData.data.garden_progress?.total_learning_xp ?? 0,
              star_seeds_earned: rewardData.data.garden_progress?.star_seeds ?? 0,
              bonus_xp: 0,
              bonus_star_seeds: 0,
            },
            achievements: (rewardData.data.new_achievements ?? []).map((a) => ({
              id: a.id,
              name: a.name,
              description: a.description ?? '',
              xp_reward: a.xp_reward,
              star_seeds_reward: a.star_seeds_reward,
            })),
          }}
          isVisible={showCourseCompletion}
          onClose={() => {
            setShowCourseCompletion(false);
            router.push('/garden');
          }}
        />
      )}
    </div>
  );
}
