
import { SavedContent } from '@/types';
import { QueryAnalyzer } from './queryAnalyzer';
import { SearchFilters } from './searchFilters';

interface SearchResult {
  content: SavedContent;
  relevanceScore: number;
  matchReason: string;
  highlightedTitle: string;
  highlightedDescription: string;
}

/**
 * Enhanced search service with AI-powered semantic understanding
 */
export class EnhancedSearchService {
  private static instance: EnhancedSearchService;

  static getInstance(): EnhancedSearchService {
    if (!EnhancedSearchService.instance) {
      EnhancedSearchService.instance = new EnhancedSearchService();
    }
    return EnhancedSearchService.instance;
  }

  /**
   * Perform enhanced semantic search with natural language understanding
   */
  async performSearch(query: string, content: SavedContent[]): Promise<SearchResult[]> {
    const analysis = QueryAnalyzer.analyzeQuery(query);
    const results: SearchResult[] = [];
    
    // Apply filters first
    let filteredContent = content;
    
    if (analysis.timeframe) {
      filteredContent = SearchFilters.applyTimeframeFilter(filteredContent, analysis.timeframe);
    }
    
    if (analysis.contentType) {
      filteredContent = SearchFilters.filterByContentType(filteredContent, analysis.contentType);
    }
    
    // Score remaining content
    for (const item of filteredContent) {
      const score = this.calculateRelevanceScore(item, analysis);
      
      if (score.relevance > 0) {
        results.push({
          content: item,
          relevanceScore: score.relevance,
          matchReason: score.reason,
          highlightedTitle: SearchFilters.highlightMatches(item.title, analysis.keywords),
          highlightedDescription: SearchFilters.highlightMatches(item.description, analysis.keywords)
        });
      }
    }
    
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  private calculateRelevanceScore(item: SavedContent, analysis: any) {
    let score = 0;
    const reasons: string[] = [];
    
    // Keyword matching with different weights
    analysis.keywords.forEach((keyword: string) => {
      const keywordRegex = new RegExp(keyword, 'gi');
      
      if (keywordRegex.test(item.title)) {
        score += 40;
        reasons.push(`Title matches "${keyword}"`);
      }
      
      if (keywordRegex.test(item.description)) {
        score += 25;
        reasons.push(`Description contains "${keyword}"`);
      }
      
      if (item.tags.some(tag => keywordRegex.test(tag.name))) {
        score += 30;
        reasons.push(`Tagged with "${keyword}"`);
      }
      
      if (item.url && keywordRegex.test(item.url)) {
        score += 10;
        reasons.push(`URL contains "${keyword}"`);
      }
    });
    
    // Intent-based scoring
    if (analysis.intent === 'question') {
      if (item.description.length > 100) {
        score += 10;
        reasons.push('Detailed content for question');
      }
    }
    
    // Boost score based on analysis confidence
    score *= analysis.confidence;
    
    return {
      relevance: Math.min(100, score),
      reason: reasons.length > 0 ? reasons.join(', ') : 'General content match'
    };
  }

  /**
   * Generate smart query suggestions based on user's content
   */
  generateSmartSuggestions(content: SavedContent[]): string[] {
    const suggestions: string[] = [];
    
    // Analyze user's content to generate relevant suggestions
    const tagFrequency: { [key: string]: number } = {};
    const recentContent = content
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 20);
    
    // Count tag frequency
    content.forEach(item => {
      item.tags.forEach(tag => {
        tagFrequency[tag.name] = (tagFrequency[tag.name] || 0) + 1;
      });
    });
    
    // Get top tags
    const topTags = Object.entries(tagFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([tag]) => tag);
    
    // Generate suggestions based on common patterns
    const baseSuggestions = [
      'What did I save about productivity this week?',
      'Show me recent learning materials',
      'Find articles from last month',
      'What programming resources do I have?'
    ];
    
    // Add tag-based suggestions
    topTags.forEach(tag => {
      suggestions.push(`What do I have about ${tag}?`);
      suggestions.push(`Show me recent ${tag} content`);
    });
    
    // Add time-based suggestions for recent content
    if (recentContent.length > 0) {
      suggestions.push('What did I save today?');
      suggestions.push('Show me this week\'s content');
    }
    
    return [...baseSuggestions, ...suggestions].slice(0, 8);
  }
}

export const enhancedSearchService = EnhancedSearchService.getInstance();
