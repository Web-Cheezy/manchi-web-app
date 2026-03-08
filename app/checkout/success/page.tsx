import Link from "next/link"
import { CheckCircle, Home, ShoppingBag, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getUser } from "@/lib/auth.server"
import { getAddresses } from "@/lib/db/addresses.server"
import { getProfileServer } from "@/lib/db/profiles.server"
import { isPhoneMissing } from "@/lib/db/profiles"
import { getFoods } from "@/lib/db"

export default async function CheckoutSuccessPage() {
  const user = await getUser()
  const [addresses, profile, foods] = await Promise.all([
    user ? getAddresses(user.id) : Promise.resolve([]),
    user ? getProfileServer(user.id) : Promise.resolve(null),
    getFoods(),
  ])

  const defaultAddress = addresses.find((a) => a.is_default) ?? addresses[0] ?? null
  const profileIncomplete = user ? isPhoneMissing(profile) : false

  return (
    <div className="min-h-screen bg-background">
      <Header
        addresses={addresses}
        selectedAddress={defaultAddress}
        userId={user?.id ?? null}
        profileIncomplete={profileIncomplete}
        foods={foods}
      />

      <main className="max-w-2xl mx-auto px-4 lg:px-0 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-3">
            Order Placed Successfully!
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Thank you for your order. We've received it and will start preparing your delicious meal right away.
          </p>

          {/* Order Info Card */}
          <div className="rounded-2xl border border-border bg-card p-6 mb-8 text-left">
            <h2 className="font-semibold text-foreground mb-4">What happens next?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Order Confirmed</p>
                  <p className="text-sm text-muted-foreground">
                    We've received your order and payment is being processed.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-muted-foreground">2</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Preparing Your Food</p>
                  <p className="text-sm text-muted-foreground">
                    Our chefs will prepare your meal with fresh ingredients.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-muted-foreground">3</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">On the Way</p>
                  <p className="text-sm text-muted-foreground">
                    A rider will pick up your order and deliver it to you.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Estimated delivery: 30-45 minutes</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link href="/account/orders">
                <ShoppingBag className="mr-2 h-5 w-5" />
                View My Orders
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
