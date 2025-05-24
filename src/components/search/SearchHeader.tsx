
import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchHeaderProps {
  className?: string;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({ className }) => {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <SearchIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Search Your Library
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Find anything with natural language or keywords
          </p>
        </div>
      </div>
    </div>
  );
};
