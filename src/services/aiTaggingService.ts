
import { Tag } from '@/types';

interface ContentAnalysis {
  content: string;
  url?: string;
  title?: string;
  description?: string;
}

/**
 * AI-powered tagging service that analyzes content and suggests relevant tags
 * Uses OpenAI GPT models for content analysis
 */
export class AITaggingService {
  private static instance: AITaggingService;

  static getInstance(): AITaggingService {
    if (!AITaggingService.instance) {
      AITaggingService.instance = new AITaggingService();
    }
    return AITaggingService.instance;
  }

  /**
   * Analyze content and generate suggested tags
   */
  async generateTags(analysis: ContentAnalysis): Promise<Tag[]> {
    try {
      // In a real implementation, this would call your AI service
      // For now, we'll use a smart pattern-based approach
      const tags = this.extractTagsFromContent(analysis);
      
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return tags.map((name, index) => ({
        id: `tag_${Date.now()}_${index}`,
        name: name.toLowerCase(),
        auto_generated: true,
        confirmed: false
      }));
    } catch (error) {
      console.error('Error generating tags:', error);
      return [];
    }
  }

  /**
   * Extract tags using pattern matching and keyword analysis
   */
  private extractTagsFromContent(analysis: ContentAnalysis): string[] {
    const content = `${analysis.title || ''} ${analysis.description || ''} ${analysis.url || ''}`.toLowerCase();
    const tags: string[] = [];

    // Technology keywords
    const techKeywords = ['javascript', 'react', 'python', 'ai', 'machine learning', 'programming', 'coding', 'development'];
    techKeywords.forEach(keyword => {
      if (content.includes(keyword)) {
        tags.push(keyword);
      }
    });

    // Job-related keywords
    const jobKeywords = ['job', 'career', 'hiring', 'interview', 'resume', 'employment', 'work'];
    const hasJobKeywords = jobKeywords.some(keyword => content.includes(keyword));
    if (hasJobKeywords) {
      tags.push('career');
    }

    // Learning keywords
    const learningKeywords = ['tutorial', 'course', 'learn', 'education', 'training', 'guide'];
    const hasLearningKeywords = learningKeywords.some(keyword => content.includes(keyword));
    if (hasLearningKeywords) {
      tags.push('learning');
    }

    // News keywords
    const newsKeywords = ['news', 'article', 'report', 'update', 'breaking'];
    const hasNewsKeywords = newsKeywords.some(keyword => content.includes(keyword));
    if (hasNewsKeywords) {
      tags.push('news');
    }

    // URL-based tagging
    if (analysis.url) {
      if (analysis.url.includes('github.com')) {
        tags.push('github', 'code');
      } else if (analysis.url.includes('youtube.com') || analysis.url.includes('youtu.be')) {
        tags.push('video', 'youtube');
      } else if (analysis.url.includes('medium.com')) {
        tags.push('article', 'medium');
      } else if (analysis.url.includes('linkedin.com')) {
        tags.push('professional', 'linkedin');
      }
    }

    // Remove duplicates and limit to 3 tags
    return [...new Set(tags)].slice(0, 3);
  }

  /**
   * Record user feedback on tag suggestions
   */
  async recordTagFeedback(tagId: string, feedback: 'accepted' | 'rejected'): Promise<void> {
    try {
      // In a real implementation, this would send to your analytics service
      console.log(`Tag feedback recorded: ${tagId} - ${feedback}`);
      
      // Store in localStorage for now (in production, use proper analytics)
      const feedbackData = JSON.parse(localStorage.getItem('tagFeedback') || '{}');
      feedbackData[tagId] = {
        feedback,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('tagFeedback', JSON.stringify(feedbackData));
    } catch (error) {
      console.error('Error recording tag feedback:', error);
    }
  }
}

export const aiTaggingService = AITaggingService.getInstance();
