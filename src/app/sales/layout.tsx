'use client'

import { useEffect } from 'react'

/**
 * Sales funnel layout — hides the global Header and Footer
 * so the sale page is a distraction-free landing page.
 * Only the sale page content + its own sticky header/CTA are visible.
 */
export default function SalesLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hide the global header and footer for funnel pages
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')

    if (header) header.style.display = 'none'
    if (footer) footer.style.display = 'none'

    return () => {
      // Restore when navigating away
      if (header) header.style.display = ''
      if (footer) footer.style.display = ''
    }
  }, [])

  return <>{children}</>
}
