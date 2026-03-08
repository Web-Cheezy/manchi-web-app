"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Plus, Minus, ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidesSelector, calculateSidesTotal, type SelectedSide } from "@/components/sides-selector"
import { useCart } from "@/lib/cart"
import type { FoodWithCategory, SideForFood, CartSideItem } from "@/lib/db/types"
import { formatPrice } from "@/lib/format"

interface FoodDetailClientProps {
  food: FoodWithCategory
  sides: {
    required: SideForFood[]
    optional: SideForFood[]
  }
}

export function FoodDetailClient({ food, sides }: FoodDetailClientProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSides, setSelectedSides] = useState<SelectedSide[]>([])
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart, itemCount } = useCart()

  const incrementQuantity = () => setQuantity((q) => Math.min(q + 1, 10))
  const decrementQuantity = () => setQuantity((q) => Math.max(q - 1, 1))

  const handleSidesChange = useCallback((selection: SelectedSide[]) => {
    setSelectedSides(selection)
  }, [])

  const hasRequiredSides = sides.required.length > 0
  const isRequiredSelected = !hasRequiredSides || selectedSides.some((s) => s.side.is_required)
  
  const sidesTotal = calculateSidesTotal(selectedSides)
  const itemTotal = (food.price + sidesTotal) * quantity

  const handleAddToCart = () => {
    if (!isRequiredSelected) {
      return
    }

    // Convert selected sides to cart format
    const cartSides: CartSideItem[] = selectedSides.map(({ side, quantity: sideQty }) => ({
      id: side.id,
      name: side.name,
      price: side.price,
      quantity: sideQty,
      image_url: side.image_url,
    }))

    addToCart({
      foodId: food.id,
      foodName: food.name,
      foodPrice: food.price,
      foodImage: food.image_url,
      quantity,
      sides: cartSides,
    })

    // Show success feedback
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const hasSides = sides.required.length > 0 || sides.optional.length > 0

  return (
    <div className="mt-8 pt-6 border-t border-border space-y-6">
      {/* Sides Selector */}
      {hasSides && (
        <SidesSelector
          sides={sides}
          onSelectionChange={handleSidesChange}
        />
      )}

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-foreground">Quantity</span>
        <div className="flex items-center gap-3 bg-muted rounded-full p-1">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="h-8 w-8 rounded-full flex items-center justify-center bg-card text-foreground hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-semibold text-foreground">{quantity}</span>
          <button
            onClick={incrementQuantity}
            disabled={quantity >= 10}
            className="h-8 w-8 rounded-full flex items-center justify-center bg-card text-foreground hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Price Summary */}
      {sidesTotal > 0 && (
        <div className="rounded-xl bg-muted/50 p-4 space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>{food.name}</span>
            <span>₦{formatPrice(food.price)}</span>
          </div>
          {selectedSides.map(({ side, quantity: sideQty }) => (
            <div key={side.id} className="flex justify-between text-muted-foreground">
              <span>{side.name} {sideQty > 1 && `× ${sideQty}`}</span>
              <span>₦{formatPrice(side.price * sideQty)}</span>
            </div>
          ))}
          <div className="flex justify-between font-medium text-foreground pt-2 border-t border-border">
            <span>Per item</span>
            <span>₦{formatPrice(food.price + sidesTotal)}</span>
          </div>
        </div>
      )}

      {/* Add to Cart */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={!food.is_available || !isRequiredSelected || addedToCart}
          size="lg"
          className={`flex-1 h-12 text-base font-semibold transition-all ${
            addedToCart ? "bg-green-600 hover:bg-green-600" : ""
          }`}
        >
          {addedToCart ? (
            <>
              <Check className="mr-2 h-5 w-5" />
              Added to cart!
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart — ₦{formatPrice(itemTotal)}
            </>
          )}
        </Button>
        {itemCount > 0 && (
          <Button asChild variant="outline" size="lg" className="h-12">
            <Link href="/cart">
              View Cart ({itemCount})
            </Link>
          </Button>
        )}
      </div>

      {/* Success Message */}
      {addedToCart && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-3 text-sm text-green-700 dark:text-green-400">
          <Check className="h-4 w-4 shrink-0" />
          <span>
            {quantity} × {food.name} added to your cart.{" "}
            <Link href="/cart" className="font-medium underline hover:no-underline">
              View cart
            </Link>
          </span>
        </div>
      )}

      {!food.is_available && (
        <p className="text-sm text-destructive">
          This item is currently unavailable. Please check back later.
        </p>
      )}

      {food.is_available && hasRequiredSides && !isRequiredSelected && (
        <p className="text-sm text-destructive">
          Please select a required side to add this item to your cart.
        </p>
      )}
    </div>
  )
}
