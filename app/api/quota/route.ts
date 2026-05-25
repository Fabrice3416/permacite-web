import { NextRequest, NextResponse } from 'next/server'
import { validateBearerToken, createSupabaseServer } from '@/lib/supabase-server'

const FREE_TIER_LIMIT = 10

function corsHeaders(req: NextRequest) {
  const origin = req.headers.get('origin') ?? '*'
  return {
    'Access-Control-Allow-Origin':  origin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization'
  }
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) })
}

export async function GET(req: NextRequest) {
  const cors = corsHeaders(req)
  const user = await validateBearerToken(req.headers.get('authorization'))
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: cors })
  }

  const supabase = await createSupabaseServer()

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const [{ count }, { data: profile }] = await Promise.all([
    supabase
      .from('citations')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', startOfMonth.toISOString()),
    supabase
      .from('users')
      .select('tier')
      .eq('id', user.id)
      .single()
  ])

  const isPro = profile?.tier === 'pro'

  return NextResponse.json({
    used: count ?? 0,
    max:  isPro ? null : FREE_TIER_LIMIT,
    tier: profile?.tier ?? 'free'
  }, { headers: cors })
}
