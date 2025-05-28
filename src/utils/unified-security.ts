
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
