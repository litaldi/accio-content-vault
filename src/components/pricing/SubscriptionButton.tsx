
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSubscriptionService } from '@/services/subscriptionService';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SubscriptionButtonProps {
  tier: 'free' | 'pro' | 'team';
  currentTier?: string;
  isPopular?: boolean;
  disabled?: boolean;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  tier,
  currentTier = 'free',
  isPopular = false,
  disabled = false,
}) => {
  const { createCheckoutSession } = useSubscriptionService();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    if (!user) {
      navigate('/register');
      return;
    }

    if (tier === 'free') {
      navigate('/dashboard');
      return;
    }

    await createCheckoutSession(tier as 'pro' | 'team');
  };

  const getButtonText = () => {
    if (currentTier === tier) {
      return 'Current Plan';
    }
    
    if (tier === 'free') {
      return user ? 'Go to Dashboard' : 'Get Started';
    }
    
    return `Choose ${tier === 'pro' ? 'Pro' : 'Team'}`;
  };

  const isCurrentPlan = currentTier === tier;

  return (
    <Button
      onClick={handleSubscribe}
      variant={isPopular && !isCurrentPlan ? 'default' : 'outline'}
      disabled={disabled || isCurrentPlan}
      className="w-full"
    >
      {getButtonText()}
    </Button>
  );
};

export default SubscriptionButton;
