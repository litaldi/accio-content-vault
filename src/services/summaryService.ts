
import { SavedContent } from '@/types';

export interface ContentSummary {
  id: string;
  content_id: string;
  summary_text: string;
  summary_type: 'auto' | 'manual';
  confidence_score?: number;
  word_count?: number;
  generated_at: string;
  updated_at: string;
}

/**
 * Service for generating AI-powered content summaries
 */
export class SummaryService {
  private static instance: SummaryService;

  static getInstance(): SummaryService {
    if (!SummaryService.instance) {
      SummaryService.instance = new SummaryService();
    }
    return SummaryService.instance;
  }

  /**
   * Generate summary for content using AI
   */
  async generateSummary(
    contentId: string, 
    text: string, 
    length: 'short' | 'medium' | 'long' = 'medium'
  ): Promise<ContentSummary> {
    try {
      // In a real implementation, this would call OpenAI API
      // For now, we'll simulate the response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const summaryText = this.generateMockSummary(text, length);
      
      return {
        id: `summary_${Date.now()}`,
        content_id: contentId,
        summary_text: summaryText,
        summary_type: 'auto',
        confidence_score: 0.85,
        word_count: summaryText.split(/\s+/).length,
        generated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error generating summary:', error);
      throw error;
    }
  }

  private generateMockSummary(text: string, length: 'short' | 'medium' | 'long'): string {
    const words = text.split(/\s+/);
    let summaryLength: number;
    
    switch (length) {
      case 'short':
        summaryLength = Math.min(words.length, 20);
        break;
      case 'medium':
        summaryLength = Math.min(words.length, 50);
        break;
      case 'long':
        summaryLength = Math.min(words.length, 100);
        break;
    }
    
    // Simple extractive summarization (take first sentences)
    const summary = words.slice(0, summaryLength).join(' ');
    return summary + (words.length > summaryLength ? '...' : '');
  }

  /**
   * Get existing summary for content
   */
  async getSummary(contentId: string): Promise<ContentSummary | null> {
    try {
      // In a real implementation, this would fetch from database
      const stored = localStorage.getItem(`summary_${contentId}`);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error fetching summary:', error);
      return null;
    }
  }

  /**
   * Save summary to storage
   */
  async saveSummary(summary: ContentSummary): Promise<void> {
    try {
      localStorage.setItem(`summary_${summary.content_id}`, JSON.stringify(summary));
    } catch (error) {
      console.error('Error saving summary:', error);
    }
  }
}

export const summaryService = SummaryService.getInstance();
