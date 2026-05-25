import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname
  },

  // Security headers applied to all routes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'X-Frame-Options',            value: 'DENY' },
          { key: 'X-XSS-Protection',           value: '1; mode=block' },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // unsafe-eval needed by React dev mode only — removed in production build
              process.env.NODE_ENV === 'development'
                ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://us-assets.i.posthog.com"
                : "script-src 'self' 'unsafe-inline' https://us-assets.i.posthog.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "connect-src 'self' https://us.i.posthog.com https://*.supabase.co https://api.anthropic.com https://web.archive.org",
              "frame-ancestors 'none'"
            ].join('; ')
          }
        ]
      }
    ]
  },

  // CORS for the extension to call our API
  async rewrites() {
    return []
  }
}

export default withNextIntl(nextConfig)
