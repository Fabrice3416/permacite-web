import { redirect } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { createSupabaseReadonly, createSupabaseServer } from '@/lib/supabase-server'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link2, Archive, ExternalLink, ArrowRight } from 'lucide-react'
import SignOutButton from './sign-out-button'

export default async function DashboardPage() {
  const t = useTranslations('dashboard')

  // ── Auth check ─────────────────────────────────────────────────────────────
  const authClient = await createSupabaseReadonly()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) redirect('/login')

  // ── Data ───────────────────────────────────────────────────────────────────
  const db = await createSupabaseServer()

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const [{ count }, { data: citations }] = await Promise.all([
    db.from('citations')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', startOfMonth.toISOString()),
    db.from('citations')
      .select('id, title, url, archive_url, citation_apa, citation_mla, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)
  ])

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Header */}
      <header className="border-b border-white/10 bg-navy">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400">
              <Link2 className="h-4 w-4 text-navy" />
            </div>
            Permacite
          </Link>
          <div className="flex items-center gap-5">
            <span className="hidden text-sm text-white/50 sm:block">{user.email}</span>
            <SignOutButton label={t('sign_out')} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-none">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50">
                <Archive className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-black text-navy">{count ?? 0}</p>
                <p className="text-xs text-gray-400">{t('this_month')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent citations */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-none">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="font-semibold text-navy">{t('recent_title')}</h2>
          </div>

          {!citations?.length ? (
            <div className="px-6 py-12 text-center">
              <Archive className="mx-auto mb-3 h-8 w-8 text-gray-200" />
              <p className="text-sm text-gray-400">{t('empty')}</p>
              <Link
                href="/install"
                className={cn(buttonVariants({ size: 'sm' }), 'mt-4 bg-navy text-white hover:bg-navy/90')}
              >
                {t('install_cta')} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {citations.map((c) => (
                <li key={c.id} className="px-6 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-navy">
                        {c.title || c.url}
                      </p>
                      <p className="mt-0.5 line-clamp-1 text-xs text-gray-400">{c.citation_apa}</p>
                    </div>
                    <a
                      href={c.archive_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-gray-400 transition-colors hover:text-navy"
                      title={t('view_archive')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      </main>
    </div>
  )
}
