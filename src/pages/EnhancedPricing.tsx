import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Check, 
  Star, 
  Sparkles, 
  Users, 
  Building,
  ArrowRight,
  Crown,
  Shield,
  Zap,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Typography, Layout, DesignTokens } from '@/components/design-system/EnhancedDesignSystem';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';

const EnhancedPricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [focusedPlan, setFocusedPlan] = useState<string | null>(null);
  const { announceToScreenReader } = useAccessibility();

  const handleBillingToggle = (checked: boolean) => {
    setIsAnnual(checked);
    announceToScreenReader(
      checked 
        ? 'Switched to annual billing. Save up to 17% on all plans.' 
        : 'Switched to monthly billing.'
    );
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for individuals getting started',
      monthlyPrice: 0,
      annualPrice: 0,
      icon: Sparkles,
      popular: false,
      audience: 'individuals',
      features: [
        '100 AI actions per month',
        'Basic content saving',
        '3 collections',
        'Simple search',
        'Web capture extension',
        'Mobile app access'
      ],
      limitations: [
        'Limited AI actions',
        'Basic search only',
        'No export options'
      ],
      buttonText: 'Start Free',
      buttonVariant: 'outline' as const,
      ctaDescription: 'No credit card required'
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For power users and knowledge workers',
      monthlyPrice: 9,
      annualPrice: 89,
      icon: Zap,
      popular: true,
      audience: 'individuals',
      features: [
        'Unlimited AI actions',
        'Unlimited content saves',
        'Unlimited collections',
        'AI summarization',
        'Smart auto-tagging',
        'Export to Notion/Docs',
        'Advanced search',
        'Priority support',
        'API access'
      ],
      buttonText: 'Start 7-Day Free Trial',
      buttonVariant: 'default' as const,
      ctaDescription: 'Cancel anytime'
    },
    {
      id: 'team',
      name: 'Team',
      description: 'For small businesses and teams',
      monthlyPrice: 29,
      annualPrice: 290,
      icon: Users,
      popular: false,
      audience: 'business',
      features: [
        'Everything in Pro',
        'Up to 10 team members',
        'Shared collections',
        'Team collaboration',
        'Workspace branding',
        'Team permissions',
        'Shared analytics',
        'Admin dashboard',
        'Bulk operations'
      ],
      buttonText: 'Start Team Trial',
      buttonVariant: 'outline' as const,
      additionalInfo: '$3 per additional user',
      ctaDescription: '14-day free trial'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations',
      monthlyPrice: null,
      annualPrice: null,
      icon: Building,
      popular: false,
      audience: 'enterprise',
      features: [
        'Everything in Team',
        'Unlimited team members',
        'Custom integrations',
        'SSO authentication',
        'SOC 2 compliance',
        'SLA guarantee',
        'Dedicated support',
        'Custom training',
        'On-premise deployment'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary' as const,
      ctaDescription: 'Custom pricing available'
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === null) return 'Custom';
    if (plan.monthlyPrice === 0) return 'Free';
    return isAnnual ? plan.annualPrice : plan.monthlyPrice;
  };

  const getPeriod = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === null || plan.monthlyPrice === 0) return '';
    return isAnnual ? '/year' : '/month';
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === null || plan.monthlyPrice === 0) return null;
    if (isAnnual && plan.monthlyPrice && plan.annualPrice) {
      const monthlyTotal = plan.monthlyPrice * 12;
      const savings = monthlyTotal - plan.annualPrice;
      const percentage = Math.round((savings / monthlyTotal) * 100);
      return `Save ${percentage}%`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Pricing - Choose Your Perfect Plan | Accio</title>
        <meta name="description" content="Choose the perfect plan for your knowledge management needs. Start free and scale as you grow with transparent, flexible pricing." />
        <meta name="keywords" content="pricing, plans, knowledge management, subscription, free trial" />
      </Helmet>

      {/* Header Section */}
      <Layout.Section size="large">
        <Layout.Container>
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 text-sm">
              <Star className="h-3 w-3 mr-2" aria-hidden="true" />
              Transparent Pricing
            </Badge>
            
            <Typography.Display className="mb-6">
              Choose Your <span className="text-primary">Perfect Plan</span>
            </Typography.Display>
            
            <Typography.Lead className="mb-8">
              Start free and scale as your knowledge grows. No hidden fees, cancel anytime.
            </Typography.Lead>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8 p-4 bg-muted/50 rounded-lg">
              <span 
                className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}
                id="monthly-label"
              >
                Monthly
              </span>
              <Switch 
                checked={isAnnual} 
                onCheckedChange={handleBillingToggle}
                aria-labelledby="billing-toggle-label"
                aria-describedby="billing-toggle-description"
              />
              <span 
                className={`text-sm font-medium transition-colors ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}
                id="annual-label"
              >
                Annual
              </span>
              {isAnnual && (
                <Badge variant="secondary" className="ml-2 animate-fade-in">
                  Save up to 17%
                </Badge>
              )}
            </div>
            
            <div className="sr-only">
              <span id="billing-toggle-label">Billing frequency</span>
              <span id="billing-toggle-description">
                Toggle between monthly and annual billing. Annual billing offers savings up to 17%.
              </span>
            </div>
          </div>
        </Layout.Container>
      </Layout.Section>

      {/* Pricing Cards */}
      <Layout.Section>
        <Layout.Container>
          <Layout.Grid cols="4" gap="default" className="max-w-7xl mx-auto">
            {plans.map((plan) => {
              const savings = getSavings(plan);
              const isPopular = plan.popular;
              
              return (
                <Card 
                  key={plan.id}
                  className={cn(
                    'relative transition-all duration-300',
                    isPopular && 'ring-2 ring-primary scale-105 shadow-xl',
                    focusedPlan === plan.id && 'ring-2 ring-primary/50',
                    DesignTokens.interactions.cardHover
                  )}
                  onMouseEnter={() => setFocusedPlan(plan.id)}
                  onMouseLeave={() => setFocusedPlan(null)}
                  role="region"
                  aria-labelledby={`plan-${plan.id}-title`}
                  aria-describedby={`plan-${plan.id}-description`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-primary text-primary-foreground shadow-lg">
                        <Crown className="h-3 w-3 mr-1" aria-hidden="true" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-6">
                    <div className={cn(
                      'w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center transition-colors',
                      isPopular 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-primary/10 text-primary'
                    )}>
                      <plan.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    
                    <CardTitle id={`plan-${plan.id}-title`} className="text-2xl">
                      {plan.name}
                    </CardTitle>
                    
                    <div className="mt-4" role="group" aria-label={`${plan.name} pricing`}>
                      <div className="flex items-center justify-center">
                        {typeof getPrice(plan) === 'string' ? (
                          <span className="text-3xl font-bold">{getPrice(plan)}</span>
                        ) : (
                          <>
                            <span className="text-sm text-muted-foreground">$</span>
                            <span className="text-4xl font-bold">{getPrice(plan)}</span>
                          </>
                        )}
                      </div>
                      <span className="text-muted-foreground text-sm">{getPeriod(plan)}</span>
                      {savings && (
                        <Badge variant="outline" className="mt-2 text-green-600 border-green-200 bg-green-50">
                          {savings}
                        </Badge>
                      )}
                      {plan.additionalInfo && (
                        <Typography.Caption className="mt-2">
                          {plan.additionalInfo}
                        </Typography.Caption>
                      )}
                    </div>
                    
                    <CardDescription id={`plan-${plan.id}-description`} className="mt-4">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <Button 
                      className={cn(
                        'w-full',
                        DesignTokens.sizing.buttonLarge,
                        DesignTokens.interactions.focusRing,
                        isPopular && 'shadow-lg'
                      )}
                      variant={plan.buttonVariant}
                      size="lg"
                      asChild
                    >
                      <Link 
                        to={plan.id === 'enterprise' ? '/contact' : '/register'}
                        aria-describedby={`plan-${plan.id}-cta-description`}
                      >
                        {plan.buttonText}
                        <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                      </Link>
                    </Button>
                    
                    <Typography.Caption 
                      id={`plan-${plan.id}-cta-description`}
                      className="text-center"
                    >
                      {plan.ctaDescription}
                    </Typography.Caption>
                    
                    <div>
                      <h4 className="font-semibold mb-3 text-sm">What's included:</h4>
                      <ul className="space-y-3" role="list">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3" role="listitem">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-sm leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {plan.limitations && (
                        <>
                          <h4 className="font-semibold mb-3 text-sm mt-4 text-muted-foreground">
                            Limitations:
                          </h4>
                          <ul className="space-y-2" role="list">
                            {plan.limitations.map((limitation, index) => (
                              <li key={index} className="flex items-start gap-3" role="listitem">
                                <X className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="text-xs text-muted-foreground leading-relaxed">
                                  {limitation}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </Layout.Grid>
        </Layout.Container>
      </Layout.Section>

      {/* Trust Indicators */}
      <Layout.Section>
        <Layout.Container>
          <div className="text-center bg-muted/30 rounded-xl p-8 lg:p-12">
            <Typography.H3 className="mb-6">
              Trusted by Knowledge Workers Worldwide
            </Typography.H3>
            
            <Layout.Grid cols="3" gap="default" className="max-w-2xl mx-auto mb-6">
              <div className="flex items-center justify-center gap-2">
                <Shield className="h-5 w-5 text-green-500" aria-hidden="true" />
                <span className="text-sm font-medium">SOC 2 Compliant</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                <span className="text-sm font-medium">99.9% Uptime SLA</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="h-5 w-5 text-green-500" aria-hidden="true" />
                <span className="text-sm font-medium">30-Day Money Back</span>
              </div>
            </Layout.Grid>
            
            <Typography.Body className="text-muted-foreground mb-0">
              Join thousands of professionals who trust Accio with their most valuable knowledge
            </Typography.Body>
          </div>
        </Layout.Container>
      </Layout.Section>
    </div>
  );
};

export default EnhancedPricing;
