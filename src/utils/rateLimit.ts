
/**
 * Client-side rate limiting utilities
 */

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs?: number;
}

class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private blocked: Map<string, number> = new Map();

  constructor(private config: RateLimitConfig) {}

  isAllowed(key: string): boolean {
    const now = Date.now();
    
    // Check if currently blocked
    const blockedUntil = this.blocked.get(key);
    if (blockedUntil && now < blockedUntil) {
      return false;
    }

    // Clean up expired block
    if (blockedUntil && now >= blockedUntil) {
      this.blocked.delete(key);
    }

    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < this.config.windowMs);
    
    if (validAttempts.length >= this.config.maxAttempts) {
      // Block the key if blockDuration is specified
      if (this.config.blockDurationMs) {
        this.blocked.set(key, now + this.config.blockDurationMs);
      }
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    return true;
  }
  
  reset(key: string): void {
    this.attempts.delete(key);
    this.blocked.delete(key);
  }

  getRemainingAttempts(key: string): number {
    const attempts = this.attempts.get(key) || [];
    const now = Date.now();
    const validAttempts = attempts.filter(time => now - time < this.config.windowMs);
    return Math.max(0, this.config.maxAttempts - validAttempts.length);
  }

  getTimeUntilReset(key: string): number {
    const attempts = this.attempts.get(key) || [];
    if (attempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...attempts);
    const resetTime = oldestAttempt + this.config.windowMs;
    return Math.max(0, resetTime - Date.now());
  }
}

// Pre-configured rate limiters for common use cases
export const apiRateLimiter = new RateLimiter({
  maxAttempts: 10,
  windowMs: 60000, // 1 minute
  blockDurationMs: 300000 // 5 minutes
});

export const authRateLimiter = new RateLimiter({
  maxAttempts: 5,
  windowMs: 300000, // 5 minutes
  blockDurationMs: 900000 // 15 minutes
});

export const searchRateLimiter = new RateLimiter({
  maxAttempts: 30,
  windowMs: 60000 // 1 minute
});

// Rate limit decorator for functions
export function rateLimit(limiter: RateLimiter, keyFn: (...args: any[]) => string) {
  return function <T extends (...args: any[]) => any>(
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<T>
  ) {
    const method = descriptor.value!;

    descriptor.value = ((...args: any[]) => {
      const key = keyFn(...args);
      
      if (!limiter.isAllowed(key)) {
        const remaining = limiter.getRemainingAttempts(key);
        const resetTime = limiter.getTimeUntilReset(key);
        
        throw new Error(
          `Rate limit exceeded. ${remaining} attempts remaining. Try again in ${Math.ceil(resetTime / 1000)} seconds.`
        );
      }
      
      return method.apply(target, args);
    }) as T;
  };
}

// Usage example with async functions
export const withRateLimit = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  limiter: RateLimiter,
  keyFn: (...args: Parameters<T>) => string
): T => {
  return (async (...args: Parameters<T>) => {
    const key = keyFn(...args);
    
    if (!limiter.isAllowed(key)) {
      const remaining = limiter.getRemainingAttempts(key);
      const resetTime = limiter.getTimeUntilReset(key);
      
      throw new Error(
        `Rate limit exceeded. ${remaining} attempts remaining. Try again in ${Math.ceil(resetTime / 1000)} seconds.`
      );
    }
    
    return await fn(...args);
  }) as T;
};

export { RateLimiter };
