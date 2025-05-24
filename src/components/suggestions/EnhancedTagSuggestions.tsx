
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tag } from '@/types';
import { Hash, TrendingUp, Star, Clock } from 'lucide-react';

interface TagSuggestion extends Tag {
  frequency: number;
  trending?: boolean;
  recentlyUsed?: boolean;
}

interface EnhancedTagSuggestionsProps {
  allContent: any[];
  onTagClick: (tagName: string) => void;
  maxSuggestions?: number;
}

export const EnhancedTagSuggestions: React.FC<EnhancedTagSuggestionsProps> = ({
  allContent,
  onTagClick,
  maxSuggestions = 8
}) => {
  const getTagSuggestions = (): TagSuggestion[] => {
    const tagFrequency = new Map<string, { tag: Tag; count: number; lastUsed: Date }>();
    
    // Calculate tag frequency and last usage
    allContent.forEach(content => {
      content.tags.forEach((tag: Tag) => {
        const key = tag.name.toLowerCase();
        const existing = tagFrequency.get(key);
        
        if (existing) {
          existing.count++;
          if (new Date(content.created_at) > existing.lastUsed) {
            existing.lastUsed = new Date(content.created_at);
          }
        } else {
          tagFrequency.set(key, {
            tag,
            count: 1,
            lastUsed: new Date(content.created_at)
          });
        }
      });
    });

    // Convert to suggestions with metadata
    const suggestions: TagSuggestion[] = Array.from(tagFrequency.entries()).map(([name, data]) => {
      const daysSinceLastUsed = (Date.now() - data.lastUsed.getTime()) / (1000 * 60 * 60 * 24);
      
      return {
        ...data.tag,
        frequency: data.count,
        trending: data.count >= 3 && daysSinceLastUsed < 7, // Used 3+ times in last week
        recentlyUsed: daysSinceLastUsed < 3 // Used in last 3 days
      };
    });

    // Sort by frequency and recency
    return suggestions
      .sort((a, b) => {
        // Prioritize trending tags
        if (a.trending && !b.trending) return -1;
        if (!a.trending && b.trending) return 1;
        
        // Then by frequency
        if (a.frequency !== b.frequency) return b.frequency - a.frequency;
        
        // Then by recent usage
        return (a.recentlyUsed ? 1 : 0) - (b.recentlyUsed ? 1 : 0);
      })
      .slice(0, maxSuggestions);
  };

  const suggestions = getTagSuggestions();

  if (suggestions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Hash className="h-4 w-4" />
            Tag Suggestions
          </CardTitle>
          <CardDescription>
            Start adding content to see tag suggestions
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Hash className="h-4 w-4" />
          Tag Suggestions
        </CardTitle>
        <CardDescription>
          Popular and trending tags
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion.id}
                variant="ghost"
                size="sm"
                onClick={() => onTagClick(suggestion.name)}
                className="h-auto p-2 justify-start"
              >
                <div className="flex items-center gap-2">
                  <Badge
                    variant={suggestion.trending ? "default" : "secondary"}
                    className="text-xs"
                  >
                    <div className="flex items-center gap-1">
                      {suggestion.trending && <TrendingUp className="h-3 w-3" />}
                      {suggestion.recentlyUsed && !suggestion.trending && <Clock className="h-3 w-3" />}
                      {suggestion.name}
                    </div>
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {suggestion.frequency}
                  </span>
                </div>
              </Button>
            ))}
          </div>
          
          <Button variant="outline" size="sm" className="w-full">
            <Star className="h-4 w-4 mr-2" />
            View All Tags
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
