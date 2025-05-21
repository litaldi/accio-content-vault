
import { renderHook, act } from '@testing-library/react';
import { useTagService } from '@/services/tagService';
import { setupMocks, mockSupabase, sampleTags, mockRequireAuth, mockToast, createMockContents } from './__setup__';

describe('useTagService - updateContentTags', () => {
  beforeEach(() => {
    setupMocks();
  });

  it('should return original contents if not authenticated', async () => {
    mockRequireAuth.mockReturnValueOnce(false);
    
    // Create a proper SavedContent mock
    const mockContents = createMockContents();
    
    const { result } = renderHook(() => useTagService());
    
    let updatedContents;
    await act(async () => {
      updatedContents = await result.current.updateContentTags('1', sampleTags, mockContents);
    });
    
    expect(updatedContents).toEqual(mockContents);
    expect(mockSupabase.from).not.toHaveBeenCalled();
  });

  it('should update content tags and return updated contents array', async () => {
    mockSupabase.delete.mockImplementation(() => ({
      eq: jest.fn().mockResolvedValue({ error: null }),
    }));
    
    // Create a proper SavedContent mock
    const mockContents = createMockContents();
    
    // Mock processTags implementation
    const processTags = jest.fn().mockResolvedValue(sampleTags);
    
    const { result } = renderHook(() => ({
      ...useTagService(),
      processTags,
    }));
    
    let updatedContents;
    await act(async () => {
      updatedContents = await result.current.updateContentTags('1', sampleTags, mockContents);
    });
    
    // Verify contents were updated
    expect(updatedContents.length).toBe(2);
    expect(updatedContents[0].id).toBe('1');
    expect(updatedContents[0].tags).toEqual(sampleTags);
    expect(updatedContents[1].tags).toEqual([]);
    
    expect(mockSupabase.from).toHaveBeenCalledWith('content_tags');
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Tags updated',
      description: 'Your changes have been saved',
    });
  });

  it('should handle error during tag update', async () => {
    mockSupabase.delete.mockImplementation(() => ({
      eq: jest.fn().mockResolvedValue({ error: new Error('Delete error') }),
    }));
    
    // Create a proper SavedContent mock
    const mockContents = createMockContents();
    
    const { result } = renderHook(() => useTagService());
    
    let updatedContents;
    await act(async () => {
      updatedContents = await result.current.updateContentTags('1', sampleTags, mockContents);
    });
    
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error updating tags',
      description: 'Failed to update tags. Please try again.',
      variant: 'destructive',
    });
    
    // Original contents should be returned on error
    expect(updatedContents).toEqual(mockContents);
  });
});
