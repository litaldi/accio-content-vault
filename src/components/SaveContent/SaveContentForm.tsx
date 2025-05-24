
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TagConfirmation from '@/components/TagConfirmation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Share } from 'lucide-react';
import { Tag } from '@/types';
import { Form } from '@/components/ui/form';
import UrlInput from './UrlInput';
import useSaveContentForm from './useSaveContentForm';

interface SaveContentFormProps {
  onSaveContent: (url: string, tags: Tag[]) => void;
}

const SaveContentForm: React.FC<SaveContentFormProps> = ({ onSaveContent }) => {
  const location = useLocation();
  const { toast } = useToast();
  
  const { 
    isLoading, 
    error, 
    suggestedTag,
    showTagConfirmation,
    form,
    handleSubmit,
    handleTagConfirmation,
    setShowTagConfirmation
  } = useSaveContentForm({ onSaveContent });

  // Handle shared content from other apps
  useEffect(() => {
    const sharedData = location.state as { sharedUrl?: string; sharedTitle?: string; sharedText?: string } | null;
    
    if (sharedData?.sharedUrl) {
      // Pre-fill the form with shared content
      form.setValue('url', sharedData.sharedUrl);
      
      toast({
        title: "Content received!",
        description: "We've pre-filled the URL from your shared content.",
        duration: 4000,
      });

      // Clear the state to prevent re-processing
      window.history.replaceState(null, '', location.pathname);
    }
  }, [location.state, form, toast]);

  return (
    <>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share className="h-5 w-5" />
            Save New Content
          </CardTitle>
          <CardDescription>
            Enter a URL to save content to your collection. You can also share content 
            directly from other apps using the share button.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} aria-label="Save content form">
            <CardContent>
              <UrlInput form={form} isLoading={isLoading} />
              
              {error && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isLoading}
                loading={isLoading}
                className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Save Content
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {suggestedTag && (
        <TagConfirmation
          tag={suggestedTag}
          isOpen={showTagConfirmation}
          onConfirm={handleTagConfirmation}
          onClose={() => setShowTagConfirmation(false)}
        />
      )}
    </>
  );
};

export default SaveContentForm;
