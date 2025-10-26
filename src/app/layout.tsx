import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { AuthProvider } from "@/contexts/AuthContextNew";
import { GardenProvider } from "@/contexts/GardenContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotificationContainer from "@/components/NotificationContainer";

const kanit = Kanit({ 
  subsets: ["thai", "latin"], 
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "BrieflyLearn - แพลตฟอร์มพัฒนาตัวเองออนไลน์",
  description: "พัฒนาตัวเองสู่ความสำเร็จด้วยคอร์สเรียนออนไลน์คุณภาพสูง เรียนรู้ภาวะผู้นำ สติ การสื่อสาร และทักษะชีวิต",
  keywords: "พัฒนาตัวเอง, คอร์สออนไลน์, ภาวะผู้นำ, สติและจิตใจ, การสื่อสาร, ประสิทธิภาพ, การเงินส่วนบุคคล",
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
    title: "BrieflyLearn - แพลตฟอร์มพัฒนาตัวเองออนไลน์",
    description: "พัฒนาตัวเองสู่ความสำเร็จด้วยคอร์สเรียนออนไลน์คุณภาพสูง เรียนรู้ภาวะผู้นำ สติ การสื่อสาร และทักษะชีวิต",
    url: "https://brieflylearn.com",
    siteName: "BrieflyLearn",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrieflyLearn - แพลตฟอร์มพัฒนาตัวเองออนไลน์",
    description: "พัฒนาตัวเองสู่ความสำเร็จด้วยคอร์สเรียนออนไลน์คุณภาพสูง เรียนรู้ภาวะผู้นำ สติ การสื่อสาร และทักษะชีวิต",
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
        <meta name="theme-color" content="#f97316" />
      </head>
      <body className={`${kanit.className} antialiased transition-colors duration-300`}>
        <NotificationProvider>
          <AuthProvider>
            <GardenProvider>
              <ErrorBoundary>
                <div className="min-h-screen flex flex-col bg-white">
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
