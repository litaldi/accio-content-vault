
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Search as SearchIcon,
  Filter,
  Calendar,
  FileText,
  ExternalLink,
  Star
} from 'lucide-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Demo search results
  const searchResults = [
    {
      id: 1,
      title: 'Getting Started with React Hooks',
      description: 'A comprehensive guide to understanding and using React Hooks in modern applications.',
      url: 'https://example.com/react-hooks',
      tags: ['React', 'JavaScript', 'Frontend'],
      type: 'Article',
      savedDate: '2024-01-15',
      readTime: '8 min read'
    },
    {
      id: 2,
      title: 'TypeScript Best Practices 2024',
      description: 'Learn the latest TypeScript features and best practices for building scalable applications.',
      url: 'https://example.com/typescript-guide',
      tags: ['TypeScript', 'JavaScript', 'Development'],
      type: 'Document',
      savedDate: '2024-01-12',
      readTime: '12 min read'
    },
    {
      id: 3,
      title: 'Design Systems Workshop',
      description: 'Building consistent and scalable design systems for modern web applications.',
      url: 'https://example.com/design-systems',
      tags: ['Design', 'UI/UX', 'Components'],
      type: 'Video',
      savedDate: '2024-01-10',
      readTime: '45 min watch'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate search
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Article':
        return <FileText className="h-4 w-4" />;
      case 'Document':
        return <FileText className="h-4 w-4" />;
      case 'Video':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Search - Accio</title>
        <meta name="description" content="Search your saved content library" />
      </Helmet>

      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <span className="text-xl font-bold">Accio</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Your Library</h1>
          <p className="text-muted-foreground">
            Find any content you've saved with our powerful search
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search articles, documents, videos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    autoFocus
                  />
                </div>
                <Button type="submit" disabled={isSearching}>
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
                <Button type="button" variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
              
              {/* Quick Filters */}
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary" className="cursor-pointer">All Types</Badge>
                <Badge variant="outline" className="cursor-pointer">Articles</Badge>
                <Badge variant="outline" className="cursor-pointer">Documents</Badge>
                <Badge variant="outline" className="cursor-pointer">Videos</Badge>
                <Badge variant="outline" className="cursor-pointer">This Week</Badge>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Search Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {searchQuery ? `Results for "${searchQuery}"` : 'Recent Content'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {searchResults.length} items found
            </p>
          </div>

          <div className="grid gap-4">
            {searchResults.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(result.type)}
                        <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">
                          {result.title}
                        </h3>
                        <Badge variant="secondary">{result.type}</Badge>
                      </div>
                      
                      <p className="text-muted-foreground">
                        {result.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(result.savedDate).toLocaleDateString()}
                        </div>
                        <span>{result.readTime}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {result.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Open
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Star className="mr-2 h-3 w-3" />
                        Save
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {searchResults.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <SearchIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters
                </p>
                <Button asChild>
                  <Link to="/save">
                    Add New Content
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
