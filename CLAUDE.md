# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**BrieflyLearn** (formerly BoostMe) — LMS platform targeting AI users and business people.

- **Tech Stack**: Laravel 12 + Next.js 15.4.4 + MySQL + Tailwind CSS v4
- **Monorepo**: `fitness-lms/` (frontend) + `fitness-lms-admin/` (backend)
- **Language**: Thai-first UI, English code

## Commands

### Frontend (fitness-lms/) — Port 3000
```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm run start        # Start production server
```

### Backend (fitness-lms-admin/) — Port 8001
```bash
php artisan serve --port=8001   # Start dev server
php artisan migrate             # Run migrations
php artisan db:seed             # Seed all data
php artisan db:seed --class=ExamSeeder        # Seed specific seeder
php artisan db:seed --class=BlogPostSeeder
php artisan db:seed --class=WellnessGardenSeeder  # Required for garden plant types, achievements, challenges
php artisan route:list          # List all routes
php artisan test                # Run tests (PHPUnit)
composer test                   # Alternative test command
```

### Troubleshooting
- Frontend "Internal Server Error" → delete `.next/` folder, restart dev server
- Turbopack workspace root error → `turbopack.root` is set in next.config.ts via `import.meta.url`

## Architecture

### Authentication Flow
1. User logs in via email/password or **Google Sign-In**
2. Backend generates `api_token` (60-char random string), returns `base64(userId|api_token)`
3. Frontend stores token in `localStorage` as `auth_token`
4. All authenticated requests use `Authorization: Bearer <token>`
5. Backend middleware `auth.api` (`ApiTokenAuth.php`) decodes and validates token
6. Tokens expire after 30 days (`token_expires_at` column)
7. Frontend checks both `auth_token` and `boostme_token` keys for backward compatibility

### Frontend Provider Hierarchy (layout.tsx)
```
SmoothScroll → GoogleAuthWrapper → NotificationProvider → AuthProvider → GardenProvider → ErrorBoundary
```

### Frontend Structure (src/)
- `app/` — 36 pages/routes (Next.js App Router)
- `components/` — Reusable UI (auth/, garden/, ui/ subdirs)
- `contexts/` — AuthContextNew, GardenContext, NotificationContext, ThemeContext
- `hooks/` — useProgressTracking
- `lib/api/` — API clients: auth, blog, contact, dashboard, exams, progress
- `lib/garden/` — Garden API clients: api, types, friendApi, communityApi, themeApi, seasonalApi, advancedPlantApi, courseIntegrationApi

### Backend Structure (app/)
- `Http/Controllers/Api/` — 19 controllers
- `Http/Middleware/` — ApiTokenAuth (custom token auth), ForceHttps, TrustProxies
- `Http/Requests/` — 15 FormRequest validation classes extending ApiFormRequest base
- `Models/` — 27 Eloquent models (UUID primary keys throughout)
- `Mail/` — 15 mail classes (SendGrid SMTP) — event-triggered + scheduled automation
- `Console/Commands/` — 6 commands (4 email automation, video status, admin creation)
- `Policies/` — UserGardenPolicy, UserPlantPolicy, EnrollmentPolicy
- `Filament/` — Admin panel at `/admin` (CourseResource, LessonResource, UserResource, etc.)
- See `fitness-lms-admin/CLAUDE.md` for detailed backend documentation

### API Route Groups (routes/api.php)
| Group | Prefix | Auth | Throttle |
|-------|--------|------|----------|
| Auth public | `v1/auth` | No | login: 5/min, register: 3/min |
| Auth protected | `v1/auth` | `auth.api` | — |
| Public API | `v1` | No | 60/min |
| Protected API | `v1` | `auth.api` | 60/min |
| Garden | `v1/garden` | `auth.api` | 60/min |
| Exams (public) | `v1/exams` | No | 60/min |
| Exams (protected) | `v1/exams` | `auth.api` | 60/min |
| Blog | `v1/blog` | No | 60/min |
| Video upload | `video/upload` | `auth.api` | 10/hr |

