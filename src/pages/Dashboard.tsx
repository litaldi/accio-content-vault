
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Helmet } from 'react-helmet-async';
import { Plus, Search, Archive, BarChart3, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import MainMenu from '@/components/navigation/MainMenu';
import { ResponsiveLayout } from '@/components/ui/responsive-layout';
import { ResponsiveCard } from '@/components/ui/responsive-card';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data for demonstration
  const recentItems = [
    {
      id: 1,
      title: "How to Build a Personal Knowledge Base",
      type: "article",
      tags: ["productivity", "knowledge-management", "tools"],
      savedAt: "2 hours ago",
      preview: "A comprehensive guide to organizing information..."
    },
    {
      id: 2,
      title: "React Best Practices 2024",
      type: "pdf",
      tags: ["react", "development", "best-practices"],
      savedAt: "1 day ago",
      preview: "Modern React patterns and optimization techniques..."
    },
    {
      id: 3,
      title: "Design System Notes",
      type: "note",
      tags: ["design", "ui-ux", "notes"],
      savedAt: "3 days ago",
      preview: "Key principles for building consistent design systems..."
    }
  ];

  const popularTags = [
    { name: "productivity", count: 12 },
    { name: "development", count: 8 },
    { name: "design", count: 6 },
    { name: "research", count: 5 },
    { name: "inspiration", count: 4 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard - Accio</title>
        <meta name="description" content="Your personal content library dashboard" />
      </Helmet>
      
      <MainMenu />
      
      <ResponsiveLayout maxWidth="2xl" padding="lg" verticalSpacing="lg">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, {user?.email?.split('@')[0] || 'there'}!
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Your personal knowledge library awaits
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
            onClick={() => navigate('/collections')}
          >
            <CardContent className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Archive className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Collections</h3>
                <p className="text-xs text-muted-foreground">Browse tags</p>
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

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your content..."
              className="pl-10"
              onFocus={() => navigate('/search')}
            />
          </div>
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
                    className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {item.savedAt}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {item.preview}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                        >
                          {tag}
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

          {/* Popular Tags */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
                <CardDescription>
                  Your most used categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularTags.map((tag) => (
                    <div
                      key={tag.name}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/search?tag=${tag.name}`)}
                    >
                      <span className="font-medium text-sm">{tag.name}</span>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {tag.count}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Button
                  variant="ghost"
                  className="w-full mt-4"
                  onClick={() => navigate('/tags')}
                >
                  View All Tags
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
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
                    <span className="text-sm text-muted-foreground">This Week</span>
                    <span className="font-semibold text-green-600">+8</span>
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
    </div>
  );
};

export default Dashboard;
