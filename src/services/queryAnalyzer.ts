
interface QueryAnalysis {
  intent: 'search' | 'question' | 'filter' | 'temporal' | 'categorical';
  keywords: string[];
  timeframe?: string;
  contentType?: string;
  sentiment?: string;
  confidence: number;
}

/**
 * Service for analyzing search queries and extracting intent
 */
export class QueryAnalyzer {
  private static stopWords = new Set([
    'what', 'how', 'when', 'where', 'why', 'which', 'who', 'the', 'a', 'an', 
    'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'show', 'me', 'find', 'search', 'get', 'give', 'tell', 'about', 'did', 'i',
    'my', 'have', 'do', 'does', 'can', 'could', 'would', 'should', 'all'
  ]);

  private static timePatterns = {
    'today': /\b(today|this\s+day)\b/,
    'yesterday': /\b(yesterday|last\s+day)\b/,
    'week': /\b(this\s+week|last\s+week|past\s+week)\b/,
    'month': /\b(this\s+month|last\s+month|past\s+month)\b/,
    'year': /\b(this\s+year|last\s+year|past\s+year)\b/,
    'recent': /\b(recent|recently|latest|new)\b/
  };

  private static contentTypePatterns = {
    'article': /\b(article|blog|post|news)\b/,
    'video': /\b(video|watch|youtube|tutorial)\b/,
    'document': /\b(document|pdf|file|doc)\b/,
    'image': /\b(image|photo|picture|screenshot)\b/,
    'note': /\b(note|notes|annotation)\b/
  };

  static analyzeQuery(query: string): QueryAnalysis {
    const lowerQuery = query.toLowerCase().trim();
    
    // Detect question patterns
    const questionWords = ['what', 'how', 'when', 'where', 'why', 'which', 'who'];
    const isQuestion = questionWords.some(word => lowerQuery.startsWith(word)) || lowerQuery.includes('?');
    
    // Detect temporal patterns
    let timeframe: string | undefined;
    for (const [period, pattern] of Object.entries(this.timePatterns)) {
      if (pattern.test(lowerQuery)) {
        timeframe = period;
        break;
      }
    }
    
    // Detect content type patterns
    let contentType: string | undefined;
    for (const [type, pattern] of Object.entries(this.contentTypePatterns)) {
      if (pattern.test(lowerQuery)) {
        contentType = type;
        break;
      }
    }
    
    // Extract keywords
    const keywords = lowerQuery
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !this.stopWords.has(word))
      .slice(0, 10);
    
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
    
    // Calculate confidence
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

  private static detectSentiment(text: string): string {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'helpful', 'useful', 'love', 'like', 'best'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'useless', 'boring', 'worst'];
    
    const words = text.toLowerCase().split(/\s+/);
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }
}
