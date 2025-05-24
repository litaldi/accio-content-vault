
import React, { useEffect, useState } from 'react';
import { generateCSRFToken, sanitizeTextInput } from '@/utils/input-validation';

interface SecureFormProps {
  children: React.ReactNode;
  onSubmit: (data: FormData, csrfToken: string) => void;
  className?: string;
  validateInputs?: boolean;
}

/**
 * Secure form wrapper that provides CSRF protection and input sanitization
 */
export const SecureForm: React.FC<SecureFormProps> = ({
  children,
  onSubmit,
  className = '',
  validateInputs = true
}) => {
  const [csrfToken, setCsrfToken] = useState<string>('');

  useEffect(() => {
    // Generate CSRF token on mount
    setCsrfToken(generateCSRFToken());
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    
    if (validateInputs) {
      // Sanitize text inputs
      const sanitizedData = new FormData();
      
      for (const [key, value] of formData.entries()) {
        if (typeof value === 'string') {
          sanitizedData.append(key, sanitizeTextInput(value));
        } else {
          sanitizedData.append(key, value);
        }
      }
      
      onSubmit(sanitizedData, csrfToken);
    } else {
      onSubmit(formData, csrfToken);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* Hidden CSRF token field */}
      <input type="hidden" name="csrf_token" value={csrfToken} />
      {children}
    </form>
  );
};

export default SecureForm;
