
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
