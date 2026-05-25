import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Server-side Supabase client — uses service role key only server-side
export async function createSupabaseServer() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // never exposed to client
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
}

// Validate a Bearer token from the extension and return the user
export async function validateBearerToken(authHeader: string | null) {
  if (!authHeader?.startsWith('Bearer ')) return null

  const token = authHeader.slice(7)
  const supabase = await createSupabaseServer()

  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return null

  return user
}
