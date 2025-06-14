
import { 
  validateEmail, 
  validatePassword, 
  sanitizeInput,
  UnifiedRateLimiter,
  CSRFManager 
} from '@/utils/security';

describe('Security Utilities', () => {
  describe('validateEmail', () => {
    test('validates correct email', () => {
      const result = validateEmail('test@example.com');
      expect(result.isValid).toBe(true);
    });

    test('rejects invalid email', () => {
      const result = validateEmail('invalid-email');
      expect(result.isValid).toBe(false);
    });

    test('rejects email with spaces', () => {
      const result = validateEmail('test @example.com');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validatePassword', () => {
    test('validates strong password', () => {
      const result = validatePassword('StrongPass123!');
      expect(result.isValid).toBe(true);
      expect(result.strength).toBeGreaterThan(80);
    });

    test('rejects weak password', () => {
      const result = validatePassword('weak');
      expect(result.isValid).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    test('removes script tags', () => {
      const result = sanitizeInput('<script>alert("xss")</script>Hello');
      expect(result).toBe('Hello');
    });

    test('respects max length', () => {
      const longString = 'a'.repeat(2000);
      const result = sanitizeInput(longString, { maxLength: 100 });
      expect(result.length).toBe(100);
    });
  });

  describe('UnifiedRateLimiter', () => {
    test('allows requests within limit', () => {
      const limiter = new UnifiedRateLimiter(5, 60000);
      const result = limiter.canAttempt('test-key');
      expect(result.allowed).toBe(true);
    });

    test('blocks requests over limit', () => {
      const limiter = new UnifiedRateLimiter(2, 60000);
      limiter.canAttempt('test-key');
      limiter.canAttempt('test-key');
      const result = limiter.canAttempt('test-key');
      expect(result.allowed).toBe(false);
    });
  });

  describe('CSRFManager', () => {
    test('generates valid token', () => {
      const token = CSRFManager.generate();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    test('validates generated token', () => {
      const token = CSRFManager.generate();
      const isValid = CSRFManager.validate(token);
      expect(isValid).toBe(true);
    });

    test('consumes token correctly', () => {
      const token = CSRFManager.generate();
      const consumed = CSRFManager.consume(token);
      expect(consumed).toBe(true);
      
      // Token should no longer be valid after consumption
      const stillValid = CSRFManager.validate(token);
      expect(stillValid).toBe(false);
    });
  });
});
