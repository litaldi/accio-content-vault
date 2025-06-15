
import { SavedContent } from '@/types';

export function sortByRelevance(
  content: SavedContent[], 
  query: string, 
  caseSensitive: boolean = false
): SavedContent[] {
  const searchTerm = caseSensitive ? query : query.toLowerCase();
  
  return content.sort((a, b) => {
    const scoreA = calculateRelevanceScore(a, searchTerm, caseSensitive);
    const scoreB = calculateRelevanceScore(b, searchTerm, caseSensitive);
    return scoreB - scoreA;
  });
}

function calculateRelevanceScore(
  item: SavedContent, 
  searchTerm: string, 
  caseSensitive: boolean
): number {
  let score = 0;
  
  const title = caseSensitive ? item.title : item.title.toLowerCase();
  const description = caseSensitive ? item.description : item.description.toLowerCase();
  
  // Title matches get highest score
  if (title.includes(searchTerm)) {
    score += title === searchTerm ? 100 : 50;
  }
  
  // Description matches
  if (description.includes(searchTerm)) {
    score += 25;
  }
  
  // Tag matches
  item.tags.forEach(tag => {
    const tagName = caseSensitive ? tag.name : tag.name.toLowerCase();
    if (tagName.includes(searchTerm)) {
      score += tagName === searchTerm ? 40 : 20;
    }
  });
  
  // URL matches (lower priority)
  if (item.url) {
    const url = caseSensitive ? item.url : item.url.toLowerCase();
    if (url.includes(searchTerm)) {
      score += 10;
    }
  }
  
  // Boost recent content slightly
  const daysSinceCreated = (Date.now() - new Date(item.created_at).getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceCreated < 7) {
    score += 5;
  }
  
  return score;
}
