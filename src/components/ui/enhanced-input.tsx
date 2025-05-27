
import React, { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  containerClassName?: string;
}

export const EnhancedInput = forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ 
    label, 
    error, 
    helpText, 
    description,
    icon: Icon,
    leftIcon,
    rightIcon,
    showPasswordToggle = false,
    containerClassName,
    className, 
    id, 
    type = 'text',
    required,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helpId = (helpText || description) ? `${inputId}-help` : undefined;
    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

    // Use description as fallback for helpText if helpText is not provided
    const displayHelpText = helpText || description;

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <Label 
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium flex items-center gap-2',
              required && "after:content-['*'] after:text-destructive after:ml-0.5"
            )}
          >
            {Icon && <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
            {label}
            {required && <span className="sr-only">(required)</span>}
          </Label>
        )}
        
        <div className="relative">
          <Input
            ref={ref}
            id={inputId}
            type={inputType}
            className={cn(
              'transition-all duration-200',
              (Icon && !label) || leftIcon ? 'pl-10' : '',
              showPasswordToggle || rightIcon ? 'pr-10' : '',
              error && 'border-destructive focus-visible:ring-destructive',
              'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
              className
            )}
            aria-describedby={cn(errorId, helpId).trim() || undefined}
            aria-invalid={!!error}
            required={required}
            {...props}
          />
          
          {((Icon && !label) || leftIcon) && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {leftIcon || (Icon && <Icon className="h-4 w-4" aria-hidden="true" />)}
            </div>
          )}
          
          {(showPasswordToggle || rightIcon) && (
            <div className="absolute right-1 top-1/2 -translate-y-1/2">
              {showPasswordToggle ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={props.disabled}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  )}
                </Button>
              ) : (
                rightIcon
              )}
            </div>
          )}
        </div>
        
        {displayHelpText && !error && (
          <p id={helpId} className="text-xs text-muted-foreground leading-relaxed">
            {displayHelpText}
          </p>
        )}
        
        {error && (
          <p id={errorId} className="flex items-center gap-1.5 text-xs text-destructive" role="alert" aria-live="polite">
            <AlertCircle className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

EnhancedInput.displayName = "EnhancedInput";
