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

/**
 * Send a one-time code to the user's email. Supabase may send either a 6-digit code or a magic link
 * depending on project settings. Use verifyEmailCode() to verify the 6-digit code.
 * Works for both sign-in and sign-up (new users are created when they verify).
 */
export async function sendEmailCode(email: string, next = "/") {
  const supabase = createClient()
  const origin = typeof window !== "undefined" ? window.location.origin : ""
  const emailRedirectTo = `${origin}/auth/callback?next=${encodeURIComponent(next)}`
  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim(),
    options: {
      emailRedirectTo,
    },
  })
  if (error) {
    return { success: false, error: error.message }
  }
  return { success: true, error: null }
}

/**
 * Verify the 6-digit code sent to the user's email. Use after sendEmailCode().
 */
export async function verifyEmailCode(email: string, token: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.verifyOtp({
    email: email.trim(),
    token: token.trim(),
    type: "email",
  })
  if (error) {
    return { user: null, error: error.message }
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
