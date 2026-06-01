import type { Metadata } from 'next'
import { Suspense } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Link2, ArrowLeft } from 'lucide-react'
import LocaleSwitcher from '@/components/locale-switcher'
import LoginForm from './login-form'
import { buildMetadata } from '@/lib/page-metadata'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(locale, 'login_title', 'login_desc', '/login', {
    robots: { index: false, follow: false },
  })
}

export default function LoginPage() {
  const t = useTranslations('login')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="mb-6 flex w-full max-w-sm items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-navy"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t('back')}
        </Link>
        <LocaleSwitcher />
      </div>

      <div className="mb-6 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy">
          <Link2 className="h-4 w-4 text-yellow-400" />
        </div>
        <span className="text-lg font-bold text-navy">Permacite</span>
      </div>

      <Card className="w-full max-w-sm border-gray-200 shadow-sm">
        <Suspense fallback={
          <CardContent className="space-y-4 py-6">
            <div className="h-5 w-40 rounded bg-gray-100" />
            <div className="h-4 w-56 rounded bg-gray-100" />
            <div className="h-10 rounded bg-gray-100" />
            <div className="h-10 rounded bg-gray-100" />
          </CardContent>
        }>
          <LoginForm />
        </Suspense>
      </Card>

      <p className="mt-6 text-center text-xs text-gray-400">{t('terms_notice')}</p>
    </div>
  )
}
