import { useEffect, useRef, useCallback } from 'react';
import { updateLessonProgress } from '@/lib/api/progress';
import { courseIntegrationAPI, LessonCompletionResponse } from '@/lib/garden/courseIntegrationApi';

interface UseProgressTrackingOptions {
  lessonId: string;
  enabled?: boolean; // only track if user is authenticated
  onRewardsEarned?: (response: LessonCompletionResponse) => void;
}

export function useProgressTracking({ lessonId, enabled = true, onRewardsEarned }: UseProgressTrackingOptions) {
  const watchTimeRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isTrackingRef = useRef(false);
  const hasCompletedRef = useRef(false);
  const onRewardsEarnedRef = useRef(onRewardsEarned);

  // Keep callback ref up to date without causing re-renders
  useEffect(() => {
    onRewardsEarnedRef.current = onRewardsEarned;
  }, [onRewardsEarned]);

  // Start tracking - call this when video starts playing
  const startTracking = useCallback(() => {
    if (!enabled || isTrackingRef.current) return;

    isTrackingRef.current = true;

    // Send progress update every 30 seconds
    intervalRef.current = setInterval(() => {
      watchTimeRef.current += 30;

      // Fire-and-forget - don't block user experience
      updateLessonProgress(lessonId, {
        watch_time: watchTimeRef.current,
        is_completed: false
      }).catch((error) => {
        console.error('Failed to update lesson progress:', error)
      });
    }, 30000);
  }, [lessonId, enabled]);

  // Pause tracking
  const pauseTracking = useCallback(() => {
    isTrackingRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [lessonId]);

  // Mark lesson as complete — calls rewards endpoint for XP/achievements
  const markComplete = useCallback(async () => {
    if (!enabled || hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    try {
      // Call the rewards endpoint to get XP, star seeds, achievements
      const response = await courseIntegrationAPI.completeLessonWithRewards(lessonId, {
        watch_time: watchTimeRef.current
      });

      // Notify the parent component about earned rewards
      if (onRewardsEarnedRef.current && response.success) {
        onRewardsEarnedRef.current(response);
      }
    } catch (error) {
      console.error('Failed to complete lesson with rewards:', error);
      // Fallback: at least save the basic progress
      updateLessonProgress(lessonId, {
        watch_time: watchTimeRef.current,
        is_completed: true,
      }).catch((err) => {
        console.error('Fallback progress update also failed:', err)
      });
    }
  }, [lessonId, enabled]);

  // Update watch time manually (e.g., from video player currentTime)
  const updateWatchTime = useCallback((seconds: number) => {
    watchTimeRef.current = Math.floor(seconds);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      pauseTracking();
      // Send final progress update on unmount
      if (enabled && watchTimeRef.current > 0 && !hasCompletedRef.current) {
        updateLessonProgress(lessonId, {
          watch_time: watchTimeRef.current,
          is_completed: false
        }).catch((error) => {
          console.error('Failed to update progress on unmount:', error)
        });
      }
    };
  }, [lessonId, enabled, pauseTracking]);

  return {
    startTracking,
    pauseTracking,
    markComplete,
    updateWatchTime,
    isTracking: isTrackingRef.current,
  };
}
