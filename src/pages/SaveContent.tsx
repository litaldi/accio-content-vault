
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import MainMenu from '@/components/navigation/MainMenu';
import SaveContentComponent from '@/components/SaveContent';
import { SaveContentMain } from '@/components/SaveContent/SaveContentMain';
import { Tag } from '@/types';

const SaveContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('url');

  const handleSaveContent = (url: string, tags: Tag[]) => {
    console.log('Content saved:', { url, tags });
    navigate('/dashboard');
  };

  const handleFileUploadComplete = (fileDetails: {
    file_url: string;
    file_type: "image" | "pdf";
    file_size: number;
    title: string;
  }) => {
    console.log('File uploaded:', fileDetails);
    navigate('/dashboard');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Save Content - Accio</title>
        <meta name="description" content="Save and organize your favorite web content with AI-powered tagging and insights" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <MainMenu />
        <main id="main-content" role="main" aria-label="Save content page" className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <SaveContentMain
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleSaveContent={handleSaveContent}
              handleFileUploadComplete={handleFileUploadComplete}
            />
            
            <div className="space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <h3 className="font-semibold mb-4">Quick Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Paste any URL to save web content</li>
                  <li>• Add tags to organize your content</li>
                  <li>• Upload PDFs and images directly</li>
                  <li>• Use AI-powered search to find content later</li>
                </ul>
              </div>
              
              <div className="bg-card rounded-lg border p-6">
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <p className="text-sm text-muted-foreground">
                  Your recent saves will appear here
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SaveContent;
