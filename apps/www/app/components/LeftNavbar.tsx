"use client"

import { docsConfig } from "@/config/docs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";

const LeftNavbar = () => {
    const pathname = usePathname()
    return (
          <aside className="hidden md:block md:w-[220px] lg:w-[200px] xl:w-[280px] shrink-0 sticky top-32 lg:top-28 overflow-y-auto">
            <div className="h-full overflow-y-auto pr-6">
              <nav className="space-y-6">
                {docsConfig.sidebarNav.map((section) => (
                  <Accordion type="single" key={section.title} defaultValue="item-1" className="border-none">
                    <AccordionItem value="item-1" defaultOpen>

                    <AccordionTrigger className="mb-2 rounded-md px-2 py-1 text-sm font-semibold ">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent >
                      <div className="relative">

                      {/* Barre verticale complète en arrière-plan */}
                      <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />

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
            </div>
          </aside>
    )
}

export default LeftNavbar