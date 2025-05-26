
/**
 * Unified Security Utilities
 * Provides comprehensive security functions for input validation, sanitization, and rate limiting
 */

// Input Sanitization
export interface SanitizeOptions {
  allowHtml?: boolean;
  maxLength?: number;
  stripScripts?: boolean;
  preserveLineBreaks?: boolean;
}

export const sanitizeInput = (
  input: string, 
  options: SanitizeOptions = {}
): string => {
  const {
    allowHtml = false,
    maxLength = 1000,
    stripScripts = true,
    preserveLineBreaks = false
  } = options;

  if (!input || typeof input !== 'string') return '';

  let sanitized = input.trim();

  // Remove HTML tags unless explicitly allowed
  if (!allowHtml) {
    sanitized = sanitized.replace(/<[^>]*>/g, '');
  }

  // Always strip script tags for security
  if (stripScripts) {
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/javascript:/gi, '');
    sanitized = sanitized.replace(/on\w+\s*=/gi, '');
  }

  // Handle line breaks
  if (!preserveLineBreaks) {
    sanitized = sanitized.replace(/\n/g, ' ').replace(/\r/g, ' ');
  }

  // Apply length limit
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
};

// Email Validation
export interface EmailValidationResult {
  isValid: boolean;
  message: string;
}

export const validateEmailEnhanced = (email: string): EmailValidationResult => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmedEmail = email.trim().toLowerCase();

  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }

  if (trimmedEmail.length > 254) {
    return { isValid: false, message: 'Email address is too long' };
  }

  return { isValid: true, message: 'Valid email address' };
};

// URL Validation
export const validateSecureUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    const allowedProtocols = ['http:', 'https:'];
    return allowedProtocols.includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// Rate Limiting
export interface RateLimitResult {
  allowed: boolean;
  resetTime?: number;
}

export class UnifiedRateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();

  constructor(
    private maxAttempts: number,
    private windowMs: number
  ) {}

  canAttempt(identifier: string): RateLimitResult {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record || now > record.resetTime) {
      this.attempts.set(identifier, { count: 1, resetTime: now + this.windowMs });
      return { allowed: true };
    }

    if (record.count >= this.maxAttempts) {
      return { allowed: false, resetTime: record.resetTime };
    }

    record.count++;
    return { allowed: true };
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

// Pre-configured rate limiters
export const authRateLimiter = new UnifiedRateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes
export const contactRateLimiter = new UnifiedRateLimiter(3, 60 * 1000); // 3 attempts per minute

// CSRF Protection
export class CSRFManager {
  static generate(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  static validate(token: string): boolean {
    return typeof token === 'string' && token.length > 10;
  }
}

// Password Validation
export interface PasswordValidationResult {
  isValid: boolean;
  message: string;
  strength: number;
}

export const validatePassword = (password: string): PasswordValidationResult => {
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

  // Calculate strength
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
