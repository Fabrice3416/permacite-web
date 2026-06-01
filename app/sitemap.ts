import type { MetadataRoute } from 'next'

const BASE = 'https://permacite-web-mpqx.vercel.app'
const locales = ['en', 'fr', 'es'] as const

function localePath(locale: string, path: string) {
  return locale === 'en' ? path || '/' : `/${locale}${path}`
}

const pages = [
  { path: '',         priority: 1.0, freq: 'weekly'  },
  { path: '/install', priority: 0.9, freq: 'monthly' },
  { path: '/pricing', priority: 0.8, freq: 'monthly' },
  { path: '/login',   priority: 0.6, freq: 'yearly'  },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority, freq }) =>
    locales.map(locale => ({
      url: `${BASE}${localePath(locale, path)}`,
      lastModified: new Date(),
      changeFrequency: freq,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `${BASE}${localePath(l, path)}`])
        ),
      },
    }))
  )
}
