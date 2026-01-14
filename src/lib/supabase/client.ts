
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Handle missing environment variables gracefully for build-time
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) {
    // Return a mock client for build-time when env vars are missing
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: () => ({
        select: () => ({ 
          single: () => Promise.resolve({ data: null, error: null }),
          maybeSingle: () => Promise.resolve({ data: null, error: null }),
          order: () => ({ 
            select: () => Promise.resolve({ data: [], error: null })
          })
        }),
        insert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        update: () => ({ 
          eq: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
        }),
        delete: () => ({ 
          eq: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
        }),
        upsert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
      })
    } as any
  }
  
  return createBrowserClient(url, key)
}
