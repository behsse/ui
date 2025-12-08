"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const accordionVariants = cva(
  "border rounded-lg overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-border",
        ghost: "border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    }
  }
)

const accordionItemVariants = cva(
  "border-b last:border-b-0",
  {
    variants: {
      variant: {
        default: "border-border",
        ghost: "border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    }
  }
)

const accordionTriggerVariants = cva(
  "flex w-full items-center justify-between py-4 px-4 text-sm font-medium transition-all hover:underline cursor-pointer [&[data-state=open]>svg]:rotate-180",
  {
    variants: {
      variant: {
        default: "",
        ghost: "",
      },
    },
    defaultVariants: {
      variant: "default",
    }
  }
)

const accordionContentVariants = cva(
  "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
  {
    variants: {
      variant: {
        default: "",
        ghost: "",
      },
    },
    defaultVariants: {
      variant: "default",
    }
  }
)

type AccordionContextType = {
  openItems: string[]
  toggleItem: (value: string) => void
  variant?: "default" | "ghost" | null
  type?: "single" | "multiple"
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined)

function useAccordion() {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion")
  }
  return context
}

type AccordionItemContextType = {
  value: string
}

const AccordionItemContext = createContext<AccordionItemContextType | undefined>(undefined)

function useAccordionItem() {
  const context = useContext(AccordionItemContext)
  if (!context) {
    throw new Error("AccordionTrigger and AccordionContent must be used within an AccordionItem")
  }
  return context
}

type AccordionProps = {
  children: ReactNode
  className?: string
  type?: "single" | "multiple"
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
} & VariantProps<typeof accordionVariants>

export function Accordion({
  children,
  className,
  variant = "default",
  type = "single",
  defaultValue,
  value,
  onValueChange,
}: AccordionProps) {
  const [internalOpenItems, setInternalOpenItems] = useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    }
    return []
  })

  const isControlled = value !== undefined
  const openItems = isControlled
    ? Array.isArray(value)
      ? value
      : [value]
    : internalOpenItems

  const toggleItem = (itemValue: string) => {
    let newOpenItems: string[]

    if (type === "single") {
      newOpenItems = openItems.includes(itemValue) ? [] : [itemValue]
    } else {
      newOpenItems = openItems.includes(itemValue)
        ? openItems.filter((v) => v !== itemValue)
        : [...openItems, itemValue]
    }

    if (!isControlled) {
      setInternalOpenItems(newOpenItems)
    }

    if (onValueChange) {
      onValueChange(type === "single" ? newOpenItems[0] || "" : newOpenItems)
    }
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, variant, type }}>
      <div className={cn(accordionVariants({ variant, className }))}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

type AccordionItemProps = {
  children: ReactNode
  value: string
  className?: string
  defaultOpen?: boolean
}

export function AccordionItem({ children, value, className, defaultOpen }: AccordionItemProps) {
  const { variant, openItems, toggleItem } = useAccordion()

  // Si defaultOpen est true et que l'item n'est pas déjà ouvert, l'ouvrir au montage
  useEffect(() => {
    if (defaultOpen && !openItems.includes(value)) {
      toggleItem(value)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={cn(accordionItemVariants({ variant, className }))}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

type AccordionTriggerProps = {
  children: ReactNode
  className?: string
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const { openItems, toggleItem, variant } = useAccordion()
  const { value } = useAccordionItem()

  const isOpen = openItems.includes(value)

  return (
    <button
      type="button"
      className={cn(accordionTriggerVariants({ variant, className }))}
      data-state={isOpen ? "open" : "closed"}
      onClick={() => toggleItem(value)}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 transition-transform duration-200"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  )
}

type AccordionContentProps = {
  children: ReactNode
  className?: string
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const { openItems, variant } = useAccordion()
  const { value } = useAccordionItem()

  const isOpen = openItems.includes(value)

  return (
    <div
      className={cn(accordionContentVariants({ variant, className }))}
      data-state={isOpen ? "open" : "closed"}
    >
      {isOpen && (
        <div className="px-4 pb-4 pt-0">
          {children}
        </div>
      )}
    </div>
  )
}
