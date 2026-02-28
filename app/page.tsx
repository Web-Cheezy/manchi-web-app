import { Header } from "@/components/header"
import { HeroBanner } from "@/components/hero-banner"
import { MenuCategories } from "@/components/menu-categories"
import { PopularDishes } from "@/components/popular-dishes"
import { WhyManchi } from "@/components/why-manchi"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroBanner />
        <MenuCategories />
        <PopularDishes />
        <WhyManchi />
      </main>
      <Footer />
    </div>
  )
}
