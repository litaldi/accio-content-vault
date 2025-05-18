
import { SavedContent, SearchResult } from '@/types';

/**
 * Performs a semantic search based on a query string
 */
export const semanticSearch = (query: string, contents: SavedContent[]): SearchResult[] => {
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

/**
 * Performs a basic keyword-based search
 */
export const basicSearch = (query: string, contents: SavedContent[]): SearchResult[] => {
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
