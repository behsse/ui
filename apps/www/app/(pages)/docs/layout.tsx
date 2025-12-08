"use client"

import { docsConfig } from "@/config/docs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/Accordion";
import { TableOfContents } from "@/app/components/TableOfContents"
import { components } from "@/data/components"
import { docPages } from "@/data/docs"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Extraire le slug de la route pour trouver le bon TOC
  const getTocItems = () => {
    // Pour les composants : /docs/components/[slug]
    if (pathname.startsWith('/docs/components/')) {
      const slug = pathname.split('/').pop()
      if (slug && components[slug as keyof typeof components]) {
        return components[slug as keyof typeof components].toc || []
      }
    }

    // Pour les pages docs imbriquées : /docs/installation/[framework]
    if (pathname.startsWith('/docs/installation/')) {
      const framework = pathname.split('/').pop()
      // Mapper les slugs de framework aux clés de docPages
      const frameworkMap: Record<string, string> = {
        'next': 'nextjs',
        'vite': 'vite'
      }
      const docKey = frameworkMap[framework as string]
      if (docKey && docPages[docKey as keyof typeof docPages]) {
        return docPages[docKey as keyof typeof docPages].toc || []
      }
    }

    // Pour les autres pages docs : /docs/[page]
    const docSlug = pathname.replace('/docs/', '').replace('/docs', '')
    if (docSlug && docPages[docSlug as keyof typeof docPages]) {
      return docPages[docSlug as keyof typeof docPages].toc || []
    }

    return []
  }

  const tocItems = getTocItems()
  const isComponentsListPage = pathname === '/docs/components'

  return (
    <div>
      <div className="container max-w-screen-2xl mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-6 lg:gap-10">
          {/* Sidebar gauche - Navigation */}
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

          {/* Contenu principal - les pages doivent gérer leur propre structure avec TOC */}
          <main className="flex-1 min-w-0">
            {children}
          </main>

          {/* Table des matières - Sidebar droite (masquée pour la page de liste des composants) */}
          {!isComponentsListPage && (
            <aside className="hidden lg:block lg:w-[200px] xl:w-[280px] shrink-0 sticky top-32 lg:top-28 overflow-y-auto">
              <div className="h-full overflow-y-auto px-6">
                <TableOfContents items={tocItems} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
