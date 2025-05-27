
/**
 * Rate Limiting Security Utilities
 */

// Enhanced Rate Limiting
export class SecurityRateLimiter {
  private attempts: Map<string, { count: number; timestamps: number[]; blocked: boolean }> = new Map();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 60000,
    private blockDuration: number = 300000
  ) {}
  
  canAttempt(identifier: string): { allowed: boolean; remaining?: number; resetTime?: number } {
    const now = Date.now();
    const record = this.attempts.get(identifier) || { count: 0, timestamps: [], blocked: false };
    
    // Remove old attempts
    record.timestamps = record.timestamps.filter(time => now - time < this.windowMs);
    record.count = record.timestamps.length;
    
    // Check if currently blocked
    if (record.blocked) {
      const lastAttempt = Math.max(...record.timestamps);
      if (now - lastAttempt < this.blockDuration) {
        return { allowed: false, resetTime: lastAttempt + this.blockDuration };
      } else {
        record.blocked = false;
      }
    }
    
    if (record.count >= this.maxAttempts) {
      record.blocked = true;
      this.attempts.set(identifier, record);
      return { allowed: false, resetTime: now + this.blockDuration };
    }
    
    return { allowed: true, remaining: this.maxAttempts - record.count };
  }
  
  recordAttempt(identifier: string): void {
    const now = Date.now();
    const record = this.attempts.get(identifier) || { count: 0, timestamps: [], blocked: false };
    
    record.timestamps.push(now);
    record.count = record.timestamps.length;
    this.attempts.set(identifier, record);
  }
  
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

// Export rate limiters for different use cases
export const authRateLimiter = new SecurityRateLimiter(5, 60000, 300000);
export const apiRateLimiter = new SecurityRateLimiter(100, 60000, 60000);
export const contactRateLimiter = new SecurityRateLimiter(3, 300000, 900000);
