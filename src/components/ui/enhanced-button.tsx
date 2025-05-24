
import React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Enhanced Button component with loading states and icons
 * Properly handles single child requirement when using asChild
 */
export const EnhancedButton = React.forwardRef<
  HTMLButtonElement,
  EnhancedButtonProps
>(({ 
  children, 
  loading = false, 
  loadingText = 'Loading...', 
  leftIcon, 
  rightIcon, 
  disabled, 
  className,
  asChild = false,
  ...props 
}, ref) => {
  const isDisabled = disabled || loading;

  // When asChild is true, we need to ensure we only pass a single child
  if (asChild) {
    if (!React.isValidElement(children)) {
      console.warn('EnhancedButton with asChild prop expects a single React element as children');
      return null;
    }

    // Use Slot to properly forward the ref and props without cloning
    return (
      <Slot
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2",
          loading && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
        {...(isDisabled && { disabled: isDisabled })}
      >
        {children}
      </Slot>
    );
  }

  return (
    <Button
      ref={ref}
      disabled={isDisabled}
      className={cn(
        "gap-2",
        loading && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
          {loadingText}
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </Button>
  );
});

EnhancedButton.displayName = "EnhancedButton";
