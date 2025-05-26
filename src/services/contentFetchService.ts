
import { SavedContent, Tag } from '@/types';
import { useCallback } from 'react';
import { useBaseService } from './baseService';

export const useContentFetchService = () => {
  const { user, toast, supabase } = useBaseService();

  // Fetch all content for the logged-in user
  const fetchAllContents = useCallback(async (): Promise<SavedContent[]> => {
    try {
      if (!user) {
        return [];
      }

      // Fetch content from Supabase
      const { data: contentsData, error: contentsError } = await supabase
        .from('contents')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_deleted', false)
        .order('created_at', { ascending: false });

      if (contentsError) {
        throw contentsError;
      }

      // Fetch associated tags for each content item
      const contentIds = contentsData.map((content) => content.id);
      if (contentIds.length === 0) {
        return [];
      }

      const { data: contentTagsData, error: contentTagsError } = await supabase
        .from('content_tags')
        .select('*, tags(*)')
        .in('content_id', contentIds);

      if (contentTagsError) {
        throw contentTagsError;
      }

      // Map database records to SavedContent array
      return contentsData.map((content) => {
        const contentTags = contentTagsData
          .filter((ct) => ct.content_id === content.id)
          .map((ct) => ({
            id: ct.tags.id,
            name: ct.tags.name,
            auto_generated: ct.tags.auto_generated,
            confirmed: ct.confirmed
          }));

        return {
          id: content.id,
          user_id: content.user_id,
          title: content.title || '',
          url: content.url || '',
          description: content.description || '',
          file_url: content.file_path || '',
          file_type: content.file_type || undefined,
          content_type: content.content_type || 'url',
          created_at: content.created_at,
          has_summary: content.has_summary || false,
          tags: contentTags as Tag[]
        };
      });
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: 'Error loading content',
        description: 'Failed to load your saved content',
        variant: 'destructive',
      });
      return [];
    }
  }, [user, toast, supabase]);

  return {
    fetchAllContents
  };
};
