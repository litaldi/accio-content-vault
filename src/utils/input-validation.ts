
/**
 * Input Validation Utilities
 * Provides validation functions for forms and user input
 */

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmedEmail = email.trim();

  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }

  return { isValid: true, message: 'Valid email' };
};

export const validatePassword = (password: string): { isValid: boolean; message: string; strength: number } => {
  if (!password) {
    return { isValid: false, message: 'Password is required', strength: 0 };
  }

  let strength = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  Object.values(checks).forEach(check => {
    if (check) strength += 20;
  });

  if (!checks.length) {
    return { isValid: false, message: 'Password must be at least 8 characters long', strength };
  }

  if (strength < 60) {
    return { 
      isValid: false, 
      message: 'Password should include uppercase, lowercase, numbers, and special characters', 
      strength 
    };
  }

  return { isValid: true, message: 'Strong password', strength };
};

export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || value.trim().length === 0) {
    return { isValid: false, message: `${fieldName} is required` };
  }
  return { isValid: true, message: 'Valid' };
};

export const validateMinLength = (value: string, minLength: number, fieldName: string): ValidationResult => {
  if (value.length < minLength) {
    return { isValid: false, message: `${fieldName} must be at least ${minLength} characters long` };
  }
  return { isValid: true, message: 'Valid' };
};

export const validateMaxLength = (value: string, maxLength: number, fieldName: string): ValidationResult => {
  if (value.length > maxLength) {
    return { isValid: false, message: `${fieldName} must be no more than ${maxLength} characters long` };
  }
  return { isValid: true, message: 'Valid' };
};
