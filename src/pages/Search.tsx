
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Search as SearchIcon, Filter, Clock, Tag, FileText } from 'lucide-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
                  className="pl-10"
                />
              </div>
              <Button>
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline">
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
                        <h3 className="font-semibold text-lg hover:text-primary">{result.title}</h3>
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
                          <span
                            key={tagIndex}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-xs"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
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
              <div>
                <h4 className="font-medium mb-2">Natural Language</h4>
                <p className="text-muted-foreground">Try: "articles about React performance"</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">By Tag</h4>
                <p className="text-muted-foreground">Try: "tag:productivity"</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">By Date</h4>
                <p className="text-muted-foreground">Try: "saved this week"</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">By Type</h4>
                <p className="text-muted-foreground">Try: "type:video"</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  );
};

export default Search;
