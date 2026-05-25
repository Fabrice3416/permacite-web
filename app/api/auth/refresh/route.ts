import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function corsHeaders(req: NextRequest) {
  const origin = req.headers.get('origin') ?? '*'
  return {
    'Access-Control-Allow-Origin':  origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) })
}

export async function POST(req: NextRequest) {
  const cors = corsHeaders(req)

  try {
    const body = await req.json().catch(() => null)
    const refreshToken: string = body?.refreshToken ?? ''

    if (!refreshToken) {
      return NextResponse.json({ error: 'Missing refresh token' }, { status: 400, headers: cors })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken })

    if (error || !data.session) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401, headers: cors })
    }

    return NextResponse.json({
      accessToken:      data.session.access_token,
      newRefreshToken:  data.session.refresh_token
    }, { headers: cors })

  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error'
    return NextResponse.json({ error: message }, { status: 500, headers: cors })
  }
}
