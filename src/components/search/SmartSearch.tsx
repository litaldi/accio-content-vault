
import React, { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchAutocomplete } from './SearchAutocomplete';
import VoiceSearchButton from './VoiceSearchButton';
import { Brain, Sparkles, TrendingUp } from 'lucide-react';

interface SmartSearchProps {
  onSearch: (query: string, filters?: any) => void;
  placeholder?: string;
  className?: string;
}

const SmartSearch: React.FC<SmartSearchProps> = ({
  onSearch,
  placeholder = "Search your knowledge... or ask me anything!",
  className
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [smartFilters, setSmartFilters] = useState<string[]>([]);

  const handleSearch = useCallback((query: string) => {
    if (!query.trim()) return;
    
    // Analyze query for smart filters
    const filters = analyzeSearchQuery(query);
    setSmartFilters(filters);
    
    onSearch(query, { smartFilters: filters });
    console.log('Smart search executed:', { query, filters });
  }, [onSearch]);

  const handleVoiceTranscript = useCallback((transcript: string) => {
    setSearchQuery(transcript);
    handleSearch(transcript);
  }, [handleSearch]);

  const analyzeSearchQuery = (query: string): string[] => {
    const filters: string[] = [];
    const lowerQuery = query.toLowerCase();
    
    // Content type detection
    if (/tutorial|guide|how.?to|learn/.test(lowerQuery)) {
      filters.push('educational');
    }
    if (/news|update|latest|recent/.test(lowerQuery)) {
      filters.push('news');
    }
    if (/code|programming|development/.test(lowerQuery)) {
      filters.push('technical');
    }
    if (/video|watch|youtube/.test(lowerQuery)) {
      filters.push('video');
    }
    if (/article|blog|post|read/.test(lowerQuery)) {
      filters.push('article');
    }
    
    // Technology detection
    if (/react|vue|angular|javascript|python|ai|machine.?learning/.test(lowerQuery)) {
      filters.push('technology');
    }
    
    return filters;
  };

  return (
    <div className={className}>
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">AI-Powered Search</h3>
            <Sparkles className="h-4 w-4 text-purple-500" />
          </div>
          
          <div className="flex gap-2">
            <div className="flex-1">
              <SearchAutocomplete
                placeholder={placeholder}
                onSearch={handleSearch}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
            <VoiceSearchButton
              onTranscript={handleVoiceTranscript}
              className="flex-shrink-0"
            />
          </div>
          
          {smartFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>Smart filters applied:</span>
              </div>
              {smartFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="text-xs">
                  {filter}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartSearch;
