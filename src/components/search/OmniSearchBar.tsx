
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`pl-10 ${compact ? 'h-9' : 'h-10'}`}
        />
      </div>
    </form>
  );
};
