import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
            Build Roblox UIs with <span className="text-primary">Professional Tools</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create stunning Roblox interfaces with our visual builder, generate clean Lua code instantly, and streamline
            your development workflow with professional-grade tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="text-lg px-8">
              <Link href="/ui-builder">
                Start Building <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Hero Image/Preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-card rounded-xl border border-border p-4 shadow-2xl">
              <div className="bg-background rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Visual Builder Preview */}
                  <div className="lg:col-span-2 bg-muted/10 rounded-lg p-4 min-h-[300px] flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                          <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">Visual UI Builder Canvas</p>
                    </div>
                  </div>

                  {/* Tools Panel Preview */}
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <h3 className="font-serif font-semibold mb-4">Tools</h3>
                    <div className="space-y-2">
                      {["Add Frame", "Add Button", "Add TextBox", "Add ImageLabel"].map((tool) => (
                        <div key={tool} className="bg-primary/10 rounded px-3 py-2 text-sm">
                          {tool}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="font-medium mb-2">Generated Code</h4>
                      <div className="bg-background rounded p-2 text-xs font-mono text-primary">
                        {"-- Lua code appears here"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
