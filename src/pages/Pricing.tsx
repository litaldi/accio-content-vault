
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { CheckIcon, XIcon } from 'lucide-react';

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  isPopular = false,
  buttonText = "Get Started",
  onButtonClick
}: { 
  name: string; 
  price: string; 
  description: string; 
  features: { included: boolean; text: string }[];
  isPopular?: boolean;
  buttonText?: string;
  onButtonClick: () => void;
}) => (
  <div className={`
    flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow
    ${isPopular ? 'border-primary/50 shadow-lg' : 'border-border'}
  `}>
    {isPopular && (
      <p className="bg-primary/10 text-primary text-sm font-medium rounded-t-lg py-1.5 px-4 -mt-6 -mx-6 mb-6">
        <span>Most Popular</span>
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
            <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <XIcon className="h-5 w-5 text-muted-foreground mr-2" />
          )}
          <span>{feature.text}</span>
        </li>
      ))}
    </ul>
    <Button 
      onClick={onButtonClick}
      variant={isPopular ? "default" : "outline"}
      className="mt-auto"
    >
      <span>{buttonText}</span>
    </Button>
  </div>
);

const Pricing = () => {
  const navigate = useNavigate();
  
  // In a real app, this would check Supabase auth
  const isLoggedIn = true;

  const handleFreeTierClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const handleProTierClick = () => {
    // In a real app, this would redirect to Stripe checkout
    console.log('Pro subscription selected');
    // For now, just show an alert
    alert('This would redirect to payment processing in the real app');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <main className="flex-grow py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for you. All plans include a 14-day free trial.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingTier 
              name="Free"
              price="Free"
              description="Perfect for getting started with basic organization"
              features={[
                { included: true, text: "Save up to 50 items" },
                { included: true, text: "Basic keyword search" },
                { included: true, text: "Manual tagging" },
                { included: false, text: "AI-powered tagging" },
                { included: false, text: "Semantic search" },
                { included: false, text: "File uploads" },
                { included: false, text: "Content exports" },
              ]}
              buttonText="Get Started"
              onButtonClick={handleFreeTierClick}
            />
            
            <PricingTier 
              name="Pro"
              price="$8.99"
              description="For power users who need advanced features"
              features={[
                { included: true, text: "Unlimited saved items" },
                { included: true, text: "Advanced semantic search" },
                { included: true, text: "AI-powered tagging" },
                { included: true, text: "File uploads (PDF, images)" },
                { included: true, text: "Export to CSV or PDF" },
                { included: true, text: "Priority support" },
                { included: true, text: "Early access to new features" },
              ]}
              isPopular={true}
              buttonText="Upgrade to Pro"
              onButtonClick={handleProTierClick}
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
                  On the Free plan, you'll need to delete some content before adding more. Pro users have unlimited storage.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Is there a trial period?</h3>
                <p className="text-muted-foreground">
                  Yes, all plans include a 14-day free trial of Pro features. No credit card required to start your trial.
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
