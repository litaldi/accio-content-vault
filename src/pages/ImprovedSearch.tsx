
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Filter, SortDesc, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImprovedCard, ImprovedCardContent } from '@/components/ui/improved-card';
import { Badge } from '@/components/ui/badge';
import MainMenu from '@/components/navigation/MainMenu';
import { ResponsiveLayout } from '@/components/ui/responsive-layout';
import { MultiTagFilter } from '@/components/filters/MultiTagFilter';
import { SearchHeader } from '@/components/search/SearchHeader';
import { SearchInput } from '@/components/search/SearchInput';
import { SearchSidebar } from '@/components/search/SearchSidebar';
import { SearchResults } from '@/components/search/SearchResults';

const ImprovedSearch = () => {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'relevance' | 'title'>('relevance');

  const searchResults = [
    {
      id: 1,
      title: "Building Effective Personal Knowledge Management Systems",
      type: "article",
      url: "https://example.com/knowledge-systems",
      tags: ["productivity", "knowledge-management", "tools"],
      savedAt: "2024-01-15",
      preview: "A comprehensive guide to organizing information effectively using modern tools and techniques for better productivity and learning outcomes...",
      relevanceScore: 95,
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "React Performance Optimization Guide",
      type: "pdf",
      tags: ["react", "development", "performance"],
      savedAt: "2024-01-14",
      preview: "Advanced techniques for optimizing React applications including memoization, code splitting, and performance monitoring strategies...",
      relevanceScore: 87,
      readTime: "12 min read"
    },
    {
      id: 3,
      title: "Design System Documentation",
      type: "note",
      tags: ["design", "ui-ux", "documentation"],
      savedAt: "2024-01-12",
      preview: "Personal notes on implementing consistent design systems across multiple products with practical examples and best practices...",
      relevanceScore: 76,
      readTime: "5 min read"
    }
  ];

  const availableTags = [
    "productivity", "development", "design", "research", "tools",
    "knowledge-management", "react", "ui-ux", "performance", "documentation"
  ];

  const tagSuggestions = [
    { name: "productivity", frequency: 12, trending: true },
    { name: "development", frequency: 8, trending: false },
    { name: "design", frequency: 6, trending: true },
    { name: "research", frequency: 5, trending: false },
  ];

  const recentSearches = [
    { query: "productivity tools", results: 24 },
    { query: "React optimization", results: 8 },
    { query: "design systems", results: 15 },
    { query: "knowledge management", results: 32 }
  ];

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setQuery('');
  };

  const handleTagSuggestionClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredResults = searchResults.filter(result => {
    const matchesQuery = !query || 
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.preview.toLowerCase().includes(query.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => result.tags.includes(tag));
    
    return matchesQuery && matchesTags;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <Helmet>
        <title>Search - Accio</title>
        <meta name="description" content="Search your personal content library with AI-powered intelligence" />
      </Helmet>
      
      <MainMenu />
      
      <ResponsiveLayout maxWidth="2xl" padding="lg" verticalSpacing="lg">
        <SearchHeader />
        <SearchInput query={query} onQueryChange={setQuery} />
        
        <div className="mb-8">
          <MultiTagFilter
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagsChange={handleTagsChange}
            onClear={handleClearFilters}
          />
        </div>

        {!query && selectedTags.length === 0 && (
          <SearchSidebar
            recentSearches={recentSearches}
            tagSuggestions={tagSuggestions}
            onSearchClick={setQuery}
            onTagClick={handleTagSuggestionClick}
          />
        )}

        {(query || selectedTags.length > 0) && (
          <>
            {/* Search Filters */}
            <ImprovedCard className="mb-8 bg-background/50 backdrop-blur-sm">
              <ImprovedCardContent padding="md">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <label htmlFor="sort-select" className="text-sm font-medium">Sort by:</label>
                    </div>
                    
                    <select
                      id="sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="text-sm border rounded-lg px-3 py-2 bg-background/80 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      aria-label="Sort search results"
                    >
                      <option value="relevance">Most Relevant</option>
                      <option value="recent">Most Recent</option>
                      <option value="title">Alphabetical</option>
                    </select>
                  </div>
                  
                  <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
                    Found {filteredResults.length} results
                    {query && ` for "${query}"`}
                    {selectedTags.length > 0 && ` with tags: ${selectedTags.join(', ')}`}
                  </p>
                </div>
              </ImprovedCardContent>
            </ImprovedCard>

            {filteredResults.length > 0 ? (
              <SearchResults 
                results={filteredResults}
                selectedTags={selectedTags}
                onTagClick={handleTagSuggestionClick}
              />
            ) : (
              <ImprovedCard className="text-center bg-background/80 backdrop-blur-sm">
                <ImprovedCardContent padding="xl">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 bg-muted/20 rounded-full flex items-center justify-center">
                      <SearchIcon className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">No results found</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      We couldn't find any content matching your search criteria. 
                      Try adjusting your search terms or removing some filters.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={handleClearFilters}
                      className="shadow-md"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </ImprovedCardContent>
              </ImprovedCard>
            )}
          </>
        )}
      </ResponsiveLayout>
    </div>
  );
};

export default ImprovedSearch;
