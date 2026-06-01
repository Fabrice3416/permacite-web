import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

const BASE = 'https://permacite-web-mpqx.vercel.app'

function localePath(locale: string, path = '') {
  return locale === 'en' ? path || '/' : `/${locale}${path}`
}

function hreflang(path = '') {
  return {
    en: `${BASE}${localePath('en', path)}`,
    fr: `${BASE}${localePath('fr', path)}`,
    es: `${BASE}${localePath('es', path)}`,
    'x-default': `${BASE}${localePath('en', path)}`,
  }
}

export async function buildMetadata(
  locale: string,
  titleKey: string,
  descKey: string,
  path = '',
  extra: Partial<Metadata> = {}
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' })
  const title = t(titleKey as Parameters<typeof t>[0])
  const description = t(descKey as Parameters<typeof t>[0])
  const url = `${BASE}${localePath(locale, path)}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: hreflang(path),
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
    twitter: {
      title,
      description,
    },
    ...extra,
  }
}
