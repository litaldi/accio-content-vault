
import { debounce, throttle, measurePerformance } from '@/utils/performance';

describe('Performance Utilities', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(performance, 'now').mockImplementation(() => Date.now());
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('debounce', () => {
    it('should only call the function after the delay', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 500);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(300);
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(200);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should reset the timer when called again', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 500);

      debouncedFn();
      jest.advanceTimersByTime(400);
      
      // Call again before the first call executes
      debouncedFn();
      jest.advanceTimersByTime(400);
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should pass arguments to the original function', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 500);

      debouncedFn('test', 123);
      jest.advanceTimersByTime(500);

      expect(mockFn).toHaveBeenCalledWith('test', 123);
    });
  });

  describe('throttle', () => {
    it('should only call the function once within the throttle period', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 500);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      // Call again within the throttle period
      throttledFn();
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      // Advance time and call again
      jest.advanceTimersByTime(500);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should pass arguments to the original function', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 500);

      throttledFn('test', 123);
      expect(mockFn).toHaveBeenCalledWith('test', 123);
    });
  });

  describe('measurePerformance', () => {
    it('should measure and log performance time', () => {
      const mockFn = jest.fn(() => 'result');
      const startTime = 1000;
      const endTime = 1050;
      
      // Mock performance.now to return specific values for start and end time
      (performance.now as jest.Mock)
        .mockReturnValueOnce(startTime)
        .mockReturnValueOnce(endTime);

      const result = measurePerformance('Test Operation', mockFn);

      expect(result).toBe('result');
      expect(mockFn).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Performance [Test Operation]'));
    });

    it('should return the function result', () => {
      const mockFn = jest.fn(() => ({ test: 'data' }));
      const result = measurePerformance('Test', mockFn);
      expect(result).toEqual({ test: 'data' });
    });
  });
});
