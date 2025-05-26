
import React, { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface AccessibleFormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  containerClassName?: string;
}

export const AccessibleFormField = forwardRef<HTMLInputElement, AccessibleFormFieldProps>(
  ({ 
    label, 
    error, 
    helpText, 
    required, 
    icon: Icon,
    showPasswordToggle = false,
    showPassword = false,
    onTogglePassword,
    containerClassName, 
    className, 
    id, 
    type,
    ...props 
  }, ref) => {
    const inputId = id || `field-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helpId = helpText ? `${inputId}-help` : undefined;
    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className={cn("space-y-2", containerClassName)}>
        <Label 
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2",
            required && "after:content-['*'] after:ml-0.5 after:text-destructive"
          )}
        >
          {Icon && <Icon className="h-4 w-4" />}
          {label}
          {required && <span className="sr-only">(required)</span>}
        </Label>
        
        <div className="relative">
          <Input
            ref={ref}
            id={inputId}
            type={inputType}
            className={cn(
              "transition-all",
              Icon && "pl-10",
              showPasswordToggle && "pr-10",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            aria-describedby={cn(
              errorId && errorId,
              helpId && helpId
            ).trim() || undefined}
            aria-invalid={!!error}
            required={required}
            {...props}
          />
          
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <Icon className="h-4 w-4" />
            </div>
          )}
          
          {showPasswordToggle && onTogglePassword && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 hover:bg-transparent"
              onClick={onTogglePassword}
              disabled={props.disabled}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          )}
        </div>
        
        {helpText && !error && (
          <p id={helpId} className="text-xs text-muted-foreground">
            {helpText}
          </p>
        )}
        
        {error && (
          <p id={errorId} className="flex items-center gap-1 text-xs text-destructive" role="alert" aria-live="polite">
            <AlertCircle className="h-3 w-3" aria-hidden="true" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

AccessibleFormField.displayName = "AccessibleFormField";
