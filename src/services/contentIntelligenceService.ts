
import { SavedContent } from '@/types';
import { enhancedSearchService } from './enhancedSearchService';

interface ContentLink {
  sourceId: string;
  targetId: string;
  relevanceScore: number;
  linkReason: string;
  linkType: 'semantic' | 'temporal' | 'tag-based' | 'url-domain';
}

interface DuplicateCluster {
  id: string;
  items: SavedContent[];
  similarityScore: number;
  clusterReason: string;
  primaryItem: SavedContent;
}

interface ContentAnalysis {
  content: SavedContent;
  relatedContent: ContentLink[];
  duplicateClusters: DuplicateCluster[];
  summaryQuality: 'high' | 'medium' | 'low';
  readingTime: string;
  complexity: 'simple' | 'moderate' | 'complex';
}

export class ContentIntelligenceService {
  private static instance: ContentIntelligenceService;

  static getInstance(): ContentIntelligenceService {
    if (!ContentIntelligenceService.instance) {
      ContentIntelligenceService.instance = new ContentIntelligenceService();
    }
    return ContentIntelligenceService.instance;
  }

  /**
   * Analyze content for relationships, duplicates, and quality metrics
   */
  async analyzeContent(content: SavedContent, allContent: SavedContent[]): Promise<ContentAnalysis> {
    const relatedContent = this.findRelatedContent(content, allContent);
    const duplicateClusters = this.findDuplicateClusters(content, allContent);
    
    return {
      content,
      relatedContent,
      duplicateClusters,
      summaryQuality: this.assessSummaryQuality(content),
      readingTime: this.estimateReadingTime(content),
      complexity: this.assessComplexity(content)
    };
  }

