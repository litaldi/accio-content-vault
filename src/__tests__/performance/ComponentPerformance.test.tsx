
import React from 'react';
import { render, screen } from '@/__tests__/utils/test-utils';
import { performanceUtils } from '@/utils/performance';
import { SummaryDisplay } from '@/components/summaries/SummaryDisplay';

// Mock performance measurement
jest.mock('@/utils/performance', () => ({
  performanceUtils: {
    measureRender: jest.fn(),
    measureFunction: jest.fn(),
  }
}));

describe('Component Performance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should measure render performance for SummaryDisplay', () => {
    const mockMeasureRender = performanceUtils.measureRender as jest.Mock;
    
    render(
      <SummaryDisplay 
        contentId="test-content" 
        contentText="Test content for performance measurement"
      />
    );

    // Verify that performance measurement was called
    expect(mockMeasureRender).toHaveBeenCalled();
  });

  it('should render large lists efficiently', () => {
    const startTime = Date.now();
    
    const largeDataSet = Array.from({ length: 1000 }, (_, i) => ({
      id: `item-${i}`,
      name: `Item ${i}`,
      description: `Description for item ${i}`
    }));

    render(
      <div>
        {largeDataSet.slice(0, 100).map(item => (
          <div key={item.id} data-testid="list-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    );

    const endTime = Date.now();
    const renderTime = endTime - startTime;

    // Rendering 100 items should be fast (< 100ms)
    expect(renderTime).toBeLessThan(100);
    
    // Verify items are rendered
    const items = screen.getAllByTestId('list-item');
    expect(items).toHaveLength(100);
  });

  it('should handle frequent re-renders efficiently', () => {
    let renderCount = 0;
    
    const TestComponent = ({ value }: { value: number }) => {
      renderCount++;
      return <div data-testid="render-count">{value}</div>;
    };

    const { rerender } = render(<TestComponent value={1} />);

    // Trigger multiple re-renders
    for (let i = 2; i <= 10; i++) {
      rerender(<TestComponent value={i} />);
    }

    expect(renderCount).toBe(10);
    expect(screen.getByTestId('render-count')).toHaveTextContent('10');
  });
});
