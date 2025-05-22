
import { renderHook } from '@testing-library/react';
import { useLazyLoad } from '@/hooks/use-lazy-load';

describe('useLazyLoad', () => {
  // Mock IntersectionObserver
  const mockObserve = jest.fn();
  const mockUnobserve = jest.fn();
  const mockDisconnect = jest.fn();
  
  beforeEach(() => {
    // Reset mocks before each test
    mockObserve.mockReset();
    mockUnobserve.mockReset();
    mockDisconnect.mockReset();
    
    // Mock the IntersectionObserver implementation
    (global as any).IntersectionObserver = jest.fn().mockImplementation((callback) => {
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
        // Helper to simulate intersection
        simulateIntersection: (isIntersecting: boolean) => {
          callback([{ isIntersecting }], {} as IntersectionObserver);
        },
      };
    });
  });

  afterEach(() => {
    // Cleanup after tests
    jest.clearAllMocks();
  });

  it('should start with inView as false', () => {
    const { result } = renderHook(() => useLazyLoad());
    expect(result.current.inView).toBe(false);
  });

  it('should set inView to true when element is intersecting', () => {
    const { result } = renderHook(() => useLazyLoad());
    
    // Get the observer instance
    const observer = (global as any).IntersectionObserver.mock.instances[0];
    
    // Simulate intersection
    observer.simulateIntersection(true);
    
    // Check if inView is updated
    expect(result.current.inView).toBe(true);
  });

  it('should call onInView callback when element comes into view', () => {
    const onInViewMock = jest.fn();
    const { result } = renderHook(() => useLazyLoad({ onInView: onInViewMock }));
    
    // Get the observer instance
    const observer = (global as any).IntersectionObserver.mock.instances[0];
    
    // Simulate intersection
    observer.simulateIntersection(true);
    
    // Check if callback was called
    expect(onInViewMock).toHaveBeenCalledTimes(1);
  });

  it('should unobserve element after it comes into view', () => {
    const { result } = renderHook(() => useLazyLoad());
    
    // Manually set a ref to test unobserve
    const mockElement = document.createElement('div');
    (result.current.ref as any).current = mockElement;
    
    // Get the observer instance
    const observer = (global as any).IntersectionObserver.mock.instances[0];
    
    // Simulate intersection
    observer.simulateIntersection(true);
    
    // Check if unobserve was called
    expect(mockUnobserve).toHaveBeenCalledWith(mockElement);
  });

  it('should set inView to true when IntersectionObserver is not supported', () => {
    // Delete IntersectionObserver from window
    const originalIntersectionObserver = window.IntersectionObserver;
    delete (window as any).IntersectionObserver;
    
    // Mock console.warn to prevent output during tests
    const originalConsoleWarn = console.warn;
    console.warn = jest.fn();
    
    const { result } = renderHook(() => useLazyLoad());
    
    // Check if inView is true
    expect(result.current.inView).toBe(true);
    expect(console.warn).toHaveBeenCalledWith('IntersectionObserver not supported, lazy loading disabled');
    
    // Restore IntersectionObserver and console.warn
    (window as any).IntersectionObserver = originalIntersectionObserver;
    console.warn = originalConsoleWarn;
  });

  it('should set inView to true when enabled is false', () => {
    const { result } = renderHook(() => useLazyLoad({ enabled: false }));
    expect(result.current.inView).toBe(true);
  });

  it('should disconnect observer on unmount', () => {
    const { unmount } = renderHook(() => useLazyLoad());
    
    unmount();
    
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
