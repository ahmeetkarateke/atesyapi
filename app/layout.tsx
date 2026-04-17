import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import GoogleAnalytics from '@/app/components/GoogleAnalytics'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: { default: 'AtesYapi | Güvenilir İnşaat Çözümleri', template: '%s | AtesYapi' },
  description: 'Altyapı, üstyapı ve mimari alanında 25 yıllık deneyimiyle güvenilir inşaat çözümleri sunan AtesYapi.',
  keywords: ['inşaat', 'altyapı', 'üstyapı', 'mimari', 'villa', 'renovasyon'],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'AtesYapi',
    title: 'AtesYapi | Güvenilir İnşaat Çözümleri',
    description: 'Altyapı, üstyapı ve mimari alanında 25 yıllık deneyimiyle güvenilir inşaat çözümleri.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
      </body>
    </html>
  )
}
