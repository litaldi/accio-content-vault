
-- Fix RLS policies for orders table
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;

CREATE POLICY "Users can view their own orders" 
  ON public.orders 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" 
  ON public.orders 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" 
  ON public.orders 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Fix RLS policies for subscribers table
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.subscribers;
DROP POLICY IF EXISTS "Users can create their own subscription" ON public.subscribers;
DROP POLICY IF EXISTS "Users can update their own subscription" ON public.subscribers;

CREATE POLICY "Users can view their own subscription" 
  ON public.subscribers 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own subscription" 
  ON public.subscribers 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription" 
  ON public.subscribers 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Fix RLS policies for tag_analytics table (restrict to content owners)
DROP POLICY IF EXISTS "Users can view analytics for their tags" ON public.tag_analytics;
DROP POLICY IF EXISTS "Users can update analytics for their tags" ON public.tag_analytics;

CREATE POLICY "Users can view analytics for their tags" 
  ON public.tag_analytics 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.tags t 
      WHERE t.id = tag_analytics.tag_id 
      AND (t.user_id = auth.uid() OR t.user_id IS NULL)
    )
  );

CREATE POLICY "System can update tag analytics" 
  ON public.tag_analytics 
  FOR UPDATE 
  USING (true);

-- Add RLS policies for content_summaries table
ALTER TABLE public.content_summaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view summaries for their content" 
  ON public.content_summaries 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.contents c 
      WHERE c.id = content_summaries.content_id 
      AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create summaries for their content" 
  ON public.content_summaries 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.contents c 
      WHERE c.id = content_summaries.content_id 
      AND c.user_id = auth.uid()
    )
  );

-- Add audit logging function
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type TEXT,
  event_details JSONB DEFAULT '{}'::jsonb
) RETURNS VOID AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    user_id,
    event_type,
    event_details,
    created_at,
    ip_address,
    user_agent
  ) VALUES (
    auth.uid(),
    event_type,
    event_details,
    NOW(),
    current_setting('request.headers', true)::jsonb->>'x-forwarded-for',
    current_setting('request.headers', true)::jsonb->>'user-agent'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create security audit log table
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  event_type TEXT NOT NULL,
  event_details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT
);

ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own audit logs" 
  ON public.security_audit_log 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Add content validation trigger
CREATE OR REPLACE FUNCTION public.validate_content_security()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate content length
  IF LENGTH(NEW.description) > 10000 THEN
    RAISE EXCEPTION 'Content description too long (max 10000 characters)';
  END IF;
  
  -- Validate URL format if provided
  IF NEW.url IS NOT NULL AND NEW.url !~ '^https?://[^\s/$.?#].[^\s]*$' THEN
    RAISE EXCEPTION 'Invalid URL format';
  END IF;
  
  -- Log content creation
  PERFORM public.log_security_event('content_created', jsonb_build_object(
    'content_id', NEW.id,
    'content_type', NEW.content_type,
    'url', NEW.url
  ));
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_content_security_trigger
  BEFORE INSERT OR UPDATE ON public.contents
  FOR EACH ROW EXECUTE FUNCTION public.validate_content_security();
