
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedUnifiedLayout from '@/components/layout/EnhancedUnifiedLayout';
import { UnifiedTypography, UnifiedSpacing } from '@/components/ui/unified-design-system';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Save up to 100 items",
        "Basic search",
        "Mobile apps",
        "Web browser extension",
        "Basic tagging"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      description: "For serious knowledge workers",
      features: [
        "Unlimited saves",
        "AI-powered organization",
        "Natural language search",
        "Advanced analytics",
        "Team collaboration",
        "Priority support",
        "Custom tags",
        "Export capabilities"
      ],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Advanced admin controls",
        "Single sign-on (SSO)",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantees",
        "Advanced security",
        "Custom deployment"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <EnhancedUnifiedLayout>
      <Helmet>
        <title>Pricing - Accio Knowledge Library</title>
        <meta name="description" content="Choose the perfect plan for your knowledge management needs. Start free, upgrade anytime." />
        <meta name="keywords" content="pricing, plans, subscription, free trial, knowledge management" />
      </Helmet>

      {/* Hero Section */}
      <UnifiedSpacing.Section size="lg" className="text-center">
        <UnifiedSpacing.Container>
          <Badge variant="outline" className="mb-4">
            Simple Pricing
          </Badge>
          <UnifiedTypography.H1>
            Choose the plan that{' '}
            <span className="text-primary">fits your needs</span>
          </UnifiedTypography.H1>
          
          <UnifiedTypography.Lead>
            Start free, upgrade anytime. No hidden fees, no long-term contracts.
            Cancel or change your plan at any time.
          </UnifiedTypography.Lead>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>

      {/* Pricing Cards */}
      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={cn(
                  "relative text-center hover:shadow-lg transition-all duration-200",
                  plan.popular && "border-primary shadow-lg scale-105"
                )}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="pb-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold">
                      {plan.price}
                      {plan.price !== "Custom" && (
                        <span className="text-lg font-normal text-muted-foreground">
                          /{plan.period}
                        </span>
                      )}
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={cn(
                      "w-full",
                      plan.popular && "bg-primary hover:bg-primary/90"
                    )}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => {
                      if (plan.name === "Enterprise") {
                        navigate('/contact');
                      } else {
                        navigate('/register');
                      }
                    }}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>

      {/* FAQ Section */}
      <UnifiedSpacing.Section className="bg-muted/30">
        <UnifiedSpacing.Container>
          <div className="text-center mb-12">
            <UnifiedTypography.H2>Frequently Asked Questions</UnifiedTypography.H2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Can I change my plan anytime?</h3>
              <p className="text-muted-foreground">
                Yes! You can upgrade, downgrade, or cancel your subscription at any time. 
                Changes take effect at your next billing cycle.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                Yes! All paid plans come with a 14-day free trial. No credit card required to start.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">What happens to my data if I cancel?</h3>
              <p className="text-muted-foreground">
                You can export all your data anytime. After cancellation, you'll have 30 days to 
                download your content before it's permanently deleted.
              </p>
            </div>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>

      {/* CTA Section */}
      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          <div className="text-center space-y-8">
            <UnifiedTypography.H2>
              Ready to get started?
            </UnifiedTypography.H2>
            <Button 
              size="lg" 
              onClick={() => navigate('/register')}
              className="shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your Free Trial Today
            </Button>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>
    </EnhancedUnifiedLayout>
  );
};

export default Pricing;
