"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Get 10% Off",
    subtitle: "Your First Order!",
    description:
      "Order your favourite Nigerian dishes and enjoy a special discount on us. Use code MANCHI10 at checkout.",
    bgColor: "bg-gradient-to-r from-primary/90 to-accent/80",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Earn \u20A62,000",
    subtitle: "Just By Sharing!",
    description:
      "Share your unique referral link with friends. When they make their first \u20A61,500+ order, you both get \u20A62,000.",
    bgColor: "bg-gradient-to-r from-accent/90 to-primary/80",
    image: "https://images.unsplash.com/photo-1567364816519-cbc9c4ffe1eb?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Free Delivery",
    subtitle: "On Orders Over \u20A65,000",
    description:
      "Enjoy free delivery when you order above \u20A65,000. Fresh Nigerian food straight to your doorstep!",
    bgColor: "bg-gradient-to-r from-primary/80 to-primary",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&h=400&fit=crop&q=80",
  },
]

export function HeroBanner() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <section className="relative w-full overflow-hidden" aria-label="Promotional banners">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full">
            <div
              className={`${slide.bgColor} relative min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] flex items-center`}
            >
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full px-6 py-10 lg:px-16 lg:py-14 gap-6">
                <div className="max-w-lg">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground tracking-tight text-balance">
                    {slide.title}
                  </h2>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-foreground/90 mt-1 text-balance">
                    {slide.subtitle}
                  </h3>
                  <div className="mt-4 bg-foreground/80 rounded-lg p-4 max-w-md">
                    <p className="text-sm text-primary-foreground leading-relaxed">{slide.description}</p>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <img
                    src={slide.image}
                    alt=""
                    className="w-64 h-64 object-cover rounded-xl shadow-lg"
                    crossOrigin="anonymous"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card rounded-full p-2 shadow-md transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card rounded-full p-2 shadow-md transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 text-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current ? "bg-primary-foreground" : "bg-primary-foreground/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
