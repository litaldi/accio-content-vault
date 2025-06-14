
import { SavedContent } from '@/types';

export const getSearchableText = (item: SavedContent, caseSensitive: boolean): string => {
  const text = `${item.title || ''} ${item.description || ''} ${item.tags.map(tag => tag.name).join(' ')} ${item.url || ''}`;
  return caseSensitive ? text : text.toLowerCase();
};

export const fuzzyMatch = (text: string, term: string): boolean => {
  // Simple fuzzy matching - can be enhanced with more sophisticated algorithms
  const words = term.split(' ').filter(word => word.length > 0);
  return words.every(word => text.includes(word));
};

export const generateSuggestions = (query: string, content: SavedContent[], noResults: boolean): string[] => {
  if (!noResults || !query.trim()) return [];

  const suggestions: string[] = [];
  const words = query.toLowerCase().split(' ');

  // Generate similar queries from existing content
  content.forEach(item => {
    item.tags.forEach(tag => {
      if (tag.name.toLowerCase().includes(words[0]) && !suggestions.includes(tag.name)) {
        suggestions.push(tag.name);
      }
    });
  });

  return suggestions.slice(0, 5);
};
