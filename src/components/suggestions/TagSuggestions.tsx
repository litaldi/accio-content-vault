
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface TagSuggestion {
  name: string;
  frequency: number;
  trending: boolean;
}

interface TagSuggestionsProps {
  suggestions: TagSuggestion[];
  onTagClick: (tag: string) => void;
}

export const TagSuggestions: React.FC<TagSuggestionsProps> = ({
  suggestions,
  onTagClick,
}) => {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <TrendingUp className="h-4 w-4" />
          Suggested Tags
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {suggestions.slice(0, 8).map((suggestion) => (
            <Badge
              key={suggestion.name}
              variant={suggestion.trending ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary/80 transition-colors"
              onClick={() => onTagClick(suggestion.name)}
            >
              {suggestion.name}
              {suggestion.trending && (
                <TrendingUp className="h-3 w-3 ml-1" />
              )}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
