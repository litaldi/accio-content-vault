
import validator from 'validator';
import passwordValidator from 'password-validator';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

interface ValidationResult {
  isValid: boolean;
  message?: string;
  strength?: number;
  sanitizedValue?: string;
}

interface SanitizeOptions {
  maxLength?: number;
  allowHtml?: boolean;
}

export const sanitizeInput = (input: string, options: SanitizeOptions = {}): string => {
  let sanitized = input.trim();

  if (!options.allowHtml) {
    sanitized = DOMPurify.sanitize(sanitized, { USE_PROFILES: { html: true } });
  }

  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/\s+/g, ' ');

  if (options.maxLength) {
    sanitized = sanitized.substring(0, options.maxLength);
  }

  return sanitized;
};

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }

  if (email.length > 254) {
    return { isValid: false, message: 'Email is too long' };
  }

  const sanitizedEmail = email.toLowerCase().trim();

  if (!validator.isEmail(sanitizedEmail)) {
    return { isValid: false, message: 'Invalid email format' };
  }

  return { isValid: true, sanitizedValue: sanitizedEmail };
};

export const validatePassword = (password: string): ValidationResult => {
  const schema = new passwordValidator();

  schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .has().not().spaces()
    .is().not().oneOf(['Password123', 'password', '12345678']);

  const result = schema.validate(password, { details: true }) as string[];

  if (result.length > 0) {
    const messages = result.map(rule => {
      switch (rule) {
        case 'min': return 'Password must be at least 8 characters';
        case 'max': return 'Password must be less than 100 characters';
        case 'uppercase': return 'Password must contain at least one uppercase letter';
        case 'lowercase': return 'Password must contain at least one lowercase letter';
        case 'digits': return 'Password must contain at least one digit';
        case 'symbols': return 'Password must contain at least one symbol';
        case 'spaces': return 'Password must not contain spaces';
        default: return 'Password is not strong enough';
      }
    });

    return { isValid: false, message: messages.join(', ') };
  }

  const strength = schema.strength(password);
  return { isValid: true, strength };
};

export const validateUrl = (url: string): ValidationResult => {
  if (!url) {
    return { isValid: false, message: 'URL is required' };
  }

  if (url.length > 2000) {
    return { isValid: false, message: 'URL is too long' };
  }

  if (!validator.isURL(url, { protocols: ['http', 'https'], require_protocol: false })) {
    return { isValid: false, message: 'Invalid URL format' };
  }

  if (url.startsWith('javascript:') || url.startsWith('data:')) {
    return { isValid: false, message: 'URL contains a dangerous protocol' };
  }

  if (url.includes('javascript.evil.com') || url.includes('data.malicious.com')) {
    return { isValid: false, message: 'URL contains a suspicious hostname' };
  }

  return { isValid: true };
};

export const isValidSecureUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

export class UnifiedRateLimiter {
  private attempts: Map<string, number[]> = new Map();

  constructor(private maxAttempts: number) {}

  canAttempt(identifier: string): { allowed: boolean; resetTime?: number } {
    const now = Date.now();
    const windowMs = 60000; // 1 minute window
    const userAttempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = userAttempts.filter(time => now - time < windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return { 
        allowed: false, 
        resetTime: Math.min(...recentAttempts) + windowMs 
      };
    }
    
    // Record this attempt
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    
    return { allowed: true };
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

export class CSRFManager {
  private static tokens: Set<string> = new Set();

  static generate(): string {
    const token = [...Array(32)].map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
    CSRFManager.tokens.add(token);
    return token;
  }

  static validate(token: string): boolean {
    return CSRFManager.tokens.has(token);
  }

  static consume(token: string): boolean {
    if (CSRFManager.tokens.has(token)) {
      CSRFManager.tokens.delete(token);
      return true;
    }
    return false;
  }
}

export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
