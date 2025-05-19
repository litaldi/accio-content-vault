
import { useState, useEffect, useCallback } from 'react';
import { mockContents as initialContents } from '@/lib/mock-data';
import { SavedContent, Tag } from '@/types';

export function useContentSearch() {
  const [searchResults, setSearchResults] = useState<SavedContent[]>(initialContents);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSemanticSearch, setIsSemanticSearch] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle search
  const handleSearch = useCallback(async (query: string, semantic: boolean) => {
    setSearchQuery(query);
    setIsSemanticSearch(semantic);
    setIsLoading(true);

    try {
      // In a real app, this would be an API call to search content
      // For now, we'll use a mock implementation with a delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!query.trim()) {
        setSearchResults(initialContents);
        return;
      }

      const lowerCaseQuery = query.toLowerCase();
      const filtered = initialContents.filter((content) => {
        // Basic search looks at title and description
        if (!semantic) {
          return (
            content.title.toLowerCase().includes(lowerCaseQuery) ||
            content.description.toLowerCase().includes(lowerCaseQuery)
          );
        } 
        // Semantic search also looks at content and tags (simulated)
        else {
          // Check if any tag matches
          const tagMatch = content.tags.some((tag) =>
            tag.name.toLowerCase().includes(lowerCaseQuery)
          );
          
          return (
            content.title.toLowerCase().includes(lowerCaseQuery) ||
            content.description.toLowerCase().includes(lowerCaseQuery) ||
            tagMatch
          );
        }
      });

      setSearchResults(filtered);
    } catch (error) {
      console.error('Error searching content:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle tag selection in results
  const handleTagsChange = useCallback((contentId: string, tags: Tag[]) => {
    setSearchResults(
      (prevResults) =>
        prevResults.map((content) =>
          content.id === contentId ? { ...content, tags } : content
        )
    );
  }, []);

  return {
    searchResults,
    searchQuery,
    isSemanticSearch,
    isLoading,
    handleSearch,
    handleTagsChange,
  };
}
