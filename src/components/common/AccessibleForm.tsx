
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'url' | 'password';
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  helpText?: string;
  multiline?: boolean;
  className?: string;
}

export const AccessibleFormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  required = false,
  value,
  onChange,
  error,
  helpText,
  multiline = false,
  className
}) => {
  const inputId = `field-${id}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const helpId = helpText ? `${inputId}-help` : undefined;

  const InputComponent = multiline ? Textarea : Input;

  return (
    <div className={cn("space-y-2", className)}>
      <Label 
        htmlFor={inputId}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          required && "after:content-['*'] after:ml-0.5 after:text-red-500"
        )}
      >
        {label}
      </Label>
      
      <InputComponent
        id={inputId}
        type={multiline ? undefined : type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "w-full",
          error && "border-red-500 focus-visible:ring-red-500"
        )}
        aria-describedby={cn(
          helpId && helpId,
          errorId && errorId
        )}
        aria-invalid={error ? 'true' : 'false'}
      />
      
      {helpText && (
        <p id={helpId} className="text-xs text-muted-foreground">
          {helpText}
        </p>
      )}
      
      {error && (
        <p 
          id={errorId} 
          className="text-xs text-red-600 dark:text-red-400"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};

interface AccessibleFormProps {
  title: string;
  description?: string;
  onSubmit: (data: Record<string, string>) => void;
  children: React.ReactNode;
  submitLabel?: string;
  isSubmitting?: boolean;
  className?: string;
}

export const AccessibleForm: React.FC<AccessibleFormProps> = ({
  title,
  description,
  onSubmit,
  children,
  submitLabel = 'Submit',
  isSubmitting = false,
  className
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    
    onSubmit(data);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {children}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
            aria-describedby={isSubmitting ? 'submit-status' : undefined}
          >
            {isSubmitting ? 'Submitting...' : submitLabel}
          </Button>
          
          {isSubmitting && (
            <div 
              id="submit-status" 
              className="sr-only"
              aria-live="polite"
              aria-atomic="true"
            >
              Form is being submitted, please wait.
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};
