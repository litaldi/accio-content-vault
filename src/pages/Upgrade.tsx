
import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainMenu from '@/components/navigation/MainMenu';
import ImprovedFooter from '@/components/Footer/ImprovedFooter';
import { ResponsiveLayout } from '@/components/ui/responsive-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap } from 'lucide-react';

const Upgrade = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Save up to 100 items',
        'Basic search',
        'Tag organization',
        'Mobile app access'
      ],
      current: true
    },
    {
      name: 'Pro',
      price: '$9',
      period: 'month',
      description: 'For power users and professionals',
      features: [
        'Unlimited saved items',
        'Advanced search & filters',
        'AI-powered suggestions',
        'Tag reminders',
        'Priority support',
        'Export functionality'
      ],
      popular: true
    },
    {
      name: 'Team',
      price: '$29',
      period: 'month',
      description: 'Collaboration for teams',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Shared collections',
        'Admin controls',
        'Analytics dashboard',
        'Custom integrations'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Upgrade - Accio</title>
        <meta name="description" content="Upgrade your Accio account for more features and storage" />
      </Helmet>
      
      <MainMenu />
      
      <main className="flex-grow">
        <ResponsiveLayout maxWidth="xl" padding="lg" verticalSpacing="lg">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock the full potential of Accio with advanced features and unlimited storage
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.name}
                className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-6">
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
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.current ? "outline" : plan.popular ? "default" : "outline"}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
                    {plan.popular && <Zap className="h-4 w-4 ml-2" />}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">
                  Need help choosing?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our team is here to help you find the perfect plan for your needs.
                </p>
                <Button variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </ResponsiveLayout>
      </main>
      
      <ImprovedFooter />
    </div>
  );
};

export default Upgrade;
