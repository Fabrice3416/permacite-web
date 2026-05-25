import Link from 'next/link'

const CHECKOUT_URL = 'https://formationdevia.lemonsqueezy.com/checkout/buy/1703519'

export default function PricingPage() {
  return (
    <main style={s.wrap}>
      <div style={s.inner}>
        <div style={s.logo}>
          <span style={{ fontSize: 28 }}>📎</span>
          <span style={s.logoText}>Permacite</span>
        </div>

        <h1 style={s.title}>Simple, honest pricing</h1>
        <p style={s.sub}>Archive your research sources permanently. Never lose a citation.</p>

        <div style={s.grid}>
          {/* Free */}
          <div style={s.card}>
            <div style={s.planName}>Free</div>
            <div style={s.price}>$0<span style={s.per}>/month</span></div>
            <ul style={s.list}>
              <li style={s.item}>✓ 10 archived sources / month</li>
              <li style={s.item}>✓ APA &amp; MLA citations</li>
              <li style={s.item}>✓ Wayback Machine archiving</li>
              <li style={s.item}>✓ Zotero sync</li>
              <li style={{ ...s.item, color: '#94a3b8' }}>✗ Unlimited archives</li>
            </ul>
            <Link href="/login" style={{ ...s.btn, ...s.btnOutline }}>
              Get started free
            </Link>
          </div>

          {/* Pro */}
          <div style={{ ...s.card, ...s.cardPro }}>
            <div style={s.badge}>Most popular</div>
            <div style={{ ...s.planName, color: '#fff' }}>Pro</div>
            <div style={{ ...s.price, color: '#fff' }}>
              €9.99<span style={{ ...s.per, color: '#94a3b8' }}>/month</span>
            </div>
            <ul style={s.list}>
              <li style={{ ...s.item, color: '#e2e8f0' }}>✓ Unlimited archived sources</li>
              <li style={{ ...s.item, color: '#e2e8f0' }}>✓ APA &amp; MLA citations</li>
              <li style={{ ...s.item, color: '#e2e8f0' }}>✓ Wayback Machine archiving</li>
              <li style={{ ...s.item, color: '#e2e8f0' }}>✓ Zotero sync</li>
              <li style={{ ...s.item, color: '#eab308' }}>✓ Priority support</li>
            </ul>
            <a href={CHECKOUT_URL} style={{ ...s.btn, ...s.btnPro }}>
              Upgrade to Pro
            </a>
          </div>
        </div>

        <p style={s.note}>
          Payments secured by Lemon Squeezy. Cancel anytime.
        </p>
      </div>
    </main>
  )
}

const s: Record<string, React.CSSProperties> = {
  wrap: {
    minHeight: '100vh',
    background: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '40px 16px'
  },
  inner: {
    width: '100%',
    maxWidth: 760,
    textAlign: 'center'
  },
  logo: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32
  },
  logoText: {
    fontWeight: 700,
    fontSize: 20,
    color: '#1a1a2e'
  },
  title: {
    fontSize: 32,
    fontWeight: 800,
    color: '#1a1a2e',
    margin: '0 0 12px'
  },
  sub: {
    fontSize: 16,
    color: '#64748b',
    margin: '0 0 48px'
  },
  grid: {
    display: 'flex',
    gap: 24,
    justifyContent: 'center',
    flexWrap: 'wrap' as const
  },
  card: {
    background: '#fff',
    borderRadius: 16,
    padding: '32px 28px',
    width: 300,
    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
    textAlign: 'left' as const,
    position: 'relative' as const
  },
  cardPro: {
    background: '#1a1a2e'
  },
  badge: {
    position: 'absolute' as const,
    top: -12,
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#eab308',
    color: '#1a1a2e',
    fontSize: 11,
    fontWeight: 700,
    padding: '4px 12px',
    borderRadius: 20,
    whiteSpace: 'nowrap' as const
  },
  planName: {
    fontSize: 13,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
    color: '#64748b',
    marginBottom: 8
  },
  price: {
    fontSize: 36,
    fontWeight: 800,
    color: '#1a1a2e',
    marginBottom: 24
  },
  per: {
    fontSize: 16,
    fontWeight: 400,
    color: '#64748b'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 28px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10
  },
  item: {
    fontSize: 14,
    color: '#374151'
  },
  btn: {
    display: 'block',
    textAlign: 'center' as const,
    padding: '12px 20px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: 'none',
    cursor: 'pointer'
  },
  btnOutline: {
    border: '2px solid #1a1a2e',
    color: '#1a1a2e',
    background: 'transparent'
  },
  btnPro: {
    background: '#eab308',
    color: '#1a1a2e',
    border: 'none'
  },
  note: {
    marginTop: 32,
    fontSize: 13,
    color: '#94a3b8'
  }
}
