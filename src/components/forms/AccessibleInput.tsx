
import React, { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import { copy } from '@/utils/copy';

interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  containerClassName?: string;
}

export const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ label, error, helpText, required, containerClassName, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helpId = helpText ? `${inputId}-help` : undefined;

    return (
      <div className={cn("space-y-2", containerClassName)}>
        <Label 
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            required && "after:content-['*'] after:ml-0.5 after:text-destructive"
          )}
        >
          {label}
          {required && <span className="sr-only">{copy.common.required}</span>}
        </Label>
        
        <Input
          ref={ref}
          id={inputId}
          className={cn(
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
        
        {helpText && (
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

AccessibleInput.displayName = "AccessibleInput";
