
import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Star, Crown } from 'lucide-react';

const Upgrade: React.FC = () => {
  const plans = [
    {
      name: 'Pro',
      price: '$9',
      period: '/month',
      description: 'Perfect for professionals',
      features: [
        'Unlimited saves',
        'Advanced AI features',
        'Priority support',
        'Export capabilities'
      ],
      icon: Zap,
      popular: true
    },
    {
      name: 'Premium',
      price: '$19',
      period: '/month',
      description: 'For power users',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom integrations',
        'Advanced analytics'
      ],
      icon: Crown,
      popular: false
    }
  ];

  return (
    <AuthenticatedLayout>
      <Helmet>
        <title>Upgrade Plan - Accio</title>
        <meta name="description" content="Upgrade your Accio plan for more features" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Upgrade Your Plan</h1>
          <p className="text-muted-foreground">
            Unlock the full potential of your knowledge management
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <plan.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <CardTitle>{plan.name}</CardTitle>
                <div className="text-3xl font-bold">
                  {plan.price}<span className="text-lg text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                  Upgrade to {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Upgrade;
