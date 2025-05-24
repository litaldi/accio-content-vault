
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import SubscriptionButton from '@/components/pricing/SubscriptionButton';
import { useSubscription } from '@/hooks/useSubscription';

const PricingSection = () => {
  const navigate = useNavigate();
  const { currentTier } = useSubscription();
  
  return (
    <section className="py-16 px-4 bg-muted/50" aria-labelledby="pricing-heading">
      <div className="max-w-6xl mx-auto text-center">
        <h2 id="pricing-heading" className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Choose the plan that works for your needs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2">Free</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Save up to 100 items</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Basic search</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>AI-powered tagging</span>
                </li>
              </ul>
              <SubscriptionButton tier="free" currentTier={currentTier} />
            </CardContent>
          </Card>
          
          {/* Pro Plan */}
          <Card className="border-2 border-primary relative transition-all hover:shadow-md">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2">Pro</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$9.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited saves</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced semantic search</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Priority AI analysis</span>
                </li>
              </ul>
              <SubscriptionButton tier="pro" currentTier={currentTier} isPopular />
            </CardContent>
          </Card>
          
          {/* Team Plan */}
          <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2">Team</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$19.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Team collaboration</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced analytics</span>
                </li>
              </ul>
              <SubscriptionButton tier="team" currentTier={currentTier} />
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8">
          <Button
            variant="link"
            onClick={() => navigate('/pricing')}
            className="text-primary flex items-center gap-2"
          >
            View full pricing details
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
