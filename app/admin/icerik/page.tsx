'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type {
  HomepageContent,
  AboutContent,
  ServicesContent,
  ContactContent,
} from '@/lib/siteContent'

type Tab = 'homepage' | 'about' | 'services' | 'contact'

const defaultHomepage: HomepageContent = {
  heroTitle: 'Hayallerinizi Sağlam Temeller Üzerine İnşa Ediyoruz',
  heroSubtitle:
    '25 yıllık deneyimimizle altyapı, üstyapı ve mimari projelerinizde güvenilir çözümler sunuyoruz.',
  heroImageUrl: '',
  ctaPrimary: 'Projeleri İncele',
  ctaSecondary: 'Teklif Al',
  servicesSectionSubtitle:
    'Uzman kadromuz ve modern ekipmanlarımızla her ölçekte projeye çözüm üretiyoruz.',
  services: [
    { title: 'Altyapı', description: 'Yol, köprü, tünel ve drenaj sistemleri dahil tüm altyapı projelerinde uzman mühendislik hizmetleri sunuyoruz.' },
    { title: 'Üstyapı', description: 'Konut, ticari ve endüstriyel yapılar için modern inşaat teknolojileri ile güvenli, dayanıklı yapılar inşa ediyoruz.' },
    { title: 'Mimari', description: 'Estetik ve işlevselliği buluşturan özgün mimari tasarımlar ile hayalinizdeki mekanları hayata geçiriyoruz.' },
  ],
  statsSectionSubtitle: 'Rakamlarla kanıtlanmış güven ve kalite.',
  stats: [
    { value: '25+', label: 'Yıl Deneyim' },
    { value: '500+', label: 'Tamamlanan Proje' },
    { value: '50+', label: 'Şehir' },
    { value: '%100', label: 'Müşteri Memnuniyeti' },
  ],
}

const defaultAbout: AboutContent = {
  heroSubtitle: 'Güven, kalite ve yenilik ilkesiyle 25 yıldır inşaat sektörünün öncüsü.',
  storyP1: "AtesYapı, 2000 yılında İstanbul'da küçük bir ekiple kuruldu. Altyapı projelerinde gösterdiğimiz titizlik ve kalite anlayışı sayesinde kısa sürede sektörde önemli bir konuma yükseldik.",
  storyP2: "Bugün 500'den fazla tamamlanan projeyle 50'yi aşkın şehirde izimizi bıraktık. Konut projelerinden büyük altyapı işlerine, mimari tasarımdan kentsel dönüşüme kadar geniş bir yelpazede hizmet veriyoruz.",
  storyP3: 'Temel değerlerimiz güven, şeffaflık ve kalitedir. Her projede teslim tarihine ve bütçeye sadık kalarak müşterilerimizin beklentilerini aşmayı hedefliyoruz.',
  vision: "Türkiye'nin en güvenilir inşaat firması olarak uluslararası arenada da lider konumda yer almak.",
  mission: 'Kaliteli malzeme, uzman kadro ve çevre dostu uygulamalarla insanların hayatına değer katan yapılar inşa etmek.',
  timeline: [
    { year: '2000', event: "AtesYapı İstanbul'da kuruldu. İlk altyapı projesine imza atıldı." },
    { year: '2005', event: 'Üstyapı bölümü oluşturuldu. İlk büyük konut projesi tamamlandı.' },
    { year: '2010', event: 'Mimari departmanı kurularak lüks villa projeleri başlatıldı.' },
    { year: '2015', event: 'ISO 9001 Kalite Yönetim Sistemi sertifikası alındı. 50 şehre ulaşıldı.' },
    { year: '2020', event: 'Dijital dönüşüm projesi hayata geçirildi. 500. proje tamamlandı.' },
    { year: '2025', event: 'Sürdürülebilir yapı sertifikası kazanıldı. Uluslararası projelere adım atıldı.' },
  ],
  certificates: [
    'ISO 9001:2015 Kalite Yönetim Sistemi',
    'ISO 14001:2015 Çevre Yönetim Sistemi',
    'OHSAS 18001 İş Sağlığı ve Güvenliği',
    'TSE Hizmet Yeterlilik Belgesi',
    'Yeşil Bina Sertifikası (LEED)',
    'CE Uygunluk Belgesi',
  ],
}

