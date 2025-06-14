
import { SavedContent, Tag } from '@/types';

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
    const text = `${item.title || ''} ${item.description || ''} ${item.tags.map(tag => tag.name).join(' ')} ${item.url || ''}`;
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
      filtered = filtered.filter(item => item.content_type === filters.type);
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(item => 
        filters.tags!.some(tagName => item.tags.some(tag => tag.name === tagName))
      );
    }

    if (filters.dateRange) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.created_at);
        return itemDate >= filters.dateRange!.start && itemDate <= filters.dateRange!.end;
      });
    }

    if (filters.source) {
      filtered = filtered.filter(item => 
        (item.url && item.url.includes(filters.source!)) || 
        (item.title && item.title.includes(filters.source!))
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
    const title = caseSensitive ? (item.title || '') : (item.title || '').toLowerCase();
    const description = caseSensitive ? (item.description || '') : (item.description || '').toLowerCase();
    const tags = item.tags.map(tag => caseSensitive ? tag.name : tag.name.toLowerCase());

    // Title matches have highest weight
    if (title.includes(searchTerm)) {
      score += 10;
      if (title.startsWith(searchTerm)) score += 5;
    }

    // Tag matches have medium weight
    tags.forEach(tagName => {
      if (tagName.includes(searchTerm)) {
        score += 5;
        if (tagName === searchTerm) score += 3;
      }
    });

    // Description matches have lower weight
    const descriptionMatches = (description.match(new RegExp(searchTerm, 'g')) || []).length;
    score += descriptionMatches * 1;

    return score;
  }

  private generateSuggestions(query: string, noResults: boolean): string[] {
    if (!noResults || !query.trim()) return [];

    const suggestions: string[] = [];
    const words = query.toLowerCase().split(' ');

    // Generate similar queries from existing content
    this.content.forEach(item => {
      item.tags.forEach(tag => {
        if (tag.name.toLowerCase().includes(words[0]) && !suggestions.includes(tag.name)) {
          suggestions.push(tag.name);
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
