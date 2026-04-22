import type { Metadata } from 'next';
import { IBM_Plex_Sans_Thai, Sarabun, Chakra_Petch } from 'next/font/google';
import './sales-page.css';

const plexThai = IBM_Plex_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ai100m-head',
  display: 'swap',
});

const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ai100m-body',
  display: 'swap',
});

const chakra = Chakra_Petch({
  subsets: ['thai', 'latin'],
  weight: ['500', '600', '700'],
  variable: '--font-ai100m-sig',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI ฿100M Blueprint — จดหมายเปิดผนึก',
  description:
    'Playbook เดียวที่ผมจะใช้สร้างบริษัท 100 ล้านจาก 0 โดยเริ่มจาก AI เป็นประตูบานแรก',
};

export default function AI100MLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${plexThai.variable} ${sarabun.variable} ${chakra.variable} ai100m-root`}>
      {children}
    </div>
  );
}
