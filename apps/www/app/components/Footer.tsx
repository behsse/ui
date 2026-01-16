import Link from 'next/link'
import { Logo } from './Logo'

export const Footer = () => {
  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-3">
            <Logo className="w-6 h-6" />
            <span className="font-semibold">BehsseUI</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
            <Link href="/docs/intro" className="hover:text-foreground transition-colors">Documentation</Link>
            <Link href="/docs/components" className="hover:text-foreground transition-colors">Components</Link>
            <Link href="/icons" className="hover:text-foreground transition-colors">Icons</Link>
            <Link href="https://github.com/behsse/ui" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              GitHub
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            MIT License © 2025
          </p>
        </div>
      </div>
    </footer>
  )
}