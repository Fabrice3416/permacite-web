'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function ExtensionBridge() {
  const [status, setStatus] = useState<'connecting' | 'done' | 'manual'>('connecting')

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    async function handleSession(session: {
      access_token: string
      refresh_token: string
      user: { id: string; email?: string }
    }) {
      const extId = localStorage.getItem('permacite_ext_id') || ''
      localStorage.removeItem('permacite_ext_id')

      const payload = {
        type: 'AUTH_SUCCESS',
        accessToken:  session.access_token,
        refreshToken: session.refresh_token,
        userId:       session.user.id,
        userEmail:    session.user.email ?? ''
      }

      const cr = (window as unknown as { chrome?: { runtime?: { sendMessage: (...args: unknown[]) => void; lastError?: unknown } } }).chrome?.runtime

      if (extId && cr?.sendMessage) {
        cr.sendMessage(extId, payload, () => {
          void cr.lastError // suppress unchecked error warning
          setStatus('done')
        })
        // Fallback: mark done after 2s even if sendMessage callback doesn't fire
        setTimeout(() => setStatus('done'), 2000)
      } else {
        // No extId or no chrome API — user opens extension manually
        setStatus('manual')
      }
    }

    // Session is already in cookies (set by server-side callback) — read it immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        handleSession(session)
      } else {
        setStatus('manual')
      }
    })

    // Also listen for auth state changes as a safety net
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session) {
        handleSession(session)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const messages = {
    connecting: 'Connecting to extension…',
    done:       'Connected! You can close this tab and click the Permacite icon.',
    manual:     'Signed in. Close this tab and click the Permacite icon in your toolbar.'
  }

  const icons = { connecting: '📋', done: '✅', manual: '✅' }

  return (
    <main style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#f8fafc', margin: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: '40px 36px',
        textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,.08)',
        maxWidth: 360, width: '100%'
      }}>
        <div style={{ fontSize: 40 }}>{icons[status]}</div>
        <p style={{ color: '#64748b', fontSize: 14, margin: '12px 0 0', lineHeight: 1.6 }}>
          {messages[status]}
        </p>
        <button
          onClick={() => window.close()}
          style={{
            marginTop: 20, padding: '10px 20px', background: '#1a1a2e',
            color: '#fff', border: 'none', borderRadius: 8, fontSize: 14,
            cursor: 'pointer', fontWeight: 600
          }}
        >
          Close tab
        </button>
      </div>
    </main>
  )
}
