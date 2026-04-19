# Meta Pixel / Facebook Ads — Marketing Funnel Plan

## Pixel ID: 1497398961757557

## Event Flow (Full Funnel)

```
TOFU (Awareness)
  PageView          — ทุกหน้า (auto via MetaPixel.tsx)
  ViewContent       — ดูหน้าคอร์ส /courses/[id]

MOFU (Consideration)
  CompleteRegistration — สมัครสมาชิก (email/Google) via AuthContext
  Lead                — ทำ onboarding เสร็จ /onboarding
  AddToCart            — กดซื้อคอร์ส (ก่อนไปหน้าชำระเงิน)

BOFU (Conversion)
  InitiateCheckout  — เข้าหน้าชำระเงิน /courses/[id]/checkout
  Purchase          — จ่ายเงินสำเร็จ /payments/success

Retention
  LessonComplete    — เรียนจบบทเรียน (backend CAPI only)
  CourseComplete     — เรียนจบทั้งคอร์ส (backend CAPI only)
```

## Event Details

### Standard Events (Meta Pixel)

| Event | Trigger | Frontend | Backend CAPI | Dedup |
|---|---|---|---|---|
| PageView | Route change | MetaPixel.tsx | - | No |
| ViewContent | Load /courses/[id] | courses/[id]/page.tsx | - | No |
| CompleteRegistration | Register/Google login | AuthContextNew.tsx | AuthController | Yes (eventId) |
| Lead | Onboarding complete | onboarding/page.tsx | - | No |
| AddToCart | Click buy course | courses/[id]/page.tsx | EnrollmentController | Partial |
| InitiateCheckout | Enter checkout page | checkout/page.tsx | - | No |
| Purchase | Payment confirmed | payments/success | PaymentController | Yes (eventId) |

### Custom Events

| Event | Trigger | Frontend | Backend CAPI |
|---|---|---|---|
| LessonComplete | Finish lesson | - | CourseIntegrationController |
| ExamComplete | Submit exam | - | ExamController |

## Files Modified

### Frontend (fitness-lms/)
- `src/lib/meta-pixel.ts` — All tracking functions
- `src/components/MetaPixel.tsx` — Script loader + PageView on route change
- `src/app/layout.tsx` — MetaPixel component rendered at root
- `src/app/courses/[id]/page.tsx` — ViewContent + AddToCart
- `src/app/courses/[id]/checkout/page.tsx` — InitiateCheckout
- `src/app/payments/success/page.tsx` — Purchase
- `src/app/onboarding/page.tsx` — Lead
- `src/contexts/AuthContextNew.tsx` — CompleteRegistration

### Backend (fitness-lms-admin/)
- `app/Services/MetaConversionsService.php` — Server-side CAPI
- `app/Http/Controllers/Api/AuthController.php` — CompleteRegistration CAPI
- `app/Http/Controllers/Api/EnrollmentController.php` — AddToCart CAPI
- `app/Http/Controllers/Api/CourseIntegrationController.php` — LessonComplete + Purchase CAPI

## Environment Variables

### Frontend
```
NEXT_PUBLIC_META_PIXEL_ID=1497398961757557
```

### Backend
```
META_PIXEL_ID=1497398961757557
META_CONVERSIONS_API_TOKEN=<pending - generate from Events Manager>
META_API_VERSION=v25.0
```

## Facebook Ads Strategy

### Custom Audiences to Create
1. **All Visitors** — PageView (last 180 days)
2. **Course Viewers** — ViewContent (last 30 days)
3. **Registered Users** — CompleteRegistration (last 90 days)
4. **Onboarded Users** — Lead (last 60 days)
5. **Cart Abandoners** — AddToCart NOT Purchase (last 14 days)
6. **Checkout Abandoners** — InitiateCheckout NOT Purchase (last 7 days)
7. **Buyers** — Purchase (last 180 days)

### Lookalike Audiences
1. **LAL from Buyers** (1%, 3%, 5%) — best quality
2. **LAL from Onboarded** (1%, 3%) — high intent
3. **LAL from Registered** (3%, 5%) — broad reach

### Retargeting Campaigns
1. **ViewContent -> Registration** — target course viewers who didn't register
2. **Registration -> Onboarding** — nudge registered users to complete onboarding
3. **AddToCart -> Purchase** — retarget cart abandoners with urgency/discount
4. **InitiateCheckout -> Purchase** — strongest retarget (was about to pay)

### Optimization Tips
- Use Purchase as primary conversion event for campaign optimization
- Use Lead as secondary for top-of-funnel campaigns
- Run Advantage+ campaigns with Purchase optimization after 50+ events
