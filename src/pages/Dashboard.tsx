import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { Plus, Filter, Tag, Clock, BarChart, SlidersHorizontal, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SemanticSearchBar from '@/components/SemanticSearchBar';
import DashboardHeader from '@/components/DashboardHeader';
import SearchQueryInfo from '@/components/SearchQueryInfo';
import SearchResults from '@/components/SearchResults';
import TagConfirmationDialog from '@/components/TagConfirmationDialog';
import { useContentSearch } from '@/hooks/useContentSearch';
import { useAuth } from '@/contexts/AuthContext';
import { Tag as TagType } from '@/types';

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

  // Stats for tag confirmation (for MVP requirement)
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

  // Filter content based on active tab
  const filteredResults = searchResults.filter(result => {
    if (activeTab === 'all') return true;
    
    // Filter by content type (we would need to add this field to our content model)
    if (activeTab === 'links' && !result.content.file_url) return true;
    if (activeTab === 'files' && result.content.file_url) return true;
    
    return false;
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
      </Helmet>

      <Navbar isLoggedIn={!!user} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8" id="main-content">
        <div className="flex flex-col gap-4 mb-6">
          <DashboardHeader />
          
          {/* Tag confirmation statistics - MVP requirement */}
          <div className="flex flex-wrap gap-2 text-sm">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full">
              {tagStats.confirmed} tags confirmed
            </div>
            <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full">
              {tagStats.rejected} tags rejected
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <SemanticSearchBar onSearch={(query) => handleSearch(query, true)} />
        </div>

        {/* Content type filter tabs */}
        <div className="flex justify-between items-center mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Content</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <div className="inline-flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-1" />
                  Sort
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Recent first</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Oldest first</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Tag className="h-4 w-4 mr-2" />
                  <span>Most tags</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
              resultsCount={filteredResults.length} 
            />
            
            <SearchResults 
              searchResults={filteredResults} 
              searchQuery={searchQuery} 
              onTagsChange={handleTagsChange}
              onTagConfirmRequest={setTagToConfirm} 
            />
            
            {/* Show empty state when no content */}
            {filteredResults.length === 0 && !isLoading && !searchQuery && (
              <div className="py-12 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-dashed">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No content yet</h3>
                <p className="text-muted-foreground text-center max-w-sm mb-6">
                  Start by adding your first piece of content using the "Add New Content" button.
                </p>
                <Button onClick={() => navigate('/save')}>
                  <div className="inline-flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Content
                  </div>
                </Button>
              </div>
            )}
          </>
        )}
      </main>
      
      {/* Tag confirmation dialog */}
      {tagToConfirm && (
        <TagConfirmationDialog 
          tag={tagToConfirm} 
          onConfirm={handleTagConfirm}
          onClose={() => setTagToConfirm(null)}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Dashboard;
