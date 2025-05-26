
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

interface DashboardContentProps {
  userName: string;
  content: SavedContent[];
  filteredContent: SavedContent[];
  recentActivity: SavedContent[];
  searchQuery: string;
  selectedTab: string;
  activeFilters: string[];
  tagStats: { confirmed: number; rejected: number };
  onAddContent: () => void;
  onSearch: (query: string) => void;
  onSearchChange: (query: string) => void;
  onTabChange: (tab: string) => void;
  onFilterToggle: (filterId: string) => void;
  onClearFilters: () => void;
  onViewContent: (content: SavedContent) => void;
  onViewAllActivity: () => void;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  userName,
  content,
  filteredContent,
  recentActivity,
  searchQuery,
  selectedTab,
  activeFilters,
  tagStats,
  onAddContent,
  onSearch,
  onSearchChange,
  onTabChange,
  onFilterToggle,
  onClearFilters,
  onViewContent,
  onViewAllActivity,
}) => {
  const [readingModeContent, setReadingModeContent] = React.useState<SavedContent | null>(null);

  const handleOpenReadingMode = (content: SavedContent) => {
    setReadingModeContent(content);
  };

  return (
    <>
      <WelcomeHeader
        userName={userName}
        totalContent={content.length}
        recentActivity={recentActivity.length}
        onAddContent={onAddContent}
      />
      
      {/* Dashboard Personalization */}
      <div className="flex justify-end mb-4">
        <DashboardPersonalization />
      </div>
      
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <EnhancedSearchBar
            onSearch={onSearch}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />
          
          <QuickFilters
            activeFilters={activeFilters}
            onFilterToggle={onFilterToggle}
            onClearAll={onClearFilters}
          />
          
          <ContentFilterTabs
            activeTab={selectedTab}
            onTabChange={onTabChange}
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
            onViewContent={onViewContent}
            onViewAll={onViewAllActivity}
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
