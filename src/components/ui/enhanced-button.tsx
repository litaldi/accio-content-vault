
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ComponentType<{ className?: string }>;
  fullWidth?: boolean;
  intent?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive';
}

const intentStyles = {
  primary: 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm',
  secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
  success: 'bg-green-600 hover:bg-green-700 text-white shadow-sm',
  warning: 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm',
  destructive: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-sm'
};

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  className,
  isLoading = false,
  loadingText,
  icon: Icon,
  fullWidth = false,
  intent,
  disabled,
  ...props
}) => {
  return (
    <Button
      className={cn(
        // Enhanced accessibility and interaction
        'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'min-h-[44px] min-w-[44px] font-medium', // Better touch targets
        fullWidth && 'w-full',
        intent && intentStyles[intent],
        className
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : Icon ? (
          <Icon className="h-4 w-4" aria-hidden="true" />
        ) : null}
        <span>{isLoading && loadingText ? loadingText : children}</span>
      </div>
    </Button>
  );
};

export default EnhancedButton;
