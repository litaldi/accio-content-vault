
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const enhancedButtonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-4 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] min-w-[44px]",
  {
    variants: {
      variant: {
        primary: "cta-primary",
        secondary: "cta-secondary", 
        ghost: "hover:bg-accent/80 hover:text-accent-foreground hover:scale-[1.02]",
        outline: "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/50 shadow-sm hover:shadow-md",
        destructive: "bg-error text-error-foreground hover:bg-error/90 shadow-sm hover:shadow-lg",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-sm hover:shadow-lg",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 shadow-sm hover:shadow-lg",
      },
      size: {
        sm: "h-10 px-4 py-2 text-sm gap-2",
        default: "h-12 px-6 py-3 gap-3",
        lg: "h-14 px-8 py-4 text-lg gap-3 font-semibold",
        xl: "h-16 px-12 py-6 text-xl gap-4 font-bold",
        icon: "h-12 w-12 p-0",
        fab: "fab"
      },
      fullWidth: {
        true: "w-full",
      },
      emphasis: {
        high: "shadow-xl hover:shadow-2xl transform hover:-translate-y-1",
        medium: "shadow-lg hover:shadow-xl",
        low: "shadow-sm hover:shadow-md",
        none: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      emphasis: "medium"
    },
  }
)

export interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof enhancedButtonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  showArrow?: boolean
  loadingText?: string
  description?: string
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    emphasis,
    asChild = false, 
    loading = false, 
    leftIcon,
    rightIcon,
    showArrow = false,
    loadingText,
    description,
    disabled,
    children, 
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const accessibilityProps = {
      'aria-disabled': disabled || loading,
      'aria-describedby': description ? `${props.id || 'button'}-desc` : undefined,
      'aria-label': typeof children === 'string' ? children : '',
      ...props
    }
    
    if (asChild) {
      return (
        <Comp
          className={cn(enhancedButtonVariants({ variant, size, fullWidth, emphasis, className }))}
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
          className={cn(enhancedButtonVariants({ variant, size, fullWidth, emphasis, className }))}
          ref={ref}
          disabled={disabled || loading}
          {...accessibilityProps}
        >
          <span className="flex items-center gap-3">
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                <span className="sr-only">Loading...</span>
                {loadingText || children}
              </>
            ) : (
              <>
                {leftIcon && <span className="flex-shrink-0" aria-hidden="true">{leftIcon}</span>}
                <span>{children}</span>
                {(rightIcon || showArrow) && (
                  <span className="flex-shrink-0" aria-hidden="true">
                    {rightIcon || <ArrowRight className="h-5 w-5" />}
                  </span>
                )}
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
EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton, enhancedButtonVariants }
