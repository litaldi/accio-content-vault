
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    
    if (!stripeKey || !webhookSecret) {
      throw new Error('Stripe configuration missing')
    }

    const stripe = new (await import('https://esm.sh/stripe@12.0.0')).Stripe(stripeKey, {
      apiVersion: '2022-11-15',
    })

    const body = await req.text()
    const signature = req.headers.get('stripe-signature')!

    let event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return new Response('Invalid signature', { status: 400 })
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const userId = session.metadata?.user_id
        const tier = session.metadata?.subscription_tier

        if (userId && tier) {
          // Update order status
          await supabaseClient
            .from('orders')
            .update({ status: 'completed' })
            .eq('stripe_session_id', session.id)

          // Update or create subscriber record
          await supabaseClient
            .from('subscribers')
            .upsert({
              user_id: userId,
              email: session.customer_email,
              stripe_customer_id: session.customer,
              subscribed: true,
              subscription_tier: tier,
              updated_at: new Date().toISOString(),
            })

          // Update user profile
          await supabaseClient
            .from('user_profiles')
            .update({ subscription_tier: tier === 'pro' ? 'premium' : 'free' })
            .eq('user_id', userId)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        await supabaseClient
          .from('subscribers')
          .update({ 
            subscribed: false,
            subscription_tier: 'free',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', subscription.customer)
        break
      }
    }

    return new Response('ok', { headers: corsHeaders })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
