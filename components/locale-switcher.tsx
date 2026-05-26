'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useTransition } from 'react'
import { Globe } from 'lucide-react'

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' },
] as const

export default function LocaleSwitcher() {
  const locale   = useLocale()
  const router   = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function switchLocale(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <div className="flex items-center gap-1">
      <Globe className="h-3.5 w-3.5 text-gray-400" />
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => switchLocale(code)}
          disabled={isPending}
          aria-label={`Switch to ${label}`}
          className={[
            'rounded px-1.5 py-0.5 text-xs font-medium transition-colors cursor-pointer',
            code === locale
              ? 'bg-navy text-white'
              : 'text-gray-400 hover:text-navy',
            isPending ? 'opacity-50' : ''
          ].join(' ')}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
