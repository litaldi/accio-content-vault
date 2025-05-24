
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { AccessibleInput } from '@/components/forms/AccessibleInput';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { urlSchema } from '@/utils/validation';
import { isSafeExternalUrl } from '@/utils/security';
import { Loader2, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tag } from '@/types';

const formSchema = z.object({
  url: urlSchema
});

type FormValues = z.infer<typeof formSchema>;

interface SaveContentFormProps {
  onSaveContent: (url: string, tags: Tag[]) => void;
  isLoading?: boolean;
}

const SaveContentForm: React.FC<SaveContentFormProps> = ({ 
  onSaveContent, 
  isLoading = false 
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: ''
    }
  });

  const handleSubmit = async (data: FormValues) => {
    // Additional security check
    if (!isSafeExternalUrl(data.url)) {
      form.setError('url', {
        type: 'manual',
        message: 'This URL is not safe to process'
      });
      return;
    }

    try {
      // Process URL to ensure it has protocol
      let processedUrl = data.url.trim();
      if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
        processedUrl = 'https://' + processedUrl;
      }

      await onSaveContent(processedUrl, []);
    } catch (error) {
      form.setError('url', {
        type: 'manual',
        message: 'Failed to save content. Please try again.'
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LinkIcon className="h-5 w-5 text-primary" />
          Save Web Content
        </CardTitle>
        <CardDescription>
          Enter any web page URL to save it to your knowledge library
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <AccessibleInput
            label="Website URL"
            placeholder="https://example.com/article"
            helpText="Enter the full URL of the webpage you want to save"
            required
            error={form.formState.errors.url?.message}
            {...form.register('url')}
            disabled={isLoading}
          />

          {form.formState.errors.url && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {form.formState.errors.url.message}
              </AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !form.formState.isValid}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing URL...
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

export default SaveContentForm;
