import type { Metadata } from "next";
import { Sarabun, Noto_Serif_Thai } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { AuthProvider } from "@/contexts/AuthContextNew";
import { GardenProvider } from "@/contexts/GardenContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotificationContainer from "@/components/NotificationContainer";
import { SmoothScroll } from "@/components/SmoothScroll";

const sarabun = Sarabun({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const notoSerifThai = Noto_Serif_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "BrieflyLearn - เรียนรู้ AI สร้างธุรกิจ & บริหารองค์กร",
  description: "แพลตฟอร์มเรียน AI ออนไลน์สำหรับคนที่อยากนำ AI ไปใช้จริง ทั้งสร้างธุรกิจส่วนตัวและบริหารองค์กรให้ก้าวหน้า",
  keywords: "AI, เรียน AI, สร้างธุรกิจด้วย AI, AI สำหรับองค์กร, Prompt Engineering, AI Automation, คอร์ส AI ออนไลน์",
  authors: [{ name: "BrieflyLearn Team" }],
  creator: "BrieflyLearn",
  publisher: "BrieflyLearn",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://brieflylearn.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BrieflyLearn - เรียนรู้ AI สร้างธุรกิจ & บริหารองค์กร",
    description: "แพลตฟอร์มเรียน AI ออนไลน์สำหรับคนที่อยากนำ AI ไปใช้จริง ทั้งสร้างธุรกิจส่วนตัวและบริหารองค์กรให้ก้าวหน้า",
    url: "https://brieflylearn.com",
    siteName: "BrieflyLearn",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrieflyLearn - เรียนรู้ AI สร้างธุรกิจ & บริหารองค์กร",
    description: "แพลตฟอร์มเรียน AI ออนไลน์สำหรับคนที่อยากนำ AI ไปใช้จริง ทั้งสร้างธุรกิจส่วนตัวและบริหารองค์กรให้ก้าวหน้า",
    creator: "@brieflylearn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2d5a3d" />
      </head>
      <body className={`${sarabun.variable} ${notoSerifThai.variable} antialiased`}>
        <SmoothScroll />
        <NotificationProvider>
          <AuthProvider>
            <GardenProvider>
              <ErrorBoundary>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <NotificationContainer />
                </div>
              </ErrorBoundary>
            </GardenProvider>
          </AuthProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
