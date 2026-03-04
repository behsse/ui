import React from "react"

export interface SourceFile {
  file: string
  path: string
  code: string
  description?: string
}

export interface Slice {
  name: string
  description: string
  category: string
  commands: {
    id: number
    name: string
    command: string
  }[]
  sourceFiles?: SourceFile[]
}

export interface SliceCategory {
  id: string
  name: string
  description: string
  preview: React.ReactNode
}

// Preview minimaliste pour chaque catégorie (affiché dans la page listing)
const getNavbarCategoryPreview = () => (
  <div className="w-full">
    <div className="flex items-center justify-between px-3 py-2 border border-border rounded-md bg-background">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded bg-primary" />
        <div className="hidden sm:flex items-center gap-1.5">
          <div className="h-1.5 w-6 bg-muted-foreground/40 rounded" />
          <div className="h-1.5 w-6 bg-muted-foreground/40 rounded" />
          <div className="h-1.5 w-6 bg-muted-foreground/40 rounded" />
        </div>
      </div>
      <div className="h-2 w-10 bg-primary rounded" />
    </div>
  </div>
)

const getHeroCategoryPreview = () => (
  <div className="w-full flex flex-col items-center gap-1.5 py-2">
    <div className="h-1.5 w-8 bg-primary/40 rounded-full" />
    <div className="h-2.5 w-20 bg-foreground/80 rounded" />
    <div className="h-1.5 w-16 bg-muted-foreground/40 rounded" />
    <div className="flex gap-1 mt-1">
      <div className="h-2 w-8 bg-primary rounded" />
      <div className="h-2 w-8 bg-muted-foreground/20 rounded border border-border" />
    </div>
  </div>
)

const getFooterCategoryPreview = () => (
  <div className="w-full space-y-1.5">
    <div className="border-t border-border" />
    <div className="flex items-center justify-between px-3 py-1">
      <div className="flex items-center gap-1.5">
        <div className="h-2.5 w-2.5 rounded bg-primary" />
        <div className="h-1.5 w-8 bg-foreground/60 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="h-1.5 w-6 bg-muted-foreground/40 rounded" />
        <div className="h-1.5 w-6 bg-muted-foreground/40 rounded" />
      </div>
    </div>
  </div>
)

const getPricingCategoryPreview = () => (
  <div className="w-full flex items-end justify-center gap-1.5 py-2">
    <div className="w-8 rounded border border-border bg-background p-1 space-y-1">
      <div className="h-1 w-4 bg-muted-foreground/40 rounded" />
      <div className="h-1.5 w-full bg-muted-foreground/20 rounded" />
    </div>
    <div className="w-9 rounded border border-primary bg-background p-1 space-y-1 -mt-1">
      <div className="h-1 w-3 bg-primary/60 rounded" />
      <div className="h-1.5 w-full bg-primary rounded" />
    </div>
    <div className="w-8 rounded border border-border bg-background p-1 space-y-1">
      <div className="h-1 w-4 bg-muted-foreground/40 rounded" />
      <div className="h-1.5 w-full bg-muted-foreground/20 rounded" />
    </div>
  </div>
)

export const sliceCategories: SliceCategory[] = [
  { id: "navbar", name: "Navbars", description: "Navigation bars and header sections", preview: getNavbarCategoryPreview() },
  { id: "hero", name: "Heroes", description: "Hero sections with headlines and CTAs", preview: getHeroCategoryPreview() },
  { id: "pricing", name: "Pricing", description: "Pricing sections with plan cards and CTAs", preview: getPricingCategoryPreview() },
  { id: "footer", name: "Footers", description: "Page footer sections", preview: getFooterCategoryPreview() },
]

