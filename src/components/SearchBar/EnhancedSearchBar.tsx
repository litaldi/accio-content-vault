import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/search/SearchBar';
import { enhancedSearchService } from '@/services/enhancedSearchService';
import { naturalLanguageService } from '@/services/naturalLanguageService';
import { Sparkles, Zap, Filter } from 'lucide-react';

interface EnhancedSearchBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
}

export const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({
  onSearch,
  searchQuery,
  onSearchChange,
  className
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [queryAnalysis, setQueryAnalysis] = useState<any>(null);
  const [smartSuggestions, setSmartSuggestions] = useState<string[]>([]);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      onSearch(query);
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Analyze the query for intent and entities
      const analysis = naturalLanguageService.parseQuery(query);
      setQueryAnalysis(analysis);
      
      // Generate smart suggestions based on query
      const suggestions = enhancedSearchService.generateSmartSuggestions([]);
      setSmartSuggestions(suggestions.slice(0, 3));
      
      // Perform the search
      onSearch(query);
    } catch (error) {
      console.error('Search analysis error:', error);
      onSearch(query);
    } finally {
      setIsAnalyzing(false);
    }
  }, [onSearch]);

  const handleSmartSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div className={className}>
      <div className="space-y-4">
        {/* Main Search Bar */}
        <SearchBar
          placeholder="Ask me anything about your knowledge..."
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          showVoiceSearch={true}
          size="lg"
        />

        {/* Search Analysis & Smart Features */}
        {(isAnalyzing || queryAnalysis || smartSuggestions.length > 0) && (
          <Card className="p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
            {isAnalyzing && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 animate-pulse" />
                <span>Analyzing your query...</span>
              </div>
            )}

            {queryAnalysis && !isAnalyzing && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Query Analysis</span>
                  <Badge variant="outline" className="text-xs">
                    {Math.round(queryAnalysis.confidence * 100)}% confidence
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {queryAnalysis.type}
                  </Badge>
                  {queryAnalysis.entities.map((entity: any, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {entity.type}: {entity.value}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {smartSuggestions.length > 0 && (
              <div className="space-y-2 mt-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-purple-600" />
                  <span className="text-xs font-medium text-muted-foreground">Smart Suggestions</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {smartSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSmartSuggestionClick(suggestion)}
                      className="h-7 text-xs text-purple-700 hover:text-purple-900 hover:bg-purple-100 dark:text-purple-300 dark:hover:text-purple-100"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default EnhancedSearchBar;
