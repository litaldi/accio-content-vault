
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tag } from '@/types';
import { aiTaggingService } from '@/services/aiTaggingService';
import { useFormSubmission } from './useFormSubmission';
import { useTagConfirmation } from './useTagConfirmation';

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
  const {
    isLoading,
    setIsLoading,
    error,
    setError,
    user,
    toast,
    saveContentWithMetadata
  } = useFormSubmission({ onSaveContent });

  const {
    suggestedTag,
    showTagConfirmation,
    setShowTagConfirmation,
    processSuggestedTags,
    recordTagFeedback,
    resetTagConfirmation
  } = useTagConfirmation();
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: ''
    }
  });

  const handleSubmit = async (data: FormValues) => {
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
      
      const processedUrl = data.url.startsWith('http') ? data.url : 'https://' + data.url;
      
      // Generate tags using AI service
      const tags = await aiTaggingService.generateTags({
        content: `Saved content from ${processedUrl}`,
        url: processedUrl,
        title: `Content from ${processedUrl}`,
        description: `Saved content from ${processedUrl}`
      });
      
      const hasSuggestedTags = await processSuggestedTags(tags);
      
      if (!hasSuggestedTags) {
        // If no tags were generated, save content with empty tags
        const success = await saveContentWithMetadata(processedUrl, []);
        
        if (success) {
          form.reset();
          toast({
            title: "Content saved",
            description: "Your content was saved successfully without tags",
          });
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
    if (!suggestedTag) return;

    const confirmedTag = { ...suggestedTag, confirmed };
    const url = form.getValues('url');
    
    try {
      await recordTagFeedback(suggestedTag.id, confirmed);
      
      const success = await saveContentWithMetadata(url, confirmed ? [confirmedTag] : []);
      
      if (success) {
        toast({
          title: "Content saved",
          description: confirmed 
            ? `Your content was saved with the tag: ${confirmedTag.name}`
            : "Your content was saved without the suggested tag",
        });
        
        form.reset();
        resetTagConfirmation();
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
