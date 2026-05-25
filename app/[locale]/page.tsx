export default function HomePage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, sans-serif',
      background: '#f8fafc'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📎</div>
        <h1 style={{ color: '#1a1a2e', fontSize: 28, marginBottom: 8 }}>Permacite</h1>
        <p style={{ color: '#64748b', fontSize: 16 }}>Your sources, permanent forever.</p>
      </div>
    </main>
  )
}
