'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { initPixel, trackPageView } from '@/lib/meta-pixel'

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''

/**
 * Meta Pixel component — loads the fbevents.js script and tracks page views
 * Place this in the root layout to enable tracking across all pages
 */
export default function MetaPixel() {
  const pathname = usePathname()

  // Track page views on route changes
  useEffect(() => {
    if (PIXEL_ID) {
      trackPageView()
    }
  }, [pathname])

  // Don't render anything if Pixel ID is not configured
  if (!PIXEL_ID) {
    return null
  }

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      onLoad={() => initPixel()}
      src={`https://connect.facebook.net/en_US/fbevents.js`}
    />
  )
}
