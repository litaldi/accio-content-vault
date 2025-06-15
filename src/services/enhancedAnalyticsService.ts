
import { searchAnalyticsService } from './searchAnalyticsService';

export interface ContentStats {
  totalItems: number;
  itemsByType: { [key: string]: number };
  itemsByTimeframe: { period: string; count: number }[];
  growthTrend: 'increasing' | 'decreasing' | 'stable';
}

export interface TagInsights {
  totalTags: number;
  confirmedTags: number;
  rejectedTags: number;
  confirmationRate: number;
  topConfirmedTags: { name: string; count: number; rate: number }[];
  topRejectedTags: { name: string; count: number; rate: number }[];
  tagAccuracyTrend: { period: string; accuracy: number }[];
}

export interface SearchInsights {
  totalSearches: number;
  uniqueQueries: number;
  averageResultsPerSearch: number;
  topSearchTerms: { query: string; count: number; avgResults: number }[];
  searchTrends: { period: string; count: number }[];
  semanticSearchUsage: number;
}

export interface ActivityInsights {
  dailyActivity: { date: string; saves: number; searches: number; tagConfirmations: number }[];
  peakUsageHours: { hour: number; activity: number }[];
  weeklyPattern: { day: string; activity: number }[];
  engagementScore: number;
}

/**
 * Enhanced analytics service for comprehensive user insights
 */
export class EnhancedAnalyticsService {
  private static instance: EnhancedAnalyticsService;

  static getInstance(): EnhancedAnalyticsService {
    if (!EnhancedAnalyticsService.instance) {
      EnhancedAnalyticsService.instance = new EnhancedAnalyticsService();
    }
    return EnhancedAnalyticsService.instance;
  }

  /**
   * Get comprehensive content statistics
   */
  getContentStats(): ContentStats {
    try {
      // Get mock data for demonstration - in real app would fetch from API
      const mockData: ContentStats = {
        totalItems: 42,
        itemsByType: {
          'URL': 28,
          'PDF': 8,
          'Image': 6
        },
        itemsByTimeframe: [
          { period: 'This Week', count: 12 },
          { period: 'Last Week', count: 8 },
          { period: 'This Month', count: 42 },
          { period: 'Last Month', count: 35 }
        ],
        growthTrend: 'increasing'
      };

      return mockData;
    } catch (error) {
      console.error('Error getting content stats:', error);
      return {
        totalItems: 0,
        itemsByType: {},
        itemsByTimeframe: [],
        growthTrend: 'stable'
      };
    }
  }

  /**
   * Get detailed tag performance insights
   */
  getTagInsights(): TagInsights {
    try {
      const tagStats = searchAnalyticsService.getTagSearchStats();
      
      const mockInsights: TagInsights = {
        totalTags: 156,
        confirmedTags: 132,
        rejectedTags: 24,
        confirmationRate: 84.6,
        topConfirmedTags: [
          { name: 'javascript', count: 18, rate: 94.7 },
          { name: 'career', count: 15, rate: 88.2 },
          { name: 'tutorial', count: 12, rate: 91.7 },
          { name: 'productivity', count: 10, rate: 83.3 },
          { name: 'design', count: 8, rate: 87.5 }
        ],
        topRejectedTags: [
          { name: 'random', count: 5, rate: 20.0 },
          { name: 'misc', count: 4, rate: 25.0 },
          { name: 'temp', count: 3, rate: 33.3 }
        ],
        tagAccuracyTrend: [
          { period: 'Week 1', accuracy: 78.5 },
          { period: 'Week 2', accuracy: 82.1 },
          { period: 'Week 3', accuracy: 84.6 },
          { period: 'Week 4', accuracy: 86.2 }
        ]
      };

      return mockInsights;
    } catch (error) {
      console.error('Error getting tag insights:', error);
      return {
        totalTags: 0,
        confirmedTags: 0,
        rejectedTags: 0,
        confirmationRate: 0,
        topConfirmedTags: [],
        topRejectedTags: [],
        tagAccuracyTrend: []
      };
    }
  }

