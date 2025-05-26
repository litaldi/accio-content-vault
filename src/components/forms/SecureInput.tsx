
import React, { useState, useCallback } from 'react';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { sanitizeTextInput } from '@/utils/input-validation';
import { Shield } from 'lucide-react';

interface SecureInputProps {
  type?: 'text' | 'email' | 'url' | 'password';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  maxLength?: number;
  sanitize?: boolean;
  validateUrl?: boolean;
  className?: string;
}

const validateSecureUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' || urlObj.protocol === 'http:';
  } catch {
    return false;
  }
};

/**
 * Secure input component with built-in validation and sanitization
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
  validateUrl = false,
  className
}) => {
  const [error, setError] = useState<string>('');
  const [isTouched, setIsTouched] = useState(false);

  const validateInput = useCallback((inputValue: string): string => {
    if (required && !inputValue.trim()) {
      return 'This field is required';
    }

    if (type === 'email' && inputValue) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(inputValue)) {
        return 'Please enter a valid email address';
      }
    }

    if (validateUrl && inputValue) {
      if (!validateSecureUrl(inputValue)) {
        return 'Please enter a valid and secure URL';
      }
    }

    if (inputValue.length > maxLength) {
      return `Input must be ${maxLength} characters or less`;
    }

    return '';
  }, [type, required, validateUrl, maxLength]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    if (sanitize) {
      newValue = sanitizeTextInput(newValue, maxLength);
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

  return (
    <EnhancedInput
      type={type}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      label={label}
      error={!!(isTouched && error)}
      success={isTouched && !error && value.length > 0}
      rightIcon={sanitize ? <Shield className="h-4 w-4 text-muted-foreground" /> : undefined}
      className={className}
      maxLength={maxLength}
      required={required}
      aria-describedby={error ? `${label}-error` : undefined}
    />
  );
};

export default SecureInput;
