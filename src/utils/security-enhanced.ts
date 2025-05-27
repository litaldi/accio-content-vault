
import { RateLimiter } from './security';

/**
 * Enhanced security utilities with comprehensive input validation,
 * sanitization, and protection against common attacks
 */

// XSS Protection
export const sanitizeHtml = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

// SQL Injection Protection
export const sanitizeForDatabase = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/'/g, "''")  // Escape single quotes
    .replace(/;/g, '')     // Remove semicolons
    .replace(/--/g, '')    // Remove SQL comments
    .replace(/\/\*/g, '')  // Remove multi-line comment start
    .replace(/\*\//g, '')  // Remove multi-line comment end
    .trim();
};

// Enhanced Email Validation
export const validateEmailSecurity = (email: string): { isValid: boolean; message: string } => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'Email is required' };
  }
  
  // Basic format check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  // Length validation
  if (email.length > 254) {
    return { isValid: false, message: 'Email address is too long' };
  }
  
  if (email.length < 5) {
    return { isValid: false, message: 'Email address is too short' };
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /\.{2,}/,           // Multiple consecutive dots
    /@.*@/,             // Multiple @ symbols
    /\s/,               // Whitespace
    /<|>/,              // Angle brackets
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(email)) {
      return { isValid: false, message: 'Email contains invalid characters' };
    }
  }
  
  return { isValid: true, message: 'Valid email' };
};

// Password Security Validation
export const validatePasswordSecurity = (password: string): { 
  isValid: boolean; 
  message: string; 
  strength: number 
} => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required', strength: 0 };
  }

  let strength = 0;
  const requirements = [];

  // Length check
  if (password.length >= 8) {
    strength += 20;
  } else {
    requirements.push('at least 8 characters');
  }
  
  if (password.length > 128) {
    return { isValid: false, message: 'Password is too long (max 128 characters)', strength: 0 };
  }

  // Character type checks
  if (/[a-z]/.test(password)) {
    strength += 20;
  } else {
    requirements.push('a lowercase letter');
  }

  if (/[A-Z]/.test(password)) {
    strength += 20;
  } else {
    requirements.push('an uppercase letter');
  }

  if (/\d/.test(password)) {
    strength += 20;
  } else {
    requirements.push('a number');
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    strength += 20;
  } else {
    requirements.push('a special character');
  }

  // Check for common weak passwords
  const weakPasswords = [
    'password', '123456789', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm',
    'admin', 'login', 'welcome', 'monkey', 'dragon', 'master',
    'shadow', 'letmein', 'football', 'baseball', 'superman'
  ];
  
  if (weakPasswords.some(weak => password.toLowerCase().includes(weak))) {
    strength = Math.min(strength, 40);
    requirements.push('avoid common passwords');
  }

  // Check for repeated characters
  if (/(.)\1{2,}/.test(password)) {
    strength = Math.min(strength, 60);
  }

  const isValid = strength >= 60 && requirements.length === 0;
  const message = isValid 
    ? 'Password is strong' 
    : `Password needs: ${requirements.join(', ')}`;

  return { isValid, message, strength };
};

// CSRF Token Management
export class CSRFTokenManager {
  private static tokens = new Set<string>();
  
  static generate(): string {
    const token = this.generateSecureToken(32);
    this.tokens.add(token);
    
    // Auto-cleanup old tokens after 1 hour
    setTimeout(() => {
      this.tokens.delete(token);
    }, 3600000);
    
    return token;
  }
  
  static validate(token: string): boolean {
    return this.tokens.has(token);
  }
  
  static consume(token: string): boolean {
    const isValid = this.tokens.has(token);
    if (isValid) {
      this.tokens.delete(token); // One-time use
    }
    return isValid;
  }
  
  private static generateSecureToken(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

// Enhanced Rate Limiting (standalone implementation)
export class SecurityRateLimiter {
  private attempts: Map<string, { count: number; timestamps: number[] }> = new Map();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 60000,
    private blockDuration: number = 300000 // 5 minutes
  ) {}
  
  canAttempt(identifier: string): { allowed: boolean; resetTime?: number; remaining?: number } {
    const now = Date.now();
    const record = this.attempts.get(identifier) || { count: 0, timestamps: [] };
    
    // Remove old attempts outside the window
    record.timestamps = record.timestamps.filter(time => now - time < this.windowMs);
    record.count = record.timestamps.length;
    
    if (record.count >= this.maxAttempts) {
      const oldestAttempt = Math.min(...record.timestamps);
      return {
        allowed: false,
        resetTime: oldestAttempt + this.blockDuration,
        remaining: 0
      };
    }
    
    return {
      allowed: true,
      remaining: this.maxAttempts - record.count
    };
  }
  
  recordAttempt(identifier: string): void {
    const now = Date.now();
    const record = this.attempts.get(identifier) || { count: 0, timestamps: [] };
    
    record.timestamps.push(now);
    record.count = record.timestamps.length;
    this.attempts.set(identifier, record);
  }
}

// Content Security Policy
export const getSecurityHeaders = (): Record<string, string> => {
  return {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; '),
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
};

// Input Sanitization
export const sanitizeUserInput = (input: string, options: {
  allowHtml?: boolean;
  maxLength?: number;
  stripWhitespace?: boolean;
} = {}): string => {
  if (typeof input !== 'string') return '';
  
  const { allowHtml = false, maxLength = 1000, stripWhitespace = true } = options;
  
  let sanitized = input;
  
  // HTML sanitization
  if (!allowHtml) {
    sanitized = sanitizeHtml(sanitized);
  }
  
  // Length validation
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  // Whitespace handling
  if (stripWhitespace) {
    sanitized = sanitized.trim().replace(/\s+/g, ' ');
  }
  
  return sanitized;
};

// Export enhanced rate limiters for specific use cases
export const authRateLimiter = new SecurityRateLimiter(5, 60000, 300000); // 5 attempts per minute, 5 min block
export const apiRateLimiter = new SecurityRateLimiter(100, 60000, 60000); // 100 requests per minute
export const contactRateLimiter = new SecurityRateLimiter(3, 300000, 900000); // 3 submissions per 5 min

// Security audit log
export const logSecurityEvent = (event: string, details: any = {}) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`🔒 Security Event: ${event}`, details);
  }
  
  // In production, you might want to send this to a security monitoring service
};
