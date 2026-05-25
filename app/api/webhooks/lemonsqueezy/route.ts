import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createSupabaseServer } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const rawBody  = await req.text()
  const signature = req.headers.get('x-signature')

  // ── 1. Validate HMAC signature — reject anything without valid signature ──
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 401 })
  }

  const expectedHash = crypto
    .createHmac('sha256', process.env.LEMON_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest('hex')

  // Use timingSafeEqual to prevent timing attacks
  const sigBuffer      = Buffer.from(signature, 'hex')
  const expectedBuffer = Buffer.from(expectedHash, 'hex')

  if (
    sigBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
  ) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  // ── 2. Parse event ───────────────────────────────────────────────────────
  let event: Record<string, unknown>
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const eventName    = (event?.meta as Record<string, string>)?.event_name
  const data         = event?.data as Record<string, unknown>
  const attrs        = data?.attributes as Record<string, string>
  const subscriptionId = data?.id as string   // LS puts the ID at data.id, not in attributes

  const supabase = await createSupabaseServer()

  // ── 3. Handle subscription created → upgrade user to pro ─────────────────
  if (eventName === 'subscription_created') {
    const email = attrs?.user_email
    if (!email) return NextResponse.json({ ok: true })

    await supabase
      .from('users')
      .update({ tier: 'pro', lemon_subscription_id: subscriptionId })
      .eq('email', email)
  }

  // ── 4. Handle subscription cancelled → downgrade to free ─────────────────
  if (eventName === 'subscription_cancelled' || eventName === 'subscription_expired') {
    const email = attrs?.user_email
    if (!email) return NextResponse.json({ ok: true })

    await supabase
      .from('users')
      .update({ tier: 'free', lemon_subscription_id: null })
      .eq('email', email)
  }

  // ── 5. Handle subscription resumed ───────────────────────────────────────
  if (eventName === 'subscription_resumed') {
    const email = attrs?.user_email
    if (!email) return NextResponse.json({ ok: true })

    await supabase
      .from('users')
      .update({ tier: 'pro' })
      .eq('email', email)
  }

  return NextResponse.json({ ok: true })
}
