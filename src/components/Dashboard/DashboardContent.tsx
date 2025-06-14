
import React from 'react';
import { SavedContent } from '@/types';
import WelcomeHeader from './WelcomeHeader';
import EnhancedSearchBar from '@/components/SearchBar/EnhancedSearchBar';
import QuickFilters from './QuickFilters';
import ContentFilterTabs from './ContentFilterTabs';
import ContentList from '@/components/ContentList';
import DashboardStats from './DashboardStats';
import RecentActivity from './RecentActivity';
import AchievementSystem from './AchievementSystem';
import { ContentRecommendations } from '@/components/ContentRecommendations/ContentRecommendations';
import { DashboardPersonalization } from '@/components/dashboard/DashboardPersonalization';
import { DistractionFreeMode } from '@/components/reading/DistractionFreeMode';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Main dashboard content component with default state management
 */
export const DashboardContent: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedTab, setSelectedTab] = React.useState('all');
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  const [readingModeContent, setReadingModeContent] = React.useState<SavedContent | null>(null);

  // Mock data - in real app this would come from API/context
  const content: SavedContent[] = [];
  const filteredContent = content.filter(item => {
    if (searchQuery) {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });
  const recentActivity = content.slice(0, 5);
  const tagStats = { confirmed: 0, rejected: 0 };

  const handleAddContent = () => {
    // Navigate to save content page
    console.log('Add content clicked');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
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
    setReadingModeContent(content);
  };

  const handleViewAllActivity = () => {
    console.log('View all activity clicked');
  };

  return (
    <>
      <WelcomeHeader
        userName={user?.email?.split('@')[0] || 'User'}
        totalContent={content.length}
        recentActivity={recentActivity.length}
        onAddContent={handleAddContent}
      />
      
      {/* Dashboard Personalization */}
      <div className="flex justify-end mb-4">
        <DashboardPersonalization />
      </div>
      
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
            onTabChange={handleTabChange}
          />
          
          <ContentList 
            contents={filteredContent}
            searchQuery={searchQuery}
          />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <DashboardStats tagStats={tagStats} />
          
          <ContentRecommendations 
            currentContent={filteredContent[0]} 
            maxItems={3}
          />
          
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

      {/* Distraction-Free Reading Mode */}
      {readingModeContent && (
        <DistractionFreeMode
          content={readingModeContent}
          isOpen={!!readingModeContent}
          onClose={() => setReadingModeContent(null)}
        />
      )}
    </>
  );
};

export default DashboardContent;
