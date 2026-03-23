"use client"

import { useEffect, useRef } from "react"
import { useCart } from "@/lib/cart"

/** Clears local cart once after returning from Paystack (order is stored in DB). */
export function CheckoutSuccessClearCart() {
  const { clearCart } = useCart()
  const didRun = useRef(false)

  useEffect(() => {
    if (didRun.current) return
    didRun.current = true
    clearCart()
  }, [clearCart])

  return null
}
