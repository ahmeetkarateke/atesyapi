import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'

function withTimeout<T>(promise: Promise<T>, ms = 5000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Firebase timeout')), ms)
    ),
  ])
}

export interface HomepageContent {
  heroTitle: string
  heroSubtitle: string
  heroImageUrl: string
  ctaPrimary: string
  ctaSecondary: string
  servicesSectionSubtitle: string
  services: { title: string; description: string }[]
  statsSectionSubtitle: string
  stats: { value: string; label: string }[]
}

export interface AboutContent {
  heroSubtitle: string
  storyP1: string
  storyP2: string
  storyP3: string
  vision: string
  mission: string
  timeline: { year: string; event: string }[]
  certificates: string[]
}

export interface ServicesContent {
  heroSubtitle: string
  items: { title: string; description: string; details: string[] }[]
}

export interface ContactContent {
  address: string
  phone: string
  email: string
}

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
    {
      title: 'Altyapı',
      description:
        'Yol, köprü, tünel ve drenaj sistemleri dahil tüm altyapı projelerinde uzman mühendislik hizmetleri sunuyoruz.',
    },
    {
      title: 'Üstyapı',
      description:
        'Konut, ticari ve endüstriyel yapılar için modern inşaat teknolojileri ile güvenli, dayanıklı yapılar inşa ediyoruz.',
    },
    {
      title: 'Mimari',
      description:
        'Estetik ve işlevselliği buluşturan özgün mimari tasarımlar ile hayalinizdeki mekanları hayata geçiriyoruz.',
    },
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
  storyP1:
    "AtesYapı, 2000 yılında İstanbul'da küçük bir ekiple kuruldu. Altyapı projelerinde gösterdiğimiz titizlik ve kalite anlayışı sayesinde kısa sürede sektörde önemli bir konuma yükseldik.",
  storyP2:
    "Bugün 500'den fazla tamamlanan projeyle 50'yi aşkın şehirde izimizi bıraktık. Konut projelerinden büyük altyapı işlerine, mimari tasarımdan kentsel dönüşüme kadar geniş bir yelpazede hizmet veriyoruz.",
  storyP3:
    'Temel değerlerimiz güven, şeffaflık ve kalitedir. Her projede teslim tarihine ve bütçeye sadık kalarak müşterilerimizin beklentilerini aşmayı hedefliyoruz.',
  vision:
    "Türkiye'nin en güvenilir inşaat firması olarak uluslararası arenada da lider konumda yer almak.",
  mission:
    'Kaliteli malzeme, uzman kadro ve çevre dostu uygulamalarla insanların hayatına değer katan yapılar inşa etmek.',
  timeline: [
    { year: '2000', event: "AtesYapı İstanbul'da kuruldu. İlk altyapı projesine imza atıldı." },
    { year: '2005', event: 'Üstyapı bölümü oluşturuldu. İlk büyük konut projesi tamamlandı.' },
    { year: '2010', event: 'Mimari departmanı kurularak lüks villa projeleri başlatıldı.' },
    {
      year: '2015',
      event: 'ISO 9001 Kalite Yönetim Sistemi sertifikası alındı. 50 şehre ulaşıldı.',
    },
    { year: '2020', event: 'Dijital dönüşüm projesi hayata geçirildi. 500. proje tamamlandı.' },
    {
      year: '2025',
      event: 'Sürdürülebilir yapı sertifikası kazanıldı. Uluslararası projelere adım atıldı.',
    },
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
  heroSubtitle:
    '25 yılı aşkın tecrübemiz ve uzman kadromuzla her ölçekte projeye kapsamlı çözümler sunuyoruz.',
  items: [
    {
      title: 'Altyapı',
      description:
        'Yol yapımı, köprü inşası, tünel projeleri ve drenaj sistemleri gibi kapsamlı altyapı çalışmalarında deneyimli mühendis kadromuz ile hizmet veriyoruz.',
      details: [
        'Yol ve otoyol yapımı',
        'Köprü ve viyadük inşası',
        'Tünel projeleri',
        'Drenaj ve kanalizasyon sistemleri',
        'Baraj ve su yapıları',
        'Liman ve iskele projeleri',
      ],
    },
    {
      title: 'Üstyapı',
      description:
        'Konut, ticari bina, endüstriyel tesis ve kamu yapıları inşaatında en güncel teknoloji ve malzemelerle güvenli, uzun ömürlü yapılar inşa ediyoruz.',
      details: [
        'Konut ve rezidans projeleri',
        'Ticari bina ve AVM inşaatı',
        'Endüstriyel tesis ve fabrika yapıları',
        'Kamu binaları ve okul projeleri',
        'Hastane ve sağlık tesisleri',
        'Depo ve lojistik merkezleri',
      ],
    },
    {
      title: 'Mimari',
      description:
        'İşlevsellik ile estetiği harmanlayan özgün tasarım anlayışımızla lüks villalardan kentsel dönüşüm projelerine kadar her ölçekte mimari hizmet sunuyoruz.',
      details: [
        'Lüks villa ve konut tasarımı',
        'İç mimari ve dekorasyon',
        'Peyzaj ve çevre düzenlemesi',
        'Kentsel dönüşüm projeleri',
        'Restorasyon ve renovasyon',
        'Enerji verimli yapı tasarımı',
      ],
    },
  ],
}

