import Link from 'next/link'

const EXTENSION_STORE_URL = '#' // TODO: replace with Chrome Web Store URL after submission

export default function HomePage() {
  return (
    <main style={s.wrap}>

      {/* Nav */}
      <nav style={s.nav}>
        <div style={s.navLogo}>
          <span style={{ fontSize: 22 }}>📎</span>
          <span style={s.navLogoText}>Permacite</span>
        </div>
        <div style={s.navLinks}>
          <Link href="/pricing" style={s.navLink}>Pricing</Link>
          <Link href="/login" style={s.navCta}>Sign in</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={s.hero}>
        <div style={s.heroTag}>Chrome Extension</div>
        <h1 style={s.heroTitle}>
          Archive your sources.<br />
          <span style={s.heroAccent}>Cite them forever.</span>
        </h1>
        <p style={s.heroSub}>
          One click archives any web page to the Wayback Machine and generates
          a perfect APA or MLA citation — instantly.
        </p>
        <div style={s.heroBtns}>
          <a href={EXTENSION_STORE_URL} style={s.btnPrimary}>
            Add to Chrome — it&apos;s free
          </a>
          <Link href="/pricing" style={s.btnGhost}>See pricing</Link>
        </div>
      </section>

      {/* How it works */}
      <section style={s.section}>
        <h2 style={s.sectionTitle}>How it works</h2>
        <div style={s.steps}>
          {[
            { n: '1', title: 'Open any page', desc: 'Navigate to the article, study, or website you want to cite.' },
            { n: '2', title: 'Click the extension', desc: 'Hit the Permacite icon in your toolbar.' },
            { n: '3', title: 'Get your citation', desc: 'Your source is archived permanently and APA/MLA citations are ready to copy.' }
          ].map(step => (
            <div key={step.n} style={s.step}>
              <div style={s.stepNum}>{step.n}</div>
              <h3 style={s.stepTitle}>{step.title}</h3>
              <p style={s.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ ...s.section, background: '#1a1a2e', borderRadius: 20, padding: '56px 40px' }}>
        <h2 style={{ ...s.sectionTitle, color: '#fff' }}>Everything you need</h2>
        <div style={s.features}>
          {[
            { icon: '🏛️', title: 'Wayback Machine', desc: 'Every source is permanently archived — links never go dead.' },
            { icon: '📝', title: 'APA & MLA', desc: 'Both citation formats generated automatically, ready to copy.' },
            { icon: '🔗', title: 'Zotero sync', desc: 'Push citations to your Zotero library in one click.' },
            { icon: '🌍', title: 'EN / FR / ES', desc: 'Interface available in English, French, and Spanish.' },
          ].map(f => (
            <div key={f.title} style={s.feature}>
              <div style={s.featureIcon}>{f.icon}</div>
              <h3 style={{ ...s.featureTitle, color: '#fff' }}>{f.title}</h3>
              <p style={{ ...s.featureDesc, color: '#94a3b8' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...s.section, textAlign: 'center' as const }}>
        <h2 style={s.sectionTitle}>Start for free today</h2>
        <p style={{ color: '#64748b', fontSize: 16, marginBottom: 32 }}>
          10 archives/month free. Upgrade anytime for unlimited access.
        </p>
        <a href={EXTENSION_STORE_URL} style={s.btnPrimary}>
          Add Permacite to Chrome
        </a>
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <span>© {new Date().getFullYear()} Permacite</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <Link href="/pricing" style={s.footerLink}>Pricing</Link>
          <Link href="/login" style={s.footerLink}>Sign in</Link>
        </div>
      </footer>

    </main>
  )
}

const s: Record<string, React.CSSProperties> = {
  wrap: {
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: '#f8fafc',
    color: '#1a1a2e'
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 40px',
    maxWidth: 1100,
    margin: '0 auto'
  },
  navLogo: { display: 'flex', alignItems: 'center', gap: 8 },
  navLogoText: { fontWeight: 700, fontSize: 18, color: '#1a1a2e' },
  navLinks: { display: 'flex', alignItems: 'center', gap: 20 },
  navLink: { color: '#64748b', textDecoration: 'none', fontSize: 14 },
  navCta: {
    background: '#1a1a2e', color: '#fff', textDecoration: 'none',
    padding: '8px 18px', borderRadius: 8, fontSize: 14, fontWeight: 600
  },
  hero: {
    maxWidth: 720,
    margin: '80px auto 100px',
    textAlign: 'center',
    padding: '0 24px'
  },
  heroTag: {
    display: 'inline-block',
    background: '#e0f2fe',
    color: '#0369a1',
    fontSize: 12,
    fontWeight: 700,
    padding: '4px 12px',
    borderRadius: 20,
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  heroTitle: { fontSize: 52, fontWeight: 900, lineHeight: 1.15, margin: '0 0 20px' },
  heroAccent: { color: '#eab308' },
  heroSub: { fontSize: 18, color: '#64748b', lineHeight: 1.7, margin: '0 0 40px' },
  heroBtns: { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' },
  btnPrimary: {
    background: '#1a1a2e', color: '#fff', textDecoration: 'none',
    padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700
  },
  btnGhost: {
    background: 'transparent', color: '#1a1a2e', textDecoration: 'none',
    padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600,
    border: '2px solid #e2e8f0'
  },
  section: {
    maxWidth: 1000,
    margin: '0 auto 80px',
    padding: '0 24px'
  },
  sectionTitle: { fontSize: 28, fontWeight: 800, textAlign: 'center', margin: '0 0 48px' },
  steps: { display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' },
  step: {
    flex: '1 1 200px', maxWidth: 260,
    background: '#fff', borderRadius: 16, padding: '28px 24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
  },
  stepNum: {
    width: 36, height: 36, borderRadius: '50%',
    background: '#1a1a2e', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 800, fontSize: 16, marginBottom: 16
  },
  stepTitle: { fontSize: 16, fontWeight: 700, margin: '0 0 8px' },
  stepDesc: { fontSize: 14, color: '#64748b', lineHeight: 1.6, margin: 0 },
  features: { display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' },
  feature: { flex: '1 1 180px', maxWidth: 220, textAlign: 'center' },
  featureIcon: { fontSize: 32, marginBottom: 12 },
  featureTitle: { fontSize: 15, fontWeight: 700, margin: '0 0 8px' },
  featureDesc: { fontSize: 13, lineHeight: 1.6, margin: 0 },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 40px',
    maxWidth: 1100,
    margin: '0 auto',
    borderTop: '1px solid #e2e8f0',
    fontSize: 13,
    color: '#94a3b8'
  },
  footerLink: { color: '#94a3b8', textDecoration: 'none' }
}
