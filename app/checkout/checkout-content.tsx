"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Clock,
  ChevronRight,
  Edit2,
  ShoppingBag,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/lib/cart"
import { formatAddressFull } from "@/lib/db/addresses"
import { formatPrice } from "@/lib/format"
import type { Address } from "@/lib/db/types"

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=100&h=100&fit=crop&q=80"
const VAT_RATE = 0.075
const DELIVERY_FEE = 1500

interface CheckoutContentProps {
  addresses: Address[]
  defaultAddressId: string
  userEmail: string
  userPhone: string
}

export function CheckoutContent({
  addresses,
  defaultAddressId,
  userEmail,
  userPhone,
}: CheckoutContentProps) {
  const { cart, itemCount, subtotal, getItemTotal, clearCart } = useCart()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddressId)
  const [deliveryNotes, setDeliveryNotes] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <CheckoutSkeleton />
  }

  if (cart.items.length === 0) {
    return <EmptyCart />
  }

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) ?? addresses[0]
  const vat = Math.round(subtotal * VAT_RATE)
  const total = subtotal + vat + DELIVERY_FEE

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    
    // TODO: Integrate with Paystack for payment
    // For now, simulate order placement
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    // Clear cart and redirect to success page
    clearCart()
    router.push("/checkout/success")
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Left: Delivery & Payment */}
      <div className="lg:col-span-2 space-y-6">
        {/* Delivery Address */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Delivery Address
            </h2>
            <Link
              href="/account/addresses"
              className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
            >
              <Edit2 className="h-3.5 w-3.5" />
              Manage
            </Link>
          </div>

          <RadioGroup
            value={selectedAddressId}
            onValueChange={setSelectedAddressId}
            className="space-y-3"
          >
            {addresses.map((address) => (
              <label
                key={address.id}
                className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                  selectedAddressId === address.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value={address.id} className="mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {address.title || "Address"}
                    </span>
                    {address.is_default && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatAddressFull(address)}
                  </p>
                </div>
              </label>
            ))}
          </RadioGroup>
        </section>

        {/* Contact Info */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
            <Phone className="h-5 w-5 text-primary" />
            Contact Information
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="h-4 w-4 shrink-0" />
              <span>{userEmail}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0" />
              <span>{userPhone}</span>
            </div>
          </div>
        </section>

        {/* Delivery Notes */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            Delivery Notes
          </h2>

          <Textarea
            placeholder="Add any special instructions for delivery (e.g., gate code, landmark, preferred time)"
            value={deliveryNotes}
            onChange={(e) => setDeliveryNotes(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </section>

        {/* Payment Method */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment Method
          </h2>

          <div className="flex items-center gap-3 rounded-xl border border-primary bg-primary/5 p-4">
            <div className="h-10 w-16 rounded bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">PAYSTACK</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Pay with Paystack</p>
              <p className="text-xs text-muted-foreground">
                Card, Bank Transfer, USSD, or Mobile Money
              </p>
            </div>
            <CheckCircle2 className="h-5 w-5 text-primary" />
          </div>
        </section>
      </div>

      {/* Right: Order Summary */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Order Summary</h2>
            <Link href="/cart" className="text-sm text-primary font-medium hover:underline">
              Edit
            </Link>
          </div>

          {/* Items */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {cart.items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="h-14 w-14 rounded-lg overflow-hidden bg-muted shrink-0">
                  <img
                    src={item.foodImage || PLACEHOLDER_IMAGE}
                    alt={item.foodName}
                    className="h-full w-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm line-clamp-1">
                    {item.quantity}× {item.foodName}
                  </p>
                  {item.sides.length > 0 && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      + {item.sides.map((s) => s.name).join(", ")}
                    </p>
                  )}
                </div>
                <span className="text-sm font-medium text-foreground shrink-0">
                  ₦{formatPrice(getItemTotal(item))}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="space-y-3 text-sm border-t border-border pt-4">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal ({itemCount} items)</span>
              <span>₦{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>VAT (7.5%)</span>
              <span>₦{formatPrice(vat)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery fee</span>
              <span>₦{formatPrice(DELIVERY_FEE)}</span>
            </div>
            <div className="flex justify-between font-semibold text-foreground text-lg pt-3 border-t border-border">
              <span>Total</span>
              <span>₦{formatPrice(total)}</span>
            </div>
          </div>

          {/* Place Order Button */}
          <Button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            size="lg"
            className="w-full h-12 text-base font-semibold"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Pay ₦{formatPrice(total)}
                <ChevronRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By placing this order, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-muted p-6 mb-6">
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
      <p className="text-muted-foreground mb-8 max-w-sm">
        Add some items to your cart before checking out.
      </p>
      <Button asChild size="lg">
        <Link href="/menu">Browse menu</Link>
      </Button>
    </div>
  )
}

function CheckoutSkeleton() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="h-48 rounded-2xl bg-muted animate-pulse" />
        <div className="h-32 rounded-2xl bg-muted animate-pulse" />
        <div className="h-40 rounded-2xl bg-muted animate-pulse" />
      </div>
      <div className="lg:col-span-1">
        <div className="h-96 rounded-2xl bg-muted animate-pulse" />
      </div>
    </div>
  )
}
