# Personalized Notification System Design

## 1. ระบบการแจ้งเตือนแบบ Personalized

### A. Notification Service Architecture

```php
<?php
// app/Services/NotificationPersonalizationService.php

class NotificationPersonalizationService 
{
    public function generatePersonalizedNotification(User $user, string $templateKey): ?array
    {
        $template = NotificationTemplate::where('template_key', $templateKey)->first();
        $userProfile = $user->profile; // ข้อมูล life stage, goals, preferences
        $userActivity = $this->getUserActivityData($user);
        
        // Personalization Rules
        $personalizedData = [
            'user_name' => $user->first_name,
            'current_streak' => $userActivity['workout_streak'] ?? 0,
            'progress_percentage' => $this->calculateProgressPercentage($user),
            'preferred_workout_time' => $userProfile['preferred_workout_time'] ?? '19:00',
            'life_stage' => $userProfile['life_stage'] ?? 'general_wellness',
            'current_goals' => $userProfile['fitness_goals'] ?? [],
        ];

        return $this->compileNotification($template, $personalizedData);
    }

    private function calculateProgressPercentage(User $user): int
    {
        // คำนวณความก้าวหน้าตามเป้าหมายส่วนตัว
        $currentWeek = $user->enrollments()->with('progress')->get();
        // Logic สำหรับคำนวณ progress
        return 75; // ตัวอย่าง
    }
}
```

### B. Real-time Notification Triggers

```php
<?php
// app/Jobs/TriggerPersonalizedNotifications.php

class TriggerPersonalizedNotifications implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        // 1. Workout Reminder Notifications
        $this->sendWorkoutReminders();
        
        // 2. Progress Milestone Notifications  
        $this->sendProgressMilestones();
        
        // 3. Streak Maintenance Notifications
        $this->sendStreakReminders();
        
        // 4. Course Completion Celebrations
        $this->sendCompletionCelebrations();
        
        // 5. Social Engagement Notifications
        $this->sendSocialEngagementNotifications();
    }

    private function sendWorkoutReminders()
    {
        // ส่งการแจ้งเตือนออกกำลังกายตามเวลาที่ผู้ใช้ตั้งไว้
        $users = User::with('profile')
            ->whereHas('notificationPreferences', function($query) {
                $query->where('notification_type', 'workout_reminder')
                      ->where('is_enabled', true);
            })
            ->where('preferred_workout_time', '<=', now()->format('H:i'))
            ->where('last_workout_date', '<', today())
            ->get();

        foreach ($users as $user) {
            $notification = app(NotificationPersonalizationService::class)
                ->generatePersonalizedNotification($user, 'workout_reminder');
            
            if ($notification) {
                // ส่งผ่าน WebSocket สำหรับ real-time
                broadcast(new NotificationSent($user, $notification));
                
                // บันทึกลงฐานข้อมูล
                UserNotification::create([
                    'user_id' => $user->id,
                    'title' => $notification['title'],
                    'message' => $notification['message'],
                    'notification_data' => $notification['data'],
                ]);
            }
        }
    }
}
```

## 2. Frontend Integration

### A. Real-time Connection

```typescript
// utils/notificationSocket.ts
import { io, Socket } from 'socket.io-client';

class NotificationSocket {
    private socket: Socket;
    
    constructor(userId: string) {
        this.socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`, {
            auth: { userId }
        });
        
        this.setupListeners();
    }
    
    private setupListeners() {
        this.socket.on('notification', (notification) => {
            // เพิ่มการแจ้งเตือนใหม่เข้าไปในระบบ
            window.dispatchEvent(new CustomEvent('newNotification', { 
                detail: notification 
            }));
        });
    }
}
```

### B. Personalized Notification Context

```typescript
// contexts/PersonalizedNotificationContext.tsx
interface PersonalizedNotificationContext {
    notifications: PersonalizedNotification[];
    preferences: NotificationPreferences;
    updatePreferences: (prefs: Partial<NotificationPreferences>) => void;
    markAsActionable: (id: string, action: string) => void;
}

interface PersonalizedNotification extends Notification {
    personalizationData: {
        userGoals: string[];
        currentStreak: number;
        progressPercentage: number;
        lifeStage: string;
        actionable: boolean;
        suggestedActions?: NotificationAction[];
    };
}

