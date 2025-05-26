
import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] min-w-[44px] relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow hover:shadow-lg hover:scale-105 hover:-translate-y-0.5",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow hover:shadow-lg hover:scale-105",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md hover:border-primary/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md hover:scale-105",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        gradient: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl hover:scale-105",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-sm",
        lg: "h-11 rounded-md px-8 text-base",
        xl: "h-14 rounded-lg px-12 text-lg font-semibold",
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
);

export interface OptimizedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loadingText?: string;
  description?: string;
  hoverText?: string;
}

const OptimizedButton = React.forwardRef<HTMLButtonElement, OptimizedButtonProps>(
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
    const Comp = asChild ? Slot : "button";
    
    const accessibilityProps = {
      'aria-disabled': disabled || loading,
      'aria-describedby': description ? `${props.id || 'button'}-desc` : undefined,
      title: hoverText || (typeof children === 'string' ? children : ''),
      ...props
    };
    
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          ref={ref}
          {...accessibilityProps}
        >
          {children}
        </Comp>
      );
    }
    
    return (
      <>
        <Comp
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          ref={ref}
          disabled={disabled || loading}
          {...accessibilityProps}
        >
          {/* Shine effect for marketing appeal */}
          {variant === 'default' || variant === 'gradient' ? (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          ) : null}
          
          <span className="relative z-10 flex items-center gap-2">
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
    );
  }
);

OptimizedButton.displayName = "OptimizedButton";

export { OptimizedButton, buttonVariants };
