import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { routing } from '@/i18n/routing'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'fr' | 'es')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
      {process.env.NEXT_PUBLIC_POSTHOG_KEY && (
        <Script
          id="posthog"
          strategy="afterInteractive"
          src="https://us-assets.i.posthog.com/static/array.js"
          data-key={process.env.NEXT_PUBLIC_POSTHOG_KEY}
          data-host="https://us.i.posthog.com"
        />
      )}
    </>
  )
}
