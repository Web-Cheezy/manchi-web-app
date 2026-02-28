import { Star, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const dishes = [
  {
    name: "Jollof Rice & Chicken",
    price: "3,500",
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=200&width=300",
    tag: "Best Seller",
  },
  {
    name: "Egusi Soup with Pounded Yam",
    price: "4,200",
    rating: 4.9,
    reviews: 98,
    image: "/placeholder.svg?height=200&width=300",
    tag: "Popular",
  },
  {
    name: "Suya Platter",
    price: "2,800",
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=300",
    tag: null,
  },
  {
    name: "Pepper Soup (Catfish)",
    price: "5,000",
    rating: 4.6,
    reviews: 87,
    image: "/placeholder.svg?height=200&width=300",
    tag: "Spicy",
  },
  {
    name: "Ofada Rice & Sauce",
    price: "3,800",
    rating: 4.8,
    reviews: 72,
    image: "/placeholder.svg?height=200&width=300",
    tag: null,
  },
  {
    name: "Fried Plantain & Beans",
    price: "2,500",
    rating: 4.5,
    reviews: 63,
    image: "/placeholder.svg?height=200&width=300",
    tag: "Value",
  },
]

export function PopularDishes() {
  return (
    <section id="popular" className="px-4 py-10 lg:px-16 bg-secondary/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Popular Dishes</h2>
        <a href="#" className="text-sm text-primary font-medium hover:underline">View All</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {dishes.map((dish) => (
          <div
            key={dish.name}
            className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow group"
          >
            <div className="relative h-44 overflow-hidden bg-muted">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {dish.tag && (
                <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
                  {dish.tag}
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground text-base">{dish.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-3.5 w-3.5 text-accent fill-accent" />
                <span className="text-xs font-medium text-foreground">{dish.rating}</span>
                <span className="text-xs text-muted-foreground">({dish.reviews})</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-foreground">{'\u20A6'}{dish.price}</span>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-8 w-8 p-0"
                  aria-label={`Add ${dish.name} to cart`}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
