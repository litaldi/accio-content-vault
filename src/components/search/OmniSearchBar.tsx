
import React, { useState } from 'react';
import { Search, Command } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OmniSearchBarProps {
  placeholder?: string;
  compact?: boolean;
  onSearch?: (query: string) => void;
}

export const OmniSearchBar: React.FC<OmniSearchBarProps> = ({
  placeholder = "Search...",
  compact = false,
  onSearch
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={cn(
            "pl-10 pr-20",
            compact ? "h-9" : "h-10"
          )}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <Command className="h-3 w-3" />
            K
          </kbd>
        </div>
      </div>
    </form>
  );
};
