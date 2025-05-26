
import { SavedContent } from '@/types';
import { naturalLanguageService } from './naturalLanguageService';

interface SearchResult {
  content: SavedContent;
  relevanceScore: number;
  matchReason: string;
  highlightedTitle: string;
  highlightedDescription: string;
}

interface QueryAnalysis {
  intent: 'search' | 'question' | 'filter' | 'temporal' | 'categorical';
  keywords: string[];
  timeframe?: string;
  contentType?: string;
  sentiment?: string;
  confidence: number;
}

export class EnhancedSearchService {
  private static instance: EnhancedSearchService;

  static getInstance(): EnhancedSearchService {
    if (!EnhancedSearchService.instance) {
      EnhancedSearchService.instance = new EnhancedSearchService();
    }
    return EnhancedSearchService.instance;
  }

  /**
   * Analyze natural language query and extract structured search parameters
   */
  analyzeQuery(query: string): QueryAnalysis {
    const lowerQuery = query.toLowerCase().trim();
    
    // Detect question patterns
    const questionWords = ['what', 'how', 'when', 'where', 'why', 'which', 'who'];
    const isQuestion = questionWords.some(word => lowerQuery.startsWith(word)) || lowerQuery.includes('?');
    
    // Detect temporal patterns
    const timePatterns = {
      'today': /\b(today|this\s+day)\b/,
      'yesterday': /\b(yesterday|last\s+day)\b/,
      'week': /\b(this\s+week|last\s+week|past\s+week)\b/,
      'month': /\b(this\s+month|last\s+month|past\s+month)\b/,
      'year': /\b(this\s+year|last\s+year|past\s+year)\b/,
      'recent': /\b(recent|recently|latest|new)\b/
    };
    
    let timeframe: string | undefined;
    for (const [period, pattern] of Object.entries(timePatterns)) {
      if (pattern.test(lowerQuery)) {
        timeframe = period;
        break;
      }
    }
    
    // Detect content type patterns
    const contentTypePatterns = {
      'article': /\b(article|blog|post|news)\b/,
      'video': /\b(video|watch|youtube|tutorial)\b/,
      'document': /\b(document|pdf|file|doc)\b/,
      'image': /\b(image|photo|picture|screenshot)\b/,
      'note': /\b(note|notes|annotation)\b/
    };
    
    let contentType: string | undefined;
    for (const [type, pattern] of Object.entries(contentTypePatterns)) {
      if (pattern.test(lowerQuery)) {
        contentType = type;
        break;
      }
    }
    
    // Extract keywords (remove stop words and query structure words)
    const stopWords = new Set([
      'what', 'how', 'when', 'where', 'why', 'which', 'who', 'the', 'a', 'an', 
      'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'show', 'me', 'find', 'search', 'get', 'give', 'tell', 'about', 'did', 'i',
      'my', 'have', 'do', 'does', 'can', 'could', 'would', 'should', 'all'
    ]);
    
    const keywords = lowerQuery
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word))
      .slice(0, 10); // Limit to prevent over-filtering
    
    // Determine intent
    let intent: QueryAnalysis['intent'] = 'search';
    if (isQuestion) {
      intent = 'question';
    } else if (timeframe) {
      intent = 'temporal';
    } else if (contentType) {
      intent = 'categorical';
    } else if (lowerQuery.includes('filter') || lowerQuery.includes('show only')) {
      intent = 'filter';
    }
    
    // Calculate confidence based on how many patterns we detected
    const confidence = Math.min(1.0, 
      (keywords.length > 0 ? 0.3 : 0) +
      (timeframe ? 0.2 : 0) +
      (contentType ? 0.2 : 0) +
      (intent !== 'search' ? 0.3 : 0.1)
    );
    
    return {
      intent,
      keywords,
      timeframe,
      contentType,
      sentiment: this.detectSentiment(query),
      confidence
    };
  }

  /**
   * Perform enhanced semantic search with natural language understanding
   */
  async performSearch(query: string, content: SavedContent[]): Promise<SearchResult[]> {
    const analysis = this.analyzeQuery(query);
    const results: SearchResult[] = [];
    
    for (const item of content) {
      const score = this.calculateEnhancedScore(item, analysis, query);
      
      if (score.relevance > 0) {
        results.push({
          content: item,
          relevanceScore: score.relevance,
          matchReason: score.reason,
          highlightedTitle: this.highlightMatches(item.title, analysis.keywords),
          highlightedDescription: this.highlightMatches(item.description, analysis.keywords)
        });
      }
    }
    
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  private calculateEnhancedScore(item: SavedContent, analysis: QueryAnalysis, originalQuery: string) {
    let score = 0;
    const reasons: string[] = [];
    
    // Keyword matching with different weights
    analysis.keywords.forEach(keyword => {
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
    
    // Temporal filtering
    if (analysis.timeframe) {
      const itemDate = new Date(item.created_at);
      const now = new Date();
      let isInTimeframe = false;
      
      switch (analysis.timeframe) {
        case 'today':
          isInTimeframe = itemDate.toDateString() === now.toDateString();
          break;
        case 'yesterday':
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);
          isInTimeframe = itemDate.toDateString() === yesterday.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(now);
          weekAgo.setDate(weekAgo.getDate() - 7);
          isInTimeframe = itemDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(now);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          isInTimeframe = itemDate >= monthAgo;
          break;
        case 'recent':
          const recentThreshold = new Date(now);
          recentThreshold.setDate(recentThreshold.getDate() - 14);
          isInTimeframe = itemDate >= recentThreshold;
          break;
      }
      
      if (isInTimeframe) {
        score += 20;
        reasons.push(`From ${analysis.timeframe}`);
      } else if (analysis.intent === 'temporal') {
        // If it's a time-based query but doesn't match, heavily penalize
        score = Math.max(0, score - 30);
      }
    }
    
    // Content type matching
    if (analysis.contentType && item.file_type === analysis.contentType) {
      score += 15;
      reasons.push(`Matches content type: ${analysis.contentType}`);
    }
    
    // Intent-based scoring
    if (analysis.intent === 'question') {
      // For questions, prioritize content that might have answers
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

  private highlightMatches(text: string, keywords: string[]): string {
    if (!keywords.length) return text;
    
    let highlighted = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlighted = highlighted.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>');
    });
    
    return highlighted;
  }

  private detectSentiment(text: string): string {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'helpful', 'useful', 'love', 'like', 'best'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'useless', 'boring', 'worst'];
    
    const words = text.toLowerCase().split(/\s+/);
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
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
