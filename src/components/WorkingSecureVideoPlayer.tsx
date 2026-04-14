"use client";

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import Hls from 'hls.js';

interface WorkingSecureVideoPlayerProps {
  streamUrl: string;
  title: string;
  userName?: string;
  userEmail?: string;
  onProgress?: (currentTime: number, duration: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
}

export default function WorkingSecureVideoPlayer({
  streamUrl,
  title,
  userName = 'Guest',
  userEmail = 'guest@example.com',
  onProgress,
  onPlay,
  onPause
}: WorkingSecureVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    
    if (videoRef.current) {
      const video = videoRef.current;
      
      // ป้องกัน video reset โดยตรวจสอบ source ก่อน
      if (!streamUrl || streamUrl.length === 0) {
        return;
      }

      // Check if URL is valid
      if (!streamUrl.startsWith('http://') && !streamUrl.startsWith('https://')) {
        return;
      }

      // Clean up existing HLS instance
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      // Check if it's an HLS stream (.m3u8)
      if (streamUrl.includes('.m3u8') || streamUrl.includes('/playlist/')) {
        
        if (Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: false,
            backBufferLength: 90
          });
          
          hlsRef.current = hls;
          
          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  hls.startLoad();
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  hls.recoverMediaError();
                  break;
                default:
                  hls.destroy();
                  break;
              }
            }
          });
          
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
          });
          
          hls.loadSource(streamUrl);
          hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          // For Safari native HLS support
          video.src = streamUrl;
          video.load();
        } else {
          alert('Your browser does not support HLS video streaming');
          return;
        }
      } else {
        // Regular video file (MP4, etc.)

        if (video.src !== streamUrl) {
          
          // Clear existing source first
          video.src = '';
          video.load();
          
          // Set new source
          video.src = streamUrl;
          video.preload = 'metadata';
          
          // Force load the video
          video.load();
        } else {
          return;
        }
      }
      

    // Security settings
    video.setAttribute('controlslist', 'nodownload noremoteplayback');
    video.disablePictureInPicture = true;
    video.setAttribute('disablePictureInPicture', 'true');
    
      video.addEventListener('loadeddata', () => {
        if (isFinite(video.duration)) {
          setDuration(video.duration);
        }
      });
      
      video.addEventListener('timeupdate', () => {
        const current = video.currentTime;
        const dur = video.duration;
        
        if (isFinite(current)) setCurrentTime(current);
        if (onProgress && isFinite(current) && isFinite(dur)) {
          onProgress(current, dur);
        }
      });

      video.addEventListener('play', () => {
        setIsPlaying(true);
        if (onPlay) onPlay();
      });
      video.addEventListener('pause', () => {
        setIsPlaying(false);
        if (onPause) onPause();
      });
      
      video.addEventListener('error', (e) => {
        const videoElement = e.target as HTMLVideoElement;
        const errorMessages: { [key: number]: string } = {
          1: 'MEDIA_ERR_ABORTED - The user aborted the video playback',
          2: 'MEDIA_ERR_NETWORK - A network error occurred while fetching the video',
          3: 'MEDIA_ERR_DECODE - An error occurred while decoding the video',
          4: 'MEDIA_ERR_SRC_NOT_SUPPORTED - The video format is not supported'
        };
        
        const errorCode = videoElement.error?.code || 0;
        const errorMsg = errorMessages[errorCode] || 'Unknown error';
        
        // Improved user-friendly error based on error type
        let userMessage = 'เกิดข้อผิดพลาดในการเล่นวิดีโอ';
        
        switch (errorCode) {
          case 2:
            userMessage = 'ไม่สามารถโหลดวิดีโอได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต';
            break;
          case 4:
            userMessage = 'รูปแบบวิดีโอไม่ได้รับการสนับสนุน กรุณาลองใช้เบราว์เซอร์อื่น';
            break;
          default:
            userMessage = 'เกิดข้อผิดพลาดในการเล่นวิดีโอ กรุณาลองรีเฟรชหน้าเว็บ';
        }
        
        alert(userMessage);
      });
    } else {
    }
    
    // Cleanup on unmount
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [streamUrl]); // ลบ onProgress ออกเพื่อป้องกัน re-render

  // Security: Prevent right-click and keyboard shortcuts (but don't block video controls)
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Only prevent context menu on video area, not controls
      const target = e.target as HTMLElement;
      if (target.tagName === 'VIDEO' || target.closest('.video-container')) {
        e.preventDefault();
        return false;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only disable dev tools shortcuts, not video controls
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.keyCode === 85) || // Ctrl+U  
        (e.ctrlKey && e.keyCode === 83) // Ctrl+S
        // Removed PrintScreen (44) as it can interfere with normal usage
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Apply security only to the container, not globally
    const container = containerRef.current;
    if (container) {
      container.addEventListener('contextmenu', handleContextMenu);
      // Only add keydown to container, not document
      container.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (container) {
        container.removeEventListener('contextmenu', handleContextMenu);
        container.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }


    try {
      if (isPlaying) {
        video.pause();
      } else {
        
        // Ensure video is loaded before trying to play
        if (video.readyState < 3) { // HAVE_FUTURE_DATA
          await new Promise((resolve, reject) => {
            const handleCanPlay = () => {
              video.removeEventListener('canplay', handleCanPlay);
              video.removeEventListener('error', handleError);
              resolve(true);
            };
            const handleError = (e: Event) => {
              video.removeEventListener('canplay', handleCanPlay);
              video.removeEventListener('error', handleError);
              reject(e);
            };
            video.addEventListener('canplay', handleCanPlay);
            video.addEventListener('error', handleError);
            video.load();
          });
        }

        // Try to play unmuted first
        video.muted = false;
        await video.play();
      }
    } catch (error) {
      // Try playing muted if unmuted fails (browser autoplay policy)
      try {
        video.muted = true;
        await video.play();
        setIsMuted(true);
      } catch (mutedError) {
        // Last resort: show user that manual interaction might be needed
        alert('กรุณาคลิกที่วิดีโออีกครั้งเพื่อเริ่มเล่น (Browser autoplay policy)');
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const formatTime = (seconds: number): string => {
    if (!isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Fallback: some browsers may not support fullscreen
    }
  };

  // Listen for fullscreen changes (e.g. user presses Escape)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !isFinite(duration) || duration === 0) return;

    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = percent * duration;
  };

  return (
    <div className="space-y-4">
      <div 
        ref={containerRef}
        className="relative aspect-video bg-black group video-container"
        style={{ 
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none'
        }}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full"
          onClick={togglePlay}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            pointerEvents: 'auto',
            objectFit: 'contain'
          }}
        />
        
        {/* Big Play Button Overlay */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            style={{ zIndex: 50 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              togglePlay();
            }}
          >
            <div 
              className="bg-mint-600 bg-opacity-80 rounded-full p-8 hover:bg-opacity-90 transition-all hover:scale-110 shadow-lg"
              style={{ zIndex: 51 }}
            >
              <Play className="w-20 h-20 text-white fill-white" />
            </div>
          </div>
        )}
        
        {/* Click to Play Instructions */}
        {!isPlaying && (
          <div 
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-center bg-black bg-opacity-60 px-4 py-2 rounded-sm pointer-events-none"
            style={{ zIndex: 45 }}
          >
            <p className="text-sm">🔴 คลิกเพื่อเริ่มเล่นวิดีโอ</p>
          </div>
        )}
        
        {/* Security Watermark */}
        <div className="absolute top-4 right-4 text-white text-sm opacity-70 pointer-events-none select-none bg-black bg-opacity-50 px-2 py-1 rounded">
          <div className="text-xs">
            {userName}
            <br />
            {new Date().toLocaleString('th-TH')}
          </div>
        </div>

        {/* Protection Notice */}
        <div className="absolute bottom-16 left-4 text-white text-xs opacity-50 pointer-events-none select-none">
          🔒 เนื้อหาได้รับการป้องกัน
        </div>

        {/* Custom Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Progress Bar — clickable to seek */}
          <div
            className="w-full h-2 bg-gray-600 rounded-full mb-4 cursor-pointer group/bar"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-mint-500 rounded-full relative"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            >
              {/* Seek handle */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-gray-900 rounded-full shadow opacity-0 group-hover/bar:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <button onClick={togglePlay} className="hover:text-mint-400">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>

              <button onClick={toggleMute} className="hover:text-mint-400">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <div className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-xs text-gray-300">
                🔒 {title}
              </div>

              <button onClick={toggleFullscreen} className="hover:text-mint-400">
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Anti-Screenshot Overlay - Reduced opacity to not interfere with clicks */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, transparent 49.95%, rgba(255,255,255,0.005) 50%, transparent 50.05%)',
            backgroundSize: '40px 40px',
            zIndex: 1
          }}
        />
      </div>
      
    </div>
  );
}