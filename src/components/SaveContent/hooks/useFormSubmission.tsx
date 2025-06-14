
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useContentService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import { Tag } from '@/types';

interface UseFormSubmissionProps {
  onSaveContent: (url: string, tags: Tag[]) => void;
}

export const useFormSubmission = ({ onSaveContent }: UseFormSubmissionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { saveContent } = useContentService();

  const extractMetadata = async (url: string): Promise<{title: string, description: string}> => {
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace('www.', '');
      
      return {
        title: `Content from ${domain}`,
        description: `Saved content from ${url}`
      };
    } catch {
      return {
        title: 'Saved Content',
        description: 'Content saved from external source'
      };
    }
  };

  const processUrl = (url: string): string => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  };

  const saveContentWithMetadata = async (url: string, tags: Tag[]) => {
    const processedUrl = processUrl(url);
    const metadata = await extractMetadata(processedUrl);
    
    const savedContent = await saveContent({
      url: processedUrl,
      title: metadata.title,
      description: metadata.description,
      content_type: 'url'
    }, tags);
    
    if (savedContent) {
      onSaveContent(processedUrl, tags);
      return true;
    }
    return false;
  };

  return {
    isLoading,
    setIsLoading,
    error,
    setError,
    user,
    toast,
    saveContentWithMetadata
  };
};
