
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Search as SearchIcon, Filter, Clock, Tag, FileText } from 'lucide-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const recentSearches = [
    'React best practices',
    'AI productivity tools',
    'Knowledge management',
    'Design systems'
  ];

  const searchResults = [
    {
      title: 'React Best Practices for 2024',
      description: 'A comprehensive guide to modern React development patterns and performance optimization techniques.',
      url: 'https://example.com/react-best-practices',
      tags: ['React', 'JavaScript', 'Frontend'],
      savedDate: '2 days ago',
      type: 'Article'
    },
    {
      title: 'AI-Powered Productivity Tools',
      description: 'Exploring the latest AI tools that can boost your productivity and streamline your workflow.',
      url: 'https://example.com/ai-productivity',
      tags: ['AI', 'Productivity', 'Tools'],
      savedDate: '1 week ago',
      type: 'Video'
    },
    {
      title: 'Knowledge Management Systems',
      description: 'How to build and maintain an effective personal knowledge management system.',
      url: 'https://example.com/knowledge-management',
      tags: ['Knowledge', 'Organization', 'Systems'],
      savedDate: '3 days ago',
      type: 'PDF'
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Search - Accio</title>
        <meta name="description" content="Search through your saved content with AI-powered natural language search." />
      </Helmet>

      <div className="max-w-4xl mx-auto py-8 space-y-8">
        {/* Search Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Search Your Knowledge</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Use natural language to find exactly what you're looking for in your saved content.
          </p>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Ask anything about your saved content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10"
                  aria-label="Search your knowledge base"
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isSearching}
                loading={isSearching}
                loadingText="Searching..."
                aria-label="Execute search"
              >
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button 
                variant="outline"
                aria-label="Open search filters"
                title="Advanced search filters"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Searches */}
        {!searchQuery && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Searches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(search)}
                    className="text-xs"
                    aria-label={`Search for ${search}`}
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Search Results</h2>
              <p className="text-sm text-muted-foreground">
                Found {searchResults.length} results for "{searchQuery}"
              </p>
            </div>

            {searchResults.map((result, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <Button 
                          variant="link" 
                          className="p-0 h-auto font-semibold text-lg hover:text-primary text-left justify-start"
                          asChild
                        >
                          <a 
                            href={result.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label={`Open ${result.title} in new tab`}
                          >
                            {result.title}
                          </a>
                        </Button>
                        <p className="text-muted-foreground text-sm">{result.description}</p>
                        <p className="text-xs text-muted-foreground">{result.url}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <FileText className="h-3 w-3" />
                        {result.type}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {result.tags.map((tag, tagIndex) => (
                          <Button
                            key={tagIndex}
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 py-1 text-xs hover:bg-muted"
                            onClick={() => setSearchQuery(`tag:${tag}`)}
                            aria-label={`Search by tag ${tag}`}
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Button>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Saved {result.savedDate}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Search Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Search Tips</CardTitle>
            <CardDescription>
              Get better results with these search techniques
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium">Natural Language</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 justify-start"
                  onClick={() => setSearchQuery('articles about React performance')}
                >
                  Try: "articles about React performance"
                </Button>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">By Tag</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 justify-start"
                  onClick={() => setSearchQuery('tag:productivity')}
                >
                  Try: "tag:productivity"
                </Button>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">By Date</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 justify-start"
                  onClick={() => setSearchQuery('saved this week')}
                >
                  Try: "saved this week"
                </Button>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">By Type</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 justify-start"
                  onClick={() => setSearchQuery('type:video')}
                >
                  Try: "type:video"
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  );
};

export default Search;
