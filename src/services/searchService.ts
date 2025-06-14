
import { SavedContent } from '@/types';

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
        const searchableText = this.getSearchableText(item, caseSensitive);
        
        if (exactMatch) {
          return searchableText.includes(searchTerm);
        }
        
        if (fuzzy) {
          return this.fuzzyMatch(searchableText, searchTerm);
        }
        
        return searchableText.includes(searchTerm);
      });
    }

    // Apply filters
    results = this.applyFilters(results, filters);

    // Sort by relevance
    if (query.trim()) {
      results = this.sortByRelevance(results, query, caseSensitive);
    }

    // Apply pagination
    const total = results.length;
    const paginatedResults = results.slice(offset, offset + limit);

    return {
      items: paginatedResults,
      total,
      hasMore: offset + limit < total,
      query,
      suggestions: this.generateSuggestions(query, results.length === 0)
    };
  }

  private getSearchableText(item: SavedContent, caseSensitive: boolean): string {
    const text = `${item.title} ${item.content} ${item.tags.join(' ')} ${item.url}`;
    return caseSensitive ? text : text.toLowerCase();
  }

  private fuzzyMatch(text: string, term: string): boolean {
    // Simple fuzzy matching - can be enhanced with more sophisticated algorithms
    const words = term.split(' ').filter(word => word.length > 0);
    return words.every(word => text.includes(word));
  }

  private applyFilters(results: SavedContent[], filters: SearchFilters): SavedContent[] {
    let filtered = results;

    if (filters.type) {
      filtered = filtered.filter(item => item.type === filters.type);
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(item => 
        filters.tags!.some(tag => item.tags.includes(tag))
      );
    }

    if (filters.dateRange) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.savedAt);
        return itemDate >= filters.dateRange!.start && itemDate <= filters.dateRange!.end;
      });
    }

    if (filters.source) {
      filtered = filtered.filter(item => 
        item.url.includes(filters.source!) || item.title.includes(filters.source!)
      );
    }

    return filtered;
  }

  private sortByRelevance(results: SavedContent[], query: string, caseSensitive: boolean): SavedContent[] {
    const searchTerm = caseSensitive ? query : query.toLowerCase();
    
    return results.sort((a, b) => {
      const scoreA = this.calculateRelevanceScore(a, searchTerm, caseSensitive);
      const scoreB = this.calculateRelevanceScore(b, searchTerm, caseSensitive);
      return scoreB - scoreA;
    });
  }

  private calculateRelevanceScore(item: SavedContent, searchTerm: string, caseSensitive: boolean): number {
    let score = 0;
    const title = caseSensitive ? item.title : item.title.toLowerCase();
    const content = caseSensitive ? item.content : item.content.toLowerCase();
    const tags = item.tags.map(tag => caseSensitive ? tag : tag.toLowerCase());

    // Title matches have highest weight
    if (title.includes(searchTerm)) {
      score += 10;
      if (title.startsWith(searchTerm)) score += 5;
    }

    // Tag matches have medium weight
    tags.forEach(tag => {
      if (tag.includes(searchTerm)) {
        score += 5;
        if (tag === searchTerm) score += 3;
      }
    });

    // Content matches have lower weight
    const contentMatches = (content.match(new RegExp(searchTerm, 'g')) || []).length;
    score += contentMatches * 1;

    return score;
  }

  private generateSuggestions(query: string, noResults: boolean): string[] {
    if (!noResults || !query.trim()) return [];

    const suggestions: string[] = [];
    const words = query.toLowerCase().split(' ');

    // Generate similar queries from existing content
    this.content.forEach(item => {
      item.tags.forEach(tag => {
        if (tag.toLowerCase().includes(words[0]) && !suggestions.includes(tag)) {
          suggestions.push(tag);
        }
      });
    });

    return suggestions.slice(0, 5);
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
