import { Button } from "@/ui/components/Button"
import Link from "next/link"
import { Logo } from "./Logo"
import ThemeColor from "./ThemeColor"
import { Github } from "@/ui/icons/Github"
import { CommandMenu } from "./CommandMenu"

export const Navbar = () => {

    const navLink = [
        {name: "Docs", href: "/docs/intro"},
        {name: "Components", href: "/docs/components"},
        {name: "Slices", href: ""},
        {name: "Icons", href: ""},
        {name: "Theme", href: ""},
        {name: "Colors", href: ""},
    ];

    return (
        <div className="fixed z-50 bg-background border-b border-b-border border-dashed w-full">
            <div className="flex items-center justify-between w-full 3xl:max-w-[1550px] 3xl:mx-auto py-3 3xl:px-20 px-8">
                <nav className="flex items-center gap-4">
                    <Link href="/" className="pr-2">
                        <Logo className="w-6 h-6"/>
                    </Link>
                    <ul className="flex items-center">
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
                    <Button asChild variant="outline" size="icon">
                        <Link href="https://github.com/behsse/ui" target="_blank">
                            <Github className="w-4 h-4"/>
                        </Link>
                    </Button>
                    <ThemeColor />
                </div>
            </div>
        </div>
    )
}
