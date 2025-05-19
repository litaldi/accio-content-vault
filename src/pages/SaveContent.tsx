
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import SaveContentForm from '@/components/SaveContent';
import FileUploadForm from '@/components/FileUploadForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import { SavedContent, Tag } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, FileText, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from '@/components/ui/button';

const SaveContent = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("url");
  const [isHelpOpen, setIsHelpOpen] = useState(true);
  
  // This would be replaced with actual authentication check
  const isLoggedIn = true;

  const handleSaveContent = async (url: string, tags: Tag[]) => {
    try {
      // In a real app, this would call Supabase or an API to save the content
      console.log('Saving content with URL:', url);
      console.log('Tags:', tags);
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Content saved successfully',
        description: 'Your content has been added to your collection',
      });
      
      // Redirect to dashboard after saving
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: 'Error saving content',
        description: 'Failed to save your content. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleFileUploadComplete = async (fileDetails: {
    file_url: string;
    file_type: "image" | "pdf";
    file_size: number;
    title: string;
  }) => {
    try {
      // In a real app, this would save file metadata to the database
      console.log('File uploaded:', fileDetails);
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: 'File uploaded successfully',
        description: 'Your file has been added to your collection',
      });
      
      // Redirect to dashboard after upload
      navigate('/dashboard');
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: 'Error saving file',
        description: 'Failed to process your file. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    // In a real app, this would call Supabase auth.signOut()
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Save New Content | ReadSmart</title>
        <meta name="description" content="Add new content to your ReadSmart collection" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        
        <main className="flex-grow container mx-auto px-4 py-8" id="main-content">
          <Breadcrumbs items={[{ label: 'Save Content', href: '/save' }]} />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Save New Content</h1>
            <p className="text-muted-foreground">
              Add content to your collection by URL or by uploading files directly
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <Tabs defaultValue="url" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="url" className="flex items-center gap-2">
                        <Link className="h-4 w-4" aria-hidden="true" />
                        URL / Link
                      </TabsTrigger>
                      <TabsTrigger value="file" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" aria-hidden="true" />
                        Upload File
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="url" className="pt-2 pb-4 space-y-4 animate-fade-in">
                      <SaveContentForm onSaveContent={handleSaveContent} />
                    </TabsContent>
                    <TabsContent value="file" className="pt-2 pb-4 space-y-4 animate-fade-in">
                      <FileUploadForm onUploadComplete={handleFileUploadComplete} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-1">
              <Collapsible open={isHelpOpen} onOpenChange={setIsHelpOpen} className="border rounded-lg shadow-sm bg-card">
                <div className="p-4 flex items-center justify-between border-b">
                  <h2 className="text-lg font-medium flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" aria-hidden="true" />
                    How It Works
                  </h2>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-9 p-0"
                      aria-label={isHelpOpen ? "Close help" : "Open help"}
                    >
                      {isHelpOpen ? (
                        <span className="text-xl">−</span>
                      ) : (
                        <span className="text-xl">+</span>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent className="p-4 space-y-4 text-sm text-muted-foreground">
                  {activeTab === 'url' ? (
                    <>
                      <div className="space-y-2">
                        <h3 className="font-medium text-foreground">URL/Link</h3>
                        <p>
                          Enter the URL of the content you want to save. ReadSmart will automatically
                          extract information and suggest relevant tags.
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Works with articles, blog posts, and research papers</li>
                          <li>Extracts metadata like title, author, and publication date</li>
                          <li>Suggests relevant tags based on content analysis</li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <h3 className="font-medium text-foreground">File Upload</h3>
                        <p>
                          Upload PDF documents or image files directly to your collection. ReadSmart
                          will process them and extract searchable text when possible.
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Supports PDF documents and image files (PNG, JPG, WEBP)</li>
                          <li>OCR available for text extraction from images</li>
                          <li>Maximum file size: 10MB</li>
                        </ul>
                      </div>
                    </>
                  )}
                  <p>
                    You can review and confirm the suggested tags to help improve
                    ReadSmart's tagging system.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SaveContent;
