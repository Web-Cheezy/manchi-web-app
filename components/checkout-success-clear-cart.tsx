"use client"

import { useEffect } from "react"
import { useCart } from "@/lib/cart"

/**
 * Clears the browser cart only after Paystack return + server verification succeeded.
 * Industry pattern: never clear before payment is confirmed; use sessionStorage so refresh
 * does not double-run logic (cart is already empty after first clear).
 */
export function CheckoutSuccessClearCart({ paymentReference }: { paymentReference: string }) {
  const { clearCart } = useCart()

  useEffect(() => {
    if (typeof window === "undefined" || !paymentReference) return
    const key = `manchi_cart_cleared_${paymentReference}`
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, "1")
    clearCart()
  }, [clearCart, paymentReference])

  return null
}
