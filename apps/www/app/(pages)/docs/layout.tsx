"use client"

import { docsConfig } from "@/config/docs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/Accordion";
import { TableOfContents } from "@/app/components/TableOfContents"
import { components } from "@/data/components"
import { docPages } from "@/data/docs"
import { getChangelog, generateChangelogTOC } from "@/lib/changelog"
import LeftNavbar from "@/app/components/LeftNavbar"

// Générer la TOC du changelog une seule fois
const changelogTOC = generateChangelogTOC(getChangelog())

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Extraire le slug de la route pour trouver le bon TOC
  const getTocItems = () => {
    // Pour la page changelog, utiliser le TOC dynamique
    if (pathname === '/docs/changelog') {
      return changelogTOC
    }
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
      <div className="w-full 3xl:max-w-[1550px] 3xl:mx-auto h-full">
        <div className="flex items-start">
          {/* Sidebar gauche - Navigation */}
          <LeftNavbar/>

          {/* Contenu principal */}
          <main className="flex-1 min-w-0 py-6 px-6 lg:px-10">
            {children}
          </main>

          {/* Table des matières - Sidebar droite */}
          {!isComponentsListPage && (
            <aside className="hidden xl:block w-[250px] shrink-0 sticky top-[62px] h-[calc(100vh-62px)] border-l border-border border-dashed group/sidebar">
              <div className="h-full overflow-y-auto py-6 px-4 md:px-8 sidebar-scroll">
                <TableOfContents items={tocItems} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
