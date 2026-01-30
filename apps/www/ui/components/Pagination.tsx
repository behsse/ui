import type { ReactNode, HTMLAttributes, AnchorHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import ChevronLeft from "@/ui/icons/ChevronLeft"
import ChevronRight from "@/ui/icons/ChevronRight"

// Pagination Root
type PaginationProps = {
  className?: string
} & HTMLAttributes<HTMLElement>

export function Pagination({ className, ...props }: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

// Content
type PaginationContentProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLUListElement>

export function PaginationContent({ children, className, ...props }: PaginationContentProps) {
  return (
    <ul className={cn("flex flex-row items-center gap-1", className)} {...props}>
      {children}
    </ul>
  )
}

// Item
type PaginationItemProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLLIElement>

export function PaginationItem({ children, className, ...props }: PaginationItemProps) {
  return (
    <li className={cn("", className)} {...props}>
      {children}
    </li>
  )
}

// Link
type PaginationLinkProps = {
  children: ReactNode
  className?: string
  isActive?: boolean
  size?: "default" | "icon"
} & AnchorHTMLAttributes<HTMLAnchorElement>

export function PaginationLink({
  children,
  className,
  isActive = false,
  size = "default",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        size === "default" && "h-9 min-w-9 px-3",
        size === "icon" && "h-9 w-9",
        isActive
          ? "border border-input bg-background shadow-sm"
          : "border border-transparent",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}

// Previous
type PaginationPreviousProps = {
  className?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

export function PaginationPrevious({ className, ...props }: PaginationPreviousProps) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("gap-1 pl-2.5", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  )
}

// Next
type PaginationNextProps = {
  className?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

export function PaginationNext({ className, ...props }: PaginationNextProps) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn("gap-1 pr-2.5", className)}
      {...props}
    >
      <span>Next</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  )
}

// Ellipsis
type PaginationEllipsisProps = {
  className?: string
} & HTMLAttributes<HTMLSpanElement>

export function PaginationEllipsis({ className, ...props }: PaginationEllipsisProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
      >
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
      <span className="sr-only">More pages</span>
    </span>
  )
}
