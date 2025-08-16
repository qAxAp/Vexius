"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Code } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-serif font-bold text-foreground">Vexius</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/ui-builder" className="text-foreground hover:text-primary transition-colors">
              UI Builder
            </Link>
            <Link href="/signers" className="text-foreground hover:text-primary transition-colors">
              Signers
            </Link>
            <Link href="/dns" className="text-foreground hover:text-primary transition-colors">
              DNS Tools
            </Link>
            <Link href="/apps" className="text-foreground hover:text-primary transition-colors">
              Apps
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/ui-builder">Start Building</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/ui-builder"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                UI Builder
              </Link>
              <Link
                href="/signers"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Signers
              </Link>
              <Link
                href="/dns"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                DNS Tools
              </Link>
              <Link
                href="/apps"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Apps
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/ui-builder">Start Building</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
