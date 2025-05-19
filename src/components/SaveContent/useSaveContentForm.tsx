
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tag } from '@/types';

// Define form schema with validation
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestedTag, setSuggestedTag] = useState<Tag | null>(null);
  const [showTagConfirmation, setShowTagConfirmation] = useState<boolean>(false);
  const [detectedTags, setDetectedTags] = useState<Tag[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  const handleSubmit = useCallback(async (values: FormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Normalize the URL by ensuring it has a protocol
      const normalizedUrl = values.url.startsWith('http') 
        ? values.url 
        : `https://${values.url}`;
      
      // Here we would typically call a backend service to analyze the URL
      // For now, we'll simulate with a timeout and mock tags
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock detected tags (in a real app, these would come from an API)
      const mockDetectedTags: Tag[] = [
        { id: '1', name: 'article', auto_generated: true },
        { id: '2', name: 'technology', auto_generated: true },
        { id: '3', name: 'tutorial', auto_generated: true },
      ];
      
      setDetectedTags(mockDetectedTags);
      
      // Show tag confirmation for the first tag (in a real app, you might handle this differently)
      setSuggestedTag(mockDetectedTags[0]);
      setShowTagConfirmation(true);
      
      // In a real app, you would handle the confirmation in a different flow,
      // but for simulation purposes, we'll pass the detected tags through
      onSaveContent(normalizedUrl, mockDetectedTags);
      
    } catch (err) {
      console.error('Error saving content:', err);
      setError('Failed to save content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [onSaveContent]);

  const handleTagConfirmation = useCallback((confirmed: boolean) => {
    // In a real app, you would update the tag status in your database
    console.log(`Tag ${suggestedTag?.name} confirmed:`, confirmed);
    setShowTagConfirmation(false);
  }, [suggestedTag]);

  return {
    isLoading,
    error,
    suggestedTag,
    showTagConfirmation,
    detectedTags,
    form,
    handleSubmit,
    handleTagConfirmation,
    setShowTagConfirmation
  };
};

export default useSaveContentForm;
