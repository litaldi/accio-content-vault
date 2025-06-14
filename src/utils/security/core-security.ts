
/**
 * Core Security Functions
 * Input validation, sanitization, and basic security utilities
 */

import type { ValidationResult, RateLimitResult, SecurityConfig } from './types';

/**
 * Sanitize user input to prevent XSS and injection attacks
 */
export const sanitizeInput = (input: string, options: {
  maxLength?: number;
  allowHtml?: boolean;
  stripWhitespace?: boolean;
} = {}): string => {
  if (typeof input !== 'string') return '';
  
  const { maxLength = 1000, allowHtml = false, stripWhitespace = true } = options;
  
  let sanitized = input;
  
  // Strip whitespace if requested
  if (stripWhitespace) {
    sanitized = sanitized.trim().replace(/\s+/g, ' ');
  }
  
  // Remove HTML if not allowed
  if (!allowHtml) {
    sanitized = sanitized
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/data:/gi, '')
      .replace(/<[^>]*>/g, '');
  }
  
  // Truncate to max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  return sanitized;
};

/**
 * Enhanced email validation with security checks
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'Email is required' };
  }
  
  const sanitizedEmail = sanitizeInput(email.toLowerCase());
  
  // Basic format validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(sanitizedEmail)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  // Length validation
  if (sanitizedEmail.length > 254 || sanitizedEmail.length < 5) {
    return { isValid: false, message: 'Email address length is invalid' };
  }
  
  // Security checks
  const suspiciousPatterns = [/\.{2,}/, /@.*@/, /\s/, /<|>/, /javascript:/i];
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(sanitizedEmail)) {
      return { isValid: false, message: 'Email contains invalid characters' };
    }
  }
  
  return { isValid: true, message: 'Valid email', sanitizedValue: sanitizedEmail };
};

/**
 * Enhanced password validation with strength scoring
 */
export const validatePassword = (password: string): ValidationResult & { strength: number } => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required', strength: 0 };
  }

  let strength = 0;
  const errors: string[] = [];

  // Length check
  if (password.length >= 8) {
    strength += 25;
  } else {
    errors.push('at least 8 characters');
  }
  
  if (password.length > 128) {
    return { isValid: false, message: 'Password too long (max 128 characters)', strength: 0 };
  }

  // Character type checks
  if (/[a-z]/.test(password)) {
    strength += 20;
  } else {
    errors.push('a lowercase letter');
  }

  if (/[A-Z]/.test(password)) {
    strength += 20;
  } else {
    errors.push('an uppercase letter');
  }

  if (/\d/.test(password)) {
    strength += 20;
  } else {
    errors.push('a number');
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    strength += 15;
  } else {
    errors.push('a special character');
  }

  // Check for weak patterns
  const weakPatterns = [
    /(.)\1{2,}/,
    /123456|654321|password|qwerty|admin/i,
    /^[a-zA-Z]+$/,
    /^\d+$/
  ];

  for (const pattern of weakPatterns) {
    if (pattern.test(password)) {
      strength = Math.min(strength, 40);
      break;
    }
  }

  const isValid = strength >= 60 && errors.length === 0;
  const message = isValid ? 'Password is strong' : `Password needs: ${errors.join(', ')}`;

  return { isValid, message, strength };
};

/**
 * URL validation with security checks
 */
export const validateUrl = (url: string): ValidationResult => {
  if (!url || typeof url !== 'string') {
    return { isValid: false, message: 'URL is required' };
  }
  
  const sanitizedUrl = sanitizeInput(url);
  
  try {
    const urlObj = new URL(sanitizedUrl.startsWith('http') ? sanitizedUrl : `https://${sanitizedUrl}`);
    
    const allowedProtocols = ['http:', 'https:'];
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return { isValid: false, message: 'Only HTTP and HTTPS URLs are allowed' };
    }
    
    if (urlObj.hostname.includes('javascript') || urlObj.hostname.includes('data')) {
      return { isValid: false, message: 'URL contains suspicious content' };
    }
    
    return { isValid: true, message: 'Valid URL', sanitizedValue: urlObj.toString() };
  } catch {
    return { isValid: false, message: 'Please enter a valid URL' };
  }
};

/**
 * Check if URL is secure and valid
 */
export const isValidSecureUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

/**
 * Escape HTML to prevent XSS
 */
export const escapeHtml = (text: string): string => {
  if (typeof text !== 'string') return '';
  
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Unified Rate Limiter
 */
export class UnifiedRateLimiter {
  private attempts = new Map<string, { count: number; resetTime: number }>();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 60000
  ) {}
  
  canAttempt(identifier: string): RateLimitResult {
    const now = Date.now();
    const entry = this.attempts.get(identifier);
    
    if (!entry || now > entry.resetTime) {
      this.attempts.set(identifier, { count: 1, resetTime: now + this.windowMs });
      return { allowed: true };
    }
    
    if (entry.count >= this.maxAttempts) {
      return { allowed: false, resetTime: entry.resetTime };
    }
    
    entry.count++;
    return { allowed: true };
  }
  
  recordAttempt(identifier: string): void {
    const now = Date.now();
    const entry = this.attempts.get(identifier) || { count: 0, resetTime: now + this.windowMs };
    entry.count++;
    this.attempts.set(identifier, entry);
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

/**
 * CSRF Token Manager
 */
export class CSRFManager {
  private static tokens = new Set<string>();
  
  static generate(): string {
    const token = this.generateSecureToken(32);
    this.tokens.add(token);
    
    // Auto-cleanup after 1 hour
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
      this.tokens.delete(token);
    }
    return isValid;
  }
  
  private static generateSecureToken(length: number): string {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const array = new Uint8Array(length);
      crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    
    // Fallback for environments without crypto API
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
