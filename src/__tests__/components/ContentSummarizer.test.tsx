
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import { axe } from 'jest-axe';
import ContentSummarizer from '@/components/ContentSummarizer';
import { useToast } from '@/hooks/use-toast';

// Mock useToast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}));

describe('ContentSummarizer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock toast function
    (useToast as jest.Mock).mockReturnValue({
      toast: jest.fn(),
    });
  });

  it('renders with default state', () => {
    render(<ContentSummarizer text="Some content to summarize" />);
    
    // Check initial buttons are rendered
    expect(screen.getByRole('button', { name: /short/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /medium/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /long/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate summary/i })).toBeInTheDocument();
    
    // Summary should not be visible initially
    expect(screen.queryByText(/ai-generated summary/i)).not.toBeInTheDocument();
  });

  it('changes summary length when buttons are clicked', () => {
    render(<ContentSummarizer text="Some content to summarize" />);
    
    // By default medium is selected
    const mediumButton = screen.getByRole('button', { name: /medium/i });
    expect(mediumButton.className).toContain('default');
    
    // Click short button
    fireEvent.click(screen.getByRole('button', { name: /short/i }));
    expect(screen.getByRole('button', { name: /short/i }).className).toContain('default');
    expect(mediumButton.className).not.toContain('default');
  });

  it('shows loading state when generating a summary', async () => {
    // Mock timers to control the async delay
    jest.useFakeTimers();
    
    render(<ContentSummarizer text="Some content to summarize" />);
    
    // Click generate button
    fireEvent.click(screen.getByRole('button', { name: /generate summary/i }));
    
    // Check loading state
    expect(screen.getByText(/generating/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generating/i })).toBeDisabled();
    
    // Fast-forward timer to complete the generation
    jest.advanceTimersByTime(1500);
    
    await waitFor(() => {
      expect(screen.queryByText(/generating/i)).not.toBeInTheDocument();
    });
    
    jest.useRealTimers();
  });

  it('displays the generated summary', async () => {
    jest.useFakeTimers();
    
    render(<ContentSummarizer text="Some content to summarize" />);
    
    // Generate medium summary (default)
    fireEvent.click(screen.getByRole('button', { name: /generate summary/i }));
    
    // Fast-forward timer
    jest.advanceTimersByTime(1500);
    
    await waitFor(() => {
      expect(screen.getByText(/ai-generated summary/i)).toBeInTheDocument();
      // Check that medium-length summary appears
      expect(screen.getByText(/explores several important aspects/i)).toBeInTheDocument();
    });
    
    jest.useRealTimers();
  });

  it('generates different summary lengths based on selection', async () => {
    jest.useFakeTimers();
    
    render(<ContentSummarizer text="Some content to summarize" />);
    
    // Select short summary
    fireEvent.click(screen.getByRole('button', { name: /short/i }));
    fireEvent.click(screen.getByRole('button', { name: /generate summary/i }));
    
    jest.advanceTimersByTime(1500);
    
    await waitFor(() => {
      expect(screen.getByText(/discusses the main concepts/i)).toBeInTheDocument();
    });
    
    // Now try long summary
    fireEvent.click(screen.getByRole('button', { name: /long/i }));
    fireEvent.click(screen.getByRole('button', { name: /generate summary/i }));
    
    jest.advanceTimersByTime(1500);
    
    await waitFor(() => {
      expect(screen.getByText(/comprehensive content delves/i)).toBeInTheDocument();
    });
    
    jest.useRealTimers();
  });

  it('shows toast notification after successful generation', async () => {
    jest.useFakeTimers();
    
    const toastMock = jest.fn();
    (useToast as jest.Mock).mockReturnValue({
      toast: toastMock,
    });
    
    render(<ContentSummarizer text="Some content to summarize" />);
    
    fireEvent.click(screen.getByRole('button', { name: /generate summary/i }));
    jest.advanceTimersByTime(1500);
    
    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith({
        title: "Summary generated",
        description: "AI has created a summary of your content"
      });
    });
    
    jest.useRealTimers();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ContentSummarizer text="Some content to summarize" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