export const slices: Record<string, Slice> = {
  "navbar-01": {
    name: "Navbar 01",
    description: "A simple responsive navbar with logo, navigation links, and CTA buttons.",
    category: "navbar",
    commands: [
      { id: 1, name: "pnpm", command: "pnpm dlx behsseui add slices/Navbar01" },
      { id: 2, name: "npx", command: "npx behsseui add slices/Navbar01" },
      { id: 3, name: "yarn", command: "yarn dlx behsseui add slices/Navbar01" },
      { id: 4, name: "bun", command: "bunx behsseui add slices/Navbar01" },
    ],
    sourceFiles: [
      {
        file: "Navbar01.tsx",
        path: "slices/Navbar01.tsx",
        code: `"use client"

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
          className={\`md:hidden fixed inset-x-0 top-[57px] h-[calc(100vh-57px)] bg-background border-t border-border z-50 overflow-y-auto \${
            isClosing ? "animate-slide-out-right" : "animate-slide-in-right"
          }\`}
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
}`,
      },
    ],
  },
  "navbar-02": {
    name: "Navbar 02",
    description: "A navbar with centered search bar and navigation links.",
    category: "navbar",
    commands: [
      { id: 1, name: "pnpm", command: "pnpm dlx behsseui add slices/Navbar02" },
      { id: 2, name: "npx", command: "npx behsseui add slices/Navbar02" },
      { id: 3, name: "yarn", command: "yarn dlx behsseui add slices/Navbar02" },
      { id: 4, name: "bun", command: "bunx behsseui add slices/Navbar02" },
    ],
    sourceFiles: [
      {
        file: "Navbar02.tsx",
        path: "slices/Navbar02.tsx",
        code: `"use client"

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
          className={\`lg:hidden fixed inset-x-0 top-[49px] h-[calc(100vh-49px)] bg-background border-t border-border z-50 overflow-y-auto \${
            isClosing ? "animate-slide-out-right" : "animate-slide-in-right"
          }\`}
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
}`,
      },
    ],
  },
  "hero-01": {
    name: "Hero 01",
    description: "A centered hero section with badge, headline, description, and action buttons.",
    category: "hero",
    commands: [
      { id: 1, name: "pnpm", command: "pnpm dlx behsseui add slices/Hero01" },
      { id: 2, name: "npx", command: "npx behsseui add slices/Hero01" },
      { id: 3, name: "yarn", command: "yarn dlx behsseui add slices/Hero01" },
      { id: 4, name: "bun", command: "bunx behsseui add slices/Hero01" },
    ],
    sourceFiles: [
      {
        file: "Hero01.tsx",
        path: "slices/Hero01.tsx",
        code: `import { Button } from "@/ui/components/Button"
import { Badge } from "@/ui/components/Badge"

export function Hero01() {
  return (
    <section className="min-h-screen flex items-center py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Badge */}
        <Badge variant="secondary" className="px-3 sm:px-4 py-1">
          New Release
        </Badge>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Build beautiful interfaces{" "}
          <span className="text-primary block sm:inline">faster than ever</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
          A collection of beautifully designed components built with React and
          Tailwind CSS. Open source and ready to use in your next project.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
          <Button size="large" className="w-full sm:w-auto">
            Get Started
          </Button>
          <Button variant="outline" size="large" className="w-full sm:w-auto">
            View Documentation
          </Button>
        </div>
      </div>
    </section>
  )
}`,
      },
    ],
  },
  "hero-02": {
    name: "Hero 02",
    description: "A split hero section with email signup form.",
    category: "hero",
    commands: [
      { id: 1, name: "pnpm", command: "pnpm dlx behsseui add slices/Hero02" },
      { id: 2, name: "npx", command: "npx behsseui add slices/Hero02" },
      { id: 3, name: "yarn", command: "yarn dlx behsseui add slices/Hero02" },
      { id: 4, name: "bun", command: "bunx behsseui add slices/Hero02" },
    ],
    sourceFiles: [
      {
        file: "Hero02.tsx",
        path: "slices/Hero02.tsx",
        code: `import { Button } from "@/ui/components/Button"
import { Input } from "@/ui/components/Input"

export function Hero02() {
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              The modern way to build web apps
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Ship faster with pre-built components. Focus on what matters most —
              building great products for your users.
            </p>

            {/* Email signup */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:flex-1"
              />
              <Button className="w-full sm:w-auto shrink-0">
                Subscribe
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Join 10,000+ developers. No spam, ever.
            </p>
          </div>

          {/* Visual placeholder */}
          <div className="hidden lg:block">
            <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 border border-border" />
          </div>
        </div>
      </div>
    </section>
  )
}`,
      },
    ],
  },
  "footer-01": {
    name: "Footer 01",
    description: "A footer with logo, links columns, and social icons.",
    category: "footer",
    commands: [
      { id: 1, name: "pnpm", command: "pnpm dlx behsseui add slices/Footer01" },
      { id: 2, name: "npx", command: "npx behsseui add slices/Footer01" },
      { id: 3, name: "yarn", command: "yarn dlx behsseui add slices/Footer01" },
      { id: 4, name: "bun", command: "bunx behsseui add slices/Footer01" },
    ],
    sourceFiles: [
      {
        file: "Footer01.tsx",
        path: "slices/Footer01.tsx",
        code: `import Link from "next/link"

const footerLinks = {
  product: [
    { href: "#", label: "Features" },
    { href: "#", label: "Pricing" },
    { href: "#", label: "Changelog" },
    { href: "#", label: "Documentation" },
  ],
  company: [
    { href: "#", label: "About" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Contact" },
  ],
  legal: [
    { href: "#", label: "Privacy" },
    { href: "#", label: "Terms" },
    { href: "#", label: "License" },
  ],
}

export function Footer01() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold">
              Logo
            </Link>
            <p className="mt-3 sm:mt-4 text-sm text-muted-foreground max-w-xs">
              Building beautiful interfaces for the modern web.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © 2024 Your Company. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}`,
      },
    ],
  },
  "footer-02": {
    name: "Footer 02",
    description: "A footer with newsletter signup and link columns.",
    category: "footer",
    commands: [
      { id: 1, name: "pnpm", command: "pnpm dlx behsseui add slices/Footer02" },
      { id: 2, name: "npx", command: "npx behsseui add slices/Footer02" },
      { id: 3, name: "yarn", command: "yarn dlx behsseui add slices/Footer02" },
      { id: 4, name: "bun", command: "bunx behsseui add slices/Footer02" },
    ],
    sourceFiles: [
      {
        file: "Footer02.tsx",
        path: "slices/Footer02.tsx",
        code: `import Link from "next/link"
import { Button } from "@/ui/components/Button"
import { Input } from "@/ui/components/Input"

export function Footer02() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-border">
          <div className="text-center md:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Stay up to date</h3>
            <p className="text-sm text-muted-foreground">
              Get notified about new features and updates.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-64"
            />
            <Button className="w-full sm:w-auto">Subscribe</Button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 py-8 sm:py-12">
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Overview</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Solutions</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Tutorials</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">About us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Press</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">News</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Newsletter</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Events</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Social</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Twitter</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">LinkedIn</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Discord</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="text-center sm:text-left">© 2024 Your Company. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}`,
      },
    ],
  },
  "pricing-01": {
    name: "Pricing 01",
    description: "Simple 3-tier pricing cards with highlighted popular plan.",
    category: "pricing",
    commands: [
      { id: 1, name: "pnpm", command: "pnpm dlx behsseui add slices/Pricing01" },
      { id: 2, name: "npx", command: "npx behsseui add slices/Pricing01" },
      { id: 3, name: "yarn", command: "yarn dlx behsseui add slices/Pricing01" },
      { id: 4, name: "bun", command: "bunx behsseui add slices/Pricing01" },
    ],
    sourceFiles: [
      {
        file: "Pricing01.tsx",
        path: "slices/Pricing01.tsx",
        code: `import { Button } from "@/ui/components/Button"
import { Badge } from "@/ui/components/Badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/ui/components/Card"
import Check from "@/ui/icons/Check"

const plans = [
  {
    name: "Free",
    description: "For individuals getting started",
    price: "$0",
    period: "/month",
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Community support",
      "1 GB storage",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For growing teams and businesses",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "100 GB storage",
      "Custom domains",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale organizations",
    price: "$99",
    period: "/month",
    features: [
      "Everything in Pro",
      "Dedicated support",
      "SSO & SAML",
      "Unlimited storage",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export function Pricing01() {
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={\`flex flex-col \${
                plan.highlighted
                  ? "border-primary shadow-lg relative"
                  : "relative"
              }\`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>Popular</Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 flex-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  variant={plan.highlighted ? "default" : "outline"}
                  size="large"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}`,
      },
    ],
  },
  "pricing-02": {
    name: "Pricing 02",
    description: "Pricing cards with monthly/yearly toggle and savings badge.",
    category: "pricing",
    commands: [
      { id: 1, name: "pnpm", command: "pnpm dlx behsseui add slices/Pricing02" },
      { id: 2, name: "npx", command: "npx behsseui add slices/Pricing02" },
      { id: 3, name: "yarn", command: "yarn dlx behsseui add slices/Pricing02" },
      { id: 4, name: "bun", command: "bunx behsseui add slices/Pricing02" },
    ],
    sourceFiles: [
      {
        file: "Pricing02.tsx",
        path: "slices/Pricing02.tsx",
        code: `"use client"

import { useState } from "react"
import { Button } from "@/ui/components/Button"
import { Badge } from "@/ui/components/Badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/ui/components/Card"
import Check from "@/ui/icons/Check"

const plans = [
  {
    name: "Starter",
    description: "Perfect for side projects",
    monthlyPrice: 9,
    yearlyPrice: 7,
    features: [
      "5 projects",
      "Basic analytics",
      "Email support",
      "5 GB storage",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "Best for growing businesses",
    monthlyPrice: 29,
    yearlyPrice: 24,
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "100 GB storage",
      "Custom domains",
      "API access",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Business",
    description: "For scaling organizations",
    monthlyPrice: 79,
    yearlyPrice: 66,
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "SSO authentication",
      "Unlimited storage",
      "Custom integrations",
      "99.9% SLA",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export function Pricing02() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Plans for every stage
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, scale as you grow. All plans include a 14-day trial.
          </p>

          {/* Toggle */}
          <div className="relative flex items-center justify-center gap-3 pt-4">
            <span className={\`text-sm \${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}\`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={\`relative inline-flex h-6 w-11 items-center rounded-full transition-colors \${
                isYearly ? "bg-primary" : "bg-muted"
              }\`}
            >
              <span
                className={\`inline-block h-4 w-4 rounded-full bg-background transition-transform shadow-sm \${
                  isYearly ? "translate-x-6" : "translate-x-1"
                }\`}
              />
            </button>
            <span className={\`text-sm \${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}\`}>
              Yearly
            </span>
            <Badge variant="secondary" size="sm" className={\`absolute left-1/2 translate-x-16 sm:translate-x-20 transition-opacity \${isYearly ? "opacity-100" : "opacity-0"}\`}>Save 20%</Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={\`flex flex-col \${
                plan.highlighted
                  ? "border-primary shadow-lg relative"
                  : "relative"
              }\`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>Popular</Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 flex-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight">
                    \${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    /month
                  </span>
                </div>
                <p className={\`text-xs text-muted-foreground -mt-4 transition-opacity \${isYearly ? "opacity-100" : "opacity-0"}\`}>
                  Billed annually (\${plan.yearlyPrice * 12}/year)
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  variant={plan.highlighted ? "default" : "outline"}
                  size="large"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}`,
      },
    ],
  },
  "pricing-03": {
    name: "Pricing 03",
    description: "Minimalist 2-card pricing comparison with detailed features.",
    category: "pricing",
    commands: [
      { id: 1, name: "pnpm", command: "pnpm dlx behsseui add slices/Pricing03" },
      { id: 2, name: "npx", command: "npx behsseui add slices/Pricing03" },
      { id: 3, name: "yarn", command: "yarn dlx behsseui add slices/Pricing03" },
      { id: 4, name: "bun", command: "bunx behsseui add slices/Pricing03" },
    ],
    sourceFiles: [
      {
        file: "Pricing03.tsx",
        path: "slices/Pricing03.tsx",
        code: `import { Button } from "@/ui/components/Button"
import { Badge } from "@/ui/components/Badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/ui/components/Card"
import Check from "@/ui/icons/Check"

const plans = [
  {
    name: "Free",
    description: "Everything you need to get started",
    price: "$0",
    period: "forever",
    features: [
      "Up to 3 projects",
      "Basic analytics dashboard",
      "Community support via Discord",
      "1 GB file storage",
      "Standard API rate limits",
      "Public project sharing",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "Advanced tools for professionals",
    price: "$19",
    period: "/month",
    features: [
      "Unlimited projects",
      "Advanced analytics & reports",
      "Priority email support",
      "50 GB file storage",
      "Higher API rate limits",
      "Private project sharing",
      "Custom branding",
      "Team members (up to 10)",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
]

export function Pricing03() {
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Free to start, powerful to scale
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            No credit card required. Upgrade anytime.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={\`flex flex-col \${
                plan.highlighted
                  ? "border-primary shadow-lg relative"
                  : "relative"
              }\`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="flex items-baseline gap-1 pt-4">
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {plan.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  variant={plan.highlighted ? "default" : "outline"}
                  size="large"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}`,
      },
    ],
  },
}
