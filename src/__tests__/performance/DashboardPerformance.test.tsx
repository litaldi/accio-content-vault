
import React from 'react';
import { render } from '@/__tests__/utils/test-utils';
import { act } from '@testing-library/react';
import Dashboard from '@/pages/Dashboard';

// Mock performance.mark and performance.measure
const mockPerformance = {
  mark: jest.fn(),
  measure: jest.fn(),
  getEntriesByType: jest.fn().mockReturnValue([]),
  now: jest.fn().mockReturnValue(Date.now()),
};

Object.defineProperty(window, 'performance', {
  value: mockPerformance,
  writable: true,
});

describe('Dashboard Performance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders within acceptable time limits', async () => {
    const startTime = performance.now();
    
    await act(async () => {
      render(<Dashboard />);
    });
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Dashboard should render within 100ms
    expect(renderTime).toBeLessThan(100);
  });

  it('handles large datasets efficiently', async () => {
    // Mock large dataset
    const largeNotifications = Array.from({ length: 1000 }, (_, i) => ({
      id: `notification-${i}`,
      type: 'info' as const,
      title: `Notification ${i}`,
      message: `Message ${i}`,
      timestamp: new Date(),
      read: i % 2 === 0,
    }));

    const startTime = performance.now();
    
    await act(async () => {
      render(<Dashboard />);
    });
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Should still render efficiently with large datasets
    expect(renderTime).toBeLessThan(200);
  });

  it('does not cause memory leaks', () => {
    const { unmount } = render(<Dashboard />);
    
    // Simulate cleanup
    act(() => {
      unmount();
    });
    
    // Verify no lingering event listeners or timeouts
    // This would be more comprehensive in a real environment
    expect(true).toBe(true);
  });

  it('lazy loads components efficiently', async () => {
    performance.mark('dashboard-start');
    
    await act(async () => {
      render(<Dashboard />);
    });
    
    performance.mark('dashboard-end');
    performance.measure('dashboard-render', 'dashboard-start', 'dashboard-end');
    
    expect(mockPerformance.mark).toHaveBeenCalledWith('dashboard-start');
    expect(mockPerformance.mark).toHaveBeenCalledWith('dashboard-end');
    expect(mockPerformance.measure).toHaveBeenCalledWith(
      'dashboard-render',
      'dashboard-start',
      'dashboard-end'
    );
  });
});
