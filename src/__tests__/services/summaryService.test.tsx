
import { SummaryService } from '@/services/summaryService';
import { supabase } from '@/integrations/supabase/client';

// Mock Supabase
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: jest.fn(),
    functions: {
      invoke: jest.fn()
    }
  }
}));

const mockSupabase = supabase as jest.Mocked<typeof supabase>;

describe('SummaryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateSummary', () => {
    it('should generate summary successfully', async () => {
      const mockResponse = {
        id: 'summary-123',
        content_id: 'content-123',
        summary_text: 'This is a test summary',
        summary_type: 'auto',
        confidence_score: 0.85,
        word_count: 5,
        generated_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      };

      mockSupabase.functions.invoke.mockResolvedValue({
        data: mockResponse,
        error: null
      });

      const result = await SummaryService.generateSummary('content-123', 'Test content', 'medium');

      expect(mockSupabase.functions.invoke).toHaveBeenCalledWith('generate-summary', {
        body: {
          contentId: 'content-123',
          text: 'Test content',
          summaryType: 'medium'
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors during generation', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: null,
        error: new Error('API Error')
      });

      await expect(
        SummaryService.generateSummary('content-123', 'Test content')
      ).rejects.toThrow('Failed to generate summary');
    });
  });

  describe('getSummary', () => {
    it('should fetch existing summary', async () => {
      const mockSummary = {
        id: 'summary-123',
        content_id: 'content-123',
        summary_text: 'Existing summary',
        summary_type: 'auto',
        confidence_score: 0.90,
        word_count: 2,
        generated_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      };

      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        maybeSingle: jest.fn().mockResolvedValue({ data: mockSummary, error: null })
      };

      mockSupabase.from.mockReturnValue(mockQuery as any);

      const result = await SummaryService.getSummary('content-123');

      expect(result).toEqual({
        ...mockSummary,
        summary_type: 'auto'
      });
    });

    it('should return null when no summary exists', async () => {
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        maybeSingle: jest.fn().mockResolvedValue({ data: null, error: null })
      };

      mockSupabase.from.mockReturnValue(mockQuery as any);

      const result = await SummaryService.getSummary('content-123');

      expect(result).toBeNull();
    });
  });

  describe('hasSummary', () => {
    it('should return true when summary exists', async () => {
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({ data: [{ id: 'summary-123' }], error: null })
      };

      mockSupabase.from.mockReturnValue(mockQuery as any);

      const result = await SummaryService.hasSummary('content-123');

      expect(result).toBe(true);
    });

    it('should return false when no summary exists', async () => {
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({ data: [], error: null })
      };

      mockSupabase.from.mockReturnValue(mockQuery as any);

      const result = await SummaryService.hasSummary('content-123');

      expect(result).toBe(false);
    });
  });
});
