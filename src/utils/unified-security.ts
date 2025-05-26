
/**
 * Unified security utilities for enhanced input validation, sanitization, and protection
 */

// Enhanced email validation with comprehensive checks
export const validateEmailEnhanced = (email: string): { isValid: boolean; message: string; error?: string } => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'Email is required', error: 'Email is required' };
  }

  // Basic format check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address', error: 'Please enter a valid email address' };
  }

  // Length checks
  if (email.length > 254) {
    return { isValid: false, message: 'Email address is too long', error: 'Email address is too long' };
  }

  if (email.length < 5) {
    return { isValid: false, message: 'Email address is too short', error: 'Email address is too short' };
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
      return { isValid: false, message: 'Email contains invalid characters', error: 'Email contains invalid characters' };
    }
  }

  return { isValid: true, message: 'Email is valid' };
};

// Enhanced password validation with security requirements
export const validatePasswordComplexity = (password: string): { isValid: boolean; message: string; strength: number; errors?: string[] } => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required', strength: 0, errors: ['Password is required'] };
  }

  let strength = 0;
  const errors: string[] = [];
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
    errors.push('Password must be at least 8 characters long');
  }
  if (!checks.maxLength) {
    errors.push('Password must be less than 128 characters');
  }
  if (!checks.lowercase) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!checks.uppercase) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!checks.numbers) {
    errors.push('Password must contain at least one number');
  }
  if (!checks.noCommonPatterns) {
    errors.push('Password contains common patterns or repeated characters');
  }

  const strengthScore = strength * 14; // Convert to percentage
  let strengthMessage = 'Password is ';
  if (strengthScore >= 85) strengthMessage += 'very strong';
  else if (strengthScore >= 70) strengthMessage += 'strong';
  else if (strengthScore >= 55) strengthMessage += 'good';
  else strengthMessage += 'acceptable';

  return { 
    isValid: errors.length === 0, 
    message: errors.length > 0 ? errors[0] : strengthMessage,
    strength: strengthScore,
    errors: errors.length > 0 ? errors : undefined
  };
};

// Enhanced input sanitization
export const sanitizeInput = (input: string, options: {
  allowHtml?: boolean;
  maxLength?: number;
  stripScripts?: boolean;
  preserveLineBreaks?: boolean;
} = {}): string => {
  if (typeof input !== 'string') return '';

  const {
    allowHtml = false,
    maxLength = 10000,
    stripScripts = true,
    preserveLineBreaks = false
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

  // Handle line breaks
  if (!preserveLineBreaks) {
    sanitized = sanitized.replace(/\n/g, ' ').replace(/\r/g, '');
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

// Unified rate limiter class for more advanced use cases
export class UnifiedRateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number; resetTime: number }> = new Map();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 60000,
    private useExponentialBackoff: boolean = false
  ) {}

  canAttempt(identifier: string): { allowed: boolean; resetTime?: number; backoffTime?: number } {
    const now = Date.now();
    const record = this.attempts.get(identifier);
    
    if (!record) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now, resetTime: now + this.windowMs });
      return { allowed: true };
    }
    
    if (now >= record.resetTime) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now, resetTime: now + this.windowMs });
      return { allowed: true };
    }
    
    if (record.count >= this.maxAttempts) {
      const backoffTime = this.useExponentialBackoff 
        ? Math.min(this.windowMs * Math.pow(2, record.count - this.maxAttempts), 300000) // Max 5 minutes
        : this.windowMs;
      
      return { 
        allowed: false, 
        resetTime: record.resetTime,
        backoffTime: backoffTime
      };
    }
    
    this.attempts.set(identifier, { 
      ...record, 
      count: record.count + 1, 
      lastAttempt: now 
    });
    
    return { allowed: true };
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

// Auth-specific rate limiter
export const authRateLimiter = new RateLimiter(5, 300000); // 5 attempts per 5 minutes

// Contact-specific rate limiter
export const contactRateLimiter = new RateLimiter(3, 60000); // 3 attempts per minute

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

// URL validation
export const validateSecureUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const parsedUrl = new URL(url);
    const allowedProtocols = ['http:', 'https:'];
    return allowedProtocols.includes(parsedUrl.protocol) && parsedUrl.hostname.length > 0;
  } catch {
    // Try without protocol
    try {
      const withProtocol = url.startsWith('//') ? `https:${url}` : `https://${url}`;
      const parsedUrl = new URL(withProtocol);
      return parsedUrl.hostname.length > 0;
    } catch {
      return false;
    }
  }
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
