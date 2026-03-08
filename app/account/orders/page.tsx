import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "My Orders | Manchi",
  description: "View your order history",
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
        <p className="text-sm text-muted-foreground">
          View your order history and track deliveries
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">No orders yet</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Once you place an order, it will appear here. Start exploring our delicious menu!
          </p>
          <Link href="/">
            <Button className="mt-6">
              Browse Menu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
