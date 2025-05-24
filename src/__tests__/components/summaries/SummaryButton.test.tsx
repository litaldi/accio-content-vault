
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@/utils/test-utils';
import { SummaryButton } from '@/components/summaries/SummaryButton';
import { SummaryService } from '@/services/summaryService';
import { useToast } from '@/hooks/use-toast';

// Mock dependencies
jest.mock('@/services/summaryService');
jest.mock('@/hooks/use-toast');

const mockSummaryService = SummaryService as jest.Mocked<typeof SummaryService>;
const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;

describe('SummaryButton', () => {
  const mockToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseToast.mockReturnValue({ toast: mockToast });
  });

  const defaultProps = {
    contentId: 'content-123',
    contentText: 'This is test content for summarization'
  };

  it('should render generate summary button initially', () => {
    mockSummaryService.hasSummary.mockResolvedValue(false);

    render(<SummaryButton {...defaultProps} />);

    expect(screen.getByText('Generate Summary')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should show regenerate text when summary exists', async () => {
    mockSummaryService.hasSummary.mockResolvedValue(true);

    render(<SummaryButton {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('Regenerate Summary')).toBeInTheDocument();
    });
  });

  it('should generate summary when clicked', async () => {
    mockSummaryService.hasSummary.mockResolvedValue(false);
    mockSummaryService.generateSummary.mockResolvedValue({
      id: 'summary-123',
      content_id: 'content-123',
      summary_text: 'Generated summary',
      summary_type: 'auto',
      generated_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    });

    const mockOnSummaryGenerated = jest.fn();

    render(
      <SummaryButton 
        {...defaultProps} 
        onSummaryGenerated={mockOnSummaryGenerated}
      />
    );

    const generateButton = screen.getByText('Generate Summary');
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(mockSummaryService.generateSummary).toHaveBeenCalledWith(
        'content-123',
        'This is test content for summarization',
        'medium'
      );
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Summary generated',
        description: 'AI has created a summary of your content.',
      });
    });

    expect(mockOnSummaryGenerated).toHaveBeenCalled();
  });

  it('should show error toast when content text is empty', async () => {
    render(<SummaryButton contentId="content-123" contentText="" />);

    const generateButton = screen.getByText('Generate Summary');
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'No content to summarize',
        description: 'This item does not have enough text content to generate a summary.',
        variant: 'destructive',
      });
    });
  });

  it('should handle generation errors', async () => {
    mockSummaryService.hasSummary.mockResolvedValue(false);
    mockSummaryService.generateSummary.mockRejectedValue(new Error('API Error'));

    render(<SummaryButton {...defaultProps} />);

    const generateButton = screen.getByText('Generate Summary');
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Error',
        description: 'Failed to generate summary. Please try again.',
        variant: 'destructive',
      });
    });
  });

  it('should show loading state during generation', async () => {
    mockSummaryService.hasSummary.mockResolvedValue(false);
    mockSummaryService.generateSummary.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );

    render(<SummaryButton {...defaultProps} />);

    const generateButton = screen.getByText('Generate Summary');
    fireEvent.click(generateButton);

    expect(screen.getByText('Generating...')).toBeInTheDocument();
    expect(generateButton).toBeDisabled();
  });

  it('should be accessible', async () => {
    render(<SummaryButton {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });
});
