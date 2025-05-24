
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ShareData {
  url?: string;
  title?: string;
  text?: string;
}

/**
 * Hook to handle incoming shared content from other apps
 * Registers a share target and processes shared URLs
 */
export const useShareHandler = () => {
  const [isHandlingShare, setIsHandlingShare] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if there's shared content in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const sharedUrl = urlParams.get('url');
    const sharedTitle = urlParams.get('title');
    const sharedText = urlParams.get('text');

    if (sharedUrl) {
      setIsHandlingShare(true);
      
      // Navigate to save content page with shared data
      navigate('/save', { 
        state: { 
          sharedUrl, 
          sharedTitle, 
          sharedText 
        }
      });

      toast({
        title: 'Content shared successfully',
        description: 'Ready to save your shared content',
      });

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      setIsHandlingShare(false);
    }

    // Register as share target if Web Share Target API is available
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        // Service worker handles share target registration
        console.log('Share target ready');
      });
    }
  }, [navigate, toast]);

  const handleManualShare = async (shareData: ShareData) => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return true;
      } catch (error) {
        console.error('Error sharing:', error);
        return false;
      }
    }
    return false;
  };

  return {
    isHandlingShare,
    handleManualShare
  };
};
