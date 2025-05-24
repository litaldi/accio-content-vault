
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SaveContentForm from '@/components/SaveContent';
import FileUploadForm from '@/components/FileUploadForm';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import ProgressIndicator from '@/components/ui/progress-indicator';
import { useEnhancedToast } from '@/components/feedback/ToastEnhancer';
import { SavedContent, Tag } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, FileText, HelpCircle, Sparkles, Zap, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from '@/components/ui/button';

const SaveContent = () => {
  const { showSuccess, showError, showDelight } = useEnhancedToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("url");
  const [isHelpOpen, setIsHelpOpen] = useState(true);
  const [saveProgress, setSaveProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const isLoggedIn = true;

  const saveSteps = ["Input Content", "AI Analysis", "Tag Confirmation", "Saved!"];

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
      
      showDelight(
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
      
      showDelight(
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
        
        {/* Progress indicator when processing */}
        {isProcessing && (
          <div className="mb-8">
            <ProgressIndicator steps={saveSteps} currentStep={saveProgress} />
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
          
          <div className="md:col-span-1 space-y-6">
            {/* How it works */}
            <Collapsible open={isHelpOpen} onOpenChange={setIsHelpOpen}>
              <Card className="border-2 hover:border-primary/30 transition-all duration-300">
                <div className="p-4 flex items-center justify-between border-b">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    How It Works
                  </h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0 hover:bg-primary/10">
                      <span className="sr-only">Toggle help section</span>
                      {isHelpOpen ? (
                        <span className="text-xl font-light">−</span>
                      ) : (
                        <span className="text-xl font-light">+</span>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent className="p-6 space-y-6 text-sm">
                  {activeTab === 'url' ? (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full p-2 mt-1">
                          <Link className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Paste & Process</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            Simply paste any URL. Our AI extracts the content, title, and key information automatically.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-100 rounded-full p-2 mt-1">
                          <Zap className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Smart Tagging</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            AI analyzes the content and suggests relevant tags for perfect organization.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-2 mt-1">
                          <Target className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Instant Search</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            Find your content later using natural language search across all saved items.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full p-2 mt-1">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Upload & Extract</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            Upload PDFs, images, or documents. We extract text and metadata automatically.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-100 rounded-full p-2 mt-1">
                          <Sparkles className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">OCR Technology</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            Images with text are processed using OCR to make them fully searchable.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-xs text-amber-700 font-medium">
                          📄 Supported: PDF, PNG, JPG, WEBP (up to 10MB)
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground italic">
                      💡 Pro tip: You can review and customize suggested tags to help improve our AI recommendations!
                    </p>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
            
            {/* Quick tips */}
            <Card className="border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Quick Tips
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Use Ctrl+Shift+S to quickly save from anywhere</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Share directly from mobile apps using the share button</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Install our browser extension for one-click saving</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SaveContent;
