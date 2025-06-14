
import React, { useState } from 'react';
import { Search, Filter, SortAsc, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spacing } from '@/components/ui/design-system';
import { EnhancedCard } from '@/components/ui/enhanced-card';

export const SearchExperience: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const mockResults = [
    {
      id: 1,
      title: 'React Best Practices',
      type: 'Article',
      excerpt: 'Comprehensive guide to React development patterns and best practices...',
      tags: ['React', 'JavaScript', 'Frontend']
    },
    {
      id: 2,
      title: 'API Design Guidelines',
      type: 'Document',
      excerpt: 'Essential guidelines for designing scalable and maintainable APIs...',
      tags: ['API', 'Backend', 'Design']
    },
    {
      id: 3,
      title: 'Meeting Notes - Q1 Planning',
      type: 'Note',
      excerpt: 'Key decisions and action items from Q1 planning session...',
      tags: ['Meeting', 'Planning', 'Q1']
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Your Knowledge</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search articles, notes, documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 text-lg"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <SortAsc className="h-4 w-4 mr-2" />
            Sort
          </Button>
          <div className="flex items-center gap-1 ml-auto">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <Spacing.Stack gap="lg">
        <div className="text-sm text-muted-foreground">
          Found {mockResults.length} results
        </div>
        
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {mockResults.map((result) => (
            <EnhancedCard key={result.id} variant="interactive" className="h-full">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg">{result.title}</h3>
                  <span className="text-xs bg-muted px-2 py-1 rounded">{result.type}</span>
                </div>
                <p className="text-muted-foreground mb-4 line-clamp-2">{result.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {result.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </EnhancedCard>
          ))}
        </div>
      </Spacing.Stack>
    </div>
  );
};

export default SearchExperience;
