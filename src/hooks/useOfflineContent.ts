
import { useState, useEffect } from 'react';

export const useOfflineContent = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);

  const mockOfflineContent = [
    {
      id: '1',
      title: 'Offline Article 1',
      description: 'This content is available offline',
      isOfflineOnly: false,
      cached_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Local Draft',
      description: 'This was created while offline',
      isOfflineOnly: true,
      cached_at: new Date().toISOString(),
    }
  ];

  const mockOfflineTags = [
    { id: '1', name: 'offline' },
    { id: '2', name: 'cached' }
  ];

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncWithServer = async () => {
    setIsLoading(true);
    // Simulate sync
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return {
    offlineContents: mockOfflineContent,
    offlineTags: mockOfflineTags,
    isOnline,
    isLoading,
    syncWithServer,
    canAccessOffline: 'serviceWorker' in navigator && 'indexedDB' in window,
  };
};