const defaultServices: ServicesContent = {
  heroSubtitle: '25 yılı aşkın tecrübemiz ve uzman kadromuzla her ölçekte projeye kapsamlı çözümler sunuyoruz.',
  items: [
    {
      title: 'Altyapı',
      description: 'Yol yapımı, köprü inşası, tünel projeleri ve drenaj sistemleri gibi kapsamlı altyapı çalışmalarında deneyimli mühendis kadromuz ile hizmet veriyoruz.',
      details: ['Yol ve otoyol yapımı', 'Köprü ve viyadük inşası', 'Tünel projeleri', 'Drenaj ve kanalizasyon sistemleri', 'Baraj ve su yapıları', 'Liman ve iskele projeleri'],
    },
    {
      title: 'Üstyapı',
      description: 'Konut, ticari bina, endüstriyel tesis ve kamu yapıları inşaatında en güncel teknoloji ve malzemelerle güvenli, uzun ömürlü yapılar inşa ediyoruz.',
      details: ['Konut ve rezidans projeleri', 'Ticari bina ve AVM inşaatı', 'Endüstriyel tesis ve fabrika yapıları', 'Kamu binaları ve okul projeleri', 'Hastane ve sağlık tesisleri', 'Depo ve lojistik merkezleri'],
    },
    {
      title: 'Mimari',
      description: 'İşlevsellik ile estetiği harmanlayan özgün tasarım anlayışımızla lüks villalardan kentsel dönüşüm projelerine kadar her ölçekte mimari hizmet sunuyoruz.',
      details: ['Lüks villa ve konut tasarımı', 'İç mimari ve dekorasyon', 'Peyzaj ve çevre düzenlemesi', 'Kentsel dönüşüm projeleri', 'Restorasyon ve renovasyon', 'Enerji verimli yapı tasarımı'],
    },
  ],
}

const defaultContact: ContactContent = {
  address: 'Merkez Mah. İnşaat Cad. No:1\nKadıköy, İstanbul, Türkiye',
  phone: '+90 (212) 123 45 67',
  email: 'info@atesyapi.com',
}

const inputClass =
  'w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FBBF24] focus:border-transparent transition text-sm'
const textareaClass = inputClass + ' resize-none'
const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'
const sectionTitle = 'text-base font-bold text-[#1F2937] mb-4 mt-6 border-b border-gray-200 pb-2'

