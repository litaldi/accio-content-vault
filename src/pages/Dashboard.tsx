
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchExperience } from '@/components/search/SearchExperience';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentContent } from '@/components/dashboard/RecentContent';
import { ContentStats } from '@/components/dashboard/ContentStats';
import { KnowledgeInsights } from '@/components/dashboard/KnowledgeInsights';
import { SaveContentMain } from '@/components/SaveContent/SaveContentMain';
import { Plus, Brain, TrendingUp, BookOpen } from 'lucide-react';
import { Tag } from '@/types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<'overview' | 'add-content'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSaveContent = (url: string, tags: Tag[]) => {
    console.log('Saving content:', { url, tags });
    // Implementation would go here
    setActiveView('overview');
  };

  const handleFileUploadComplete = (fileDetails: any) => {
    console.log('File uploaded:', fileDetails);
    setActiveView('overview');
  };

  if (activeView === 'add-content') {
    return (
      <>
        <Helmet>
          <title>Add Content - Accio Dashboard</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={() => setActiveView('overview')}
                className="mb-4"
              >
                ← Back to Dashboard
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <SaveContentMain
                activeTab="url"
                setActiveTab={() => {}}
                handleSaveContent={handleSaveContent}
                handleFileUploadComplete={handleFileUploadComplete}
              />
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      AI Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <p>• Add tags to help organize your content</p>
                      <p>• URL content is automatically summarized</p>
                      <p>• Files are processed for text extraction</p>
                      <p>• AI categorizes content intelligently</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Accio</title>
        <meta name="description" content="Your AI-powered knowledge management dashboard" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.email?.split('@')[0] || 'User'}! 👋
            </h1>
            <p className="text-muted-foreground">
              Your knowledge sanctuary awaits. What would you like to explore today?
            </p>
          </div>

          {/* Search Experience */}
          <div className="mb-8">
            <SearchExperience
              variant="dashboard"
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              showTips={true}
            />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions onAddContent={() => setActiveView('add-content')} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Stats and Recent */}
            <div className="lg:col-span-2 space-y-6">
              <ContentStats />
              <RecentContent />
            </div>

            {/* Right Column - Insights */}
            <div className="space-y-6">
              <KnowledgeInsights />
              
              {/* Quick Add Widget */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Quick Add
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    onClick={() => setActiveView('add-content')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Content
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
