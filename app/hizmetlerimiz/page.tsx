import type { Metadata } from 'next'
import { getServicesContent } from '@/lib/siteContent'

export const metadata: Metadata = {
  title: 'Hizmetlerimiz',
  description:
    'AtesYapı olarak altyapı, üstyapı ve mimari alanlarında kapsamlı inşaat hizmetleri sunuyoruz.',
}

const serviceIcons = [
  <svg key="altyapi" className="w-14 h-14 text-[#FBBF24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>,
  <svg key="ustyapi" className="w-14 h-14 text-[#FBBF24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>,
  <svg key="mimari" className="w-14 h-14 text-[#FBBF24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
  </svg>,
]

export default async function HizmetlerimizPage() {
  const content = await getServicesContent()

  return (
    <>
      <section className="bg-[#1F2937] py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Hizmetlerimiz</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{content.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          {content.items.map((service, index) => (
            <div
              key={service.title}
              className={`flex flex-col md:flex-row gap-10 items-start ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-shrink-0 bg-gray-50 rounded-2xl p-10 flex items-center justify-center w-full md:w-64 h-48 border border-gray-100">
                {serviceIcons[index]}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-4">
                  {service.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6">{service.description}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.details.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-[#FBBF24] rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
