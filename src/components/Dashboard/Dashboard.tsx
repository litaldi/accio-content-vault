
import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { Tag as TagType } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useContentSearch } from '@/hooks/useContentSearch';
import { measurePerformance } from '@/utils/performance';

// Core components that should load immediately
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/DashboardHeader';
import SearchQueryInfo from '@/components/SearchQueryInfo';

// Lazy-loaded components for performance optimization
import LazySemantic from '@/components/LazySemantic';
const SearchResults = React.lazy(() => import('@/components/SearchResults'));
const TagConfirmationDialog = React.lazy(() => import('@/components/TagConfirmationDialog'));

// Dashboard components
import { 
  DashboardStats,
  EmptyState,
  ContentFilterTabs,
  LoadingIndicator
} from './';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { 
    searchResults, 
    searchQuery, 
    isSemanticSearch,
    isLoading,
    handleSearch, 
    handleTagsChange 
  } = useContentSearch();
  
  const [tagToConfirm, setTagToConfirm] = useState<TagType | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  // Stats for tag confirmation
  const [tagStats, setTagStats] = useState({
    confirmed: 0,
    rejected: 0
  });

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Handle tag confirmation
  const handleTagConfirm = (confirmed: boolean) => {
    if (tagToConfirm) {
      // Update stats
      setTagStats(prev => ({
        confirmed: confirmed ? prev.confirmed + 1 : prev.confirmed,
        rejected: !confirmed ? prev.rejected + 1 : prev.rejected
      }));
      
      // Close dialog
      setTagToConfirm(null);
    }
  };

  // Filter content based on active tab - Use performance measurement
  const filteredResults = measurePerformance('FilterResults', () => {
    return searchResults.filter(result => {
      if (activeTab === 'all') return true;
      
      // Filter by content type
      if (activeTab === 'links' && !result.content.file_url) return true;
      if (activeTab === 'files' && result.content.file_url) return true;
      
      return false;
    });
  });

  // Check if user is authenticated, if not redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Dashboard | Accio</title>
        <meta name="description" content="Manage and search your saved content." />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/assets/logo.svg" as="image" />
        
        {/* Add preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Helmet>

      <Navbar isLoggedIn={!!user} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8" id="main-content">
        <div className="flex flex-col gap-4 mb-6">
          <DashboardHeader />
          <DashboardStats tagStats={tagStats} />
        </div>
        
        <div className="mb-8">
          <LazySemantic onSearch={(query, semantic) => handleSearch(query, semantic)} />
        </div>

        <ContentFilterTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <SearchQueryInfo 
              searchQuery={searchQuery} 
              isSemanticSearch={isSemanticSearch} 
              resultsCount={filteredResults.length} 
            />
            
            <Suspense fallback={<LoadingIndicator />}>
              <SearchResults 
                searchResults={filteredResults} 
                searchQuery={searchQuery} 
                onTagsChange={handleTagsChange}
                onTagConfirmRequest={setTagToConfirm} 
              />
            </Suspense>
            
            {/* Show empty state when no content */}
            {filteredResults.length === 0 && !isLoading && !searchQuery && (
              <EmptyState onAddContent={() => navigate('/save')} />
            )}
          </>
        )}
      </main>
      
      {/* Tag confirmation dialog - Only load when needed */}
      {tagToConfirm && (
        <Suspense fallback={null}>
          <TagConfirmationDialog 
            tag={tagToConfirm} 
            onConfirm={handleTagConfirm}
            onClose={() => setTagToConfirm(null)}
          />
        </Suspense>
      )}
      
      <Footer />
    </div>
  );
};

export default Dashboard;
