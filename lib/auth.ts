import { createClient } from "@/lib/db/client"

// ─── Client-side (for Client Components) ───────────────────────────────────

/** Sign in with email and password */
export async function signIn(email: string, password: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    return { user: null, error: error.message }
  }
  return { user: data.user, error: null }
}

interface SignUpOptions {
  fullName?: string
}

/** Sign up with email and password */
export async function signUp(email: string, password: string, options?: SignUpOptions) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: options?.fullName || null,
      },
    },
  })
  if (error) {
    return { user: null, error: error.message }
  }

  // If user was created and we have a full name, upsert the profile
  if (data.user && options?.fullName) {
    await supabase.from("profiles").upsert({
      id: data.user.id,
      full_name: options.fullName,
    })
  }

  return { user: data.user, error: null }
}

/** Sign out */
export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    return { error: error.message }
  }
  return { error: null }
}

/** Get current session on client */
export async function getSession() {
  const supabase = createClient()
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) {
    return { session: null, error: error.message }
  }
  return { session, error: null }
}
