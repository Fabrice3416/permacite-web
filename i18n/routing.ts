import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'fr', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' // /fr/... but / stays English (better for SEO)
})
