import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import ChevronRight from "@/ui/icons/ChevronRight";

// Breadcrumb Root
type BreadcrumbProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function Breadcrumb({ children, className, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={cn("", className)} {...props}>
      <ol className="flex items-center gap-1.5 text-sm">
        {children}
      </ol>
    </nav>
  );
}

// Breadcrumb Item
type BreadcrumbItemProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLLIElement>;

export function BreadcrumbItem({ children, className, ...props }: BreadcrumbItemProps) {
  return (
    <li className={cn("inline-flex items-center gap-1.5", className)} {...props}>
      {children}
    </li>
  );
}

// Breadcrumb Link
type BreadcrumbLinkProps = {
  children: ReactNode;
  className?: string;
  href?: string;
} & HTMLAttributes<HTMLAnchorElement>;

export function BreadcrumbLink({ children, className, href, ...props }: BreadcrumbLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "text-muted-foreground hover:text-foreground transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

// Breadcrumb Page (current page, not a link)
type BreadcrumbPageProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLSpanElement>;

export function BreadcrumbPage({ children, className, ...props }: BreadcrumbPageProps) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-medium", className)}
      {...props}
    >
      {children}
    </span>
  );
}

// Breadcrumb Separator
type BreadcrumbSeparatorProps = {
  children?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLLIElement>;

export function BreadcrumbSeparator({ children, className, ...props }: BreadcrumbSeparatorProps) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("text-muted-foreground", className)}
      {...props}
    >
      {children ?? <ChevronRight className="h-3.5 w-3.5" />}
    </li>
  );
}

// Breadcrumb Ellipsis (for collapsed items)
type BreadcrumbEllipsisProps = {
  className?: string;
} & HTMLAttributes<HTMLSpanElement>;

export function BreadcrumbEllipsis({ className, ...props }: BreadcrumbEllipsisProps) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex h-9 w-9 items-center justify-center text-muted-foreground", className)}
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
      <span className="sr-only">More</span>
    </span>
  );
}
