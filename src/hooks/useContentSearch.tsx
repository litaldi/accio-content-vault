
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SavedContent, Tag, SearchResult } from '@/types';
import { mockContents } from '@/lib/mock-data';

export interface UseContentSearchReturn {
  contents: SavedContent[];
  searchResults: SearchResult[];
  searchQuery: string;
  isSemanticSearch: boolean;
  handleSearch: (query: string, useSemanticSearch: boolean) => void;
  handleTagsChange: (contentId: string, newTags: Tag[]) => void;
}

export const useContentSearch = (): UseContentSearchReturn => {
  const [contents, setContents] = useState<SavedContent[]>(mockContents);
  const [searchResults, setSearchResults] = useState<SearchResult[]>(
    mockContents.map(content => ({ content }))
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isSemanticSearch, setIsSemanticSearch] = useState(false);
  const { toast } = useToast();

  // This would be replaced with actual API call in a real app
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setContents(mockContents);
        setSearchResults(mockContents.map(content => ({ content })));
      } catch (error) {
        console.error('Error fetching content:', error);
        toast({
          title: 'Error loading content',
          description: 'Failed to load your saved content',
          variant: 'destructive',
        });
      }
    };

    fetchContent();
  }, [toast]);

  // Mock function to simulate semantic search
  const simulateSemanticSearch = (query: string, contents: SavedContent[]): SearchResult[] => {
    // Simple scoring algorithm for demonstration
    const results = contents.map(content => {
      let score = 0;
      
      if (content.title.toLowerCase().includes(query.toLowerCase())) {
        score += 0.6;
      }
      
      if (content.description.toLowerCase().includes(query.toLowerCase())) {
        score += 0.3;
      }
      
      if (content.tags.some(tag => tag.name.toLowerCase().includes(query.toLowerCase()))) {
        score += 0.4;
      }
      
      return { content, score };
    });
    
    const filteredResults = results.filter(result => result.score! > 0);
    return filteredResults.sort((a, b) => (b.score || 0) - (a.score || 0));
  };

  // Basic keyword search function
  const basicSearch = (query: string, contents: SavedContent[]): SearchResult[] => {
    const lowercaseQuery = query.toLowerCase();
    
    const filtered = contents.filter(content => {
      if (
        content.title.toLowerCase().includes(lowercaseQuery) ||
        content.description.toLowerCase().includes(lowercaseQuery)
      ) {
        return true;
      }
      
      return content.tags.some(tag => 
        tag.name.toLowerCase().includes(lowercaseQuery)
      );
    });
    
    return filtered.map(content => ({ content }));
  };

  const handleSearch = (query: string, useSemanticSearch: boolean) => {
    setSearchQuery(query);
    setIsSemanticSearch(useSemanticSearch);
    
    let results: SearchResult[];
    
    if (useSemanticSearch) {
      results = simulateSemanticSearch(query, contents);
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
    // Update tags for the specific content
    const updatedContents = contents.map(content => {
      if (content.id === contentId) {
        return { ...content, tags: newTags };
      }
      return content;
    });
    
    setContents(updatedContents);
    
    // Update search results
    const updatedResults = searchResults.map(result => {
      if (result.content.id === contentId) {
        return { ...result, content: { ...result.content, tags: newTags } };
      }
      return result;
    });
    
    setSearchResults(updatedResults);
    
    toast({
      title: 'Tags updated',
      description: 'Your changes have been saved',
    });
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
