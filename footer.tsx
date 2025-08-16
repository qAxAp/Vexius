import Link from "next/link"
import { Code } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-serif font-bold text-foreground">Vexius</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Professional Roblox development platform for modern developers.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ui-builder" className="text-muted-foreground hover:text-primary transition-colors">
                  UI Builder
                </Link>
              </li>
              <li>
                <Link href="/signers" className="text-muted-foreground hover:text-primary transition-colors">
                  App Signers
                </Link>
              </li>
              <li>
                <Link href="/dns" className="text-muted-foreground hover:text-primary transition-colors">
                  DNS Tools
                </Link>
              </li>
              <li>
                <Link href="/apps" className="text-muted-foreground hover:text-primary transition-colors">
                  Apps
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-muted-foreground hover:text-primary transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-muted-foreground hover:text-primary transition-colors">
                  Examples
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Vexius. All rights reserved. Built for the Roblox developer community.
          </p>
        </div>
      </div>
    </footer>
  )
}
