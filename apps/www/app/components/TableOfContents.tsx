"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  items: TOCItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Si pas d'items, ne rien faire
    if (items.length === 0) return

    const headingElements = items.map(item => ({
      id: item.id,
      element: document.getElementById(item.id)
    })).filter(({ element }) => element !== null)

    // Si aucun élément trouvé dans le DOM, ne pas continuer
    if (headingElements.length === 0) return

    const handleScroll = () => {
      // Si on est en train de scroller suite à un clic, ne pas mettre à jour
      if (isScrolling) return

      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      // Si on est en bas de la page, activer le dernier item
      if (scrollTop + windowHeight >= docHeight - 50) {
        setActiveId(items[items.length - 1].id)
        return
      }

      // Trouver la section visible actuellement
      // Une section est active si elle est passée (top < 150px) mais la suivante ne l'est pas encore
      const offset = 150 // Distance du haut de l'écran

      let currentId = items[0].id

      for (let i = 0; i < headingElements.length; i++) {
        const { id, element } = headingElements[i]
        if (element) {
          const rect = element.getBoundingClientRect()

          // Si la section est passée (au-dessus de l'offset)
          if (rect.top <= offset) {
            currentId = id
          } else {
            // Dès qu'on trouve une section qui n'est pas encore passée, on s'arrête
            break
          }
        }
      }

      setActiveId(currentId)
    }

    // Initialiser seulement si activeId n'est pas déjà défini
    if (!activeId) {
      handleScroll()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [items, isScrolling, activeId])

  const handleClick = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault()

    // Annuler le timeout précédent si on clique rapidement
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    setIsScrolling(true)
    setActiveId(itemId)

    const element = document.getElementById(itemId)
    if (element) {
      const offset = 80 // Offset pour la navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })

      // Réactiver la détection automatique après le scroll
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 1000)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      <p className="font-medium">On this page</p>
      <div className="relative">
        {/* Barre verticale complète en arrière-plan */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

        <ul className="space-y-2 text-sm relative">
          {items.map((item) => (
            <li
              key={item.id}
              className={cn(
                "relative pl-4 transition-colors hover:text-foreground",
                item.level === 3 && "pl-8",
                activeId === item.id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              )}
            >
              {/* Barre de surbrillance pour l'item actif */}
              {activeId === item.id && (
                <span className="absolute left-0 top-0 bottom-0 w-px bg-foreground" />
              )}
              <a
                href={`#${item.id}`}
                className="block"
                onClick={(e) => handleClick(e, item.id)}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
