
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const enhancedButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] min-h-[44px] min-w-[44px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow hover:shadow-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow hover:shadow-md",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-12 text-lg",
        icon: "h-10 w-10",
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

export interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof enhancedButtonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loadingText?: string
  description?: string
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
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
    disabled,
    children, 
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const accessibilityProps = {
      'aria-disabled': disabled || loading,
      'aria-describedby': description ? `${props.id || 'button'}-desc` : undefined,
      ...props
    }
    
    if (asChild) {
      return (
        <Comp
          className={cn(enhancedButtonVariants({ variant, size, fullWidth, className }))}
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
          className={cn(enhancedButtonVariants({ variant, size, fullWidth, className }))}
          ref={ref}
          disabled={disabled || loading}
          {...accessibilityProps}
        >
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
