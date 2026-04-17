"use client"
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

declare global {
  function gtag(...args: unknown[]): void
}

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof gtag !== 'undefined') {
      gtag('config', measurementId, { page_path: pathname })
    }
  }, [pathname, measurementId])

  if (!measurementId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}');
      `}</Script>
    </>
  )
}
