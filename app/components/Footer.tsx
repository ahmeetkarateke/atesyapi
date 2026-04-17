import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <span className="text-[#FBBF24] font-bold text-2xl tracking-tight">
                Ateş<span className="text-white">Yapı</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              25 yılı aşkın deneyimimizle altyapı, üstyapı ve mimari projelerinizde
              güvenilir ve kaliteli çözümler sunuyoruz.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-base">Hızlı Bağlantılar</h3>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/', label: 'Ana Sayfa' },
                { href: '/hizmetlerimiz', label: 'Hizmetlerimiz' },
                { href: '/projelerimiz', label: 'Projelerimiz' },
                { href: '/hakkimizda', label: 'Hakkımızda' },
                { href: '/iletisim', label: 'İletişim' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-[#FBBF24] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-base">İletişim</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <p>Merkez Mah. İnşaat Cad. No:1</p>
              <p>İstanbul, Türkiye</p>
              <p className="mt-1">
                <a href="tel:+902121234567" className="hover:text-[#FBBF24] transition-colors">
                  +90 (212) 123 45 67
                </a>
              </p>
              <p>
                <a href="mailto:info@atesyapi.com" className="hover:text-[#FBBF24] transition-colors">
                  info@atesyapi.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} AtesYapı İnşaat. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
