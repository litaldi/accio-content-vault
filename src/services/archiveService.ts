
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useArchiveService = () => {
  const { toast } = useToast();
  const [archived, setArchived] = useState<Set<string>>(new Set());

  const toggleArchive = useCallback(async (contentId: string) => {
    try {
      const isArchived = archived.has(contentId);
      
      if (isArchived) {
        archived.delete(contentId);
        toast({
          title: "Restored from archive",
          description: "Content is now visible in your library",
        });
      } else {
        archived.add(contentId);
        toast({
          title: "Archived",
          description: "Content moved to archive",
        });
      }
      
      setArchived(new Set(archived));
      localStorage.setItem('archived', JSON.stringify(Array.from(archived)));
      
    } catch (error) {
      console.error('Error toggling archive:', error);
      toast({
        title: "Error",
        description: "Failed to update archive status",
        variant: "destructive",
      });
    }
  }, [archived, toast]);

  const isArchived = useCallback((contentId: string) => {
    return archived.has(contentId);
  }, [archived]);

  const getArchived = useCallback(() => {
    return Array.from(archived);
  }, [archived]);

  return {
    toggleArchive,
    isArchived,
    getArchived,
  };
};
