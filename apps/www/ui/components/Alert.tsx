import type { HTMLAttributes, ReactNode } from "react"
import { Slot, type AsChildProps } from "./internals/Slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "border-green-500/50 text-green-600 dark:text-green-500 [&>svg]:text-green-600 dark:[&>svg]:text-green-500",
        warning: "border-yellow-500/50 text-yellow-600 dark:text-yellow-500 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-500",
        info: "border-blue-500/50 text-blue-600 dark:text-blue-500 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const alertTitleVariants = cva("mb-1 font-medium leading-none tracking-tight")

const alertDescriptionVariants = cva("text-sm [&_p]:leading-relaxed")

type AlertProps = AsChildProps<
  {
    children: ReactNode
    className?: string
  } & VariantProps<typeof alertVariants>,
  HTMLAttributes<HTMLDivElement>
>

export function Alert({
  children,
  className,
  variant = "default",
  asChild,
  ...props
}: AlertProps) {
  const Component = asChild ? Slot : "div"
  return (
    <Component
      role="alert"
      className={cn(alertVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Component>
  )
}

type AlertTitleProps = AsChildProps<
  {
    children: ReactNode
    className?: string
  },
  HTMLAttributes<HTMLHeadingElement>
>

export function AlertTitle({
  children,
  className,
  asChild,
  ...props
}: AlertTitleProps) {
  const Component = asChild ? Slot : "h5"
  return (
    <Component className={cn(alertTitleVariants(), className)} {...props}>
      {children}
    </Component>
  )
}

type AlertDescriptionProps = AsChildProps<
  {
    children: ReactNode
    className?: string
  },
  HTMLAttributes<HTMLParagraphElement>
>

export function AlertDescription({
  children,
  className,
  asChild,
  ...props
}: AlertDescriptionProps) {
  const Component = asChild ? Slot : "div"
  return (
    <Component className={cn(alertDescriptionVariants(), className)} {...props}>
      {children}
    </Component>
  )
}
