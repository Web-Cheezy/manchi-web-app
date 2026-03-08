import "server-only"
import { getServerClient } from "./server"
import type { Address, DefaultAddressSummary } from "./types"
import { toDefaultAddressSummary } from "./addresses"

// ─── Server-side functions (for Server Components) ─────────────────────────

/** Get all addresses for a user */
export async function getAddresses(userId: string): Promise<Address[]> {
  const supabase = await getServerClient()
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", userId)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[getAddresses]", error.message)
    return []
  }
  return (data ?? []) as Address[]
}

/** Get the user's default address */
export async function getDefaultAddress(userId: string): Promise<DefaultAddressSummary | null> {
  const supabase = await getServerClient()
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", userId)
    .eq("is_default", true)
    .single()

  if (error || !data) return null
  return toDefaultAddressSummary(data as Address)
}

/** Get a single address by ID */
export async function getAddressById(id: string): Promise<Address | null> {
  const supabase = await getServerClient()
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !data) return null
  return data as Address
}
