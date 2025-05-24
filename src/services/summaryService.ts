
import { supabase } from '@/integrations/supabase/client';

export interface ContentSummary {
  id: string;
  content_id: string;
  summary_text: string;
  summary_type: 'auto' | 'manual' | 'ai_enhanced';
  confidence_score?: number;
  word_count?: number;
  generated_at: string;
  updated_at: string;
}

export class SummaryService {
  // Generate AI summary for content
  static async generateSummary(
    contentId: string, 
    text: string, 
    summaryType: 'short' | 'medium' | 'long' = 'medium'
  ): Promise<ContentSummary> {
    const { data, error } = await supabase.functions.invoke('generate-summary', {
      body: {
        contentId,
        text,
        summaryType
      }
    });

    if (error) {
      console.error('Error generating summary:', error);
      throw new Error('Failed to generate summary');
    }

    return data;
  }

  // Get summary for content
  static async getSummary(contentId: string): Promise<ContentSummary | null> {
    const { data, error } = await supabase
      .from('content_summaries')
      .select('*')
      .eq('content_id', contentId)
      .order('generated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching summary:', error);
      throw error;
    }

    if (!data) return null;

    // Type cast the database result to our interface
    return {
      ...data,
      summary_type: data.summary_type as 'auto' | 'manual' | 'ai_enhanced'
    } as ContentSummary;
  }

  // Update summary
  static async updateSummary(
    summaryId: string, 
    updates: Partial<Pick<ContentSummary, 'summary_text' | 'summary_type'>>
  ): Promise<ContentSummary> {
    const { data, error } = await supabase
      .from('content_summaries')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', summaryId)
      .select()
      .single();

    if (error) {
      console.error('Error updating summary:', error);
      throw error;
    }

    // Type cast the database result to our interface
    return {
      ...data,
      summary_type: data.summary_type as 'auto' | 'manual' | 'ai_enhanced'
    } as ContentSummary;
  }

  // Delete summary
  static async deleteSummary(summaryId: string): Promise<void> {
    const { error } = await supabase
      .from('content_summaries')
      .delete()
      .eq('id', summaryId);

    if (error) {
      console.error('Error deleting summary:', error);
      throw error;
    }
  }

  // Check if content has summary
  static async hasSummary(contentId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('content_summaries')
      .select('id')
      .eq('content_id', contentId)
      .limit(1);

    if (error) {
      console.error('Error checking summary:', error);
      return false;
    }

    return data && data.length > 0;
  }
}
