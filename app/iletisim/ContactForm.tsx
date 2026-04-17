'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Props {
  address: string
  phone: string
  email: string
}

export default function ContactForm({ address, phone, email }: Props) {
  const [formData, setFormData] = useState({
    adSoyad: '',
    email: '',
    telefon: '',
    mesaj: '',
  })
  const [sending, setSending] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    try {
      await addDoc(collection(db, 'messages'), {
        name: formData.adSoyad,
        email: formData.email,
        phone: formData.telefon,
        message: formData.mesaj,
        sentAt: serverTimestamp(),
        read: false,
      })
      setFormData({ adSoyad: '', email: '', telefon: '', mesaj: '' })
      alert('Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.')
    } catch {
      alert('Mesaj gönderilemedi. Lütfen tekrar deneyin.')
    } finally {
      setSending(false)
    }
  }

  const addressLines = address.split('\n')

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
      <div>
        <h2 className="text-2xl font-bold text-[#1F2937] mb-8">Bize Yazın</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="adSoyad" className="block text-sm font-medium text-gray-700 mb-1.5">
              Ad Soyad
            </label>
            <input
              id="adSoyad"
              name="adSoyad"
              type="text"
              required
              value={formData.adSoyad}
              onChange={handleChange}
              placeholder="Adınız ve soyadınız"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FBBF24] focus:border-transparent transition text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="ornek@email.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FBBF24] focus:border-transparent transition text-sm"
            />
          </div>
          <div>
            <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1.5">
              Telefon
            </label>
            <input
              id="telefon"
              name="telefon"
              type="tel"
              value={formData.telefon}
              onChange={handleChange}
              placeholder="+90 5XX XXX XX XX"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FBBF24] focus:border-transparent transition text-sm"
            />
          </div>
          <div>
            <label htmlFor="mesaj" className="block text-sm font-medium text-gray-700 mb-1.5">
              Mesaj
            </label>
            <textarea
              id="mesaj"
              name="mesaj"
              required
              rows={5}
              value={formData.mesaj}
              onChange={handleChange}
              placeholder="Projeniz hakkında kısa bilgi verin..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FBBF24] focus:border-transparent transition text-sm resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full py-3.5 bg-[#FBBF24] text-[#1F2937] font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
          >
            {sending ? 'Gönderiliyor...' : 'Mesaj Gönder'}
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold text-[#1F2937] mb-6">İletişim Bilgileri</h2>
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FBBF24]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-[#FBBF24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#1F2937] text-sm">Adres</p>
                <p className="text-gray-500 text-sm mt-1">
                  {addressLines.map((line, i) => (
                    <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FBBF24]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-[#FBBF24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#1F2937] text-sm">Telefon</p>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-gray-500 text-sm mt-1 hover:text-[#FBBF24] transition-colors block">
                  {phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FBBF24]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-[#FBBF24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#1F2937] text-sm">E-posta</p>
                <a href={`mailto:${email}`} className="text-gray-500 text-sm mt-1 hover:text-[#FBBF24] transition-colors block">
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-gray-200 h-64 lg:h-80">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.6720541924!2d29.02820!3d41.01055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ccf6f96db1b7e3!2sKad%C4%B1k%C3%B6y%2C%20%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="AtesYapı Konum"
          />
        </div>
      </div>
    </div>
  )
}
