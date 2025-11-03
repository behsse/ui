import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Slot, type AsChildProps } from "./internals/Slot";
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none shrink-0 cursor-pointer",
  {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/85",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/40",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
            destructive: "bg-destructive text-primary-foreground  hover:bg-destructive/85",
            ghost: "hover:bg-accent hover:text-accent-foreground",
        },
        size: {
          default: "px-4 py-2 has-[>svg]:px-3",
        },
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

type Props = AsChildProps<
  {
    children: ReactNode;
    className?: string;
  } & VariantProps<typeof buttonVariants>,
  ButtonHTMLAttributes<HTMLButtonElement>
>;

export function Button({
  variant = "default",
  size = "default",
  children,
  className,
  asChild,
  ...props
}: Props) {
  const Component = asChild ? Slot : "button";
  return (
    <Component className={cn(buttonVariants({variant, size,className}))} {...props}>
      {children}
    </Component>
  );
}