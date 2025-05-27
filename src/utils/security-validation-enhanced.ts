
/**
 * Enhanced Security Validation Utilities
 * Comprehensive input validation, sanitization, and security protection
 */

export interface ValidationResult {
  isValid: boolean;
  message: string;
  sanitizedValue?: string;
}

// XSS Protection - Enhanced HTML sanitization
export const sanitizeHtml = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<link\b[^<]*(?:(?!<\/link>)<[^<]*)*<\/link>/gi, '')
    .replace(/<meta\b[^<]*(?:(?!<\/meta>)<[^<]*)*<\/meta>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/style\s*=/gi, '')
    .trim();
};

// SQL Injection Protection
export const sanitizeForDatabase = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/'/g, "''")
    .replace(/;/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
    .replace(/xp_/gi, '')
    .replace(/sp_/gi, '')
    .trim();
};

// Enhanced Email Validation with Security Checks
export const validateEmailSecure = (email: string): ValidationResult => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'Email is required' };
  }
  
  const sanitizedEmail = sanitizeHtml(email.toLowerCase().trim());
  
  // Basic format validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(sanitizedEmail)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  // Length validation
  if (sanitizedEmail.length > 254 || sanitizedEmail.length < 5) {
    return { isValid: false, message: 'Email address length is invalid' };
  }
  
  // Security pattern checks
  const suspiciousPatterns = [
    /\.{2,}/,
    /@.*@/,
    /\s/,
    /<|>/,
    /javascript:/i,
    /data:/i
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(sanitizedEmail)) {
      return { isValid: false, message: 'Email contains invalid characters' };
    }
  }
  
  return { isValid: true, message: 'Valid email', sanitizedValue: sanitizedEmail };
};

// Enhanced Password Validation
export const validatePasswordSecure = (password: string): ValidationResult & { strength: number } => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required', strength: 0 };
  }

  let strength = 0;
  const requirements = [];

  // Length requirements
  if (password.length >= 8) {
    strength += 25;
  } else {
    requirements.push('at least 8 characters');
  }
  
  if (password.length > 128) {
    return { isValid: false, message: 'Password too long (max 128 characters)', strength: 0 };
  }

  // Character type requirements
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
    strength += 15;
  } else {
    requirements.push('a special character');
  }

  // Check for common weak patterns
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

  const isValid = strength >= 60 && requirements.length === 0;
  const message = isValid ? 'Password is strong' : `Password needs: ${requirements.join(', ')}`;

  return { isValid, message, strength };
};

// General Input Sanitization
export const sanitizeInput = (input: string, options: {
  allowHtml?: boolean;
  maxLength?: number;
  stripWhitespace?: boolean;
  removeNumbers?: boolean;
} = {}): string => {
  if (typeof input !== 'string') return '';
  
  const { allowHtml = false, maxLength = 1000, stripWhitespace = true, removeNumbers = false } = options;
  
  let sanitized = input;
  
  // HTML sanitization
  if (!allowHtml) {
    sanitized = sanitizeHtml(sanitized);
  }
  
  // Remove numbers if requested
  if (removeNumbers) {
    sanitized = sanitized.replace(/\d/g, '');
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

// URL Validation with Security
export const validateUrlSecure = (url: string): ValidationResult => {
  if (!url || typeof url !== 'string') {
    return { isValid: false, message: 'URL is required' };
  }
  
  const sanitizedUrl = sanitizeInput(url);
  
  try {
    const urlObj = new URL(sanitizedUrl.startsWith('http') ? sanitizedUrl : `https://${sanitizedUrl}`);
    
    // Check for dangerous protocols
    const allowedProtocols = ['http:', 'https:'];
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return { isValid: false, message: 'Only HTTP and HTTPS URLs are allowed' };
    }
    
    // Check for suspicious patterns
    if (urlObj.hostname.includes('javascript') || urlObj.hostname.includes('data')) {
      return { isValid: false, message: 'URL contains suspicious content' };
    }
    
    return { isValid: true, message: 'Valid URL', sanitizedValue: urlObj.toString() };
  } catch {
    return { isValid: false, message: 'Please enter a valid URL' };
  }
};

// Enhanced Rate Limiting
export class SecurityRateLimiter {
  private attempts: Map<string, { count: number; timestamps: number[]; blocked: boolean }> = new Map();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 60000,
    private blockDuration: number = 300000
  ) {}
  
  canAttempt(identifier: string): { allowed: boolean; remaining?: number; resetTime?: number } {
    const now = Date.now();
    const record = this.attempts.get(identifier) || { count: 0, timestamps: [], blocked: false };
    
    // Remove old attempts
    record.timestamps = record.timestamps.filter(time => now - time < this.windowMs);
    record.count = record.timestamps.length;
    
    // Check if currently blocked
    if (record.blocked) {
      const lastAttempt = Math.max(...record.timestamps);
      if (now - lastAttempt < this.blockDuration) {
        return { allowed: false, resetTime: lastAttempt + this.blockDuration };
      } else {
        record.blocked = false;
      }
    }
    
    if (record.count >= this.maxAttempts) {
      record.blocked = true;
      this.attempts.set(identifier, record);
      return { allowed: false, resetTime: now + this.blockDuration };
    }
    
    return { allowed: true, remaining: this.maxAttempts - record.count };
  }
  
  recordAttempt(identifier: string): void {
    const now = Date.now();
    const record = this.attempts.get(identifier) || { count: 0, timestamps: [], blocked: false };
    
    record.timestamps.push(now);
    record.count = record.timestamps.length;
    this.attempts.set(identifier, record);
  }
  
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

// CSRF Token Management
export class CSRFTokenManager {
  private static tokens = new Set<string>();
  private static readonly TOKEN_EXPIRY = 3600000; // 1 hour
  
  static generate(): string {
    const token = this.generateSecureToken(32);
    this.tokens.add(token);
    
    // Auto-cleanup after expiry
    setTimeout(() => {
      this.tokens.delete(token);
    }, this.TOKEN_EXPIRY);
    
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
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

// Security Headers Helper
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

// Export rate limiters for different use cases
export const authRateLimiter = new SecurityRateLimiter(5, 60000, 300000);
export const apiRateLimiter = new SecurityRateLimiter(100, 60000, 60000);
export const contactRateLimiter = new SecurityRateLimiter(3, 300000, 900000);

// Security logging
export const logSecurityEvent = (event: string, details: any = {}) => {
  const logData = {
    timestamp: new Date().toISOString(),
    event,
    details: typeof details === 'object' ? JSON.stringify(details) : details,
    userAgent: navigator.userAgent,
    url: window.location.href
  };
  
  if (process.env.NODE_ENV === 'development') {
    console.warn('🔒 Security Event:', logData);
  }
  
  // In production, send to monitoring service
};
