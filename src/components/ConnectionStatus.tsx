
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Wifi, WifiOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ConnectionStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [showOfflineBanner, setShowOfflineBanner] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Connection restored",
        description: "You're back online",
      });
      // Hide the banner after a delay when connection is restored
      setTimeout(() => {
        setShowOfflineBanner(false);
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineBanner(true);
      toast({
        title: "Connection lost",
        description: "You're currently offline. Some features may be unavailable.",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  if (isOnline && !showOfflineBanner) {
    return null;
  }

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 animate-fade-in ${isOnline ? 'animate-fade-out' : ''}`}
      role="status"
      aria-live="polite"
    >
      <Badge 
        variant={isOnline ? "outline" : "destructive"}
        className="px-3 py-1.5 shadow-lg flex items-center gap-2"
      >
        {isOnline ? (
          <>
            <Wifi className="h-3.5 w-3.5" aria-hidden="true" />
            Back online
          </>
        ) : (
          <>
            <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
            You're offline
          </>
        )}
      </Badge>
    </div>
  );
};

export default ConnectionStatus;
