
/**
 * Unified security utilities for input sanitization and validation
 */

interface SanitizeOptions {
  maxLength?: number;
  allowHtml?: boolean;
  stripWhitespace?: boolean;
  preserveLineBreaks?: boolean;
}

/**
 * Sanitize user input to prevent XSS and other security issues
 */
export const sanitizeInput = (input: string, options: SanitizeOptions = {}): string => {
  const {
    maxLength = 1000,
    allowHtml = false,
    stripWhitespace = true,
    preserveLineBreaks = false
  } = options;

  if (typeof input !== 'string') {
    return '';
  }

  let sanitized = input;

  // Remove or escape HTML if not allowed
  if (!allowHtml) {
    sanitized = sanitized
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, ''); // Remove event handlers
  }

  // Strip excessive whitespace
  if (stripWhitespace && !preserveLineBreaks) {
    sanitized = sanitized.trim().replace(/\s+/g, ' ');
  } else if (stripWhitespace) {
    sanitized = sanitized.trim().replace(/[ \t]+/g, ' ');
  }

  // Truncate to max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
};

/**
 * Validate email format with enhanced security
 */
export const validateEmailEnhanced = (email: string): { isValid: boolean; message: string } => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'Email is required' };
  }
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailRegex.test(email) && email.length <= 254 && email.length >= 5;
  
  return {
    isValid,
    message: isValid ? 'Valid email' : 'Please enter a valid email address'
  };
};

/**
 * Validate password strength and security
 */
export const validatePassword = (password: string): { isValid: boolean; message: string; strength: number } => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required', strength: 0 };
  }

  let strength = 0;
  const feedback = [];

  // Length check
  if (password.length >= 8) {
    strength += 20;
  } else {
    feedback.push('at least 8 characters');
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    strength += 20;
  } else {
    feedback.push('an uppercase letter');
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    strength += 20;
  } else {
    feedback.push('a lowercase letter');
  }

  // Number check
  if (/\d/.test(password)) {
    strength += 20;
  } else {
    feedback.push('a number');
  }

  // Special character check
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    strength += 20;
  } else {
    feedback.push('a special character');
  }

  const isValid = strength >= 60; // At least 3 criteria met
  const message = isValid 
    ? 'Password is strong' 
    : `Password needs: ${feedback.join(', ')}`;

  return { isValid, message, strength };
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Validate URL format and security
 */
export const isValidSecureUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' || urlObj.protocol === 'http:';
  } catch {
    return false;
  }
};

/**
 * Validate URL format and security (alias for compatibility)
 */
export const validateSecureUrl = isValidSecureUrl;

/**
 * Generate a secure random string
 */
export const generateSecureToken = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Enhanced rate limiting helper for client-side
 */
export class UnifiedRateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  constructor(
    private maxAttempts: number = 5, 
    private windowMs: number = 60000,
    private cleanupInterval: number = 300000 // 5 minutes
  ) {
    // Periodic cleanup to prevent memory leaks
    setInterval(() => this.cleanup(), this.cleanupInterval);
  }
  
  canAttempt(identifier: string): { allowed: boolean; resetTime?: number } {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    
    const recentAttempts = userAttempts.filter(time => now - time < this.windowMs);
    this.attempts.set(identifier, recentAttempts);
    
    const allowed = recentAttempts.length < this.maxAttempts;
    
    if (!allowed) {
      const oldestAttempt = Math.min(...recentAttempts);
      return {
        allowed: false,
        resetTime: oldestAttempt + this.windowMs
      };
    }
    
    this.recordAttempt(identifier);
    return { allowed: true };
  }
  
  recordAttempt(identifier: string): void {
    const userAttempts = this.attempts.get(identifier) || [];
    userAttempts.push(Date.now());
    this.attempts.set(identifier, userAttempts);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [identifier, attempts] of this.attempts.entries()) {
      const recentAttempts = attempts.filter(time => now - time < this.windowMs);
      if (recentAttempts.length === 0) {
        this.attempts.delete(identifier);
      } else {
        this.attempts.set(identifier, recentAttempts);
      }
    }
  }
}

/**
 * Rate limiter for authentication attempts
 */
export const authRateLimiter = new UnifiedRateLimiter(5, 60000);

/**
 * Rate limiter for contact form submissions
 */
export const contactRateLimiter = new UnifiedRateLimiter(3, 300000);

/**
 * CSRF Manager for form security
 */
export class CSRFManager {
  private static tokens = new Set<string>();
  
  static generate(): string {
    const token = generateSecureToken(32);
    this.tokens.add(token);
    return token;
  }
  
  static validate(token: string): boolean {
    const isValid = this.tokens.has(token);
    if (isValid) {
      this.tokens.delete(token); // Use token only once
    }
    return isValid;
  }
  
  static cleanup(): void {
    this.tokens.clear();
  }
}
