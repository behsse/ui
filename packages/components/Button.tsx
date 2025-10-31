import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Slot, type AsChildProps } from "./internals/Slot";
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "block",
  {
    variants : {
      variant : {
        default : "",
        destructive : ""
      }
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
  children,
  className,
  asChild,
  ...props
}: Props) {
  const Component = asChild ? Slot : "button";
  return (
    <Component className={cn(buttonVariants({variant, className}))} {...props}>
      {children}
    </Component>
  );
}