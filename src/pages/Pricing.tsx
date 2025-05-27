
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography, Layout, Card } from '@/components/design-system/DesignSystem';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Check, 
  Star, 
  Zap, 
  Crown, 
  Users,
  Shield,
  Infinity,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Personal',
      icon: Star,
      description: 'Perfect for individual knowledge builders',
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        '1,000 saved items',
        'Basic AI tagging',
        'Simple search',
        'Web and mobile apps',
        'Basic support'
      ],
      limitations: [
        'Limited to 1,000 items',
        'Basic search only',
        'Community support'
      ],
      cta: 'Start Free',
      popular: false,
      href: '/register'
    },
    {
      name: 'Professional',
      icon: Zap,
      description: 'For serious knowledge workers and creators',
      monthlyPrice: 12,
      annualPrice: 120,
      features: [
        'Unlimited saved items',
        'Advanced AI organization',
        'Semantic search',
        'Knowledge graph',
        'Browser extension',
        'Export capabilities',
        'Priority support'
      ],
      limitations: [],
      cta: 'Start Free Trial',
      popular: true,
      href: '/register'
    },
    {
      name: 'Team',
      icon: Users,
      description: 'Collaborate and share knowledge with your team',
      monthlyPrice: 25,
      annualPrice: 250,
      features: [
        'Everything in Professional',
        'Team collaboration',
        'Shared workspaces',
        'Admin controls',
        'Advanced analytics',
        'Custom integrations',
        'Dedicated support'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      href: '/contact'
    },
    {
      name: 'Enterprise',
      icon: Crown,
      description: 'Advanced features for large organizations',
      monthlyPrice: null,
      annualPrice: null,
      features: [
        'Everything in Team',
        'SSO/SAML integration',
        'Advanced security',
        'Custom deployment',
        'Dedicated account manager',
        'SLA guarantee',
        'Custom training'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      href: '/contact'
    }
  ];

  const faqs = [
    {
      question: 'Can I change plans at any time?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, we offer a 14-day free trial for all paid plans. No credit card required to start.'
    },
    {
      question: 'What happens to my data if I downgrade?',
      answer: 'Your data is always safe. If you downgrade, you\'ll retain access to all your content, but some advanced features may be limited.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee on all paid plans. Contact our support team for assistance.'
    },
    {
      question: 'Can I export my data?',
      answer: 'Absolutely! Professional and higher plans include full data export capabilities. You own your data.'
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === null) return 'Custom';
    if (plan.monthlyPrice === 0) return 'Free';
    
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
    const period = isAnnual ? '/year' : '/month';
    
    return `$${price}${period}`;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === null || plan.monthlyPrice === 0) return null;
    if (!isAnnual) return null;
    
    const monthlyCost = plan.monthlyPrice * 12;
    const savings = monthlyCost - plan.annualPrice;
    const percentage = Math.round((savings / monthlyCost) * 100);
    
    return `Save ${percentage}%`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Pricing - Accio</title>
        <meta name="description" content="Choose the perfect Accio plan for your knowledge management needs." />
      </Helmet>

      {/* Hero Section */}
      <Layout.Section spacing="xl" background="primary">
        <Layout.Container size="lg" className="text-center">
          <Typography.H1 className="mb-4">
            Simple, transparent pricing
          </Typography.H1>
          <Typography.Lead className="mb-8 max-w-3xl mx-auto">
            Choose the plan that fits your knowledge management needs. 
            Start free and upgrade as you grow.
          </Typography.Lead>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Label htmlFor="billing-toggle" className={!isAnnual ? 'font-medium' : ''}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <Label htmlFor="billing-toggle" className={isAnnual ? 'font-medium' : ''}>
              Annual
            </Label>
            {isAnnual && (
              <Badge variant="secondary" className="ml-2">
                Save up to 20%
              </Badge>
            )}
          </div>
        </Layout.Container>
      </Layout.Section>

      {/* Pricing Cards */}
      <Layout.Section spacing="xl">
        <Layout.Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <Card.Root 
                key={index} 
                className={`relative p-6 ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                
                <Card.Content>
                  <div className="text-center mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                      <plan.icon className="h-8 w-8 text-primary" />
                    </div>
                    <Typography.H3 className="mb-2">{plan.name}</Typography.H3>
                    <Typography.Body className="text-sm text-muted-foreground mb-4">
                      {plan.description}
                    </Typography.Body>
                    
                    <div className="mb-2">
                      <Typography.H2 className="text-3xl font-bold">
                        {getPrice(plan)}
                      </Typography.H2>
                      {getSavings(plan) && (
                        <Badge variant="secondary" className="mt-1">
                          {getSavings(plan)}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <Typography.Body className="text-sm">{feature}</Typography.Body>
                      </div>
                    ))}
                  </div>

                  <EnhancedButton 
                    asChild 
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    <Link to={plan.href}>{plan.cta}</Link>
                  </EnhancedButton>
                </Card.Content>
              </Card.Root>
            ))}
          </div>
        </Layout.Container>
      </Layout.Section>

      {/* Features Comparison */}
      <Layout.Section spacing="xl" background="muted">
        <Layout.Container size="lg">
          <div className="text-center mb-12">
            <Typography.H2 className="mb-4">All plans include</Typography.H2>
            <Typography.Lead>
              Core features available across all pricing tiers
            </Typography.Lead>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card.Root className="p-6 text-center">
              <Card.Content>
                <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
                <Typography.H3 className="mb-2">Security & Privacy</Typography.H3>
                <Typography.Body className="text-sm text-muted-foreground">
                  End-to-end encryption, GDPR compliance, and privacy-first design
                </Typography.Body>
              </Card.Content>
            </Card.Root>

            <Card.Root className="p-6 text-center">
              <Card.Content>
                <Clock className="h-8 w-8 text-primary mx-auto mb-4" />
                <Typography.H3 className="mb-2">99.9% Uptime</Typography.H3>
                <Typography.Body className="text-sm text-muted-foreground">
                  Reliable service with redundant infrastructure and monitoring
                </Typography.Body>
              </Card.Content>
            </Card.Root>

            <Card.Root className="p-6 text-center">
              <Card.Content>
                <Infinity className="h-8 w-8 text-primary mx-auto mb-4" />
                <Typography.H3 className="mb-2">Regular Updates</Typography.H3>
                <Typography.Body className="text-sm text-muted-foreground">
                  Continuous feature improvements and AI model enhancements
                </Typography.Body>
              </Card.Content>
            </Card.Root>
          </div>
        </Layout.Container>
      </Layout.Section>

      {/* FAQ Section */}
      <Layout.Section spacing="xl">
        <Layout.Container size="md">
          <div className="text-center mb-12">
            <Typography.H2 className="mb-4">Frequently Asked Questions</Typography.H2>
            <Typography.Lead>
              Everything you need to know about our pricing
            </Typography.Lead>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card.Root key={index}>
                <Card.Content className="p-6">
                  <Typography.H3 className="mb-3">{faq.question}</Typography.H3>
                  <Typography.Body className="text-muted-foreground">
                    {faq.answer}
                  </Typography.Body>
                </Card.Content>
              </Card.Root>
            ))}
          </div>
        </Layout.Container>
      </Layout.Section>

      {/* CTA Section */}
      <Layout.Section spacing="xl" background="primary">
        <Layout.Container size="md" className="text-center">
          <Typography.H2 className="mb-4">Ready to get started?</Typography.H2>
          <Typography.Lead className="mb-8">
            Join thousands of users who are building their knowledge empire with Accio.
          </Typography.Lead>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EnhancedButton size="lg" asChild>
              <Link to="/register">Start Free Trial</Link>
            </EnhancedButton>
            <EnhancedButton variant="outline" size="lg" asChild>
              <Link to="/contact">Talk to Sales</Link>
            </EnhancedButton>
          </div>
        </Layout.Container>
      </Layout.Section>
    </div>
  );
};

export default Pricing;
