
import { SavedContent } from '@/types';

/**
 * Highlights search terms in text with HTML marks
 */
export function highlightSearchTerms(text: string, terms: string[]): string {
  if (!terms.length) return text;
  
  let highlightedText = text;
  terms.forEach(term => {
    const regex = new RegExp(`(${term})`, 'gi');
    highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
  });
  
  return highlightedText;
}

/**
 * Normalizes search query by cleaning and splitting into terms
 */
export function normalizeSearchQuery(query: string): string[] {
  return query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(term => term.length > 0);
}

/**
 * Calculates relevance score for content based on search terms
 */
export function calculateRelevanceScore(content: SavedContent, searchTerms: string[]): number {
  let score = 0;
  
  searchTerms.forEach(term => {
    const lowerTerm = term.toLowerCase();
    
    // Title matches have higher weight
    if (content.title?.toLowerCase().includes(lowerTerm)) {
      score += 3;
    }
    
    // Description matches
    if (content.description?.toLowerCase().includes(lowerTerm)) {
      score += 2;
    }
    
    // Tag matches
    if (content.tags?.some(tag => tag.name.toLowerCase().includes(lowerTerm))) {
      score += 2;
    }
    
    // URL matches (lower weight)
    if (content.url?.toLowerCase().includes(lowerTerm)) {
      score += 1;
    }
  });
  
  return score;
}

/**
 * Filters content based on search query and returns sorted results
 */
export function searchContent(contents: SavedContent[], query: string): SavedContent[] {
  if (!query.trim()) return contents;
  
  const searchTerms = normalizeSearchQuery(query);
  
  return contents
    .map(content => ({
      content,
      score: calculateRelevanceScore(content, searchTerms)
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ content }) => content);
}
