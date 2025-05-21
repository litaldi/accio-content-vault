
import { renderHook, act } from '@testing-library/react';
import { useTagService } from '@/services/tagService';
import { useBaseService } from '@/services/baseService';
import { Tag } from '@/types';

// Mock useBaseService
jest.mock('@/services/baseService', () => ({
  useBaseService: jest.fn(),
}));

// Mock dynamic import
jest.mock('@/services/contentFetchService', () => ({
  useContentFetchService: jest.fn().mockReturnValue({
    fetchAllContents: jest.fn().mockResolvedValue([
      { id: '1', title: 'Content 1', tags: [] }
    ]),
  }),
}));

describe('useTagService', () => {
  const mockUser = { id: 'user-123', email: 'test@example.com' };
  const mockToast = jest.fn();
  const mockRequireAuth = jest.fn().mockReturnValue(true);
  const mockSupabase = {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis(),
  };

  const sampleTags: Tag[] = [
    { id: 'tag1', name: 'React', auto_generated: false, confirmed: true },
    { id: 'tag2', name: 'TypeScript', auto_generated: true, confirmed: false },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mocks
    (useBaseService as jest.Mock).mockReturnValue({
      user: mockUser,
      toast: mockToast,
      supabase: mockSupabase,
      requireAuth: mockRequireAuth,
    });
  });

  describe('processTags', () => {
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
      mockSupabase.select.mockImplementation(() => ({
        eq: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValueOnce({ data: [{ id: 'tag1', name: 'react', auto_generated: false }], error: null })
          .mockResolvedValueOnce({ data: [], error: null }),
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

  describe('updateContentTags', () => {
    it('should return original contents if not authenticated', async () => {
      mockRequireAuth.mockReturnValueOnce(false);
      
      const mockContents = [{ id: '1', title: 'Test', tags: [] }];
      
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
      
      const mockContents = [
        { id: '1', title: 'Test 1', tags: [] },
        { id: '2', title: 'Test 2', tags: [] }
      ];
      
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
      
      const mockContents = [{ id: '1', title: 'Test', tags: [] }];
      
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
});
