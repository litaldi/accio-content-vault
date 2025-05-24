
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SmartRecommendations } from './SmartRecommendations';
import { NaturalLanguageSearch } from './NaturalLanguageSearch';
import { AutoCategorization } from './AutoCategorization';
import { SavedContent } from '@/types';
import { Sparkles } from 'lucide-react';

interface AIInsightsProps {
  currentContent?: SavedContent;
  allContent: SavedContent[];
  onContentClick: (content: SavedContent) => void;
  onSearchResults: (results: SavedContent[]) => void;
  onApplyTags: (tags: string[]) => void;
  className?: string;
}

export const AIInsights: React.FC<AIInsightsProps> = ({
  currentContent,
  allContent,
  onContentClick,
  onSearchResults,
  onApplyTags,
  className
}) => {
  console.log('AIInsights rendering with:', { 
    currentContent: !!currentContent, 
    allContentLength: allContent.length 
  });

  return (
    <div className={className}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI-Powered Content Intelligence
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Discover, organize, and connect your content with artificial intelligence
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NaturalLanguageSearch
          allContent={allContent}
          onSearch={onSearchResults}
        />

        <SmartRecommendations
          currentContent={currentContent}
          allContent={allContent}
          onContentClick={onContentClick}
        />

        {currentContent && (
          <div className="lg:col-span-2">
            <AutoCategorization
              content={currentContent}
              allContent={allContent}
              onApplySuggestion={onApplyTags}
            />
          </div>
        )}
      </div>
    </div>
  );
};
