"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/ui/components/Button"
import Menu from "@/ui/icons/Menu"
import Close from "@/ui/icons/Close"

const navLinks = [
  { href: "#", label: "Products" },
  { href: "#", label: "Solutions" },
  { href: "#", label: "Pricing" },
  { href: "#", label: "Resources" },
]

export function Navbar01() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const closeMenu = () => {
    setIsClosing(true)
    setTimeout(() => {
      setMobileMenuOpen(false)
      setIsClosing(false)
    }, 300)
  }

  const toggleMenu = () => {
    if (mobileMenuOpen) {
      closeMenu()
    } else {
      setMobileMenuOpen(true)
    }
  }

  return (
    <nav className="relative border-b border-border bg-background">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-lg sm:text-xl font-bold">
          Logo
        </Link>

        {/* Navigation Links - Hidden on mobile/tablet */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="small" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button size="small" className="hidden sm:inline-flex">
            Get Started
          </Button>
          {/* Mobile menu button */}
          <Button
            variant="outline"
            size="small"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {mobileMenuOpen ? <Close className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden fixed inset-x-0 top-[57px] h-[calc(100vh-57px)] bg-background border-t border-border z-50 overflow-y-auto ${
            isClosing ? "animate-slide-out-right" : "animate-slide-in-right"
          }`}
        >
          <div className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-3 rounded-md text-sm font-medium hover:bg-accent transition-colors"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border sm:hidden">
              <Button variant="ghost" size="small" className="w-full justify-center">
                Sign in
              </Button>
              <Button size="small" className="w-full justify-center">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
