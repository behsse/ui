"use client"

import type { ReactNode, HTMLAttributes } from "react"
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"

// Context
type HoverCardContextType = {
  open: boolean
  onOpenChange: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
  timeoutRef: React.RefObject<NodeJS.Timeout | null>
  openDelay: number
  closeDelay: number
}

const HoverCardContext = createContext<HoverCardContextType | undefined>(undefined)

function useHoverCard() {
  const context = useContext(HoverCardContext)
  if (!context) {
    throw new Error("HoverCard components must be used within a HoverCard")
  }
  return context
}

// Root
type HoverCardProps = {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  openDelay?: number
  closeDelay?: number
}

export function HoverCard({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  openDelay = 200,
  closeDelay = 150,
}: HoverCardProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const triggerRef = useRef<HTMLElement | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }, [isControlled, onOpenChange])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <HoverCardContext.Provider value={{ open, onOpenChange: handleOpenChange, triggerRef, timeoutRef, openDelay, closeDelay }}>
      <div className="relative inline-block">
        {children}
      </div>
    </HoverCardContext.Provider>
  )
}

// Trigger
type HoverCardTriggerProps = {
  children: ReactNode
  className?: string
  asChild?: boolean
} & HTMLAttributes<HTMLElement>

export function HoverCardTrigger({ children, className, asChild, ...props }: HoverCardTriggerProps) {
  const { onOpenChange, triggerRef, timeoutRef, openDelay, closeDelay } = useHoverCard()

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    timeoutRef.current = setTimeout(() => {
      onOpenChange(true)
      timeoutRef.current = null
    }, openDelay)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    timeoutRef.current = setTimeout(() => {
      onOpenChange(false)
      timeoutRef.current = null
    }, closeDelay)
  }

  if (asChild) {
    return (
      <span
        ref={triggerRef as React.RefObject<HTMLSpanElement>}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        {...props}
      >
        {children}
      </span>
    )
  }

  return (
    <span
      ref={triggerRef as React.RefObject<HTMLSpanElement>}
      className={cn("cursor-pointer", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      tabIndex={0}
      {...props}
    >
      {children}
    </span>
  )
}

// Content
type HoverCardContentProps = {
  children: ReactNode
  className?: string
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  sideOffset?: number
} & HTMLAttributes<HTMLDivElement>

export function HoverCardContent({
  children,
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  ...props
}: HoverCardContentProps) {
  const { open, onOpenChange, timeoutRef, closeDelay } = useHoverCard()

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    timeoutRef.current = setTimeout(() => {
      onOpenChange(false)
      timeoutRef.current = null
    }, closeDelay)
  }

  // Close on escape
  useEffect(() => {
    if (!open) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, onOpenChange])

  if (!open) return null

  const sideClasses = {
    bottom: "top-full left-0",
    top: "bottom-full left-0",
    left: "right-full top-0",
    right: "left-full top-0",
  }

  const alignClasses = {
    start: side === "top" || side === "bottom" ? "left-0" : "top-0",
    center: side === "top" || side === "bottom" ? "left-1/2 -translate-x-1/2" : "top-1/2 -translate-y-1/2",
    end: side === "top" || side === "bottom" ? "right-0" : "bottom-0",
  }

  return (
    <div
      role="tooltip"
      className={cn(
        "absolute z-50 w-max rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md",
        "animate-in fade-in-0 zoom-in-95",
        side === "bottom" && "slide-in-from-top-2",
        side === "top" && "slide-in-from-bottom-2",
        side === "left" && "slide-in-from-right-2",
        side === "right" && "slide-in-from-left-2",
        sideClasses[side],
        alignClasses[align],
        className
      )}
      style={{
        ...(side === "bottom" ? { marginTop: `${sideOffset}px` } : {}),
        ...(side === "top" ? { marginBottom: `${sideOffset}px` } : {}),
        ...(side === "left" ? { marginRight: `${sideOffset}px` } : {}),
        ...(side === "right" ? { marginLeft: `${sideOffset}px` } : {}),
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  )
}
