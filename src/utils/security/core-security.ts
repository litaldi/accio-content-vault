
/**
 * Core Security Utilities
 * Essential validation and sanitization functions
 */

export interface ValidationResult {
  isValid: boolean;
  message: string;
  strength?: number; // Added for password validation
}

export interface SanitizeOptions {
  maxLength?: number;
  allowHtml?: boolean;
  stripWhitespace?: boolean;
}

/**
 * Email validation with security considerations
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }

  if (email.length < 5) {
    return { isValid: false, message: 'Email is too short' };
  }

  if (email.length > 254) {
    return { isValid: false, message: 'Email is too long' };
  }

  // Check for suspicious patterns
  if (email.includes('..') || email.includes('@.') || email.includes('.@')) {
    return { isValid: false, message: 'Invalid email format' };
  }

  if ((email.match(/@/g) || []).length !== 1) {
    return { isValid: false, message: 'Invalid email format' };
  }

  if (email.includes(' ')) {
    return { isValid: false, message: 'Email cannot contain spaces' };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }

  return { isValid: true, message: '' };
};

/**
 * Password validation with security requirements and strength calculation
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: 'Password is required', strength: 0 };
  }

  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long', strength: 10 };
  }

  if (password.length > 128) {
    return { isValid: false, message: 'Password is too long', strength: 0 };
  }

  let strength = 0;
  const requirements = [];

  // Check for lowercase
  if (!/(?=.*[a-z])/.test(password)) {
    requirements.push('at least one lowercase letter');
  } else {
    strength += 20;
  }

  // Check for uppercase
  if (!/(?=.*[A-Z])/.test(password)) {
    requirements.push('at least one uppercase letter');
  } else {
    strength += 20;
  }

  // Check for numbers
  if (!/(?=.*\d)/.test(password)) {
    requirements.push('at least one number');
  } else {
    strength += 20;
  }

  // Check for special characters
  if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
    requirements.push('at least one special character');
  } else {
    strength += 20;
  }

  // Length bonus
  if (password.length >= 12) {
    strength += 10;
  }

  // Check for repeated characters (weakness)
  const repeatedChars = password.match(/(.)\1{2,}/g);
  if (repeatedChars) {
    strength -= 20;
  }

  if (requirements.length > 0) {
    return { 
      isValid: false, 
      message: `Password must contain ${requirements.join(', ')}`,
      strength: Math.max(0, strength)
    };
  }

  return { 
    isValid: true, 
    message: '', 
    strength: Math.min(100, Math.max(0, strength))
  };
};

/**
 * Input sanitization to prevent XSS
 */
export const sanitizeInput = (input: string, options: SanitizeOptions = {}): string => {
  const { maxLength = 1000, allowHtml = false, stripWhitespace = true } = options;

  let sanitized = input;

  if (!allowHtml) {
    // Remove HTML tags and dangerous content
    sanitized = sanitized
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframe tags
      .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '') // Remove object tags
      .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '') // Remove embed tags
      .replace(/<[^>]*>/g, ''); // Remove all other HTML tags
  }

  // Remove dangerous protocols
  sanitized = sanitized
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+=/gi, ''); // Remove event handlers

  if (stripWhitespace) {
    // Normalize whitespace
    sanitized = sanitized.replace(/\s+/g, ' ').trim();
  }

  // Apply length limit
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
};

/**
 * HTML escape for safe rendering
 */
export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * URL validation
 */
export const validateUrl = (url: string): ValidationResult => {
  if (!url) {
    return { isValid: false, message: 'URL is required' };
  }

  // Add protocol if missing
  let testUrl = url;
  if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
    testUrl = 'https://' + testUrl;
  }

  try {
    const urlObj = new URL(testUrl);
    
    // Check for dangerous protocols
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:', 'ftp:'];
    if (dangerousProtocols.some(protocol => url.toLowerCase().includes(protocol))) {
      return { isValid: false, message: 'Dangerous URL protocol detected' };
    }

    // Check for suspicious hostnames
    const suspiciousWords = ['javascript', 'data', 'script'];
    if (suspiciousWords.some(word => urlObj.hostname.toLowerCase().includes(word))) {
      return { isValid: false, message: 'Suspicious URL detected' };
    }

    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, message: 'URL must use HTTP or HTTPS protocol' };
    }
    
    return { isValid: true, message: '' };
  } catch {
    return { isValid: false, message: 'Please enter a valid URL' };
  }
};

/**
 * Check if URL is secure (HTTPS)
 */
export const isValidSecureUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Rate limiting utility
 */
export class UnifiedRateLimiter {
  private attempts: Map<string, number[]> = new Map();

  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 60000
  ) {}

  canAttempt(key: string): { allowed: boolean; remaining?: number; resetTime?: number } {
    const now = Date.now();
    const userAttempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const validAttempts = userAttempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      const oldestAttempt = Math.min(...validAttempts);
      return { 
        allowed: false, 
        resetTime: oldestAttempt + this.windowMs 
      };
    }

    // Record this attempt
    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    
    return { 
      allowed: true, 
      remaining: this.maxAttempts - validAttempts.length 
    };
  }

  isAllowed(key: string, maxAttempts?: number, windowMs?: number): boolean {
    const max = maxAttempts || this.maxAttempts;
    const window = windowMs || this.windowMs;
    
    const now = Date.now();
    const userAttempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const validAttempts = userAttempts.filter(time => now - time < window);
    
    if (validAttempts.length >= max) {
      return false;
    }

    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    return true;
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}

/**
 * CSRF token management
 */
export class CSRFManager {
  private static tokens = new Set<string>();
  private static readonly TOKEN_EXPIRY = 3600000; // 1 hour

  static generate(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    
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

  static getToken(): string | null {
    // Legacy method for compatibility
    return null;
  }

  static generateToken(): string {
    // Legacy method for compatibility
    return this.generate();
  }

  static validateToken(token: string): boolean {
    // Legacy method for compatibility
    return this.validate(token);
  }
}
