# BrieflyLearn - Claude Memory

## Project Overview
- **Project Name**: BrieflyLearn (formerly BoostMe)
- **Tech Stack**: Laravel 11 + Next.js 15.4.4 + MySQL
- **Purpose**: LMS platform targeting AI users and business people
- **Monorepo**: `fitness-lms/` (frontend) + `fitness-lms-admin/` (backend)

## Current System Status

### Backend (Laravel Admin) - Port 8001
- **Location**: `/Users/panapat/Brieflylearn/brieflylearn/fitness-lms-admin/`
- **Database**: MySQL with custom field names (`password_hash`, `full_name`, `api_token`)
- **Auth**: Base64 encoded tokens `userId|tokenHash`, stored in localStorage as `boostme_token` or `auth_token`
- **Start**: `php artisan serve --port=8001`

### Frontend (Next.js) - Port 3000
- **Location**: `/Users/panapat/Brieflylearn/brieflylearn/fitness-lms/`
- **Start**: `npm run dev` (Turbopack)
- **Note**: If "Internal Server Error" appears, delete `.next/` folder and restart dev server

## Design System - Warm Minimalism (Aesop-inspired)

### Color Palette (defined in globals.css @theme block)
- **brand**: Deep green (#4a7a5a family, 50-900 scale)
- **sand**: Warm neutral (#fdfcfa family, 50-500 scale)
- **ink**: Text hierarchy (DEFAULT #1a1a1a, light #4a4a4a, muted #8a8a8a, faint #c5c5c5)
- **error**: #9b4d4d (light, dark variants)
- **warning**: #8b7355 (light variant)

### Rules
- NO Tailwind default colors (red/blue/green/yellow/purple) - use brand/sand/ink/error/warning only
- NO gradients - solid colors only
- NO infinite animations (except loading spinners)
- 2 shadow levels only: shadow-subtle, shadow-card
- 3 button variants: btn-primary, btn-secondary, btn-ghost
- Rounded corners: rounded-lg consistently
- Typography: text-display, text-heading, text-subheading (clamp-based)

## AI Lab (formerly Learning Garden)

### Branding
- Thai: "ห้องปฏิบัติการ AI" / "AI Lab"
- XP -> "Impact Points"
- Star Seeds -> "AI Credits"
- Plant/Grow -> Project development metaphor

### System
- **Watering cooldown**: 4 hours (not 24h)
- **Plant types**: 9 total, unlocked by user level (3 at level 1)
- **Seeder**: `WellnessGardenSeeder` - must run for plant types, achievements, challenges
- **Auth**: All garden API endpoints require Bearer token in Authorization header

### Garden Pages
- `/garden` - Main dashboard
- `/garden/achievements` - Achievement badges
- `/garden/friends` - AI Network
- `/garden/themes` - Lab theme customization
- `/garden/community` - Community hub
- `/garden/advanced-plants` - Advanced projects
- `/garden/seasonal` - AI Events
- `/garden/demo-lesson` - Demo lesson

## Test Credentials
- **Email**: test@example.com
- **Password**: password123

## Important Technical Notes
1. Tailwind CSS v4 uses `@theme` block in globals.css (not traditional tailwind.config approach)
2. Backend has PHP deprecated warnings for `GardenActivity::logActivity()` nullable params - cosmetic, not breaking
3. `growth_stages` in PlantType can be `number | Record<string, any>` - frontend handles both
4. Many API requests show ~500ms response time - this is the MySQL connection overhead on first request (subsequent are fast)
5. Frontend uses both `boostme_token` and `auth_token` keys in localStorage for backward compatibility
