import { Clock, Truck, Award, Shield } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Get your food in 30 minutes or less",
  },
  {
    icon: Award,
    title: "Authentic Recipes",
    description: "Traditional Nigerian flavours, made fresh daily",
  },
  {
    icon: Truck,
    title: "Wide Coverage",
    description: "We deliver across Lagos and Abuja",
  },
  {
    icon: Shield,
    title: "Safe & Hygienic",
    description: "Prepared with the highest safety standards",
  },
]

export function WhyManchi() {
  return (
    <section id="about" className="px-4 py-12 lg:px-16">
      <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Why Choose Manchi?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
