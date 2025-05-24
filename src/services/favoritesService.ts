
import { useState, useCallback } from 'react';
import { SavedContent } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const useFavoritesService = () => {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = useCallback(async (contentId: string) => {
    try {
      const isFavorited = favorites.has(contentId);
      
      if (isFavorited) {
        favorites.delete(contentId);
        toast({
          title: "Removed from favorites",
          description: "Content has been unfavorited",
        });
      } else {
        favorites.add(contentId);
        toast({
          title: "Added to favorites",
          description: "Content has been favorited",
        });
      }
      
      setFavorites(new Set(favorites));
      
      // In a real app, this would make an API call to persist the change
      localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
      
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive",
      });
    }
  }, [favorites, toast]);

  const isFavorited = useCallback((contentId: string) => {
    return favorites.has(contentId);
  }, [favorites]);

  const getFavorites = useCallback(() => {
    return Array.from(favorites);
  }, [favorites]);

  return {
    toggleFavorite,
    isFavorited,
    getFavorites,
  };
};
