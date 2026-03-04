"use client";

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  streamUrl: string;
  title: string;
  duration?: string;
  userName?: string;
  userEmail?: string;
  onProgress?: (currentTime: number, duration: number) => void;
  onSeek?: (seekCount: number) => void;
  onSpeedChange?: (speedChanges: number) => void;
}

export default function SecureVideoPlayer({
  streamUrl,
  title,
  duration,
  userName = 'Guest',
  userEmail = 'guest@example.com',
  onProgress,
  onSeek,
  onSpeedChange
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Security tracking
  const [seekCount, setSeekCount] = useState(0);
  const [speedChanges, setSpeedChanges] = useState(0);
  const [watermarkPosition, setWatermarkPosition] = useState('top-right');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set up video source
    video.src = streamUrl;
    video.preload = 'metadata'; // Less aggressive preloading
    // Remove crossOrigin to avoid CORS issues with signed URLs
    
    // Video event listeners
    const handleLoadedData = () => {
      setLoading(false);
      // Only set duration if it's valid
      if (isFinite(video.duration) && video.duration > 0) {
        setVideoDuration(video.duration);
      } else {
        setVideoDuration(0);
      }
    };

    const handleTimeUpdate = () => {
      const current = video.currentTime;
      const duration = video.duration;
      
      // Only update if values are valid
      if (isFinite(current) && current >= 0) {
        setCurrentTime(current);
      }
      
      // Only update progress if both values are valid
      if (isFinite(current) && isFinite(duration) && duration > 0) {
        setProgress((current / duration) * 100);
        
        // Call progress callback
        if (onProgress) {
          onProgress(current, duration);
        }
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      console.error('Video error:', video.error);
      const errorMsg = video.error ? 
        `Video error (${video.error.code}): ${video.error.message}` :
        'Failed to load video. Please try again.';
      setError(errorMsg);
      setLoading(false);
    };

    const handleSeeked = () => {
      const newSeekCount = seekCount + 1;
      setSeekCount(newSeekCount);
      
      // Report excessive seeking
      if (newSeekCount > 50 && onSeek) {
        onSeek(newSeekCount);
      }
    };

    const handleRateChange = () => {
      const newSpeedChanges = speedChanges + 1;
      setSpeedChanges(newSpeedChanges);
      
      if (newSpeedChanges > 20 && onSpeedChange) {
        onSpeedChange(newSpeedChanges);
      }
    };

    // Simplified event handlers - remove problematic ones
    const handleCanPlay = () => {
      setLoading(false);
    };

    // Add only essential event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [streamUrl, seekCount, speedChanges, onProgress, onSeek, onSpeedChange]);

  // Dynamic watermark positioning
  useEffect(() => {
    const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    const interval = setInterval(() => {
      const randomPos = positions[Math.floor(Math.random() * positions.length)];
      setWatermarkPosition(randomPos);
    }, 30000); // Change every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Screenshot prevention
  useEffect(() => {
    const preventScreenshot = (e: KeyboardEvent) => {
      // PrintScreen, F12, Ctrl+Shift+I, etc.
      if (
        e.keyCode === 44 || // PrintScreen
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
      ) {
        e.preventDefault();
        alert('Screenshots and developer tools are disabled for this content.');
        return false;
      }
    };

    const preventRightClick = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('keydown', preventScreenshot);
    document.addEventListener('contextmenu', preventRightClick);

    return () => {
      document.removeEventListener('keydown', preventScreenshot);
      document.removeEventListener('contextmenu', preventRightClick);
    };
  }, []);

  // DevTools detection
  useEffect(() => {
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        if (videoRef.current) {
          videoRef.current.pause();
        }
        alert('Please close Developer Tools to continue watching.');
      }
    };

    const interval = setInterval(detectDevTools, 1000);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    // Check if video duration is valid
    if (!isFinite(video.duration) || video.duration <= 0) {
      console.warn('Cannot seek: invalid video duration', video.duration);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * video.duration;
    
    // Ensure newTime is valid
    if (isFinite(newTime) && newTime >= 0 && newTime <= video.duration) {
      video.currentTime = newTime;
      
      // Track seeking for security
      setSeekCount(prev => {
        const newCount = prev + 1;
        if (newCount > 10 && onSeek) {
          onSeek(newCount);
        }
        return newCount;
      });
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (error) {
    return (
      <div className="bg-gray-900 rounded-lg p-8 text-center text-white">
        <div className="text-red-400 mb-4">⚠️ Video Error</div>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-brand-600 px-4 py-2 rounded hover:bg-brand-700"
        >
          <RotateCcw className="w-4 h-4 inline mr-2" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative bg-black rounded-lg overflow-hidden group"
      style={{ aspectRatio: '16/9' }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        preload="metadata"
        controlsList="nodownload"
        disablePictureInPicture
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
            <p>Loading video...</p>
          </div>
        </div>
      )}

      {/* Dynamic Watermark */}
      <div 
        ref={watermarkRef}
        className={`absolute text-white text-sm bg-black bg-opacity-30 px-2 py-1 rounded pointer-events-none select-none ${
          watermarkPosition === 'top-left' ? 'top-4 left-4' :
          watermarkPosition === 'top-right' ? 'top-4 right-4' :
          watermarkPosition === 'bottom-left' ? 'bottom-16 left-4' :
          'bottom-16 right-4'
        }`}
        style={{ 
          zIndex: 10,
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none'
        }}
      >
        <div className="text-xs opacity-70">
          {userName}
          <br />
          {new Date().toLocaleString('th-TH')}
        </div>
      </div>

      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress Bar */}
        <div 
          className="w-full h-2 bg-gray-600 rounded-full mb-4 cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-brand-600 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <button onClick={togglePlay} className="hover:text-brand-400">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            
            <button onClick={toggleMute} className="hover:text-brand-400">
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            
            <div className="text-sm">
              {formatTime(currentTime)} / {formatTime(videoDuration)}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-xs text-gray-300">{title}</div>
            <button onClick={toggleFullscreen} className="hover:text-brand-400">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}