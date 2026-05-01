import { MetadataRoute } from 'next'
import { SITE_CONFIG, NAV_LINKS } from '@/lib/utils/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = NAV_LINKS.map((link) => ({
    url: `${SITE_CONFIG.url}${link.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: link.href === '/' ? 1 : 0.8,
  }))

  return [
    ...routes,
  ]
}
