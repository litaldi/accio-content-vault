
import React from 'react';
import ContentList from '@/components/ContentList';
import TagEditor from '@/components/TagEditor';
import { SavedContent, Tag } from '@/types';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';

interface SearchResultsProps {
  searchResults: { content: SavedContent, score?: number }[];
  searchQuery: string;
  onTagsChange: (contentId: string, newTags: Tag[]) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  searchResults, 
  searchQuery, 
  onTagsChange 
}) => {
  if (!searchResults.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in" role="status" aria-live="polite">
        <div className="rounded-full bg-muted w-20 h-20 flex items-center justify-center mb-4">
          <Search className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-medium mb-2">No results found</h2>
        <p className="text-muted-foreground max-w-sm">
          Try adjusting your search or using different keywords
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="sr-only">Search Results</h2>
      {searchResults.map((result, index) => (
        <div 
          key={result.content.id} 
          className={`animate-slide-up`} 
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <Card className="overflow-hidden border transition-all duration-300 hover:shadow-md">
            <div className="p-4">
              <ContentList 
                contents={[result.content]} 
                searchQuery={searchQuery} 
              />
              <div className="mt-3 px-1">
                <TagEditor 
                  tags={result.content.tags}
                  onTagsChange={(newTags) => onTagsChange(result.content.id, newTags)}
                />
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
