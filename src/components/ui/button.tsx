
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] min-w-[44px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md hover:scale-[1.02]",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-md",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md hover:border-primary/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-[1.02]",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-md px-4 text-sm",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-12 text-lg font-semibold",
        icon: "h-11 w-11",
      },
      fullWidth: {
        true: "w-full",
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
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loadingText?: string
  description?: string
  hoverText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    asChild = false, 
    loading = false, 
    leftIcon,
    rightIcon,
    loadingText,
    description,
    hoverText,
    disabled,
    children, 
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const accessibilityProps = {
      'aria-disabled': disabled || loading,
      'aria-describedby': description ? `${props.id || 'button'}-desc` : undefined,
      'aria-label': hoverText || (typeof children === 'string' ? children : ''),
      title: hoverText || (typeof children === 'string' ? children : ''),
      ...props
    }
    
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          ref={ref}
          {...accessibilityProps}
        >
          {children}
        </Comp>
      )
    }
    
    return (
      <>
        <Comp
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          ref={ref}
          disabled={disabled || loading}
          {...accessibilityProps}
        >
          <span className="flex items-center gap-2">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                <span className="sr-only">Loading...</span>
                {loadingText || children}
              </>
            ) : (
              <>
                {leftIcon && <span className="flex-shrink-0" aria-hidden="true">{leftIcon}</span>}
                <span>{children}</span>
                {rightIcon && <span className="flex-shrink-0" aria-hidden="true">{rightIcon}</span>}
              </>
            )}
          </span>
        </Comp>
        {description && (
          <span id={`${props.id || 'button'}-desc`} className="sr-only">
            {description}
          </span>
        )}
      </>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
