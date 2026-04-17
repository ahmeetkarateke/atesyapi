import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://atesyapi.com', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://atesyapi.com/hakkimizda', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://atesyapi.com/hizmetlerimiz', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://atesyapi.com/projelerimiz', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://atesyapi.com/iletisim', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
