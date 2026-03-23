import { NextResponse } from "next/server"
import { resolveApiUserId } from "@/lib/api-auth"
import { createOrder } from "@/lib/db/orders.server"
import type { CartItem, DeliveryMethod, StoreLocation } from "@/lib/db/types"
import { nairaToKobo } from "@/lib/paystack.server"

export async function POST(req: Request) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json({ error: "Payment is not configured." }, { status: 500 })
  }

  const body = (await req.json().catch(() => null)) as null | {
    cart_items?: CartItem[]
    subtotal?: number
    vat?: number
    total?: number
    delivery_method?: DeliveryMethod
    location?: StoreLocation
    delivery_address?: string | null
    delivery_notes?: string | null
    callback_url?: string
    /** Mobile / API key clients: same as your backend docs */
    user_id?: string
    userId?: string
    email?: string
  }

  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const { userId, email: emailFromSession, error: authError } = await resolveApiUserId(
    req,
    body?.user_id ?? body?.userId
  )
  if (!userId || authError) {
    return NextResponse.json({ error: authError ?? "Unauthorized" }, { status: 401 })
  }

  const paystackEmail = (emailFromSession ?? body?.email)?.trim()
  if (!paystackEmail) {
    return NextResponse.json(
      { error: "Email is required for checkout (sign in on web, or send email in the request body for API clients)." },
      { status: 400 }
    )
  }

  if (!body?.cart_items || !Array.isArray(body.cart_items) || body.cart_items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 })
  }

  const total = body.total
  const vat = body.vat
  if (typeof total !== "number" || total <= 0 || typeof vat !== "number" || vat < 0) {
    return NextResponse.json({ error: "Invalid order totals." }, { status: 400 })
  }

  const delivery_method = body.delivery_method
  if (delivery_method !== "delivery" && delivery_method !== "pickup") {
    return NextResponse.json({ error: "Invalid delivery method." }, { status: 400 })
  }

  const location = body.location
  if (location !== "Chasemall" && location !== "Aurora") {
    return NextResponse.json({ error: "Invalid location." }, { status: 400 })
  }

  if (delivery_method === "delivery" && !body.delivery_address?.trim()) {
    return NextResponse.json({ error: "Delivery address is required for delivery." }, { status: 400 })
  }

  const amountKobo = nairaToKobo(total)

  // 1) Create order first (same schema as mobile — no paystack_reference column required).
  const created = await createOrder({
    user_id: userId,
    total_amount: total,
    vat,
    delivery_method,
    delivery_address: body.delivery_address?.trim() ?? null,
    location,
    items: {
      cart_items: body.cart_items,
      delivery_notes: body.delivery_notes?.trim() ?? null,
    },
    status: "awaiting_payment",
  })

  if (!created) {
    return NextResponse.json(
      { error: "Could not save your order. Check Supabase logs and that the service role key is set if RLS blocks inserts." },
      { status: 500 }
    )
  }

  // 2) Paystack initialize with metadata.order_id — verify API echoes this so we mark paid without storing reference on orders.
  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: paystackEmail,
      amount: amountKobo,
      callback_url: body.callback_url,
      metadata: {
        user_id: userId,
        order_id: String(created.id),
      },
    }),
  })

  const json = (await res.json().catch(() => null)) as {
    status?: boolean
    message?: string
    data?: { authorization_url?: string; reference?: string; access_code?: string }
  }

  if (!res.ok || !json?.status || !json.data?.authorization_url || !json.data?.reference) {
    return NextResponse.json(
      { error: json?.message || "Order was created but payment could not be started. You can retry from My Orders or contact support." },
      { status: 500 }
    )
  }

  return NextResponse.json({
    authorization_url: json.data.authorization_url,
    reference: json.data.reference,
  })
}
