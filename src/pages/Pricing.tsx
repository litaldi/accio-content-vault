
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { CheckIcon, XIcon } from 'lucide-react';
import SubscriptionButton from '@/components/pricing/SubscriptionButton';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/contexts/AuthContext';

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  isPopular = false,
  tier,
  currentTier
}: { 
  name: string; 
  price: string; 
  description: string; 
  features: { included: boolean; text: string }[];
  isPopular?: boolean;
  tier: 'free' | 'pro' | 'team';
  currentTier: string;
}) => (
  <div className={`
    flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow
    ${isPopular ? 'border-primary/50 shadow-lg' : 'border-border'}
  `}>
    {isPopular && (
      <p className="bg-primary/10 text-primary text-sm font-medium rounded-t-lg py-1.5 px-4 -mt-6 -mx-6 mb-6">
        Most Popular
      </p>
    )}
    <h3 className="text-2xl font-semibold">{name}</h3>
    <div className="mx-auto my-4 flex items-baseline justify-center">
      <span className="text-5xl font-extrabold">{price}</span>
      {price !== "Free" && <span className="text-gray-500 ml-1">/month</span>}
    </div>
    <p className="text-muted-foreground mb-6">{description}</p>
    <ul className="mb-8 space-y-4 text-left">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          {feature.included ? (
            <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
          ) : (
            <XIcon className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
          )}
          <span>{feature.text}</span>
        </li>
      ))}
    </ul>
    <SubscriptionButton 
      tier={tier}
      currentTier={currentTier}
      isPopular={isPopular}
    />
  </div>
);

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentTier, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isLoggedIn={!!user} />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading subscription details...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={!!user} />
      
      <main className="flex-grow py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for you. All plans include a 14-day free trial.
            </p>
            {user && currentTier !== 'free' && (
              <div className="mt-4 p-3 bg-primary/10 text-primary rounded-lg inline-block">
                Current Plan: {currentTier === 'pro' ? 'Pro' : currentTier === 'team' ? 'Team' : 'Free'}
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingTier 
              name="Free"
              price="Free"
              description="Perfect for getting started with basic organization"
              features={[
                { included: true, text: "Save up to 100 items" },
                { included: true, text: "Basic keyword search" },
                { included: true, text: "Manual tagging" },
                { included: true, text: "AI-powered tagging" },
                { included: false, text: "Advanced semantic search" },
                { included: false, text: "File uploads" },
                { included: false, text: "Priority support" },
              ]}
              tier="free"
              currentTier={currentTier}
            />
            
            <PricingTier 
              name="Pro"
              price="$9.99"
              description="For power users who need advanced features"
              features={[
                { included: true, text: "Unlimited saved items" },
                { included: true, text: "Advanced semantic search" },
                { included: true, text: "AI-powered tagging" },
                { included: true, text: "File uploads (PDF, images)" },
                { included: true, text: "Content summarization" },
                { included: true, text: "Priority support" },
                { included: true, text: "Export capabilities" },
              ]}
              isPopular={true}
              tier="pro"
              currentTier={currentTier}
            />

            <PricingTier 
              name="Team"
              price="$19.99"
              description="For teams and organizations"
              features={[
                { included: true, text: "Everything in Pro" },
                { included: true, text: "Team collaboration" },
                { included: true, text: "Shared collections" },
                { included: true, text: "Advanced analytics" },
                { included: true, text: "Team management" },
                { included: true, text: "Priority support" },
                { included: true, text: "Custom integrations" },
              ]}
              tier="team"
              currentTier={currentTier}
            />
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto text-left space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Can I switch between plans?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. When downgrading, your Pro features will remain active until the end of your current billing cycle.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">What happens when I reach my storage limit?</h3>
                <p className="text-muted-foreground">
                  On the Free plan, you'll need to delete some content before adding more. Pro and Team users have unlimited storage.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Is there a trial period?</h3>
                <p className="text-muted-foreground">
                  Yes, all paid plans include a 14-day free trial. No credit card required to start your trial.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">How secure is my data?</h3>
                <p className="text-muted-foreground">
                  We use enterprise-grade security with end-to-end encryption. Your data is stored securely and never shared with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-background border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Accio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
