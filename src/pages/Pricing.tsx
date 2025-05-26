
import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainNavigation from '@/components/navigation/MainNavigation';
import ImprovedFooter from '@/components/layout/ImprovedFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Save up to 100 items',
        'Basic search',
        'Web clipper extension',
        'Mobile app access',
        'Email support'
      ],
      limitations: [
        'No AI organization',
        'No analytics',
        'No team features'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      price: '$9',
      period: 'per month',
      description: 'For serious knowledge workers',
      features: [
        'Unlimited saves',
        'AI-powered organization',
        'Advanced search & filters',
        'Knowledge analytics',
        'Custom tags & collections',
        'Priority support',
        'Export capabilities'
      ],
      limitations: [
        'Single user only'
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Team',
      price: '$19',
      period: 'per user/month',
      description: 'Built for collaborative teams',
      features: [
        'Everything in Pro',
        'Team workspaces',
        'Shared collections',
        'Admin controls',
        'Team analytics',
        'SSO integration',
        'Dedicated support'
      ],
      limitations: [],
      cta: 'Start Team Trial',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Pricing - Accio Knowledge Engine</title>
        <meta name="description" content="Choose the perfect plan for your knowledge management needs. Start free and upgrade anytime with transparent pricing." />
      </Helmet>

      <MainNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-blue-500/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Simple, Transparent
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                Pricing
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises. 
              Cancel anytime with full data export.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-blue-600">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className={`w-full mb-6 ${plan.popular ? 'bg-gradient-to-r from-primary to-blue-600' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={() => navigate('/register')}
                    >
                      {plan.cta}
                    </Button>
                    <div className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-background rounded-lg p-6">
                <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              <div className="bg-background rounded-lg p-6">
                <h3 className="font-semibold mb-2">What happens to my data if I cancel?</h3>
                <p className="text-muted-foreground">You can export all your data before canceling. We keep your data for 30 days after cancellation.</p>
              </div>
              <div className="bg-background rounded-lg p-6">
                <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground">Yes, we offer a 30-day money-back guarantee for all paid plans.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of professionals already using Accio to manage their knowledge.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/register')} 
              className="bg-white text-primary hover:bg-white/95 text-lg px-8 py-4 font-semibold"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Free Today
            </Button>
          </div>
        </section>
      </main>

      <ImprovedFooter />
    </div>
  );
};

export default Pricing;
