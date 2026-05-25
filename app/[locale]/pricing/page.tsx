import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Link2, Check, X } from 'lucide-react'

const CHECKOUT_URL = 'https://formationdevia.lemonsqueezy.com/checkout/buy/1703519'

const FREE_FEATURES = ['10 archives / month', 'APA & MLA citations', 'Wayback Machine archiving', 'Zotero sync', 'EN / FR / ES']
const FREE_MISSING  = ['Unlimited archives', 'Priority support']
const PRO_FEATURES  = ['Unlimited archives', 'APA & MLA citations', 'Wayback Machine archiving', 'Zotero sync', 'EN / FR / ES', 'Priority support']

export default function PricingPage() {
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
          <Link href="/login" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'border-gray-200 text-navy')}>
            Sign in
          </Link>
        </div>
      </header>

      {/* Header */}
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-16 text-center">
        <Badge variant="outline" className="mb-6 border-yellow-300 bg-yellow-50 text-yellow-700">
          Simple pricing
        </Badge>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-navy">
          Start free. Scale when ready.
        </h1>
        <p className="text-lg text-gray-500">No hidden fees. Cancel anytime.</p>
      </section>

      {/* Plans */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 md:items-start">

          {/* Free */}
          <Card className="border-gray-200 shadow-none">
            <CardHeader className="pb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Free</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-black text-navy">$0</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">For occasional researchers</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2.5">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Check className="h-4 w-4 shrink-0 text-green-500" />{f}
                  </li>
                ))}
                {FREE_MISSING.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <X className="h-4 w-4 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/login" className={cn(buttonVariants({ variant: 'outline' }), 'mt-4 w-full border-gray-200 text-navy')}>
                Get started free
              </Link>
            </CardContent>
          </Card>

          {/* Pro */}
          <Card className="relative border-navy bg-navy shadow-xl shadow-navy/20">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <Badge className="bg-yellow-400 text-navy hover:bg-yellow-300">Most popular</Badge>
            </div>
            <CardHeader className="pb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50">Pro</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">€9.99</span>
                <span className="text-white/50">/month</span>
              </div>
              <p className="mt-1 text-sm text-white/60">For active researchers</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2.5">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/80">
                    <Check className="h-4 w-4 shrink-0 text-yellow-400" />{f}
                  </li>
                ))}
              </ul>
              <a
                href={CHECKOUT_URL}
                className={cn(buttonVariants(), 'mt-4 w-full bg-yellow-400 font-semibold text-navy hover:bg-yellow-300')}
              >
                Upgrade to Pro
              </a>
            </CardContent>
          </Card>

        </div>
        <p className="mt-8 text-center text-sm text-gray-400">
          Payments secured by Lemon Squeezy &middot; Cancel anytime
        </p>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-100 bg-gray-50 py-16">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-10 text-center text-2xl font-bold text-navy">Frequently asked</h2>
          <div className="space-y-6">
            {[
              { q: 'What counts as an archive?', a: 'Each time you click the Permacite icon on a page, that is one archive. The same URL archived twice counts twice.' },
              { q: 'What happens when I reach the free limit?', a: 'Permacite shows an upgrade prompt. Your existing archives and citations remain accessible.' },
              { q: 'Can I cancel my Pro subscription?', a: 'Yes, at any time from your Lemon Squeezy billing portal. Your account reverts to the Free plan.' },
              { q: 'Which citation formats are supported?', a: 'APA 7th edition and MLA 9th edition are both generated automatically.' },
            ].map(({ q, a }) => (
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
