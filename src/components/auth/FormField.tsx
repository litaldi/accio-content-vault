
import React, { forwardRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  showPasswordToggle?: boolean;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ 
    label, 
    error, 
    helpText, 
    required, 
    showPasswordToggle = false,
    className, 
    id, 
    type,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `field-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helpId = helpText ? `${inputId}-help` : undefined;
    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="space-y-2">
        <Label 
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            required && "after:content-['*'] after:ml-0.5 after:text-destructive"
          )}
        >
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
          
          {showPasswordToggle && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 hover:bg-transparent p-0"
              onClick={() => setShowPassword(!showPassword)}
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

FormField.displayName = "FormField";
