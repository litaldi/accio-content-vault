
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import SaveContentForm from '@/components/SaveContent';
import FileUploadForm from '@/components/FileUploadForm';
import { SavedContent, Tag } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, FileText } from 'lucide-react';
import TagConfirmation from '@/components/TagConfirmation';

const SaveContent = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("url");
  const [suggestedTag, setSuggestedTag] = useState<Tag | null>(null);
  const [showTagConfirmation, setShowTagConfirmation] = useState<boolean>(false);
  
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
      
      // If tags were generated, show the confirmation dialog
      if (tags && tags.length > 0) {
        setSuggestedTag(tags[0]);
        setShowTagConfirmation(true);
      } else {
        // If no tags, redirect to dashboard after saving
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: 'Error saving content',
        description: 'Failed to save your content. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleTagConfirmation = async (confirmed: boolean) => {
    if (suggestedTag) {
      // In a real app, this would update the tag's confirmed status in the database
      console.log('Tag confirmation:', suggestedTag.name, confirmed ? 'accurate' : 'inaccurate');
      
      toast({
        title: confirmed ? 'Tag confirmed' : 'Tag rejected',
        description: confirmed 
          ? `Thank you for confirming that "${suggestedTag.name}" is accurate.` 
          : `Thank you for the feedback. We'll improve our tagging for similar content.`,
      });
      
      // Close dialog and redirect to dashboard
      setShowTagConfirmation(false);
      setSuggestedTag(null);
      navigate('/dashboard');
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
      
      // For files, we would typically generate tags as well
      // For demo purposes, let's create a mock tag
      const mockTag: Tag = {
        id: 'file-tag-1',
        name: fileDetails.file_type === 'pdf' ? 'document' : 'image',
        auto_generated: true
      };
      
      setSuggestedTag(mockTag);
      setShowTagConfirmation(true);
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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center" id="page-title">Save New Content</h1>
        
        <Tabs defaultValue="url" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-xl mx-auto mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              URL / Link
            </TabsTrigger>
            <TabsTrigger value="file" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Upload File
            </TabsTrigger>
          </TabsList>
          <TabsContent value="url" className="mt-6">
            <SaveContentForm onSaveContent={handleSaveContent} />
          </TabsContent>
          <TabsContent value="file" className="mt-6">
            <FileUploadForm onUploadComplete={handleFileUploadComplete} />
          </TabsContent>
        </Tabs>
        
        <div className="mt-10 max-w-xl mx-auto text-center">
          <h2 className="text-xl font-medium mb-4">How it works</h2>
          
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              {activeTab === 'url' ? (
                <>Enter the URL of the content you want to save. Accio will automatically
                extract information and suggest tags.</>
              ) : (
                <>Upload a PDF document or image file. Accio will process it and
                allow you to organize it with your other saved content.</>
              )}
            </p>
            <p>
              You can confirm or reject the suggested tags to help improve
              Accio's tagging system.
            </p>
          </div>
        </div>
      </main>
      
      {suggestedTag && (
        <TagConfirmation
          tag={suggestedTag}
          isOpen={showTagConfirmation}
          onConfirm={handleTagConfirmation}
          onClose={() => setShowTagConfirmation(false)}
        />
      )}
    </div>
  );
};

export default SaveContent;