  /**
   * Get search behavior insights
   */
  getSearchInsights(): SearchInsights {
    try {
      const searchHistory = searchAnalyticsService.getSearchHistory();
      const popularSearches = searchAnalyticsService.getPopularQueries();

      const totalSearches = searchHistory.length;
      const semanticSearches = searchHistory.filter(s => s.isSemanticSearch).length;
      
      const mockInsights: SearchInsights = {
        totalSearches,
        uniqueQueries: popularSearches.length,
        averageResultsPerSearch: 4.2,
        topSearchTerms: popularSearches.slice(0, 5).map(s => ({
          query: s.query,
          count: s.count,
          avgResults: Math.floor(Math.random() * 8) + 2
        })),
        searchTrends: [
          { period: 'Mon', count: 8 },
          { period: 'Tue', count: 12 },
          { period: 'Wed', count: 15 },
          { period: 'Thu', count: 18 },
          { period: 'Fri', count: 22 },
          { period: 'Sat', count: 6 },
          { period: 'Sun', count: 4 }
        ],
        semanticSearchUsage: totalSearches > 0 ? (semanticSearches / totalSearches) * 100 : 0
      };

      return mockInsights;
    } catch (error) {
      console.error('Error getting search insights:', error);
      return {
        totalSearches: 0,
        uniqueQueries: 0,
        averageResultsPerSearch: 0,
        topSearchTerms: [],
        searchTrends: [],
        semanticSearchUsage: 0
      };
    }
  }

  /**
   * Get user activity patterns and engagement metrics
   */
  getActivityInsights(): ActivityInsights {
    try {
      const mockInsights: ActivityInsights = {
        dailyActivity: [
          { date: '2024-01-15', saves: 5, searches: 12, tagConfirmations: 8 },
          { date: '2024-01-16', saves: 3, searches: 8, tagConfirmations: 5 },
          { date: '2024-01-17', saves: 7, searches: 15, tagConfirmations: 12 },
          { date: '2024-01-18', saves: 2, searches: 6, tagConfirmations: 3 },
          { date: '2024-01-19', saves: 4, searches: 10, tagConfirmations: 7 },
          { date: '2024-01-20', saves: 6, searches: 14, tagConfirmations: 9 },
          { date: '2024-01-21', saves: 1, searches: 3, tagConfirmations: 2 }
        ],
        peakUsageHours: [
          { hour: 9, activity: 15 },
          { hour: 14, activity: 22 },
          { hour: 19, activity: 18 },
          { hour: 21, activity: 12 }
        ],
        weeklyPattern: [
          { day: 'Mon', activity: 18 },
          { day: 'Tue', activity: 25 },
          { day: 'Wed', activity: 32 },
          { day: 'Thu', activity: 28 },
          { day: 'Fri', activity: 35 },
          { day: 'Sat', activity: 12 },
          { day: 'Sun', activity: 8 }
        ],
        engagementScore: 87.4
      };

      return mockInsights;
    } catch (error) {
      console.error('Error getting activity insights:', error);
      return {
        dailyActivity: [],
        peakUsageHours: [],
        weeklyPattern: [],
        engagementScore: 0
      };
    }
  }

  /**
   * Record user activity for analytics
   */
  recordActivity(activityType: 'save' | 'search' | 'tag_confirmation', metadata?: any): void {
    try {
      const activity = {
        type: activityType,
        timestamp: new Date().toISOString(),
        metadata: metadata || {}
      };

      // Store in localStorage for demo (in production, send to analytics service)
      const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
      activities.push(activity);
      
      // Keep only last 1000 activities
      const recentActivities = activities.slice(-1000);
      localStorage.setItem('userActivities', JSON.stringify(recentActivities));

      console.log('Activity recorded:', activity);
    } catch (error) {
      console.error('Error recording activity:', error);
    }
  }
}

export const enhancedAnalyticsService = EnhancedAnalyticsService.getInstance();