export default function IcerikYonetimiPage() {
  const [activeTab, setActiveTab] = useState<Tab>('homepage')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedTab, setSavedTab] = useState<Tab | null>(null)

  const [homepage, setHomepage] = useState<HomepageContent>(defaultHomepage)
  const [about, setAbout] = useState<AboutContent>(defaultAbout)
  const [services, setServices] = useState<ServicesContent>(defaultServices)
  const [contact, setContact] = useState<ContactContent>(defaultContact)

  useEffect(() => {
    const load = async () => {
      const [hpSnap, abSnap, svSnap, ctSnap] = await Promise.all([
        getDoc(doc(db, 'site_content', 'homepage')),
        getDoc(doc(db, 'site_content', 'about')),
        getDoc(doc(db, 'site_content', 'services')),
        getDoc(doc(db, 'site_content', 'contact')),
      ])
      if (hpSnap.exists()) setHomepage({ ...defaultHomepage, ...hpSnap.data() } as HomepageContent)
      if (abSnap.exists()) setAbout({ ...defaultAbout, ...abSnap.data() } as AboutContent)
      if (svSnap.exists()) setServices({ ...defaultServices, ...svSnap.data() } as ServicesContent)
      if (ctSnap.exists()) setContact({ ...defaultContact, ...ctSnap.data() } as ContactContent)
      setLoading(false)
    }
    load()
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      if (activeTab === 'homepage') await setDoc(doc(db, 'site_content', 'homepage'), homepage)
      if (activeTab === 'about') await setDoc(doc(db, 'site_content', 'about'), about)
      if (activeTab === 'services') await setDoc(doc(db, 'site_content', 'services'), services)
      if (activeTab === 'contact') await setDoc(doc(db, 'site_content', 'contact'), contact)
      setSavedTab(activeTab)
      setTimeout(() => setSavedTab(null), 2500)
    } finally {
      setSaving(false)
    }
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'homepage', label: 'Ana Sayfa' },
    { key: 'about', label: 'Hakkımızda' },
    { key: 'services', label: 'Hizmetlerimiz' },
    { key: 'contact', label: 'İletişim' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <a href="/admin/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">
            ← Panele Dön
          </a>
          <h1 className="text-xl font-bold">İçerik Yönetimi</h1>
        </div>
        {savedTab === activeTab && (
          <span className="bg-green-500 text-white text-sm font-medium px-4 py-1.5 rounded-full">
            Kaydedildi!
          </span>
        )}
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border ${
                activeTab === tab.key
                  ? 'bg-yellow-400 text-gray-900 border-yellow-400'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          {activeTab === 'homepage' && (
            <div>
              <p className={sectionTitle}>Hero Bölümü</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Ana Başlık</label>
                  <input className={inputClass} value={homepage.heroTitle} onChange={(e) => setHomepage((p) => ({ ...p, heroTitle: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Alt Başlık</label>
                  <textarea rows={2} className={textareaClass} value={homepage.heroSubtitle} onChange={(e) => setHomepage((p) => ({ ...p, heroSubtitle: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Hero Görsel URL&apos;i</label>
                  <input className={inputClass} placeholder="https://..." value={homepage.heroImageUrl} onChange={(e) => setHomepage((p) => ({ ...p, heroImageUrl: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Birincil Buton</label>
                    <input className={inputClass} value={homepage.ctaPrimary} onChange={(e) => setHomepage((p) => ({ ...p, ctaPrimary: e.target.value }))} />
                  </div>
                  <div>
                    <label className={labelClass}>İkincil Buton</label>
                    <input className={inputClass} value={homepage.ctaSecondary} onChange={(e) => setHomepage((p) => ({ ...p, ctaSecondary: e.target.value }))} />
                  </div>
                </div>
              </div>

              <p className={sectionTitle}>Hizmetler Bölümü</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Alt Yazı</label>
                  <textarea rows={2} className={textareaClass} value={homepage.servicesSectionSubtitle} onChange={(e) => setHomepage((p) => ({ ...p, servicesSectionSubtitle: e.target.value }))} />
                </div>
                {homepage.services.map((svc, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                    <p className="text-sm font-semibold text-gray-600 mb-3">Hizmet {i + 1}</p>
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className={labelClass}>Başlık</label>
                        <input className={inputClass} value={svc.title} onChange={(e) => {
                          const updated = [...homepage.services]
                          updated[i] = { ...updated[i], title: e.target.value }
                          setHomepage((p) => ({ ...p, services: updated }))
                        }} />
                      </div>
                      <div>
                        <label className={labelClass}>Açıklama</label>
                        <textarea rows={2} className={textareaClass} value={svc.description} onChange={(e) => {
                          const updated = [...homepage.services]
                          updated[i] = { ...updated[i], description: e.target.value }
                          setHomepage((p) => ({ ...p, services: updated }))
                        }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className={sectionTitle}>İstatistikler Bölümü</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Alt Yazı</label>
                  <textarea rows={2} className={textareaClass} value={homepage.statsSectionSubtitle} onChange={(e) => setHomepage((p) => ({ ...p, statsSectionSubtitle: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {homepage.stats.map((stat, i) => (
                    <div key={i} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                      <p className="text-sm font-semibold text-gray-600 mb-3">İstatistik {i + 1}</p>
                      <div className="flex flex-col gap-2">
                        <div>
                          <label className={labelClass}>Değer</label>
                          <input className={inputClass} value={stat.value} onChange={(e) => {
                            const updated = [...homepage.stats]
                            updated[i] = { ...updated[i], value: e.target.value }
                            setHomepage((p) => ({ ...p, stats: updated }))
                          }} />
                        </div>
                        <div>
                          <label className={labelClass}>Etiket</label>
                          <input className={inputClass} value={stat.label} onChange={(e) => {
                            const updated = [...homepage.stats]
                            updated[i] = { ...updated[i], label: e.target.value }
                            setHomepage((p) => ({ ...p, stats: updated }))
                          }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div>
              <p className={sectionTitle}>Hero Bölümü</p>
              <div>
                <label className={labelClass}>Alt Yazı</label>
                <textarea rows={2} className={textareaClass} value={about.heroSubtitle} onChange={(e) => setAbout((p) => ({ ...p, heroSubtitle: e.target.value }))} />
              </div>

              <p className={sectionTitle}>Hikayemiz</p>
              <div className="flex flex-col gap-4">
                {(['storyP1', 'storyP2', 'storyP3'] as const).map((key, i) => (
                  <div key={key}>
                    <label className={labelClass}>Paragraf {i + 1}</label>
                    <textarea rows={3} className={textareaClass} value={about[key]} onChange={(e) => setAbout((p) => ({ ...p, [key]: e.target.value }))} />
                  </div>
                ))}
              </div>

              <p className={sectionTitle}>Vizyon & Misyon</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Vizyon</label>
                  <textarea rows={2} className={textareaClass} value={about.vision} onChange={(e) => setAbout((p) => ({ ...p, vision: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Misyon</label>
                  <textarea rows={2} className={textareaClass} value={about.mission} onChange={(e) => setAbout((p) => ({ ...p, mission: e.target.value }))} />
                </div>
              </div>

              <p className={sectionTitle}>Kilometre Taşları</p>
              <div className="flex flex-col gap-3">
                {about.timeline.map((item, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 grid grid-cols-4 gap-3">
                    <div>
                      <label className={labelClass}>Yıl</label>
                      <input className={inputClass} value={item.year} onChange={(e) => {
                        const updated = [...about.timeline]
                        updated[i] = { ...updated[i], year: e.target.value }
                        setAbout((p) => ({ ...p, timeline: updated }))
                      }} />
                    </div>
                    <div className="col-span-3">
                      <label className={labelClass}>Olay</label>
                      <textarea rows={2} className={textareaClass} value={item.event} onChange={(e) => {
                        const updated = [...about.timeline]
                        updated[i] = { ...updated[i], event: e.target.value }
                        setAbout((p) => ({ ...p, timeline: updated }))
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              <p className={sectionTitle}>Sertifikalar</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {about.certificates.map((cert, i) => (
                  <div key={i}>
                    <label className={labelClass}>Sertifika {i + 1}</label>
                    <input className={inputClass} value={cert} onChange={(e) => {
                      const updated = [...about.certificates]
                      updated[i] = e.target.value
                      setAbout((p) => ({ ...p, certificates: updated }))
                    }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <p className={sectionTitle}>Hero Bölümü</p>
              <div>
                <label className={labelClass}>Alt Yazı</label>
                <textarea rows={2} className={textareaClass} value={services.heroSubtitle} onChange={(e) => setServices((p) => ({ ...p, heroSubtitle: e.target.value }))} />
              </div>

              <p className={sectionTitle}>Hizmet Detayları</p>
              <div className="flex flex-col gap-6">
                {services.items.map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                    <p className="text-sm font-bold text-[#1F2937] mb-4">Hizmet {i + 1}</p>
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className={labelClass}>Başlık</label>
                        <input className={inputClass} value={item.title} onChange={(e) => {
                          const updated = [...services.items]
                          updated[i] = { ...updated[i], title: e.target.value }
                          setServices((p) => ({ ...p, items: updated }))
                        }} />
                      </div>
                      <div>
                        <label className={labelClass}>Açıklama</label>
                        <textarea rows={3} className={textareaClass} value={item.description} onChange={(e) => {
                          const updated = [...services.items]
                          updated[i] = { ...updated[i], description: e.target.value }
                          setServices((p) => ({ ...p, items: updated }))
                        }} />
                      </div>
                      <div>
                        <label className={labelClass}>Alt Detaylar (6 madde)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.details.map((detail, j) => (
                            <input key={j} className={inputClass} value={detail} onChange={(e) => {
                              const updated = [...services.items]
                              const details = [...updated[i].details]
                              details[j] = e.target.value
                              updated[i] = { ...updated[i], details }
                              setServices((p) => ({ ...p, items: updated }))
                            }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <p className={sectionTitle}>İletişim Bilgileri</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Adres</label>
                  <textarea rows={2} className={textareaClass} value={contact.address} onChange={(e) => setContact((p) => ({ ...p, address: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Telefon</label>
                  <input className={inputClass} value={contact.phone} onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>E-posta</label>
                  <input type="email" className={inputClass} value={contact.email} onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))} />
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
            {savedTab === activeTab ? (
              <span className="text-green-600 font-medium text-sm">Değişiklikler kaydedildi!</span>
            ) : (
              <span />
            )}
            <button
              onClick={save}
              disabled={saving}
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-2.5 rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
