
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Tag } from '@/types';
import { Loader2, Save } from 'lucide-react';
import UrlFormFields from './UrlFormFields';
import UrlFormTagSection from './UrlFormTagSection';

export const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

interface SaveContentUrlFormProps {
  onSaveContent?: (url: string, tags: Tag[]) => void;
}

const SaveContentUrlForm: React.FC<SaveContentUrlFormProps> = ({ onSaveContent }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      title: '',
      description: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save content",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Content saved successfully!",
        description: "Your content has been saved to your collection.",
      });

      // Call the callback if provided
      onSaveContent?.(data.url, tags);
      
      // Reset form and local state
      form.reset();
      setTags([]);
      setTagInput('');
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Error saving content",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save className="h-5 w-5" />
          Save Content by URL
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <UrlFormFields form={form} />
          <UrlFormTagSection
            tags={tags}
            setTags={setTags}
            tagInput={tagInput}
            setTagInput={setTagInput}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Content'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SaveContentUrlForm;
