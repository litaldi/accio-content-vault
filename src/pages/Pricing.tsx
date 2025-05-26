
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedUnifiedLayout from '@/components/layout/EnhancedUnifiedLayout';
import { UnifiedTypography, UnifiedSpacing } from '@/components/ui/unified-design-system';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with personal knowledge management",
      features: [
        { name: "Up to 100 saved items", included: true },
        { name: "Basic search", included: true },
        { name: "Manual tagging", included: true },
        { name: "Web app access", included: true },
        { name: "AI-powered organization", included: false },
        { name: "Advanced analytics", included: false },
        { name: "Team collaboration", included: false },
        { name: "Priority support", included: false }
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      description: "For professionals who need advanced knowledge management",
      features: [
        { name: "Unlimited saved items", included: true },
        { name: "AI-powered search", included: true },
        { name: "Auto-tagging & organization", included: true },
        { name: "Browser extension", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Content summaries", included: true },
        { name: "Team collaboration", included: false },
        { name: "Priority support", included: true }
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Team",
      price: "$19",
      period: "per user/month",
      description: "For teams and organizations that need to share knowledge",
      features: [
        { name: "Everything in Pro", included: true },
        { name: "Team workspaces", included: true },
        { name: "Shared collections", included: true },
        { name: "Advanced permissions", included: true },
        { name: "Team analytics", included: true },
        { name: "Admin controls", included: true },
        { name: "SSO integration", included: true },
        { name: "Dedicated support", included: true }
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <EnhancedUnifiedLayout>
      <Helmet>
        <title>Pricing - Accio Knowledge Library</title>
        <meta name="description" content="Choose the perfect plan for your knowledge management needs. Start free and upgrade as you grow." />
      </Helmet>

      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          {/* Hero Section */}
          <div className="text-center mb-16">
            <UnifiedTypography.H1 className="mb-4">
              Simple, Transparent Pricing
            </UnifiedTypography.H1>
            <UnifiedTypography.Lead className="max-w-2xl mx-auto">
              Choose the plan that fits your needs. Start free and upgrade anytime.
            </UnifiedTypography.Lead>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative h-full ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">/{plan.period}</span>
                  </div>
                  <CardDescription className="mt-4">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground mr-3 flex-shrink-0" />
                        )}
                        <span className={feature.included ? '' : 'text-muted-foreground'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full mt-8" 
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link to="/register">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="text-center">
            <UnifiedTypography.H2 className="mb-8">
              Frequently Asked Questions
            </UnifiedTypography.H2>
            
            <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
              <div>
                <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground">
                  Yes, all paid plans come with a 14-day free trial. No credit card required.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and offer annual billing discounts.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Can I export my data?</h3>
                <p className="text-muted-foreground">
                  Yes, you can export all your data at any time in standard formats like JSON or CSV.
                </p>
              </div>
            </div>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>
    </EnhancedUnifiedLayout>
  );
};

export default Pricing;
