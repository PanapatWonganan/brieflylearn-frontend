# 🔒 ระบบ Video Upload และการป้องกันการขโมย - BoostMe LMS

## 📋 สรุปภาพรวม
ระบบ video upload ที่ปลอดภัยสำหรับ LMS platform ที่ป้องกันการดาวน์โหลดและแชร์โดยไม่ได้รับอนุญาต

## 🏗️ สถาปัตยกรรมระบบ

### 1. **Video Storage Options**

#### Option A: AWS S3 + CloudFront (แนะนำ)
```
ข้อดี:
- Scalable และ reliable สูง
- มี signed URL สำหรับความปลอดภัย
- CDN ทั่วโลก ทำให้โหลดเร็ว
- ค่าใช้จ่ายตามการใช้จริง

ข้อเสีย:
- ต้องจ่ายค่าบริการ AWS
- Setup ซับซ้อนกว่า
```

#### Option B: Vimeo Pro/Business (สะดวกที่สุด)
```
ข้อดี:
- มี DRM protection ในตัว
- Player ที่ป้องกันการดาวน์โหลด
- Analytics ละเอียด
- API สำหรับ integration

ข้อเสีย:
- ค่าใช้จ่ายรายเดือน ($20-75/เดือน)
- Storage จำกัดตาม plan
```

#### Option C: Self-hosted + Nginx Secure Link
```
ข้อดี:
- ควบคุมได้เต็มที่
- ไม่มีค่าบริการรายเดือน

ข้อเสีย:
- ต้องดูแล server เอง
- Bandwidth จำกัด
- ไม่มี CDN
```

## 🛡️ มาตรการป้องกันการขโมย Video (7 ชั้น)

### Layer 1: **HLS Streaming + Encryption**
```php
// Laravel Backend - Video Processing Service
class VideoProcessingService 
{
    public function processUploadedVideo($videoPath) 
    {
        // แปลง video เป็น HLS format (.m3u8 + .ts segments)
        $ffmpegCommand = "ffmpeg -i {$videoPath} \\
            -profile:v baseline \\
            -level 3.0 \\
            -start_number 0 \\
            -hls_time 10 \\
            -hls_list_size 0 \\
            -hls_key_info_file {$keyInfoFile} \\  // AES-128 encryption
            -f hls {$outputPath}/index.m3u8";
        
        exec($ffmpegCommand);
        
        // เก็บ encryption key ใน database
        $this->storeEncryptionKey($videoId, $encryptionKey);
    }
}
```

### Layer 2: **Signed URLs with Expiration**
```php
// Generate temporary access URL
class VideoAccessService 
{
    public function generateSecureUrl($videoId, $userId) 
    {
        // ตรวจสอบสิทธิ์
        if (!$this->userHasAccess($userId, $videoId)) {
            throw new UnauthorizedException();
        }
        
        // สร้าง signed URL ที่หมดอายุใน 2 ชั่วโมง
        $expires = now()->addHours(2)->timestamp;
        $token = hash_hmac('sha256', 
            "{$videoId}:{$userId}:{$expires}", 
            config('app.video_secret')
        );
        
        return route('video.stream', [
            'id' => $videoId,
            'user' => $userId,
            'expires' => $expires,
            'token' => $token
        ]);
    }
}
```

### Layer 3: **Dynamic Watermarking**
```javascript
// Frontend - Video Player Component
import Hls from 'hls.js';

const SecureVideoPlayer = ({ videoUrl, userName, userEmail }) => {
    useEffect(() => {
        const video = videoRef.current;
        
        // เพิ่ม watermark แบบ dynamic
        const watermark = document.createElement('div');
        watermark.className = 'video-watermark';
        watermark.innerHTML = `
            <div class="watermark-text">
                ${userName} - ${userEmail}
                <br/>
                ${new Date().toLocaleString('th-TH')}
            </div>
        `;
        
        // Random position เพื่อป้องกันการ crop
        const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        const randomPos = positions[Math.floor(Math.random() * positions.length)];
        watermark.classList.add(randomPos);
        
        videoContainer.appendChild(watermark);
        
        // เปลี่ยนตำแหน่งทุก 30 วินาที
        setInterval(() => {
            const newPos = positions[Math.floor(Math.random() * positions.length)];
            watermark.className = `video-watermark ${newPos}`;
        }, 30000);
    }, []);
};
```

