
import { useBaseService } from './baseService';
import { useCallback } from 'react';

export const useSubscriptionService = () => {
  const { user, toast, supabase, requireAuth } = useBaseService();

  const createCheckoutSession = useCallback(async (tier: 'pro' | 'team') => {
    if (!requireAuth()) return;

    try {
      const { data, error } = await supabase.functions.invoke('create-stripe-checkout', {
        body: { tier },
      });

      if (error) throw error;

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
      
      toast({
        title: 'Redirecting to payment',
        description: 'Opening Stripe checkout in a new tab...',
      });

      return data;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: 'Payment setup failed',
        description: 'Unable to create payment session. Please try again.',
        variant: 'destructive',
      });
    }
  }, [user, supabase, toast, requireAuth]);

  const getSubscriptionStatus = useCallback(async () => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching subscription:', error);
      return null;
    }
  }, [user, supabase]);

  return {
    createCheckoutSession,
    getSubscriptionStatus,
  };
};
