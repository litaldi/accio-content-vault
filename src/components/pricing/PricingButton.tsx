
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

interface PricingButtonProps {
  planId: string;
  planName: string;
  buttonText: string;
  buttonVariant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  isCurrentPlan?: boolean;
  price?: number | null;
  isAnnual?: boolean;
}

const PricingButton: React.FC<PricingButtonProps> = ({
  planId,
  planName,
  buttonText,
  buttonVariant = 'default',
  isCurrentPlan = false,
  price,
  isAnnual = false,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!user && planId !== 'free') {
      navigate('/register');
      return;
    }

    if (planId === 'free') {
      navigate('/dashboard');
      return;
    }

    if (planId === 'enterprise') {
      // Redirect to contact page for enterprise sales
      navigate('/contact');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate checkout process - in a real app, you'd integrate with Stripe
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Subscription Started!",
        description: `Welcome to ${planName}! You now have access to all premium features.`,
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Unable to process subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonContent = () => {
    if (isCurrentPlan) {
      return (
        <>
          <CheckCircle className="h-4 w-4" />
          Current Plan
        </>
      );
    }

    if (isLoading) {
      return (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Processing...
        </>
      );
    }

    return (
      <>
        {buttonText}
        <ArrowRight className="h-4 w-4" />
      </>
    );
  };

  return (
    <Button
      onClick={handleSubscribe}
      variant={isCurrentPlan ? 'secondary' : buttonVariant}
      disabled={isCurrentPlan || isLoading}
      className="w-full gap-2"
      size="lg"
      aria-label={`Subscribe to ${planName} plan`}
    >
      {getButtonContent()}
    </Button>
  );
};

export default PricingButton;
