
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search as SearchIcon, 
  Sparkles,
  Brain,
  Clock,
  BookOpen,
  Tag,
  TrendingUp
} from 'lucide-react';
import SemanticSearchBar from '@/components/SemanticSearchBar';
import { NaturalLanguageSearch } from '@/components/ai/NaturalLanguageSearch';
import { SmartRecommendations } from '@/components/ai/SmartRecommendations';
import { SavedContent } from '@/types';

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SavedContent[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data for demonstration
  const mockContent: SavedContent[] = [
    {
      id: '1',
      title: 'React Hooks Complete Guide',
      description: 'A comprehensive tutorial covering all React hooks with practical examples and best practices.',
      url: 'https://example.com/react-hooks',
      content_type: 'article',
      file_type: 'pdf',
      tags: [
        { id: '1', name: 'react', auto_generated: true, confirmed: true },
        { id: '2', name: 'programming', auto_generated: true, confirmed: true }
      ],
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'Machine Learning Fundamentals',
      description: 'Understanding the basics of machine learning algorithms and their applications.',
      url: 'https://example.com/ml-fundamentals',
      content_type: 'course',
      file_type: 'image',
      tags: [
        { id: '3', name: 'machine-learning', auto_generated: true, confirmed: true },
        { id: '4', name: 'ai', auto_generated: true, confirmed: true }
      ],
      created_at: '2024-01-14T15:30:00Z',
      updated_at: '2024-01-14T15:30:00Z'
    }
  ];

  const handleSearch = async (query: string, isSemanticSearch: boolean) => {
    setIsSearching(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock search results
    setSearchResults(mockContent);
    setIsSearching(false);
  };

  const handleContentClick = (content: SavedContent) => {
    console.log('Viewing content:', content.title);
  };

  return (
    <>
      <Helmet>
        <title>AI-Powered Search - Accio</title>
        <meta name="description" content="Search your knowledge base with natural language and get intelligent, context-aware results." />
      </Helmet>

      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Brain className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">AI-Powered Search</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Search your knowledge base using natural language. Ask questions, find patterns, and discover insights.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Search Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Semantic Search */}
              <Card>
                <CardContent className="p-6">
                  <SemanticSearchBar onSearch={handleSearch} />
                </CardContent>
              </Card>

              {/* Natural Language Search */}
              <NaturalLanguageSearch 
                allContent={mockContent}
                onSearch={setSearchResults}
              />

              {/* Search Results */}
              {isSearching && (
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      Searching with AI...
                    </div>
                  </CardContent>
                </Card>
              )}

              {searchResults.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <SearchIcon className="h-5 w-5" />
                    Search Results ({searchResults.length})
                  </h2>
                  {searchResults.map((content) => (
                    <Card key={content.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleContentClick(content)}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-lg line-clamp-1">{content.title}</h3>
                          <Badge variant="outline">{content.content_type}</Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {content.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {content.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag.id} variant="secondary" className="text-xs">
                                <Tag className="h-3 w-3 mr-1" />
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {new Date(content.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!isSearching && searchResults.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <SearchIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Start Your Search</h3>
                    <p className="text-muted-foreground mb-4">
                      Try asking a question like "Show me recent programming tutorials" or search by keywords.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Button variant="outline" size="sm" onClick={() => handleSearch('recent programming tutorials', true)}>
                        Recent tutorials
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleSearch('machine learning resources', true)}>
                        ML resources
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleSearch('productivity tips', true)}>
                        Productivity tips
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Smart Recommendations */}
              <SmartRecommendations 
                allContent={mockContent}
                onContentClick={handleContentClick}
              />

              {/* AI Features Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Features
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Brain className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Semantic Search</div>
                        <div className="text-muted-foreground">Understands context and meaning</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Smart Recommendations</div>
                        <div className="text-muted-foreground">Discovers related content</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <BookOpen className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Auto-Tagging</div>
                        <div className="text-muted-foreground">Organizes content automatically</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
