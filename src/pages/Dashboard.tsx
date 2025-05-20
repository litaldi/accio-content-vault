
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SemanticSearchBar from '@/components/SemanticSearchBar';
import DashboardHeader from '@/components/DashboardHeader';
import SearchQueryInfo from '@/components/SearchQueryInfo';
import SearchResults from '@/components/SearchResults';
import { useNavigate } from 'react-router-dom';
import { useContentSearch } from '@/hooks/useContentSearch';
import { SkipLink } from '@/components/accessibility/SkipLink';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSearching, setIsSearching] = useState(false);
  
  const { 
    searchResults, 
    searchQuery, 
    isSemanticSearch, 
    handleSearch, 
    handleTagsChange 
  } = useContentSearch();

  // Track search in database or local analytics
  const trackSearch = async (query: string, isSemanticSearch: boolean) => {
    if (user && supabase) {
      try {
        // Track in Supabase if available
        await supabase.from('search_history').insert({
          user_id: user.id,
          query: query,
          is_semantic: isSemanticSearch
        });
      } catch (error) {
        console.error('Error tracking search:', error);
        // Fallback to local tracking
        const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        searchHistory.push({
          query,
          isSemanticSearch,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      }
    } else {
      // Track locally
      const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      searchHistory.push({
        query,
        isSemanticSearch,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
  };

  const handleSearchWithTracking = async (query: string, useSemanticSearch: boolean) => {
    setIsSearching(true);
    
    try {
      // Track the search
      await trackSearch(query, useSemanticSearch);
      
      // Perform the search
      await handleSearch(query, useSemanticSearch);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogout = () => {
    if (user && supabase) {
      supabase.auth.signOut();
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipLink targetId="dashboard-main" />
      <Navbar isLoggedIn={!!user} onLogout={handleLogout} />
      
      <main id="dashboard-main" className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <DashboardHeader />
          
          <Button 
            onClick={() => navigate('/save')} 
            className="mt-4 md:mt-0 flex items-center gap-2"
            aria-label="Save new content"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Save New Content</span>
          </Button>
        </div>
        
        <div className="mb-8">
          <SemanticSearchBar 
            onSearch={handleSearchWithTracking} 
            initialQuery={searchQuery}
            loading={isSearching}
          />
        </div>

        <SearchQueryInfo 
          searchQuery={searchQuery} 
          isSemanticSearch={isSemanticSearch} 
          resultsCount={searchResults.length} 
        />
        
        <SearchResults 
          searchResults={searchResults} 
          searchQuery={searchQuery} 
          onTagsChange={handleTagsChange} 
        />
      </main>
    </div>
  );
};

export default Dashboard;
