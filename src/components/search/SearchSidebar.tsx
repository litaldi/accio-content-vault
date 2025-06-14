
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Filter, Calendar, Tag, FileType, Star } from 'lucide-react';

interface SearchSidebarProps {
  filters: {
    dateRange: string;
    contentTypes: string[];
    tags: string[];
    starred: boolean;
  };
  onFilterChange: (filters: any) => void;
  className?: string;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({
  filters,
  onFilterChange,
  className
}) => {
  const contentTypes = [
    'Articles',
    'Videos',
    'Documents',
    'Images',
    'Links',
    'Notes'
  ];

  const popularTags = [
    'React',
    'TypeScript',
    'Design',
    'Development',
    'Tutorial',
    'Documentation'
  ];

  const dateRanges = [
    'Last 7 days',
    'Last 30 days',
    'Last 3 months',
    'Last year',
    'All time'
  ];

  return (
    <div className={className}>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Date Range */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </h4>
            <div className="space-y-2">
              {dateRanges.map((range) => (
                <label key={range} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dateRange"
                    value={range}
                    checked={filters.dateRange === range}
                    onChange={(e) => onFilterChange({ ...filters, dateRange: e.target.value })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{range}</span>
                </label>
              ))}
            </div>
          </div>

          <Separator />

          {/* Content Types */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <FileType className="h-4 w-4" />
              Content Type
            </h4>
            <div className="space-y-2">
              {contentTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={filters.contentTypes.includes(type)}
                    onCheckedChange={(checked) => {
                      const updated = checked
                        ? [...filters.contentTypes, type]
                        : filters.contentTypes.filter(t => t !== type);
                      onFilterChange({ ...filters, contentTypes: updated });
                    }}
                  />
                  <label htmlFor={type} className="text-sm cursor-pointer">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Tags */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={filters.tags.includes(tag) ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => {
                    const updated = filters.tags.includes(tag)
                      ? filters.tags.filter(t => t !== tag)
                      : [...filters.tags, tag];
                    onFilterChange({ ...filters, tags: updated });
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Starred Items */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="starred"
              checked={filters.starred}
              onCheckedChange={(checked) => 
                onFilterChange({ ...filters, starred: !!checked })
              }
            />
            <label htmlFor="starred" className="text-sm cursor-pointer flex items-center gap-2">
              <Star className="h-4 w-4" />
              Starred items only
            </label>
          </div>

          {/* Clear Filters */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onFilterChange({
              dateRange: 'All time',
              contentTypes: [],
              tags: [],
              starred: false
            })}
          >
            Clear All Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchSidebar;
