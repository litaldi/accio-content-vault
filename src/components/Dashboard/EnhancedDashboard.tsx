
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WelcomeHeader from './WelcomeHeader';
import QuickActionsPanel from './QuickActionsPanel';
import ActivityFeed from './ActivityFeed';
import ProgressTracker from './ProgressTracker';
import NotificationCenter from './NotificationCenter';
import InsightsWidget from './InsightsWidget';
import SmartTips from './SmartTips';
import DashboardStats from './DashboardStats';
import RecentActivity from './RecentActivity';
import { useEnhancedToast } from '@/components/feedback/ToastEnhancer';
import { SavedContent } from '@/types';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Zap,
  Settings,
  Star,
  Award,
  Gift
} from 'lucide-react';

// Mock data for demonstration
const mockContent: SavedContent[] = [];

const EnhancedDashboard = () => {
  const navigate = useNavigate();
  const { showSuccess, showInfo } = useEnhancedToast();
  const [activeView, setActiveView] = useState('overview');

  // Mock user data
  const userName = "Alex";
  const userLevel = "Power User";
  const isLoggedIn = true;

  // Mock query for content
  const { data: content = mockContent, isLoading } = useQuery({
    queryKey: ['saved-content'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockContent;
    },
  });

  // Mock data for new dashboard features
  const mockActivities = [
    {
      id: '1',
      type: 'save' as const,
      title: 'Saved "React Best Practices 2024"',
      description: 'Added to Programming collection',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      type: 'view' as const,
      title: 'Reviewed "UI Design Principles"',
      description: 'Viewed for 5 minutes',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
    {
      id: '3',
      type: 'tag' as const,
      title: 'Updated tags for 3 articles',
      description: 'Added #productivity tags',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    }
  ];

  const onboardingSteps = [
    { id: 'profile', title: 'Complete your profile', completed: true },
    { id: 'first-save', title: 'Save your first content', completed: content.length > 0 },
    { id: 'organize', title: 'Create your first collection', completed: false },
    { id: 'share', title: 'Share content with team', completed: false, optional: true },
    { id: 'integrate', title: 'Connect external tools', completed: false, optional: true },
  ];

  const notifications = [
    {
      id: '1',
      type: 'promotion' as const,
      title: 'Upgrade to Pro',
      message: 'Unlock unlimited saves and AI features',
      timestamp: new Date(),
      read: false,
      actionLabel: 'Upgrade Now',
      actionUrl: '/upgrade'
    },
    {
      id: '2',
      type: 'success' as const,
      title: 'Weekly Report Ready',
      message: 'Your content insights for this week are available',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: false,
      actionLabel: 'View Report'
    }
  ];

  const insights = [
    {
      id: 'saves',
      label: 'Total Saves',
      value: content.length,
      change: 12,
      changeLabel: 'vs last week',
      trend: 'up' as const,
      description: 'Content items saved'
    },
    {
      id: 'engagement',
      label: 'Engagement Score',
      value: '87%',
      change: 5,
      changeLabel: 'vs last month',
      trend: 'up' as const,
      description: 'Based on usage patterns'
    },
    {
      id: 'collections',
      label: 'Collections',
      value: 8,
      change: 2,
      changeLabel: 'new this month',
      trend: 'up' as const,
      description: 'Organized topics'
    },
    {
      id: 'streak',
      label: 'Daily Streak',
      value: '12 days',
      change: 0,
      trend: 'neutral' as const,
      description: 'Consecutive active days'
    }
  ];

  const smartTips = [
    {
      id: 'tip1',
      title: 'Organize with Collections',
      description: 'Group related content into collections for easier discovery. Start with topics you save most often.',
      category: 'productivity' as const,
      actionLabel: 'Create Collection',
      priority: 'high' as const
    },
    {
      id: 'tip2',
      title: 'Try AI-Powered Search',
      description: 'Use natural language to find content. Try searching "articles about productivity" or "videos from last month".',
      category: 'feature' as const,
      actionLabel: 'Try Now',
      priority: 'medium' as const
    },
    {
      id: 'tip3',
      title: 'Set Up Browser Extension',
      description: 'Save content directly from any website with our browser extension. Install it for seamless saving.',
      category: 'optimization' as const,
      actionLabel: 'Install Extension',
      priority: 'low' as const
    }
  ];

  // Event handlers
  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
    showInfo(`Quick Action: ${action}`, 'Feature coming soon!');
  };

  const handleStepClick = (stepId: string) => {
    console.log('Step clicked:', stepId);
    switch (stepId) {
      case 'first-save':
        navigate('/save');
        break;
      case 'organize':
        navigate('/collections');
        break;
      default:
        showInfo('Step clicked', `${stepId} feature coming soon!`);
    }
  };

  const handleNotificationAction = (notification: any) => {
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    } else {
      showInfo('Notification action', notification.actionLabel || 'Action triggered');
    }
  };

  const handleTipAction = (tip: any) => {
    switch (tip.id) {
      case 'tip1':
        navigate('/collections');
        break;
      case 'tip2':
        navigate('/search');
        break;
      default:
        showInfo('Tip action', `${tip.actionLabel} feature coming soon!`);
    }
  };

  const tagStats = useMemo(() => ({
    confirmed: content.reduce((count, item) => 
      count + item.tags.filter(tag => tag.confirmed === true).length, 0),
    rejected: content.reduce((count, item) => 
      count + item.tags.filter(tag => tag.confirmed === false).length, 0)
  }), [content]);

  const recentActivity = useMemo(() => 
    content.filter(item => {
      const itemDate = new Date(item.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return itemDate > weekAgo;
    }), [content]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Enhanced Welcome Header */}
        <WelcomeHeader
          userName={userName}
          totalContent={content.length}
          recentActivity={recentActivity.length}
          onAddContent={() => navigate('/save')}
        />

        {/* User Level Badge */}
        <div className="mb-6 flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2 px-3 py-1">
            <Star className="h-4 w-4 text-yellow-500" />
            {userLevel}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2 px-3 py-1">
            <Award className="h-4 w-4 text-primary" />
            12-day streak
          </Badge>
          {content.length > 50 && (
            <Badge variant="outline" className="flex items-center gap-2 px-3 py-1">
              <Gift className="h-4 w-4 text-purple-500" />
              Content Master
            </Badge>
          )}
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Personalize
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-3 space-y-6">
                <QuickActionsPanel onQuickAction={handleQuickAction} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProgressTracker
                    title="Setup Progress"
                    description="Complete these steps to get the most out of Accio"
                    steps={onboardingSteps}
                    onStepClick={handleStepClick}
                  />
                  <InsightsWidget
                    title="Performance Overview"
                    metrics={insights}
                    onViewDetails={() => navigate('/analytics')}
                  />
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <NotificationCenter
                  notifications={notifications}
                  onMarkAsRead={(id) => console.log('Mark as read:', id)}
                  onDismiss={(id) => console.log('Dismiss:', id)}
                  onAction={handleNotificationAction}
                />
                
                <SmartTips
                  tips={smartTips}
                  onDismissTip={(id) => console.log('Dismiss tip:', id)}
                  onTipAction={handleTipAction}
                />

                <DashboardStats tagStats={tagStats} />
              </div>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ActivityFeed
                  activities={mockActivities}
                  onViewAll={() => navigate('/activity')}
                />
              </div>
              <div className="lg:col-span-1">
                <RecentActivity
                  recentContent={recentActivity}
                  onViewContent={(content) => console.log('View content:', content)}
                  onViewAll={() => navigate('/content')}
                />
              </div>
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <InsightsWidget
                title="Content Analytics"
                metrics={insights}
                onViewDetails={() => navigate('/analytics')}
              />
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Usage Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Most active day</span>
                      <span className="font-medium">Tuesday</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Peak hours</span>
                      <span className="font-medium">2-4 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Avg. session</span>
                      <span className="font-medium">12 min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Content Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Articles</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Videos</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-1/4 h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Show welcome message</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Enable notifications</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Show tips</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <Button className="w-full mt-4">Save Preferences</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Export All Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Import from Browser
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Connect Integrations
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Download Mobile App
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
