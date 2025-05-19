
import { useBaseService } from './baseService';
import { useContentFetchService } from './contentFetchService';
import { useContentSaveService } from './contentSaveService';
import { useTagService } from './tagService';
import { SavedContent, Tag } from '@/types';
import { useCallback } from 'react';

// Unified content service that combines all the functionality
export const useContentService = () => {
  const baseService = useBaseService();
  const { fetchAllContents } = useContentFetchService();
  const { saveContent } = useContentSaveService();
  const { updateContentTags } = useTagService();

  return {
    fetchAllContents,
    saveContent,
    updateContentTags
  };
};

// Re-export all individual services for direct use when needed
export {
  useBaseService,
  useContentFetchService,
  useContentSaveService,
  useTagService
};
