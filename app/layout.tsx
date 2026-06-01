import type { Metadata } from 'next'
import './globals.css'
import { Geist } from "next/font/google"
import { cn } from "@/lib/utils"
import { getLocale } from 'next-intl/server'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: {
    default: 'Permacite — Your sources, permanent forever.',
    template: '%s | Permacite'
  },
  description: 'Archive your research sources the moment you cite them. Never lose a broken link again.',
  metadataBase: new URL('https://permacite-web-mpqx.vercel.app'),
  openGraph: {
    siteName: 'Permacite',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  return (
    <html lang={locale} className={cn("font-sans", geist.variable)}>
      <body className="m-0 antialiased">
        {children}
      </body>
    </html>
  )
}
