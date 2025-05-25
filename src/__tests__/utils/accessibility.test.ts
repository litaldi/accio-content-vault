
import {
  announceToScreenReader,
  isFocusable,
  getFocusableElements,
  trapFocus,
  getContrastRatio,
  meetsContrastRequirement,
  generateId,
  handleArrowNavigation,
  createLiveRegion
} from '@/utils/accessibility';

describe('Accessibility Utils', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('announceToScreenReader', () => {
    it('should create and remove announcement element', () => {
      announceToScreenReader('Test announcement');
      
      const announcement = document.querySelector('[aria-live]');
      expect(announcement).toBeInTheDocument();
      expect(announcement).toHaveTextContent('Test announcement');
      
      setTimeout(() => {
        expect(document.querySelector('[aria-live]')).not.toBeInTheDocument();
      }, 1100);
    });

    it('should handle assertive announcements', () => {
      announceToScreenReader('Urgent message', 'assertive');
      
      const announcement = document.querySelector('[aria-live="assertive"]');
      expect(announcement).toBeInTheDocument();
    });
  });

  describe('isFocusable', () => {
    it('should identify focusable elements', () => {
      const button = document.createElement('button');
      const disabledButton = document.createElement('button');
      disabledButton.disabled = true;
      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      
      expect(isFocusable(button)).toBe(true);
      expect(isFocusable(disabledButton)).toBe(false);
      expect(isFocusable(hiddenInput)).toBe(false);
    });
  });

  describe('getFocusableElements', () => {
    it('should find all focusable elements in container', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <button>Button 1</button>
        <input type="text" />
        <a href="#test">Link</a>
        <button disabled>Disabled</button>
        <div tabindex="0">Focusable div</div>
      `;
      
      const focusableElements = getFocusableElements(container);
      expect(focusableElements).toHaveLength(4);
    });
  });

  describe('trapFocus', () => {
    it('should trap focus within container', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <button id="first">First</button>
        <button id="middle">Middle</button>
        <button id="last">Last</button>
      `;
      document.body.appendChild(container);
      
      const cleanup = trapFocus(container);
      
      expect(document.activeElement?.id).toBe('first');
      
      cleanup();
      document.body.removeChild(container);
    });
  });

  describe('getContrastRatio', () => {
    it('should calculate contrast ratio', () => {
      const ratio = getContrastRatio('#000000', '#ffffff');
      expect(ratio).toBeCloseTo(21, 0);
    });

    it('should handle same colors', () => {
      const ratio = getContrastRatio('#ffffff', '#ffffff');
      expect(ratio).toBeCloseTo(1, 0);
    });
  });

  describe('meetsContrastRequirement', () => {
    it('should validate WCAG AA compliance', () => {
      expect(meetsContrastRequirement('#000000', '#ffffff', 'AA')).toBe(true);
      expect(meetsContrastRequirement('#888888', '#ffffff', 'AA')).toBe(false);
    });

    it('should handle large text differently', () => {
      expect(meetsContrastRequirement('#767676', '#ffffff', 'AA', true)).toBe(true);
      expect(meetsContrastRequirement('#767676', '#ffffff', 'AA', false)).toBe(false);
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId('test');
      const id2 = generateId('test');
      
      expect(id1).toMatch(/^test-/);
      expect(id2).toMatch(/^test-/);
      expect(id1).not.toBe(id2);
    });
  });

  describe('handleArrowNavigation', () => {
    it('should handle vertical navigation', () => {
      const elements = [
        document.createElement('button'),
        document.createElement('button'),
        document.createElement('button')
      ];
      
      const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      const result = handleArrowNavigation(downEvent, elements, 0, 'vertical');
      
      expect(result).toBe(1);
    });

    it('should handle horizontal navigation', () => {
      const elements = [
        document.createElement('button'),
        document.createElement('button')
      ];
      
      const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      const result = handleArrowNavigation(rightEvent, elements, 0, 'horizontal');
      
      expect(result).toBe(1);
    });
  });

  describe('createLiveRegion', () => {
    it('should create properly configured live region', () => {
      const region = createLiveRegion('assertive');
      
      expect(region).toHaveAttribute('aria-live', 'assertive');
      expect(region).toHaveAttribute('aria-atomic', 'true');
      expect(region).toHaveClass('sr-only');
      expect(document.body.contains(region)).toBe(true);
    });
  });
});
