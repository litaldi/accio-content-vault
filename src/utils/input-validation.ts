
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

interface RateLimitResult {
  allowed: boolean;
  resetTime?: number;
}

export const createRateLimit = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, { count: number; resetTime: number }>();
  
  return (identifier: string): RateLimitResult => {
    const now = Date.now();
    const entry = attempts.get(identifier);
    
    if (!entry || now > entry.resetTime) {
      attempts.set(identifier, { count: 1, resetTime: now + windowMs });
      return { allowed: true };
    }
    
    if (entry.count >= maxAttempts) {
      return { allowed: false, resetTime: entry.resetTime };
    }
    
    entry.count++;
    return { allowed: true };
  };
};
