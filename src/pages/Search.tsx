
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search as SearchIcon,
  Filter,
  Clock,
  BookOpen,
  FileText,
  Video,
  Image,
  Zap
} from 'lucide-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Content', icon: SearchIcon },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'images', label: 'Images', icon: Image },
    { id: 'books', label: 'Books', icon: BookOpen },
  ];

  const searchResults = [
    {
      id: '1',
      title: 'React Performance Optimization Techniques',
      type: 'Article',
      excerpt: 'Learn how to optimize your React applications for better performance...',
      tags: ['React', 'Performance', 'Frontend'],
      savedDate: '2 days ago',
      readTime: '8 min'
    },
    {
      id: '2',
      title: 'Advanced TypeScript Patterns',
      type: 'Video',
      excerpt: 'Deep dive into advanced TypeScript patterns and best practices...',
      tags: ['TypeScript', 'Programming', 'Tutorial'],
      savedDate: '1 week ago',
      readTime: '45 min'
    },
    {
      id: '3',
      title: 'Design System Guidelines',
      type: 'PDF',
      excerpt: 'Comprehensive guide to building scalable design systems...',
      tags: ['Design', 'Systems', 'UI/UX'],
      savedDate: '3 days ago',
      readTime: '15 min'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Search - Accio</title>
          <meta name="description" content="Search through your saved content and discover new insights" />
        </Helmet>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <SearchIcon className="h-8 w-8 text-primary" />
              Search
            </h1>
            <p className="text-muted-foreground mt-2">
              Find anything in your knowledge library with AI-powered search
            </p>
          </div>

          {/* Search Bar */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search your content, ask questions, or describe what you're looking for..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" className="gap-2">
                    <SearchIcon className="h-4 w-4" />
                    Search
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Zap className="h-4 w-4" />
                    AI Search
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className="gap-2"
              >
                <filter.icon className="h-4 w-4" />
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Search Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {searchQuery ? `Results for "${searchQuery}"` : 'Recent Content'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {searchResults.length} results found
              </p>
            </div>

            {searchResults.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                        {result.title}
                      </h3>
                      <p className="text-muted-foreground mb-3 line-clamp-2">
                        {result.excerpt}
                      </p>
                    </div>
                    <Badge variant="outline" className="ml-4">
                      {result.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {result.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {result.readTime}
                      </span>
                      <span>Saved {result.savedDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Search;
