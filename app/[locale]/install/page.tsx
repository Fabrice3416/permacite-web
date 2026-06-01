import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link2, Download, ArrowRight } from 'lucide-react'
import LocaleSwitcher from '@/components/locale-switcher'

export default function InstallPage() {
  const t = useTranslations('install')
  const n = useTranslations('nav')

  const steps = [
    { n: '01', title: t('step1_title'), desc: t('step1_desc'), code: null },
    { n: '02', title: t('step2_title'), desc: t('step2_desc'), code: null },
    { n: '03', title: t('step3_title'), desc: t('step3_desc'), code: 'chrome://extensions' },
    { n: '04', title: t('step4_title'), desc: t('step4_desc'), code: null },
    { n: '05', title: t('step5_title'), desc: t('step5_desc'), code: null },
    { n: '06', title: t('step6_title'), desc: t('step6_desc'), code: null },
  ]

  return (
    <div className="min-h-screen bg-white font-sans">

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
            <Link href="/login" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'border-gray-200 text-navy')}>
              {n('signin')}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-2xl px-6 pb-12 pt-16 text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy">
          <Download className="h-6 w-6 text-yellow-400" />
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-navy">{t('title')}</h1>
        <p className="mb-8 text-lg leading-relaxed text-gray-500">{t('sub')}</p>
        <a
          href="/permacite-extension.zip"
          download="permacite-extension.zip"
          className={cn(buttonVariants({ size: 'lg' }), 'bg-navy text-white hover:bg-navy/90')}
        >
          <Download className="mr-2 h-4 w-4" />
          {t('download_btn')}
        </a>
        <p className="mt-3 text-sm text-gray-400">{t('download_note')}</p>
      </section>

      {/* Steps */}
      <section className="border-t border-gray-100 bg-gray-50 py-16">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-10 text-center text-2xl font-bold text-navy">{t('steps_title')}</h2>
          <ol className="space-y-6">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-black text-yellow-400">
                  {s.n}
                </div>
                <div className="pt-1">
                  <p className="font-semibold text-navy">{s.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-gray-500">{s.desc}</p>
                  {s.code && (
                    <code className="mt-2 inline-block rounded bg-gray-200 px-2 py-0.5 text-sm font-mono text-gray-700">
                      {s.code}
                    </code>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* After install CTA */}
      <section className="py-16 text-center">
        <p className="mb-4 text-gray-500">{t('after_title')}</p>
        <Link
          href="/login"
          className={cn(buttonVariants({ size: 'lg' }), 'bg-navy text-white hover:bg-navy/90')}
        >
          {t('after_cta')} <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </section>

    </div>
  )
}
