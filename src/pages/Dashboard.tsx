
import React from 'react';
import Navbar from '@/components/Navbar';
import SemanticSearchBar from '@/components/SemanticSearchBar';
import DashboardHeader from '@/components/DashboardHeader';
import SearchQueryInfo from '@/components/SearchQueryInfo';
import SearchResults from '@/components/SearchResults';
import { useNavigate } from 'react-router-dom';
import { useContentSearch } from '@/hooks/useContentSearch';

const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    searchResults, 
    searchQuery, 
    isSemanticSearch, 
    handleSearch, 
    handleTagsChange 
  } = useContentSearch();

  // This would be replaced with actual authentication check
  const isLoggedIn = true;

  const handleLogout = () => {
    // In a real app, this would call Supabase auth.signOut()
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <DashboardHeader />
        
        <div className="mb-8">
          <SemanticSearchBar onSearch={handleSearch} />
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
