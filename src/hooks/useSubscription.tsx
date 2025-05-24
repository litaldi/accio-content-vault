
import { useState, useEffect } from 'react';
import { useSubscriptionService } from '@/services/subscriptionService';
import { useAuth } from '@/contexts/AuthContext';

interface SubscriptionData {
  id: string;
  subscribed: boolean;
  subscription_tier: string;
  subscription_end: string | null;
  stripe_customer_id: string | null;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getSubscriptionStatus } = useSubscriptionService();
  const { user } = useAuth();

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) {
        setSubscription(null);
        setIsLoading(false);
        return;
      }

      try {
        const data = await getSubscriptionStatus();
        setSubscription(data);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, [user, getSubscriptionStatus]);

  const isPro = subscription?.subscription_tier === 'pro';
  const isTeam = subscription?.subscription_tier === 'team';
  const isFree = !subscription || subscription.subscription_tier === 'free';

  return {
    subscription,
    isLoading,
    isPro,
    isTeam,
    isFree,
    currentTier: subscription?.subscription_tier || 'free',
  };
};
