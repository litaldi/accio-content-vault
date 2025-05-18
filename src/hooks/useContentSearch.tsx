
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SavedContent, Tag, SearchResult } from '@/types';
import { semanticSearch, basicSearch } from '@/utils/searchUtils';
import { useContentService } from '@/services/contentService';

export interface UseContentSearchReturn {
  contents: SavedContent[];
  searchResults: SearchResult[];
  searchQuery: string;
  isSemanticSearch: boolean;
  handleSearch: (query: string, useSemanticSearch: boolean) => void;
  handleTagsChange: (contentId: string, newTags: Tag[]) => void;
}

export const useContentSearch = (): UseContentSearchReturn => {
  const [contents, setContents] = useState<SavedContent[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSemanticSearch, setIsSemanticSearch] = useState(false);
  const { toast } = useToast();
  const { fetchAllContents, updateContentTags } = useContentService();

  useEffect(() => {
    const loadInitialContent = async () => {
      const fetchedContents = await fetchAllContents();
      setContents(fetchedContents);
      setSearchResults(fetchedContents.map(content => ({ content })));
    };

    loadInitialContent();
  }, []);

  const handleSearch = (query: string, useSemanticSearch: boolean) => {
    setSearchQuery(query);
    setIsSemanticSearch(useSemanticSearch);
    
    let results: SearchResult[];
    
    if (useSemanticSearch) {
      results = semanticSearch(query, contents);
    } else {
      results = basicSearch(query, contents);
    }
    
    setSearchResults(results);
    
    if (results.length === 0 && query) {
      toast({
        title: 'No results found',
        description: `No content matches "${query}"`,
      });
    }
  };

  const handleTagsChange = (contentId: string, newTags: Tag[]) => {
    // Update contents with the new tags
    const updatedContents = updateContentTags(contentId, newTags, contents);
    setContents(updatedContents);
    
    // Update search results with the new tags as well
    const updatedResults = searchResults.map(result => {
      if (result.content.id === contentId) {
        return { ...result, content: { ...result.content, tags: newTags } };
      }
      return result;
    });
    
    setSearchResults(updatedResults);
  };

  return {
    contents,
    searchResults,
    searchQuery,
    isSemanticSearch,
    handleSearch,
    handleTagsChange
  };
};
