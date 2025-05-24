
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import EnhancedNavigation from '@/components/navigation/EnhancedNavigation';
import { DashboardContent } from './DashboardContent';
import { ImprovedEmptyState } from './ImprovedEmptyState';
import NotificationCenter from './NotificationCenter';
import { ContentSkeleton } from '@/components/ui/content-skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Search, Settings, HelpCircle, Home, ArrowLeft } from 'lucide-react';
import { useEnhancedToast } from '@/components/feedback/ToastEnhancer';
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
  const { showSuccess, showInfo } = useEnhancedToast();
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
    showSuccess(
      "Let's add some content!",
      "You'll be redirected to the save page where you can add URLs or upload files."
    );
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
        <EnhancedNavigation />
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
        <EnhancedNavigation />
        
        <main className="flex-grow">
          {/* Enhanced Header with Quick Actions */}
          <div className="border-b bg-card/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2"
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Button>
                  <div className="h-4 w-px bg-border" />
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSearch}
                    className="flex items-center gap-2"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </Button>
                  
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="flex items-center gap-2"
                    >
                      <Bell className="h-4 w-4" />
                      Notifications
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
                    className="flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/help')}
                    className="flex items-center gap-2"
                  >
                    <HelpCircle className="h-4 w-4" />
                    Help
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
