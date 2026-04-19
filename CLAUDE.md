# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**BrieflyLearn** (formerly "BoostMe") — Thai-first LMS frontend. Pairs with the Laravel API at `../fitness-lms-admin/`.

- **Stack**: Next.js 15.4.4 (App Router, Turbopack) + React 19 + TypeScript 5 (strict) + Tailwind CSS v4
- **Port**: 3000 in dev
- **Backend**: `NEXT_PUBLIC_API_URL` → `http://localhost:8001/api/v1` in dev, `https://api.brieflylearn.com/api/v1` in prod

> **README.md is stale.** It still advertises "BoostMe" / Supabase / women's-health branding. The real stack is a custom Laravel token-auth API (not Supabase) and the product is a general AI/business LMS. Trust this file and the code, not `README.md`.

## Commands

```bash
npm run dev          # Turbopack dev server on :3000
npm run build        # Production build (TypeScript + ESLint errors WILL fail the build)
npm run start        # Run the built server
npm run lint         # next lint (ESLint 9)
npx tsc --noEmit     # Type-check only — use this before deploy, it catches things lint doesn't
```

### Running from the monorepo root
`../start-dev.sh` and `../stop-dev.sh` launch both frontend (:3000) and backend (:8001) together.

### Deploying
Deploy is driven from the repo root, NOT from here:
```bash
bash ../deploy.sh frontend              # Frontend only
bash ../deploy.sh frontend "msg"        # Frontend only with commit message
bash ../deploy.sh "msg"                 # Both backend + frontend
```
Hot-patch without full git deploy (when you need a single file on prod fast):
```bash
scp -i ~/.ssh/brieflylearn_ed25519 src/<path> root@45.32.125.76:/var/www/brieflylearn/frontend/src/<path>
ssh -i ~/.ssh/brieflylearn_ed25519 root@45.32.125.76 \
  'cd /var/www/brieflylearn/frontend && npm run build && pm2 restart brieflylearn-frontend'
```

## Architecture

### Client-first rendering model
Every substantive page is `'use client'` and fetches via `lib/api.ts` on mount. The initial HTML from the server is a near-empty shell — **grepping production HTML for Thai CTA text will return nothing**. To verify a change reached prod, fetch the chunk from `/_next/static/chunks/app/<route>/page-*.js` and grep there.

