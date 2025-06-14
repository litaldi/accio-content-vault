
import { SavedContent } from '@/types';
import { applyFilters } from './search/searchFilters';
import { sortByRelevance } from './search/searchScoring';
import { getSearchableText, fuzzyMatch, generateSuggestions } from './search/searchMatching';

interface SearchFilters {
  type?: string;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  source?: string;
}

interface SearchOptions {
  fuzzy?: boolean;
  caseSensitive?: boolean;
  exactMatch?: boolean;
  limit?: number;
  offset?: number;
}

interface SearchResult {
  items: SavedContent[];
  total: number;
  hasMore: boolean;
  query: string;
  suggestions?: string[];
}

class SearchService {
  private content: SavedContent[] = [];
  private indexedContent: Map<string, SavedContent> = new Map();

  setContent(content: SavedContent[]): void {
    this.content = content;
    this.indexedContent.clear();
    content.forEach(item => {
      this.indexedContent.set(item.id, item);
    });
  }

  search(
    query: string, 
    filters: SearchFilters = {}, 
    options: SearchOptions = {}
  ): SearchResult {
    const {
      fuzzy = true,
      caseSensitive = false,
      exactMatch = false,
      limit = 50,
      offset = 0
    } = options;

    let results = [...this.content];

    // Apply text search
    if (query.trim()) {
      const searchTerm = caseSensitive ? query : query.toLowerCase();
      
      results = results.filter(item => {
        const searchableText = getSearchableText(item, caseSensitive);
        
        if (exactMatch) {
          return searchableText.includes(searchTerm);
        }
        
        if (fuzzy) {
          return fuzzyMatch(searchableText, searchTerm);
        }
        
        return searchableText.includes(searchTerm);
      });
    }

    // Apply filters
    results = applyFilters(results, filters);

    // Sort by relevance
    if (query.trim()) {
      results = sortByRelevance(results, query, caseSensitive);
    }

    // Apply pagination
    const total = results.length;
    const paginatedResults = results.slice(offset, offset + limit);

    return {
      items: paginatedResults,
      total,
      hasMore: offset + limit < total,
      query,
      suggestions: generateSuggestions(query, this.content, results.length === 0)
    };
  }

  getPopularSearches(): string[] {
    // In a real app, this would come from analytics
    return [
      'productivity tips',
      'react tutorial',
      'javascript best practices',
      'design patterns',
      'ai tools'
    ];
  }
}

export const searchService = new SearchService();
