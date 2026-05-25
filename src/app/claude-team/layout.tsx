'use client';

import { useEffect } from 'react';
import { IBM_Plex_Sans_Thai, Sarabun, Chakra_Petch } from 'next/font/google';
import './sales-page.css';

const plexThai = IBM_Plex_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cowork-head',
  display: 'swap',
});

const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cowork-body',
  display: 'swap',
});

const chakra = Chakra_Petch({
  subsets: ['thai', 'latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cowork-sig',
  display: 'swap',
});

/**
 * Claude Cowork for Teams funnel layout. Same pattern as /ai-100m:
 *
 * 1) Hides the global Header + Footer so the sales page / checkout is
 *    distraction-free.
 * 2) Loads the three Thai fonts used by the sales letter.
 *
 * Client component so the DOM hide effect can run; metadata lives in the
 * per-page files.
 */
export default function ClaudeTeamLayout({ children }: { children: React.ReactNode }) {
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
    <div className={`${plexThai.variable} ${sarabun.variable} ${chakra.variable} cowork-root`}>
      {children}
    </div>
  );
}
