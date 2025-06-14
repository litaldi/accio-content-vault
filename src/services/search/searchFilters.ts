
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

export const applyFilters = (results: SavedContent[], filters: SearchFilters): SavedContent[] => {
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
};
