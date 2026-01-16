"use client"

import { createContext, useContext, useState, type ReactNode, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type DrawerContextType = {
  open: boolean
  setOpen: (open: boolean) => void
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined)

const useDrawer = () => {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error("Drawer components must be used within a Drawer provider")
  }
  return context
}

// Root component
type DrawerProps = {
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Drawer({ children, open: controlledOpen, onOpenChange }: DrawerProps) {
  const [internalOpen, setInternalOpen] = useState(false)

  const open = controlledOpen ?? internalOpen
  const setOpen = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen)
    } else {
      setInternalOpen(newOpen)
    }
  }

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </DrawerContext.Provider>
  )
}

// Trigger component
type DrawerTriggerProps = {
  children: ReactNode
  className?: string
  asChild?: boolean
}

export function DrawerTrigger({ children, className, asChild }: DrawerTriggerProps) {
  const { setOpen } = useDrawer()

  const handleClick = () => {
    setOpen(true)
  }

  if (asChild) {
    // Si asChild est true, on clone l'enfant et on lui ajoute le onClick
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}

// Content component
type DrawerContentProps = {
  children: ReactNode
  className?: string
  side?: "left" | "right" | "top" | "bottom"
  overlay?: boolean
}

export function DrawerContent({ children, className, side = "right", overlay = false }: DrawerContentProps) {
  const { open, setOpen } = useDrawer()
  const [shouldRender, setShouldRender] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Nettoyer tout timeout et RAF en cours lors d'un changement rapide
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
      animationTimeoutRef.current = null
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    if (open) {
      // Bloquer le scroll du body quand le drawer est ouvert (seulement sur mobile/tablet < 1024px)
      const isMobile = window.innerWidth < 1024
      if (isMobile) {
        document.body.style.overflow = "hidden"
      }

      // Force l'état invisible d'abord, puis monte le composant
      setIsVisible(false)
      setShouldRender(true)

      // Utilise requestAnimationFrame suivi d'un petit timeout pour garantir que le DOM est prêt
      rafRef.current = requestAnimationFrame(() => {
        animationTimeoutRef.current = setTimeout(() => {
          setIsVisible(true)
          animationTimeoutRef.current = null
        }, 20) // Augmenté à 20ms pour plus de fiabilité
        rafRef.current = null
      })
    } else if (shouldRender) {
      // Réactiver le scroll du body quand le drawer se ferme
      document.body.style.overflow = ""

      // Commence l'animation de fermeture seulement si le drawer était monté
      setIsVisible(false)
      // Démonte après l'animation
      animationTimeoutRef.current = setTimeout(() => {
        setShouldRender(false)
        animationTimeoutRef.current = null
      }, 500) // Durée de l'animation de fermeture
    }

    return () => {
      document.body.style.overflow = ""
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
        animationTimeoutRef.current = null
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [open, shouldRender])

  // Ne rien rendre si pas monté
  if (!shouldRender) return null

  // Classes pour les différentes directions
  const getTranslateClass = () => {
    switch (side) {
      case "right":
        return isVisible ? "translate-x-0" : "translate-x-full"
      case "left":
        return isVisible ? "translate-x-0" : "-translate-x-full"
      case "bottom":
        return isVisible ? "translate-y-0" : "translate-y-full"
      case "top":
        return isVisible ? "translate-y-0" : "-translate-y-full"
    }
  }

  const getPositionClasses = () => {
    switch (side) {
      case "right":
        return "top-0 right-0 h-full w-full sm:w-96 border-l shadow-[-8px_0_24px_-8px_rgba(0,0,0,0.2)]"
      case "left":
        return "top-0 left-0 h-full w-full sm:w-96 border-r shadow-[8px_0_24px_-8px_rgba(0,0,0,0.2)]"
      case "bottom":
        return "bottom-0 left-0 w-full h-auto max-h-[80vh] border-t shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.2)]"
      case "top":
        return "top-0 left-0 w-full h-auto max-h-[80vh] border-b shadow-[0_8px_24px_-8px_rgba(0,0,0,0.2)]"
    }
  }

  return (
    <>
      {/* Overlay pour fermer en cliquant à l'extérieur et assombrir le fond */}
      {open && (
        <div
          className={cn(
            "fixed inset-0 z-[60] transition-opacity duration-500",
            overlay ? "bg-black/50" : "bg-transparent",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer panel */}
      <div
        className={cn(
          "fixed z-[70] bg-background transition-transform duration-500 ease-in-out border-border",
          getPositionClasses(),
          getTranslateClass(),
          className
        )}
      >
        {children}
      </div>
    </>
  )
}

// Header component
type DrawerHeaderProps = {
  children: ReactNode
  className?: string
}

export function DrawerHeader({ children, className }: DrawerHeaderProps) {
  return (
    <div className={cn("px-6 py-4 border-b border-border border-dashed", className)}>
      {children}
    </div>
  )
}

// Title component
type DrawerTitleProps = {
  children: ReactNode
  className?: string
}

export function DrawerTitle({ children, className }: DrawerTitleProps) {
  return (
    <p className={cn("text-lg font-semibold leading-none tracking-tight", className)}>
      {children}
    </p>
  )
}

// Description component
type DrawerDescriptionProps = {
  children: ReactNode
  className?: string
}

export function DrawerDescription({ children, className }: DrawerDescriptionProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  )
}

// Body component
type DrawerBodyProps = {
  children: ReactNode
  className?: string
}

export function DrawerBody({ children, className }: DrawerBodyProps) {
  return (
    <div className={cn("p-6 overflow-y-auto flex-1", className)}>
      {children}
    </div>
  )
}

// Footer component
type DrawerFooterProps = {
  children: ReactNode
  className?: string
}

export function DrawerFooter({ children, className }: DrawerFooterProps) {
  return (
    <div className={cn("flex items-center px-6 py-4 border-t border-border border-dashed", className)}>
      {children}
    </div>
  )
}

// Close component
type DrawerCloseProps = {
  children: ReactNode
  className?: string
  asChild?: boolean
}

export function DrawerClose({ children, className, asChild }: DrawerCloseProps) {
  const { setOpen } = useDrawer()

  const handleClick = () => {
    setOpen(false)
  }

  if (asChild) {
    // Si asChild est true, on clone l'enfant et on lui ajoute le onClick
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
