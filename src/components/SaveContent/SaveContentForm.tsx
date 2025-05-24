import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TagConfirmation from '@/components/TagConfirmation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Share, CheckCircle, Loader2, Sparkles, Globe, Zap, Wand2 } from 'lucide-react';
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
  const [showLoadingSteps, setShowLoadingSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const loadingSteps = [
    { icon: <Globe className="h-4 w-4" />, text: "Fetching content..." },
    { icon: <Wand2 className="h-4 w-4" />, text: "Analyzing with AI..." },
    { icon: <Sparkles className="h-4 w-4" />, text: "Generating tags..." },
    { icon: <CheckCircle className="h-4 w-4" />, text: "Almost ready!" }
  ];
  
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
      setTimeout(() => setIsSuccess(false), 4000);
    }
  });

  // Enhanced loading animation
  useEffect(() => {
    if (isLoading) {
      setShowLoadingSteps(true);
      setCurrentStep(0);
      
      const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < loadingSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(stepInterval);
            return prev;
          }
        });
      }, 800);
      
      return () => clearInterval(stepInterval);
    } else {
      setShowLoadingSteps(false);
      setCurrentStep(0);
    }
  }, [isLoading]);

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
        {/* Enhanced background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/8 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
        
        <CardHeader className="text-center pb-8 relative z-10">
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden group">
            {/* Animated background rings */}
            <div className="absolute inset-0 bg-white/20 rounded-3xl transform scale-0 group-hover:scale-100 transition-transform duration-700" />
            <div className="absolute inset-2 border-2 border-white/30 rounded-2xl animate-pulse" />
            
            <Share className="h-12 w-12 text-white relative z-10 transition-transform group-hover:rotate-12" />
            
            {/* Enhanced floating sparkles */}
            <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-white/70 animate-pulse" />
            <Sparkles className="absolute -bottom-1 -left-1 h-3 w-3 text-white/50 animate-pulse delay-700" />
          </div>
          
          <CardTitle className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3 mb-6">
            Save New Content
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-primary/70 rounded-full animate-pulse delay-300" />
              <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse delay-700" />
            </div>
          </CardTitle>
          
          <CardDescription className="text-lg leading-relaxed max-w-lg mx-auto text-muted-foreground">
            Transform any URL into organized, searchable knowledge. 
            <span className="font-semibold text-foreground"> Our AI analyzes content</span> and suggests relevant tags automatically.
          </CardDescription>
          
          {/* Enhanced feature highlights */}
          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
            <div className="flex flex-col items-center gap-2 group cursor-default">
              <div className="bg-blue-500/10 p-2 rounded-full group-hover:bg-blue-500/20 transition-colors">
                <Globe className="h-4 w-4 text-blue-500" />
              </div>
              <span className="font-medium">Any Website</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-default">
              <div className="bg-purple-500/10 p-2 rounded-full group-hover:bg-purple-500/20 transition-colors">
                <Zap className="h-4 w-4 text-purple-500" />
              </div>
              <span className="font-medium">AI-Powered</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-default">
              <div className="bg-green-500/10 p-2 rounded-full group-hover:bg-green-500/20 transition-colors">
                <Sparkles className="h-4 w-4 text-green-500" />
              </div>
              <span className="font-medium">Auto-Tagged</span>
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
                    🎉 Content saved successfully! Your knowledge library is growing.
                  </AlertDescription>
                </Alert>
              )}

              {/* Enhanced loading state with step-by-step progress */}
              {showLoadingSteps && (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                  <div className="relative">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <div className="absolute inset-0 h-10 w-10 border-2 border-primary/20 rounded-full animate-pulse" />
                  </div>
                  
                  <div className="space-y-4 max-w-sm">
                    <p className="text-lg font-bold text-foreground">Processing your content...</p>
                    
                    <div className="space-y-3">
                      {loadingSteps.map((step, index) => (
                        <div 
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                            index <= currentStep 
                              ? 'bg-primary/10 text-foreground' 
                              : 'text-muted-foreground'
                          }`}
                        >
                          <div className={`transition-all duration-300 ${
                            index <= currentStep ? 'text-primary scale-110' : 'scale-100'
                          }`}>
                            {step.icon}
                          </div>
                          <span className={`text-sm font-medium transition-all duration-300 ${
                            index === currentStep ? 'font-bold' : ''
                          }`}>
                            {step.text}
                          </span>
                          {index < currentStep && (
                            <CheckCircle className="h-4 w-4 text-green-500 ml-auto animate-scale-in" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col gap-6 pt-8 relative z-10">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  </div>
                  <div>
                    <p className="font-medium">AI-powered tagging</p>
                    <p className="text-xs opacity-75">Automatically categorizes your content</p>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading || isSuccess}
                  className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 px-10 py-4 text-lg font-bold group relative overflow-hidden"
                >
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {isLoading ? (
                    <div className="flex items-center relative z-10">
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      <span>Saving...</span>
                    </div>
                  ) : isSuccess ? (
                    <div className="flex items-center relative z-10">
                      <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                      <span>Saved!</span>
                    </div>
                  ) : (
                    <div className="flex items-center relative z-10">
                      <span>Save Content</span>
                      <Sparkles className="ml-3 h-5 w-5 transition-transform group-hover:rotate-12" />
                    </div>
                  )}
                </Button>
              </div>
              
              {/* Enhanced helpful tips */}
              <div className="w-full text-center space-y-3">
                <div className="bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 rounded-xl px-6 py-4">
                  <p className="text-sm font-medium text-foreground mb-2">💡 Pro Tips</p>
                  <div className="flex flex-col sm:flex-row gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      Share directly from mobile apps
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      Works with PDFs and articles
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      Instant browser extension
                    </span>
                  </div>
                </div>
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
