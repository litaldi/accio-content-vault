// Core Security Functions - Essential validation and protection utilities
import DOMPurify from 'dompurify';
import { enhancedRateLimiters } from './enhanced-validation';

// Rate limiting implementation (keeping existing for backward compatibility)
export class UnifiedRateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();

  constructor(private maxAttempts: number, private windowMs: number) {}

  canAttempt(identifier: string): { allowed: boolean; resetTime?: number } {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier);

    if (!userAttempts || now > userAttempts.resetTime) {
      this.attempts.set(identifier, { count: 1, resetTime: now + this.windowMs });
      return { allowed: true };
    }

    if (userAttempts.count >= this.maxAttempts) {
      return { allowed: false, resetTime: userAttempts.resetTime };
    }

    userAttempts.count++;
    return { allowed: true };
  }
}

// Enhanced CSRF Protection with stronger tokens
export class CSRFManager {
  private static tokens: Map<string, { token: string; created: number; used: boolean }> = new Map();
  private static readonly TOKEN_LIFETIME = 3600000; // 1 hour

  static generate(operation?: string): string {
    const token = crypto.randomUUID();
    const key = operation ? `${operation}-${token}` : token;
    
    this.tokens.set(key, {
      token,
      created: Date.now(),
      used: false
    });
    
    // Clean up old tokens
    this.cleanup();
    
    return token;
  }

  static validate(token: string, operation?: string): boolean {
    const key = operation ? `${operation}-${token}` : token;
    const tokenData = this.tokens.get(key);
    
    if (!tokenData) return false;
    if (tokenData.used) return false;
    if (Date.now() - tokenData.created > this.TOKEN_LIFETIME) {
      this.tokens.delete(key);
      return false;
    }
    
    return true;
  }

  static consume(token: string, operation?: string): boolean {
    const key = operation ? `${operation}-${token}` : token;
    const tokenData = this.tokens.get(key);
    
    if (this.validate(token, operation)) {
      tokenData!.used = true;
      // Remove token after use for one-time validation
      setTimeout(() => this.tokens.delete(key), 5000);
      return true;
    }
    return false;
  }

  static getToken(operation?: string): string {
    return this.generate(operation);
  }

  private static cleanup(): void {
    const now = Date.now();
    for (const [key, data] of this.tokens.entries()) {
      if (now - data.created > this.TOKEN_LIFETIME || data.used) {
        this.tokens.delete(key);
      }
    }
  }
}

// Enhanced input sanitization with security logging
interface SanitizeOptions {
  maxLength?: number;
  allowHtml?: boolean;
  stripScripts?: boolean;
  logSuspicious?: boolean;
}

export const sanitizeInput = (input: string, options: SanitizeOptions = {}): string => {
  const {
    maxLength = 1000,
    allowHtml = false,
    stripScripts = true,
    logSuspicious = true
  } = options;

  let sanitized = input.trim();
  let suspicious = false;

  // Detect suspicious patterns
  const suspiciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi
  ];

  suspiciousPatterns.forEach(pattern => {
    if (pattern.test(sanitized)) {
      suspicious = true;
    }
  });

  // Length validation
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  // HTML sanitization
  if (!allowHtml) {
    sanitized = sanitized
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '');
  } else if (stripScripts) {
    sanitized = DOMPurify.sanitize(sanitized, {
      FORBID_TAGS: ['script', 'object', 'embed', 'iframe', 'link', 'style'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style']
    });
  }

  // Log suspicious activity
  if (suspicious && logSuspicious) {
    console.warn('[SECURITY] Suspicious input detected and sanitized:', {
      original: input.substring(0, 100),
      sanitized: sanitized.substring(0, 100),
      timestamp: new Date().toISOString()
    });
  }

  return sanitized;
};

// HTML escaping utility
export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Email validation
export interface ValidationResult {
  isValid: boolean;
  message: string;
  strength?: number;
}

export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || email.trim().length === 0) {
    return { isValid: false, message: 'Email is required' };
  }
  
  if (email.length > 254) {
    return { isValid: false, message: 'Email is too long' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Invalid email format' };
  }
  
  return { isValid: true, message: 'Valid email' };
};

