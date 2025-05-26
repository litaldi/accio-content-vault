
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSubscriptionService } from '@/services/subscriptionService';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, ArrowRight } from 'lucide-react';

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
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!user) {
      navigate('/register');
      return;
    }

    if (tier === 'free') {
      navigate('/dashboard');
      return;
    }

    setIsLoading(true);
    try {
      await createCheckoutSession(tier as 'pro' | 'team');
      toast({
        title: "Redirecting to checkout",
        description: "You'll be redirected to complete your subscription.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

  const getButtonIcon = () => {
    if (currentTier === tier) {
      return <CheckCircle className="h-4 w-4" />;
    }
    return <ArrowRight className="h-4 w-4" />;
  };

  const isCurrentPlan = currentTier === tier;

  return (
    <Button
      onClick={handleSubscribe}
      variant={isPopular && !isCurrentPlan ? 'default' : isCurrentPlan ? 'secondary' : 'outline'}
      disabled={disabled || isCurrentPlan}
      loading={isLoading}
      loadingText="Processing..."
      className="w-full"
      rightIcon={getButtonIcon()}
      aria-label={`Subscribe to ${tier} plan`}
    >
      {getButtonText()}
    </Button>
  );
};

export default SubscriptionButton;
