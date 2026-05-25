import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Archive, FileText, Link2, Globe,
  ArrowRight, Check
} from 'lucide-react'

const EXTENSION_URL = '#' // TODO: Chrome Web Store URL

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-navy font-sans">

      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-navy">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy">
              <Link2 className="h-4 w-4 text-yellow-400" />
            </div>
            Permacite
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/pricing" className="text-sm text-gray-500 transition-colors hover:text-navy">
              Pricing
            </Link>
            <Link href="/login" className={cn(buttonVariants({ size: 'sm' }), 'bg-navy text-white hover:bg-navy-light')}>
              Sign in <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center">
        <Badge variant="outline" className="mb-6 border-yellow-300 bg-yellow-50 text-yellow-700">
          Chrome Extension — Free to install
        </Badge>
        <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-navy lg:text-6xl">
          Archive your sources.<br />
          <span className="text-yellow-500">Cite them forever.</span>
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
          One click saves any web page permanently to the Wayback Machine
          and generates a ready-to-paste APA or MLA citation.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={EXTENSION_URL}
            className={cn(buttonVariants({ size: 'lg' }), 'bg-navy text-white hover:bg-navy-light')}
          >
            Add to Chrome — it&apos;s free
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <Link
            href="/pricing"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'border-gray-200 text-navy hover:bg-gray-50')}
          >
            See pricing
          </Link>
        </div>
        <p className="mt-5 text-sm text-gray-400">
          No credit card required &middot; 10 free archives/month
        </p>
      </section>

      {/* ── How it works ── */}
      <section className="border-t border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-center text-3xl font-bold text-navy">How it works</h2>
          <p className="mb-12 text-center text-gray-500">Three steps, under five seconds.</p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { step: '01', title: 'Open the page', desc: 'Navigate to any article, paper, or website you want to cite.' },
              { step: '02', title: 'Click Permacite', desc: 'Hit the extension icon in your browser toolbar.' },
              { step: '03', title: 'Copy your citation', desc: 'Source archived permanently. APA & MLA citations ready.' },
            ].map((item) => (
              <Card key={item.step} className="border-gray-200 shadow-none">
                <CardContent className="p-6">
                  <div className="mb-4 text-3xl font-black text-yellow-300">{item.step}</div>
                  <h3 className="mb-2 font-semibold text-navy">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">Everything you need</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Archive, title: 'Wayback Machine', desc: 'Every source archived permanently. Dead links never break your citations.' },
              { icon: FileText, title: 'APA & MLA', desc: 'Both formats generated instantly. Copy with one click.' },
              { icon: Link2, title: 'Zotero sync', desc: 'Push to your Zotero library without leaving the page.' },
              { icon: Globe, title: 'EN / FR / ES', desc: 'Full interface in English, French, and Spanish.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <Icon className="mb-3 h-5 w-5 text-yellow-400" />
                <h3 className="mb-1.5 font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-navy">Start for free today</h2>
          <p className="mb-8 text-gray-500">
            10 archives per month, always free. Upgrade for unlimited access.
          </p>
          <div className="mb-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
            {['APA & MLA citations', 'Permanent Wayback archive', 'Zotero integration', 'No password needed'].map((f) => (
              <span key={f} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-green-500" /> {f}
              </span>
            ))}
          </div>
          <a
            href={EXTENSION_URL}
            className={cn(buttonVariants({ size: 'lg' }), 'bg-navy text-white hover:bg-navy-light')}
          >
            Add Permacite to Chrome <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <span className="text-sm text-gray-400">© {new Date().getFullYear()} Permacite</span>
          <nav className="flex gap-6 text-sm text-gray-400">
            <Link href="/pricing" className="transition-colors hover:text-navy">Pricing</Link>
            <Link href="/login" className="transition-colors hover:text-navy">Sign in</Link>
          </nav>
        </div>
      </footer>

    </div>
  )
}
