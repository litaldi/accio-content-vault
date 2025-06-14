
// Core Security Functions - Essential validation and protection utilities
import DOMPurify from 'dompurify';

// Rate limiting implementation
export class UnifiedRateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();

  constructor(private maxAttempts: number, private windowMs: number) {}

  canAttempt(identifier: string): { allowed: boolean; resetTime?: number } {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier);

    if (!userAttempts || now > userAttempts.resetTime) {
      this.attempts.set(identifier, { count: 1, resetTime: now + this.windowMs });
      return { allowed: true };
    }

    if (userAttempts.count >= this.maxAttempts) {
      return { allowed: false, resetTime: userAttempts.resetTime };
    }

    userAttempts.count++;
    return { allowed: true };
  }
}

// CSRF Protection
export class CSRFManager {
  private static tokens: Set<string> = new Set();

  static generate(): string {
    const token = crypto.randomUUID();
    this.tokens.add(token);
    // Clean up old tokens after 1 hour
    setTimeout(() => this.tokens.delete(token), 3600000);
    return token;
  }

  static validate(token: string): boolean {
    return this.tokens.has(token);
  }

  static getToken(): string {
    return this.generate();
  }
}

// Input sanitization with options
interface SanitizeOptions {
  maxLength?: number;
  allowHtml?: boolean;
  stripScripts?: boolean;
}

export const sanitizeInput = (input: string, options: SanitizeOptions = {}): string => {
  const {
    maxLength = 1000,
    allowHtml = false,
    stripScripts = true
  } = options;

  let sanitized = input.trim();

  // Length validation
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  // HTML sanitization
  if (!allowHtml) {
    sanitized = sanitized
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '');
  } else if (stripScripts) {
    sanitized = DOMPurify.sanitize(sanitized, {
      FORBID_TAGS: ['script', 'object', 'embed', 'iframe'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick']
    });
  }

  return sanitized;
};

// Email validation
export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || email.trim().length === 0) {
    return { isValid: false, message: 'Email is required' };
  }
  
  if (email.length > 254) {
    return { isValid: false, message: 'Email is too long' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Invalid email format' };
  }
  
  return { isValid: true, message: 'Valid email' };
};

// Password validation
export const validatePassword = (password: string): ValidationResult => {
  if (!password || password.length === 0) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (password.length > 128) {
    return { isValid: false, message: 'Password is too long' };
  }
  
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  
  if (!hasLower || !hasUpper || !hasNumber || !hasSpecial) {
    return { 
      isValid: false, 
      message: 'Password must contain uppercase, lowercase, number, and special character' 
    };
  }
  
  return { isValid: true, message: 'Password is valid' };
};

// URL validation
export const validateUrl = (url: string): ValidationResult => {
  if (!url || url.trim().length === 0) {
    return { isValid: false, message: 'URL is required' };
  }
  
  try {
    const urlObj = new URL(url);
    
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, message: 'URL must use HTTP or HTTPS protocol' };
    }
    
    if (url.length > 2048) {
      return { isValid: false, message: 'URL is too long' };
    }
    
    return { isValid: true, message: 'Valid URL' };
  } catch (error) {
    return { isValid: false, message: 'Invalid URL format' };
  }
};
