
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useShareHandler } from '@/hooks/useShareHandler';

/**
 * Component that handles incoming shared content
 * Should be included in the main app to process share targets
 */
const ShareTargetHandler: React.FC = () => {
  const { isHandlingShare } = useShareHandler();
  const location = useLocation();

  useEffect(() => {
    // Register service worker for share target handling
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('Service worker registered for share handling');
      }).catch((error) => {
        console.log('Service worker registration failed:', error);
      });
    }
  }, []);

  // Show loading state when processing shared content
  if (isHandlingShare) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Processing shared content...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default ShareTargetHandler;
