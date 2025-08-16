import { Code, Zap, Shield, Smartphone, Layers, Download } from "lucide-react"

const features = [
  {
    icon: Code,
    title: "Visual UI Builder",
    description: "Drag and drop interface elements to create professional Roblox UIs without writing code.",
  },
  {
    icon: Zap,
    title: "Instant Code Generation",
    description: "Generate clean, optimized Lua code in real-time as you build your interface.",
  },
  {
    icon: Layers,
    title: "Component Library",
    description: "Access a comprehensive library of pre-built Roblox UI components and templates.",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description: "Build and test your UIs on any device with our responsive design tools.",
  },
  {
    icon: Shield,
    title: "Secure Development",
    description: "Advanced security features including DNS bypass and secure app signing.",
  },
  {
    icon: Download,
    title: "Export & Deploy",
    description: "Export your projects or deploy directly to Roblox with one-click publishing.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
            Everything You Need to Build Better
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional-grade tools designed specifically for Roblox developers who demand quality and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
