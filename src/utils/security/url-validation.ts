
/**
 * URL Validation with Security
 */

import { sanitizeInput } from './input-validation';
import type { ValidationResult } from './input-validation';

export const validateUrlSecure = (url: string): ValidationResult => {
  if (!url || typeof url !== 'string') {
    return { isValid: false, message: 'URL is required' };
  }
  
  const sanitizedUrl = sanitizeInput(url);
  
  try {
    const urlObj = new URL(sanitizedUrl.startsWith('http') ? sanitizedUrl : `https://${sanitizedUrl}`);
    
    // Check for dangerous protocols
    const allowedProtocols = ['http:', 'https:'];
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return { isValid: false, message: 'Only HTTP and HTTPS URLs are allowed' };
    }
    
    // Check for suspicious patterns
    if (urlObj.hostname.includes('javascript') || urlObj.hostname.includes('data')) {
      return { isValid: false, message: 'URL contains suspicious content' };
    }
    
    return { isValid: true, message: 'Valid URL', sanitizedValue: urlObj.toString() };
  } catch {
    return { isValid: false, message: 'Please enter a valid URL' };
  }
};
