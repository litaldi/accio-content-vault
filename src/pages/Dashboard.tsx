import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Helmet } from 'react-helmet-async';
import { Plus, Search, Archive, BarChart3, Clock, Heart, Mic, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import MainMenu from '@/components/navigation/MainMenu';
import { ResponsiveLayout } from '@/components/ui/responsive-layout';
import { ResponsiveCard } from '@/components/ui/responsive-card';
import { RecentlyViewed } from '@/components/sections/RecentlyViewed';
import { EnhancedTagSuggestions } from '@/components/suggestions/EnhancedTagSuggestions';
import { SmartRecommendations } from '@/components/suggestions/SmartRecommendations';
import { ContentActions } from '@/components/actions/ContentActions';
import { VoiceSearchButton } from '@/components/VoiceSearch/VoiceSearchButton';
import { useVoiceSearch } from '@/hooks/useVoiceSearch';
import { useOfflineContent } from '@/hooks/useOfflineContent';
import OfflineIndicator from '@/components/OfflineIndicator';
import ImprovedFooter from '@/components/Footer/ImprovedFooter';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Offline content integration
  const {
    offlineContents,
    isOnline,
    isLoading: syncLoading,
    syncWithServer
  } = useOfflineContent();

  // Voice search integration
  const { isListening, isSupported } = useVoiceSearch({
    onTranscript: (text, isFinal) => {
      if (isFinal && text.trim()) {
        navigate(`/search?q=${encodeURIComponent(text.trim())}`);
      }
    },
  });

  // Mock data for demonstration
  const recentItems = [
    {
      id: '1',
      user_id: 'user1',
      title: "How to Build a Personal Knowledge Base",
      url: "https://example.com/knowledge-base",
      description: "A comprehensive guide to organizing information...",
      tags: [
        { id: 'tag1', name: 'productivity', auto_generated: false, confirmed: true },
        { id: 'tag2', name: 'knowledge-management', auto_generated: true, confirmed: true }
      ],
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    },
    {
      id: '2',
      user_id: 'user1',
      title: "React Best Practices 2024",
      url: "https://example.com/react-practices",
      description: "Modern React patterns and optimization techniques...",
      tags: [
        { id: 'tag3', name: 'react', auto_generated: false, confirmed: true },
        { id: 'tag4', name: 'development', auto_generated: false, confirmed: true }
      ],
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      id: '3',
      user_id: 'user1',
      title: "Design System Notes",
      url: "",
      description: "Key principles for building consistent design systems...",
      tags: [
        { id: 'tag5', name: 'design', auto_generated: false, confirmed: true },
        { id: 'tag6', name: 'ui-ux', auto_generated: true, confirmed: false }
      ],
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    }
  ];

  const handleViewContent = (content: any) => {
    console.log('Viewing content:', content);
    // In a real app, this would navigate to content detail or open a modal
  };

  const handleViewAllRecent = () => {
    navigate('/search?filter=recent');
  };

  const handleTagSuggestionClick = (tag: string) => {
    navigate(`/search?tag=${tag}`);
  };

  const handleVoiceSearch = (text: string, isFinal: boolean) => {
    if (isFinal && text.trim()) {
      navigate(`/search?q=${encodeURIComponent(text.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Dashboard - Accio</title>
        <meta name="description" content="Your personal content library dashboard" />
      </Helmet>
      
      <MainMenu />
      
      <main className="flex-grow">
        <ResponsiveLayout maxWidth="2xl" padding="lg" verticalSpacing="lg">
          {/* Welcome Header with Offline Status */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Welcome back, {user?.email?.split('@')[0] || 'there'}!
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Your personal knowledge library awaits
                </p>
              </div>
              
              <OfflineIndicator
                isOnline={isOnline}
                isLoading={syncLoading}
                onSync={syncWithServer}
              />
            </div>
          </div>

          {/* Quick Actions with Offline Access */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <ResponsiveCard
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/save')}
            >
              <CardContent className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Plus className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Save Content</h3>
                  <p className="text-xs text-muted-foreground">Add new items</p>
                </div>
              </CardContent>
            </ResponsiveCard>

            <ResponsiveCard
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/search')}
            >
              <CardContent className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Search className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Search</h3>
                  <p className="text-xs text-muted-foreground">Find anything</p>
                </div>
              </CardContent>
            </ResponsiveCard>

            <ResponsiveCard
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/offline')}
            >
              <CardContent className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Wifi className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Offline Access</h3>
                  <p className="text-xs text-muted-foreground">{offlineContents.length} cached</p>
                </div>
              </CardContent>
            </ResponsiveCard>

            <ResponsiveCard
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/search?filter=favorites')}
            >
              <CardContent className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Favorites</h3>
                  <p className="text-xs text-muted-foreground">Pinned items</p>
                </div>
              </CardContent>
            </ResponsiveCard>

            <ResponsiveCard
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/analytics')}
            >
              <CardContent className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Insights</h3>
                  <p className="text-xs text-muted-foreground">View stats</p>
                </div>
              </CardContent>
            </ResponsiveCard>
          </div>

          {/* Enhanced Search Bar with Voice */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your content..."
                className="pl-10 pr-12"
                onFocus={() => navigate('/search')}
              />
              {isSupported && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <VoiceSearchButton
                    onTranscript={handleVoiceSearch}
                    variant="ghost"
                    size="sm"
                  />
                </div>
              )}
            </div>
            
            {isListening && (
              <div className="text-center mt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm">
                  <Mic className="h-4 w-4 animate-pulse" />
                  Listening for search...
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recently Saved
                  </CardTitle>
                  <CardDescription>
                    Your latest content additions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-sm line-clamp-1 flex-1">{item.title}</h3>
                        <div className="flex items-center gap-2 ml-2">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                          <ContentActions 
                            contentId={item.id}
                            onView={() => handleViewContent(item)}
                            compact
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => navigate('/collections')}
                  >
                    View All Content
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Recently Viewed */}
              <RecentlyViewed
                recentItems={recentItems.slice(0, 2)}
                onViewAll={handleViewAllRecent}
                onItemClick={handleViewContent}
              />

              {/* Enhanced Tag Suggestions */}
              <EnhancedTagSuggestions 
                allContent={recentItems}
                onTagClick={handleTagSuggestionClick}
              />

              {/* Smart Recommendations */}
              <SmartRecommendations
                allContent={recentItems}
                onContentClick={handleViewContent}
                maxRecommendations={3}
              />

              {/* Quick Stats with Offline Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Items</span>
                      <span className="font-semibold">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Offline Ready</span>
                      <span className="font-semibold text-green-600">{offlineContents.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">This Week</span>
                      <span className="font-semibold text-green-600">+8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Favorites</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tags Used</span>
                      <span className="font-semibold">23</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ResponsiveLayout>
      </main>
      
      <ImprovedFooter />
    </div>
  );
};

export default Dashboard;
