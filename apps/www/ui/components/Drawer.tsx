"use client"

import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from "react"
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"

// Context
type DrawerContextType = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined)

function useDrawer() {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error("Drawer components must be used within a Drawer")
  }
  return context
}

// Root component
type DrawerProps = {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Drawer({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: DrawerProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }, [isControlled, onOpenChange])

  return (
    <DrawerContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </DrawerContext.Provider>
  )
}

// Trigger
type DrawerTriggerProps = {
  children: ReactNode
  className?: string
  asChild?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function DrawerTrigger({ children, className, asChild, ...props }: DrawerTriggerProps) {
  const { onOpenChange } = useDrawer()

  if (asChild) {
    return (
      <span onClick={() => onOpenChange(true)} className={className}>
        {children}
      </span>
    )
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => onOpenChange(true)}
      {...props}
    >
      {children}
    </button>
  )
}

// Content
type DrawerContentProps = {
  children: ReactNode
  className?: string
  side?: "left" | "right" | "top" | "bottom"
  overlay?: boolean
} & HTMLAttributes<HTMLDivElement>

export function DrawerContent({
  children,
  className,
  side = "right",
  overlay = false,
  ...props
}: DrawerContentProps) {
  const { open, onOpenChange } = useDrawer()
  const [shouldRender, setShouldRender] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const rafRef = useRef<number | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const startYRef = useRef<number>(0)
  const startXRef = useRef<number>(0)
  const isDraggingRef = useRef(false)

  // Mount / unmount animation
  useEffect(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
      animationTimeoutRef.current = null
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    if (open) {
      const isMobile = window.innerWidth < 1024
      if (isMobile) {
        document.body.style.overflow = "hidden"
      }

      setIsVisible(false)
      setShouldRender(true)

      rafRef.current = requestAnimationFrame(() => {
        animationTimeoutRef.current = setTimeout(() => {
          setIsVisible(true)
          animationTimeoutRef.current = null
        }, 20)
        rafRef.current = null
      })
    } else if (shouldRender) {
      document.body.style.overflow = ""

      setIsVisible(false)
      animationTimeoutRef.current = setTimeout(() => {
        setShouldRender(false)
        animationTimeoutRef.current = null
      }, 500)
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

  // Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open, onOpenChange])

  // Drag-to-dismiss on the entire container
  useEffect(() => {
    const panel = panelRef.current
    if (!panel || !shouldRender || !isVisible) return

    const isVertical = side === "bottom" || side === "top"
    const threshold = 80

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("button, a, input, textarea, select, [role='button']")) return

      isDraggingRef.current = true
      startYRef.current = e.clientY
      startXRef.current = e.clientX
      panel.style.transition = "none"
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return
      e.preventDefault()

      if (isVertical) {
        const deltaY = e.clientY - startYRef.current
        if (side === "bottom") {
          panel.style.transform = `translateY(${Math.max(0, deltaY)}px)`
        } else {
          panel.style.transform = `translateY(${Math.min(0, deltaY)}px)`
        }
      } else {
        const deltaX = e.clientX - startXRef.current
        if (side === "right") {
          panel.style.transform = `translateX(${Math.max(0, deltaX)}px)`
        } else {
          panel.style.transform = `translateX(${Math.min(0, deltaX)}px)`
        }
      }
    }

    const onPointerUp = (e: PointerEvent) => {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false

      const shouldClose = isVertical
        ? (side === "bottom" && e.clientY - startYRef.current > threshold) ||
          (side === "top" && e.clientY - startYRef.current < -threshold)
        : (side === "right" && e.clientX - startXRef.current > threshold) ||
          (side === "left" && e.clientX - startXRef.current < -threshold)

      if (shouldClose) {
        onOpenChange(false)
      } else {
        panel.style.transition = "transform 300ms ease-out"
        panel.style.transform = ""
        const reset = () => {
          panel.style.transition = ""
          panel.removeEventListener("transitionend", reset)
        }
        panel.addEventListener("transitionend", reset)
      }
    }

    panel.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("pointermove", onPointerMove)
    document.addEventListener("pointerup", onPointerUp)

    return () => {
      panel.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("pointerup", onPointerUp)
    }
  }, [shouldRender, isVisible, side, onOpenChange])

  if (!shouldRender) return null

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
        return "bottom-0 left-0 w-full h-auto max-h-[80vh] border-t shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.2)] rounded-t-[10px]"
      case "top":
        return "top-0 left-0 w-full h-auto max-h-[80vh] border-b shadow-[0_8px_24px_-8px_rgba(0,0,0,0.2)] rounded-b-[10px]"
    }
  }

  return (
    <>
      {open && (
        <div
          className={cn(
            "fixed inset-0 z-60 transition-opacity duration-500",
            overlay ? "bg-black/50" : "bg-transparent",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          onClick={() => onOpenChange(false)}
        />
      )}

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed z-70 bg-background transition-transform duration-500 ease-in-out border-border flex flex-col touch-none",
          getPositionClasses(),
          getTranslateClass(),
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

// Handle (barre visuelle optionnelle, typiquement pour le bottom drawer)
type DrawerHandleProps = {
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function DrawerHandle({ className, ...props }: DrawerHandleProps) {
  return (
    <div
      className={cn(
        "mx-auto mt-4 mb-2 h-1.5 w-12 shrink-0 cursor-grab rounded-full bg-muted-foreground/30 active:cursor-grabbing",
        className
      )}
      {...props}
    />
  )
}

// Header
type DrawerHeaderProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function DrawerHeader({ children, className, ...props }: DrawerHeaderProps) {
  return (
    <div
      className={cn("px-6 py-4 border-b border-border border-dashed", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Title
type DrawerTitleProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLHeadingElement>

export function DrawerTitle({ children, className, ...props }: DrawerTitleProps) {
  return (
    <h2
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h2>
  )
}

// Description
type DrawerDescriptionProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLParagraphElement>

export function DrawerDescription({ children, className, ...props }: DrawerDescriptionProps) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  )
}

// Body
type DrawerBodyProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function DrawerBody({ children, className, ...props }: DrawerBodyProps) {
  return (
    <div
      className={cn("p-6 overflow-y-auto flex-1", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Footer
type DrawerFooterProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function DrawerFooter({ children, className, ...props }: DrawerFooterProps) {
  return (
    <div
      className={cn("flex items-center px-6 py-4 border-t border-border border-dashed", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Close
type DrawerCloseProps = {
  children: ReactNode
  className?: string
  asChild?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function DrawerClose({ children, className, onClick, asChild, ...props }: DrawerCloseProps) {
  const { onOpenChange } = useDrawer()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    onOpenChange(false)
  }

  if (asChild) {
    return (
      <span onClick={() => onOpenChange(false)} className={className}>
        {children}
      </span>
    )
  }

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}
