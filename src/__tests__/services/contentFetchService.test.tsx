
import { renderHook, act } from '@testing-library/react';
import { useContentFetchService } from '@/services/contentFetchService';
import { useBaseService } from '@/services/baseService';

// Mock useBaseService
jest.mock('@/services/baseService', () => ({
  useBaseService: jest.fn(),
}));

describe('useContentFetchService', () => {
  const mockUser = { id: 'user-123', email: 'test@example.com' };
  const mockToast = jest.fn();
  const mockSupabase = {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    in: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mocks
    (useBaseService as jest.Mock).mockReturnValue({
      user: mockUser,
      toast: mockToast,
      supabase: mockSupabase,
      requireAuth: jest.fn().mockReturnValue(true),
    });
  });

  it('should return empty array when user is not authenticated', async () => {
    // Mock user as null to simulate unauthenticated state
    (useBaseService as jest.Mock).mockReturnValue({
      user: null,
      toast: mockToast,
      supabase: mockSupabase,
    });
    
    const { result } = renderHook(() => useContentFetchService());
    
    // Call the function
    let contents;
    await act(async () => {
      contents = await result.current.fetchAllContents();
    });
    
    expect(contents).toEqual([]);
    expect(mockSupabase.from).not.toHaveBeenCalled();
  });

  it('should fetch and return content items successfully', async () => {
    // Mock successful responses
    const mockContents = [
      { id: '1', user_id: 'user-123', title: 'Test Content', created_at: '2023-01-01' },
      { id: '2', user_id: 'user-123', title: 'Another Content', created_at: '2023-01-02' },
    ];
    
    const mockContentTags = [
      { content_id: '1', tags: { id: 'tag1', name: 'React', auto_generated: false }, confirmed: true },
      { content_id: '1', tags: { id: 'tag2', name: 'TypeScript', auto_generated: true }, confirmed: false },
      { content_id: '2', tags: { id: 'tag3', name: 'JavaScript', auto_generated: false }, confirmed: true },
    ];
    
    mockSupabase.select.mockImplementation(() => ({
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: mockContents, error: null }),
      in: jest.fn().mockResolvedValue({ data: mockContentTags, error: null }),
    }));
    
    const { result } = renderHook(() => useContentFetchService());
    
    let contents;
    await act(async () => {
      contents = await result.current.fetchAllContents();
    });
    
    // Verify that content was transformed correctly with tags
    expect(contents.length).toBe(2);
    expect(contents[0].id).toBe('1');
    expect(contents[0].tags.length).toBe(2);
    expect(contents[0].tags[0].name).toBe('React');
  });

  it('should handle database errors and show toast', async () => {
    // Mock error response
    mockSupabase.select.mockImplementation(() => ({
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: null, error: new Error('Database error') }),
    }));
    
    const { result } = renderHook(() => useContentFetchService());
    
    let contents;
    await act(async () => {
      contents = await result.current.fetchAllContents();
    });
    
    expect(contents).toEqual([]);
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error loading content',
      description: 'Failed to load your saved content',
      variant: 'destructive',
    });
  });

  it('should handle empty content array', async () => {
    // Mock empty content response
    mockSupabase.select.mockImplementation(() => ({
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: [], error: null }),
    }));
    
    const { result } = renderHook(() => useContentFetchService());
    
    let contents;
    await act(async () => {
      contents = await result.current.fetchAllContents();
    });
    
    expect(contents).toEqual([]);
  });
});
