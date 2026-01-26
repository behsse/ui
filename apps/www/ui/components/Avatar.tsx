"use client"

import type { ReactNode, ImgHTMLAttributes, HTMLAttributes } from "react"
import { createContext, useContext, useState, Children, isValidElement } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const avatarWrapperVariants = cva(
  "relative inline-flex shrink-0",
  {
    variants: {
      size: {
        default: "h-10 w-10",
        sm: "h-8 w-8",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const avatarVariants = cva(
  "h-full w-full overflow-hidden rounded-full ring-2 ring-background"
)

const avatarImageVariants = cva("aspect-square h-full w-full object-cover")

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground",
  {
    variants: {
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
        xl: "text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const avatarBadgeVariants = cva(
  "absolute flex items-center justify-center rounded-full border-2 border-background",
  {
    variants: {
      size: {
        default: "h-3 w-3 bottom-0 right-0",
        sm: "h-2.5 w-2.5 bottom-0 right-0",
        lg: "h-3.5 w-3.5 bottom-0 right-0",
        xl: "h-4 w-4 bottom-0.5 right-0.5",
      },
      status: {
        online: "bg-green-500",
        offline: "bg-gray-400",
        busy: "bg-red-500",
        away: "bg-yellow-500",
      },
    },
    defaultVariants: {
      size: "default",
      status: "online",
    },
  }
)

type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error"

type AvatarContextType = {
  status: ImageLoadingStatus
  setStatus: (status: ImageLoadingStatus) => void
  size?: "default" | "sm" | "lg" | "xl" | null
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined)

function useAvatar() {
  const context = useContext(AvatarContext)
  if (!context) {
    throw new Error("Avatar components must be used within an Avatar")
  }
  return context
}

type AvatarProps = {
  children: ReactNode
  className?: string
} & VariantProps<typeof avatarWrapperVariants>

export function Avatar({ children, className, size = "default" }: AvatarProps) {
  const [status, setStatus] = useState<ImageLoadingStatus>("idle")

  // Séparer le badge des autres enfants
  const childArray = Children.toArray(children)
  const badge = childArray.find(
    (child) => isValidElement(child) && (child.type as { displayName?: string })?.displayName === "AvatarBadge"
  )
  const otherChildren = childArray.filter(
    (child) => !(isValidElement(child) && (child.type as { displayName?: string })?.displayName === "AvatarBadge")
  )

  return (
    <AvatarContext.Provider value={{ status, setStatus, size }}>
      <span className={cn(avatarWrapperVariants({ size, className }))}>
        <span className={cn(avatarVariants())}>
          {otherChildren}
        </span>
        {badge}
      </span>
    </AvatarContext.Provider>
  )
}

type AvatarImageProps = {
  className?: string
  src?: string
  alt?: string
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">

export function AvatarImage({ className, src, alt = "", ...props }: AvatarImageProps) {
  const { status, setStatus } = useAvatar()

  if (status === "error" || !src) {
    return null
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn(avatarImageVariants(), className)}
      onLoadStart={() => setStatus("loading")}
      onLoad={() => setStatus("loaded")}
      onError={() => setStatus("error")}
      {...props}
    />
  )
}

type AvatarFallbackProps = {
  children: ReactNode
  className?: string
  delayMs?: number
} & HTMLAttributes<HTMLSpanElement>

export function AvatarFallback({ children, className, delayMs, ...props }: AvatarFallbackProps) {
  const { status, size } = useAvatar()
  const [canRender, setCanRender] = useState(delayMs === undefined)

  // Handle delay
  if (delayMs !== undefined && !canRender) {
    setTimeout(() => setCanRender(true), delayMs)
  }

  // Don't show fallback if image loaded successfully
  if (status === "loaded") {
    return null
  }

  // Don't render until delay has passed (if specified)
  if (!canRender) {
    return null
  }

  // Show fallback only when idle (no image) or error
  if (status !== "idle" && status !== "error") {
    return null
  }

  return (
    <span className={cn(avatarFallbackVariants({ size, className }))} {...props}>
      {children}
    </span>
  )
}

type AvatarBadgeProps = {
  children?: ReactNode
  className?: string
} & VariantProps<typeof avatarBadgeVariants> & HTMLAttributes<HTMLSpanElement>

export function AvatarBadge({ children, className, status = "online", ...props }: AvatarBadgeProps) {
  const { size } = useAvatar()

  return (
    <span className={cn(avatarBadgeVariants({ size, status, className }))} {...props}>
      {children}
    </span>
  )
}

AvatarBadge.displayName = "AvatarBadge"

// Avatar Group

type AvatarGroupProps = {
  children: ReactNode
  className?: string
  max?: number
} & HTMLAttributes<HTMLDivElement>

export function AvatarGroup({ children, className, max, ...props }: AvatarGroupProps) {
  const childArray = Children.toArray(children)
  const visibleChildren = max ? childArray.slice(0, max) : childArray
  const remainingCount = max ? childArray.length - max : 0

  return (
    <div className={cn("flex -space-x-3", className)} {...props}>
      {visibleChildren}
      {remainingCount > 0 && (
        <AvatarGroupCount count={remainingCount} />
      )}
    </div>
  )
}

type AvatarGroupCountProps = {
  count: number
  className?: string
} & HTMLAttributes<HTMLSpanElement>

export function AvatarGroupCount({ count, className, ...props }: AvatarGroupCountProps) {
  return (
    <span
      className={cn(
        "relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium ring-2 ring-background",
        className
      )}
      {...props}
    >
      +{count}
    </span>
  )
}
