
import DOMPurify from 'dompurify';
import { ValidationResult, SecurityConfig, RateLimitResult } from './types';

/**
 * Core Security Utilities
 * Consolidated and enhanced security functions for production use
 */

// Input Sanitization
export const sanitizeInput = (
  input: string, 
  options: { 
    maxLength?: number; 
    allowHtml?: boolean; 
    stripWhitespace?: boolean 
  } = {}
): string => {
  if (!input || typeof input !== 'string') return '';
  
  const { maxLength = 1000, allowHtml = false, stripWhitespace = true } = options;
  
  let sanitized = input;
  
  // Trim whitespace if requested
  if (stripWhitespace) {
    sanitized = sanitized.trim();
  }
  
  // Remove HTML if not allowed
  if (!allowHtml) {
    sanitized = DOMPurify.sanitize(sanitized, { ALLOWED_TAGS: [] });
  } else {
    sanitized = DOMPurify.sanitize(sanitized);
  }
  
  // Enforce length limit
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  return sanitized;
};

// Email Validation
export const validateEmail = (email: string): ValidationResult => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email.trim());
  
  return {
    isValid,
    message: isValid ? 'Valid email' : 'Please enter a valid email address',
    sanitizedValue: sanitizeInput(email)
  };
};

// Password Validation
export const validatePassword = (
  password: string,
  options: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSymbols?: boolean;
  } = {}
): ValidationResult => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required' };
  }
  
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSymbols = false
  } = options;
  
  const errors: string[] = [];
  let strength = 0;
  
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  } else {
    strength += 1;
  }
  
  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  } else if (requireUppercase) {
    strength += 1;
  }
  
  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  } else if (requireLowercase) {
    strength += 1;
  }
  
  if (requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  } else if (requireNumbers) {
    strength += 1;
  }
  
  if (requireSymbols && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one symbol');
  } else if (requireSymbols) {
    strength += 1;
  }
  
  return {
    isValid: errors.length === 0,
    message: errors.length === 0 ? 'Strong password' : errors[0],
    errors,
    strength: Math.min(strength, 5)
  };
};

// URL Validation
export const validateUrl = (url: string): ValidationResult => {
  if (!url || typeof url !== 'string') {
    return { isValid: false, message: 'URL is required' };
  }
  
  try {
    const urlObj = new URL(url);
    const isValid = ['http:', 'https:'].includes(urlObj.protocol);
    
    return {
      isValid,
      message: isValid ? 'Valid URL' : 'Please enter a valid HTTP or HTTPS URL',
      sanitizedValue: sanitizeInput(url)
    };
  } catch {
    return {
      isValid: false,
      message: 'Please enter a valid URL',
      sanitizedValue: sanitizeInput(url)
    };
  }
};

// Secure URL Validation (HTTPS only)
export const isValidSecureUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

// HTML Escaping
export const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// Rate Limiting Class
export class UnifiedRateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  private config: SecurityConfig;

  constructor(config: SecurityConfig) {
    this.config = config;
  }

  check(identifier: string): RateLimitResult {
    const now = Date.now();
    const entry = this.attempts.get(identifier);

    if (!entry || now > entry.resetTime) {
      this.attempts.set(identifier, {
        count: 1,
        resetTime: now + this.config.windowMs
      });
      return { allowed: true, remaining: this.config.maxAttempts - 1 };
    }

    if (entry.count >= this.config.maxAttempts) {
      return { 
        allowed: false, 
        remaining: 0, 
        resetTime: entry.resetTime 
      };
    }

    entry.count++;
    return { 
      allowed: true, 
      remaining: this.config.maxAttempts - entry.count 
    };
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

// CSRF Manager
export class CSRFManager {
  private static tokens: Set<string> = new Set();

  static generate(): string {
    const token = crypto.randomUUID();
    this.tokens.add(token);
    return token;
  }

  static validate(token: string): boolean {
    return this.tokens.has(token);
  }

  static consume(token: string): boolean {
    if (this.tokens.has(token)) {
      this.tokens.delete(token);
      return true;
    }
    return false;
  }
}
