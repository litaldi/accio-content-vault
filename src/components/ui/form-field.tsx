
import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface BaseFieldProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

interface InputFieldProps extends BaseFieldProps {
  type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

interface TextareaFieldProps extends BaseFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  rows?: number;
}

export const FormField = {
  Input: React.forwardRef<HTMLInputElement, InputFieldProps>(({
    label,
    description,
    error,
    required,
    className,
    id,
    type = 'text',
    placeholder,
    value,
    onChange,
    ...props
  }, ref) => {
    const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn('space-y-2', className)}>
        {label && (
          <Label htmlFor={fieldId} className="text-sm font-medium">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        
        <Input
          ref={ref}
          id={fieldId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            'transition-colors',
            error && 'border-destructive focus-visible:ring-destructive'
          )}
          aria-describedby={
            description || error ? `${fieldId}-description` : undefined
          }
          aria-invalid={!!error}
          {...props}
        />
        
        {(description || error) && (
          <div id={`${fieldId}-description`} className="text-sm">
            {error ? (
              <span className="text-destructive" role="alert">{error}</span>
            ) : (
              <span className="text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </div>
    );
  }),

  Textarea: React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(({
    label,
    description,
    error,
    required,
    className,
    id,
    placeholder,
    value,
    onChange,
    rows = 4,
    ...props
  }, ref) => {
    const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn('space-y-2', className)}>
        {label && (
          <Label htmlFor={fieldId} className="text-sm font-medium">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        
        <Textarea
          ref={ref}
          id={fieldId}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          rows={rows}
          className={cn(
            'transition-colors resize-none',
            error && 'border-destructive focus-visible:ring-destructive'
          )}
          aria-describedby={
            description || error ? `${fieldId}-description` : undefined
          }
          aria-invalid={!!error}
          {...props}
        />
        
        {(description || error) && (
          <div id={`${fieldId}-description`} className="text-sm">
            {error ? (
              <span className="text-destructive" role="alert">{error}</span>
            ) : (
              <span className="text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </div>
    );
  })
};

FormField.Input.displayName = 'FormField.Input';
FormField.Textarea.displayName = 'FormField.Textarea';

export default FormField;
