
import React from 'react';
import { ImprovedCard, ImprovedCardContent } from '@/components/ui/improved-card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: number;
  title: string;
  type: string;
  url?: string;
  tags: string[];
  savedAt: string;
  preview: string;
  relevanceScore: number;
  readTime: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  selectedTags,
  onTagClick
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return '📰';
      case 'pdf':
        return '📄';
      case 'note':
        return '📝';
      default:
        return '📄';
    }
  };

  return (
    <div className="space-y-6" role="region" aria-label="Search results">
      {results.map((result) => (
        <ImprovedCard
          key={result.id}
          className="bg-background/80 backdrop-blur-sm border-0 shadow-lg"
          hover
          interactive
        >
          <ImprovedCardContent padding="lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">{getTypeIcon(result.type)}</span>
                <div>
                  <h3 className="font-semibold text-xl mb-1 text-foreground group-hover:text-primary transition-colors">
                    {result.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="capitalize font-medium">{result.type}</span>
                    <span aria-hidden="true">•</span>
                    <time dateTime={result.savedAt}>
                      Saved on {new Date(result.savedAt).toLocaleDateString()}
                    </time>
                    <span aria-hidden="true">•</span>
                    <span>{result.readTime}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-medium">
                  {result.relevanceScore}% match
                </Badge>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {result.preview}
            </p>
            
            <div className="flex flex-wrap gap-2" role="list" aria-label="Content tags">
              {result.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={cn(
                    "text-xs cursor-pointer transition-all hover:scale-105",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
                    selectedTags.includes(tag) 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "hover:bg-accent"
                  )}
                  onClick={() => onTagClick(tag)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onTagClick(tag);
                    }
                  }}
                  aria-label={`Filter by ${tag} tag`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </ImprovedCardContent>
        </ImprovedCard>
      ))}
    </div>
  );
};
