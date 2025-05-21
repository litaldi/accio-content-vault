
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock matchMedia
function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // Mock window.innerWidth
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    value: matches ? 500 : 1024,
  });
}

describe('useIsMobile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when screen width is less than 768px', () => {
    mockMatchMedia(true);
    
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should return false when screen width is 768px or more', () => {
    mockMatchMedia(false);
    
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should handle window resize events', () => {
    // Start with desktop
    mockMatchMedia(false);
    const { result, rerender } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
    
    // Simulate resize to mobile
    mockMatchMedia(true);
    
    // Simulate a resize event
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    
    rerender();
    expect(result.current).toBe(true);
  });
});
