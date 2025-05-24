
import { SavedContent } from '@/types';

interface NLSearchResult {
  content: SavedContent;
  relevanceScore: number;
  matchReason: string;
}

/**
 * Service for processing natural language queries and extracting semantic meaning
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
   * Process natural language query and convert to search parameters
   */
  processQuery(query: string): {
    keywords: string[];
    intent: string;
    timeFilter?: string;
    contentType?: string;
    sentiment?: string;
  } {
    const lowerQuery = query.toLowerCase();
    
    // Extract keywords (remove common words)
    const stopWords = ['what', 'how', 'when', 'where', 'why', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'show', 'me', 'find', 'search'];
    const keywords = lowerQuery
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.includes(word));

    // Detect intent
    let intent = 'search';
    if (lowerQuery.includes('recent') || lowerQuery.includes('latest') || lowerQuery.includes('new')) {
      intent = 'recent';
    } else if (lowerQuery.includes('old') || lowerQuery.includes('archive')) {
      intent = 'archive';
    } else if (lowerQuery.includes('learn') || lowerQuery.includes('study')) {
      intent = 'learning';
    }

    // Detect time filters
    let timeFilter;
    if (lowerQuery.includes('today')) timeFilter = 'today';
    else if (lowerQuery.includes('week')) timeFilter = 'week';
    else if (lowerQuery.includes('month')) timeFilter = 'month';

    // Detect content type
    let contentType;
    if (lowerQuery.includes('article') || lowerQuery.includes('blog')) contentType = 'article';
    else if (lowerQuery.includes('video')) contentType = 'video';
    else if (lowerQuery.includes('image') || lowerQuery.includes('photo')) contentType = 'image';
    else if (lowerQuery.includes('note')) contentType = 'note';

    return {
      keywords,
      intent,
      timeFilter,
      contentType,
      sentiment: this.detectSentiment(query)
    };
  }

  /**
   * Perform semantic search on content
   */
  semanticSearch(query: string, content: SavedContent[]): NLSearchResult[] {
    const processed = this.processQuery(query);
    const results: NLSearchResult[] = [];

    content.forEach(item => {
      let score = 0;
      const reasons: string[] = [];

      // Keyword matching in title (high weight)
      processed.keywords.forEach(keyword => {
        if (item.title.toLowerCase().includes(keyword)) {
          score += 30;
          reasons.push(`Title contains "${keyword}"`);
        }
        if (item.description.toLowerCase().includes(keyword)) {
          score += 20;
          reasons.push(`Description contains "${keyword}"`);
        }
        if (item.tags.some(tag => tag.name.toLowerCase().includes(keyword))) {
          score += 25;
          reasons.push(`Tagged with "${keyword}"`);
        }
      });

      // Time-based filtering
      if (processed.timeFilter) {
        const itemDate = new Date(item.created_at);
        const now = new Date();
        let timeMatch = false;

        switch (processed.timeFilter) {
          case 'today':
            timeMatch = itemDate.toDateString() === now.toDateString();
            break;
          case 'week':
            timeMatch = (now.getTime() - itemDate.getTime()) <= 7 * 24 * 60 * 60 * 1000;
            break;
          case 'month':
            timeMatch = (now.getTime() - itemDate.getTime()) <= 30 * 24 * 60 * 60 * 1000;
            break;
        }

        if (timeMatch) {
          score += 15;
          reasons.push(`Matches time filter: ${processed.timeFilter}`);
        }
      }

      // Content type matching
      if (processed.contentType && item.file_type === processed.contentType) {
        score += 10;
        reasons.push(`Matches content type: ${processed.contentType}`);
      }

      // Intent-based scoring
      if (processed.intent === 'learning' && 
          item.tags.some(tag => ['learning', 'tutorial', 'course', 'education'].includes(tag.name.toLowerCase()))) {
        score += 20;
        reasons.push('Learning-related content');
      }

      if (score > 0) {
        results.push({
          content: item,
          relevanceScore: Math.min(score, 100),
          matchReason: reasons.join(', ')
        });
      }
    });

    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  private detectSentiment(text: string): string {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'helpful', 'useful', 'love', 'like'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'useless', 'boring'];
    
    const words = text.toLowerCase().split(/\s+/);
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  /**
   * Generate suggested questions based on content
   */
  generateSuggestedQueries(content: SavedContent[]): string[] {
    const commonTags = this.getCommonTags(content);
    const suggestions = [
      'Show me recent learning materials',
      'What did I save about productivity?',
      'Find articles from this week',
      'Show me all programming resources'
    ];

    // Add tag-based suggestions
    commonTags.slice(0, 3).forEach(tag => {
      suggestions.push(`What do I have about ${tag}?`);
    });

    return suggestions;
  }

  private getCommonTags(content: SavedContent[]): string[] {
    const tagCount: { [key: string]: number } = {};
    
    content.forEach(item => {
      item.tags.forEach(tag => {
        tagCount[tag.name] = (tagCount[tag.name] || 0) + 1;
      });
    });

    return Object.entries(tagCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([tag]) => tag);
  }
}

export const naturalLanguageService = NaturalLanguageService.getInstance();
