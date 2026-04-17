import { getContactContent } from '@/lib/siteContent'
import ContactForm from './ContactForm'

export default async function IletisimPage() {
  const contact = await getContactContent()

  return (
    <>
      <section className="bg-[#1F2937] py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">İletişim</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Projeniz için teklif almak veya bilgi edinmek ister misiniz? Bize ulaşın.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <ContactForm
          address={contact.address}
          phone={contact.phone}
          email={contact.email}
        />
      </section>
    </>
  )
}
