
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  required?: boolean;
  description?: string;
  className?: string;
  id?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  children,
  label,
  error,
  required,
  description,
  className,
  id
}) => {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${fieldId}-error`;
  const descriptionId = `${fieldId}-description`;

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label 
          htmlFor={fieldId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && (
            <span className="text-destructive ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
      )}
      
      <div className="relative">
        {React.cloneElement(children as React.ReactElement, {
          id: fieldId,
          'aria-describedby': cn(
            error && errorId,
            description && descriptionId
          ).trim() || undefined,
          'aria-invalid': !!error,
          'aria-required': required,
          className: cn(
            (children as React.ReactElement).props.className,
            error && "border-destructive focus-visible:ring-destructive"
          )
        })}
        
        {error && (
          <AlertCircle 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-destructive"
            aria-hidden="true"
          />
        )}
      </div>
      
      {description && (
        <p 
          id={descriptionId}
          className="text-sm text-muted-foreground"
        >
          {description}
        </p>
      )}
      
      {error && (
        <p 
          id={errorId}
          className="text-sm text-destructive flex items-center gap-1"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="h-3 w-3" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
