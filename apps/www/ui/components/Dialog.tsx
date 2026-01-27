"use client"

import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import Close from "@/ui/icons/Close"

// Context
type DialogContextType = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

function useDialog() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog")
  }
  return context
}

// Main Dialog
type DialogProps = {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Dialog({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: DialogProps) {
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
    <DialogContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

// Trigger
type DialogTriggerProps = {
  children: ReactNode
  className?: string
  asChild?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function DialogTrigger({ children, className, asChild, ...props }: DialogTriggerProps) {
  const { onOpenChange } = useDialog()

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

// Portal
type DialogPortalProps = {
  children: ReactNode
}

function DialogPortal({ children }: DialogPortalProps) {
  const { open } = useDialog()

  if (!open) return null

  return <>{children}</>
}

// Overlay
type DialogOverlayProps = {
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  const { open, onOpenChange } = useDialog()

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/80",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      data-state={open ? "open" : "closed"}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  )
}

// Content
type DialogContentProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function DialogContent({ children, className, ...props }: DialogContentProps) {
  const { open, onOpenChange } = useDialog()

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [open, onOpenChange])

  return (
    <DialogPortal>
      <DialogOverlay />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
          "gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          className
        )}
        data-state={open ? "open" : "closed"}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <Close className="h-4 w-4 fill-foreground" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </div>
    </DialogPortal>
  )
}

// Header
type DialogHeaderProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function DialogHeader({ children, className, ...props }: DialogHeaderProps) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Footer
type DialogFooterProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function DialogFooter({ children, className, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Title
type DialogTitleProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLHeadingElement>

export function DialogTitle({ children, className, ...props }: DialogTitleProps) {
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
type DialogDescriptionProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLParagraphElement>

export function DialogDescription({ children, className, ...props }: DialogDescriptionProps) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  )
}

// Close button
type DialogCloseProps = {
  children?: ReactNode
  className?: string
  asChild?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function DialogClose({ children, className, onClick, asChild, ...props }: DialogCloseProps) {
  const { onOpenChange } = useDialog()

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
