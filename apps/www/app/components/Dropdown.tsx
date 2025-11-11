"use client"

import { createContext, useContext, useState, type ReactNode, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type DropdownContextType = {
  open: boolean
  setOpen: (open: boolean) => void
  selectedValue: string | null
  selectedLabel: ReactNode | null
  setSelectedValue: (value: string, label: ReactNode) => void
  initializeLabel: (value: string, label: ReactNode) => void
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined)

const useDropdown = () => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error("Dropdown components must be used within a Dropdown provider")
  }
  return context
}

// Root component
type DropdownProps = {
  children: ReactNode
  defaultValue?: string
  defaultLabel?: ReactNode
  onValueChange?: (value: string) => void
  className?: string
}

export function Dropdown({ children, defaultValue, defaultLabel, onValueChange, className }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string | null>(defaultValue || null)
  const [selectedLabel, setSelectedLabel] = useState<ReactNode | null>(defaultLabel || null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)

  const handleValueChange = (value: string, label: ReactNode) => {
    setSelectedValue(value)
    setSelectedLabel(label)
    if (onValueChange) {
      onValueChange(value)
    }
    setOpen(false)
  }

  // Fonction pour initialiser le label sans fermer le dropdown
  const initializeLabel = (value: string, label: ReactNode) => {
    if (!isInitialized.current) {
      setSelectedValue(value)
      setSelectedLabel(label)
      isInitialized.current = true
    }
  }

  // Fermer le dropdown au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      // Utiliser un léger délai pour éviter que le clic de sélection ne déclenche immédiatement la fermeture
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside)
      }, 0)

      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [open])

  return (
    <DropdownContext.Provider value={{ open, setOpen, selectedValue, selectedLabel, setSelectedValue: handleValueChange, initializeLabel }}>
      <div ref={dropdownRef} className={cn("relative w-full", className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

// Trigger component
type DropdownTriggerProps = {
  children?: ReactNode
  className?: string
}

export function DropdownTrigger({ children, className }: DropdownTriggerProps) {
  const { open, setOpen, selectedLabel } = useDropdown()

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground outline-none focus:outline-none focus-visible:outline-none",
        className
      )}
    >
      <span>{selectedLabel || children}</span>
      <svg
        className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  )
}

// Content component
type DropdownContentProps = {
  children: ReactNode
  className?: string
  align?: "start" | "center" | "end"
}

export function DropdownContent({ children, className, align = "start" }: DropdownContentProps) {
  const { open } = useDropdown()
  const contentRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<"bottom" | "top">("bottom")

  useEffect(() => {
    if (open && contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top

      // Si pas assez d'espace en dessous (moins de 100px) et plus d'espace au-dessus
      if (spaceBelow < 100 && spaceAbove > spaceBelow) {
        setPosition("top")
      } else {
        setPosition("bottom")
      }
    }
  }, [open])

  if (!open) return null

  const alignmentClass = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0"
  }[align]

  const positionClass = position === "top"
    ? "bottom-full mb-2"
    : "top-full mt-2"

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute z-50 w-full max-h-60 flex flex-col overflow-y-auto rounded-md border bg-popover p-2 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95 outline-none focus:outline-none focus-visible:outline-none",
        positionClass,
        alignmentClass,
        className
      )}
    >
      {children}
    </div>
  )
}

// Item component
type DropdownItemProps = {
  children: ReactNode
  value: string
  className?: string
  onSelect?: () => void
}

export function DropdownItem({ children, value, className, onSelect }: DropdownItemProps) {
  const { selectedValue, setSelectedValue, selectedLabel, initializeLabel } = useDropdown()

  // Initialiser le label au montage si c'est l'item avec la valeur par défaut
  useEffect(() => {
    if (selectedValue === value && !selectedLabel) {
      initializeLabel(value, children)
    }
  }, [selectedValue, value, selectedLabel, children, initializeLabel])

  const handleClick = () => {
    setSelectedValue(value, children)
    if (onSelect) {
      onSelect()
    }
  }

  const isSelected = selectedValue === value

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        isSelected && "bg-accent",
        className
      )}
    >
      {children}
    </div>
  )
}

// Separator component
type DropdownSeparatorProps = {
  className?: string
}

export function DropdownSeparator({ className }: DropdownSeparatorProps) {
  return (
    <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />
  )
}

// Label component
type DropdownLabelProps = {
  children: ReactNode
  className?: string
}

export function DropdownLabel({ children, className }: DropdownLabelProps) {
  return (
    <div className={cn("px-2 py-1.5 text-sm font-semibold", className)}>
      {children}
    </div>
  )
}
