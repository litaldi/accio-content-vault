
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const MarketingPricingSection: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      description: 'Perfect for individuals getting started',
      icon: Zap,
      features: [
        'Save up to 500 items',
        'Basic AI organization', 
        'Search your library',
        'Mobile & desktop apps',
        'Browser extension',
        'Basic export options'
      ],
      buttonText: 'Start Free Forever',
      buttonVariant: 'outline' as const,
      popular: false,
      savings: null
    },
    {
      name: 'Professional',
      price: '$12',
      originalPrice: '$20',
      period: 'month',
      description: 'For power users and knowledge workers',
      icon: Crown,
      features: [
        'Unlimited saved items',
        'Advanced AI search & suggestions',
        'Smart collections & tagging',
        'Priority customer support',
        'Advanced export & backup',
        'Team collaboration tools',
        'API access',
        'Custom integrations'
      ],
      buttonText: 'Start 14-Day Free Trial',
      buttonVariant: 'gradient' as const,
      popular: true,
      savings: '40% off for early adopters'
    },
    {
      name: 'Team',
      price: '$8',
      period: 'per user/month',
      description: 'For teams and organizations',
      icon: Users,
      features: [
        'Everything in Professional',
        'Shared team libraries',
        'Admin dashboard & analytics',
        'Single sign-on (SSO)',
        'Advanced security controls',
        'Custom onboarding',
        'Dedicated account manager',
        'Enterprise integrations'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outline' as const,
      popular: false,
      savings: 'Volume discounts available'
    }
  ];

  const testimonialStats = [
    { number: '94%', label: 'faster content discovery' },
    { number: '$8,400', label: 'average annual savings per user' },
    { number: '5+ hours', label: 'saved per week' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 via-background to-accent/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Star className="h-4 w-4" />
            Limited Time: 40% Off Professional Plans
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Choose Your Knowledge{' '}
            <span className="text-primary">Superpower</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands who've transformed their productivity. Start free, upgrade when you're ready to unlock your full potential.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-primary shadow-2xl scale-105' : 'border-border'} bg-background/80 backdrop-blur-sm`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-medium">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center relative">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <plan.icon className="h-6 w-6 text-primary" />
                </div>
                
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2">
                    {plan.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold">{plan.price}</span>
                  </div>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                
                {plan.savings && (
                  <Badge variant="outline" className="mt-2 text-green-600 border-green-200">
                    {plan.savings}
                  </Badge>
                )}
                
                <CardDescription className="mt-4">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <EnhancedButton 
                  className="w-full" 
                  variant={plan.buttonVariant}
                  size="lg"
                  asChild
                >
                  <Link to={plan.name === 'Team' ? '/contact' : '/register'}>
                    {plan.buttonText}
                  </Link>
                </EnhancedButton>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Proof Stats */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold mb-8">Real Results from Real Users</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {testimonialStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center bg-green-50 border border-green-200 rounded-lg p-8 max-w-2xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">30-Day Money-Back Guarantee</h3>
          <p className="text-muted-foreground">
            Not completely satisfied? Get a full refund within 30 days, no questions asked.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketingPricingSection;
