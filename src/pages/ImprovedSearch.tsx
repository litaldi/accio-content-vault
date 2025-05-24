
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search as SearchIcon, Filter, SortDesc, Clock, Tag, Sparkles, TrendingUp } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { ImprovedCard, ImprovedCardContent } from '@/components/ui/improved-card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import MainMenu from '@/components/navigation/MainMenu';
import { ResponsiveLayout } from '@/components/ui/responsive-layout';
import { ResponsiveCard } from '@/components/ui/responsive-card';
import { MultiTagFilter } from '@/components/filters/MultiTagFilter';
import { TagSuggestions } from '@/components/suggestions/TagSuggestions';
import { cn } from '@/lib/utils';

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return '📰';
      case 'pdf':
        return '📄';
      case 'note':
        return '📝';
      default:
        return '📄';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <Helmet>
        <title>Search - Accio</title>
        <meta name="description" content="Search your personal content library with AI-powered intelligence" />
      </Helmet>
      
      <MainMenu />
      
      <ResponsiveLayout maxWidth="2xl" padding="lg" verticalSpacing="lg">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <SearchIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Search Your Library
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Find anything with natural language or keywords
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Search Input */}
        <ImprovedCard className="mb-8 border-0 shadow-lg bg-background/80 backdrop-blur-sm">
          <ImprovedCardContent padding="lg">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for 'productivity articles' or 'What did I save about React?'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 py-6 text-base border-0 bg-background/50 focus:bg-background transition-colors shadow-inner"
              />
              {query && (
                <EnhancedButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuery('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  Clear
                </EnhancedButton>
              )}
            </div>
          </ImprovedCardContent>
        </ImprovedCard>

        {/* Enhanced Multi-Tag Filter */}
        <div className="mb-8">
          <MultiTagFilter
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagsChange={handleTagsChange}
            onClear={handleClearFilters}
          />
        </div>

        {!query && selectedTags.length === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Enhanced Recent Searches */}
            <ImprovedCard hover className="bg-background/80 backdrop-blur-sm">
              <ImprovedCardContent padding="lg">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Recent Searches</h3>
                </div>
                <div className="space-y-3">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(search.query)}
                      className={cn(
                        "flex items-center justify-between w-full p-3 rounded-lg",
                        "hover:bg-accent transition-colors text-left group"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <SearchIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="font-medium">{search.query}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {search.results} results
                      </Badge>
                    </button>
                  ))}
                </div>
              </ImprovedCardContent>
            </ImprovedCard>

            {/* Enhanced Tag Suggestions */}
            <ImprovedCard hover className="bg-background/80 backdrop-blur-sm">
              <ImprovedCardContent padding="lg">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Popular Tags</h3>
                </div>
                <div className="space-y-3">
                  {tagSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.name}
                      onClick={() => handleTagSuggestionClick(suggestion.name)}
                      className={cn(
                        "flex items-center justify-between w-full p-3 rounded-lg",
                        "hover:bg-accent transition-colors text-left group"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Tag className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="font-medium">{suggestion.name}</span>
                        {suggestion.trending && (
                          <Sparkles className="h-3 w-3 text-primary" />
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.frequency} items
                      </Badge>
                    </button>
                  ))}
                </div>
              </ImprovedCardContent>
            </ImprovedCard>
          </div>
        )}

        {(query || selectedTags.length > 0) && (
          <>
            {/* Enhanced Search Filters */}
            <ImprovedCard className="mb-8 bg-background/50 backdrop-blur-sm">
              <ImprovedCardContent padding="md">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Sort by:</span>
                    </div>
                    
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="text-sm border rounded-lg px-3 py-2 bg-background/80 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    >
                      <option value="relevance">Most Relevant</option>
                      <option value="recent">Most Recent</option>
                      <option value="title">Alphabetical</option>
                    </select>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Found {filteredResults.length} results
                    {query && ` for "${query}"`}
                    {selectedTags.length > 0 && ` with tags: ${selectedTags.join(', ')}`}
                  </p>
                </div>
              </ImprovedCardContent>
            </ImprovedCard>

            {/* Enhanced Search Results */}
            <div className="space-y-6">
              {filteredResults.map((result) => (
                <ImprovedCard
                  key={result.id}
                  className="bg-background/80 backdrop-blur-sm border-0 shadow-lg"
                  hover
                  interactive
                >
                  <ImprovedCardContent padding="lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getTypeIcon(result.type)}</span>
                        <div>
                          <h3 className="font-semibold text-xl mb-1 text-foreground group-hover:text-primary transition-colors">
                            {result.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="capitalize font-medium">{result.type}</span>
                            <span>•</span>
                            <span>Saved on {new Date(result.savedAt).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{result.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs font-medium">
                          {result.relevanceScore}% match
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {result.preview}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {result.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className={cn(
                            "text-xs cursor-pointer transition-all hover:scale-105",
                            selectedTags.includes(tag) 
                              ? "bg-primary text-primary-foreground shadow-sm" 
                              : "hover:bg-accent"
                          )}
                          onClick={() => handleTagSuggestionClick(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </ImprovedCardContent>
                </ImprovedCard>
              ))}
            </div>

            {/* Enhanced No Results State */}
            {filteredResults.length === 0 && (
              <ImprovedCard className="text-center bg-background/80 backdrop-blur-sm">
                <ImprovedCardContent padding="xl">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 bg-muted/20 rounded-full flex items-center justify-center">
                      <SearchIcon className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">No results found</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      We couldn't find any content matching your search criteria. 
                      Try adjusting your search terms or removing some filters.
                    </p>
                    <EnhancedButton 
                      variant="outline" 
                      onClick={handleClearFilters}
                      className="shadow-md"
                    >
                      Clear All Filters
                    </EnhancedButton>
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
