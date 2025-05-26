
import React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  description?: string;
}

export const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ className, leftIcon, rightIcon, error, description, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <Input
            className={cn(
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        {description && !error && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

EnhancedInput.displayName = "EnhancedInput";
