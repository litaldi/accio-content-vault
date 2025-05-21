
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SemanticSearchBar from '@/components/SemanticSearchBar';
import DashboardHeader from '@/components/DashboardHeader';
import SearchQueryInfo from '@/components/SearchQueryInfo';
import SearchResults from '@/components/SearchResults';
import { useNavigate } from 'react-router-dom';
import { useContentSearch } from '@/hooks/useContentSearch';
import { Loader2 } from 'lucide-react';
import { Helmet } from "react-helmet-async";

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Dashboard | Accio</title>
        <meta name="description" content="Manage and search your saved content." />
      </Helmet>

      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8" id="main-content">
        <div className="flex flex-col gap-4 mb-6">
          <DashboardHeader />
        </div>
        
        <div className="mb-8">
          <SemanticSearchBar onSearch={handleSearch} />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center py-12">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" aria-hidden="true" />
            <p className="text-muted-foreground">Searching content...</p>
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
      
      <Footer />
    </div>
  );
};

export default Dashboard;
