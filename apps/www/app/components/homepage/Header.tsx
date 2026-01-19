'use client'

import { useState } from 'react'
import { Button } from '@/ui/components/Button'
import { Github } from '@/ui/icons/Github'
import Terminal from '@/ui/icons/Terminal'
import Copy from '@/ui/icons/Copy'
import Check from '@/ui/icons/Check'
import { Logo } from '../Logo'
import Link from 'next/link'

const Header = () => {
  const [copied, setCopied] = useState(false)
  const command = 'npx behsseui init'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow animation-delay-300" />
      </div>

      {/* Hero content */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background/50 backdrop-blur-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm text-muted-foreground">v0.2.0 available</span>
          </div>
        </div>

        <div className="flex justify-center mb-8 animate-fade-in opacity-0 animation-delay-100">
          <Logo className="w-20 h-20 animate-float" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in opacity-0 animation-delay-200">
          <span className="block">Build faster.</span>
          <span className="block text-muted-foreground">Stay in control.</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 px-2 animate-fade-in opacity-0 animation-delay-300">
          A modern React component library with built-in CLI.
          Components, icons, themes, and animations — copy the code,
          customize everything.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in opacity-0 animation-delay-400">
          <Button asChild className="h-12 px-8 text-base group">
            <Link href="/docs/intro">
              Get Started
              <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-12 px-8 text-base">
            <Link href="https://github.com/behsse/ui" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Link>
          </Button>
        </div>

        {/* CLI Command */}
        <div className="mt-12 animate-fade-in opacity-0 animation-delay-500">
          <div
            onClick={handleCopy}
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-lg border border-border bg-card font-mono text-xs sm:text-sm cursor-pointer hover:bg-accent transition-colors"
          >
            <Terminal className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
            <span className="text-muted-foreground">$</span>
            <span>{command}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleCopy()
              }}
              className="ml-2 p-1 hover:bg-muted rounded transition-colors"
              aria-label="Copy command"
            >
              {copied ? (
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground cursor-pointer" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header