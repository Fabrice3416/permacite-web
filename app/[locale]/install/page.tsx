import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link2, Puzzle, ArrowRight, Clock } from 'lucide-react'
import LocaleSwitcher from '@/components/locale-switcher'

export default function InstallPage() {
  const t = useTranslations('install')
  const n = useTranslations('nav')

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-navy">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy">
              <Link2 className="h-4 w-4 text-yellow-400" />
            </div>
            Permacite
          </Link>
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <Link href="/login" className={cn(buttonVariants({ size: 'sm' }), 'bg-navy text-white hover:bg-navy/90')}>
              {n('signin')} <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
          <Puzzle className="h-8 w-8 text-gray-400" />
        </div>

        <div className="mb-2 flex items-center justify-center gap-2">
          <Clock className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-semibold uppercase tracking-widest text-yellow-500">
            {t('badge')}
          </span>
        </div>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-navy">
          {t('title')}
        </h1>
        <p className="mb-8 max-w-md text-lg leading-relaxed text-gray-500">
          {t('sub')}
        </p>

        <Link
          href="/login"
          className={cn(buttonVariants({ size: 'lg' }), 'bg-navy text-white hover:bg-navy/90')}
        >
          {t('cta')} <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        <p className="mt-4 text-sm text-gray-400">{t('cta_note')}</p>
      </div>

    </div>
  )
}
