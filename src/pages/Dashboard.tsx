
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Plus, Search, TrendingUp, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useContentSearch } from '@/hooks/useContentSearch';
import MainMenu from '@/components/navigation/MainMenu';
import { ResponsiveLayout } from '@/components/ui/responsive-layout';
import { ResponsiveCard } from '@/components/ui/responsive-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIInsights } from '@/components/ai/AIInsights';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { searchResults, handleSearch } = useContentSearch();
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demonstration
  const mockContent = searchResults.map(item => item.content);

  const stats = useMemo(() => ({
    totalItems: mockContent.length,
    thisWeek: mockContent.filter(item => {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return new Date(item.created_at) > weekAgo;
    }).length,
    totalTags: new Set(mockContent.flatMap(item => item.tags.map(tag => tag.name))).size,
    recentActivity: mockContent.slice(0, 5)
  }), [mockContent]);

  const handleContentClick = (content: any) => {
    setSelectedContent(content);
  };

  const handleSearchResults = (results: any[]) => {
    // Update search results in the main view
    console.log('AI search results:', results);
  };

  const handleApplyTags = (tags: string[]) => {
    console.log('Applying suggested tags:', tags);
    // Here you would typically update the content with new tags
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard - Accio</title>
        <meta name="description" content="Your personal content dashboard with AI-powered insights" />
      </Helmet>
      
      <MainMenu />
      
      <ResponsiveLayout maxWidth="7xl" padding="lg" verticalSpacing="lg">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, {user?.user_metadata?.name || 'there'}! 👋
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Discover insights and manage your knowledge with AI assistance
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <ResponsiveCard className="p-4">
            <div className="text-2xl font-bold text-primary">{stats.totalItems}</div>
            <div className="text-sm text-muted-foreground">Total Items</div>
          </ResponsiveCard>
          <ResponsiveCard className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.thisWeek}</div>
            <div className="text-sm text-muted-foreground">This Week</div>
          </ResponsiveCard>
          <ResponsiveCard className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.totalTags}</div>
            <div className="text-sm text-muted-foreground">Unique Tags</div>
          </ResponsiveCard>
          <ResponsiveCard className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              <Sparkles className="h-6 w-6 inline" />
            </div>
            <div className="text-sm text-muted-foreground">AI Ready</div>
          </ResponsiveCard>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="ai-insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ai-insights" className="gap-2">
              <Sparkles className="h-4 w-4" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2">
              <Search className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="quick-actions" className="gap-2">
              <Plus className="h-4 w-4" />
              Actions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-insights">
            <AIInsights
              currentContent={selectedContent}
              allContent={mockContent}
              onContentClick={handleContentClick}
              onSearchResults={handleSearchResults}
              onApplyTags={handleApplyTags}
            />
          </TabsContent>

          <TabsContent value="content">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockContent.slice(0, 9).map((item) => (
                <ResponsiveCard 
                  key={item.id} 
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleContentClick(item)}
                >
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map((tag: any) => (
                      <Badge key={tag.id} variant="secondary" className="text-xs">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </ResponsiveCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              {stats.recentActivity.map((item) => (
                <ResponsiveCard key={item.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        Saved {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 ml-4">
                      {item.tags.slice(0, 2).map((tag: any) => (
                        <Badge key={tag.id} variant="outline" className="text-xs">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </ResponsiveCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quick-actions">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ResponsiveCard className="p-6 text-center">
                <Plus className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Save Content</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add new articles, videos, or notes
                </p>
                <Button asChild className="w-full">
                  <Link to="/save-content">Save Now</Link>
                </Button>
              </ResponsiveCard>

              <ResponsiveCard className="p-6 text-center">
                <Search className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold mb-2">Advanced Search</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Find content with AI assistance
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/search">Search</Link>
                </Button>
              </ResponsiveCard>

              <ResponsiveCard className="p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-3 text-green-600" />
                <h3 className="font-semibold mb-2">Analytics</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  View your content insights
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/analytics">View Analytics</Link>
                </Button>
              </ResponsiveCard>
            </div>
          </TabsContent>
        </Tabs>
      </ResponsiveLayout>
    </div>
  );
};

export default Dashboard;
