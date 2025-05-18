
import React from 'react';
import ContentList from '@/components/ContentList';
import TagEditor from '@/components/TagEditor';
import { SavedContent, Tag } from '@/types';

interface SearchResultsProps {
  searchResults: { content: SavedContent }[];
  searchQuery: string;
  onTagsChange: (contentId: string, newTags: Tag[]) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  searchResults, 
  searchQuery, 
  onTagsChange 
}) => {
  if (!searchResults.length) {
    return <div className="text-center py-8">No results found</div>;
  }

  return (
    <div className="space-y-6">
      {searchResults.map(result => (
        <div key={result.content.id} className="space-y-2">
          <ContentList 
            contents={[result.content]} 
            searchQuery={searchQuery} 
          />
          <div className="pl-4 pr-4 pb-4">
            <TagEditor 
              tags={result.content.tags}
              onTagsChange={(newTags) => onTagsChange(result.content.id, newTags)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
