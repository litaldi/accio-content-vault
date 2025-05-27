
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  ExternalLink,
  Bookmark,
  Clock,
  Star,
  Filter,
  Grid,
  List,
  SortAsc,
  Eye,
  Tag,
  Calendar,
  FileText,
  Video,
  Link as LinkIcon,
  Sparkles
} from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  relevance: number;
  type: 'article' | 'note' | 'video' | 'link' | 'tutorial';
  tags: string[];
  source: string;
  date: string;
  readTime: string;
  isRead?: boolean;
  isSaved?: boolean;
  isStarred?: boolean;
}

interface SmartSearchResultsProps {
  results: SearchResult[];
  query: string;
  className?: string;
}

export const SmartSearchResults: React.FC<SmartSearchResultsProps> = ({
  results = [],
  query,
  className
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState('relevance');
  const [filterType, setFilterType] = useState('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="h-4 w-4" />;
      case 'note': return <BookmarkIcon className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'link': return <LinkIcon className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'note': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'video': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'link': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
    if (relevance >= 70) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
    return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
  };

  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case 'relevance': return b.relevance - a.relevance;
      case 'date': return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'title': return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  const filteredResults = sortedResults.filter(result => 
    filterType === 'all' || result.type === filterType
  );

  const ResultCard = ({ result, compact = false }: { result: SearchResult, compact?: boolean }) => (
    <Card className={`hover:shadow-md transition-all duration-200 ${compact ? 'p-4' : ''}`}>
      <CardContent className={compact ? 'p-0' : 'p-6'}>
        <div className="flex items-start gap-4">
          {/* Type Icon & Relevance */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className={`p-2 rounded-lg ${getTypeColor(result.type)}`}>
              {getTypeIcon(result.type)}
            </div>
            <Badge className={`text-xs ${getRelevanceColor(result.relevance)}`}>
              {result.relevance}%
            </Badge>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-semibold text-lg leading-tight line-clamp-2 hover:text-primary cursor-pointer">
                {result.title}
              </h3>
              <div className="flex items-center gap-1 flex-shrink-0">
                {result.isStarred && (
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                )}
                {result.isSaved && (
                  <Bookmark className="h-4 w-4 text-blue-500 fill-current" />
                )}
                {!result.isRead && (
                  <div className="w-2 h-2 bg-primary rounded-full" title="Unread" />
                )}
              </div>
            </div>

            <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-relaxed">
              {result.snippet}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {result.tags.slice(0, 4).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {result.tags.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{result.tags.length - 4}
                </Badge>
              )}
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(result.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{result.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  <span>{result.source}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <Eye className="h-3 w-3 mr-1" />
                  Open
                </Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (results.length === 0 && query) {
    return (
      <EmptyState
        icon={Search}
        title="No results found"
        description={`No content matches "${query}". Try adjusting your search terms or check filters.`}
        actionLabel="Clear Search"
        actionHref="/search"
      />
    );
  }

  return (
    <div className={className}>
      {/* Results Header */}
      {results.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                Search Results
                {query && (
                  <span className="text-muted-foreground font-normal ml-2">
                    for "{query}"
                  </span>
                )}
              </h2>
              <p className="text-sm text-muted-foreground">
                Found {filteredResults.length} results in {Math.random() * 200 + 100}ms
              </p>
            </div>
            
            {/* View Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 text-sm border rounded-md bg-background"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
              </select>
            </div>
          </div>

          {/* Type Filters */}
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {['all', 'article', 'note', 'video', 'link'].map((type) => (
                <Button
                  key={type}
                  variant={filterType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType(type)}
                  className="h-7 text-xs capitalize"
                >
                  {type === 'all' ? 'All Types' : type}
                  {type !== 'all' && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {results.filter(r => r.type === type).length}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results Grid/List */}
      {filteredResults.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' 
            : 'space-y-4'
        }>
          {filteredResults.map((result) => (
            <ResultCard 
              key={result.id} 
              result={result} 
              compact={viewMode === 'grid'} 
            />
          ))}
        </div>
      ) : query ? (
        <EmptyState
          icon={Search}
          title="No matching results"
          description="Try adjusting your filters or search terms."
        />
      ) : (
        <div className="text-center py-12">
          <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Start searching</h3>
          <p className="text-muted-foreground">
            Use the search box above to find content in your knowledge base
          </p>
        </div>
      )}
    </div>
  );
};

// Temporary fix for missing Bookmark import
const BookmarkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);
