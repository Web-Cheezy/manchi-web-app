import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth.server"
import { getOrdersForUser } from "@/lib/db/orders.server"
import { formatPrice } from "@/lib/format"
import type { Order } from "@/lib/db/types"

export const metadata = {
  title: "My Orders | Manchi",
  description: "View your order history",
}

function OrderCard({ order }: { order: Order }) {
  const date = new Date(order.created_at)
  const items = order.items as { cart_items?: unknown[] } | null
  const lineCount = Array.isArray(items?.cart_items) ? items.cart_items.length : 0

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm text-muted-foreground">Order #{order.id}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {date.toLocaleString("en-NG", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
            order.status === "paid"
              ? "bg-green-500/15 text-green-700 dark:text-green-400"
              : order.status === "awaiting_payment"
                ? "bg-amber-500/15 text-amber-800 dark:text-amber-300"
                : "bg-muted text-muted-foreground"
          }`}
        >
          {order.status.replace(/_/g, " ")}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span>
          {order.delivery_method === "pickup" ? "Pickup" : "Delivery"} · {order.location ?? "—"}
        </span>
        {lineCount > 0 && <span>{lineCount} line item{lineCount !== 1 ? "s" : ""}</span>}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="font-semibold text-foreground">₦{formatPrice(order.total_amount)}</span>
        <span className="text-xs text-muted-foreground">VAT incl. where applicable</span>
      </div>
    </div>
  )
}

export default async function OrdersPage() {
  const user = await getUser()
  if (!user) {
    redirect("/login?redirect=/account/orders")
  }

  const orders = await getOrdersForUser(user.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
        <p className="text-sm text-muted-foreground">
          View your order history and track deliveries
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">No orders yet</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              Once you place an order and complete payment, it will appear here.
            </p>
            <Link href="/menu">
              <Button className="mt-6">Browse menu</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}
