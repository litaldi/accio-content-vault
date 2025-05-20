
/**
 * Security utilities for input sanitization and validation
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
  const dangerousTags = ['script', 'iframe', 'object', 'embed', 'form'];
  const dangerousAttrs = ['onerror', 'onload', 'onclick', 'onmouseover', 'onmouseout', 'onkeydown', 'onkeypress'];
  
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
    dangerousAttrs.forEach(attr => {
      if (elem.hasAttribute(attr)) {
        elem.removeAttribute(attr);
      }
    });
    
    // Sanitize URLs in attributes
    ['href', 'src'].forEach(urlAttr => {
      if (elem.hasAttribute(urlAttr)) {
        const url = elem.getAttribute(urlAttr);
        if (url && (url.startsWith('javascript:') || url.startsWith('data:'))) {
          elem.removeAttribute(urlAttr);
        }
      }
    });
  }
  
  return doc.body.innerHTML;
}

/**
 * Validates an email address
 * @param email Email address to validate
 * @returns Boolean indicating if the email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a password meets minimum security requirements
 * @param password Password to validate
 * @returns Object containing validation status and any error messages
 */
export function validatePassword(password: string): { isValid: boolean; message?: string } {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  if (!/[^A-Za-z0-9]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one special character' };
  }
  
  return { isValid: true };
}

/**
 * Generates a secure CSRF token
 * @returns A random token for CSRF protection
 */
export function generateCSRFToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Sets a CSRF token in session storage and returns it
 * @returns CSRF token for form submission
 */
export function getCSRFToken(): string {
  let token = sessionStorage.getItem('csrf-token');
  
  if (!token) {
    token = generateCSRFToken();
    sessionStorage.setItem('csrf-token', token);
  }
  
  return token;
}

/**
 * Validates a CSRF token against the one in session storage
 * @param token Token to validate
 * @returns Boolean indicating if the token is valid
 */
export function validateCSRFToken(token: string): boolean {
  const storedToken = sessionStorage.getItem('csrf-token');
  return token === storedToken;
}
