"use client"

import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertDialogOverlayVariants = cva(
  "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
)

const alertDialogContentVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
)

const alertDialogHeaderVariants = cva(
  "flex flex-col space-y-2 text-center sm:text-left"
)

const alertDialogFooterVariants = cva(
  "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
)

const alertDialogTitleVariants = cva(
  "text-lg font-semibold"
)

const alertDialogDescriptionVariants = cva(
  "text-sm text-muted-foreground"
)

const alertDialogActionVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
)

const alertDialogCancelVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 mt-2 sm:mt-0"
)

type AlertDialogContextType = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined)

function useAlertDialog() {
  const context = useContext(AlertDialogContext)
  if (!context) {
    throw new Error("AlertDialog components must be used within an AlertDialog")
  }
  return context
}

type AlertDialogProps = {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function AlertDialog({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: AlertDialogProps) {
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
    <AlertDialogContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

type AlertDialogTriggerProps = {
  children: ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function AlertDialogTrigger({ children, className, ...props }: AlertDialogTriggerProps) {
  const { onOpenChange } = useAlertDialog()

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

type AlertDialogPortalProps = {
  children: ReactNode
}

export function AlertDialogPortal({ children }: AlertDialogPortalProps) {
  const { open } = useAlertDialog()

  if (!open) return null

  return <>{children}</>
}

type AlertDialogOverlayProps = {
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function AlertDialogOverlay({ className, ...props }: AlertDialogOverlayProps) {
  const { open, onOpenChange } = useAlertDialog()

  return (
    <div
      className={cn(alertDialogOverlayVariants(), className)}
      data-state={open ? "open" : "closed"}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  )
}

type AlertDialogContentProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function AlertDialogContent({ children, className, ...props }: AlertDialogContentProps) {
  const { open, onOpenChange } = useAlertDialog()

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
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <div
        role="alertdialog"
        className={cn(alertDialogContentVariants(), className)}
        data-state={open ? "open" : "closed"}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </AlertDialogPortal>
  )
}

type AlertDialogHeaderProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function AlertDialogHeader({ children, className, ...props }: AlertDialogHeaderProps) {
  return (
    <div className={cn(alertDialogHeaderVariants(), className)} {...props}>
      {children}
    </div>
  )
}

type AlertDialogFooterProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function AlertDialogFooter({ children, className, ...props }: AlertDialogFooterProps) {
  return (
    <div className={cn(alertDialogFooterVariants(), className)} {...props}>
      {children}
    </div>
  )
}

type AlertDialogTitleProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLHeadingElement>

export function AlertDialogTitle({ children, className, ...props }: AlertDialogTitleProps) {
  return (
    <h2 className={cn(alertDialogTitleVariants(), className)} {...props}>
      {children}
    </h2>
  )
}

type AlertDialogDescriptionProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLParagraphElement>

export function AlertDialogDescription({ children, className, ...props }: AlertDialogDescriptionProps) {
  return (
    <p className={cn(alertDialogDescriptionVariants(), className)} {...props}>
      {children}
    </p>
  )
}

type AlertDialogActionProps = {
  children: ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function AlertDialogAction({ children, className, onClick, ...props }: AlertDialogActionProps) {
  const { onOpenChange } = useAlertDialog()

  return (
    <button
      type="button"
      className={cn(alertDialogActionVariants(), className)}
      onClick={(e) => {
        onClick?.(e)
        onOpenChange(false)
      }}
      {...props}
    >
      {children}
    </button>
  )
}

type AlertDialogCancelProps = {
  children: ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function AlertDialogCancel({ children, className, onClick, ...props }: AlertDialogCancelProps) {
  const { onOpenChange } = useAlertDialog()

  return (
    <button
      type="button"
      className={cn(alertDialogCancelVariants(), className)}
      onClick={(e) => {
        onClick?.(e)
        onOpenChange(false)
      }}
      {...props}
    >
      {children}
    </button>
  )
}
