
/**
 * CSRF Protection Utilities
 */

// CSRF Token Management
export class CSRFTokenManager {
  private static tokens = new Set<string>();
  private static readonly TOKEN_EXPIRY = 3600000; // 1 hour
  
  static generate(): string {
    const token = this.generateSecureToken(32);
    this.tokens.add(token);
    
    // Auto-cleanup after expiry
    setTimeout(() => {
      this.tokens.delete(token);
    }, this.TOKEN_EXPIRY);
    
    return token;
  }
  
  static validate(token: string): boolean {
    return this.tokens.has(token);
  }
  
  static consume(token: string): boolean {
    const isValid = this.tokens.has(token);
    if (isValid) {
      this.tokens.delete(token);
    }
    return isValid;
  }
  
  private static generateSecureToken(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
