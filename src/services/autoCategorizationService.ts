
import { SavedContent, Tag } from '@/types';

interface CategorizationSuggestion {
  category: string;
  confidence: number;
  reason: string;
  suggestedTags: string[];
}

/**
 * Service for automatically categorizing content and suggesting tags
 */
export class AutoCategorizationService {
  private static instance: AutoCategorizationService;

  static getInstance(): AutoCategorizationService {
    if (!AutoCategorizationService.instance) {
      AutoCategorizationService.instance = new AutoCategorizationService();
    }
    return AutoCategorizationService.instance;
  }

  /**
   * Analyze content and suggest categorization
   */
  categorizeContent(content: SavedContent): CategorizationSuggestion[] {
    const suggestions: CategorizationSuggestion[] = [];
    const text = `${content.title} ${content.description} ${content.url || ''}`.toLowerCase();
    
    // Technology category
    const techKeywords = ['programming', 'code', 'development', 'api', 'framework', 'library', 'javascript', 'python', 'react', 'github'];
    const techMatches = techKeywords.filter(keyword => text.includes(keyword));
    if (techMatches.length > 0) {
      suggestions.push({
        category: 'Technology',
        confidence: Math.min(techMatches.length * 20, 90),
        reason: `Contains tech keywords: ${techMatches.join(', ')}`,
        suggestedTags: ['development', 'programming', ...techMatches.slice(0, 2)]
      });
    }

    // Learning category
    const learningKeywords = ['tutorial', 'course', 'learn', 'education', 'guide', 'how-to', 'training'];
    const learningMatches = learningKeywords.filter(keyword => text.includes(keyword));
    if (learningMatches.length > 0) {
      suggestions.push({
        category: 'Learning',
        confidence: Math.min(learningMatches.length * 25, 95),
        reason: `Educational content detected: ${learningMatches.join(', ')}`,
        suggestedTags: ['learning', 'education', ...learningMatches.slice(0, 2)]
      });
    }

    // Business category
    const businessKeywords = ['business', 'startup', 'marketing', 'strategy', 'finance', 'career', 'job', 'work'];
    const businessMatches = businessKeywords.filter(keyword => text.includes(keyword));
    if (businessMatches.length > 0) {
      suggestions.push({
        category: 'Business',
        confidence: Math.min(businessMatches.length * 22, 88),
        reason: `Business-related content: ${businessMatches.join(', ')}`,
        suggestedTags: ['business', 'career', ...businessMatches.slice(0, 2)]
      });
    }

    // News category
    const newsKeywords = ['news', 'breaking', 'report', 'update', 'announcement', 'press release'];
    const newsMatches = newsKeywords.filter(keyword => text.includes(keyword));
    if (newsMatches.length > 0) {
      suggestions.push({
        category: 'News',
        confidence: Math.min(newsMatches.length * 30, 85),
        reason: `News content detected: ${newsMatches.join(', ')}`,
        suggestedTags: ['news', 'current-events', ...newsMatches.slice(0, 1)]
      });
    }

    // Personal category
    const personalKeywords = ['personal', 'note', 'thought', 'idea', 'reflection', 'journal'];
    const personalMatches = personalKeywords.filter(keyword => text.includes(keyword));
    if (personalMatches.length > 0) {
      suggestions.push({
        category: 'Personal',
        confidence: Math.min(personalMatches.length * 35, 90),
        reason: `Personal content detected: ${personalMatches.join(', ')}`,
        suggestedTags: ['personal', 'notes', ...personalMatches.slice(0, 1)]
      });
    }

    // URL-based categorization
    if (content.url) {
      const urlSuggestions = this.categorizeByUrl(content.url);
      suggestions.push(...urlSuggestions);
    }

    // Sort by confidence and return top suggestions
    return suggestions
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3);
  }

  private categorizeByUrl(url: string): CategorizationSuggestion[] {
    const suggestions: CategorizationSuggestion[] = [];
    const domain = url.toLowerCase();

    if (domain.includes('github.com')) {
      suggestions.push({
        category: 'Code Repository',
        confidence: 95,
        reason: 'GitHub repository',
        suggestedTags: ['github', 'code', 'repository']
      });
    } else if (domain.includes('youtube.com') || domain.includes('youtu.be')) {
      suggestions.push({
        category: 'Video Content',
        confidence: 90,
        reason: 'YouTube video',
        suggestedTags: ['video', 'youtube', 'media']
      });
    } else if (domain.includes('medium.com')) {
      suggestions.push({
        category: 'Article',
        confidence: 85,
        reason: 'Medium article',
        suggestedTags: ['article', 'medium', 'blog']
      });
    } else if (domain.includes('linkedin.com')) {
      suggestions.push({
        category: 'Professional',
        confidence: 80,
        reason: 'LinkedIn content',
        suggestedTags: ['professional', 'linkedin', 'career']
      });
    } else if (domain.includes('stackoverflow.com')) {
      suggestions.push({
        category: 'Q&A',
        confidence: 88,
        reason: 'Stack Overflow question/answer',
        suggestedTags: ['stackoverflow', 'programming', 'qa']
      });
    }

    return suggestions;
  }

  /**
   * Generate collection suggestions based on existing content
   */
  suggestCollections(allContent: SavedContent[]): { name: string; criteria: string; count: number }[] {
    const collections = [];
    
    // Technology collection
    const techContent = allContent.filter(content => 
      this.categorizeContent(content).some(cat => cat.category === 'Technology')
    );
    if (techContent.length >= 3) {
      collections.push({
        name: 'Tech & Programming',
        criteria: 'Technology-related content',
        count: techContent.length
      });
    }

    // Learning collection
    const learningContent = allContent.filter(content =>
      this.categorizeContent(content).some(cat => cat.category === 'Learning')
    );
    if (learningContent.length >= 3) {
      collections.push({
        name: 'Learning Resources',
        criteria: 'Educational and tutorial content',
        count: learningContent.length
      });
    }

    // Recent collection
    const recentContent = allContent.filter(content => {
      const daysSinceCreated = (Date.now() - new Date(content.created_at).getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceCreated <= 7;
    });
    if (recentContent.length >= 5) {
      collections.push({
        name: 'This Week',
        criteria: 'Content saved in the last 7 days',
        count: recentContent.length
      });
    }

    return collections;
  }

  /**
   * Suggest content cleanup actions
   */
  suggestCleanupActions(allContent: SavedContent[]): {
    action: string;
    content: SavedContent[];
    reason: string;
  }[] {
    const actions = [];

    // Old untagged content
    const oldUntagged = allContent.filter(content => {
      const monthsOld = (Date.now() - new Date(content.created_at).getTime()) / (1000 * 60 * 60 * 24 * 30);
      return monthsOld > 3 && content.tags.length === 0;
    });

    if (oldUntagged.length > 0) {
      actions.push({
        action: 'Archive or Tag',
        content: oldUntagged,
        reason: 'Old content without tags - consider archiving or adding tags'
      });
    }

    // Duplicate titles
    const titleGroups: { [key: string]: SavedContent[] } = {};
    allContent.forEach(content => {
      const normalizedTitle = content.title.toLowerCase().trim();
      if (!titleGroups[normalizedTitle]) {
        titleGroups[normalizedTitle] = [];
      }
      titleGroups[normalizedTitle].push(content);
    });

    const duplicates = Object.values(titleGroups).filter(group => group.length > 1);
    if (duplicates.length > 0) {
      actions.push({
        action: 'Merge Duplicates',
        content: duplicates.flat(),
        reason: 'Multiple items with similar titles detected'
      });
    }

    return actions;
  }
}

export const autoCategorizationService = AutoCategorizationService.getInstance();
