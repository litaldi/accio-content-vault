
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useContentService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tag } from '@/types';

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

  // Function to generate tags with AI
  const generateTagsWithAI = async (url: string): Promise<Tag[]> => {
    // This would be replaced with an actual API call to GPT/OpenAI
    // For now, we're using the mock implementation
    
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sample tags based on URL patterns (for demo purposes)
    if (url.includes('github')) {
      return [{ id: '1', name: 'programming', auto_generated: true }];
    } else if (url.includes('medium')) {
      return [{ id: '2', name: 'article', auto_generated: true }];
    } else if (url.includes('youtube')) {
      return [{ id: '3', name: 'video', auto_generated: true }];
    } else {
      return [{ id: '4', name: 'web', auto_generated: true }];
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
      
      // Generate tags
      const tags = await generateTagsWithAI(processedUrl);
      
      if (tags.length > 0) {
        setSuggestedTag(tags[0]);
        setShowTagConfirmation(true);
      } else {
        // If no tags were generated, save content with empty tags
        const savedContent = await saveContent({
          url: processedUrl,
          title: processedUrl,
          description: '',
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
        // Process the URL with the confirmed tag
        let processedUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          processedUrl = 'https://' + url;
        }
        
        const savedContent = await saveContent({
          url: processedUrl,
          title: processedUrl,
          description: '',
          content_type: 'url'
        }, [confirmedTag]);
        
        if (savedContent) {
          toast({
            title: "Content saved",
            description: `Your content was saved with the tag: ${confirmedTag.name}`,
          });
          
          form.reset();
          setSuggestedTag(null);
          setShowTagConfirmation(false);
          
          onSaveContent(processedUrl, [confirmedTag]);
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
