
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SavedContent, Tag } from '@/types';
import { offlineService } from '@/services/offlineService';
import { useContentService } from '@/services';
import { useToast } from '@/hooks/use-toast';

interface UseOfflineContentReturn {
  offlineContents: SavedContent[];
  offlineTags: Tag[];
  isOnline: boolean;
  isLoading: boolean;
  syncWithServer: () => Promise<void>;
  addOfflineContent: (content: SavedContent) => Promise<void>;
  canAccessOffline: boolean;
}

export const useOfflineContent = (): UseOfflineContentReturn => {
  const [offlineContents, setOfflineContents] = useState<SavedContent[]>([]);
  const [offlineTags, setOfflineTags] = useState<Tag[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);
  const [canAccessOffline, setCanAccessOffline] = useState(false);
  
  const { user } = useAuth();
  const { fetchAllContents } = useContentService();
  const { toast } = useToast();

  // Initialize offline service and load cached data
  useEffect(() => {
    const initOffline = async () => {
      try {
        await offlineService.init();
        setCanAccessOffline(true);
        
        if (user) {
          await loadOfflineData();
        }
      } catch (error) {
        console.error('Failed to initialize offline service:', error);
        toast({
          title: 'Offline access unavailable',
          description: 'Your browser doesn\'t support offline features',
          variant: 'destructive',
        });
      }
    };

    initOffline();
  }, [user, toast]);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: 'Back online',
        description: 'Syncing your latest changes...',
      });
      if (user) {
        syncWithServer();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: 'You\'re offline',
        description: 'You can still view your saved content',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [user, toast]);

  const loadOfflineData = useCallback(async () => {
    if (!user || !canAccessOffline) return;

    try {
      const [contents, tags] = await Promise.all([
        offlineService.getOfflineContents(user.id),
        offlineService.getOfflineTags(user.id)
      ]);

      setOfflineContents(contents);
      setOfflineTags(tags);
    } catch (error) {
      console.error('Failed to load offline data:', error);
    }
  }, [user, canAccessOffline]);

  const syncWithServer = useCallback(async () => {
    if (!user || !isOnline || !canAccessOffline) return;

    setIsLoading(true);
    try {
      // Fetch latest data from server
      const serverContents = await fetchAllContents();
      
      // Cache new data offline
      await offlineService.cacheContent(serverContents);
      
      // Get all unique tags from server content
      const allTags = serverContents.reduce((acc: Tag[], content) => {
        content.tags.forEach(tag => {
          if (!acc.find(t => t.id === tag.id)) {
            acc.push(tag);
          }
        });
        return acc;
      }, []);
      
      await offlineService.cacheTags(allTags);

      // Sync offline-only content to server
      const offlineOnlyContents = await offlineService.getOfflineOnlyContents(user.id);
      for (const content of offlineOnlyContents) {
        try {
          // In a real implementation, you'd save this to the server
          // For now, we'll just mark it as synced
          await offlineService.markContentSynced(content.id);
        } catch (error) {
          console.error('Failed to sync offline content:', error);
        }
      }

      // Reload offline data
      await loadOfflineData();

      toast({
        title: 'Sync complete',
        description: 'Your content is up to date',
      });
    } catch (error) {
      console.error('Sync failed:', error);
      toast({
        title: 'Sync failed',
        description: 'Failed to sync with server',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, isOnline, canAccessOffline, fetchAllContents, loadOfflineData, toast]);

  const addOfflineContent = useCallback(async (content: SavedContent) => {
    if (!canAccessOffline) {
      throw new Error('Offline access not available');
    }

    await offlineService.addOfflineContent(content);
    await loadOfflineData();

    toast({
      title: 'Content saved offline',
      description: 'Will sync when you\'re back online',
    });
  }, [canAccessOffline, loadOfflineData, toast]);

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && user && canAccessOffline) {
      syncWithServer();
    }
  }, [isOnline, user, canAccessOffline, syncWithServer]);

  return {
    offlineContents,
    offlineTags,
    isOnline,
    isLoading,
    syncWithServer,
    addOfflineContent,
    canAccessOffline
  };
};
