
import { renderHook, act } from '@testing-library/react';
import { useVoiceSearch } from '@/hooks/useVoiceSearch';

// Mock the voice search service
const mockVoiceSearchService = {
  isSupported: jest.fn(() => true),
  startListening: jest.fn(),
  stopListening: jest.fn(),
  getListeningState: jest.fn(() => false),
  onRecognitionResult: jest.fn(),
  onRecognitionError: jest.fn(),
  onRecognitionStart: jest.fn(),
  onRecognitionEnd: jest.fn(),
};

jest.mock('@/services/voiceSearchService', () => ({
  voiceSearchService: mockVoiceSearchService
}));

describe('useVoiceSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const mockOnTranscript = jest.fn();
    const { result } = renderHook(() => useVoiceSearch({ onTranscript: mockOnTranscript }));

    expect(result.current.isListening).toBe(false);
    expect(result.current.isSupported).toBe(true);
  });

  it('should start listening when startListening is called', () => {
    const mockOnTranscript = jest.fn();
    const { result } = renderHook(() => useVoiceSearch({ onTranscript: mockOnTranscript }));

    act(() => {
      result.current.startListening();
    });

    expect(mockVoiceSearchService.startListening).toHaveBeenCalled();
  });

  it('should stop listening when stopListening is called', () => {
    const mockOnTranscript = jest.fn();
    const { result } = renderHook(() => useVoiceSearch({ onTranscript: mockOnTranscript }));

    act(() => {
      result.current.stopListening();
    });

    expect(mockVoiceSearchService.stopListening).toHaveBeenCalled();
  });

  it('should toggle listening state', () => {
    const mockOnTranscript = jest.fn();
    mockVoiceSearchService.getListeningState
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    const { result } = renderHook(() => useVoiceSearch({ onTranscript: mockOnTranscript }));

    act(() => {
      result.current.toggleListening();
    });

    expect(mockVoiceSearchService.startListening).toHaveBeenCalled();

    act(() => {
      result.current.toggleListening();
    });

    expect(mockVoiceSearchService.stopListening).toHaveBeenCalled();
  });

  it('should handle unsupported browsers', () => {
    mockVoiceSearchService.isSupported.mockReturnValue(false);

    const mockOnTranscript = jest.fn();
    const { result } = renderHook(() => useVoiceSearch({ onTranscript: mockOnTranscript }));

    expect(result.current.isSupported).toBe(false);
  });

  it('should setup event listeners on mount', () => {
    const mockOnTranscript = jest.fn();
    renderHook(() => useVoiceSearch({ onTranscript: mockOnTranscript }));

    expect(mockVoiceSearchService.onRecognitionResult).toHaveBeenCalled();
    expect(mockVoiceSearchService.onRecognitionError).toHaveBeenCalled();
    expect(mockVoiceSearchService.onRecognitionStart).toHaveBeenCalled();
    expect(mockVoiceSearchService.onRecognitionEnd).toHaveBeenCalled();
  });
});
