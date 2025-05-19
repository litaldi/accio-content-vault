
import { supabase } from '@/lib/supabase';
import { SavedContent, Tag } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback } from 'react';

export const useContentService = () => {
  const { toast } = useToast();
  const { user } = useAuth();

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
          user_id: content.user_id, // Added this missing property
          title: content.title || '',
          url: content.url || '',
          description: content.description || '',
          // Changed 'type' to proper fields in SavedContent
          file_url: content.file_path || '',
          file_type: content.file_type || undefined,
          created_at: content.created_at,
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
  }, [user, toast]);

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
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please log in to save content',
          variant: 'destructive',
        });
        return null;
      }

      // Insert content record
      const { data: content, error: contentError } = await supabase
        .from('contents')
        .insert({
          user_id: user.id,
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

      // Process tags - first insert any new tags
      const savedTags: Tag[] = [];
      for (const tag of tags) {
        // Check if tag exists
        const { data: existingTags, error: tagQueryError } = await supabase
          .from('tags')
          .select('*')
          .eq('name', tag.name.toLowerCase())
          .eq('user_id', user.id);

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
              user_id: user.id,
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
            content_id: content.id,
            tag_id: tagId,
            confirmed: tag.confirmed || false,
          });

        if (contentTagError) {
          throw contentTagError;
        }
      }

      // Return the saved content with its tags
      return {
        id: content.id,
        user_id: content.user_id, // Added missing user_id
        title: content.title || '',
        url: content.url || '',
        description: content.description || '',
        // Changed 'type' property to match SavedContent type
        file_url: content.file_path || '',
        file_type: content.file_type as "image" | "pdf" | undefined,
        created_at: content.created_at,
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
  }, [user, toast]);

  // Update content tags
  const updateContentTags = useCallback(async (
    contentId: string,
    newTags: Tag[],
    contents?: SavedContent[]
  ): Promise<SavedContent[]> => {
    try {
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please log in to update tags',
          variant: 'destructive',
        });
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

      // Process tags - first insert any new tags
      for (const tag of newTags) {
        // Check if tag exists
        const { data: existingTags, error: tagQueryError } = await supabase
          .from('tags')
          .select('*')
          .eq('name', tag.name.toLowerCase())
          .eq('user_id', user.id);

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
              user_id: user.id,
            })
            .select()
            .single();

          if (tagError) {
            throw tagError;
          }

          tagId = newTag.id;
        } else {
          tagId = existingTags[0].id;
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
  }, [user, toast, fetchAllContents]);

  return {
    fetchAllContents,
    saveContent,
    updateContentTags
  };
};
