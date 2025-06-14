
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting storage
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

// Input validation helpers
const validateInput = (input: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!input) {
    errors.push('Request body is required');
    return { isValid: false, errors };
  }
  
  if (!input.content && !input.url) {
    errors.push('Either content or url is required');
  }
  
  if (input.content && typeof input.content !== 'string') {
    errors.push('Content must be a string');
  }
  
  if (input.content && input.content.length > 50000) {
    errors.push('Content too long (max 50KB)');
  }
  
  if (input.url && typeof input.url !== 'string') {
    errors.push('URL must be a string');
  }
  
  if (input.url && !input.url.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/)) {
    errors.push('Invalid URL format');
  }
  
  return { isValid: errors.length === 0, errors };
};

const sanitizeContent = (content: string): string => {
  // Remove potentially dangerous content
  return content
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '')
    .trim();
};

const checkRateLimit = (userId: string): { allowed: boolean; resetTime?: number } => {
  const now = Date.now();
  const userLimit = rateLimitMap.get(userId);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(userId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }
  
  if (userLimit.count >= RATE_LIMIT) {
    return { allowed: false, resetTime: userLimit.resetTime };
  }
  
  userLimit.count++;
  return { allowed: true };
};

const logSecurityEvent = async (supabase: any, eventType: string, details: any) => {
  try {
    await supabase.rpc('log_security_event', {
      event_type: eventType,
      event_details: details
    });
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Validate request method
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check request size
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 51200) { // 50KB limit
      return new Response(
        JSON.stringify({ error: 'Request payload too large' }),
        { status: 413, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      await logSecurityEvent(supabase, 'unauthorized_summary_request', {
        authError: authError?.message,
        ip: req.headers.get('x-forwarded-for')
      });
      
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check rate limiting
    const rateLimitCheck = checkRateLimit(user.id);
    if (!rateLimitCheck.allowed) {
      await logSecurityEvent(supabase, 'rate_limit_exceeded', {
        userId: user.id,
        resetTime: rateLimitCheck.resetTime
      });
      
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded', 
          resetTime: rateLimitCheck.resetTime 
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': '60'
          } 
        }
      );
    }

    // Parse and validate input
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const validation = validateInput(body);
    if (!validation.isValid) {
      await logSecurityEvent(supabase, 'invalid_summary_request', {
        userId: user.id,
        errors: validation.errors
      });
      
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: validation.errors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize content
    const sanitizedContent = body.content ? sanitizeContent(body.content) : '';
    
    // Log successful request
    await logSecurityEvent(supabase, 'summary_request_processed', {
      userId: user.id,
      contentLength: sanitizedContent.length,
      hasUrl: !!body.url
    });

    // Generate summary (simplified mock for now)
    const summary = `Summary of content: ${sanitizedContent.substring(0, 200)}${sanitizedContent.length > 200 ? '...' : ''}`;
    
    return new Response(
      JSON.stringify({ 
        summary,
        confidence_score: 0.85,
        word_count: sanitizedContent.split(' ').length
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    
    // Don't expose internal errors to client
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
