"use client"

import { docsConfig } from "@/config/docs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";

// Composant de navigation réutilisable - exporté pour être utilisé dans la Navbar
export const DocsNavContent = ({ pathname, onLinkClick }: { pathname: string, onLinkClick?: () => void }) => (
    <nav>
        {docsConfig.sidebarNav.map((section, index) => (
            <Accordion type="single" key={section.title} defaultValue="item-1" variant="ghost">
                <AccordionItem value="item-1" defaultOpen>
                    <AccordionTrigger className={cn(
                        "text-sm font-semibold py-3 px-4 md:px-8 hover:no-underline border-b border-dashed border-border",
                        index > 0 && "border-t"
                    )}>
                        {section.title}
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="relative py-4 px-4 md:px-8">
                            {/* Barre verticale complète en arrière-plan */}
                            <div className="absolute left-6 md:left-10 top-4 bottom-4 w-px bg-border" />

                            <div className="space-y-1 relative grid gap-1.5 ml-2">
                                {section.items.map((item) => {
                                    // Ne pas activer "Components" pour les pages de composants individuels
                                    const isComponentsPage = item.href === '/docs/components' && pathname.startsWith('/docs/components/')
                                    const isActive = isComponentsPage
                                        ? false
                                        : pathname === item.href || (pathname.startsWith(item.href + '/') && item.href !== '/docs/components')
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href || "#"}
                                            onClick={onLinkClick}
                                            className={cn(
                                                "relative flex text-muted-foreground transition-colors hover:text-foreground pl-4",
                                                isActive && "text-primary font-medium"
                                            )}
                                        >
                                            {/* Barre de surbrillance pour l'item actif */}
                                            {isActive && (
                                                <span className="absolute left-0 top-0 bottom-0 w-px bg-primary" />
                                            )}
                                            {item.title}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        ))}
    </nav>
)

const LeftNavbar = () => {
    const pathname = usePathname()

    return (
        <aside className="hidden lg:block w-[280px] shrink-0 sticky top-[62px] h-[calc(100vh-62px)] border-r border-border border-dashed group/sidebar">
            <div className="h-full overflow-y-auto sidebar-scroll">
                <DocsNavContent pathname={pathname} />
            </div>
        </aside>
    )
}

export default LeftNavbar