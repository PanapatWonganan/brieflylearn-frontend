import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono, IBM_Plex_Sans_Thai, Trirong } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { AuthProvider } from "@/contexts/AuthContextNew";
import { GardenProvider } from "@/contexts/GardenContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotificationContainer from "@/components/NotificationContainer";
import { SmoothScroll } from "@/components/SmoothScroll";
import GoogleAuthWrapper from "@/components/GoogleAuthWrapper";
import MetaPixel from "@/components/MetaPixel";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-body",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

const plexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-thai",
});

const trirong = Trirong({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-thai-serif",
});

export const metadata: Metadata = {
  title: "Antipararell - AI Lessons Reach 100 Millions Company",
  description: "แพลตฟอร์ม AI Learning ระดับโลก เรียนรู้ AI สร้างธุรกิจ & บริหารองค์กร ครอบคลุม Prompt Engineering, AI Automation และอีกมากมาย",
  keywords: "AI, เรียน AI, Antipararell, AI Learning, Prompt Engineering, AI Automation, LMS, คอร์ส AI",
  authors: [{ name: "Antipararell" }],
  creator: "Antipararell",
  publisher: "Antipararell",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://antipararell.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Antipararell - AI Lessons Reach 100 Millions Company",
    description: "แพลตฟอร์ม AI Learning ระดับโลก เรียนรู้ AI สร้างธุรกิจ & บริหารองค์กร",
    url: "https://antipararell.com",
    siteName: "Antipararell",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antipararell - AI Lessons Reach 100 Millions Company",
    description: "แพลตฟอร์ม AI Learning ระดับโลก เรียนรู้ AI สร้างธุรกิจ & บริหารองค์กร",
    creator: "@antipararell",
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
        <meta name="theme-color" content="#0E0E0E" />
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} ${plexThai.variable} ${trirong.variable} antialiased`}>
        <MetaPixel />
        <SmoothScroll />
        <GoogleAuthWrapper>
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
        </GoogleAuthWrapper>
      </body>
    </html>
  );
}