const defaultContact: ContactContent = {
  address: 'Merkez Mah. İnşaat Cad. No:1\nKadıköy, İstanbul, Türkiye',
  phone: '+90 (212) 123 45 67',
  email: 'info@atesyapi.com',
}

export async function getHomepageContent(): Promise<HomepageContent> {
  try {
    const snap = await withTimeout(getDoc(doc(db, 'site_content', 'homepage')))
    if (!snap.exists()) return defaultHomepage
    const data = snap.data()
    return {
      heroTitle: data.heroTitle || defaultHomepage.heroTitle,
      heroSubtitle: data.heroSubtitle || defaultHomepage.heroSubtitle,
      heroImageUrl: data.heroImageUrl || defaultHomepage.heroImageUrl,
      ctaPrimary: data.ctaPrimary || defaultHomepage.ctaPrimary,
      ctaSecondary: data.ctaSecondary || defaultHomepage.ctaSecondary,
      servicesSectionSubtitle:
        data.servicesSectionSubtitle || defaultHomepage.servicesSectionSubtitle,
      services:
        Array.isArray(data.services) && data.services.length > 0
          ? data.services
          : defaultHomepage.services,
      statsSectionSubtitle: data.statsSectionSubtitle || defaultHomepage.statsSectionSubtitle,
      stats:
        Array.isArray(data.stats) && data.stats.length > 0 ? data.stats : defaultHomepage.stats,
    }
  } catch {
    return defaultHomepage
  }
}

export async function getAboutContent(): Promise<AboutContent> {
  try {
    const snap = await withTimeout(getDoc(doc(db, 'site_content', 'about')))
    if (!snap.exists()) return defaultAbout
    const data = snap.data()
    return {
      heroSubtitle: data.heroSubtitle || defaultAbout.heroSubtitle,
      storyP1: data.storyP1 || defaultAbout.storyP1,
      storyP2: data.storyP2 || defaultAbout.storyP2,
      storyP3: data.storyP3 || defaultAbout.storyP3,
      vision: data.vision || defaultAbout.vision,
      mission: data.mission || defaultAbout.mission,
      timeline:
        Array.isArray(data.timeline) && data.timeline.length > 0
          ? data.timeline
          : defaultAbout.timeline,
      certificates:
        Array.isArray(data.certificates) && data.certificates.length > 0
          ? data.certificates
          : defaultAbout.certificates,
    }
  } catch {
    return defaultAbout
  }
}

export async function getServicesContent(): Promise<ServicesContent> {
  try {
    const snap = await withTimeout(getDoc(doc(db, 'site_content', 'services')))
    if (!snap.exists()) return defaultServices
    const data = snap.data()
    return {
      heroSubtitle: data.heroSubtitle || defaultServices.heroSubtitle,
      items:
        Array.isArray(data.items) && data.items.length > 0 ? data.items : defaultServices.items,
    }
  } catch {
    return defaultServices
  }
}

export async function getContactContent(): Promise<ContactContent> {
  try {
    const snap = await withTimeout(getDoc(doc(db, 'site_content', 'contact')))
    if (!snap.exists()) return defaultContact
    const data = snap.data()
    return {
      address: data.address || defaultContact.address,
      phone: data.phone || defaultContact.phone,
      email: data.email || defaultContact.email,
    }
  } catch {
    return defaultContact
  }
}
