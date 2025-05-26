
import DOMPurify from 'dompurify';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  errors?: string[];
}

export interface PasswordValidationResult {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  errors: string[];
}

export interface RateLimitResult {
  allowed: boolean;
  resetTime?: number;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};

export const validatePassword = (password: string): PasswordValidationResult => {
  const errors: string[] = [];
  
  if (!password) {
    return { isValid: false, strength: 'weak', errors: ['Password is required'] };
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  const score = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password)
  ].filter(Boolean).length;
  
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (score >= 4) strength = 'strong';
  else if (score >= 3) strength = 'medium';
  
  return {
    isValid: errors.length === 0,
    strength,
    errors
  };
};

export const sanitizeTextInput = (input: string, maxLength?: number): string => {
  const sanitized = DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
  return maxLength ? sanitized.slice(0, maxLength) : sanitized;
};

export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Simple rate limiting implementation
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const createRateLimit = (maxAttempts: number, windowMs: number) => {
  return (identifier: string): RateLimitResult => {
    const now = Date.now();
    const key = identifier;
    const entry = rateLimitStore.get(key);
    
    if (!entry || now > entry.resetTime) {
      // First attempt or window expired
      rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
      return { allowed: true };
    }
    
    if (entry.count >= maxAttempts) {
      return { allowed: false, resetTime: entry.resetTime };
    }
    
    // Increment count
    entry.count++;
    return { allowed: true };
  };
};
