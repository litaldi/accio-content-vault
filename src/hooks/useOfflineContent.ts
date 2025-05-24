
import { useState, useEffect } from 'react';

export const useOfflineContent = () => {
  const [offlineContents, setOfflineContents] = useState<any[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);

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
    // Sync logic would go here
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return {
    offlineContents,
    isOnline,
    isLoading,
    syncWithServer
  };
};