### Layer 4: **Screen Recording Detection**
```javascript
// ตรวจจับการ screen recording
class ScreenRecordingDetector {
    constructor() {
        this.detectionMethods = [];
        this.setupDetection();
    }
    
    setupDetection() {
        // Method 1: ตรวจจับ DevTools
        this.detectDevTools();
        
        // Method 2: ตรวจจับการเปลี่ยน visibility
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseVideo();
                this.logSuspiciousActivity('visibility_changed');
            }
        });
        
        // Method 3: ตรวจจับ screenshot (บางส่วน)
        document.addEventListener('keyup', (e) => {
            // PrintScreen key
            if (e.keyCode === 44) {
                this.showWarning();
                this.logSuspiciousActivity('screenshot_attempt');
            }
        });
        
        // Method 4: ตรวจจับการใช้ external display
        if (window.screen.availWidth > 2000 || 
            window.screen.availHeight > 1500) {
            this.requireAdditionalAuth();
        }
    }
    
    detectDevTools() {
        const threshold = 160;
        setInterval(() => {
            if (window.outerHeight - window.innerHeight > threshold || 
                window.outerWidth - window.innerWidth > threshold) {
                this.pauseVideo();
                this.showWarning('กรุณาปิด Developer Tools');
            }
        }, 500);
    }
}
```

### Layer 5: **DRM Protection (สำหรับ Premium Content)**
```javascript
// Widevine DRM Implementation
class DRMVideoPlayer {
    async initializeDRM(videoElement) {
        if ('requestMediaKeySystemAccess' in navigator) {
            const config = [{
                initDataTypes: ['cenc'],
                videoCapabilities: [{
                    contentType: 'video/mp4;codecs="avc1.42E01E"'
                }],
                persistentState: 'required',
                distinctiveIdentifier: 'required'
            }];
            
            try {
                const keySystemAccess = await navigator
                    .requestMediaKeySystemAccess('com.widevine.alpha', config);
                
                const mediaKeys = await keySystemAccess.createMediaKeys();
                await videoElement.setMediaKeys(mediaKeys);
                
                // Setup license server communication
                this.setupLicenseRequest(mediaKeys);
                
            } catch (e) {
                // Fallback to non-DRM version with more watermarks
                this.loadFallbackPlayer();
            }
        }
    }
}
```

### Layer 6: **Session Binding & Device Fingerprinting**
```php
// Backend - Device Fingerprinting
class DeviceFingerprintService 
{
    public function generateFingerprint(Request $request) 
    {
        $fingerprint = hash('sha256', implode(':', [
            $request->header('User-Agent'),
            $request->ip(),
            $request->header('Accept-Language'),
            $request->header('Accept-Encoding'),
            // Screen resolution จาก JavaScript
            $request->input('screen_resolution'),
            // Canvas fingerprint จาก JavaScript
            $request->input('canvas_fingerprint'),
            // WebGL fingerprint
            $request->input('webgl_fingerprint'),
        ]));
        
        // บันทึก fingerprint กับ session
        VideoSession::create([
            'user_id' => auth()->id(),
            'fingerprint' => $fingerprint,
            'video_id' => $request->video_id,
            'started_at' => now(),
            'expires_at' => now()->addHours(4),
        ]);
        
        return $fingerprint;
    }
    
    public function validatePlayback($fingerprint, $videoId) 
    {
        $session = VideoSession::where('fingerprint', $fingerprint)
            ->where('video_id', $videoId)
            ->where('expires_at', '>', now())
            ->first();
            
        if (!$session) {
            // ตรวจพบการเล่นจากอุปกรณ์อื่น
            $this->logSecurityEvent('invalid_device_fingerprint');
            throw new SecurityException('Unauthorized device');
        }
        
        // จำกัดการเล่นพร้อมกันไม่เกิน 1 device
        $activeSessions = VideoSession::where('user_id', $session->user_id)
            ->where('video_id', $videoId)
            ->where('expires_at', '>', now())
            ->count();
            
        if ($activeSessions > 1) {
            throw new SecurityException('Multiple device streaming detected');
        }
    }
}
```

