
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { FormFieldConfig } from './types';
import { validateEmail } from '@/utils/security';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  field: FormFieldConfig;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  error,
  onChange,
  disabled
}) => {
  const getValidationState = () => {
    if (!value.trim()) return null;
    
    if (field.type === 'email') {
      const result = validateEmail(value);
      return result.isValid ? 'valid' : 'invalid';
    }
    
    if (field.validation) {
      const result = field.validation(value);
      return result.isValid ? 'valid' : 'invalid';
    }
    
    return 'valid';
  };

  const validationState = getValidationState();

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={field.name}>
          {field.label}
          {field.required && <span className="text-destructive">*</span>}
        </Label>
        {validationState === 'valid' && (
          <Badge variant="outline" className="h-5 px-1.5 text-green-600 border-green-200">
            <CheckCircle className="h-3 w-3" />
          </Badge>
        )}
      </div>

      {field.type === 'textarea' ? (
        <Textarea
          id={field.name}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            error && "border-destructive",
            validationState === 'valid' && "border-green-300"
          )}
          disabled={disabled}
          rows={3}
        />
      ) : (
        <Input
          id={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            error && "border-destructive",
            validationState === 'valid' && "border-green-300"
          )}
          disabled={disabled}
        />
      )}

      {field.description && (
        <p className="text-xs text-muted-foreground">{field.description}</p>
      )}

      {error && (
        <p className="text-sm text-destructive flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
};
