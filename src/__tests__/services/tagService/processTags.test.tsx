
import { renderHook, act } from '@testing-library/react';
import { useTagService } from '@/services/tagService';
import { setupMocks, mockSupabase, sampleTags, mockRequireAuth } from '../__setup__';

describe('useTagService - processTags', () => {
  beforeEach(() => {
    setupMocks();
  });

  it('should return empty array if not authenticated', async () => {
    mockRequireAuth.mockReturnValueOnce(false);
    
    const { result } = renderHook(() => useTagService());
    
    let processedTags;
    await act(async () => {
      processedTags = await result.current.processTags(sampleTags, 'content-1');
    });
    
    expect(processedTags).toEqual([]);
    expect(mockSupabase.from).not.toHaveBeenCalled();
  });

  it('should process tags for existing and new tags', async () => {
    // Mock scenario where first tag exists and second needs to be created
    const mockEqFn = jest.fn();
    mockEqFn
      .mockResolvedValueOnce({ data: [{ id: 'tag1', name: 'react', auto_generated: false }], error: null })
      .mockResolvedValueOnce({ data: [], error: null });
      
    mockSupabase.select.mockImplementation(() => ({
      eq: mockEqFn
    }));
    
    mockSupabase.insert.mockImplementation(() => ({
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { id: 'new-tag', name: 'typescript', auto_generated: true }, error: null }),
    }));
    
    // For content_tag relationship
    mockSupabase.insert.mockResolvedValue({ error: null });
    
    const { result } = renderHook(() => useTagService());
    
    let processedTags;
    await act(async () => {
      processedTags = await result.current.processTags(sampleTags, 'content-1');
    });
    
    // Verify tags are processed correctly
    expect(processedTags.length).toBe(2);
    expect(mockSupabase.from).toHaveBeenCalledWith('tags');
    expect(mockSupabase.from).toHaveBeenCalledWith('content_tags');
  });

  it('should handle database error when checking tags', async () => {
    // Mock error when checking tags
    mockSupabase.select.mockImplementation(() => ({
      eq: jest.fn().mockRejectedValue(new Error('Database error')),
    }));
    
    const { result } = renderHook(() => useTagService());
    
    await expect(async () => {
      await result.current.processTags(sampleTags, 'content-1');
    }).rejects.toThrow('Database error');
  });
});
