
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

export function applyFilters(content: SavedContent[], filters: SearchFilters): SavedContent[] {
  let filtered = [...content];

  // Filter by content type
  if (filters.type) {
    filtered = filtered.filter(item => 
      item.content_type?.toLowerCase() === filters.type.toLowerCase()
    );
  }

  // Filter by tags
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(item =>
      filters.tags!.some(filterTag =>
        item.tags.some(itemTag => 
          itemTag.name.toLowerCase().includes(filterTag.toLowerCase())
        )
      )
    );
  }

  // Filter by date range
  if (filters.dateRange) {
    filtered = filtered.filter(item => {
      const itemDate = new Date(item.created_at);
      return itemDate >= filters.dateRange!.start && itemDate <= filters.dateRange!.end;
    });
  }

  // Filter by source/domain
  if (filters.source && filters.source.trim()) {
    filtered = filtered.filter(item => {
      if (!item.url) return false;
      try {
        const itemDomain = new URL(item.url).hostname;
        return itemDomain.toLowerCase().includes(filters.source!.toLowerCase());
      } catch {
        return false;
      }
    });
  }

  return filtered;
}

export function highlightMatches(text: string, keywords: string[]): string {
  if (!keywords.length || !text) return text;
  
  let highlighted = text;
  keywords.forEach(keyword => {
    const regex = new RegExp(`(${keyword})`, 'gi');
    highlighted = highlighted.replace(regex, '<mark>$1</mark>');
  });
  
  return highlighted;
}
