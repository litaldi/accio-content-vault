
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, Filter, BookOpen, Clock, Star } from 'lucide-react';
import { Typography, Spacing } from '@/components/ui/design-system';
import { copy } from '@/utils/copy';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results] = useState([
    {
      id: 1,
      title: 'Getting Started with React Hooks',
      description: 'A comprehensive guide to understanding and implementing React Hooks in your applications.',
      category: 'Development',
      readTime: '8 min read',
      lastAccessed: '2 hours ago',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Design Systems Best Practices',
      description: 'Learn how to build scalable and maintainable design systems for modern applications.',
      category: 'Design',
      readTime: '12 min read',
      lastAccessed: '1 day ago',
      rating: 4.9
    },
    {
      id: 3,
      title: 'AI Integration Patterns',
      description: 'Explore different patterns for integrating AI capabilities into your products.',
      category: 'AI/ML',
      readTime: '15 min read',
      lastAccessed: '3 days ago',
      rating: 4.7
    }
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Search - Accio</title>
        <meta name="description" content="Search through your knowledge base and discover insights." />
      </Helmet>

      <Spacing.Section size="lg">
        <Spacing.Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Typography.H1 className="mb-4">
                Search Your Knowledge
              </Typography.H1>
              <Typography.Lead>
                Find exactly what you're looking for across all your content
              </Typography.Lead>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={copy.microcopy.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-6 text-lg"
                />
                <Button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Filters */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <div className="flex gap-2">
                <Badge variant="secondary">All Content</Badge>
                <Badge variant="outline">Recent</Badge>
                <Badge variant="outline">Favorites</Badge>
              </div>
            </div>

            {/* Search Results */}
            <div className="space-y-6">
              {results.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="mb-2">{result.title}</CardTitle>
                        <CardDescription>{result.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1 ml-4">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{result.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {result.category}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {result.readTime}
                        </div>
                        <span>Last accessed {result.lastAccessed}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Open
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State for no results */}
            {searchQuery && results.length === 0 && (
              <div className="text-center py-12">
                <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <Typography.H3 className="mb-2">No results found</Typography.H3>
                <Typography.Body>
                  Try adjusting your search terms or browse our suggested content
                </Typography.Body>
                <Button variant="outline" className="mt-4">
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </Spacing.Container>
      </Spacing.Section>
    </div>
  );
};

export default Search;
