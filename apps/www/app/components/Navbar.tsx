"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/ui/components/Button"
import Link from "next/link"
import { Logo } from "./Logo"
import ThemeColor from "./ThemeColor"
import { Github } from "@/ui/icons/Github"
import { CommandMenu } from "./CommandMenu"
import Close from "@/ui/icons/Close"
import { DocsNavContent } from "./LeftNavbar"

const MenuIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
)

export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    // Fermer le menu quand on change de page
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    // Bloquer le scroll du body quand le menu mobile est ouvert
    useEffect(() => {
        if (mobileMenuOpen && window.innerWidth < 1024) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [mobileMenuOpen])

    // Vérifier si on est sur une page docs pour afficher la navigation docs
    const isDocsPage = pathname.startsWith('/docs')

    const navLink = [
        {name: "Docs", href: "/docs/intro"},
        {name: "Components", href: "/docs/components"},
        {name: "Slices", href: ""},
        {name: "Icons", href: "/icons"},
        {name: "Theme", href: ""},
        {name: "Colors", href: ""},
    ];

    return (
        <div className="fixed z-50 bg-background border-b border-b-border border-dashed w-full">
            <div className="flex items-center justify-between w-full 3xl:max-w-[1550px] 3xl:mx-auto py-3 3xl:px-20 px-4 md:px-8">
                <nav className="flex items-center gap-4">
                    <Link href="/" className="pr-2">
                        <Logo className="w-6 h-6"/>
                    </Link>
                    {/* Desktop navigation */}
                    <ul className="hidden lg:flex items-center">
                        {navLink.map((link) => (
                            <li key={link.name}>
                                <Button variant="ghost" asChild>
                                    <Link href={link.href}>{link.name}</Link>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex items-center gap-2">
                    <CommandMenu />
                    <Button asChild variant="outline" size="icon" className="hidden sm:flex">
                        <Link href="https://github.com/behsse/ui" target="_blank">
                            <Github className="w-4 h-4"/>
                        </Link>
                    </Button>
                    <ThemeColor />
                    {/* Mobile/Tablet menu button */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <Close className="w-4 h-4"/> : <MenuIcon className="w-4 h-4"/>}
                    </Button>
                </div>
            </div>

            {/* Mobile/Tablet menu - slide from right */}
            {mobileMenuOpen && (
            <div
                className="lg:hidden border-t border-border bg-background h-[calc(100vh-57px)] overflow-y-auto animate-slide-in-right"
            >
                <nav className="flex flex-col p-4 gap-1">
                    {/* Liens principaux */}
                    {navLink.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="px-4 py-3 rounded-md text-sm font-medium hover:bg-accent transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="https://github.com/behsse/ui"
                        target="_blank"
                        className="px-4 py-3 rounded-md text-sm hover:bg-accent transition-colors flex items-center gap-2 sm:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <Github className="w-4 h-4"/>
                        GitHub
                    </Link>

                    {/* Navigation docs si on est sur une page docs */}
                    {isDocsPage && (
                        <>
                            <div className="my-4 border-t border-border" />
                            <div className="px-2">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Documentation</p>
                                <DocsNavContent pathname={pathname} onLinkClick={() => setMobileMenuOpen(false)} />
                            </div>
                        </>
                    )}
                </nav>
            </div>
            )}
        </div>
    )
}
