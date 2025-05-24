
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';

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
      acc[tag.name] = (acc[tag.name] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const popularTags = Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 8);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Tag className="h-5 w-5" />
          Popular Tags
        </CardTitle>
      </CardHeader>
      <CardContent>
        {popularTags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {popularTags.map(([tag, count]) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => onTagClick(tag)}
              >
                {tag} ({count})
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No tags available yet
          </p>
        )}
      </CardContent>
    </Card>
  );
};
