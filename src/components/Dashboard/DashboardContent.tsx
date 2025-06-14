
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

interface DashboardContentProps {
  userName?: string;
  content?: SavedContent[];
  filteredContent?: SavedContent[];
  recentActivity?: SavedContent[];
  searchQuery?: string;
  selectedTab?: string;
  activeFilters?: string[];
  tagStats?: { confirmed: number; rejected: number };
  readingModeContent?: SavedContent | null;
  onSearch?: (query: string) => void;
  onSearchChange?: (query: string) => void;
  onTabChange?: (tab: string) => void;
  onFilterToggle?: (filterId: string) => void;
  onClearFilters?: () => void;
  onViewContent?: (content: SavedContent) => void;
  onViewAllActivity?: () => void;
  onAddContent?: () => void;
}

/**
 * Main dashboard content component with default state management
 */
export const DashboardContent: React.FC<DashboardContentProps> = ({
  userName: propUserName,
  content: propContent,
  filteredContent: propFilteredContent,
  recentActivity: propRecentActivity,
  searchQuery: propSearchQuery,
  selectedTab: propSelectedTab,
  activeFilters: propActiveFilters,
  tagStats: propTagStats,
  readingModeContent: propReadingModeContent,
  onSearch: propOnSearch,
  onSearchChange: propOnSearchChange,
  onTabChange: propOnTabChange,
  onFilterToggle: propOnFilterToggle,
  onClearFilters: propOnClearFilters,
  onViewContent: propOnViewContent,
  onViewAllActivity: propOnViewAllActivity,
  onAddContent: propOnAddContent
}) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState(propSearchQuery || '');
  const [selectedTab, setSelectedTab] = React.useState(propSelectedTab || 'all');
  const [activeFilters, setActiveFilters] = React.useState<string[]>(propActiveFilters || []);
  const [readingModeContent, setReadingModeContent] = React.useState<SavedContent | null>(propReadingModeContent || null);

  // Use props or default values
  const userName = propUserName || user?.email?.split('@')[0] || 'User';
  const content: SavedContent[] = propContent || [];
  const filteredContent = propFilteredContent || content.filter(item => {
    if (searchQuery) {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });
  const recentActivity = propRecentActivity || content.slice(0, 5);
  const tagStats = propTagStats || { confirmed: 0, rejected: 0 };

  const handleAddContent = propOnAddContent || (() => {
    console.log('Add content clicked');
  });

  const handleSearch = propOnSearch || ((query: string) => {
    setSearchQuery(query);
  });

  const handleSearchChange = propOnSearchChange || setSearchQuery;

  const handleTabChange = propOnTabChange || ((tab: string) => {
    setSelectedTab(tab);
  });

  const handleFilterToggle = propOnFilterToggle || ((filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  });

  const handleClearFilters = propOnClearFilters || (() => {
    setActiveFilters([]);
  });

  const handleViewContent = propOnViewContent || ((content: SavedContent) => {
    setReadingModeContent(content);
  });

  const handleViewAllActivity = propOnViewAllActivity || (() => {
    console.log('View all activity clicked');
  });

  return (
    <>
      <WelcomeHeader
        userName={userName}
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
            onSearchChange={handleSearchChange}
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
