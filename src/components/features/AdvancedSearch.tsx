
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  Filter, 
  Calendar,
  Tag,
  FileType,
  Star,
  Archive,
  SlidersHorizontal,
  X
} from 'lucide-react';

interface SearchFilters {
  query: string;
  dateRange: string;
  contentTypes: string[];
  tags: string[];
  isFavorited: boolean;
  isArchived: boolean;
  sortBy: string;
}

export const AdvancedSearch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    dateRange: 'all',
    contentTypes: [],
    tags: [],
    isFavorited: false,
    isArchived: false,
    sortBy: 'newest'
  });

  const contentTypes = ['Article', 'PDF', 'Video', 'Note', 'Image'];
  const availableTags = ['React', 'TypeScript', 'Design', 'API', 'Tutorial'];
  const dateRanges = [
    { value: 'all', label: 'All time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This week' },
    { value: 'month', label: 'This month' },
    { value: 'year', label: 'This year' }
  ];

  const toggleContentType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(type)
        ? prev.contentTypes.filter(t => t !== type)
        : [...prev.contentTypes, type]
    }));
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      dateRange: 'all',
      contentTypes: [],
      tags: [],
      isFavorited: false,
      isArchived: false,
      sortBy: 'newest'
    });
  };

  const activeFiltersCount = 
    filters.contentTypes.length + 
    filters.tags.length + 
    (filters.isFavorited ? 1 : 0) + 
    (filters.isArchived ? 1 : 0) +
    (filters.dateRange !== 'all' ? 1 : 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Advanced Search
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your knowledge base..."
            value={filters.query}
            onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
            className="pl-10"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters.isFavorited ? "default" : "outline"}
            size="sm"
            onClick={() => setFilters(prev => ({ ...prev, isFavorited: !prev.isFavorited }))}
          >
            <Star className="h-3 w-3 mr-1" />
            Favorites
          </Button>
          <Button
            variant={filters.isArchived ? "default" : "outline"}
            size="sm"
            onClick={() => setFilters(prev => ({ ...prev, isArchived: !prev.isArchived }))}
          >
            <Archive className="h-3 w-3 mr-1" />
            Archived
          </Button>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="space-y-6 border-t pt-4">
            {/* Date Range */}
            <div>
              <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4" />
                Date Range
              </Label>
              <div className="flex flex-wrap gap-2">
                {dateRanges.map(range => (
                  <Button
                    key={range.value}
                    variant={filters.dateRange === range.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilters(prev => ({ ...prev, dateRange: range.value }))}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Content Types */}
            <div>
              <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                <FileType className="h-4 w-4" />
                Content Types
              </Label>
              <div className="flex flex-wrap gap-2">
                {contentTypes.map(type => (
                  <Badge
                    key={type}
                    variant={filters.contentTypes.includes(type) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleContentType(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4" />
                Tags
              </Label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={filters.tags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button className="flex-1">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              {activeFiltersCount > 0 && (
                <Button variant="outline" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
