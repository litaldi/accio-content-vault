
/**
 * Enhanced Security Utilities
 * Comprehensive security functions for production use
 */

export interface SecurityValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Enhanced XSS Prevention
 */
export const sanitizeHtmlContent = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  // Create a temporary div to leverage browser's HTML parsing
  const temp = document.createElement('div');
  temp.textContent = input;
  
  // Additional sanitization for known dangerous patterns
  return temp.innerHTML
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .trim();
};

/**
 * Advanced Input Validation
 */
export const validateUserInput = (
  input: string, 
  type: 'email' | 'password' | 'name' | 'url' | 'text',
  options: { minLength?: number; maxLength?: number; required?: boolean } = {}
): SecurityValidationResult => {
  const result: SecurityValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };

  // Required check
  if (options.required && (!input || input.trim().length === 0)) {
    result.errors.push('This field is required');
    result.isValid = false;
    return result;
  }

  // Length checks
  if (options.minLength && input.length < options.minLength) {
    result.errors.push(`Must be at least ${options.minLength} characters long`);
    result.isValid = false;
  }

  if (options.maxLength && input.length > options.maxLength) {
    result.errors.push(`Must be no more than ${options.maxLength} characters long`);
    result.isValid = false;
  }

  // Type-specific validation
  switch (type) {
    case 'email':
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (input && !emailRegex.test(input)) {
        result.errors.push('Please enter a valid email address');
        result.isValid = false;
      }
      break;

    case 'password':
      if (input.length < 8) {
        result.errors.push('Password must be at least 8 characters long');
        result.isValid = false;
      }
      if (!/(?=.*[a-z])/.test(input)) {
        result.errors.push('Password must contain at least one lowercase letter');
        result.isValid = false;
      }
      if (!/(?=.*[A-Z])/.test(input)) {
        result.errors.push('Password must contain at least one uppercase letter');
        result.isValid = false;
      }
      if (!/(?=.*\d)/.test(input)) {
        result.errors.push('Password must contain at least one number');
        result.isValid = false;
      }
      // Check for common weak patterns
      if (/(.)\1{2,}/.test(input)) {
        result.warnings.push('Avoid repeating characters');
      }
      if (/123456|password|qwerty/i.test(input)) {
        result.errors.push('Password is too common');
        result.isValid = false;
      }
      break;

    case 'name':
      if (input && !/^[a-zA-Z\s\-'\.]+$/.test(input)) {
        result.errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
        result.isValid = false;
      }
      break;

    case 'url':
      if (input) {
        try {
          const url = new URL(input);
          if (!['http:', 'https:'].includes(url.protocol)) {
            result.errors.push('URL must use HTTP or HTTPS protocol');
            result.isValid = false;
          }
        } catch {
          result.errors.push('Please enter a valid URL');
          result.isValid = false;
        }
      }
      break;

    case 'text':
      // Check for potential script injection
      if (/<script|javascript:|on\w+\s*=/i.test(input)) {
        result.errors.push('Input contains potentially unsafe content');
        result.isValid = false;
      }
      break;
  }

  return result;
};

/**
 * CSRF Token Management
 */
class CSRFManager {
  private static token: string | null = null;

  static generateToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    this.token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    return this.token;
  }

  static getToken(): string | null {
    return this.token;
  }

  static validateToken(submittedToken: string): boolean {
    return this.token === submittedToken;
  }

  static clearToken(): void {
    this.token = null;
  }
}

/**
 * Rate Limiting
 */
class ClientRateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly windowMs: number;
  private readonly maxAttempts: number;

  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  canAttempt(identifier: string): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    
    // Filter out old attempts
    const recentAttempts = userAttempts.filter(time => now - time < this.windowMs);
    this.attempts.set(identifier, recentAttempts);
    
    return recentAttempts.length < this.maxAttempts;
  }

  recordAttempt(identifier: string): void {
    const userAttempts = this.attempts.get(identifier) || [];
    userAttempts.push(Date.now());
    this.attempts.set(identifier, userAttempts);
  }

  getRemainingAttempts(identifier: string): number {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    const recentAttempts = userAttempts.filter(time => now - time < this.windowMs);
    return Math.max(0, this.maxAttempts - recentAttempts.length);
  }

  getTimeUntilReset(identifier: string): number {
    const userAttempts = this.attempts.get(identifier) || [];
    if (userAttempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...userAttempts);
    const resetTime = oldestAttempt + this.windowMs;
    return Math.max(0, resetTime - Date.now());
  }
}

/**
 * Content Security Policy Helper
 */
export const generateCSPDirectives = (): string => {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'"
  ];

  return directives.join('; ');
};

/**
 * Secure File Upload Validation
 */
export const validateFileUpload = (file: File): SecurityValidationResult => {
  const result: SecurityValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };

  // File size check (10MB limit)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    result.errors.push('File size must be less than 10MB');
    result.isValid = false;
  }

  if (file.size === 0) {
    result.errors.push('File cannot be empty');
    result.isValid = false;
  }

  // Allowed file types
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
    result.errors.push('File type not allowed. Supported: PDF, TXT, MD, CSV, JPG, PNG, GIF, WebP, JSON');
    result.isValid = false;
  }

  // Filename validation
  const dangerousPatterns = /[<>:"\/\\|?*\x00-\x1F]/;
  if (dangerousPatterns.test(file.name)) {
    result.errors.push('Filename contains invalid characters');
    result.isValid = false;
  }

  if (file.name.length > 255) {
    result.errors.push('Filename is too long');
    result.isValid = false;
  }

  return result;
};

// Create instances for common use cases
export const authRateLimiter = new ClientRateLimiter(5, 60000); // 5 attempts per minute
export const contactRateLimiter = new ClientRateLimiter(3, 300000); // 3 attempts per 5 minutes
export const searchRateLimiter = new ClientRateLimiter(60, 60000); // 60 searches per minute

export { CSRFManager, ClientRateLimiter };
