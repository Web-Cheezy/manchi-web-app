import { Utensils } from "lucide-react"

const categories = [
  { name: "Jollof Rice", image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=120&h=120&fit=crop&q=80" },
  { name: "Egusi Soup", image: "https://images.unsplash.com/photo-1567364816519-cbc9c4ffe1eb?w=120&h=120&fit=crop&q=80" },
  { name: "Suya", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=120&h=120&fit=crop&q=80" },
  { name: "Pounded Yam", image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=120&h=120&fit=crop&q=80" },
  { name: "Pepper Soup", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=120&h=120&fit=crop&q=80" },
  { name: "Puff Puff", image: "https://images.unsplash.com/photo-1517433367941-f7ef4e027d40?w=120&h=120&fit=crop&q=80" },
  { name: "Fried Rice", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=120&h=120&fit=crop&q=80" },
  { name: "Plantain", image: "https://images.unsplash.com/photo-1528751014936-863e6e7a319c?w=120&h=120&fit=crop&q=80" },
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
                crossOrigin="anonymous"
              />
            </div>
            <span className="text-xs font-medium text-foreground text-center">{cat.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
