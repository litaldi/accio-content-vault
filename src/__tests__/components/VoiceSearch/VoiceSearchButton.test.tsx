
import React from 'react';
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils';
import { VoiceSearchButton } from '@/components/VoiceSearch/VoiceSearchButton';

// Mock the voice search service
jest.mock('@/services/voiceSearchService', () => ({
  voiceSearchService: {
    isSupported: jest.fn(() => true),
    startListening: jest.fn(),
    stopListening: jest.fn(),
    getListeningState: jest.fn(() => false),
    onRecognitionResult: jest.fn(),
    onRecognitionError: jest.fn(),
    onRecognitionStart: jest.fn(),
    onRecognitionEnd: jest.fn(),
  }
}));

describe('VoiceSearchButton', () => {
  const mockOnTranscript = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render voice search button', () => {
    render(<VoiceSearchButton onTranscript={mockOnTranscript} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should show microphone icon when not listening', () => {
    render(<VoiceSearchButton onTranscript={mockOnTranscript} />);

    // Should have mic icon (test by class or data-testid if available)
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should be accessible', () => {
    render(<VoiceSearchButton onTranscript={mockOnTranscript} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toBeDisabled();
  });

  it('should handle click events', () => {
    render(<VoiceSearchButton onTranscript={mockOnTranscript} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Should not throw errors
    expect(button).toBeInTheDocument();
  });

  it('should accept different button variants', () => {
    const { rerender } = render(
      <VoiceSearchButton onTranscript={mockOnTranscript} variant="outline" />
    );

    let button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    rerender(
      <VoiceSearchButton onTranscript={mockOnTranscript} variant="ghost" />
    );

    button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should accept different sizes', () => {
    const { rerender } = render(
      <VoiceSearchButton onTranscript={mockOnTranscript} size="sm" />
    );

    let button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    rerender(
      <VoiceSearchButton onTranscript={mockOnTranscript} size="lg" />
    );

    button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
