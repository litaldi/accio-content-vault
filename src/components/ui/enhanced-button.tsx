
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-[1px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        subtle: "bg-primary/10 text-primary hover:bg-primary/20",
        accent: "bg-accent text-accent-foreground hover:bg-accent/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-8 rounded px-2.5 text-xs",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8 text-base",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10 p-0",
      },
      loading: {
        true: "relative !text-transparent hover:!text-transparent transition-none [&>span]:invisible [&>span.loader]:visible [&>span.loader]:flex",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      loading: false,
    },
  }
)

export interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant, size, loading, asChild = false, children, disabled, leadingIcon, trailingIcon, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        <span className="flex items-center justify-center gap-1.5">
          {leadingIcon && <span className="leading-icon">{leadingIcon}</span>}
          {children}
          {trailingIcon && <span className="trailing-icon">{trailingIcon}</span>}
        </span>
        {loading && (
          <span className="loader absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 invisible hidden items-center justify-center">
            <Loader2 className="animate-spin h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Loading</span>
          </span>
        )}
      </Comp>
    )
  }
)
EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton, buttonVariants }
