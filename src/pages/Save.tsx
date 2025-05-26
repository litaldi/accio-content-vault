
import React from 'react';
import { Button } from '@/components/ui/button';
import { EnhancedUnifiedLayout } from '@/components/layout/EnhancedUnifiedLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Helmet } from 'react-helmet-async';
import { SaveContentMain } from '@/components/SaveContent/SaveContentMain';
import { SaveContentSidebar } from '@/components/SaveContent/SaveContentSidebar';

const Save = () => {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  return (
    <>
      <Helmet>
        <title>Save Content - Accio</title>
        <meta name="description" content="Save and organize your digital content with Accio's intelligent content management system." />
      </Helmet>
      
      <EnhancedUnifiedLayout 
        isLoggedIn={isLoggedIn} 
        user={user}
        className="bg-gradient-to-br from-background via-background to-muted/20"
      >
        <div className="min-h-screen py-8">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Save Your Content
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Add URLs, notes, or files to your personal knowledge library
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2">
                <SaveContentMain 
                  activeTab="url"
                  setActiveTab={() => {}}
                  handleSaveContent={() => {}}
                  handleFileUploadComplete={() => {}}
                />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <SaveContentSidebar activeTab="url" />
              </div>
            </div>
          </div>
        </div>
      </EnhancedUnifiedLayout>
    </>
  );
};

export default Save;
