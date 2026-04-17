export const revalidate = 3600

import Image from 'next/image'
import Link from 'next/link'
import { getHomepageContent } from '@/lib/siteContent'

const serviceIcons = [
  <svg key="altyard" className="w-10 h-10 text-[#FBBF24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>,
  <svg key="ustyapi" className="w-10 h-10 text-[#FBBF24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>,
  <svg key="mimari" className="w-10 h-10 text-[#FBBF24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
  </svg>,
]

export default async function HomePage() {
  const content = await getHomepageContent()

  return (
    <>
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src={content.heroImageUrl || '/images/hero.jpg'}
          alt="AtesYapı Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {content.heroTitle}
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            {content.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projelerimiz"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#FBBF24] text-[#1F2937] font-semibold rounded text-sm sm:text-base hover:bg-yellow-300 transition-colors duration-200"
            >
              {content.ctaPrimary}
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white text-white font-semibold rounded text-sm sm:text-base hover:bg-white hover:text-[#1F2937] transition-colors duration-200"
            >
              {content.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">Hizmetlerimiz</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{content.servicesSectionSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.services.map((service, i) => (
              <div
                key={service.title}
                className="bg-gray-50 rounded-xl p-8 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div>{serviceIcons[i]}</div>
                <h3 className="text-xl font-bold text-[#1F2937]">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#1F2937]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Neden Biz?</h2>
            <p className="text-gray-400 max-w-xl mx-auto">{content.statsSectionSubtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-extrabold text-[#FBBF24] mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-300 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
