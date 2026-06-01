import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { validateBearerToken, createSupabaseServer } from '@/lib/supabase-server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// CORS — echo back the caller's origin so chrome-extension:// IDs match exactly
function corsHeaders(req: NextRequest) {
  const origin = req.headers.get('origin') ?? '*'
  return {
    'Access-Control-Allow-Origin':  origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) })
}

export async function POST(req: NextRequest) {
  const cors = corsHeaders(req)

  try {
    // ── 1. Auth ────────────────────────────────────────────────────────────
    const user = await validateBearerToken(req.headers.get('authorization'))
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: cors })
    }

    // ── 2. Parse + validate input ──────────────────────────────────────────
    const body = await req.json().catch(() => null)
    const url: string = body?.url ?? ''

    if (!url || !isValidHttpUrl(url)) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400, headers: cors })
    }

    const supabase = await createSupabaseServer()

    // ── 3. Archive + metadata in parallel ─────────────────────────────────
    const [archiveUrl, metadata] = await Promise.all([
      archiveWithWayback(url),
      extractMetadata(url)
    ])

    // ── 5. Format citations ────────────────────────────────────────────────
    const citationApa = formatApa(metadata)
    const citationMla = formatMla(metadata)

    // ── 6. Persist to DB ───────────────────────────────────────────────────
    const { error: insertError } = await supabase.from('citations').insert({
      user_id:      user.id,
      url,
      archive_url:  archiveUrl,
      title:        metadata.title,
      author:       metadata.author,
      site_name:    metadata.siteName,
      published_at: metadata.publishedAt,
      citation_apa: citationApa,
      citation_mla: citationMla
    })

    if (insertError) {
      console.error('DB insert failed:', insertError.message)
    }

    return NextResponse.json({
      archiveUrl,
      citationApa,
      citationMla,
      title:    metadata.title,
      siteName: metadata.siteName
    }, { headers: cors })

  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error'
    console.error('Capture error:', message)
    return NextResponse.json({ error: message }, { status: 500, headers: cors })
  }
}

// ── Wayback Machine ──────────────────────────────────────────────────────────
async function archiveWithWayback(url: string): Promise<string> {
  try {
    const res = await fetch(`https://web.archive.org/save/${url}`, {
      method: 'GET',
      signal: AbortSignal.timeout(15_000),
      redirect: 'follow'
    })

    // Wayback returns the snapshot URL in the Content-Location header
    const location = res.headers.get('content-location')
    if (location) return `https://web.archive.org${location}`

    // Fallback: construct expected URL
    const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14)
    return `https://web.archive.org/web/${timestamp}/${url}`
  } catch {
    // Non-blocking — return best-effort URL
    const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14)
    return `https://web.archive.org/web/${timestamp}/${url}`
  }
}

// ── Metadata extraction via Claude ──────────────────────────────────────────
interface Metadata {
  title: string
  author: string | null
  siteName: string
  publishedAt: string | null
}

async function extractMetadata(url: string): Promise<Metadata> {
  const domain = new URL(url).hostname.replace('www.', '')
  const fallback: Metadata = { title: url, author: null, siteName: domain, publishedAt: null }

  try {
    const systemPrompt = `Extract metadata from the web page URL. Return ONLY valid JSON with:
{
  "title": string,
  "author": string | null,
  "siteName": string,
  "publishedAt": "YYYY-MM-DD" | null
}
If a field is unknown, use null. Never add extra keys.`

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      system: systemPrompt,
      messages: [{ role: 'user', content: `URL: ${url}` }]
    })

    const raw = (message.content[0] as { type: string; text: string }).text
    const json = raw.match(/\{[\s\S]*\}/)?.[0] ?? '{}'
    const parsed = JSON.parse(json)
    return { ...fallback, ...parsed }
  } catch (err) {
    console.error('extractMetadata failed, using fallback:', err instanceof Error ? err.message : err)
    return fallback
  }
}

// ── Citation formatters ──────────────────────────────────────────────────────
function formatApa(m: Metadata & { archiveUrl?: string }): string {
  const author    = m.author ? `${m.author}. ` : ''
  const year      = m.publishedAt ? `(${m.publishedAt.slice(0, 4)}). ` : '(n.d.). '
  const title     = `${m.title}. `
  const site      = `*${m.siteName}*. `
  const accessed  = `Retrieved ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
  return `${author}${year}${title}${site}${accessed}`
}

function formatMla(m: Metadata & { archiveUrl?: string }): string {
  const author    = m.author ? `${m.author}. ` : ''
  const title     = `"${m.title}." `
  const site      = `*${m.siteName}*, `
  const date      = m.publishedAt ? `${m.publishedAt}. ` : ''
  const accessed  = `Accessed ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.`
  return `${author}${title}${site}${date}${accessed}`
}

// ── URL validation — prevents SSRF ──────────────────────────────────────────
function isValidHttpUrl(raw: string): boolean {
  try {
    const u = new URL(raw)
    if (!['http:', 'https:'].includes(u.protocol)) return false
    // Block private/local IP ranges (SSRF prevention)
    const blocked = /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(u.hostname)
    return !blocked
  } catch {
    return false
  }
}
