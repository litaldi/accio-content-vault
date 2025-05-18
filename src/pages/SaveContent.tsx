
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import SaveContentForm from '@/components/SaveContentForm';
import { SavedContent, Tag } from '@/types';

const SaveContent = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
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

  const handleLogout = () => {
    // In a real app, this would call Supabase auth.signOut()
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Save New Content</h1>
        
        <SaveContentForm onSaveContent={handleSaveContent} />
        
        <div className="mt-10 max-w-xl mx-auto text-center">
          <h2 className="text-xl font-medium mb-4">How it works</h2>
          
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Enter the URL of the content you want to save. Accio will automatically
              extract information and suggest tags.
            </p>
            <p>
              You can confirm or reject the suggested tags to help improve
              Accio's tagging system.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SaveContent;
