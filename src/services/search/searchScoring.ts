
import { SavedContent } from '@/types';

export const calculateRelevanceScore = (
  item: SavedContent, 
  searchTerm: string, 
  caseSensitive: boolean
): number => {
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
};

export const sortByRelevance = (
  results: SavedContent[], 
  query: string, 
  caseSensitive: boolean
): SavedContent[] => {
  const searchTerm = caseSensitive ? query : query.toLowerCase();
  
  return results.sort((a, b) => {
    const scoreA = calculateRelevanceScore(a, searchTerm, caseSensitive);
    const scoreB = calculateRelevanceScore(b, searchTerm, caseSensitive);
    return scoreB - scoreA;
  });
};
