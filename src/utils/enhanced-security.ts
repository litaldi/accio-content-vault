/**
 * Enhanced security utilities with comprehensive validation and sanitization
 */

// Password complexity validation
export const validatePasswordComplexity = (password: string): {
  isValid: boolean;
  score: number;
  requirements: Array<{ met: boolean; text: string }>;
} => {
  const requirements = [
    { test: /.{8,}/, text: 'At least 8 characters long' },
    { test: /[a-z]/, text: 'Contains lowercase letter' },
    { test: /[A-Z]/, text: 'Contains uppercase letter' },
    { test: /\d/, text: 'Contains a number' },
    { test: /[!@#$%^&*(),.?":{}|<>]/, text: 'Contains special character' },
    { test: /^(?!.*(.)\1{2,})/, text: 'No more than 2 repeated characters' }
  ];

  const results = requirements.map(req => ({
    met: req.test.test(password),
    text: req.text
  }));

  const score = results.filter(r => r.met).length;
  const isValid = score >= 5; // Must meet at least 5 out of 6 requirements

  return { isValid, score, requirements: results };
};

// Phone number validation and formatting
export const validateAndFormatPhone = (phone: string): {
  isValid: boolean;
  formatted: string;
  error?: string;
} => {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Check if it starts with + for international format
  const isInternational = cleaned.startsWith('+');
  const digits = cleaned.replace('+', '');
  
  // Validate length (10-15 digits for international numbers)
  if (digits.length < 10 || digits.length > 15) {
    return {
      isValid: false,
      formatted: phone,
      error: 'Phone number must be between 10-15 digits'
    };
  }
  
  // Format for display
  let formatted = phone;
  if (digits.length === 10 && !isInternational) {
    // US format: (555) 123-4567
    formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (isInternational) {
    // Keep international format
    formatted = `+${digits}`;
  }
  
  return {
    isValid: true,
    formatted,
  };
};

// Enhanced email validation with domain checking
export const validateEmailEnhanced = (email: string): {
  isValid: boolean;
  error?: string;
  suggestion?: string;
} => {
  if (!email || email.length === 0) {
    return { isValid: false, error: 'Email is required' };
  }

  // Basic format check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  // Check for common typos in domains
  const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  const domain = email.split('@')[1]?.toLowerCase();
  
  const typoSuggestions: Record<string, string> = {
    'gmai.com': 'gmail.com',
    'gmial.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
    'outlok.com': 'outlook.com'
  };
  
  if (domain && typoSuggestions[domain]) {
    return {
      isValid: false,
      error: 'Did you mean this email address?',
      suggestion: email.replace(domain, typoSuggestions[domain])
    };
  }

  return { isValid: true };
};

// Content Security Policy for enhanced security
export const getEnhancedCSP = (): string => {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.gpteng.co",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests"
  ];
  
  return directives.join('; ');
};

// Input sanitization with XSS prevention
export const sanitizeInput = (input: string, options: {
  allowHtml?: boolean;
  maxLength?: number;
  stripScripts?: boolean;
  preserveLineBreaks?: boolean;
} = {}): string => {
  const {
    allowHtml = false,
    maxLength = 1000,
    stripScripts = true,
    preserveLineBreaks = false
  } = options;

  if (typeof input !== 'string') return '';

  let sanitized = input.trim().slice(0, maxLength);

  // Remove or escape HTML
  if (!allowHtml) {
    sanitized = sanitized.replace(/[<>"'&]/g, (match) => {
      const entities: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return entities[match] || match;
    });
  }

  // Strip dangerous scripts and event handlers
  if (stripScripts) {
    sanitized = sanitized
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }

  // Handle line breaks
  if (!preserveLineBreaks) {
    sanitized = sanitized.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ');
  }

  return sanitized;
};

// Rate limiting with exponential backoff
export class EnhancedRateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number; backoffUntil?: number }> = new Map();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 15 * 60 * 1000, // 15 minutes
    private enableBackoff: boolean = true
  ) {}
  
  canAttempt(identifier: string): { allowed: boolean; resetTime?: number; backoffTime?: number } {
    const now = Date.now();
    const record = this.attempts.get(identifier);
    
    if (!record) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return { allowed: true };
    }
    
    // Check if still in backoff period
    if (record.backoffUntil && now < record.backoffUntil) {
      return { 
        allowed: false, 
        backoffTime: record.backoffUntil - now
      };
    }
    
    // Reset if window has passed
    if (now - record.lastAttempt > this.windowMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return { allowed: true };
    }
    
    // Check if exceeded max attempts
    if (record.count >= this.maxAttempts) {
      if (this.enableBackoff) {
        // Exponential backoff: 2^(attempts-maxAttempts) minutes
        const backoffMinutes = Math.pow(2, record.count - this.maxAttempts);
        const backoffUntil = now + (backoffMinutes * 60 * 1000);
        
        this.attempts.set(identifier, {
          ...record,
          backoffUntil
        });
        
        return { 
          allowed: false, 
          resetTime: record.lastAttempt + this.windowMs,
          backoffTime: backoffUntil - now
        };
      }
      
      return { 
        allowed: false, 
        resetTime: record.lastAttempt + this.windowMs 
      };
    }
    
    // Increment counter
    this.attempts.set(identifier, { 
      count: record.count + 1, 
      lastAttempt: now 
    });
    
    return { allowed: true };
  }
  
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

// Secure random token generation
export const generateSecureToken = (length: number = 32): string => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  
  // Fallback for environments without crypto API
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// CSRF token management
export const CSRFManager = {
  tokenKey: 'csrf_token',
  
  generate(): string {
    const token = generateSecureToken(32);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(this.tokenKey, token);
    }
    return token;
  },
  
  get(): string | null {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(this.tokenKey);
    }
    return null;
  },
  
  validate(token: string): boolean {
    const stored = this.get();
    return stored !== null && stored === token;
  },
  
  clear(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(this.tokenKey);
    }
  }
};
