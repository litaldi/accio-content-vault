
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search as SearchIcon, Filter, SortDesc, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import MainMenu from '@/components/navigation/MainMenu';
import { ResponsiveLayout } from '@/components/ui/responsive-layout';
import { ResponsiveCard } from '@/components/ui/responsive-card';
import { MultiTagFilter } from '@/components/filters/MultiTagFilter';
import { TagSuggestions } from '@/components/suggestions/TagSuggestions';

const Search = () => {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'relevance' | 'title'>('relevance');

  // Mock search results
  const searchResults = [
    {
      id: 1,
      title: "Building Effective Personal Knowledge Management Systems",
      type: "article",
      url: "https://example.com/knowledge-systems",
      tags: ["productivity", "knowledge-management", "tools"],
      savedAt: "2024-01-15",
      preview: "A comprehensive guide to organizing information effectively using modern tools and techniques...",
      relevanceScore: 95
    },
    {
      id: 2,
      title: "React Performance Optimization Guide",
      type: "pdf",
      tags: ["react", "development", "performance"],
      savedAt: "2024-01-14",
      preview: "Advanced techniques for optimizing React applications including memoization, code splitting...",
      relevanceScore: 87
    },
    {
      id: 3,
      title: "Design System Documentation",
      type: "note",
      tags: ["design", "ui-ux", "documentation"],
      savedAt: "2024-01-12",
      preview: "Personal notes on implementing consistent design systems across multiple products...",
      relevanceScore: 76
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
    "productivity tools",
    "React optimization",
    "design systems",
    "knowledge management"
  ];

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
  };

  const handleTagSuggestionClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Filter results based on selected tags
  const filteredResults = searchResults.filter(result => {
    const matchesQuery = !query || 
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.preview.toLowerCase().includes(query.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => result.tags.includes(tag));
    
    return matchesQuery && matchesTags;
  });

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Search - Accio</title>
        <meta name="description" content="Search your personal content library with AI-powered intelligence" />
      </Helmet>
      
      <MainMenu />
      
      <ResponsiveLayout maxWidth="2xl" padding="lg" verticalSpacing="lg">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Search Your Library
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Find anything with natural language or keywords
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for 'productivity articles' or 'What did I save about React?'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 py-6 text-base"
            />
          </div>
        </div>

        {/* Multi-Tag Filter */}
        <div className="mb-6">
          <MultiTagFilter
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagsChange={handleTagsChange}
            onClear={handleClearFilters}
          />
        </div>

        {!query && selectedTags.length === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Searches */}
            <ResponsiveCard>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Recent Searches</h3>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(search)}
                      className="block w-full text-left p-2 rounded-md hover:bg-accent text-sm transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </CardContent>
            </ResponsiveCard>

            {/* Tag Suggestions */}
            <TagSuggestions 
              suggestions={tagSuggestions}
              onTagClick={handleTagSuggestionClick}
            />
          </div>
        )}

        {(query || selectedTags.length > 0) && (
          <>
            {/* Search Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Sort by:</span>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm border rounded-md px-2 py-1 bg-background"
              >
                <option value="relevance">Most Relevant</option>
                <option value="recent">Most Recent</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>

            {/* Search Results */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Found {filteredResults.length} results
                  {query && ` for "${query}"`}
                  {selectedTags.length > 0 && ` with tags: ${selectedTags.join(', ')}`}
                </p>
              </div>

              {filteredResults.map((result) => (
                <ResponsiveCard
                  key={result.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                          {result.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {result.type} • Saved on {new Date(result.savedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground ml-4">
                        {result.relevanceScore}% match
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {result.preview}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {result.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="text-xs cursor-pointer hover:bg-accent"
                          onClick={() => handleTagSuggestionClick(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </ResponsiveCard>
              ))}
            </div>

            {/* No Results State */}
            {filteredResults.length === 0 && (
              <div className="text-center py-12">
                <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or removing filters
                </p>
                <Button variant="outline" onClick={() => {
                  setQuery('');
                  setSelectedTags([]);
                }}>
                  Clear Search
                </Button>
              </div>
            )}
          </>
        )}
      </ResponsiveLayout>
    </div>
  );
};

export default Search;
