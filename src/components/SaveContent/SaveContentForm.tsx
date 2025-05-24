
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TagConfirmation from '@/components/TagConfirmation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Share, CheckCircle, Loader2, Sparkles, Globe, Zap } from 'lucide-react';
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
        title: "Content received! 🎉",
        description: "We've pre-filled the URL from your shared content.",
        duration: 4000,
      });

      window.history.replaceState(null, '', location.pathname);
    }
  }, [location.state, form, toast]);

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-2 hover:border-primary/30 transition-all duration-500 overflow-hidden relative">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5 pointer-events-none" />
        
        <CardHeader className="text-center pb-8 relative z-10">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden group">
            {/* Animated background */}
            <div className="absolute inset-0 bg-white/20 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500" />
            <Share className="h-10 w-10 text-white relative z-10 transition-transform group-hover:rotate-12" />
            
            {/* Floating sparkles */}
            <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-white/70 animate-pulse" />
          </div>
          
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3 mb-4">
            Save New Content
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          </CardTitle>
          
          <CardDescription className="text-lg leading-relaxed max-w-lg mx-auto text-muted-foreground">
            Transform any URL into organized, searchable knowledge. Our AI will analyze the content and suggest relevant tags automatically.
          </CardDescription>
          
          {/* Feature highlights */}
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <span>Any website</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>AI-powered</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Auto-tagged</span>
            </div>
          </div>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} aria-label="Save content form">
            <CardContent className="space-y-8 relative z-10">
              <UrlInput form={form} isLoading={isLoading} />
              
              {/* Enhanced feedback states */}
              {error && (
                <Alert variant="destructive" className="border-l-4 border-l-destructive animate-slide-down">
                  <AlertCircle className="h-5 w-5" />
                  <AlertDescription className="text-base font-medium">{error}</AlertDescription>
                </Alert>
              )}

              {isSuccess && (
                <Alert className="border-l-4 border-l-green-500 bg-green-50 text-green-800 animate-bounce-in">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <AlertDescription className="text-base font-bold">
                    🎉 Content saved successfully! Ready to explore your library?
                  </AlertDescription>
                </Alert>
              )}

              {isLoading && (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="relative">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <div className="absolute inset-0 h-8 w-8 border-2 border-primary/20 rounded-full animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-base font-medium text-foreground">Analyzing your content...</p>
                    <p className="text-sm text-muted-foreground">Our AI is extracting key information and generating relevant tags</p>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4 pt-8 relative z-10">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="inline h-4 w-4 text-primary animate-pulse" />
                  <span>AI will suggest relevant tags</span>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading || isSuccess}
                  loading={isLoading}
                  className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 px-10 py-3 text-lg font-semibold group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Saved!
                    </>
                  ) : (
                    <>
                      Save Content
                      <Sparkles className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                    </>
                  )}
                </Button>
              </div>
              
              {/* Helpful tip */}
              <div className="w-full text-center">
                <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-4 py-2 inline-block">
                  💡 Tip: You can also share content directly from other apps using the share button
                </p>
              </div>
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
