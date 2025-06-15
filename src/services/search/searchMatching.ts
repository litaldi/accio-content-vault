
import { SavedContent } from '@/types';

export function getSearchableText(item: SavedContent, caseSensitive: boolean = false): string {
  const text = `${item.title} ${item.description} ${item.tags.map(tag => tag.name).join(' ')} ${item.url || ''}`;
  return caseSensitive ? text : text.toLowerCase();
}

export function fuzzyMatch(text: string, searchTerm: string): boolean {
  // Simple fuzzy matching - allows for small typos
  if (text.includes(searchTerm)) return true;
  
  // Check individual words
  const searchWords = searchTerm.split(' ');
  const textWords = text.split(' ');
  
  return searchWords.every(searchWord => 
    textWords.some(textWord => 
      textWord.includes(searchWord) || 
      searchWord.includes(textWord) ||
      levenshteinDistance(searchWord, textWord) <= 2
    )
  );
}

export function generateSuggestions(
  query: string, 
  content: SavedContent[], 
  noResults: boolean
): string[] {
  const suggestions: string[] = [];
  
  if (noResults && query.length > 0) {
    // Suggest similar terms
    const allWords = content.flatMap(item => 
      `${item.title} ${item.description}`.toLowerCase().split(/\s+/)
    );
    
    const uniqueWords = [...new Set(allWords)].filter(word => 
      word.length > 3 && word.includes(query.toLowerCase().slice(0, 3))
    );
    
    suggestions.push(...uniqueWords.slice(0, 3).map(word => `Try "${word}"`));
  }
  
  // Popular searches
  if (suggestions.length < 3) {
    suggestions.push(
      'React tutorials',
      'AI articles',
      'productivity tips',
      'design resources'
    );
  }
  
  return suggestions.slice(0, 5);
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}
