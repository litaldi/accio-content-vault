
import React, { useState, useCallback } from 'react';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { sanitizeInput, validateEmail, validateUrl } from '@/utils/security';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SecureInputProps {
  type?: 'text' | 'email' | 'url' | 'password';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  maxLength?: number;
  sanitize?: boolean;
  className?: string;
  description?: string;
  disabled?: boolean;
}

/**
 * Secure input component with built-in validation and sanitization
 * Follows WCAG 2.1 accessibility guidelines
 */
export const SecureInput: React.FC<SecureInputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  required = false,
  maxLength = 1000,
  sanitize = true,
  className,
  description,
  disabled = false
}) => {
  const [error, setError] = useState<string>('');
  const [isTouched, setIsTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateInput = useCallback((inputValue: string): string => {
    if (required && !inputValue.trim()) {
      return 'This field is required';
    }

    if (type === 'email' && inputValue) {
      const emailValidation = validateEmail(inputValue);
      if (!emailValidation.isValid) {
        return emailValidation.message;
      }
    }

    if (type === 'url' && inputValue) {
      const urlValidation = validateUrl(inputValue);
      if (!urlValidation.isValid) {
        return urlValidation.message;
      }
    }

    if (inputValue.length > maxLength) {
      return `Input must be ${maxLength} characters or less`;
    }

    return '';
  }, [type, required, maxLength]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    if (sanitize) {
      newValue = sanitizeInput(newValue, { maxLength });
    }

    const validationError = validateInput(newValue);
    setError(validationError);
    
    onChange(newValue);
  }, [sanitize, maxLength, validateInput, onChange]);

  const handleBlur = useCallback(() => {
    setIsTouched(true);
    const validationError = validateInput(value);
    setError(validationError);
  }, [value, validateInput]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const rightIcon = () => {
    if (type === 'password') {
      return (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={togglePasswordVisibility}
          className="h-auto p-1 hover:bg-transparent"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={0}
          disabled={disabled}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      );
    }
    
    if (sanitize) {
      return (
        <Shield 
          className="h-4 w-4 text-muted-foreground" 
          aria-label="Input is sanitized for security"
        />
      );
    }
    
    return undefined;
  };

  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={`secure-input-${label}`} 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && <span className="text-destructive ml-1" aria-label="Required field">*</span>}
        </label>
      )}
      <EnhancedInput
        id={`secure-input-${label}`}
        type={inputType}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        error={isTouched && error ? error : undefined}
        helpText={!error && description ? description : undefined}
        rightIcon={rightIcon()}
        className={className}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        aria-describedby={error ? `${label}-error` : undefined}
        aria-invalid={!!(isTouched && error)}
        autoComplete={type === 'password' ? 'current-password' : type === 'email' ? 'email' : undefined}
      />
    </div>
  );
};

export default SecureInput;
