
import { renderHook } from '@testing-library/react';
import { useTagService } from '@/services/tagService';
import { setupMocks } from './tagService/__setup__';

// Import the individual test files
import './tagService/processTags.test';
import './tagService/updateContentTags.test';

describe('useTagService', () => {
  beforeEach(() => {
    setupMocks();
  });

  it('should expose the necessary methods', () => {
    const { result } = renderHook(() => useTagService());
    
    expect(result.current).toHaveProperty('processTags');
    expect(result.current).toHaveProperty('updateContentTags');
    expect(typeof result.current.processTags).toBe('function');
    expect(typeof result.current.updateContentTags).toBe('function');
  });
});