### Provider hierarchy (`app/layout.tsx`)
```
SmoothScroll → GoogleAuthWrapper → NotificationProvider → AuthProvider → GardenProvider → ErrorBoundary
```
Any page that reads auth or garden state must live inside this tree. `AuthProvider` is from `contexts/AuthContextNew.tsx` (the older `AuthContext` was replaced — don't import it).

### Auth flow contract with the Laravel backend
1. Login/Google returns `base64(userId|api_token)` from the Laravel API
2. Token is stored in `localStorage` under **both** `auth_token` (canonical) and `boostme_token` (legacy) — reads must check both
3. Every authenticated `fetch` adds `Authorization: Bearer <token>`; see the pattern in `lib/api.ts`
4. Token expires after 30 days server-side
5. `useAuth()` from `AuthContextNew` exposes `{ user, isAuthenticated, loading, login, logout, ... }` — **the field is `loading`, not `isLoading`**. This bites often because a lot of other libs use `isLoading`.

### `lib/` layout (two layers, non-obvious)
- **Top-level**: `api.ts` (courses/lessons/streams — the oldest API client), `auth.ts`, `db.ts`, `utils.ts`, `validations.ts`, `meta-pixel.ts`
- **Nested dirs**: `api/` (newer domain-split clients — auth, blog, contact, dashboard, exams, progress), `auth/`, `garden/` (garden sub-API: api, types, friendApi, communityApi, themeApi, seasonalApi, advancedPlantApi, courseIntegrationApi)

When adding a new API call for an existing domain, put it in the matching nested file. The top-level `api.ts` is mostly frozen — changes there risk touching code that many old pages import.

### Payments / course-gating contract
This is the most failure-prone flow. The `/courses/[id]` page, `/courses/[id]/checkout`, `/payments/success`, `/payments/failed` form one unit, and the gating depends on three backend-computed booleans:

| Field | From | Meaning |
|---|---|---|
| `user_has_paid_access` | `GET /v1/courses/{id}/lessons` (on the `CourseWithLessons` response) | User has a completed enrollment for this course |
| `locked` | same endpoint, per-lesson | `true` when the caller is not allowed to watch (not free + not paid) |
| `can_watch` | `GET /v1/lessons/{id}` | Per-lesson watch permission for the lesson detail page |

The course CTA has three states — **all three must be handled everywhere the button appears (main hero, modal, mobile sticky)**:
1. **Guest** (`!isAuthenticated`) → label `เข้าสู่ระบบเพื่อซื้อคอร์ส`, route `/login?redirect=/courses/{id}`
2. **Authed + unpaid** → label `ชำระเงิน ฿X,XXX`, route `/courses/{id}/checkout`
3. **Authed + paid** (`userHasPaidAccess`) → label `เข้าเรียนต่อ`, route `/lessons/{firstPlayableLesson.id}`

Skipping state (1) sends guests straight to `/checkout` → backend 401 → white error card — this has been a recurring bug. Keep the guard.

The backend `/courses/{id}/lessons` response's `course` object returns `price`, `original_price`, `level`, `duration_minutes` (see `CourseWithLessons` in `lib/api.ts`). If the button renders `฿0`, the API is missing the `price` field — fix the backend, don't paper over the frontend.

### Video streaming
`SecureVideoPlayer` / `WorkingSecureVideoPlayer` consume `GET /v1/lessons/{id}/stream-url`, which returns an HMAC-signed URL valid for 30 minutes. No HLS — plain MP4 via HTTP 206 range requests. `hls.js` is still in `package.json` but not in the active lesson-page path.

### Next.js config quirks (`next.config.ts`)
- `reactStrictMode: true`
- `images.domains: ['images.unsplash.com']` — add new remote image hosts here
- `eslint.ignoreDuringBuilds: false` **and** `typescript.ignoreBuildErrors: false` — the build really does fail on lint errors and TS errors. Run `npx tsc --noEmit` locally before pushing.
- `turbopack.root: __dirname` via `import.meta.url` — required, removing it reintroduces the "workspace root detected multiple lockfiles" warning

### ESLint (`eslint.config.mjs`)
Two rules are softened from error to warn: `@typescript-eslint/no-explicit-any` and `react/no-unescaped-entities`. Don't re-enable them as errors without fixing every offender first; many existing pages use `any` intentionally for API shapes that still churn.

## Design System — Warm Minimalism (Tailwind v4 tokens)

Tokens live in `src/app/globals.css` inside a `@theme` block (Tailwind v4, **not** `tailwind.config.js` — that file is a leftover and unused). Available palettes: `brand` (deep green #4a7a5a, 50-900), `sand` (warm neutral), `ink` (DEFAULT/light/muted/faint), `error`, `warning`.

Hard rules enforced across the codebase:
- **No** Tailwind default colors (red-500, blue-500, green-500, etc.). Use the tokens above. Tokens like `bg-white`, `bg-sand-50`, `text-ink` compile, but any shade outside the `@theme` block (e.g. `bg-blue-500`) silently breaks the dark-theme design.
- No gradients, no infinite animations (spinners excepted)
- Rounded corners: `rounded-sm` (2px) only
- Three button variants: `btn-primary`, `btn-secondary`, `btn-ghost`
- Typography helpers: `text-display`, `text-heading`, `text-subheading` (clamp-based)
- Fonts: Cormorant Garamond (serif), DM Sans (sans), DM Mono (mono), IBM Plex Sans Thai, Trirong

When writing an error/empty state, match the dark surface conventions used in `NotificationContainer.tsx` (`#0E0E0E` bg, `#F2F2F0` text, `surface-*` / `mint-*` accent tokens if present). A component that looks "white on red" is almost always using stale, off-palette classes — check the token list before adding new shades.

## Path alias

`@/*` → `src/*` (see `tsconfig.json` paths). Use `@/components/Header`, `@/contexts/AuthContextNew`, `@/lib/api`, etc. Relative imports across directories usually indicate a missed alias.

## Page inventory (`src/app/`)

Public: `/`, `/about`, `/contact`, `/pricing`, `/faq`, `/help`, `/privacy`, `/terms`, `/blog`, `/trainers`, `/landing`
Auth: `/login`, `/register`, `/onboarding`
Content: `/courses`, `/courses/[id]`, `/courses/[id]/checkout`, `/lessons/[id]`
Payments: `/payments/success`, `/payments/failed`
Learning: `/dashboard`, `/results`, `/exams`
Gamification: `/garden` (+ `/achievements`, `/friends`, `/themes`, `/community`, `/advanced-plants`, `/seasonal`, `/demo-lesson`)
Internal: `/debug`, `/api/*` (Next API routes — rare, most calls proxy to the Laravel backend)

## Common traps

1. **Stale JS chunk** — Cloudflare caches `/_next/static/chunks/...` aggressively. After a deploy, the browser may hold the old chunk for up to 5 min; `Cmd-Shift-R` or cache purge to verify.
2. **Backgrounded `sleep` processes** — deploy shells sometimes keep long-running `sleep` workers. They don't affect deploys but show up noisily in this repo's `BashOutput`.
3. **Suspense boundaries on payment pages** — `/payments/success` and `/payments/failed` read `useSearchParams`, which forces a Suspense boundary in Next 15 builds. If you add a new search-param-reading page under `/payments/` and the build fails, wrap the component in `<Suspense>`.
4. **Two "loading" names** — `useAuth()` returns `loading`, but many component-local fetch states are `isLoading`. Don't conflate. Correct destructuring: `const { loading: authLoading } = useAuth()`.
5. **`.next/` corruption** — "Internal Server Error" on a page that builds cleanly locally usually means stale `.next/`. `rm -rf .next && npm run dev`.
6. **Frontend checks `auth_token` AND `boostme_token`** — writing only one on login will break older pages that still read the other.

## Environment

`.env.local`:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8001/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<google_oauth_client_id>
```

Production frontend ships to VPS `45.32.125.76`, path `/var/www/brieflylearn/frontend`, managed by PM2 under process name `brieflylearn-frontend`, served behind Nginx + Cloudflare at `https://brieflylearn.com`. SSH key: `~/.ssh/brieflylearn_ed25519`.

## Test credentials

- User: `test@example.com` / `password123`
- Admin panel (backend, not this app): `/admin` on the backend, user role must be `admin`
