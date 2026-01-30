"use client"

import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from "react"
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"
import ChevronRight from "@/ui/icons/ChevronRight"

// Context
type DropdownMenuContextType = {
  open: boolean
  onOpenChange: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
}

const DropdownMenuContext = createContext<DropdownMenuContextType | undefined>(undefined)

function useDropdownMenu() {
  const context = useContext(DropdownMenuContext)
  if (!context) {
    throw new Error("DropdownMenu components must be used within a DropdownMenu")
  }
  return context
}

// Root
type DropdownMenuProps = {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DropdownMenu({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: DropdownMenuProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const triggerRef = useRef<HTMLElement | null>(null)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }, [isControlled, onOpenChange])

  return (
    <DropdownMenuContext.Provider value={{ open, onOpenChange: handleOpenChange, triggerRef }}>
      <div className="relative inline-block">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

// Trigger
type DropdownMenuTriggerProps = {
  children: ReactNode
  className?: string
  asChild?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function DropdownMenuTrigger({ children, className, asChild, ...props }: DropdownMenuTriggerProps) {
  const { open, onOpenChange, triggerRef } = useDropdownMenu()

  const handleClick = () => {
    onOpenChange(!open)
  }

  if (asChild) {
    return (
      <span
        ref={triggerRef as React.RefObject<HTMLSpanElement>}
        onClick={handleClick}
        className={className}
      >
        {children}
      </span>
    )
  }

  return (
    <button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      type="button"
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}

// Content
type DropdownMenuContentProps = {
  children: ReactNode
  className?: string
  align?: "start" | "center" | "end"
  side?: "bottom" | "top" | "left" | "right"
  sideOffset?: number
} & HTMLAttributes<HTMLDivElement>

export function DropdownMenuContent({
  children,
  className,
  align = "start",
  side = "bottom",
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) {
  const { open, onOpenChange } = useDropdownMenu()
  const contentRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e: MouseEvent) => {
      const content = contentRef.current
      if (!content) return
      if (!content.contains(e.target as Node)) {
        onOpenChange(false)
      }
    }

    // Delay to avoid catching the trigger click
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside)
    }, 0)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, onOpenChange])

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

  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  }

  const sideClasses = {
    bottom: `top-full mt-[${sideOffset}px]`,
    top: `bottom-full mb-[${sideOffset}px]`,
    left: `right-full mr-[${sideOffset}px] top-0`,
    right: `left-full ml-[${sideOffset}px] top-0`,
  }

  return (
    <div
      ref={contentRef}
      role="menu"
      className={cn(
        "absolute z-50 min-w-32 w-max rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
        "animate-in fade-in-0 zoom-in-95",
        side === "bottom" && "slide-in-from-top-2",
        side === "top" && "slide-in-from-bottom-2",
        side === "left" && "slide-in-from-right-2",
        side === "right" && "slide-in-from-left-2",
        sideClasses[side],
        (side === "bottom" || side === "top") && alignClasses[align],
        className
      )}
      style={{
        ...(side === "bottom" ? { marginTop: `${sideOffset}px` } : {}),
        ...(side === "top" ? { marginBottom: `${sideOffset}px` } : {}),
        ...(side === "left" ? { marginRight: `${sideOffset}px` } : {}),
        ...(side === "right" ? { marginLeft: `${sideOffset}px` } : {}),
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Item
type DropdownMenuItemProps = {
  children: ReactNode
  className?: string
  disabled?: boolean
  onSelect?: () => void
} & HTMLAttributes<HTMLDivElement>

export function DropdownMenuItem({
  children,
  className,
  disabled = false,
  onSelect,
  ...props
}: DropdownMenuItemProps) {
  const { onOpenChange } = useDropdownMenu()

  const handleClick = () => {
    if (disabled) return
    onSelect?.()
    onOpenChange(false)
  }

  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors whitespace-nowrap",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClick()
        }
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Label
type DropdownMenuLabelProps = {
  children: ReactNode
  className?: string
  inset?: boolean
} & HTMLAttributes<HTMLDivElement>

export function DropdownMenuLabel({ children, className, inset, ...props }: DropdownMenuLabelProps) {
  return (
    <div
      className={cn(
        "px-2 py-1.5 text-sm font-semibold whitespace-nowrap",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Separator
type DropdownMenuSeparatorProps = {
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
  return (
    <div
      role="separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

// Shortcut
type DropdownMenuShortcutProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLSpanElement>

export function DropdownMenuShortcut({ children, className, ...props }: DropdownMenuShortcutProps) {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    >
      {children}
    </span>
  )
}

// Sub (submenu context)
type DropdownMenuSubContextType = {
  open: boolean
  onOpenChange: (open: boolean) => void
  timeoutRef: React.RefObject<NodeJS.Timeout | null>
}

const DropdownMenuSubContext = createContext<DropdownMenuSubContextType | undefined>(undefined)

function useDropdownMenuSub() {
  const context = useContext(DropdownMenuSubContext)
  if (!context) {
    throw new Error("DropdownMenuSub components must be used within a DropdownMenuSub")
  }
  return context
}

type DropdownMenuSubProps = {
  children: ReactNode
}

export function DropdownMenuSub({ children }: DropdownMenuSubProps) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <DropdownMenuSubContext.Provider value={{ open, onOpenChange: setOpen, timeoutRef }}>
      <div className="relative">
        {children}
      </div>
    </DropdownMenuSubContext.Provider>
  )
}

// SubTrigger
type DropdownMenuSubTriggerProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function DropdownMenuSubTrigger({ children, className, ...props }: DropdownMenuSubTriggerProps) {
  const { open, onOpenChange, timeoutRef } = useDropdownMenuSub()

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    onOpenChange(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      onOpenChange(false)
      timeoutRef.current = null
    }, 150)
  }

  return (
    <div
      role="menuitem"
      tabIndex={0}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors whitespace-nowrap",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground",
        open && "bg-accent text-accent-foreground",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
          e.preventDefault()
          onOpenChange(true)
        }
        if (e.key === "ArrowLeft" || e.key === "Escape") {
          e.preventDefault()
          onOpenChange(false)
        }
      }}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </div>
  )
}

// SubContent
type DropdownMenuSubContentProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function DropdownMenuSubContent({ children, className, ...props }: DropdownMenuSubContentProps) {
  const { open, onOpenChange, timeoutRef } = useDropdownMenuSub()

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      onOpenChange(false)
      timeoutRef.current = null
    }, 150)
  }

  if (!open) return null

  return (
    <div
      role="menu"
      className={cn(
        "absolute left-full top-0 z-50 min-w-32 w-max rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg",
        "ml-1",
        "animate-in fade-in-0 zoom-in-95 slide-in-from-left-2",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  )
}

// Group
type DropdownMenuGroupProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function DropdownMenuGroup({ children, className, ...props }: DropdownMenuGroupProps) {
  return (
    <div role="group" className={className} {...props}>
      {children}
    </div>
  )
}
