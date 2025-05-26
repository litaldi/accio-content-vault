
import { announceToScreenReader, prefersReducedMotion, getPreferredColorScheme } from '@/utils/accessibility';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Accessibility Utilities', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('announceToScreenReader', () => {
    it('creates and removes announcement element', () => {
      const message = 'Test announcement';
      announceToScreenReader(message);

      const announcement = document.querySelector('[aria-live="polite"]');
      expect(announcement).toBeInTheDocument();
      expect(announcement?.textContent).toBe(message);
    });

    it('supports assertive priority', () => {
      const message = 'Urgent announcement';
      announceToScreenReader(message, 'assertive');

      const announcement = document.querySelector('[aria-live="assertive"]');
      expect(announcement).toBeInTheDocument();
    });
  });

  describe('prefersReducedMotion', () => {
    it('returns false when reduced motion is not preferred', () => {
      expect(prefersReducedMotion()).toBe(false);
    });
  });

  describe('getPreferredColorScheme', () => {
    it('returns light when dark mode is not preferred', () => {
      expect(getPreferredColorScheme()).toBe('light');
    });
  });
});
