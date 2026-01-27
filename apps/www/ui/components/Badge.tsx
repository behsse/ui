import type { HTMLAttributes, ReactNode } from "react";
import { Slot, type AsChildProps } from "./internals/Slot";
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 [&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg]:size-3 [&>svg]:mt-px",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-border bg-background text-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-6 px-2.5 py-0.5",
        sm: "h-5 px-2 py-0.5 text-[10px]",
        lg: "h-7 px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type Props = AsChildProps<
  {
    children: ReactNode;
    className?: string;
  } & VariantProps<typeof badgeVariants>,
  HTMLAttributes<HTMLSpanElement>
>;

export function Badge({
  variant = "default",
  size = "default",
  children,
  className,
  asChild,
  ...props
}: Props) {
  const Component = asChild ? Slot : "span";
  return (
    <Component className={cn(badgeVariants({ variant, size, className }))} {...props}>
      {children}
    </Component>
  );
}
