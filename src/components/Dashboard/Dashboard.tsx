
import React from 'react';
import Navbar from '@/components/Navbar';
import { ImprovedEmptyState } from './ImprovedEmptyState';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { ContentSkeleton } from '@/components/ui/content-skeleton';
import { useDashboardState } from './useDashboardState';
import { DashboardContent } from './DashboardContent';

const Dashboard = () => {
  const {
    content,
    filteredContent,
    recentActivity,
    searchQuery,
    selectedTab,
    activeFilters,
    isLoading,
    isLoggedIn,
    userName,
    tagStats,
    handleAddContent,
    handleLogout,
    handleSearch,
    handleFilterToggle,
    handleClearFilters,
    handleViewContent,
    handleViewAllActivity,
    setSearchQuery,
    setSelectedTab,
  } = useDashboardState();

  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

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
          <DashboardContent
            userName={userName}
            content={content}
            filteredContent={filteredContent}
            recentActivity={recentActivity}
            searchQuery={searchQuery}
            selectedTab={selectedTab}
            activeFilters={activeFilters}
            tagStats={tagStats}
            onAddContent={handleAddContent}
            onSearch={handleSearch}
            onSearchChange={setSearchQuery}
            onTabChange={setSelectedTab}
            onFilterToggle={handleFilterToggle}
            onClearFilters={handleClearFilters}
            onViewContent={handleViewContent}
            onViewAllActivity={handleViewAllActivity}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
