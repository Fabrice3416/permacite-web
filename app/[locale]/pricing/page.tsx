import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Link2, Check, X } from 'lucide-react'
import LocaleSwitcher from '@/components/locale-switcher'

const CHECKOUT_URL = 'https://formationdevia.lemonsqueezy.com/checkout/buy/1703519'

export default function PricingPage() {
  const t = useTranslations('pricing')
  const n = useTranslations('nav')

  const freeFeatures = [
    t('feat_10'), t('feat_citations'), t('feat_wayback'), t('feat_zotero'), t('feat_languages')
  ]
  const freeMissing = [t('feat_unlimited'), t('feat_support')]
  const proFeatures = [
    t('feat_unlimited'), t('feat_citations'), t('feat_wayback'), t('feat_zotero'), t('feat_languages'), t('feat_support')
  ]

  const faqs = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
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

      {/* Header */}
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-16 text-center">
        <Badge variant="outline" className="mb-6 border-yellow-300 bg-yellow-50 text-yellow-700">
          {t('badge')}
        </Badge>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-navy">{t('title')}</h1>
        <p className="text-lg text-gray-500">{t('sub')}</p>
      </section>

      {/* Plans */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 md:items-start">

          {/* Free */}
          <Card className="border-gray-200 shadow-none">
            <CardHeader className="pb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('free_label')}</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-black text-navy">{t('free_price')}</span>
                <span className="text-gray-400">{t('per_month')}</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{t('free_sub')}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2.5">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Check className="h-4 w-4 shrink-0 text-green-500" />{f}
                  </li>
                ))}
                {freeMissing.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <X className="h-4 w-4 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/login" className={cn(buttonVariants({ variant: 'outline' }), 'mt-4 w-full border-gray-200 text-navy')}>
                {t('free_cta')}
              </Link>
            </CardContent>
          </Card>

          {/* Pro */}
          <Card className="relative border-navy bg-navy shadow-xl shadow-navy/20">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <Badge className="bg-yellow-400 text-navy hover:bg-yellow-300">{t('popular_badge')}</Badge>
            </div>
            <CardHeader className="pb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50">{t('pro_label')}</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">{t('pro_price')}</span>
                <span className="text-white/50">{t('per_month')}</span>
              </div>
              <p className="mt-1 text-sm text-white/60">{t('pro_sub')}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2.5">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/80">
                    <Check className="h-4 w-4 shrink-0 text-yellow-400" />{f}
                  </li>
                ))}
              </ul>
              <a href={CHECKOUT_URL} className={cn(buttonVariants(), 'mt-4 w-full bg-yellow-400 font-semibold text-navy hover:bg-yellow-300')}>
                {t('pro_cta')}
              </a>
            </CardContent>
          </Card>

        </div>
        <p className="mt-8 text-center text-sm text-gray-400">{t('payment_note')}</p>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-100 bg-gray-50 py-16">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-10 text-center text-2xl font-bold text-navy">{t('faq_title')}</h2>
          <div className="space-y-6">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border-b border-gray-200 pb-6">
                <h3 className="mb-2 font-semibold text-navy">{q}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
