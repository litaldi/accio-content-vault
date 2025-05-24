
/**
 * Security utilities for protecting against common web vulnerabilities
 */

// CSRF token management
export const generateCSRFToken = (): string => {
  return crypto.randomUUID();
};

// Content Security Policy helpers
export const cspNonce = (): string => {
  return btoa(crypto.randomUUID());
};

// Safe URL validation for external links
export const isSafeExternalUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    
    // Block dangerous protocols
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
    if (dangerousProtocols.some(protocol => 
      urlObj.protocol.toLowerCase().startsWith(protocol))) {
      return false;
    }
    
    // Only allow http and https
    return ['http:', 'https:'].includes(urlObj.protocol.toLowerCase());
  } catch {
    return false;
  }
};

// Sanitize user input for display
export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Rate limiting helper (client-side)
export class ClientRateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  constructor(private maxAttempts: number = 5, private windowMs: number = 60000) {}
  
  isAllowed(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    return true;
  }
  
  reset(key: string): void {
    this.attempts.delete(key);
  }
}
