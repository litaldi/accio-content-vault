
import React from 'react';
import { EnhancedUnifiedSearchBar } from './EnhancedUnifiedSearchBar';
import { Sparkles, Zap, Search } from 'lucide-react';
import { Typography, Spacing } from '@/components/ui/design-system';

interface SearchExperienceProps {
  variant?: 'hero' | 'dashboard' | 'minimal';
  onSearch?: (query: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showTips?: boolean;
  className?: string;
}

export const SearchExperience: React.FC<SearchExperienceProps> = ({
  variant = 'dashboard',
  onSearch,
  searchQuery,
  onSearchChange,
  showTips = true,
  className
}) => {
  const getPlaceholder = () => {
    switch (variant) {
      case 'hero':
        return "Ask me anything about your saved content...";
      case 'dashboard':
        return "Search your knowledge base...";
      case 'minimal':
        return "Search...";
      default:
        return "Search your knowledge...";
    }
  };

  const getSize = () => {
    switch (variant) {
      case 'hero':
        return 'lg';
      case 'dashboard':
        return 'md';
      case 'minimal':
        return 'sm';
      default:
        return 'md';
    }
  };

  return (
    <div className={className}>
      {variant === 'hero' && (
        <Spacing.Stack gap="6" className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <Typography.H2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Search
            </Typography.H2>
          </div>
          <Typography.Lead>
            Find exactly what you're looking for with intelligent search and natural language understanding
          </Typography.Lead>
        </Spacing.Stack>
      )}

      <EnhancedUnifiedSearchBar
        variant={variant === 'hero' ? 'hero' : variant === 'minimal' ? 'minimal' : 'default'}
        size={getSize() as 'sm' | 'md' | 'lg'}
        placeholder={getPlaceholder()}
        onSearch={onSearch}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        showVoiceSearch={true}
      />

      {showTips && variant !== 'minimal' && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Search className="h-3 w-3" />
            <span>Try: "articles about React"</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-3 w-3" />
            <span>Or: "what did I save yesterday?"</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            <span>Voice search enabled</span>
          </div>
        </div>
      )}
    </div>
  );
};
