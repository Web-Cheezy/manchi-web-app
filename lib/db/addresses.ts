import { createClient } from "./client"
import type { Address, AddressInput, DefaultAddressSummary } from "./types"
import { addressShortLabel } from "@/lib/format"

// ─── Client-side functions (for Client Components) ─────────────────────────

/** Create a new address */
export async function createAddress(userId: string, input: AddressInput): Promise<Address | null> {
  const supabase = createClient()

  // If this is set as default, unset other defaults first
  if (input.is_default) {
    await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", userId)
  }

  const { data, error } = await supabase
    .from("addresses")
    .insert({
      user_id: userId,
      title: input.title || null,
      state: input.state,
      lga: input.lga,
      area: input.area,
      street: input.street,
      house_number: input.house_number,
      is_default: input.is_default ?? false,
    })
    .select()
    .single()

  if (error) {
    console.error("[createAddress]", error.message)
    return null
  }
  return data as Address
}

/** Update an existing address */
export async function updateAddress(id: string, userId: string, input: Partial<AddressInput>): Promise<Address | null> {
  const supabase = createClient()

  // If setting as default, unset other defaults first
  if (input.is_default) {
    await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", userId)
      .neq("id", id)
  }

  const { data, error } = await supabase
    .from("addresses")
    .update({
      ...(input.title !== undefined && { title: input.title }),
      ...(input.state !== undefined && { state: input.state }),
      ...(input.lga !== undefined && { lga: input.lga }),
      ...(input.area !== undefined && { area: input.area }),
      ...(input.street !== undefined && { street: input.street }),
      ...(input.house_number !== undefined && { house_number: input.house_number }),
      ...(input.is_default !== undefined && { is_default: input.is_default }),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single()

  if (error) {
    console.error("[updateAddress]", error.message)
    return null
  }
  return data as Address
}

/** Delete an address */
export async function deleteAddress(id: string, userId: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", id)
    .eq("user_id", userId)

  if (error) {
    console.error("[deleteAddress]", error.message)
    return false
  }
  return true
}

/** Set an address as the default (and unset others) */
export async function setDefaultAddress(id: string, userId: string): Promise<boolean> {
  const supabase = createClient()

  // Unset all other defaults
  const { error: unsetError } = await supabase
    .from("addresses")
    .update({ is_default: false })
    .eq("user_id", userId)

  if (unsetError) {
    console.error("[setDefaultAddress] unset error", unsetError.message)
    return false
  }

  // Set the new default
  const { error: setError } = await supabase
    .from("addresses")
    .update({ is_default: true, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", userId)

  if (setError) {
    console.error("[setDefaultAddress] set error", setError.message)
    return false
  }
  return true
}

// ─── Helpers ───────────────────────────────────────────────────────────────

export function toDefaultAddressSummary(a: Address): DefaultAddressSummary {
  return {
    id: a.id,
    title: a.title,
    area: a.area,
    street: a.street,
    house_number: a.house_number,
    shortLabel: addressShortLabel(a.area, a.street, a.house_number),
  }
}

export function formatAddressFull(a: Address): string {
  return [a.house_number, a.street, a.area, a.lga, a.state].filter(Boolean).join(", ")
}
