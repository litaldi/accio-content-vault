
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Search, 
  Globe, 
  FileText, 
  Bookmark,
  Clock,
  Star,
  TrendingUp,
  Zap
} from 'lucide-react';

interface ResearchResult {
  id: string;
  title: string;
  source: string;
  relevance: number;
  type: 'article' | 'paper' | 'video' | 'book';
  summary: string;
  publishDate: string;
}

export const AIResearchAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<ResearchResult[]>([]);

  const mockResults: ResearchResult[] = [
    {
      id: '1',
      title: 'Advanced React Patterns and Performance Optimization',
      source: 'React Documentation',
      relevance: 95,
      type: 'article',
      summary: 'Comprehensive guide to advanced React patterns including render props, higher-order components, and performance optimization techniques.',
      publishDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Machine Learning Fundamentals for Web Developers',
      source: 'MIT OpenCourseWare',
      relevance: 88,
      type: 'paper',
      summary: 'Introduction to machine learning concepts tailored for web developers, covering practical applications and implementation strategies.',
      publishDate: '2024-02-10'
    },
    {
      id: '3',
      title: 'TypeScript Best Practices in Large Scale Applications',
      source: 'Tech Blog',
      relevance: 92,
      type: 'video',
      summary: 'Video series covering TypeScript best practices, advanced types, and architectural patterns for enterprise applications.',
      publishDate: '2024-01-28'
    }
  ];

  const handleSearch = () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  const getTypeIcon = (type: ResearchResult['type']) => {
    switch (type) {
      case 'article': return FileText;
      case 'paper': return BookOpen;
      case 'video': return Globe;
      case 'book': return BookOpen;
    }
  };

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 90) return 'text-green-600';
    if (relevance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            AI Research Assistant
            <Badge variant="secondary">Intelligent Search</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Interface */}
          <div className="flex gap-2">
            <Input
              placeholder="Enter your research topic or question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? (
                <Clock className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              {isSearching ? 'Searching...' : 'Research'}
            </Button>
          </div>

          {/* Quick Topics */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Quick topics:</span>
            {['React Hooks', 'TypeScript', 'Machine Learning', 'Web Performance'].map((topic) => (
              <Button
                key={topic}
                variant="outline"
                size="sm"
                onClick={() => setQuery(topic)}
              >
                {topic}
              </Button>
            ))}
          </div>

          {/* Search Results */}
          {results.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Research Results</h3>
              {results.map((result) => {
                const TypeIcon = getTypeIcon(result.type);
                return (
                  <Card key={result.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-4 w-4 text-primary" />
                          <h4 className="font-medium">{result.title}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${getRelevanceColor(result.relevance)}`}>
                            {result.relevance}%
                          </span>
                          <Badge variant="outline">{result.type}</Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{result.summary}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          {result.source} • {result.publishDate}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Bookmark className="h-3 w-3 mr-1" />
                            Save
                          </Button>
                          <Button size="sm">
                            <Globe className="h-3 w-3 mr-1" />
                            Open
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* AI Insights */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-primary" />
                <h4 className="font-medium">AI Research Tips</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li>• Use specific keywords for better results</li>
                <li>• Combine multiple search terms for comprehensive coverage</li>
                <li>• Check relevance scores to prioritize sources</li>
                <li>• Save important findings for future reference</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
