'use client';

import { useEffect } from 'react';
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

/**
 * AI ฿100M Blueprint funnel layout.
 *
 * 1) Hides the global Header + Footer so the sales page / checkout is
 *    distraction-free.
 * 2) Loads the three Thai fonts used by the sales letter.
 *
 * Note: we need this to be a client component to run the DOM hide effect,
 * so metadata moves to per-page files.
 */
export default function AI100MLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    if (header) (header as HTMLElement).style.display = 'none';
    if (footer) (footer as HTMLElement).style.display = 'none';
    return () => {
      if (header) (header as HTMLElement).style.display = '';
      if (footer) (footer as HTMLElement).style.display = '';
    };
  }, []);

  return (
    <div className={`${plexThai.variable} ${sarabun.variable} ${chakra.variable} ai100m-root`}>
      {children}
    </div>
  );
}
