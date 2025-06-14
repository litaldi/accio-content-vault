
import { SavedContent } from '@/types';

interface TimeframeFilter {
  key: string;
  test: (itemDate: Date, now: Date) => boolean;
}

/**
 * Utility service for search filtering logic
 */
export class SearchFilters {
  private static timeframeFilters: TimeframeFilter[] = [
    {
      key: 'today',
      test: (itemDate, now) => itemDate.toDateString() === now.toDateString()
    },
    {
      key: 'yesterday',
      test: (itemDate, now) => {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        return itemDate.toDateString() === yesterday.toDateString();
      }
    },
    {
      key: 'week',
      test: (itemDate, now) => {
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return itemDate >= weekAgo;
      }
    },
    {
      key: 'month',
      test: (itemDate, now) => {
        const monthAgo = new Date(now);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return itemDate >= monthAgo;
      }
    },
    {
      key: 'recent',
      test: (itemDate, now) => {
        const recentThreshold = new Date(now);
        recentThreshold.setDate(recentThreshold.getDate() - 14);
        return itemDate >= recentThreshold;
      }
    }
  ];

  static applyTimeframeFilter(
    content: SavedContent[], 
    timeframe: string
  ): SavedContent[] {
    const filter = this.timeframeFilters.find(f => f.key === timeframe);
    if (!filter) return content;

    const now = new Date();
    return content.filter(item => {
      const itemDate = new Date(item.created_at);
      return filter.test(itemDate, now);
    });
  }

  static filterByContentType(
    content: SavedContent[], 
    contentType: string
  ): SavedContent[] {
    return content.filter(item => item.file_type === contentType);
  }

  static filterByKeywords(
    content: SavedContent[], 
    keywords: string[]
  ): SavedContent[] {
    if (keywords.length === 0) return content;

    return content.filter(item => {
      const searchableText = `${item.title} ${item.description} ${item.url}`.toLowerCase();
      return keywords.some(keyword => 
        searchableText.includes(keyword.toLowerCase())
      );
    });
  }

  static highlightMatches(text: string, keywords: string[]): string {
    if (!keywords.length) return text;
    
    let highlighted = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlighted = highlighted.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>');
    });
    
    return highlighted;
  }
}
