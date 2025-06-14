
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Tag, FileText, Video, Image, Link2 } from 'lucide-react';

interface SearchFilter {
  id: string;
  label: string;
  count: number;
  checked: boolean;
}

interface SearchSidebarProps {
  contentTypeFilters: SearchFilter[];
  tagFilters: SearchFilter[];
  onFilterChange: (filterId: string, type: 'contentType' | 'tag') => void;
  onClearFilters: () => void;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({
  contentTypeFilters,
  tagFilters,
  onFilterChange,
  onClearFilters
}) => {
  const contentTypeIcons = {
    article: FileText,
    video: Video,
    image: Image,
    link: Link2,
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Filters</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              Clear All
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Content Type Filters */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content Type
            </h4>
            <div className="space-y-2">
              {contentTypeFilters.map((filter) => {
                const Icon = contentTypeIcons[filter.id as keyof typeof contentTypeIcons] || FileText;
                return (
                  <div key={filter.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={filter.id}
                      checked={filter.checked}
                      onCheckedChange={() => onFilterChange(filter.id, 'contentType')}
                    />
                    <label
                      htmlFor={filter.id}
                      className="text-sm flex items-center gap-2 flex-1 cursor-pointer"
                    >
                      <Icon className="h-3 w-3" />
                      {filter.label}
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {filter.count}
                      </Badge>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tag Filters */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {tagFilters.map((filter) => (
                <div key={filter.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${filter.id}`}
                    checked={filter.checked}
                    onCheckedChange={() => onFilterChange(filter.id, 'tag')}
                  />
                  <label
                    htmlFor={`tag-${filter.id}`}
                    className="text-sm flex items-center gap-2 flex-1 cursor-pointer"
                  >
                    {filter.label}
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {filter.count}
                    </Badge>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </h4>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Last 7 days
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Last 30 days
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Last 90 days
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchSidebar;
