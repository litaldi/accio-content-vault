
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';

interface TagSuggestion {
  name: string;
  count: number;
}

interface EnhancedTagSuggestionsProps {
  allContent: any[];
  onTagClick: (tag: string) => void;
}

export const EnhancedTagSuggestions: React.FC<EnhancedTagSuggestionsProps> = ({
  allContent,
  onTagClick
}) => {
  // Extract and count tags from content
  const tagCounts = allContent.reduce((acc, item) => {
    item.tags?.forEach((tag: any) => {
      const tagName = tag.name;
      acc[tagName] = (acc[tagName] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Convert to array and sort by count
  const suggestions: TagSuggestion[] = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count: Number(count) }))
    .sort((a, b) => Number(b.count) - Number(a.count))
    .slice(0, 6);

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Tag className="h-5 w-5" />
          Popular Tags
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <Badge
              key={suggestion.name}
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onTagClick(suggestion.name)}
            >
              {suggestion.name} ({suggestion.count})
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
