
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search as SearchIcon, 
  Filter, 
  FileText, 
  Image, 
  Link2,
  Calendar,
  Tag,
  SortAsc,
  X
} from 'lucide-react';
import MainNavigation from '@/components/navigation/MainNavigation';
import { VoiceSearchButton } from '@/components/VoiceSearch/VoiceSearchButton';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'article' | 'document' | 'image' | 'note';
  url?: string;
  tags: string[];
  createdAt: string;
  relevance: number;
}

const Search: React.FC = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    sortBy: 'relevance',
    dateRange: 'all'
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Introduction to React Hooks',
      content: 'React Hooks are functions that let you use state and other React features without writing a class...',
      type: 'article',
      url: 'https://reactjs.org/docs/hooks-intro.html',
      tags: ['React', 'JavaScript', 'Frontend'],
      createdAt: '2024-01-15',
      relevance: 0.95
    },
    {
      id: '2',
      title: 'Design System Documentation',
      content: 'A comprehensive guide to our design system components and patterns...',
      type: 'document',
      tags: ['Design', 'UI/UX', 'Documentation'],
      createdAt: '2024-01-10',
      relevance: 0.87
    },
    {
      id: '3',
      title: 'API Architecture Notes',
      content: 'Notes on building scalable API architectures with microservices...',
      type: 'note',
      tags: ['API', 'Architecture', 'Backend'],
      createdAt: '2024-01-08',
      relevance: 0.82
    }
  ];

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate search API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filter and sort mock results based on query and filters
      let filteredResults = mockResults.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      if (filters.type !== 'all') {
        filteredResults = filteredResults.filter(result => result.type === filters.type);
      }

      if (selectedTags.length > 0) {
        filteredResults = filteredResults.filter(result => 
          result.tags.some(tag => selectedTags.includes(tag))
        );
      }

      // Sort results
      filteredResults.sort((a, b) => {
        switch (filters.sortBy) {
          case 'date':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'title':
            return a.title.localeCompare(b.title);
          default:
            return b.relevance - a.relevance;
        }
      });

      setResults(filteredResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceTranscript = (text: string, isFinal: boolean) => {
    if (isFinal) {
      setQuery(text);
      handleSearch(text);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <Link2 className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [filters, selectedTags]);

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Search - Accio</title>
        </Helmet>
        <MainNavigation />
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <SearchIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <CardTitle>Sign In Required</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href="/login">Sign In to Search</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Search Your Knowledge - Accio</title>
        <meta name="description" content="Search through your personal knowledge library with powerful filtering and AI-enhanced results." />
      </Helmet>

      <MainNavigation />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Search Your Knowledge</h1>
            <p className="text-muted-foreground">
              Find anything in your personal knowledge library instantly
            </p>
          </div>

          <div className="space-y-6">
            {/* Search Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search articles, documents, notes, and more..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch(query);
                        }
                      }}
                      className="pl-10 pr-16"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <VoiceSearchButton 
                        onTranscript={handleVoiceTranscript}
                        variant="ghost"
                        size="icon"
                      />
                    </div>
                  </div>
                  <Button onClick={() => handleSearch(query)} disabled={isLoading}>
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="text-sm font-medium">Filters:</span>
                  </div>
                  
                  <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="article">Articles</SelectItem>
                      <SelectItem value="document">Documents</SelectItem>
                      <SelectItem value="image">Images</SelectItem>
                      <SelectItem value="note">Notes</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.sortBy} onValueChange={(value) => setFilters({...filters, sortBy: value})}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.dateRange} onValueChange={(value) => setFilters({...filters, dateRange: value})}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="week">Past Week</SelectItem>
                      <SelectItem value="month">Past Month</SelectItem>
                      <SelectItem value="year">Past Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedTags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-sm font-medium">Active tags:</span>
                    {selectedTags.map(tag => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-3 w-3 p-0 hover:bg-transparent"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-4">
              {isLoading ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Searching your knowledge...</p>
                  </CardContent>
                </Card>
              ) : results.length > 0 ? (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                    </p>
                  </div>
                  {results.map(result => (
                    <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(result.type)}
                            <CardTitle className="text-lg">{result.title}</CardTitle>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {result.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {result.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {result.tags.map(tag => (
                              <Badge 
                                key={tag} 
                                variant="secondary" 
                                className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                onClick={() => {
                                  if (!selectedTags.includes(tag)) {
                                    setSelectedTags([...selectedTags, tag]);
                                  }
                                }}
                              >
                                <Tag className="h-2 w-2 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(result.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : query ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <SearchIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No results found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or filters
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <SearchIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Start searching</h3>
                    <p className="text-muted-foreground">
                      Enter a search term to find content in your knowledge library
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
