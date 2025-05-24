
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SaveContentForm from '@/components/SaveContent';
import FileUploadForm from '@/components/FileUploadForm';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import { ProgressIndicator } from '@/components/ui/progress-indicator';
import { useEnhancedToast } from '@/components/feedback/ToastEnhancer';
import { SavedContent, Tag } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Link, 
  FileText, 
  Sparkles, 
  HelpCircle, 
  CheckCircle, 
  ArrowRight,
  X
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const SaveContent = () => {
  const { showSuccess, showError, showCelebration } = useEnhancedToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("url");
  const [isHelpOpen, setIsHelpOpen] = useState(true);
  const [saveProgress, setSaveProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const isLoggedIn = true;

  const saveSteps = [
    { id: 'input', title: 'Input Content', completed: saveProgress > 0, current: saveProgress === 1 },
    { id: 'analysis', title: 'AI Analysis', completed: saveProgress > 1, current: saveProgress === 2 },
    { id: 'tags', title: 'Tag Confirmation', completed: saveProgress > 2, current: saveProgress === 3 },
    { id: 'saved', title: 'Saved!', completed: saveProgress > 3, current: saveProgress === 4 }
  ];

  const handleSaveContent = async (url: string, tags: Tag[]) => {
    try {
      setIsProcessing(true);
      setSaveProgress(0);
      
      // Simulate progress steps
      setSaveProgress(1);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSaveProgress(2);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setSaveProgress(3);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Saving content with URL:', url);
      console.log('Tags:', tags);
      
      showCelebration(
        'Content saved successfully! 🎉',
        'Your knowledge library is growing. Ready to add more?'
      );
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error saving content:', error);
      showError(
        'Oops! Something went wrong',
        'We couldn\'t save your content right now. Please try again in a moment.'
      );
    } finally {
      setIsProcessing(false);
      setSaveProgress(0);
    }
  };

  const handleFileUploadComplete = async (fileDetails: {
    file_url: string;
    file_type: "image" | "pdf";
    file_size: number;
    title: string;
  }) => {
    try {
      setIsProcessing(true);
      console.log('File uploaded:', fileDetails);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showCelebration(
        'File uploaded successfully! ✨',
        'Your file has been processed and added to your collection.'
      );
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error processing file:', error);
      showError(
        'Upload failed',
        'We couldn\'t process your file. Please check the format and try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Save Content', href: '/save' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <BreadcrumbNav items={breadcrumbItems} />
        
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Add New Content
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform any URL or file into organized, searchable knowledge with AI-powered insights
          </p>
        </div>
        
        {isProcessing && (
          <div className="mb-8">
            <ProgressIndicator steps={saveSteps} />
          </div>
        )}
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="shadow-lg border-2 hover:border-primary/30 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Choose Your Content Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="url" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
                    <TabsTrigger value="url" className="flex items-center gap-2 text-base">
                      <Link className="h-5 w-5" />
                      URL / Website
                    </TabsTrigger>
                    <TabsTrigger value="file" className="flex items-center gap-2 text-base">
                      <FileText className="h-5 w-5" />
                      Upload File
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="url" className="pt-4 space-y-6 animate-fade-in">
                    <SaveContentForm onSaveContent={handleSaveContent} />
                  </TabsContent>
                  
                  <TabsContent value="file" className="pt-4 space-y-6 animate-fade-in">
                    <FileUploadForm onUploadComplete={handleFileUploadComplete} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Quick Tips
                </CardTitle>
                {isHelpOpen && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsHelpOpen(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
              
              {isHelpOpen && (
                <CardContent className="space-y-4">
                  {activeTab === "url" ? (
                    <>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Any Website Works</p>
                          <p className="text-xs text-muted-foreground">Articles, blogs, documentation, or any web page</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Sparkles className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">AI-Powered Analysis</p>
                          <p className="text-xs text-muted-foreground">Automatically extracts key information and suggests tags</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Browser Extension</p>
                          <p className="text-xs text-muted-foreground">Save directly from any website with one click</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">PDF & Images Supported</p>
                          <p className="text-xs text-muted-foreground">Upload documents, screenshots, or research papers</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Sparkles className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Text Extraction</p>
                          <p className="text-xs text-muted-foreground">OCR technology extracts text from images and PDFs</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Smart Organization</p>
                          <p className="text-xs text-muted-foreground">Files are automatically categorized and made searchable</p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              )}
            </Card>
            
            <Alert className="border-blue-200 bg-blue-50 text-blue-900">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-sm">
                <strong>Pro tip:</strong> You can share content directly to this app from your mobile browser or other apps using the share button.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SaveContent;
