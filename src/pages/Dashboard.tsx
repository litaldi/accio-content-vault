
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import SemanticSearchBar from '@/components/SemanticSearchBar';
import DashboardHeader from '@/components/DashboardHeader';
import SearchQueryInfo from '@/components/SearchQueryInfo';
import SearchResults from '@/components/SearchResults';
import { useContentSearch } from '@/hooks/useContentSearch';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    searchResults, 
    searchQuery, 
    isSemanticSearch,
    isLoading,
    handleSearch, 
    handleTagsChange 
  } = useContentSearch();

  // This would be replaced with actual authentication check
  const isLoggedIn = true;

  const handleLogout = () => {
    // In a real app, this would call Supabase auth.signOut()
    navigate('/');
  };
  
  const handleAddContent = () => {
    navigate('/save');
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | ReadSmart</title>
        <meta name="description" content="Access and manage your saved content" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        
        <main className="flex-grow container mx-auto px-4 py-8" id="main-content">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <DashboardHeader />
            
            <Button 
              onClick={handleAddContent}
              className="w-full md:w-auto"
              aria-label="Add new content"
            >
              <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
              <span>Add New Content</span>
            </Button>
          </div>
          
          <div className="mb-8">
            <SemanticSearchBar onSearch={handleSearch} />
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center py-12">
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" aria-hidden="true" />
              <p className="text-muted-foreground" role="status">Searching content...</p>
            </div>
          ) : (
            <>
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
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
