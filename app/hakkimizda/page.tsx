export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getAboutContent } from '@/lib/siteContent'

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description:
    "AtesYapı'nın kuruluş hikayesi, vizyon ve misyonu, kilometre taşları ve kalite belgelerimiz hakkında bilgi alın.",
}

export default async function HakkimizdaPage() {
  const content = await getAboutContent()

  return (
    <>
      <section className="bg-[#1F2937] py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Hakkımızda</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{content.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#1F2937] mb-6">Hikayemiz</h2>
            <div className="flex flex-col gap-4 text-gray-500 leading-relaxed">
              <p>{content.storyP1}</p>
              <p>{content.storyP2}</p>
              <p>{content.storyP3}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-10 border border-gray-100 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="w-1 h-12 bg-[#FBBF24] rounded-full" />
              <div>
                <h3 className="text-lg font-bold text-[#1F2937]">Vizyonumuz</h3>
                <p className="text-gray-500 text-sm mt-1">{content.vision}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-1 h-12 bg-[#FBBF24] rounded-full" />
              <div>
                <h3 className="text-lg font-bold text-[#1F2937]">Misyonumuz</h3>
                <p className="text-gray-500 text-sm mt-1">{content.mission}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1F2937] text-center mb-14">
            Kilometre Taşlarımız
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
            <div className="flex flex-col gap-10">
              {content.timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div
                    className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                  >
                    <p className="text-gray-500 text-sm leading-relaxed">{item.event}</p>
                  </div>
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-[#1F2937] border-4 border-[#FBBF24] flex items-center justify-center">
                    <span className="text-[#FBBF24] font-bold text-xs">{item.year}</span>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1F2937] text-center mb-4">
            Kalite Sertifikalarımız
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            Ulusal ve uluslararası standartları karşılayan sertifikalarımız kalitemizin belgesidir.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {content.certificates.map((cert) => (
              <div
                key={cert}
                className="bg-gray-50 rounded-xl border border-gray-200 p-6 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#FBBF24]/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-[#FBBF24]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <p className="text-[#1F2937] font-medium text-sm">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
