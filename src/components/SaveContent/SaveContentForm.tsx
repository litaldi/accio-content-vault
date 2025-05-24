
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TagConfirmation from '@/components/TagConfirmation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Share, CheckCircle, Loader2, Sparkles } from 'lucide-react';
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
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { 
    isLoading, 
    error, 
    suggestedTag,
    showTagConfirmation,
    form,
    handleSubmit,
    handleTagConfirmation,
    setShowTagConfirmation
  } = useSaveContentForm({ 
    onSaveContent: async (url: string, tags: Tag[]) => {
      await onSaveContent(url, tags);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }
  });

  // Handle shared content from other apps
  useEffect(() => {
    const sharedData = location.state as { sharedUrl?: string; sharedTitle?: string; sharedText?: string } | null;
    
    if (sharedData?.sharedUrl) {
      form.setValue('url', sharedData.sharedUrl);
      
      toast({
        title: "Content received!",
        description: "We've pre-filled the URL from your shared content.",
        duration: 4000,
      });

      window.history.replaceState(null, '', location.pathname);
    }
  }, [location.state, form, toast]);

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto shadow-lg border-2 hover:border-primary/20 transition-all duration-300">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
            <Share className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            Save New Content
            <Sparkles className="h-5 w-5 text-primary" />
          </CardTitle>
          <CardDescription className="text-base leading-relaxed max-w-md mx-auto">
            Enter a URL to save content to your collection. You can also share content 
            directly from other apps using the share button.
          </CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} aria-label="Save content form">
            <CardContent className="space-y-6">
              <UrlInput form={form} isLoading={isLoading} />
              
              {/* Enhanced feedback states */}
              {error && (
                <Alert variant="destructive" className="border-l-4 border-l-destructive">
                  <AlertCircle className="h-5 w-5" />
                  <AlertDescription className="text-base">{error}</AlertDescription>
                </Alert>
              )}

              {isSuccess && (
                <Alert className="border-l-4 border-l-green-500 bg-green-50 text-green-800">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <AlertDescription className="text-base font-medium">
                    Content saved successfully! 🎉
                  </AlertDescription>
                </Alert>
              )}

              {isLoading && (
                <div className="flex items-center justify-center py-8 text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin mr-3" />
                  <span className="text-base">Analyzing content and generating tags...</span>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between pt-6">
              <div className="text-sm text-muted-foreground">
                <Sparkles className="inline h-4 w-4 mr-1" />
                AI will suggest relevant tags
              </div>
              <Button 
                type="submit" 
                disabled={isLoading || isSuccess}
                loading={isLoading}
                className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 px-8"
              >
                {isLoading ? "Saving..." : isSuccess ? "Saved!" : "Save Content"}
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
