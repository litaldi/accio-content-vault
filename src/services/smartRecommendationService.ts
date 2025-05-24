
import { SavedContent, Tag } from '@/types';

interface ContentRecommendation {
  content: SavedContent;
  score: number;
  reason: string;
}

/**
 * Service for generating smart content recommendations based on user behavior and content similarity
 */
export class SmartRecommendationService {
  private static instance: SmartRecommendationService;

  static getInstance(): SmartRecommendationService {
    if (!SmartRecommendationService.instance) {
      SmartRecommendationService.instance = new SmartRecommendationService();
    }
    return SmartRecommendationService.instance;
  }

  /**
   * Generate content recommendations based on current content and user patterns
   */
  generateRecommendations(
    currentContent: SavedContent,
    allContent: SavedContent[],
    userBehavior?: any
  ): ContentRecommendation[] {
    const recommendations: ContentRecommendation[] = [];
    
    // Tag-based recommendations
    const tagBasedRecommendations = this.getTagBasedRecommendations(currentContent, allContent);
    recommendations.push(...tagBasedRecommendations);
    
    // Time-based recommendations (recently saved)
    const timeBasedRecommendations = this.getTimeBasedRecommendations(allContent);
    recommendations.push(...timeBasedRecommendations);
    
    // Content type recommendations
    const typeBasedRecommendations = this.getTypeBasedRecommendations(currentContent, allContent);
    recommendations.push(...typeBasedRecommendations);
    
    // Remove duplicates and sort by score
    const uniqueRecommendations = this.removeDuplicates(recommendations);
    return uniqueRecommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }

  private getTagBasedRecommendations(
    currentContent: SavedContent,
    allContent: SavedContent[]
  ): ContentRecommendation[] {
    const currentTags = currentContent.tags.map(tag => tag.name.toLowerCase());
    
    return allContent
      .filter(content => content.id !== currentContent.id)
      .map(content => {
        const contentTags = content.tags.map(tag => tag.name.toLowerCase());
        const commonTags = currentTags.filter(tag => contentTags.includes(tag));
        
        if (commonTags.length > 0) {
          const score = (commonTags.length / Math.max(currentTags.length, contentTags.length)) * 100;
          return {
            content,
            score,
            reason: `Shares ${commonTags.length} tag${commonTags.length > 1 ? 's' : ''}: ${commonTags.join(', ')}`
          };
        }
        return null;
      })
      .filter(Boolean) as ContentRecommendation[];
  }

  private getTimeBasedRecommendations(allContent: SavedContent[]): ContentRecommendation[] {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return allContent
      .filter(content => new Date(content.created_at) > weekAgo)
      .map(content => ({
        content,
        score: 30,
        reason: 'Recently saved content'
      }));
  }

  private getTypeBasedRecommendations(
    currentContent: SavedContent,
    allContent: SavedContent[]
  ): ContentRecommendation[] {
    if (!currentContent.file_type) return [];
    
    return allContent
      .filter(content => 
        content.id !== currentContent.id && 
        content.file_type === currentContent.file_type
      )
      .map(content => ({
        content,
        score: 25,
        reason: `Similar content type: ${content.file_type}`
      }));
  }

  private removeDuplicates(recommendations: ContentRecommendation[]): ContentRecommendation[] {
    const seen = new Set<string>();
    return recommendations.filter(rec => {
      if (seen.has(rec.content.id)) {
        return false;
      }
      seen.add(rec.content.id);
      return true;
    });
  }

  /**
   * Get trending content based on recent access patterns
   */
  getTrendingContent(allContent: SavedContent[]): SavedContent[] {
    // Simple trending algorithm: recently created content with certain tags
    const trendingKeywords = ['ai', 'productivity', 'learning', 'development'];
    
    return allContent
      .filter(content => 
        content.tags.some(tag => 
          trendingKeywords.includes(tag.name.toLowerCase())
        )
      )
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 3);
  }
}

export const smartRecommendationService = SmartRecommendationService.getInstance();
