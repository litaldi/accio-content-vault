
import React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Enhanced Button component with loading states and icons
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
  asChild,
  ...props 
}, ref) => {
  const isDisabled = disabled || loading;

  return (
    <Button
      ref={ref}
      disabled={isDisabled}
      className={cn(
        "gap-2",
        loading && "opacity-50 cursor-not-allowed",
        className
      )}
      asChild={asChild}
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
