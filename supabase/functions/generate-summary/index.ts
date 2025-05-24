
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SummaryRequest {
  contentId: string;
  text: string;
  summaryType?: 'short' | 'medium' | 'long';
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { contentId, text, summaryType = 'medium' }: SummaryRequest = await req.json();

    if (!contentId || !text) {
      return new Response(
        JSON.stringify({ error: 'Content ID and text are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Generating ${summaryType} summary for content: ${contentId}`);

    // Define summary prompts based on type
    const prompts = {
      short: "Summarize this content in 1-2 sentences, focusing on the main point:",
      medium: "Provide a concise summary in 3-4 sentences that captures the key ideas and main takeaways:",
      long: "Create a comprehensive summary in 1-2 paragraphs that covers the main points, key arguments, and important details:"
    };

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful assistant that creates clear, accurate summaries of content. Keep summaries concise and focused on the most important information.' 
          },
          { 
            role: 'user', 
            content: `${prompts[summaryType]} ${text.slice(0, 8000)}` // Limit text length
          }
        ],
        max_tokens: summaryType === 'short' ? 100 : summaryType === 'medium' ? 200 : 400,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const summaryText = data.choices[0].message.content;
    const wordCount = summaryText.split(/\s+/).length;
    const confidenceScore = 0.85; // Default confidence score

    console.log(`Generated summary with ${wordCount} words`);

    // Store summary in database
    const { data: summary, error: dbError } = await supabaseClient
      .from('content_summaries')
      .insert({
        content_id: contentId,
        summary_text: summaryText,
        summary_type: 'auto',
        confidence_score: confidenceScore,
        word_count: wordCount,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error(`Failed to save summary: ${dbError.message}`);
    }

    // Update content table to mark as having summary
    await supabaseClient
      .from('contents')
      .update({ has_summary: true })
      .eq('id', contentId);

    console.log('Summary saved successfully');

    return new Response(
      JSON.stringify({ 
        summary: summaryText,
        wordCount,
        confidenceScore,
        id: summary.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-summary function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
