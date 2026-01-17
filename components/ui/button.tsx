import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium",
    "ring-offset-background transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40 disabled:saturate-50",
    "active:scale-95 active:shadow-inner",
    "relative overflow-hidden",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "bg-primary text-primary-foreground shadow-sm",
          "hover:bg-primary/90 hover:shadow-md hover:scale-[1.02]",
          "active:shadow-inner"
        ),
        destructive: cn(
          "bg-destructive text-destructive-foreground shadow-sm",
          "hover:bg-destructive/90 hover:shadow-md hover:scale-[1.02]",
          "active:shadow-inner"
        ),
        success: cn(
          "bg-success text-success-foreground shadow-sm",
          "hover:bg-success/90 hover:shadow-md hover:scale-[1.02]",
          "active:shadow-inner"
        ),
        warning: cn(
          "bg-warning text-warning-foreground shadow-sm",
          "hover:bg-warning/90 hover:shadow-md hover:scale-[1.02]",
          "active:shadow-inner"
        ),
        info: cn(
          "bg-info text-info-foreground shadow-sm",
          "hover:bg-info/90 hover:shadow-md hover:scale-[1.02]",
          "active:shadow-inner"
        ),
        outline: cn(
          "border-2 border-input bg-background",
          "hover:bg-accent hover:text-accent-foreground hover:border-primary/50",
          "active:bg-accent/80"
        ),
        secondary: cn(
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/80 hover:shadow-sm",
          "active:bg-secondary/70"
        ),
        ghost: cn(
          "hover:bg-accent hover:text-accent-foreground",
          "active:bg-accent/80"
        ),
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
      },
      size: {
        default: "h-12 px-4 py-2",
        sm: "h-12 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-12 w-12",
        "icon-sm": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
