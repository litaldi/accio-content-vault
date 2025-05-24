
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Star, Calendar, FileText, Link, Image, Video, X } from 'lucide-react';

interface QuickFilter {
  id: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
  color?: string;
}

interface QuickFiltersProps {
  activeFilters: string[];
  onFilterToggle: (filterId: string) => void;
  onClearAll: () => void;
}

const quickFilters: QuickFilter[] = [
  { id: 'recent', label: 'Recent', icon: <Clock className="h-3 w-3" />, color: 'bg-blue-100 text-blue-800' },
  { id: 'favorites', label: 'Favorites', icon: <Star className="h-3 w-3" />, color: 'bg-yellow-100 text-yellow-800' },
  { id: 'this-week', label: 'This Week', icon: <Calendar className="h-3 w-3" />, color: 'bg-green-100 text-green-800' },
  { id: 'articles', label: 'Articles', icon: <FileText className="h-3 w-3" />, color: 'bg-purple-100 text-purple-800' },
  { id: 'links', label: 'Links', icon: <Link className="h-3 w-3" />, color: 'bg-indigo-100 text-indigo-800' },
  { id: 'images', label: 'Images', icon: <Image className="h-3 w-3" />, color: 'bg-pink-100 text-pink-800' },
  { id: 'videos', label: 'Videos', icon: <Video className="h-3 w-3" />, color: 'bg-red-100 text-red-800' },
];

const QuickFilters: React.FC<QuickFiltersProps> = ({
  activeFilters,
  onFilterToggle,
  onClearAll,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-muted/30 rounded-lg">
      <span className="text-sm font-medium text-muted-foreground mr-2">Quick filters:</span>
      
      {quickFilters.map((filter) => (
        <Badge
          key={filter.id}
          variant={activeFilters.includes(filter.id) ? "default" : "outline"}
          className={`cursor-pointer transition-all hover:scale-105 ${
            activeFilters.includes(filter.id) 
              ? "shadow-md" 
              : "hover:shadow-sm"
          }`}
          onClick={() => onFilterToggle(filter.id)}
        >
          {filter.icon}
          <span className="ml-1">{filter.label}</span>
          {filter.count && (
            <span className="ml-1 text-xs opacity-70">({filter.count})</span>
          )}
        </Badge>
      ))}
      
      {activeFilters.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="h-6 px-2 text-xs ml-2"
        >
          <X className="h-3 w-3 mr-1" />
          Clear all
        </Button>
      )}
    </div>
  );
};

export default QuickFilters;
