
import { SavedContent, SearchResult, Tag } from '@/types';
import { mockContents } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export const useContentService = () => {
  const { toast } = useToast();

  const fetchAllContents = async (): Promise<SavedContent[]> => {
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockContents;
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: 'Error loading content',
        description: 'Failed to load your saved content',
        variant: 'destructive',
      });
      return [];
    }
  };

  const updateContentTags = (contentId: string, newTags: Tag[], contents: SavedContent[]): SavedContent[] => {
    const updatedContents = contents.map(content => {
      if (content.id === contentId) {
        return { ...content, tags: newTags };
      }
      return content;
    });
    
    toast({
      title: 'Tags updated',
      description: 'Your changes have been saved',
    });
    
    return updatedContents;
  };

  return {
    fetchAllContents,
    updateContentTags
  };
};
