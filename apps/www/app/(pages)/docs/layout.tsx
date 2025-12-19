"use client"

import { docsConfig } from "@/config/docs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/Accordion";
import { TableOfContents } from "@/app/components/TableOfContents"
import { components } from "@/data/components"
import { docPages } from "@/data/docs"
import { useEffect, useState } from "react"
import { getChangelog, generateChangelogTOC } from "./changelog/page"
import LeftNavbar from "@/app/components/LeftNavbar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [changelogTOC, setChangelogTOC] = useState<any[]>([])

  // Charger les TOC du changelog dynamiquement
  useEffect(() => {
    if (pathname === '/docs/changelog') {
      getChangelog().then(content => {
        if (content) {
          const toc = generateChangelogTOC(content)
          setChangelogTOC(toc)
        }
      })
    }
  }, [pathname])

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
      <div className="w-full 3xl:max-w-[1550px] 3xl:mx-auto h-full 3xl:px-20 px-8">
        <div className="flex items-start gap-6 lg:gap-10">
          {/* Sidebar gauche - Navigation */}
          <LeftNavbar/>

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
