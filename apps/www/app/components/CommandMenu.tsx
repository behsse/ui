"use client"

import { useCallback, useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { docsConfig } from "@/config/docs"
import Search from "@/ui/icons/Search"
import File from "@/ui/icons/File"
import Close from "@/ui/icons/Close"
import { cn } from "@/lib/utils"
import { Button } from "@/ui/components/Button"

interface Page {
  title: string
  href: string
  group: string
}

export function CommandMenu() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Extraire toutes les pages de la configuration
  const allPages = useMemo(() => {
    const pages: Page[] = []

    // Ajouter la navigation principale
    docsConfig.mainNav.forEach((item) => {
      if (item.href) {
        pages.push({
          title: item.title,
          href: item.href,
          group: "Navigation",
        })
      }
    })

    // Ajouter les pages de la sidebar
    docsConfig.sidebarNav.forEach((section) => {
      section.items.forEach((item) => {
        if (item.href) {
          pages.push({
            title: item.title,
            href: item.href,
            group: section.title,
          })
        }
      })
    })

    return pages
  }, [])

  // Filtrer les pages selon la recherche
  const filteredPages = useMemo(() => {
    if (!search) return allPages

    const query = search.toLowerCase()
    return allPages.filter((page) => {
      return (
        page.title.toLowerCase().includes(query) ||
        page.group.toLowerCase().includes(query)
      )
    })
  }, [search, allPages])

  // Grouper les résultats par catégorie
  const groupedPages = useMemo(() => {
    const groups: Record<string, Page[]> = {}
    filteredPages.forEach((page) => {
      if (!groups[page.group]) {
        groups[page.group] = []
      }
      groups[page.group].push(page)
    })
    return groups
  }, [filteredPages])

  // Naviguer vers une page
  const selectPage = useCallback(
    (page: Page) => {
      setOpen(false)
      setSearch("")
      router.push(page.href)
    },
    [router]
  )

  // Raccourci clavier Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }

      if (e.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Navigation au clavier
  useEffect(() => {
    if (!open) return

    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((i) => (i + 1) % filteredPages.length)
      }

      if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((i) => (i - 1 + filteredPages.length) % filteredPages.length)
      }

      if (e.key === "Enter") {
        e.preventDefault()
        const page = filteredPages[selectedIndex]
        if (page) selectPage(page)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, selectedIndex, filteredPages, selectPage])

  // Réinitialiser l'index lors d'une nouvelle recherche
  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  return (
    <>
      {/* Bouton de déclenchement */}
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="relative w-full justify-start text-sm sm:pr-12 md:w-40 lg:w-64"
      >
        <Search className="mr-2 h-4 w-4 " />
        <span className="inline-flex">Search documentation ...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* Dialog de recherche */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/20"
          onClick={() => setOpen(false)}
        >
          <div
            className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-background shadow-lg rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header avec input de recherche */}
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                type="text"
                placeholder="Type a command or search..."
                className="flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <Close className="h-3 w-3" />
              </Button>
            </div>

            {/* Résultats */}
            <div className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
              {filteredPages.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </div>
              ) : (
                Object.entries(groupedPages).map(([group, pages]) => (
                  <div key={group} className="mb-2">
                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                      {group}
                    </div>
                    <div className="space-y-1">
                      {pages.map((page, index) => {
                        const globalIndex = filteredPages.indexOf(page)
                        const isSelected = globalIndex === selectedIndex

                        return (
                          <button
                            key={page.href}
                            className={cn(
                              "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                              isSelected
                                ? "bg-accent text-accent-foreground"
                                : "hover:bg-accent hover:text-accent-foreground"
                            )}
                            onClick={() => selectPage(page)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                          >
                            <File className="mr-2 h-4 w-4" />
                            <span>{page.title}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer avec les raccourcis */}
            <div className="flex items-center border-t px-3 py-2 text-xs text-muted-foreground">
              <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium">
                <span>↑↓</span>
              </kbd>
              <span className="ml-1.5">to navigate</span>
              <kbd className="ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium">
                <span>↵</span>
              </kbd>
              <span className="ml-1.5">to select</span>
              <kbd className="ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium">
                <span>esc</span>
              </kbd>
              <span className="ml-1.5">to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