// Enhanced password validation with security scoring
export const validatePassword = (password: string): ValidationResult => {
  if (!password || password.length === 0) {
    return { isValid: false, message: 'Password is required', strength: 0 };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long', strength: 0 };
  }
  
  if (password.length > 128) {
    return { isValid: false, message: 'Password is too long', strength: 0 };
  }
  
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  
  let strength = 0;
  if (hasLower) strength += 25;
  if (hasUpper) strength += 25;
  if (hasNumber) strength += 25;
  if (hasSpecial) strength += 25;
  
  // Length bonus
  if (password.length >= 12) strength += 10;
  if (password.length >= 16) strength += 10;
  
  // Penalty for repeated characters
  const repeatedPattern = /(.)\1{2,}/.test(password);
  if (repeatedPattern) strength -= 20;
  
  // Check against common passwords
  const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'letmein'];
  if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
    strength -= 30;
  }
  
  if (!hasLower || !hasUpper || !hasNumber || !hasSpecial) {
    return { 
      isValid: false, 
      message: 'Password must contain uppercase, lowercase, number, and special character',
      strength: Math.max(0, strength)
    };
  }
  
  return { 
    isValid: true, 
    message: 'Password is valid',
    strength: Math.min(100, Math.max(0, strength))
  };
};

// URL validation
export const validateUrl = (url: string): ValidationResult => {
  if (!url || url.trim().length === 0) {
    return { isValid: false, message: 'URL is required' };
  }
  
  try {
    const urlObj = new URL(url);
    
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, message: 'URL must use HTTP or HTTPS protocol' };
    }
    
    if (url.length > 2048) {
      return { isValid: false, message: 'URL is too long' };
    }
    
    // Enhanced security checks
    const suspiciousDomains = ['bit.ly', 't.co', 'tinyurl.com'];
    if (suspiciousDomains.some(domain => urlObj.hostname.includes(domain))) {
      return { isValid: false, message: 'Shortened URLs are not allowed for security reasons' };
    }
    
    return { isValid: true, message: 'Valid URL' };
  } catch (error) {
    return { isValid: false, message: 'Invalid URL format' };
  }
};

// Secure URL validation
export const isValidSecureUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' && !urlObj.hostname.includes('localhost');
  } catch {
    return false;
  }
};

// Enhanced security check for runtime environment
export const performSecurityHealthCheck = (): {
  score: number;
  issues: string[];
  recommendations: string[];
  passed: boolean;
} => {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // HTTPS check
  if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
    issues.push('Site not using HTTPS');
    recommendations.push('Enable HTTPS for secure communication');
    score -= 30;
  }

  // CSP check
  const hasCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (!hasCSP) {
    issues.push('Content Security Policy not detected');
    recommendations.push('Implement Content Security Policy headers');
    score -= 20;
  }

  // Local storage security
  try {
    const storageTest = localStorage.getItem('test');
    const localStorageSize = new Blob(Object.values(localStorage)).size;
    if (localStorageSize > 5 * 1024 * 1024) { // 5MB
      issues.push('Excessive localStorage usage detected');
      recommendations.push('Review and clean up localStorage data');
      score -= 15;
    }
  } catch (error) {
    // localStorage disabled - actually good for security
    score += 5;
  }

  // Mixed content check
  if (window.location.protocol === 'https:') {
    const images = Array.from(document.images);
    const hasInsecureImages = images.some(img => img.src.startsWith('http:'));
    if (hasInsecureImages) {
      issues.push('Mixed content detected (insecure images)');
      recommendations.push('Use HTTPS for all resources');
      score -= 10;
    }
  }

  // Rate limiter status
  const rateLimiterKeys = Object.keys(enhancedRateLimiters);
  if (rateLimiterKeys.length === 0) {
    issues.push('Rate limiting not properly configured');
    recommendations.push('Implement rate limiting for all user actions');
    score -= 25;
  }

  return {
    score: Math.max(0, score),
    issues,
    recommendations,
    passed: score >= 70
  };
};
