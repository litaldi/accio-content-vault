
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface EnhancedButtonProps extends ButtonProps {
  gradient?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  className,
  variant = 'default',
  gradient = false,
  isLoading = false,
  loadingText = 'Loading...',
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  return (
    <Button
      className={cn(
        'transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0',
        gradient && 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90',
        className
      )}
      variant={gradient ? 'ghost' : variant}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{loadingText}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {leftIcon}
          {children}
          {rightIcon}
        </div>
      )}
    </Button>
  );
};

export default EnhancedButton;
