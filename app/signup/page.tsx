import { redirect } from "next/navigation"

/**
 * Sign up is the same as sign in: use "Continue with email" on the login page.
 * We send a code; new users get an account when they verify.
 */
export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>
}) {
  const params = await searchParams
  const redirectTo = params.redirect ?? "/"
  redirect(`/login?redirect=${encodeURIComponent(redirectTo)}`)
}
