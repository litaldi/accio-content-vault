
/**
 * Input Validation and Sanitization Utilities
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