### Layer 7: **Smart Analytics & Anomaly Detection**
```php
class VideoSecurityAnalytics 
{
    public function analyzeUserBehavior($userId, $videoId) 
    {
        $patterns = [
            // ตรวจจับการดูเร็วผิดปกติ
            'speed_watching' => $this->detectSpeedWatching($userId, $videoId),
            
            // ตรวจจับการ seek มากผิดปกติ
            'excessive_seeking' => $this->detectExcessiveSeeking($userId, $videoId),
            
            // ตรวจจับการดูจากหลาย IP
            'multiple_ips' => $this->detectMultipleIPs($userId),
            
            // ตรวจจับการแชร์ account
            'account_sharing' => $this->detectAccountSharing($userId),
        ];
        
        $riskScore = $this->calculateRiskScore($patterns);
        
        if ($riskScore > 0.7) {
            // High risk - ต้องยืนยันตัวตนเพิ่ม
            $this->requireAdditionalVerification($userId);
        } elseif ($riskScore > 0.5) {
            // Medium risk - เพิ่ม watermark
            $this->increaseWatermarkIntensity($userId);
        }
        
        return $riskScore;
    }
}
```

## 💾 Database Schema สำหรับ Video Security

```sql
-- Video metadata table
CREATE TABLE videos (
    id UUID PRIMARY KEY,
    title VARCHAR(255),
    course_id UUID,
    original_file_path TEXT,
    hls_manifest_path TEXT,
    encryption_key TEXT,
    duration INT,
    status ENUM('processing', 'ready', 'error'),
    created_at TIMESTAMP
);

-- Video access logs
CREATE TABLE video_access_logs (
    id UUID PRIMARY KEY,
    user_id UUID,
    video_id UUID,
    ip_address VARCHAR(45),
    user_agent TEXT,
    device_fingerprint VARCHAR(255),
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    watch_duration INT,
    seek_count INT,
    speed_changes INT,
    suspicious_activity JSON,
    INDEX idx_user_video (user_id, video_id),
    INDEX idx_fingerprint (device_fingerprint)
);

-- Security events
CREATE TABLE video_security_events (
    id UUID PRIMARY KEY,
    user_id UUID,
    video_id UUID,
    event_type VARCHAR(50),
    severity ENUM('low', 'medium', 'high', 'critical'),
    details JSON,
    ip_address VARCHAR(45),
    created_at TIMESTAMP,
    INDEX idx_user_severity (user_id, severity)
);
```

## 🚀 Implementation Steps

### Phase 1: Basic Security (Week 1-2)
1. ✅ Setup HLS video streaming
2. ✅ Implement signed URLs
3. ✅ Add basic watermarking
4. ✅ Session validation

### Phase 2: Advanced Protection (Week 3-4)
1. ⏳ Screen recording detection
2. ⏳ Device fingerprinting
3. ⏳ Multi-device prevention
4. ⏳ Analytics dashboard

### Phase 3: Premium Features (Week 5-6)
1. ⏳ DRM integration (optional)
2. ⏳ AI-based anomaly detection
3. ⏳ Real-time alerts
4. ⏳ Legal watermarking

## 💰 Cost Comparison

| Solution | Monthly Cost | Security Level | Ease of Implementation |
|----------|-------------|----------------|----------------------|
| AWS S3 + CloudFront | ~$50-200 | High | Medium |
| Vimeo Business | $75 | Very High | Easy |
| Self-hosted | Server cost | Medium | Hard |
| Bunny CDN + Storage | ~$20-50 | Medium-High | Easy |

## 🎯 Recommended Stack for BoostMe

```yaml
Primary: Bunny CDN + Bunny Stream
- ราคาถูก: $0.005/GB storage, $0.01/GB bandwidth
- มี HLS streaming + token authentication
- Global CDN
- Video processing built-in

Backup: AWS S3 + CloudFront
- สำหรับ content ที่สำคัญมาก
- ใช้ AWS MediaConvert สำหรับ DRM

Protection Layers:
1. HLS Streaming ✅
2. Token-based URLs ✅
3. Dynamic Watermark ✅
4. Device Limiting ✅
5. Screenshot Prevention ✅
6. Analytics Monitoring ✅
```

## 📝 Sample Implementation Code

### Laravel Upload Controller
```php
class VideoUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'video' => 'required|mimes:mp4,mov,avi|max:2048000', // 2GB
            'course_id' => 'required|exists:courses,id',
        ]);
        
        DB::beginTransaction();
        try {
            // 1. Upload to temporary storage
            $file = $request->file('video');
            $tempPath = $file->store('temp-videos');
            
            // 2. Create video record
            $video = Video::create([
                'id' => Str::uuid(),
                'course_id' => $request->course_id,
                'title' => $request->title,
                'status' => 'processing',
                'original_file_path' => $tempPath,
            ]);
            
            // 3. Queue video processing
            ProcessVideoJob::dispatch($video)->onQueue('video-processing');
            
            DB::commit();
            
            return response()->json([
                'message' => 'Video uploaded successfully',
                'video_id' => $video->id,
                'status' => 'processing'
            ]);
            
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
}
```

