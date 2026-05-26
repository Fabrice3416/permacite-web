import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Archive, FileText, Link2, Globe, ArrowRight, Check } from 'lucide-react'
import LocaleSwitcher from '@/components/locale-switcher'

const EXTENSION_URL = '#' // TODO: replace with Chrome Web Store URL

export default function HomePage() {
  const t = useTranslations('home')
  const n = useTranslations('nav')

  const steps = [
    { n: '01', title: t('step1_title'), desc: t('step1_desc') },
    { n: '02', title: t('step2_title'), desc: t('step2_desc') },
    { n: '03', title: t('step3_title'), desc: t('step3_desc') },
  ]

  const features = [
    { icon: Archive, title: t('feat1_title'), desc: t('feat1_desc') },
    { icon: FileText, title: t('feat2_title'), desc: t('feat2_desc') },
    { icon: Link2, title: t('feat3_title'), desc: t('feat3_desc') },
    { icon: Globe, title: t('feat4_title'), desc: t('feat4_desc') },
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
          <nav className="flex items-center gap-4">
            <LocaleSwitcher />
            <Link href="/pricing" className="text-sm text-gray-500 transition-colors hover:text-navy">
              {n('pricing')}
            </Link>
            <Link href="/login" className={cn(buttonVariants({ size: 'sm' }), 'bg-navy text-white hover:bg-navy-light')}>
              {n('signin')} <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center">
        <Badge variant="outline" className="mb-6 border-yellow-300 bg-yellow-50 text-yellow-700">
          {t('badge')}
        </Badge>
        <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-navy lg:text-6xl">
          {t('hero_title')}<br />
          <span className="text-yellow-500">{t('hero_accent')}</span>
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
          {t('hero_sub')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={EXTENSION_URL} className={cn(buttonVariants({ size: 'lg' }), 'bg-navy text-white hover:bg-navy-light')}>
            {t('cta_primary')} <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <Link href="/pricing" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'border-gray-200 text-navy hover:bg-gray-50')}>
            {t('cta_secondary')}
          </Link>
        </div>
        <p className="mt-5 text-sm text-gray-400">{t('cta_note')}</p>
      </section>

      {/* How it works */}
      <section className="border-t border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-center text-3xl font-bold text-navy">{t('how_title')}</h2>
          <p className="mb-12 text-center text-gray-500">{t('how_sub')}</p>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <Card key={s.n} className="border-gray-200 shadow-none">
                <CardContent className="p-6">
                  <div className="mb-4 text-3xl font-black text-yellow-300">{s.n}</div>
                  <h3 className="mb-2 font-semibold text-navy">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">{t('features_title')}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <Icon className="mb-3 h-5 w-5 text-yellow-400" />
                <h3 className="mb-1.5 font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-navy">{t('cta2_title')}</h2>
          <p className="mb-8 text-gray-500">{t('cta2_sub')}</p>
          <div className="mb-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
            {(['check1', 'check2', 'check3', 'check4'] as const).map((k) => (
              <span key={k} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-green-500" /> {t(k)}
              </span>
            ))}
          </div>
          <a href={EXTENSION_URL} className={cn(buttonVariants({ size: 'lg' }), 'bg-navy text-white hover:bg-navy-light')}>
            {t('cta2_btn')} <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <span className="text-sm text-gray-400">© {new Date().getFullYear()} Permacite</span>
          <nav className="flex gap-6 text-sm text-gray-400">
            <Link href="/pricing" className="transition-colors hover:text-navy">{n('pricing')}</Link>
            <Link href="/login" className="transition-colors hover:text-navy">{n('signin')}</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
