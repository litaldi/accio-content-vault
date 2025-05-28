
interface SanitizeOptions {
  maxLength?: number;
  allowHtml?: boolean;
  stripWhitespace?: boolean;
}

export const sanitizeInput = (input: string, options: SanitizeOptions = {}): string => {
  const {
    maxLength = 1000,
    allowHtml = false,
    stripWhitespace = true
  } = options;
  
  let sanitized = input;
  
  // Strip whitespace if requested
  if (stripWhitespace) {
    sanitized = sanitized.trim();
  }
  
  // Remove HTML if not allowed
  if (!allowHtml) {
    sanitized = sanitized.replace(/<[^>]*>/g, '');
  }
  
  // Truncate to max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  return sanitized;
};

export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const validateCsrfToken = (token: string): boolean => {
  // Basic CSRF token validation
  return token && token.length >= 32;
};

// Enhanced email validation
export const validateEmailEnhanced = (email: string): { isValid: boolean; message: string; sanitizedValue?: string } => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true, message: 'Valid email', sanitizedValue: email.trim() };
};

// Enhanced password validation
export const validatePassword = (password: string): { 
  isValid: boolean; 
  errors: string[];
  message: string;
  strength: number;
} => {
  const errors: string[] = [];
  let strength = 0;
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else {
    strength += 20;
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  } else {
    strength += 20;
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  } else {
    strength += 20;
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  } else {
    strength += 20;
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  } else {
    strength += 20;
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    message: errors.length === 0 ? 'Password is strong' : errors.join(', '),
    strength
  };
};

// URL validation
export const isValidSecureUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// Rate limiting
export class UnifiedRateLimiter {
  private attempts = new Map<string, { count: number; resetTime: number }>();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 60000
  ) {}
  
  canAttempt(identifier: string): { allowed: boolean; resetTime?: number } {
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
}

// CSRF Manager
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
  
  private static generateSecureToken(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

// Rate limiter instances
export const authRateLimiter = new UnifiedRateLimiter(5, 60000);
export const contactRateLimiter = new UnifiedRateLimiter(3, 300000);
