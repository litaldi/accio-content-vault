
import { Tag } from '@/types';
import { useCallback } from 'react';
import { useBaseService } from './baseService';

export const useTagService = () => {
  const { user, toast, supabase, requireAuth } = useBaseService();
  
  // Process tags for a content item
  const processTags = useCallback(async (tags: Tag[], contentId: string): Promise<Tag[]> => {
    if (!requireAuth()) {
      return [];
    }

    const savedTags: Tag[] = [];

    for (const tag of tags) {
      // Check if tag exists
      const { data: existingTags, error: tagQueryError } = await supabase
        .from('tags')
        .select('*')
        .eq('name', tag.name.toLowerCase())
        .eq('user_id', user!.id);

      if (tagQueryError) {
        throw tagQueryError;
      }

      let tagId: string;

      if (existingTags.length === 0) {
        // Tag doesn't exist, create it
        const { data: newTag, error: tagError } = await supabase
          .from('tags')
          .insert({
            name: tag.name.toLowerCase(),
            auto_generated: tag.auto_generated,
            user_id: user!.id,
          })
          .select()
          .single();

        if (tagError) {
          throw tagError;
        }

        tagId = newTag.id;
        savedTags.push({
          id: newTag.id,
          name: newTag.name,
          auto_generated: newTag.auto_generated,
          confirmed: tag.confirmed || false,
        });
      } else {
        tagId = existingTags[0].id;
        savedTags.push({
          id: existingTags[0].id,
          name: existingTags[0].name,
          auto_generated: existingTags[0].auto_generated,
          confirmed: tag.confirmed || false,
        });
      }

      // Create content_tag relationship
      const { error: contentTagError } = await supabase
        .from('content_tags')
        .insert({
          content_id: contentId,
          tag_id: tagId,
          confirmed: tag.confirmed || false,
        });

      if (contentTagError) {
        throw contentTagError;
      }
    }

    return savedTags;
  }, [user, supabase, requireAuth]);

  // Update content tags
  const updateContentTags = useCallback(async (
    contentId: string,
    newTags: Tag[],
    contents?: SavedContent[]
  ): Promise<SavedContent[]> => {
    try {
      if (!requireAuth()) {
        return contents || [];
      }

      // Remove existing content_tags associations
      const { error: deleteError } = await supabase
        .from('content_tags')
        .delete()
        .eq('content_id', contentId);

      if (deleteError) {
        throw deleteError;
      }

      // Process the new tags
      await processTags(newTags, contentId);

      // Update the contents array if provided
      if (contents) {
        return contents.map(content => {
          if (content.id === contentId) {
            return {
              ...content,
              tags: newTags
            };
          }
          return content;
        });
      }

      toast({
        title: 'Tags updated',
        description: 'Your changes have been saved',
      });

      // If we don't have the contents array, we need to fetch them
      const { fetchAllContents } = await import('./contentFetchService').then(
        module => module.useContentFetchService()
      );
      
      return await fetchAllContents();
    } catch (error) {
      console.error('Error updating content tags:', error);
      toast({
        title: 'Error updating tags',
        description: 'Failed to update tags. Please try again.',
        variant: 'destructive',
      });
      return contents || [];
    }
  }, [user, toast, supabase, requireAuth, processTags]);

  return {
    processTags,
    updateContentTags
  };
};

// Need to add this type import at the beginning of the file
import { SavedContent } from '@/types';
