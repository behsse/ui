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
  side?: "left" | "right"
}

export function DrawerContent({ children, className, side = "right" }: DrawerContentProps) {
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
      // Force l'état invisible d'abord, puis monte le composant
      setIsVisible(false)
      setShouldRender(true)

      // Utilise un timeout court au lieu de RAF pour plus de fiabilité
      animationTimeoutRef.current = setTimeout(() => {
        setIsVisible(true)
        animationTimeoutRef.current = null
      }, 10) // Délai minimal pour permettre au DOM de se mettre à jour
    } else if (shouldRender) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Ne rien rendre si pas monté
  if (!shouldRender) return null

  const translateClass = side === "right"
    ? isVisible ? "translate-x-0" : "translate-x-full"
    : isVisible ? "translate-x-0" : "-translate-x-full"

  return (
    <>
      {/* Overlay invisible pour fermer en cliquant à l'extérieur */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer panel */}
      <div
        className={cn(
          "fixed top-0 z-50 h-full w-full border-l border-border sm:w-96 bg-background transition-transform duration-500 ease-in-out",
          side === "right" ? "right-0 shadow-[-8px_0_24px_-8px_rgba(0,0,0,0.2)]" : "left-0 shadow-[8px_0_24px_-8px_rgba(0,0,0,0.2)]",
          translateClass,
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
