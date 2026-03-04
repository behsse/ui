"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/ui/components/Button"
import { Input } from "@/ui/components/Input"
import Menu from "@/ui/icons/Menu"
import Close from "@/ui/icons/Close"

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "About" },
  { href: "#", label: "Services" },
  { href: "#", label: "Contact" },
]

export function Navbar02() {
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
    <nav className="relative bg-background border-b border-border">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 gap-4">
        {/* Logo */}
        <Link href="/" className="text-lg sm:text-xl font-bold shrink-0">
          Brand
        </Link>

        {/* Center: Search - Hidden on mobile, shown on tablet+ */}
        <div className="hidden sm:flex flex-1 max-w-xs lg:max-w-md mx-4">
          <Input
            type="search"
            placeholder="Search..."
            className="w-full"
          />
        </div>

        {/* Navigation Links - Hidden on mobile and tablet */}
        <div className="hidden lg:flex items-center gap-6">
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
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="small" className="hidden sm:inline-flex">
            Login
          </Button>
          <Button size="small" className="hidden sm:inline-flex">
            Sign up
          </Button>
          {/* Mobile/Tablet menu button */}
          <Button
            variant="outline"
            size="small"
            className="lg:hidden"
            onClick={toggleMenu}
          >
            {mobileMenuOpen ? <Close className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile/Tablet menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden fixed inset-x-0 top-[49px] h-[calc(100vh-49px)] bg-background border-t border-border z-50 overflow-y-auto ${
            isClosing ? "animate-slide-out-right" : "animate-slide-in-right"
          }`}
        >
          <div className="flex flex-col p-4 gap-1">
            {/* Search on mobile */}
            <div className="sm:hidden mb-4">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full"
              />
            </div>
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
              <Button variant="outline" size="small" className="w-full justify-center">
                Login
              </Button>
              <Button size="small" className="w-full justify-center">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
