"use client"

import { useState } from "react"
import { Menu, ShoppingCart, X, MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

export function Header() {
  const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery")

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      {/* Main nav row */}
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Open menu" className="text-foreground">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-card">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-4 mt-8 px-2">
                <a href="#" className="text-lg font-medium text-foreground hover:text-primary transition-colors">Home</a>
                <a href="#menu" className="text-lg font-medium text-foreground hover:text-primary transition-colors">Menu</a>
                <a href="#popular" className="text-lg font-medium text-foreground hover:text-primary transition-colors">Popular</a>
                <a href="#about" className="text-lg font-medium text-foreground hover:text-primary transition-colors">About Us</a>
                <a href="#contact" className="text-lg font-medium text-foreground hover:text-primary transition-colors">Contact</a>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <a href="/" className="flex flex-col leading-none">
            <span className="text-xs font-bold text-primary tracking-wide">eat</span>
            <span className="text-2xl font-extrabold text-foreground tracking-tight -mt-1">Manchi</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button aria-label="Cart" className="relative text-foreground hover:text-primary transition-colors">
            <ShoppingCart className="h-6 w-6" />
          </button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-semibold">
            Login
          </Button>
        </div>
      </div>

      {/* Delivery / Pickup + Address row */}
      <div className="flex items-center justify-between px-4 pb-3 lg:px-8">
        <div className="flex items-center gap-1 bg-muted rounded-full p-1">
          <button
            onClick={() => setActiveTab("delivery")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === "delivery"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Delivery
          </button>
          <button
            onClick={() => setActiveTab("pickup")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === "pickup"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Pickup
          </button>
        </div>

        <button className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="max-w-[200px] truncate">12 Adeola Odeku, Victoria Island...</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
