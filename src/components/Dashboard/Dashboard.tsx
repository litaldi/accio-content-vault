
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import { ImprovedEmptyState } from './ImprovedEmptyState';
import WelcomeHeader from './WelcomeHeader';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import ContentList from '@/components/ContentList';
import DashboardStats from './DashboardStats';
import ContentFilterTabs from './ContentFilterTabs';
import LoadingIndicator from './LoadingIndicator';
import { useEnhancedToast } from '@/components/feedback/ToastEnhancer';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { ContentSkeleton } from '@/components/ui/content-skeleton';
import QuickFilters from './QuickFilters';
import EnhancedSearchBar from '@/components/SearchBar/EnhancedSearchBar';
import RecentActivity from './RecentActivity';
import AchievementSystem from './AchievementSystem';
import { SavedContent } from '@/types';

// Mock data for demonstration
const mockContent: SavedContent[] = [];

const Dashboard = () => {
  const navigate = useNavigate();
  const { showSuccess, showInfo } = useEnhancedToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

  // Mock authentication check
  const isLoggedIn = true;
  const userName = "Alex"; // This would come from auth context

  // Mock query for content
  const { data: content = mockContent, isLoading } = useQuery({
    queryKey: ['saved-content'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockContent;
    },
  });

  // Check if this is user's first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedDashboard');
    if (!hasVisited && content.length === 0) {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisitedDashboard', 'true');
      showInfo(
        "Welcome to your dashboard! 🎉", 
        "This is where all your saved content will appear. Start by adding your first piece of content."
      );
    } else {
      setIsFirstVisit(false);
    }
  }, [content.length, showInfo]);

  const handleAddContent = () => {
    navigate('/save');
    showSuccess(
      "Let's add some content!",
      "You'll be redirected to the save page where you can add URLs or upload files."
    );
  };

  const handleLogout = () => {
    // Mock logout functionality
    navigate('/');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterToggle = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
  };

  const handleViewContent = (content: SavedContent) => {
    // Navigate to content detail view
    console.log('Viewing content:', content);
  };

  const handleViewAllActivity = () => {
    // Navigate to full activity view
    console.log('View all activity');
  };

  // Apply filters to content
  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || item.tags?.some(tag => 
      tag.name.toLowerCase() === selectedTab.toLowerCase()
    );
    
    // Apply quick filters
    let matchesFilters = true;
    if (activeFilters.includes('recent')) {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      matchesFilters = matchesFilters && new Date(item.created_at) > threeDaysAgo;
    }
    if (activeFilters.includes('this-week')) {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesFilters = matchesFilters && new Date(item.created_at) > weekAgo;
    }
    // Add more filter logic as needed
    
    return matchesSearch && matchesTab && matchesFilters;
  });

  const recentActivity = content.filter(item => {
    const itemDate = new Date(item.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return itemDate > weekAgo;
  });

  // Calculate tag stats for DashboardStats
  const tagStats = {
    confirmed: content.reduce((count, item) => 
      count + item.tags.filter(tag => tag.confirmed === true).length, 0),
    rejected: content.reduce((count, item) => 
      count + item.tags.filter(tag => tag.confirmed === false).length, 0)
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div className="flex-grow container mx-auto px-4 py-8">
          <BreadcrumbNav />
          <div className="space-y-8">
            <div className="h-24 bg-muted/30 rounded-lg animate-pulse" />
            <ContentSkeleton count={3} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <BreadcrumbNav />
        
        {content.length === 0 ? (
          <ImprovedEmptyState onAddContent={handleAddContent} />
        ) : (
          <>
            <WelcomeHeader
              userName={userName}
              totalContent={content.length}
              recentActivity={recentActivity.length}
              onAddContent={handleAddContent}
            />
            
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 space-y-6">
                <EnhancedSearchBar
                  onSearch={handleSearch}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
                
                <QuickFilters
                  activeFilters={activeFilters}
                  onFilterToggle={handleFilterToggle}
                  onClearAll={handleClearFilters}
                />
                
                <ContentFilterTabs
                  activeTab={selectedTab}
                  onTabChange={setSelectedTab}
                />
                
                <ContentList 
                  contents={filteredContent}
                  searchQuery={searchQuery}
                />
              </div>
              
              <div className="lg:col-span-1 space-y-6">
                <DashboardStats tagStats={tagStats} />
                
                <RecentActivity
                  recentContent={recentActivity}
                  onViewContent={handleViewContent}
                  onViewAll={handleViewAllActivity}
                />
                
                <AchievementSystem
                  content={content}
                  isVisible={content.length > 0}
                />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
