
import React from 'react';
import { render, screen, fireEvent } from '../utils/test-utils';
import { axe } from 'jest-axe';
import { ErrorFallback } from '@/components/ui/error-fallback';

describe('ErrorFallback', () => {
  const mockError = new Error('Test error message');
  const mockResetErrorBoundary = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the error message and buttons', () => {
    render(
      <ErrorFallback 
        error={mockError}
        resetErrorBoundary={mockResetErrorBoundary}
      />
    );

    expect(screen.getByText(/error occurred/i)).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /return home/i })).toBeInTheDocument();
  });

  it('calls resetErrorBoundary when Try Again button is clicked', () => {
    render(
      <ErrorFallback 
        error={mockError}
        resetErrorBoundary={mockResetErrorBoundary}
      />
    );

    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainButton);
    expect(mockResetErrorBoundary).toHaveBeenCalledTimes(1);
  });

  it('shows development error details only in development environment', () => {
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    
    render(
      <ErrorFallback 
        error={mockError}
        resetErrorBoundary={mockResetErrorBoundary}
      />
    );
    
    expect(screen.getByText(/error details/i)).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    
    // Restore environment
    process.env.NODE_ENV = originalNodeEnv;
  });

  it('renders custom description when provided', () => {
    const customDescription = "Custom error description";
    render(
      <ErrorFallback 
        error={mockError}
        resetErrorBoundary={mockResetErrorBoundary}
        description={customDescription}
      />
    );

    expect(screen.getByText(customDescription)).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ErrorFallback 
        error={mockError}
        resetErrorBoundary={mockResetErrorBoundary}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
