import { Utensils } from "lucide-react"

const categories = [
  { name: "Jollof Rice", image: "/placeholder.svg?height=120&width=120" },
  { name: "Egusi Soup", image: "/placeholder.svg?height=120&width=120" },
  { name: "Suya", image: "/placeholder.svg?height=120&width=120" },
  { name: "Pounded Yam", image: "/placeholder.svg?height=120&width=120" },
  { name: "Pepper Soup", image: "/placeholder.svg?height=120&width=120" },
  { name: "Puff Puff", image: "/placeholder.svg?height=120&width=120" },
  { name: "Fried Rice", image: "/placeholder.svg?height=120&width=120" },
  { name: "Plantain", image: "/placeholder.svg?height=120&width=120" },
]

export function MenuCategories() {
  return (
    <section id="menu" className="px-4 py-10 lg:px-16">
      <div className="flex items-center gap-3 mb-6">
        <Utensils className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Our Menu</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-xs font-medium text-foreground text-center">{cat.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
