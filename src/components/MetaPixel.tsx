'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { trackPageView } from '@/lib/meta-pixel'

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''

/**
 * Meta Pixel component — uses the standard Facebook Pixel snippet.
 * The inline script creates the fbq stub, loads fbevents.js, and fires
 * the initial PageView. Subsequent route changes are tracked via useEffect.
 */
export default function MetaPixel() {
  const pathname = usePathname()

  // Track page views on client-side route changes (SPA navigation)
  useEffect(() => {
    if (PIXEL_ID && typeof window !== 'undefined' && typeof window.fbq === 'function') {
      trackPageView()
    }
  }, [pathname])

  if (!PIXEL_ID) {
    return null
  }

  return (
    <>
      <Script
        id="meta-pixel-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
