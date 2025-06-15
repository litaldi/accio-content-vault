
import { SavedContent, Tag } from '@/types';
import { useCallback } from 'react';
import { useBaseService } from './baseService';
import { useTagService } from './tagService';

export const useContentSaveService = () => {
  const { user, toast, supabase, requireAuth } = useBaseService();
  const { processTags } = useTagService();

  // Save content (URL or file)
  const saveContent = useCallback(async (
    contentData: { 
      url?: string; 
      title?: string;
      description?: string;
      file_path?: string;
      file_type?: string;
      content_type: 'url' | 'file';
    },
    tags: Tag[]
  ): Promise<SavedContent | null> => {
    try {
      if (!requireAuth()) {
        return null;
      }

      // Insert content record
      const { data: content, error: contentError } = await supabase
        .from('contents')
        .insert({
          user_id: user!.id,
          url: contentData.url,
          title: contentData.title,
          description: contentData.description,
          file_path: contentData.file_path,
          file_type: contentData.file_type,
          content_type: contentData.content_type,
          is_deleted: false,
        })
        .select()
        .single();

      if (contentError) {
        throw contentError;
      }

      // Process tags for this content
      const savedTags = await processTags(tags, content.id);

      // Return the saved content with its tags
      return {
        id: content.id,
        user_id: content.user_id,
        title: content.title || '',
        url: content.url || '',
        description: content.description || '',
        file_url: content.file_path || '',
        file_type: content.file_type as "image" | "pdf" | undefined,
        content_type: content.content_type || 'url',
        created_at: content.created_at,
        updated_at: content.updated_at, // added updated_at
        tags: savedTags
      };
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: 'Error saving content',
        description: 'Failed to save your content. Please try again.',
        variant: 'destructive',
      });
      return null;
    }
  }, [user, toast, supabase, requireAuth, processTags]);

  return {
    saveContent
  };
};
