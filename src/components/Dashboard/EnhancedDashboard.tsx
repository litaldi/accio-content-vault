
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import ProfessionalNavigation from '@/components/navigation/ProfessionalNavigation';
import NavigationButtons from '@/components/navigation/NavigationButtons';
import { DashboardContent } from './DashboardContent';
import { ImprovedEmptyState } from './ImprovedEmptyState';
import NotificationCenter from './NotificationCenter';
import { ContentSkeleton } from '@/components/ui/content-skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Search, Settings, HelpCircle, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SavedContent } from '@/types';

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    type: 'info' as const,
    title: 'Welcome to Accio!',
    message: 'Start building your knowledge library by saving your first content.',
    timestamp: new Date(),
    read: false,
    actionLabel: 'Get Started',
    actionUrl: '/save'
  },
  {
    id: '2',
    type: 'success' as const,
    title: 'Feature Update',
    message: 'New AI-powered search is now available. Try searching with natural language.',
    timestamp: new Date(Date.now() - 86400000),
    read: false,
    actionLabel: 'Try Search',
    actionUrl: '/search'
  }
];

const EnhancedDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Mock authentication check
  const isLoggedIn = true;
  const userName = "Alex";

  // Mock query for content
  const { data: content = [], isLoading } = useQuery({
    queryKey: ['saved-content'],
    queryFn: async (): Promise<SavedContent[]> => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [];
    },
  });

  const handleAddContent = () => {
    navigate('/save');
    toast({
      title: "Let's add some content!",
      description: "You'll be redirected to the save page where you can add URLs or upload files."
    });
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleSearch = () => {
    navigate('/search');
  };

  const handleNotificationAction = (notification: typeof mockNotifications[0]) => {
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
    handleMarkAsRead(notification.id);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <ProfessionalNavigation />
        <div className="flex-grow container mx-auto px-4 py-8">
          <div className="space-y-8">
            <div className="h-24 bg-muted/30 rounded-lg animate-pulse" />
            <ContentSkeleton count={3} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Accio Knowledge Library</title>
        <meta name="description" content="Your personal knowledge dashboard with AI-powered insights" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <ProfessionalNavigation />
        
        <main className="flex-grow">
          {/* Enhanced Header with Quick Actions */}
          <div className="border-b bg-card/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <NavigationButtons showBackButton={false} />
                  <div className="h-4 w-px bg-border" />
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSearch}
                    aria-label="Search your content library"
                  >
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">Search</span>
                  </Button>
                  
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowNotifications(!showNotifications)}
                      aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
                    >
                      <Bell className="h-4 w-4" />
                      <span className="hidden sm:inline ml-2">Notifications</span>
                      {unreadCount > 0 && (
                        <Badge variant="destructive" className="ml-1 text-xs">
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                    
                    {showNotifications && (
                      <div className="absolute right-0 top-full mt-2 w-96 z-50">
                        <NotificationCenter
                          notifications={notifications}
                          onMarkAsRead={handleMarkAsRead}
                          onDismiss={handleDismissNotification}
                          onAction={handleNotificationAction}
                        />
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/settings')}
                    aria-label="Open settings"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">Settings</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/help')}
                    aria-label="Get help and support"
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">Help</span>
                  </Button>

                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleAddContent}
                    aria-label="Add new content"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">Add Content</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-8">
            {content.length === 0 ? (
              <ImprovedEmptyState onAddContent={handleAddContent} />
            ) : (
              <DashboardContent
                userName={userName}
                content={content}
                filteredContent={content}
                recentActivity={content}
                searchQuery=""
                selectedTab="all"
                activeFilters={[]}
                tagStats={{ confirmed: 0, rejected: 0 }}
                onAddContent={handleAddContent}
                onSearch={() => {}}
                onSearchChange={() => {}}
                onTabChange={() => {}}
                onFilterToggle={() => {}}
                onClearFilters={() => {}}
                onViewContent={() => {}}
                onViewAllActivity={() => {}}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default EnhancedDashboard;
