import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Palette, Shield, Zap } from "lucide-react"

const tools = [
  {
    icon: Palette,
    title: "UI Builder",
    description: "Visual interface builder with drag-and-drop functionality and real-time code generation.",
    href: "/ui-builder",
    color: "bg-primary",
  },
  {
    icon: Shield,
    title: "DNS Tools",
    description: "Advanced DNS bypass and cloaking methods for secure app installation.",
    href: "/dns",
    color: "bg-chart-2",
  },
  {
    icon: Zap,
    title: "App Signers",
    description: "Professional app signing tools for secure distribution and installation.",
    href: "/signers",
    color: "bg-chart-3",
  },
]

export function ToolsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">Powerful Development Tools</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access our complete suite of professional Roblox development tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="p-6">
                <div className={`w-16 h-16 ${tool.color} rounded-xl flex items-center justify-center mb-6`}>
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-3">{tool.title}</h3>
                <p className="text-muted-foreground mb-6">{tool.description}</p>
                <Button asChild className="w-full">
                  <Link href={tool.href}>
                    Open Tool <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
