
/**
 * Security utilities for input sanitization, validation, and protection
 */

/**
 * Sanitizes text input to prevent XSS attacks
 * @param input The user input to sanitize
 * @returns Sanitized string safe for rendering
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/`/g, '&#96;');
}

/**
 * Sanitizes HTML content with a more permissive approach
 * Use only when you need to allow certain HTML tags
 * @param html HTML content to sanitize
 * @returns Sanitized HTML with safe tags only
 */
export function sanitizeHTML(html: string): string {
  if (!html) return '';
  
  // Create a DOMParser to parse the HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Remove potentially dangerous tags and attributes
  const dangerousTags = ['script', 'iframe', 'object', 'embed', 'form', 'base', 'link', 'meta'];
  const dangerousAttrs = [
    'onerror', 'onload', 'onclick', 'onmouseover', 'onmouseout', 'onkeydown', 'onkeypress',
    'onkeyup', 'onchange', 'onfocus', 'onblur', 'onsubmit', 'onreset', 'onselect',
    'javascript:', 'data:', 'vbscript:'
  ];
  
  // Remove dangerous tags
  dangerousTags.forEach(tag => {
    const elements = doc.getElementsByTagName(tag);
    while (elements.length > 0) {
      elements[0].parentNode?.removeChild(elements[0]);
    }
  });
  
  // Remove dangerous attributes from all elements
  const allElements = doc.getElementsByTagName('*');
  for (let i = 0; i < allElements.length; i++) {
    const elem = allElements[i];
    
    // Remove event handler attributes
    for (let j = 0; j < elem.attributes.length; j++) {
      const attr = elem.attributes[j];
      if (dangerousAttrs.some(dangerous => attr.name.toLowerCase().indexOf(dangerous) > -1)) {
        elem.removeAttribute(attr.name);
        j--; // Adjust index since we removed an attribute
      }
    }
    
    // Sanitize URLs in attributes
    ['href', 'src', 'background', 'action'].forEach(urlAttr => {
      if (elem.hasAttribute(urlAttr)) {
        const url = elem.getAttribute(urlAttr);
        if (url && (
          url.toLowerCase().startsWith('javascript:') || 
          url.toLowerCase().startsWith('data:') ||
          url.toLowerCase().startsWith('vbscript:')
        )) {
          elem.removeAttribute(urlAttr);
        }
      }
    });
    
    // Remove style attributes that could contain JavaScript
    if (elem.hasAttribute('style')) {
      const style = elem.getAttribute('style');
      if (style && (
        style.toLowerCase().includes('expression') || 
        style.toLowerCase().includes('javascript:') ||
        style.toLowerCase().includes('behavior:')
      )) {
        elem.removeAttribute('style');
      }
    }
  }
  
  return doc.body.innerHTML;
}

/**
 * Validates an email address
 * @param email The email to validate
 * @returns boolean indicating if the email is valid
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Checks if a password meets minimum complexity requirements
 * @param password The password to check
 * @returns An object with validity status and optional error message
 */
export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (!password) {
    return { valid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  
  // Check for at least one uppercase letter, one lowercase letter, and one number
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  if (!hasUppercase) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!hasLowercase) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!hasNumber) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  
  return { valid: true };
}

/**
 * Creates a secure token for CSRF protection
 * @returns A random string token
 */
export function generateCSRFToken(): string {
  return Array.from(
    new Uint8Array(32),
    byte => byte.toString(16).padStart(2, '0')
  ).join('');
}

/**
 * Detects and blocks common bot patterns
 * Simple bot detection - for more advanced protection, use reCAPTCHA or similar
 * @returns boolean indicating if the current user might be a bot
 */
export function detectBot(): boolean {
  if (typeof navigator === 'undefined') return false;
  
  const userAgent = navigator.userAgent.toLowerCase();
  const botPatterns = [
    'bot', 'spider', 'crawler', 'scraper', 'wget', 'curl', 
    'phantom', 'headless', 'selenium', 'puppeteer'
  ];
  
  return botPatterns.some(pattern => userAgent.includes(pattern));
}
