
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useContentService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tag } from '@/types';
import { aiTaggingService } from '@/services/aiTaggingService';

// Define form validation schema with Zod
const formSchema = z.object({
  url: z.string()
    .trim()
    .min(1, { message: "URL is required" })
    .refine((url) => {
      try {
        new URL(url.startsWith('http') ? url : `https://${url}`);
        return true;
      } catch (e) {
        return false;
      }
    }, { message: "Please enter a valid URL" })
});

type FormValues = z.infer<typeof formSchema>;

interface UseSaveContentFormProps {
  onSaveContent: (url: string, tags: Tag[]) => void;
}

const useSaveContentForm = ({ onSaveContent }: UseSaveContentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedTag, setSuggestedTag] = useState<Tag | null>(null);
  const [showTagConfirmation, setShowTagConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { saveContent } = useContentService();
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: ''
    }
  });

  // Function to extract metadata from URL
  const extractMetadata = async (url: string): Promise<{title: string, description: string}> => {
    try {
      // In a real implementation, you'd use a service to extract metadata
      // For now, we'll extract basic info from the URL
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

  const handleSubmit = async (data: FormValues) => {
    // Reset any previous errors
    setError(null);

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save content",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Process URL - ensure it has http/https prefix
      let processedUrl = data.url;
      if (!data.url.startsWith('http://') && !data.url.startsWith('https://')) {
        processedUrl = 'https://' + data.url;
      }
      
      // Extract metadata
      const metadata = await extractMetadata(processedUrl);
      
      // Generate tags using AI service
      const tags = await aiTaggingService.generateTags({
        content: metadata.description,
        url: processedUrl,
        title: metadata.title,
        description: metadata.description
      });
      
      if (tags.length > 0) {
        setSuggestedTag(tags[0]);
        setShowTagConfirmation(true);
      } else {
        // If no tags were generated, save content with empty tags
        const savedContent = await saveContent({
          url: processedUrl,
          title: metadata.title,
          description: metadata.description,
          content_type: 'url'
        }, []);
        
        if (savedContent) {
          form.reset();
          
          toast({
            title: "Content saved",
            description: "Your content was saved successfully without tags",
          });
          
          onSaveContent(processedUrl, []);
        }
      }
    } catch (error) {
      console.error("Error saving content:", error);
      setError("Failed to save content. Please try again.");
      toast({
        title: "Error saving content",
        description: "An error occurred while trying to save your content",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagConfirmation = async (confirmed: boolean) => {
    if (suggestedTag) {
      const confirmedTag = { ...suggestedTag, confirmed };
      const url = form.getValues('url');
      
      try {
        // Record tag feedback
        await aiTaggingService.recordTagFeedback(
          suggestedTag.id,
          confirmed ? 'accepted' : 'rejected'
        );
        
        // Process the URL with the confirmed tag
        let processedUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          processedUrl = 'https://' + url;
        }
        
        const metadata = await extractMetadata(processedUrl);
        
        const savedContent = await saveContent({
          url: processedUrl,
          title: metadata.title,
          description: metadata.description,
          content_type: 'url'
        }, confirmed ? [confirmedTag] : []);
        
        if (savedContent) {
          toast({
            title: "Content saved",
            description: confirmed 
              ? `Your content was saved with the tag: ${confirmedTag.name}`
              : "Your content was saved without the suggested tag",
          });
          
          form.reset();
          setSuggestedTag(null);
          setShowTagConfirmation(false);
          
          onSaveContent(processedUrl, confirmed ? [confirmedTag] : []);
        }
      } catch (error) {
        console.error("Error saving content:", error);
        setError("Failed to save content. Please try again.");
        toast({
          title: "Error saving content",
          description: "An error occurred while trying to save your content",
          variant: "destructive",
        });
      }
    }
  };

  return {
    isLoading,
    error,
    suggestedTag,
    showTagConfirmation,
    setShowTagConfirmation,
    form,
    handleSubmit,
    handleTagConfirmation
  };
};

export default useSaveContentForm;
