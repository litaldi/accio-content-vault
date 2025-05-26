
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/AuthContext';
import PrimaryNavigation from '@/components/navigation/PrimaryNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, Filter, BookOpen, ExternalLink, Clock, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

const SearchContent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    // Simulate search
    setTimeout(() => {
      setResults([
        {
          id: 1,
          title: "React Performance Best Practices",
          description: "Comprehensive guide to optimizing React applications for better performance.",
          url: "https://example.com/react-performance",
          tags: ["React", "Performance", "JavaScript"],
          savedAt: "2024-01-15",
          type: "article"
        },
        {
          id: 2,
          title: "AI in Knowledge Management",
          description: "How artificial intelligence is revolutionizing personal knowledge systems.",
          url: "https://example.com/ai-knowledge",
          tags: ["AI", "Knowledge Management", "Productivity"],
          savedAt: "2024-01-10",
          type: "article"
        }
      ]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Helmet>
        <title>Search - Accio Knowledge Library</title>
        <meta name="description" content="Search through your personal knowledge library with AI-powered semantic search." />
      </Helmet>
      
      <PrimaryNavigation />
      
      <main id="main-content" className="flex-grow container mx-auto px-4 py-8" role="main">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Search Your Knowledge</h1>
            <p className="text-muted-foreground text-lg">
              Find anything in your personal library with AI-powered search
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="search"
                placeholder="Search your knowledge library..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-20 h-12 text-lg"
                aria-label="Search your knowledge library"
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </form>

          {/* Search Results */}
          {results.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {results.length} result{results.length !== 1 ? 's' : ''} found
                </h2>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              {results.map((result: any) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                          {result.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {result.description}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={result.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {result.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        Saved {result.savedAt}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {query && results.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse your collections
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const Search = () => {
  return (
    <AuthProvider>
      <SearchContent />
    </AuthProvider>
  );
};

export default Search;
