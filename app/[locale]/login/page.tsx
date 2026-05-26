'use client'

import { Suspense, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link2, Mail, ArrowLeft } from 'lucide-react'
import LocaleSwitcher from '@/components/locale-switcher'

function LoginForm() {
  const t = useTranslations('login')
  const searchParams  = useSearchParams()
  const fromExtension = searchParams.get('source') === 'extension'
  const extId         = searchParams.get('ext_id') ?? ''

  const [email, setEmail]     = useState('')
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(searchParams.get('error') ?? '')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (fromExtension && extId) {
      localStorage.setItem('permacite_ext_id', extId)
    }

    const redirectTo = fromExtension
      ? `${window.location.origin}/auth/extension-success`
      : `${window.location.origin}/auth/callback`

    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo }
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <CardContent className="py-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Mail className="h-5 w-5 text-green-600" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-navy">{t('success_title')}</h2>
        <p className="text-sm leading-relaxed text-gray-500">
          {fromExtension
            ? t('success_body_extension', { email })
            : t('success_body', { email })}
        </p>
        <p className="mt-4 text-xs text-gray-400">{t('success_spam')}</p>
      </CardContent>
    )
  }

  return (
    <>
      <CardHeader className="space-y-1 pb-2">
        <h1 className="text-xl font-bold text-navy">{t('title')}</h1>
        <p className="text-sm text-gray-500">
          {fromExtension ? t('subtitle_extension') : t('subtitle_web')}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-navy">
              {t('email_label')}
            </label>
            <Input
              id="email"
              type="email"
              placeholder={t('email_placeholder')}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-navy text-white hover:bg-navy-light disabled:opacity-60"
          >
            {loading ? t('submitting') : t('submit')}
          </Button>
        </form>
        <p className="mt-5 text-center text-xs text-gray-400">{t('hint')}</p>
      </CardContent>
    </>
  )
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
