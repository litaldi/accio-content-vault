
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Save up to 100 items",
        "3 collections",
        "Basic search",
        "Web capture"
      ],
      cta: "Start Free",
      href: "/register",
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      description: "For serious knowledge workers",
      features: [
        "Unlimited items",
        "Unlimited collections",
        "AI-powered search",
        "Advanced analytics",
        "Priority support"
      ],
      cta: "Start Pro Trial",
      href: "/register",
      popular: true
    }
  ];

  return (
    <Spacing.Section>
      <Spacing.Container>
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-6">
            <Sparkles className="h-3 w-3 mr-1" />
            Simple Pricing
          </Badge>
          <Typography.H2 className="mb-4">Start Free, Scale as You Grow</Typography.H2>
          <Typography.Lead>
            No hidden fees, no surprises. Cancel anytime.
          </Typography.Lead>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <Typography.Body size="sm" className="mt-2">
                  {plan.description}
                </Typography.Body>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  asChild
                >
                  <Link to={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="ghost" asChild>
            <Link to="/pricing" className="flex items-center gap-2">
              View All Plans <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default PricingSection;
