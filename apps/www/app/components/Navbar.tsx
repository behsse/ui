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
import { docsConfig } from "@/config/docs"

const MenuIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
)

export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const pathname = usePathname()

    // Fonction pour fermer le menu avec animation
    const closeMenu = () => {
        setIsClosing(true)
        setTimeout(() => {
            setMobileMenuOpen(false)
            setIsClosing(false)
        }, 300) // Durée de l'animation
    }

    // Toggle le menu
    const toggleMenu = () => {
        if (mobileMenuOpen) {
            closeMenu()
        } else {
            setMobileMenuOpen(true)
        }
    }

    // Fermer le menu quand on change de page
    useEffect(() => {
        if (mobileMenuOpen) {
            closeMenu()
        }
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
                        onClick={toggleMenu}
                    >
                        {mobileMenuOpen ? <Close className="w-4 h-4"/> : <MenuIcon className="w-4 h-4"/>}
                    </Button>
                </div>
            </div>

            {/* Mobile/Tablet menu - full width drawer */}
            {mobileMenuOpen && (
            <div
                className={`lg:hidden fixed inset-x-0 top-[57px] h-[calc(100vh-57px)] bg-background border-t border-border z-50 overflow-y-auto ${isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}
            >
                    <nav className="flex flex-col p-4 gap-1">
                        {/* Liens principaux */}
                        {navLink.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-4 py-3 rounded-md text-sm font-medium hover:bg-accent transition-colors"
                                onClick={closeMenu}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="https://github.com/behsse/ui"
                            target="_blank"
                            className="px-4 py-3 rounded-md text-sm hover:bg-accent transition-colors flex items-center gap-2 sm:hidden"
                            onClick={closeMenu}
                        >
                            <Github className="w-4 h-4"/>
                            GitHub
                        </Link>

                        {/* Navigation docs - toujours visible dans le menu mobile */}
                        {docsConfig.sidebarNav.map((section) => (
                            <div key={section.title}>
                                <div className="my-4 border-t border-border" />
                                <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    {section.title}
                                </p>
                                {section.items.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href || "#"}
                                        className="px-4 py-3 rounded-md text-sm font-medium hover:bg-accent transition-colors block"
                                        onClick={closeMenu}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    )
}
