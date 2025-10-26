# 🌸 BoostMe - Women's Health Learning Platform

> **แพลตฟอร์มสุขภาพผู้หญิงออนไลน์ ดูแลคุณตั้งแต่ก่อนตั้งครรภ์ หลังคลอด และสมดุลฮอร์โมน เพื่อสาวๆ ทุกคน**

[![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)

## ✨ Features

### 🎓 **Complete Learning System**
- **Health Assessment** - ประเมินสุขภาพก่อนเริ่มคอร์ส
- **Pre-class Checklist** - ตรวจสอบความปลอดภัยทุกครั้ง
- **Video Lessons** - บทเรียนวิดีโอพร้อม "Pause for Baby" feature
- **Progress Tracking** - ติดตามความคืบหน้าแบบ Real-time

### 🌸 **Wellness Garden System**
- **Badge Collection** - รวบรวม achievements และ milestones
- **Wellness Score** - คะแนนสุขภาพแบบองค์รวม
- **Streak Counter** - นับวันติดต่อกันในการออกกำลังกาย
- **Community Features** - ชุมชนผู้หญิงที่เข้าใจกัน

### 🎨 **Modern UI/UX**
- **📱 Responsive Design** - เหมาะสำหรับทุกอุปกรณ์
- **🌙 Dark Mode** - รองรับธีมมืดและสว่าง
- **⚡ Loading States** - Skeleton UI และ Loading animations
- **🛡️ Error Handling** - Error boundaries และ fallback UI

### 🏥 **Safety First**
- **Medical Disclaimers** - คำเตือนทางการแพทย์
- **Emergency Information** - ข้อมูลฉุกเฉินพร้อมใช้
- **Pre-exercise Checks** - ตรวจสอบความพร้อมก่อนออกกำลังกาย
- **Pregnancy-safe Content** - เนื้อหาปลอดภัยสำหรับคุณแม่

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/PanapatWonganan/boostme.git
cd boostme

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── courses/           # Course pages
│   │   └── [id]/          # Dynamic course routes
│   │       ├── assessment/     # Health assessment
│   │       ├── checklist/      # Pre-class checklist
│   │       └── lessons/        # Video lessons
│   └── dashboard/         # Wellness Garden dashboard
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── BadgeSystem.tsx   # Achievement badges
│   ├── CourseCard.tsx    # Course display cards
│   ├── ErrorBoundary.tsx # Error handling
│   └── ...
├── contexts/             # React contexts
│   └── ThemeContext.tsx  # Dark/Light mode
└── lib/                 # Utilities and configurations
    ├── supabase.ts      # Supabase client
    └── utils.ts         # Helper functions
```

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15.4.4](https://nextjs.org/)** - React framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[Lucide React](https://lucide.dev/)** - Icon library

### Backend (Ready)
- **[Supabase](https://supabase.com/)** - Database & Authentication
- **PostgreSQL** - Relational database
- **Row Level Security** - Data protection

### UI/UX
- **[Kanit Font](https://fonts.google.com/specimen/Kanit)** - Thai language support
- **Pink/Rose Color Scheme** - Women-focused design
- **Mobile-first Design** - Responsive layouts

## 🎯 Key Pages

| Page | Description | Features |
|------|-------------|----------|
| **Homepage** | Landing page with course overview | Hero section, 4 pillars, featured courses |
| **Courses** | Browse all available programs | Search, filters, course cards |
| **Course Detail** | Individual course information | Safety info, curriculum, instructor |
| **Health Assessment** | Pre-course health evaluation | 4-step form, risk assessment |
| **Pre-class Checklist** | Safety checklist before lessons | 15 safety checks, warnings |
| **Video Lesson** | Course learning experience | Video player, "Pause for Baby" |
| **Wellness Garden** | Gamification dashboard | Badges, progress, streaks |
| **About** | Company and team information | Mission, values, team profiles |
| **Contact** | Contact and support | Forms, emergency contacts |

## 🌈 Color Palette

```css
/* Primary Colors */
--pink-50: #fdf2f8
--pink-500: #ec4899  /* Primary brand color */
--rose-500: #f43f5e  /* Secondary brand color */
--yellow-300: #fde047  /* Accent color */

/* Dark Mode */
--gray-900: #111827  /* Dark background */
--gray-800: #1f2937  /* Dark cards */
```

## 📱 Responsive Breakpoints

```css
/* Mobile First Design */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
```

## 🗃️ Database Schema

Complete database schema is available in `supabase-schema.sql` including:
- **profiles** - User profiles and preferences
- **courses** - Course information and metadata
- **lessons** - Individual lesson content
- **enrollments** - User course enrollments
- **lesson_progress** - Learning progress tracking
- **reviews** - Course reviews and ratings

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Deploy automatically

### Firebase Hosting
Configuration files are included:
- `firebase.json` - Hosting configuration
- `.firebaserc` - Project settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Acknowledgments

- Design inspiration from modern health and wellness platforms
- Thai language support with [Kanit font](https://fonts.google.com/specimen/Kanit)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

<div align="center">

**🌸 Made with ❤️ for women's health and wellness**

[Live Demo](https://boostme.vercel.app) • [Documentation](https://github.com/PanapatWonganan/boostme/wiki) • [Report Bug](https://github.com/PanapatWonganan/boostme/issues)

</div>