### Database
- **Users table**: Custom fields — `password_hash` (not `password`), `full_name`, `api_token`, `google_id`, `token_expires_at`
- **UUID primary keys** on all tables, `$incrementing = false`
- **JSON columns**: `growth_stages`, `care_requirements`, `criteria`, `options`, `answers`, `progress_data`, `garden_layout`

### Email System
- SendGrid SMTP integration (config in `.env`)
- 15 mail classes: event-triggered (Welcome, CourseCompleted, LevelUp, ExamResult, etc.) + scheduled automation (onboarding series, weekly progress, inactive reminders, streak milestones)
- All sends wrapped in try-catch — failures never break main flow
- Blade templates in `resources/views/emails/` with BrieflyLearn branding (Thai content)
- Scheduler configured in `routes/console.php` (Thailand UTC+7 adjusted)

## Design System — Warm Minimalism (Aesop-inspired)

### Color Palette (globals.css @theme block)
- **brand**: Deep green `#4a7a5a` (50-900 scale)
- **sand**: Warm neutral `#fdfcfa` (50-500 scale)
- **ink**: Text — DEFAULT `#1a1a1a`, light `#4a4a4a`, muted `#8a8a8a`, faint `#c5c5c5`
- **error**: `#9b4d4d` (light, dark variants)
- **warning**: `#8b7355` (light variant)

### Strict Rules
- NO Tailwind default colors (red/blue/green/yellow/purple) — use brand/sand/ink/error/warning only
- NO gradients — solid colors only
- NO infinite animations (except loading spinners)
- 2 shadow levels: `shadow-subtle`, `shadow-card`
- 3 button variants: `btn-primary`, `btn-secondary`, `btn-ghost`
- Rounded corners: `rounded-sm` (2px) consistently — NO rounded-lg/xl/2xl
- Typography: `text-display`, `text-heading`, `text-subheading` (clamp-based responsive)
- Tailwind CSS v4 uses `@theme` block in globals.css (not traditional tailwind.config)
- Fonts: Cormorant Garamond (serif display), DM Sans (sans body), DM Mono (mono labels), IBM Plex Sans Thai (Thai sans), Trirong (Thai serif)

## AI Lab (Garden Gamification System)

### Branding
- Thai: "ห้องปฏิบัติการ AI" / "AI Lab"
- XP → "Impact Points", Star Seeds → "AI Credits"
- Plant stages: แนวคิด → ต้นแบบ → ทดสอบ → พร้อมใช้ → ขยายผล

### System
- Watering cooldown: 4 hours
- Plant types: 9 total, unlocked by user level (3 at level 1)
- Rarity costs: common 50, rare 100, epic 200, legendary 500 star seeds
- XP per level: `level * 1000`
- Plant categories: fitness, nutrition, mental, learning, mindfulness, leadership, productivity, growth, health, finance, creativity

### Garden Pages
`/garden`, `/garden/achievements`, `/garden/friends`, `/garden/themes`, `/garden/community`, `/garden/advanced-plants`, `/garden/seasonal`, `/garden/demo-lesson`

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8001/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<google_oauth_client_id>
```

### Backend (.env)
Key variables: `APP_URL`, `APP_FRONTEND_URL`, `DB_*` (MySQL), `MAIL_*` (SendGrid SMTP), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

**Note**: Always set `NEXT_PUBLIC_API_URL` in `.env.local`. The fallback defaults to `http://localhost:8001/api/v1`.

## Test Credentials
- **Email**: test@example.com / **Password**: password123
- **Admin panel**: /admin (role must be `admin`)

## Known Quirks
1. `GardenActivity::logActivity()` has PHP deprecated warnings for nullable params — cosmetic, not breaking
2. `growth_stages` in PlantType can be `number | Record<string, any>` — frontend handles both
3. First MySQL request ~500ms (connection overhead), subsequent requests are fast
4. Frontend checks both `boostme_token` and `auth_token` localStorage keys for backward compatibility
5. `next.config.ts` has TypeScript and ESLint checks enabled — `no-explicit-any` is configured as a warning (not error) in `eslint.config.mjs`
