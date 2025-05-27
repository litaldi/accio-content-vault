
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AccessibleButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  ariaLabel?: string;
  tooltipText?: string;
}

/**
 * Enhanced button component with built-in accessibility features
 * including loading states, ARIA labels, and proper focus management
 */
export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  className,
  isLoading = false,
  loadingText = 'Loading...',
  ariaLabel,
  tooltipText,
  disabled,
  ...props
}) => {
  return (
    <Button
      className={cn(
        // Enhanced focus styles for accessibility
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        // Better touch targets for mobile
        'min-h-[44px] min-w-[44px]',
        // Smooth transitions
        'transition-all duration-200',
        className
      )}
      disabled={disabled || isLoading}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      title={tooltipText}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default AccessibleButton;
