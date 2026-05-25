'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

function LoginForm() {
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
      <main style={styles.wrap}>
        <div style={styles.card}>
          <div style={styles.icon}>📬</div>
          <h1 style={styles.title}>Check your email</h1>
          <p style={styles.sub}>
            We sent a magic link to <strong>{email}</strong>.<br />
            Click it to sign in{fromExtension ? ' and return to the extension' : ''}.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <span style={{ fontSize: 28 }}>📎</span>
          <span style={styles.logoText}>Permacite</span>
        </div>

        <h1 style={styles.title}>Sign in</h1>
        <p style={styles.sub}>
          {fromExtension
            ? 'Sign in to start archiving your research sources.'
            : 'Welcome back.'}
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={styles.input}
            autoFocus
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? 'Sending…' : 'Send magic link'}
          </button>
        </form>

        <p style={styles.hint}>No password needed — we email you a secure link.</p>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main style={styles.wrap}>
        <div style={styles.card}>
          <div style={styles.logo}>
            <span style={{ fontSize: 28 }}>📎</span>
            <span style={styles.logoText}>Permacite</span>
          </div>
          <h1 style={styles.title}>Sign in</h1>
        </div>
      </main>
    }>
      <LoginForm />
    </Suspense>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  card: {
    background: '#fff',
    borderRadius: 12,
    padding: '40px 36px',
    width: '100%',
    maxWidth: 400,
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24
  },
  logoText: {
    fontWeight: 700,
    fontSize: 20,
    color: '#1a1a2e'
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: '#1a1a2e',
    margin: '0 0 6px'
  },
  sub: {
    fontSize: 14,
    color: '#64748b',
    margin: '0 0 24px',
    lineHeight: 1.6
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  input: {
    padding: '11px 14px',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    fontSize: 14,
    outline: 'none',
    color: '#1a1a2e'
  },
  btn: {
    padding: '11px 16px',
    background: '#1a1a2e',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer'
  },
  error: {
    color: '#dc2626',
    fontSize: 13,
    margin: 0
  },
  hint: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 16,
    textAlign: 'center'
  },
  icon: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 16
  }
}