### Next.js Secure Player Component
```tsx
// components/SecureVideoPlayer.tsx
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { preventScreenshot } from '@/lib/security';

export default function SecureVideoPlayer({ 
    videoId, 
    userId, 
    userName 
}: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    
    useEffect(() => {
        // Initialize security measures
        preventScreenshot();
        detectDevTools();
        
        // Fetch secure video URL
        fetchSecureVideoUrl();
        
        return () => {
            // Cleanup
            if (hls) hls.destroy();
        };
    }, [videoId]);
    
    const fetchSecureVideoUrl = async () => {
        try {
            const response = await fetch(`/api/video/access/${videoId}`, {
                headers: {
                    'X-Device-Fingerprint': await getDeviceFingerprint(),
                }
            });
            
            const { url, token } = await response.json();
            
            if (Hls.isSupported()) {
                const hls = new Hls({
                    xhrSetup: (xhr) => {
                        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
                    }
                });
                
                hls.loadSource(url);
                hls.attachMedia(videoRef.current!);
                
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    setIsAuthorized(true);
                });
            }
        } catch (error) {
            console.error('Failed to load video:', error);
            showError('ไม่สามารถโหลดวิดีโอได้');
        }
    };
    
    return (
        <div className="video-container relative">
            <video 
                ref={videoRef}
                controls={false} // Custom controls
                onContextMenu={(e) => e.preventDefault()}
                className="w-full"
            />
            
            {/* Dynamic Watermark */}
            <div className="watermark absolute">
                {userName} - {new Date().toLocaleString('th-TH')}
            </div>
            
            {/* Custom Controls */}
            <VideoControls 
                videoRef={videoRef}
                onSuspiciousActivity={logSecurityEvent}
            />
        </div>
    );
}
```

## 🔍 Monitoring Dashboard

```typescript
// Admin Dashboard - Security Monitoring
interface SecurityMetrics {
    totalViews: number;
    suspiciousActivities: number;
    blockedAttempts: number;
    activeStreams: number;
    riskScore: number;
}

const VideoSecurityDashboard = () => {
    const [metrics, setMetrics] = useState<SecurityMetrics>();
    const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
    
    useEffect(() => {
        // Real-time monitoring via WebSocket
        const ws = new WebSocket('wss://api.boostme.com/security');
        
        ws.on('security-alert', (alert) => {
            setAlerts(prev => [alert, ...prev]);
            
            if (alert.severity === 'critical') {
                // Auto-block user
                blockUser(alert.userId);
                notifyAdmin(alert);
            }
        });
    }, []);
    
    return (
        <div className="grid grid-cols-4 gap-4">
            <MetricCard 
                title="Active Streams"
                value={metrics?.activeStreams}
                icon={<PlayIcon />}
            />
            <MetricCard 
                title="Risk Score"
                value={`${metrics?.riskScore}%`}
                icon={<ShieldIcon />}
                color={getRiskColor(metrics?.riskScore)}
            />
            {/* More metrics... */}
        </div>
    );
};
```

## ⚠️ ข้อควรระวัง

1. **ไม่มีระบบที่ 100% ปลอดภัย** - ต้องใช้หลายชั้นการป้องกัน
2. **User Experience vs Security** - ต้องหาจุดสมดุล
3. **ต้องแจ้ง Terms of Service** ชัดเจนเรื่องการห้าม download/share
4. **เตรียม Legal Action** สำหรับกรณีละเมิดลิขสิทธิ์
5. **Monitor และ Update** มาตรการป้องกันอย่างสม่ำเสมอ

## 📞 Support & Escalation

```yaml
Level 1 - Automated:
- Block suspicious IP
- Disable account temporarily
- Send warning email

Level 2 - Manual Review:
- Review activity logs
- Contact user for verification
- Reset device fingerprint

Level 3 - Legal:
- Document evidence
- Send cease & desist
- Pursue legal action if needed
```

---

*Document created for BoostMe LMS - Last updated: [Current Date]*