"use client"

import { Utensils } from "lucide-react"
import type { Category } from "@/lib/db/types"

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=120&h=120&fit=crop&q=80"

interface MenuCategoriesProps {
  categories: Category[]
  selectedCategoryId?: number | null
  onSelectCategoryId?: (id: number | null) => void
}

export function MenuCategories({ categories, selectedCategoryId = null, onSelectCategoryId }: MenuCategoriesProps) {
  const selectedId = selectedCategoryId ?? null
  const setSelectedId = onSelectCategoryId ?? (() => {})

  return (
    <section id="menu" className="py-4">
      <div className="space-y-3 rounded-2xl border border-border bg-card px-3 py-4 sm:px-4 sm:py-5 lg:px-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-primary/10">
            <Utensils className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm sm:text-base font-semibold text-foreground">What are you in the mood for?</h2>
            <p className="text-[11px] sm:text-xs text-muted-foreground">
              Browse by popular Manchi categories.
            </p>
          </div>
          <a
            href="#"
            className="ml-auto hidden sm:inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:border-primary/50 hover:bg-card transition-colors"
          >
            See all
          </a>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-card to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-card to-transparent" />
          <div className="-mx-2 flex gap-2 overflow-x-auto px-2 pb-1 pt-1 sm:pt-2 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              aria-pressed={selectedId === null}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                selectedId === null
                  ? "border-primary/60 bg-primary/10 text-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/60 hover:bg-card"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedId(cat.id)}
                aria-pressed={selectedId === cat.id}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  selectedId === cat.id
                    ? "border-primary/60 bg-primary/10 text-foreground font-medium"
                    : "border-border bg-background text-foreground hover:border-primary/60 hover:bg-card font-medium"
                }`}
              >
                <div className="h-6 w-6 overflow-hidden rounded-full bg-muted border border-border/60">
                  <img
                    src={cat.image_url || PLACEHOLDER_IMAGE}
                    alt={cat.name}
                    className="h-full w-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
