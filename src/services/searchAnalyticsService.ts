
interface SearchAnalytics {
  query: string;
  timestamp: Date;
  resultCount: number;
  isSemanticSearch: boolean;
  userId?: string;
}

export class SearchAnalyticsService {
  private static instance: SearchAnalyticsService;
  private searches: SearchAnalytics[] = [];

  static getInstance(): SearchAnalyticsService {
    if (!SearchAnalyticsService.instance) {
      SearchAnalyticsService.instance = new SearchAnalyticsService();
    }
    return SearchAnalyticsService.instance;
  }

  recordSearch(query: string, resultCount: number, isSemanticSearch: boolean = false): void {
    const searchRecord: SearchAnalytics = {
      query: query.trim(),
      timestamp: new Date(),
      resultCount,
      isSemanticSearch,
      userId: this.getCurrentUserId()
    };

    this.searches.push(searchRecord);
    
    // Keep only last 1000 searches to prevent memory issues
    if (this.searches.length > 1000) {
      this.searches = this.searches.slice(-1000);
    }

    // Store in localStorage for persistence
    try {
      localStorage.setItem('searchAnalytics', JSON.stringify(this.searches.slice(-100)));
    } catch (error) {
      console.warn('Failed to store search analytics:', error);
    }
  }

  getPopularQueries(limit: number = 10): Array<{ query: string; count: number }> {
    const queryCount = new Map<string, number>();
    
    this.searches.forEach(search => {
      const count = queryCount.get(search.query) || 0;
      queryCount.set(search.query, count + 1);
    });

    return Array.from(queryCount.entries())
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  getRecentQueries(limit: number = 5): string[] {
    return this.searches
      .slice(-limit)
      .reverse()
      .map(search => search.query)
      .filter((query, index, arr) => arr.indexOf(query) === index);
  }

  getSearchTrends(): Array<{ date: string; count: number }> {
    const dailyCounts = new Map<string, number>();
    
    this.searches.forEach(search => {
      const date = search.timestamp.toISOString().split('T')[0];
      const count = dailyCounts.get(date) || 0;
      dailyCounts.set(date, count + 1);
    });

    return Array.from(dailyCounts.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  // New method for enhanced analytics compatibility
  getSearchHistory(): SearchAnalytics[] {
    return [...this.searches];
  }

  // New method for tag search statistics (mock implementation)
  getTagSearchStats(): any {
    return {
      totalTagSearches: this.searches.filter(s => s.query.includes('#')).length,
      averageTagsPerSearch: 1.2,
      topTaggedQueries: this.getPopularQueries(5).filter(q => q.query.includes('#'))
    };
  }

  // Alias for backward compatibility
  getPopularSearches(limit: number = 10): Array<{ query: string; count: number }> {
    return this.getPopularQueries(limit);
  }

  private getCurrentUserId(): string | undefined {
    // In a real app, this would get the current user ID from auth context
    try {
      return localStorage.getItem('userId') || undefined;
    } catch {
      return undefined;
    }
  }

  // Initialize from localStorage
  constructor() {
    try {
      const stored = localStorage.getItem('searchAnalytics');
      if (stored) {
        this.searches = JSON.parse(stored).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
      }
    } catch (error) {
      console.warn('Failed to load search analytics:', error);
    }
  }
}

export const searchAnalyticsService = SearchAnalyticsService.getInstance();
