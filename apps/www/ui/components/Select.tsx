"use client"

import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from "react"
import { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo } from "react"
import { cn } from "@/lib/utils"
import ChevronDown from "@/ui/icons/ChevronDown"
import Check from "@/ui/icons/Check"

// Context
type SelectContextType = {
  open: boolean
  onOpenChange: (open: boolean) => void
  value: string
  onValueChange: (value: string) => void
  disabled: boolean
  triggerRef: React.RefObject<HTMLElement | null>
  registerItem: (value: string, label: string) => void
  itemLabels: React.RefObject<Map<string, string>>
}

const SelectContext = createContext<SelectContextType | undefined>(undefined)

function useSelect() {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error("Select components must be used within a Select")
  }
  return context
}

// Root
type SelectProps = {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name?: string
}

export function Select({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  disabled = false,
  name,
}: SelectProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [internalValue, setInternalValue] = useState(defaultValue)
  const triggerRef = useRef<HTMLElement | null>(null)
  const itemLabels = useRef<Map<string, string>>(new Map())

  const isOpenControlled = controlledOpen !== undefined
  const open = isOpenControlled ? controlledOpen : internalOpen

  const isValueControlled = controlledValue !== undefined
  const value = isValueControlled ? controlledValue : internalValue

  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (!isOpenControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }, [isOpenControlled, onOpenChange])

  const handleValueChange = useCallback((newValue: string) => {
    if (!isValueControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
    handleOpenChange(false)
  }, [isValueControlled, onValueChange, handleOpenChange])

  const registerItem = useCallback((itemValue: string, label: string) => {
    itemLabels.current.set(itemValue, label)
  }, [])

  return (
    <SelectContext.Provider value={{ open, onOpenChange: handleOpenChange, value, onValueChange: handleValueChange, disabled, triggerRef, registerItem, itemLabels }}>
      <div className="relative inline-block">
        {children}
        {name && <input type="hidden" name={name} value={value} />}
      </div>
    </SelectContext.Provider>
  )
}

// Trigger
type SelectTriggerProps = {
  children: ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function SelectTrigger({ children, className, ...props }: SelectTriggerProps) {
  const { open, onOpenChange, disabled, triggerRef } = useSelect()

  const handleClick = () => {
    if (!disabled) {
      onOpenChange(!open)
    }
  }

  return (
    <button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      type="button"
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      disabled={disabled}
      className={cn(
        "flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      <ChevronDown className={cn("h-4 w-4 shrink-0 opacity-50 transition-transform", open && "rotate-180")} />
    </button>
  )
}

// Value
type SelectValueProps = {
  placeholder?: string
  className?: string
}

export function SelectValue({ placeholder, className }: SelectValueProps) {
  const { value, itemLabels } = useSelect()

  const displayLabel = value ? (itemLabels.current.get(value) || value) : null

  return (
    <span className={cn("truncate", !displayLabel && "text-muted-foreground", className)}>
      {displayLabel || placeholder}
    </span>
  )
}

// Content
type SelectContentProps = {
  children: ReactNode
  className?: string
  side?: "bottom" | "top"
  align?: "start" | "center" | "end"
  sideOffset?: number
} & HTMLAttributes<HTMLDivElement>

export function SelectContent({
  children,
  className,
  side,
  align = "start",
  sideOffset = 4,
  ...props
}: SelectContentProps) {
  const { open, onOpenChange, triggerRef } = useSelect()
  const contentRef = useRef<HTMLDivElement>(null)

  // Compute side synchronously to avoid flash
  const resolvedSide = useMemo<"bottom" | "top">(() => {
    if (side) return side
    if (!open) return "bottom"

    const trigger = triggerRef.current
    if (!trigger) return "bottom"

    const rect = trigger.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top

    if (spaceBelow < 200 && spaceAbove > spaceBelow) {
      return "top"
    }
    return "bottom"
  }, [open, side, triggerRef])

  // Close on click outside
  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e: MouseEvent) => {
      const content = contentRef.current
      const trigger = triggerRef.current
      if (!content) return
      // Ignore clicks on the trigger — the trigger handles its own toggle
      if (trigger?.contains(e.target as Node)) return
      if (!content.contains(e.target as Node)) {
        onOpenChange(false)
      }
    }

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

  return (
    <div
      ref={contentRef}
      role="listbox"
      className={cn(
        "absolute z-50 min-w-(--trigger-width,8rem) w-full rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
        "animate-in fade-in-0 zoom-in-95",
        resolvedSide === "bottom" && "slide-in-from-top-2",
        resolvedSide === "top" && "slide-in-from-bottom-2",
        resolvedSide === "bottom" ? "top-full" : "bottom-full",
        alignClasses[align],
        className
      )}
      style={{
        ...(resolvedSide === "bottom" ? { marginTop: `${sideOffset}px` } : {}),
        ...(resolvedSide === "top" ? { marginBottom: `${sideOffset}px` } : {}),
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Item
type SelectItemProps = {
  children: ReactNode
  value: string
  className?: string
  disabled?: boolean
} & HTMLAttributes<HTMLDivElement>

export function SelectItem({
  children,
  value: itemValue,
  className,
  disabled = false,
  ...props
}: SelectItemProps) {
  const { value, onValueChange, registerItem } = useSelect()

  const isSelected = value === itemValue
  const textContent = typeof children === "string" ? children : itemValue

  // Register item label for display in trigger
  useEffect(() => {
    registerItem(itemValue, textContent)
  }, [itemValue, textContent, registerItem])

  const handleClick = () => {
    if (disabled) return
    onValueChange(itemValue)
  }

  return (
    <div
      role="option"
      aria-selected={isSelected}
      tabIndex={disabled ? -1 : 0}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors whitespace-nowrap",
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
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  )
}

// Group
type SelectGroupProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function SelectGroup({ children, className, ...props }: SelectGroupProps) {
  return (
    <div role="group" className={className} {...props}>
      {children}
    </div>
  )
}

// Label
type SelectLabelProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function SelectLabel({ children, className, ...props }: SelectLabelProps) {
  return (
    <div
      className={cn("px-2 py-1.5 pl-8 text-sm font-semibold text-muted-foreground", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Separator
type SelectSeparatorProps = {
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <div
      role="separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}
