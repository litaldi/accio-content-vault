interface SearchQuery {
  query: string;
  timestamp: string;
  resultCount: number;
  isSemanticSearch: boolean;
  tags?: string[];
}

interface TagSearchStats {
  [tagName: string]: {
    count: number;
    lastSearched: string;
  };
}

/**
 * Service to track and analyze user search behavior
 * Helps understand which tags and content types are most valuable
 */
export class SearchAnalyticsService {
  private static instance: SearchAnalyticsService;

  static getInstance(): SearchAnalyticsService {
    if (!SearchAnalyticsService.instance) {
      SearchAnalyticsService.instance = new SearchAnalyticsService();
    }
    return SearchAnalyticsService.instance;
  }

  /**
   * Record a search query for analytics
   */
  recordSearch(query: string, resultCount: number, isSemanticSearch: boolean = false): void {
    try {
      const searchData: SearchQuery = {
        query: query.toLowerCase().trim(),
        timestamp: new Date().toISOString(),
        resultCount,
        isSemanticSearch,
        tags: this.extractTagsFromQuery(query)
      };

      // Store search history
      const searches = this.getSearchHistory();
      searches.push(searchData);
      
      // Keep only last 100 searches
      const recentSearches = searches.slice(-100);
      localStorage.setItem('searchHistory', JSON.stringify(recentSearches));

      // Update tag search statistics
      this.updateTagSearchStats(searchData);

      console.log('Search recorded:', searchData);
    } catch (error) {
      console.error('Error recording search:', error);
    }
  }

  /**
   * Get search history
   */
  getSearchHistory(): SearchQuery[] {
    try {
      return JSON.parse(localStorage.getItem('searchHistory') || '[]');
    } catch {
      return [];
    }
  }

  /**
   * Get tag search statistics
   */
  getTagSearchStats(): TagSearchStats {
    try {
      return JSON.parse(localStorage.getItem('tagSearchStats') || '{}');
    } catch {
      return {};
    }
  }

  /**
   * Get popular search terms
   */
  getPopularSearches(limit: number = 10): Array<{query: string, count: number}> {
    const searches = this.getSearchHistory();
    const queryCount: {[key: string]: number} = {};

    searches.forEach(search => {
      queryCount[search.query] = (queryCount[search.query] || 0) + 1;
    });

    return Object.entries(queryCount)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  /**
   * Extract potential tag names from search query
   */
  private extractTagsFromQuery(query: string): string[] {
    const commonTags = [
      'job', 'career', 'work', 'interview', 'resume',
      'programming', 'coding', 'javascript', 'react', 'python',
      'ai', 'machine learning', 'tutorial', 'course', 'learning',
      'news', 'article', 'video', 'github', 'youtube'
    ];

    return commonTags.filter(tag => 
      query.toLowerCase().includes(tag.toLowerCase())
    );
  }

  /**
   * Update tag search statistics
   */
  private updateTagSearchStats(searchData: SearchQuery): void {
    if (!searchData.tags || searchData.tags.length === 0) return;

    const stats = this.getTagSearchStats();
    
    searchData.tags.forEach(tag => {
      if (!stats[tag]) {
        stats[tag] = { count: 0, lastSearched: searchData.timestamp };
      }
      stats[tag].count += 1;
      stats[tag].lastSearched = searchData.timestamp;
    });

    localStorage.setItem('tagSearchStats', JSON.stringify(stats));
  }
}

export const searchAnalyticsService = SearchAnalyticsService.getInstance();
