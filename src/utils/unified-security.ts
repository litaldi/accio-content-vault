
/**
 * Unified security utilities - consolidated from multiple files
 * Provides input validation, sanitization, rate limiting, and CSRF protection
 */

import DOMPurify from 'dompurify';
import { z } from 'zod';

// ============================================================================
// INPUT VALIDATION & SANITIZATION
// ============================================================================

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

// Enhanced email validation with typo suggestions
export const validateEmailEnhanced = (email: string): {
  isValid: boolean;
  error?: string;
  suggestion?: string;
} => {
  if (!email || email.length === 0) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  // Check for common typos
  const domain = email.split('@')[1]?.toLowerCase();
  const typoSuggestions: Record<string, string> = {
    'gmai.com': 'gmail.com',
    'gmial.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
    'outlok.com': 'outlook.com'
  };
  
  if (domain && typoSuggestions[domain]) {
    return {
      isValid: false,
      error: 'Did you mean this email address?',
      suggestion: email.replace(domain, typoSuggestions[domain])
    };
  }

  return { isValid: true };
};

// Comprehensive password validation
export const validatePasswordComplexity = (password: string): PasswordValidationResult => {
  const errors: string[] = [];
  
  if (!password) {
    return { isValid: false, strength: 'weak', errors: ['Password is required'] };
  }
  
  const requirements = [
    { test: /.{8,}/, text: 'At least 8 characters long' },
    { test: /[a-z]/, text: 'Contains lowercase letter' },
    { test: /[A-Z]/, text: 'Contains uppercase letter' },
    { test: /\d/, text: 'Contains a number' },
    { test: /[!@#$%^&*(),.?":{}|<>]/, text: 'Contains special character' },
    { test: /^(?!.*(.)\1{2,})/, text: 'No more than 2 repeated characters' }
  ];

  requirements.forEach(req => {
    if (!req.test.test(password)) {
      errors.push(req.text);
    }
  });

  const score = requirements.filter(req => req.test.test(password)).length;
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (score >= 5) strength = 'strong';
  else if (score >= 3) strength = 'medium';

  return {
    isValid: errors.length === 0,
    strength,
    errors
  };
};

// Input sanitization with XSS prevention
export const sanitizeInput = (input: string, options: {
  allowHtml?: boolean;
  maxLength?: number;
  stripScripts?: boolean;
  preserveLineBreaks?: boolean;
} = {}): string => {
  const {
    allowHtml = false,
    maxLength = 1000,
    stripScripts = true,
    preserveLineBreaks = false
  } = options;

  if (typeof input !== 'string') return '';

  let sanitized = input.trim().slice(0, maxLength);

  if (!allowHtml) {
    sanitized = DOMPurify.sanitize(sanitized, { ALLOWED_TAGS: [] });
  }

  if (stripScripts) {
    sanitized = sanitized
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }

  if (!preserveLineBreaks) {
    sanitized = sanitized.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ');
  }

  return sanitized;
};

// ============================================================================
// RATE LIMITING
// ============================================================================

export class UnifiedRateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number; backoffUntil?: number }> = new Map();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 15 * 60 * 1000,
    private enableBackoff: boolean = true
  ) {}
  
  canAttempt(identifier: string): { allowed: boolean; resetTime?: number; backoffTime?: number } {
    const now = Date.now();
    const record = this.attempts.get(identifier);
    
    if (!record) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return { allowed: true };
    }
    
    if (record.backoffUntil && now < record.backoffUntil) {
      return { 
        allowed: false, 
        backoffTime: record.backoffUntil - now
      };
    }
    
    if (now - record.lastAttempt > this.windowMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return { allowed: true };
    }
    
    if (record.count >= this.maxAttempts) {
      if (this.enableBackoff) {
        const backoffMinutes = Math.pow(2, record.count - this.maxAttempts);
        const backoffUntil = now + (backoffMinutes * 60 * 1000);
        
        this.attempts.set(identifier, { ...record, backoffUntil });
        
        return { 
          allowed: false, 
          resetTime: record.lastAttempt + this.windowMs,
          backoffTime: backoffUntil - now
        };
      }
      
      return { 
        allowed: false, 
        resetTime: record.lastAttempt + this.windowMs 
      };
    }
    
    this.attempts.set(identifier, { 
      count: record.count + 1, 
      lastAttempt: now 
    });
    
    return { allowed: true };
  }
  
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

// Pre-configured rate limiters
export const authRateLimiter = new UnifiedRateLimiter(5, 300000, true);
export const apiRateLimiter = new UnifiedRateLimiter(10, 60000, false);
export const contactRateLimiter = new UnifiedRateLimiter(3, 300000, true);

// ============================================================================
// CSRF PROTECTION
// ============================================================================

export const CSRFManager = {
  tokenKey: 'csrf_token',
  
  generate(): string {
    const token = this.generateSecureToken(32);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(this.tokenKey, token);
    }
    return token;
  },
  
  get(): string | null {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(this.tokenKey);
    }
    return null;
  },
  
  validate(token: string): boolean {
    const stored = this.get();
    return stored !== null && stored === token;
  },
  
  clear(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(this.tokenKey);
    }
  },

  generateSecureToken(length: number = 32): string {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const array = new Uint8Array(length);
      window.crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
};

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

export const secureEmailSchema = z.string()
  .trim()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(254, "Email address is too long");

export const secureNameSchema = z.string()
  .trim()
  .min(1, "Name is required")
  .max(100, "Name is too long")
  .refine((name) => {
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    return nameRegex.test(name);
  }, "Name can only contain letters, spaces, hyphens, and apostrophes");

// ============================================================================
// URL & FILE VALIDATION
// ============================================================================

export const validateSecureUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false;
    }
    
    if (process.env.NODE_ENV === 'production') {
      const hostname = urlObj.hostname;
      if (hostname === 'localhost' || 
          hostname.startsWith('127.') || 
          hostname.startsWith('192.168.') ||
          hostname.startsWith('10.') ||
          hostname.match(/^172\.(1[6-9]|2\d|3[01])\./)) {
        return false;
      }
    }
    
    return true;
  } catch {
    return false;
  }
};

export const validateFileUpload = (file: File): { isValid: boolean; message: string } => {
  if (!file) {
    return { isValid: false, message: 'No file selected' };
  }

  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return { isValid: false, message: 'File size must be less than 10MB' };
  }
  
  if (file.size === 0) {
    return { isValid: false, message: 'File cannot be empty' };
  }
  
  const allowedTypes = [
    'application/pdf',
    'text/plain',
    'text/markdown',
    'text/csv',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/json'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, message: 'File type not allowed. Supported: PDF, TXT, MD, CSV, JPG, PNG, GIF, WebP, JSON' };
  }

  return { isValid: true, message: 'File is valid' };
};

