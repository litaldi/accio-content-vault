
import { useBaseService } from '@/services/baseService';
import { Tag, SavedContent } from '@/types';

// Mock useBaseService
jest.mock('@/services/baseService', () => ({
  useBaseService: jest.fn(),
}));

// Mock dynamic import
jest.mock('@/services/contentFetchService', () => ({
  useContentFetchService: jest.fn().mockReturnValue({
    fetchAllContents: jest.fn().mockResolvedValue([
      { 
        id: '1', 
        title: 'Content 1', 
        user_id: 'user-123',
        description: 'Test description',
        content_type: 'link',
        created_at: '2023-01-01',
        tags: [] 
      }
    ]),
  }),
}));

export const mockUser = { id: 'user-123', email: 'test@example.com' };
export const mockToast = jest.fn();
export const mockRequireAuth = jest.fn().mockReturnValue(true);
export const mockSupabase = {
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  single: jest.fn().mockReturnThis(),
};

export const sampleTags: Tag[] = [
  { id: 'tag1', name: 'React', auto_generated: false, confirmed: true, created_at: '2023-01-01T00:00:00.000Z' },
  { id: 'tag2', name: 'TypeScript', auto_generated: true, confirmed: false, created_at: '2023-01-02T00:00:00.000Z' },
];

export const setupMocks = () => {
  jest.clearAllMocks();
  
  // Setup default mocks
  (useBaseService as jest.Mock).mockReturnValue({
    user: mockUser,
    toast: mockToast,
    supabase: mockSupabase,
    requireAuth: mockRequireAuth,
  });
};

export const createMockContents = (): SavedContent[] => [
  { 
    id: '1', 
    title: 'Test 1', 
    user_id: 'user-123',
    description: 'Test description 1',
    content_type: 'link',
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
    tags: [] 
  },
  { 
    id: '2', 
    title: 'Test 2', 
    user_id: 'user-123',
    description: 'Test description 2',
    content_type: 'document',
    created_at: '2023-01-02',
    updated_at: '2023-01-02',
    tags: [] 
  }
];
