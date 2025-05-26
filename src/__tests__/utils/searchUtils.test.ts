
import { highlightSearchTerms, normalizeSearchQuery, calculateRelevanceScore } from '@/utils/searchUtils';
import { SavedContent } from '@/types';

describe('searchUtils', () => {
  describe('highlightSearchTerms', () => {
    it('should highlight matching terms', () => {
      const text = 'This is a test document about React development';
      const terms = ['test', 'React'];
      
      const result = highlightSearchTerms(text, terms);
      
      expect(result).toContain('<mark>test</mark>');
      expect(result).toContain('<mark>React</mark>');
    });

    it('should handle case insensitive matching', () => {
      const text = 'JavaScript is awesome';
      const terms = ['javascript', 'AWESOME'];
      
      const result = highlightSearchTerms(text, terms);
      
      expect(result).toContain('<mark>JavaScript</mark>');
      expect(result).toContain('<mark>awesome</mark>');
    });

    it('should handle empty terms array', () => {
      const text = 'No highlighting needed';
      const terms: string[] = [];
      
      const result = highlightSearchTerms(text, terms);
      
      expect(result).toBe(text);
    });
  });

  describe('normalizeSearchQuery', () => {
    it('should normalize search query', () => {
      const query = '  React   Development  ';
      
      const result = normalizeSearchQuery(query);
      
      expect(result).toEqual(['react', 'development']);
    });

    it('should remove empty strings', () => {
      const query = 'React  Development   ';
      
      const result = normalizeSearchQuery(query);
      
      expect(result).toEqual(['react', 'development']);
      expect(result).not.toContain('');
    });

    it('should handle empty query', () => {
      const query = '   ';
      
      const result = normalizeSearchQuery(query);
      
      expect(result).toEqual([]);
    });
  });

  describe('calculateRelevanceScore', () => {
    const mockContent: SavedContent = {
      id: '1',
      user_id: 'user-1',
      title: 'React Development Best Practices',
      description: 'A comprehensive guide to React development and testing',
      url: 'https://example.com/react-guide',
      file_url: '',
      content_type: 'url',
      created_at: '2024-01-01T00:00:00Z',
      tags: [
        { id: 'tag-1', name: 'react', auto_generated: false, confirmed: true },
        { id: 'tag-2', name: 'development', auto_generated: false, confirmed: true }
      ]
    };

    it('should calculate higher score for title matches', () => {
      const searchTerms = ['react'];
      
      const score = calculateRelevanceScore(mockContent, searchTerms);
      
      expect(score).toBeGreaterThan(0);
    });

    it('should calculate score for description matches', () => {
      const searchTerms = ['comprehensive'];
      
      const score = calculateRelevanceScore(mockContent, searchTerms);
      
      expect(score).toBeGreaterThan(0);
    });

    it('should calculate score for tag matches', () => {
      const searchTerms = ['development'];
      
      const score = calculateRelevanceScore(mockContent, searchTerms);
      
      expect(score).toBeGreaterThan(0);
    });

    it('should return 0 for no matches', () => {
      const searchTerms = ['python'];
      
      const score = calculateRelevanceScore(mockContent, searchTerms);
      
      expect(score).toBe(0);
    });

    it('should handle multiple matching terms', () => {
      const searchTerms = ['react', 'development'];
      
      const score = calculateRelevanceScore(mockContent, searchTerms);
      
      expect(score).toBeGreaterThan(0);
    });
  });
});
