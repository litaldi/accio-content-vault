
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ComponentType<{ className?: string }>;
  tooltipText?: string;
  intent?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const intentStyles = {
  primary: 'bg-gradient-to-r from-primary via-blue-600 to-purple-600 hover:from-primary/90 hover:via-blue-600/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl',
  secondary: 'bg-secondary hover:bg-secondary/80',
  success: 'bg-green-500 hover:bg-green-600 text-white',
  warning: 'bg-amber-500 hover:bg-amber-600 text-white',
  error: 'bg-destructive hover:bg-destructive/90'
};

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  className,
  isLoading = false,
  loadingText,
  icon: Icon,
  tooltipText,
  intent,
  disabled,
  ...props
}) => {
  return (
    <Button
      className={cn(
        // Enhanced accessibility and interaction
        'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'min-h-[44px] min-w-[44px]', // Better touch targets
        'font-medium',
        intent && intentStyles[intent],
        className
      )}
      disabled={disabled || isLoading}
      title={tooltipText}
      aria-busy={isLoading}
      {...props}
    >
      <div className="flex items-center gap-2">
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
