
/**
 * Unified security utilities for enhanced input validation, sanitization, and protection
 */

// Enhanced email validation with comprehensive checks
export const validateEmailEnhanced = (email: string): { isValid: boolean; message: string } => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'Email is required' };
  }

  // Basic format check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }

  // Length checks
  if (email.length > 254) {
    return { isValid: false, message: 'Email address is too long' };
  }

  if (email.length < 5) {
    return { isValid: false, message: 'Email address is too short' };
  }

  // Check for dangerous patterns
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(email)) {
      return { isValid: false, message: 'Email contains invalid characters' };
    }
  }

  return { isValid: true, message: 'Email is valid' };
};

// Enhanced password validation with security requirements
export const validatePasswordComplexity = (password: string): { isValid: boolean; message: string; strength: number } => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required', strength: 0 };
  }

  let strength = 0;
  const checks = {
    length: password.length >= 8,
    maxLength: password.length <= 128,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    noCommonPatterns: !/(.)\1{2,}/.test(password) && !/123456|654321|abcdef|qwerty|password/i.test(password)
  };

  // Calculate strength
  Object.values(checks).forEach(check => {
    if (check) strength += 1;
  });

  if (!checks.length) {
    return { isValid: false, message: 'Password must be at least 8 characters long', strength: strength * 14 };
  }

  if (!checks.maxLength) {
    return { isValid: false, message: 'Password must be less than 128 characters', strength: strength * 14 };
  }

  if (!checks.lowercase) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter', strength: strength * 14 };
  }

  if (!checks.uppercase) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter', strength: strength * 14 };
  }

  if (!checks.numbers) {
    return { isValid: false, message: 'Password must contain at least one number', strength: strength * 14 };
  }

  if (!checks.noCommonPatterns) {
    return { isValid: false, message: 'Password contains common patterns or repeated characters', strength: strength * 14 };
  }

  const strengthScore = strength * 14; // Convert to percentage
  let strengthMessage = 'Password is ';
  if (strengthScore >= 85) strengthMessage += 'very strong';
  else if (strengthScore >= 70) strengthMessage += 'strong';
  else if (strengthScore >= 55) strengthMessage += 'good';
  else strengthMessage += 'acceptable';

  return { 
    isValid: true, 
    message: strengthMessage,
    strength: strengthScore
  };
};

// Enhanced input sanitization
export const sanitizeInput = (input: string, options: {
  allowHtml?: boolean;
  maxLength?: number;
  stripScripts?: boolean;
} = {}): string => {
  if (typeof input !== 'string') return '';

  const {
    allowHtml = false,
    maxLength = 10000,
    stripScripts = true
  } = options;

  let sanitized = input.trim();

  // Length limit
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  // Strip dangerous scripts
  if (stripScripts) {
    sanitized = sanitized
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }

  // Remove all HTML if not allowed
  if (!allowHtml) {
    sanitized = sanitized.replace(/<[^>]*>/g, '');
  }

  return sanitized;
};

// Enhanced rate limiting with memory management
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 60000,
    private cleanupInterval: number = 300000
  ) {
    // Auto-cleanup to prevent memory leaks
    setInterval(() => this.cleanup(), this.cleanupInterval);
  }

  canAttempt(identifier: string): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    
    // Filter recent attempts
    const recentAttempts = userAttempts.filter(time => now - time < this.windowMs);
    this.attempts.set(identifier, recentAttempts);
    
    return recentAttempts.length < this.maxAttempts;
  }

  recordAttempt(identifier: string): void {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    userAttempts.push(now);
    this.attempts.set(identifier, userAttempts);
  }

  getRemainingAttempts(identifier: string): number {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    const recentAttempts = userAttempts.filter(time => now - time < this.windowMs);
    return Math.max(0, this.maxAttempts - recentAttempts.length);
  }

  getResetTime(identifier: string): number {
    const userAttempts = this.attempts.get(identifier) || [];
    if (userAttempts.length === 0) return 0;
    
    const oldestRecentAttempt = Math.min(...userAttempts);
    return oldestRecentAttempt + this.windowMs;
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

// Auth-specific rate limiter
export const authRateLimiter = new RateLimiter(5, 300000); // 5 attempts per 5 minutes

// CSRF protection utility
export class CSRFManager {
  private static tokens: Set<string> = new Set();
  
  static generate(): string {
    const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    this.tokens.add(token);
    
    // Auto-expire tokens after 1 hour
    setTimeout(() => {
      this.tokens.delete(token);
    }, 3600000);
    
    return token;
  }
  
  static validate(token: string): boolean {
    return this.tokens.has(token);
  }
  
  static consume(token: string): boolean {
    if (this.tokens.has(token)) {
      this.tokens.delete(token);
      return true;
    }
    return false;
  }
}

// SQL injection detection
export const detectSQLInjection = (input: string): boolean => {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
    /(--|\/\*|\*\/|;)/,
    /(\b(OR|AND)\b.*=.*)/i,
    /'.*OR.*'/i,
    /\b(EXEC|EXECUTE)\b/i,
    /\b(SP_|XP_)\w+/i
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
};

// XSS detection
export const detectXSS = (input: string): boolean => {
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    /javascript:/i,
    /vbscript:/i,
    /on\w+\s*=/i,
    /<img[^>]+src[\\s]*=[\\\s]*[\"\\']*javascript:/i,
    /<[^>]*?=.*?(;|&#|&\#|&#x|&\#x)/i
  ];
  
  return xssPatterns.some(pattern => pattern.test(input));
};

// Content validation
export const validateContent = (content: string, maxLength: number = 50000): { isValid: boolean; message: string } => {
  if (!content || typeof content !== 'string') {
    return { isValid: false, message: 'Content is required' };
  }

  if (content.length > maxLength) {
    return { isValid: false, message: `Content must be less than ${maxLength} characters` };
  }

  if (detectSQLInjection(content)) {
    return { isValid: false, message: 'Content contains potentially dangerous SQL patterns' };
  }

  if (detectXSS(content)) {
    return { isValid: false, message: 'Content contains potentially dangerous script patterns' };
  }

  return { isValid: true, message: 'Content is valid' };
};