interface NotificationAction {
    label: string;
    action: 'start_workout' | 'view_progress' | 'join_community' | 'schedule_reminder';
    payload?: any;
}
```

## 3. Machine Learning Personalization

### A. User Behavior Analysis

```python
# ml_service/notification_optimizer.py
import pandas as pd
from sklearn.ensemble import RandomForestRegressor

class NotificationPersonalizer:
    def __init__(self):
        self.engagement_model = RandomForestRegressor()
        
    def predict_best_notification_time(self, user_data):
        """ทำนายเวลาที่ดีที่สุดสำหรับส่งการแจ้งเตือน"""
        features = [
            user_data['historical_open_times'],
            user_data['workout_completion_times'], 
            user_data['app_usage_patterns'],
            user_data['life_stage_factor']
        ]
        return self.engagement_model.predict([features])[0]
    
    def generate_personalized_message(self, user_profile, notification_type):
        """สร้างข้อความที่เป็น personal ตามลักษณะผู้ใช้"""
        templates = {
            'motivational_high_achiever': "🔥 {name}! คุณอยู่ใน Top 10% แล้ว ไปต่อกันเลย!",
            'gentle_beginner': "💝 {name} ค่ะ เริ่มต้นใหม่วันนี้กันนะคะ ทีละขั้นตอน",
            'busy_mom': "👶 คุณแม่ {name} วันนี้ออกกำลังกายแค่ 15 นาทีก็เพียงพอแล้วค่ะ",
        }
        
        persona = self.classify_user_persona(user_profile)
        return templates[persona].format(name=user_profile['first_name'])
```

## 4. Advanced Features

### A. Smart Notification Batching
- รวมการแจ้งเตือนที่เกี่ยวข้องกันเป็นกลุม
- ส่งในช่วงเวลาที่เหมาะสม
- หลีกเลี่ยงการรบกวนมากเกินไป

### B. Context-Aware Notifications
```php
<?php
class ContextAwareNotificationService 
{
    public function shouldSendNotification(User $user, array $notification): bool
    {
        // ตรวจสอบบริบทปัจจุบัน
        $context = [
            'current_time' => now(),
            'user_timezone' => $user->timezone,
            'last_app_activity' => $user->last_seen_at,
            'current_course_progress' => $this->getCurrentProgress($user),
            'menstrual_cycle_phase' => $this->getMenstrualPhase($user),
        ];
        
        // กฎสำหรับการส่ง
        return $this->evaluateContextRules($context, $notification);
    }
}
```

## 5. การวัดผลและปรับปรุง

### A. Analytics & Metrics
- **Engagement Rate**: อัตราการเปิดดู/การกระทำตามการแจ้งเตือน
- **Retention Impact**: ผลกระทบต่อการกลับมาใช้แอป  
- **Goal Achievement**: อัตราการบรรลุเป้าหมายหลังจากได้รับการแจ้งเตือน
- **User Satisfaction**: ความพึงพอใจต่อการแจ้งเตือน

### B. A/B Testing Framework
```php
<?php
class NotificationABTestService 
{
    public function getVariantForUser(User $user, string $testKey): string
    {
        // แบ่งผู้ใช้เข้ากลุ่มทดสอบ
        $hash = md5($user->id . $testKey);
        return (hexdec(substr($hash, 0, 8)) % 100 < 50) ? 'A' : 'B';
    }
}
```

## 6. Implementation Timeline

### Phase 1: Basic Personalization (Week 1-2)
- User profile-based notifications
- Time-based preferences
- Basic template system

### Phase 2: Behavioral Triggers (Week 3-4)  
- Workout streak notifications
- Progress milestone celebrations
- Course completion reminders

### Phase 3: AI-Powered Optimization (Week 5-8)
- Machine learning for timing optimization
- Personalized message generation
- Context-aware delivery

### Phase 4: Advanced Features (Week 9-12)
- Social interaction notifications
- Community-based motivation
- Predictive health insights

## 7. Technical Considerations

### A. Scalability
- Redis สำหรับ caching user preferences
- Queue system สำหรับ batch processing
- WebSocket สำหรับ real-time delivery

### B. Privacy & Security
- Encrypted notification data
- User consent management
- GDPR compliance for EU users

### C. Performance
- Lazy loading ของ notification history
- Pagination สำหรับ notification list
- Optimistic updates สำหรับ UI responsiveness