import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)
  const code          = searchParams.get('code')
  const fromExtension = searchParams.get('source') === 'extension'
  const errorParam    = searchParams.get('error_description')

  if (errorParam) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(errorParam)}`
    )
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no_code`)
  }

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        }
      }
    }
  )

  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.session) {
    const msg = error?.message ?? 'session_error'
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(msg)}`
    )
  }

  if (fromExtension) {
    // Redirect to a React page — Route Handlers can set cookies, pages can run client JS
    return NextResponse.redirect(`${origin}/auth/extension-success`)
  }

  return NextResponse.redirect(`${origin}/`)
}
