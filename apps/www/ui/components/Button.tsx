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
            outline: "border bg-background hover:bg-accent hover:text-accent-foreground",
            destructive: "bg-destructive text-primary-foreground  hover:bg-destructive/85",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            text: "text-primary/85 hover:text-primary"
        },
        size: {
          default: "h-9 px-4 py-2 has-[>svg]:px-3",
          small: "h-8 px-3 py-1.5 has-[>svg]:px-2",
          large: "h-10 px-5 py-2.5 has-[>svg]:px-4",
          xl: "h-12 px-6 py-3 has-[>svg]:px-5"
        },
        iconSize: {
          default: "h-9 aspect-square",
          small: "h-8 aspect-square",
          large: "h-10 aspect-square",
          xl: "h-12 aspect-square"
        },
    },
    defaultVariants: {
      variant: "default"
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
  size,
  iconSize,
  children,
  className,
  asChild,
  ...props
}: Props) {
  const Component = asChild ? Slot : "button";
  return (
    <Component className={cn(buttonVariants({variant, size: iconSize ? undefined : (size ?? "default"), iconSize: iconSize ?? undefined, className}))} {...props}>
      {children}
    </Component>
  );
}