import { Header } from "@/components/header"
import { HeroBanner } from "@/components/hero-banner"
import { MenuCategories } from "@/components/menu-categories"
import { PopularDishes } from "@/components/popular-dishes"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroBanner />
        <MenuCategories />
        <PopularDishes />
      </main>
      <Footer />
    </div>
  )
}
