
import { useState, useEffect } from 'react';

export const useOfflineContent = () => {
  const [offlineContents, setOfflineContents] = useState<any[]>([]);
  const [offlineTags, setOfflineTags] = useState<any[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);
  const [canAccessOffline, setCanAccessOffline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check if offline features are supported
    setCanAccessOffline('indexedDB' in window && 'serviceWorker' in navigator);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncWithServer = async () => {
    setIsLoading(true);
    // Sync logic would go here
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return {
    offlineContents,
    offlineTags,
    isOnline,
    isLoading,
    syncWithServer,
    canAccessOffline
  };
};
