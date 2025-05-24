
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
    const { tier } = await req.json()
    
    // Get Stripe secret key from environment
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeKey) {
      throw new Error('Stripe secret key not configured')
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Get user from auth token
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabaseClient.auth.getUser(token)

    if (!user) {
      throw new Error('User not authenticated')
    }

    // Define pricing
    const prices = {
      pro: { amount: 999, name: 'Pro Plan' }, // $9.99
      team: { amount: 1999, name: 'Team Plan' } // $19.99
    }

    const selectedPrice = prices[tier as keyof typeof prices]
    if (!selectedPrice) {
      throw new Error('Invalid subscription tier')
    }

    // Create Stripe checkout session
    const stripe = new (await import('https://esm.sh/stripe@12.0.0')).Stripe(stripeKey, {
      apiVersion: '2022-11-15',
    })

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedPrice.name,
              description: `Monthly subscription to ${selectedPrice.name}`,
            },
            unit_amount: selectedPrice.amount,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/dashboard?payment=success`,
      cancel_url: `${req.headers.get('origin')}/pricing?payment=cancelled`,
      metadata: {
        user_id: user.id,
        subscription_tier: tier,
      },
    })

    // Store order in database
    await supabaseClient.from('orders').insert({
      user_id: user.id,
      stripe_session_id: session.id,
      amount: selectedPrice.amount,
      currency: 'usd',
      status: 'pending',
      subscription_tier: tier,
    })

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
