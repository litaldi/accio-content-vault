
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { VoiceSearchButton } from './VoiceSearchButton';
import { SearchKeyboardShortcut } from './SearchKeyboardShortcut';
import { voiceSearchService } from '@/services/voiceSearchService';
import { cn } from '@/lib/utils';

export interface EnhancedUnifiedSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  className?: string;
  showVoiceSearch?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'hero' | 'minimal';
  showTips?: boolean;
}

export const EnhancedUnifiedSearchBar: React.FC<EnhancedUnifiedSearchBarProps> = ({
  placeholder = "Search your knowledge...",
  onSearch,
  searchQuery: externalQuery,
  onSearchChange,
  className,
  showVoiceSearch = false,
  size = 'md',
  variant = 'default',
  showTips = false
}) => {
  const [internalQuery, setInternalQuery] = useState('');
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  
  const query = externalQuery !== undefined ? externalQuery : internalQuery;
  const setQuery = onSearchChange || setInternalQuery;

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch?.(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleVoiceSearch = () => {
    if (!voiceSearchService.isSupported()) return;
    
    if (isVoiceListening) {
      voiceSearchService.stopListening();
      setIsVoiceListening(false);
    } else {
      voiceSearchService.startListening();
      setIsVoiceListening(true);
      
      voiceSearchService.onRecognitionResult(({ transcript, isFinal }) => {
        if (isFinal) {
          setQuery(transcript);
          setIsVoiceListening(false);
          onSearch?.(transcript);
        }
      });
      
      voiceSearchService.onRecognitionEnd(() => {
        setIsVoiceListening(false);
      });
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10',
    lg: 'h-12 text-lg'
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className={cn(
            "pl-10",
            showVoiceSearch || query ? "pr-20" : "pr-4",
            sizeClasses[size]
          )}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="h-6 w-6 p-0"
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
          {showVoiceSearch && voiceSearchService.isSupported() && (
            <VoiceSearchButton
              isListening={isVoiceListening}
              onVoiceSearch={handleVoiceSearch}
              size={size}
            />
          )}
          {variant === 'hero' && (
            <SearchKeyboardShortcut size={size} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedUnifiedSearchBar;
