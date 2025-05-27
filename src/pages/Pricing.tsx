
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProfessionalNavigation from '@/components/navigation/ProfessionalNavigation';
import ImprovedFooter from '@/components/layout/ImprovedFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Sparkles, 
  Zap, 
  Crown,
  Star
} from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Save up to 100 items",
        "3 collections",
        "Basic search",
        "Web capture",
        "Mobile access"
      ],
      cta: "Start Free",
      popular: false,
      icon: Sparkles
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      description: "For serious knowledge workers",
      features: [
        "Unlimited items",
        "Unlimited collections",
        "AI-powered search",
        "Advanced analytics",
        "Priority support",
        "API access",
        "Export options"
      ],
      cta: "Start Pro Trial",
      popular: true,
      icon: Zap
    },
    {
      name: "Team",
      price: "$19",
      period: "per user/month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Shared collections",
        "Admin controls",
        "SSO integration",
        "Advanced security",
        "Custom integrations"
      ],
      cta: "Contact Sales",
      popular: false,
      icon: Crown
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Pricing - Accio Knowledge Engine</title>
        <meta name="description" content="Choose the perfect plan for your knowledge management needs. Start free and scale as you grow." />
      </Helmet>

      <ProfessionalNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <Badge variant="outline" className="mb-6">Pricing</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent <span className="text-primary">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free and scale as your knowledge grows. No hidden fees, no surprises.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid gap-8 md:grid-cols-3">
              {plans.map((plan, index) => (
                <Card key={index} className={`card-elevated relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-6">
                    <div className={`w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center ${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                      <plan.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <CardDescription className="mt-2">
                      {plan.description}
                    </CardDescription>
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
                      <a href="/register">{plan.cta}</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about our pricing
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                  </p>
                </CardContent>
              </Card>
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Is there a free trial?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our Free plan is available forever. Pro plans include a 14-day free trial.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users transforming their knowledge management
            </p>
            <Button size="lg" asChild>
              <a href="/register">
                <Sparkles className="h-5 w-5 mr-2" />
                Start Your Journey
              </a>
            </Button>
          </div>
        </section>
      </main>

      <ImprovedFooter />
    </div>
  );
};

export default Pricing;
