
export const validateEmail = (email: string): { isValid: boolean; message: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  return {
    isValid,
    message: isValid ? 'Valid email' : 'Please enter a valid email address'
  };
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[]; message: string; strength: number } => {
  const errors: string[] = [];
  let strength = 0;
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else {
    strength += 20;
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  } else {
    strength += 20;
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  } else {
    strength += 20;
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  } else {
    strength += 20;
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  } else {
    strength += 20;
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    message: errors.length === 0 ? 'Password is strong' : errors.join(', '),
    strength
  };
};

export const generateCSRFToken = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
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
