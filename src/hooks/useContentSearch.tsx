
import { useState, useEffect, useCallback } from 'react';
import { mockContents as initialContents } from '@/lib/mock-data';
import { SavedContent, Tag } from '@/types';
import { searchAnalyticsService } from '@/services/searchAnalyticsService';

export function useContentSearch() {
  const [searchResults, setSearchResults] = useState<{ content: SavedContent; score?: number; }[]>(
    initialContents.map(content => ({ content, score: undefined }))
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSemanticSearch, setIsSemanticSearch] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle search with analytics tracking
  const handleSearch = useCallback(async (query: string, semantic: boolean) => {
    setSearchQuery(query);
    setIsSemanticSearch(semantic);
    setIsLoading(true);

    try {
      // In a real app, this would be an API call to search content
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!query.trim()) {
        const allResults = initialContents.map(content => ({ content, score: undefined }));
        setSearchResults(allResults);
        return;
      }

      const lowerCaseQuery = query.toLowerCase();
      let filtered = initialContents;

      if (semantic) {
        // Enhanced semantic search logic
        filtered = initialContents.filter((content) => {
          // Check title, description, and tags
          const titleMatch = content.title.toLowerCase().includes(lowerCaseQuery);
          const descMatch = content.description.toLowerCase().includes(lowerCaseQuery);
          const tagMatch = content.tags.some((tag) =>
            tag.name.toLowerCase().includes(lowerCaseQuery)
          );
          
          // Natural language processing for common patterns
          const isJobQuery = /job|career|work|employment|hiring/.test(lowerCaseQuery);
          const hasJobContent = content.tags.some(tag => 
            ['career', 'job', 'work', 'professional'].includes(tag.name)
          );
          
          const isLearningQuery = /learn|tutorial|course|education|guide/.test(lowerCaseQuery);
          const hasLearningContent = content.tags.some(tag => 
            ['learning', 'tutorial', 'education', 'course'].includes(tag.name)
          );
          
          return titleMatch || descMatch || tagMatch || 
                 (isJobQuery && hasJobContent) || 
                 (isLearningQuery && hasLearningContent);
        });
      } else {
        // Basic keyword search
        filtered = initialContents.filter((content) => {
          return (
            content.title.toLowerCase().includes(lowerCaseQuery) ||
            content.description.toLowerCase().includes(lowerCaseQuery) ||
            content.tags.some((tag) => tag.name.toLowerCase().includes(lowerCaseQuery))
          );
        });
      }

      const results = filtered.map(content => ({
        content,
        score: semantic ? Math.random() * 0.5 + 0.5 : undefined
      }));

      setSearchResults(results);
      
      // Record search analytics
      searchAnalyticsService.recordSearch(query, results.length, semantic);
      
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
        prevResults.map((result) =>
          result.content.id === contentId 
            ? { ...result, content: { ...result.content, tags } } 
            : result
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
