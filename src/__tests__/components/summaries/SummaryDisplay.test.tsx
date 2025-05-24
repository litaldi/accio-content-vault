
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@/__tests__/utils/test-utils';
import { SummaryDisplay } from '@/components/summaries/SummaryDisplay';
import { SummaryService } from '@/services/summaryService';

// Mock the SummaryService
jest.mock('@/services/summaryService');

const mockSummaryService = SummaryService as jest.Mocked<typeof SummaryService>;

describe('SummaryDisplay', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    contentId: 'content-123',
    contentText: 'This is test content for displaying summary'
  };

  const mockSummary = {
    id: 'summary-123',
    content_id: 'content-123',
    summary_text: 'This is a test summary of the content.',
    summary_type: 'auto' as const,
    confidence_score: 0.85,
    word_count: 8,
    generated_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  };

  it('should render empty state when no summary exists', async () => {
    mockSummaryService.getSummary.mockResolvedValue(null);

    render(<SummaryDisplay {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText(/no summary available/i)).toBeInTheDocument();
    });

    expect(screen.getByText('Generate Summary')).toBeInTheDocument();
  });

  it('should display existing summary', async () => {
    mockSummaryService.getSummary.mockResolvedValue(mockSummary);

    render(<SummaryDisplay {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('This is a test summary of the content.')).toBeInTheDocument();
    });

    expect(screen.getByText('8 words')).toBeInTheDocument();
    expect(screen.getByText('Confidence: 85%')).toBeInTheDocument();
  });

  it('should handle loading state', () => {
    mockSummaryService.getSummary.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(mockSummary), 100))
    );

    render(<SummaryDisplay {...defaultProps} />);

    expect(screen.getByText('Loading summary...')).toBeInTheDocument();
  });

  it('should refresh summary when generate button is clicked', async () => {
    mockSummaryService.getSummary
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(mockSummary);

    mockSummaryService.generateSummary.mockResolvedValue(mockSummary);

    render(<SummaryDisplay {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('Generate Summary')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Generate Summary'));

    await waitFor(() => {
      expect(screen.getByText('This is a test summary of the content.')).toBeInTheDocument();
    });
  });

  it('should handle summary generation errors gracefully', async () => {
    mockSummaryService.getSummary.mockResolvedValue(null);
    mockSummaryService.generateSummary.mockRejectedValue(new Error('Generation failed'));

    render(<SummaryDisplay {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('Generate Summary')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Generate Summary'));

    // Should still show the generate button after error
    await waitFor(() => {
      expect(screen.getByText('Generate Summary')).toBeInTheDocument();
    });
  });
});
