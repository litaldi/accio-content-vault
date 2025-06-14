
import { SavedContent } from '@/types';

interface QueryIntent {
  type: 'search' | 'filter' | 'question' | 'command';
  confidence: number;
  entities: Array<{
    type: 'timeframe' | 'content_type' | 'tag' | 'keyword';
    value: string;
    confidence: number;
  }>;
}

interface SearchResult {
  content: SavedContent;
  relevanceScore: number;
  matchReason: string;
}

/**
 * Natural Language Processing service for understanding user queries
 */
export class NaturalLanguageService {
  private static instance: NaturalLanguageService;

  static getInstance(): NaturalLanguageService {
    if (!NaturalLanguageService.instance) {
      NaturalLanguageService.instance = new NaturalLanguageService();
    }
    return NaturalLanguageService.instance;
  }

  /**
   * Parse natural language query and extract intent and entities
   */
  parseQuery(query: string): QueryIntent {
    const lowerQuery = query.toLowerCase().trim();
    
    // Detect question patterns
    const questionWords = ['what', 'how', 'when', 'where', 'why', 'which', 'who'];
    const isQuestion = questionWords.some(word => lowerQuery.startsWith(word)) || lowerQuery.includes('?');
    
    // Detect command patterns
    const commandWords = ['show', 'find', 'get', 'search', 'list', 'display'];
    const isCommand = commandWords.some(word => lowerQuery.startsWith(word));
    
    // Extract entities
    const entities = this.extractEntities(lowerQuery);
    
    // Determine intent type
    let type: QueryIntent['type'] = 'search';
    let confidence = 0.7;
    
    if (isQuestion) {
      type = 'question';
      confidence = 0.8;
    } else if (isCommand) {
      type = 'command';
      confidence = 0.8;
    } else if (entities.some(e => e.type === 'timeframe')) {
      type = 'filter';
      confidence = 0.75;
    }
    
    return {
      type,
      confidence,
      entities
    };
  }

  /**
   * Generate suggested queries based on user content
   */
  generateSuggestedQueries(content: SavedContent[]): string[] {
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

  /**
   * Perform semantic search on content
   */
  semanticSearch(query: string, content: SavedContent[]): SearchResult[] {
    const analysis = this.parseQuery(query);
    const results: SearchResult[] = [];
    
    for (const item of content) {
      const score = this.calculateRelevanceScore(item, analysis);
      
      if (score.relevance > 0) {
        results.push({
          content: item,
          relevanceScore: score.relevance,
          matchReason: score.reason
        });
      }
    }
    
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  /**
   * Calculate relevance score for content item
   */
  private calculateRelevanceScore(item: SavedContent, analysis: QueryIntent) {
    let score = 0;
    const reasons: string[] = [];
    
    // Keyword matching with different weights
    analysis.entities.forEach((entity) => {
      if (entity.type === 'keyword') {
        const keywordRegex = new RegExp(entity.value, 'gi');
        
        if (keywordRegex.test(item.title)) {
          score += 40;
          reasons.push(`Title matches "${entity.value}"`);
        }
        
        if (keywordRegex.test(item.description)) {
          score += 25;
          reasons.push(`Description contains "${entity.value}"`);
        }
        
        if (item.tags.some(tag => keywordRegex.test(tag.name))) {
          score += 30;
          reasons.push(`Tagged with "${entity.value}"`);
        }
        
        if (item.url && keywordRegex.test(item.url)) {
          score += 10;
          reasons.push(`URL contains "${entity.value}"`);
        }
      }
    });
    
    // Intent-based scoring
    if (analysis.type === 'question') {
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
   * Extract entities from query text
   */
  private extractEntities(query: string): QueryIntent['entities'] {
    const entities: QueryIntent['entities'] = [];
    
    // Time-based entities
    const timePatterns = [
      { pattern: /\b(today|this\s+day)\b/, value: 'today' },
      { pattern: /\b(yesterday|last\s+day)\b/, value: 'yesterday' },
      { pattern: /\b(this\s+week|last\s+week|past\s+week)\b/, value: 'week' },
      { pattern: /\b(this\s+month|last\s+month|past\s+month)\b/, value: 'month' },
      { pattern: /\b(this\s+year|last\s+year|past\s+year)\b/, value: 'year' },
      { pattern: /\b(recent|recently|latest)\b/, value: 'recent' }
    ];
    
    timePatterns.forEach(({ pattern, value }) => {
      if (pattern.test(query)) {
        entities.push({
          type: 'timeframe',
          value,
          confidence: 0.9
        });
      }
    });
    
    // Content type entities
    const contentTypePatterns = [
      { pattern: /\b(article|articles|blog|post|posts)\b/, value: 'article' },
      { pattern: /\b(video|videos|youtube)\b/, value: 'video' },
      { pattern: /\b(document|documents|pdf|file|files)\b/, value: 'document' },
      { pattern: /\b(note|notes)\b/, value: 'note' },
      { pattern: /\b(image|images|photo|photos|picture|pictures)\b/, value: 'image' }
    ];
    
    contentTypePatterns.forEach(({ pattern, value }) => {
      if (pattern.test(query)) {
        entities.push({
          type: 'content_type',
          value,
          confidence: 0.85
        });
      }
    });
    
    // Extract potential keywords (words longer than 3 chars, excluding common words)
    const stopWords = new Set([
      'what', 'how', 'when', 'where', 'why', 'which', 'who', 'the', 'and', 'for',
      'with', 'from', 'about', 'show', 'find', 'get', 'search', 'list', 'display'
    ]);
    
    const words = query.split(/\s+/).filter(word => 
      word.length > 3 && 
      !stopWords.has(word) &&
      !/^\d+$/.test(word) // Exclude pure numbers
    );
    
    words.forEach(word => {
      entities.push({
        type: 'keyword',
        value: word,
        confidence: 0.6
      });
    });
    
    return entities;
  }

  /**
   * Generate contextual suggestions based on query
   */
  generateSuggestions(partialQuery: string, userContent: SavedContent[]): string[] {
    const suggestions: string[] = [];
    const query = partialQuery.toLowerCase();
    
    // Time-based suggestions
    if (query.includes('today') || query.includes('recent')) {
      suggestions.push('What did I save today?', 'Recent articles', 'Today\'s notes');
    }
    
    // Content type suggestions
    if (query.includes('video')) {
      suggestions.push('Show me all videos', 'Recent video tutorials', 'YouTube content');
    }
    
    if (query.includes('article')) {
      suggestions.push('Find articles about', 'Recent article posts', 'Blog articles');
    }
    
    // Tag-based suggestions from user content
    const commonTags = this.getCommonTags(userContent);
    commonTags.slice(0, 3).forEach(tag => {
      if (tag.toLowerCase().includes(query) || query.includes(tag.toLowerCase())) {
        suggestions.push(`Show me ${tag} content`, `Recent ${tag} items`);
      }
    });
    
    return suggestions.slice(0, 5);
  }

  /**
   * Get most common tags from user content
   */
  private getCommonTags(content: SavedContent[]): string[] {
    const tagCounts: { [key: string]: number } = {};
    
    content.forEach(item => {
      item.tags.forEach(tag => {
        tagCounts[tag.name] = (tagCounts[tag.name] || 0) + 1;
      });
    });
    
    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([tag]) => tag)
      .slice(0, 10);
  }
}

export const naturalLanguageService = NaturalLanguageService.getInstance();