  /**
   * Find content that's related to the given content item
   */
  findRelatedContent(content: SavedContent, allContent: SavedContent[]): ContentLink[] {
    const links: ContentLink[] = [];
    const otherContent = allContent.filter(item => item.id !== content.id);

    for (const item of otherContent) {
      // Tag-based similarity
      const tagSimilarity = this.calculateTagSimilarity(content, item);
      if (tagSimilarity > 0.3) {
        links.push({
          sourceId: content.id,
          targetId: item.id,
          relevanceScore: tagSimilarity,
          linkReason: `Shares ${this.getCommonTags(content, item).length} similar tags`,
          linkType: 'tag-based'
        });
      }

      // Semantic similarity (title and description)
      const semanticSimilarity = this.calculateSemanticSimilarity(content, item);
      if (semanticSimilarity > 0.4) {
        links.push({
          sourceId: content.id,
          targetId: item.id,
          relevanceScore: semanticSimilarity,
          linkReason: 'Similar content and themes',
          linkType: 'semantic'
        });
      }

      // Temporal proximity
      const temporalSimilarity = this.calculateTemporalSimilarity(content, item);
      if (temporalSimilarity > 0.5) {
        links.push({
          sourceId: content.id,
          targetId: item.id,
          relevanceScore: temporalSimilarity,
          linkReason: 'Saved around the same time',
          linkType: 'temporal'
        });
      }

      // URL domain similarity
      if (content.url && item.url) {
        const urlSimilarity = this.calculateUrlSimilarity(content.url, item.url);
        if (urlSimilarity > 0.7) {
          links.push({
            sourceId: content.id,
            targetId: item.id,
            relevanceScore: urlSimilarity,
            linkReason: 'From the same website or domain',
            linkType: 'url-domain'
          });
        }
      }
    }

    // Sort by relevance and return top 10
    return links
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 10);
  }

  /**
   * Find duplicate or near-duplicate content
   */
  findDuplicateClusters(content: SavedContent, allContent: SavedContent[]): DuplicateCluster[] {
    const clusters: DuplicateCluster[] = [];
    const processedIds = new Set([content.id]);

    for (const item of allContent) {
      if (processedIds.has(item.id)) continue;

      const similarity = this.calculateOverallSimilarity(content, item);
      
      if (similarity > 0.8) { // High similarity threshold for duplicates
        const clusterItems = [content, item];
        
        // Find other similar items for this cluster
        for (const otherItem of allContent) {
          if (processedIds.has(otherItem.id) || otherItem.id === item.id) continue;
          
          const otherSimilarity = Math.max(
            this.calculateOverallSimilarity(content, otherItem),
            this.calculateOverallSimilarity(item, otherItem)
          );
          
          if (otherSimilarity > 0.8) {
            clusterItems.push(otherItem);
            processedIds.add(otherItem.id);
          }
        }

        if (clusterItems.length > 1) {
          // Determine primary item (most recent or most detailed)
          const primaryItem = clusterItems.reduce((prev, current) => {
            const prevScore = this.calculatePrimaryScore(prev);
            const currentScore = this.calculatePrimaryScore(current);
            return currentScore > prevScore ? current : prev;
          });

          clusters.push({
            id: `cluster_${Date.now()}_${Math.random()}`,
            items: clusterItems,
            similarityScore: similarity,
            clusterReason: this.generateClusterReason(content, item, similarity),
            primaryItem
          });

          clusterItems.forEach(clusterItem => processedIds.add(clusterItem.id));
        }
      }
    }

    return clusters;
  }

  /**
   * Generate enhanced summaries with different length options
   */
  async generateEnhancedSummary(
    content: SavedContent, 
    length: 'short' | 'medium' | 'long' | 'bullets' = 'medium',
    focus?: 'key-points' | 'actionable' | 'technical' | 'overview'
  ): Promise<{
    summary: string;
    keyPoints: string[];
    actionableItems: string[];
    confidence: number;
    wordCount: number;
  }> {
    const text = this.extractTextFromContent(content);
    
    // Simulate AI processing with enhanced logic
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let summary = '';
    let keyPoints: string[] = [];
    let actionableItems: string[] = [];
    
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const confidence = Math.min(0.95, 0.6 + (words.length / 1000) * 0.3);
    
    switch (length) {
      case 'short':
        summary = this.generateShortSummary(text, focus);
        keyPoints = this.extractKeyPoints(text, 3);
        break;
      case 'medium':
        summary = this.generateMediumSummary(text, focus);
        keyPoints = this.extractKeyPoints(text, 5);
        actionableItems = this.extractActionableItems(text, 3);
        break;
      case 'long':
        summary = this.generateLongSummary(text, focus);
        keyPoints = this.extractKeyPoints(text, 8);
        actionableItems = this.extractActionableItems(text, 5);
        break;
      case 'bullets':
        summary = this.generateBulletSummary(text, focus);
        keyPoints = this.extractKeyPoints(text, 6);
        actionableItems = this.extractActionableItems(text, 4);
        break;
    }
    
    return {
      summary,
      keyPoints,
      actionableItems,
      confidence,
      wordCount: summary.split(/\s+/).length
    };
  }

  private calculateTagSimilarity(content1: SavedContent, content2: SavedContent): number {
    const tags1 = new Set(content1.tags.map(tag => tag.name.toLowerCase()));
    const tags2 = new Set(content2.tags.map(tag => tag.name.toLowerCase()));
    
    const intersection = new Set([...tags1].filter(tag => tags2.has(tag)));
    const union = new Set([...tags1, ...tags2]);
    
    return union.size > 0 ? intersection.size / union.size : 0;
  }

  private calculateSemanticSimilarity(content1: SavedContent, content2: SavedContent): number {
    const text1 = (content1.title + ' ' + content1.description).toLowerCase();
    const text2 = (content2.title + ' ' + content2.description).toLowerCase();
    
    const words1 = new Set(text1.split(/\s+/).filter(w => w.length > 3));
    const words2 = new Set(text2.split(/\s+/).filter(w => w.length > 3));
    
    const intersection = new Set([...words1].filter(word => words2.has(word)));
    const union = new Set([...words1, ...words2]);
    
    return union.size > 0 ? intersection.size / union.size : 0;
  }

  private calculateTemporalSimilarity(content1: SavedContent, content2: SavedContent): number {
    const date1 = new Date(content1.created_at);
    const date2 = new Date(content2.created_at);
    const timeDiff = Math.abs(date1.getTime() - date2.getTime());
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    
    // Higher similarity for content saved closer in time
    if (daysDiff <= 1) return 0.9;
    if (daysDiff <= 7) return 0.7;
    if (daysDiff <= 30) return 0.5;
    return 0.1;
  }

  private calculateUrlSimilarity(url1: string, url2: string): number {
    try {
      const domain1 = new URL(url1).hostname;
      const domain2 = new URL(url2).hostname;
      
      if (domain1 === domain2) return 1.0;
      
      // Check for subdomain similarity
      const parts1 = domain1.split('.');
      const parts2 = domain2.split('.');
      const rootDomain1 = parts1.slice(-2).join('.');
      const rootDomain2 = parts2.slice(-2).join('.');
      
      return rootDomain1 === rootDomain2 ? 0.8 : 0;
    } catch {
      return 0;
    }
  }

  private calculateOverallSimilarity(content1: SavedContent, content2: SavedContent): number {
    const tagSim = this.calculateTagSimilarity(content1, content2);
    const semanticSim = this.calculateSemanticSimilarity(content1, content2);
    const urlSim = content1.url && content2.url ? this.calculateUrlSimilarity(content1.url, content2.url) : 0;
    
    // Exact title match gets high score
    if (content1.title.toLowerCase() === content2.title.toLowerCase()) {
      return 0.95;
    }
    
    // URL match gets high score
    if (content1.url && content2.url && content1.url === content2.url) {
      return 0.9;
    }
    
    // Weighted combination
    return (tagSim * 0.3) + (semanticSim * 0.5) + (urlSim * 0.2);
  }

  private calculatePrimaryScore(content: SavedContent): number {
    let score = 0;
    
    // Prefer more recent content
    const daysSinceCreated = (Date.now() - new Date(content.created_at).getTime()) / (1000 * 60 * 60 * 24);
    score += Math.max(0, 10 - daysSinceCreated / 10);
    
    // Prefer content with more description
    score += Math.min(10, content.description.length / 100);
    
    // Prefer content with more tags
    score += Math.min(5, content.tags.length);
    
    return score;
  }

  private generateClusterReason(content1: SavedContent, content2: SavedContent, similarity: number): string {
    if (content1.title.toLowerCase() === content2.title.toLowerCase()) {
      return 'Identical titles';
    }
    if (content1.url && content2.url && content1.url === content2.url) {
      return 'Same URL';
    }
    if (similarity > 0.9) {
      return 'Nearly identical content';
    }
    return 'Very similar content and tags';
  }

  private getCommonTags(content1: SavedContent, content2: SavedContent): string[] {
    const tags1 = content1.tags.map(tag => tag.name.toLowerCase());
    const tags2 = content2.tags.map(tag => tag.name.toLowerCase());
    return tags1.filter(tag => tags2.includes(tag));
  }

  private extractTextFromContent(content: SavedContent): string {
    return `${content.title} ${content.description}`.trim();
  }

  private assessSummaryQuality(content: SavedContent): 'high' | 'medium' | 'low' {
    const textLength = this.extractTextFromContent(content).length;
    if (textLength > 500) return 'high';
    if (textLength > 150) return 'medium';
    return 'low';
  }

  private estimateReadingTime(content: SavedContent): string {
    const words = this.extractTextFromContent(content).split(/\s+/).length;
    const minutes = Math.ceil(words / 200); // Average reading speed
    if (minutes < 1) return '< 1 minute';
    if (minutes === 1) return '1 minute';
    return `${minutes} minutes`;
  }

  private assessComplexity(content: SavedContent): 'simple' | 'moderate' | 'complex' {
    const text = this.extractTextFromContent(content);
    const avgWordLength = text.split(/\s+/).reduce((sum, word) => sum + word.length, 0) / text.split(/\s+/).length;
    const sentenceCount = text.split(/[.!?]+/).length;
    const avgSentenceLength = text.split(/\s+/).length / sentenceCount;
    
    const complexityScore = (avgWordLength - 4) + (avgSentenceLength - 15) / 5;
    
    if (complexityScore > 3) return 'complex';
    if (complexityScore > 0) return 'moderate';
    return 'simple';
  }

  private generateShortSummary(text: string, focus?: string): string {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    return sentences.slice(0, 1).join('. ').trim() + '.';
  }

  private generateMediumSummary(text: string, focus?: string): string {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    return sentences.slice(0, 3).join('. ').trim() + '.';
  }

  private generateLongSummary(text: string, focus?: string): string {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    return sentences.slice(0, 6).join('. ').trim() + '.';
  }

  private generateBulletSummary(text: string, focus?: string): string {
    const keyPoints = this.extractKeyPoints(text, 5);
    return keyPoints.map(point => `• ${point}`).join('\n');
  }

  private extractKeyPoints(text: string, count: number): string[] {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    return sentences.slice(0, count).map(s => s.trim());
  }

  private extractActionableItems(text: string, count: number): string[] {
    const actionWords = ['should', 'must', 'need to', 'important to', 'consider', 'implement', 'use', 'try'];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    
    const actionable = sentences.filter(sentence => 
      actionWords.some(word => sentence.toLowerCase().includes(word))
    );
    
    return actionable.slice(0, count).map(s => s.trim());
  }
}

export const contentIntelligenceService = ContentIntelligenceService.getInstance();
