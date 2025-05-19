
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SavedContent, Tag, SearchResult } from '@/types';
import { useContentService } from '@/services';  // Updated import
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

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
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { fetchAllContents, updateContentTags } = useContentService();
  const { user } = useAuth();

  useEffect(() => {
    const loadInitialContent = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const fetchedContents = await fetchAllContents();
        setContents(fetchedContents);
        setSearchResults(fetchedContents.map(content => ({ content })));
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialContent();
  }, [user, fetchAllContents]);

  const handleSearch = async (query: string, useSemanticSearch: boolean) => {
    if (!user) return;
    
    setSearchQuery(query);
    setIsSemanticSearch(useSemanticSearch);
    setIsLoading(true);
    
    try {
      // Save search history
      await supabase.from('search_history').insert({
        user_id: user.id,
        query: query,
        is_semantic: useSemanticSearch
      });
      
      // For now, we use the mockup search util functions
      // In the future, this would be replaced with actual search functionality
      const filteredContents = contents.filter(content => {
        // Check if query matches title, description or URL
        const matchesContent = 
          content.title.toLowerCase().includes(query.toLowerCase()) ||
          content.description.toLowerCase().includes(query.toLowerCase()) ||
          content.url.toLowerCase().includes(query.toLowerCase());
        
        // Check if query matches any tag
        const matchesTags = content.tags.some(tag => 
          tag.name.toLowerCase().includes(query.toLowerCase())
        );
        
        return matchesContent || matchesTags;
      });
      
      // Convert to search results format
      const results = filteredContents.map(content => ({ 
        content,
        score: 1.0 // Simplified scoring for now
      }));
      
      setSearchResults(results);
      
      if (results.length === 0 && query) {
        toast({
          title: 'No results found',
          description: `No content matches "${query}"`,
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: 'Search failed',
        description: 'An error occurred while searching',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagsChange = async (contentId: string, newTags: Tag[]) => {
    if (!user) return;
    
    try {
      // Update content tags in the database
      const updatedContents = await updateContentTags(contentId, newTags, contents);
      setContents(updatedContents);
      
      // Update search results with the new tags as well
      const updatedResults = searchResults.map(result => {
        if (result.content.id === contentId) {
          return { ...result, content: { ...result.content, tags: newTags } };
        }
        return result;
      });
      
      setSearchResults(updatedResults);
    } catch (error) {
      console.error('Error updating tags:', error);
    }
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
