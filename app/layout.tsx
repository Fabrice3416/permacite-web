import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Permacite — Your sources, permanent forever.',
  description: 'Archive your research sources the moment you cite them. Never lose a broken link again.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
