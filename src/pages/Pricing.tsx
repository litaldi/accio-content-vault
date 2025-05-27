
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Check, 
  Star, 
  Zap, 
  Users, 
  Building,
  ArrowRight,
  Sparkles,
  Crown,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

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
      buttonText: 'Start Free',
      buttonVariant: 'outline' as const
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
      buttonText: 'Start 7-Day Trial',
      buttonVariant: 'default' as const
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
      additionalInfo: '$3 per additional user'
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
        'Jira & Slack integration',
        'SOC 2 compliance',
        'SLA guarantee',
        'Dedicated support',
        'Custom training',
        'On-premise deployment'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outline' as const
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
        <title>Pricing - Accio</title>
        <meta name="description" content="Choose the perfect plan for your knowledge management needs. Start free and scale as you grow." />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6">
            <Star className="h-3 w-3 mr-1" />
            Transparent Pricing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="text-primary">Perfect Plan</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Start free and scale as your knowledge grows. No hidden fees, cancel anytime.
          </p>

          {/* Annual/Monthly Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span className={`text-sm ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="ml-2">
                Save up to 17%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan) => {
            const savings = getSavings(plan);
            return (
              <Card 
                key={plan.id} 
                className={`relative ${plan.popular ? 'ring-2 ring-primary scale-105' : ''} hover:shadow-lg transition-all duration-200`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className={`w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center ${
                    plan.popular ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                  }`}>
                    <plan.icon className="h-6 w-6" />
                  </div>
                  
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-center">
                      {typeof getPrice(plan) === 'string' ? (
                        <span className="text-3xl font-bold">{getPrice(plan)}</span>
                      ) : (
                        <>
                          <span className="text-sm">$</span>
                          <span className="text-4xl font-bold">{getPrice(plan)}</span>
                        </>
                      )}
                    </div>
                    <span className="text-muted-foreground text-sm">{getPeriod(plan)}</span>
                    {savings && (
                      <Badge variant="outline" className="mt-2 text-green-600 border-green-200">
                        {savings}
                      </Badge>
                    )}
                    {plan.additionalInfo && (
                      <p className="text-xs text-muted-foreground mt-2">{plan.additionalInfo}</p>
                    )}
                  </div>
                  
                  <CardDescription className="mt-4">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <Button 
                    className="w-full" 
                    variant={plan.buttonVariant}
                    size="lg"
                    asChild
                  >
                    <Link to={plan.id === 'enterprise' ? '/contact' : '/register'}>
                      {plan.buttonText}
                    </Link>
                  </Button>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Compare All Features</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Features</th>
                  <th className="text-center p-4 font-medium">Free</th>
                  <th className="text-center p-4 font-medium">Pro</th>
                  <th className="text-center p-4 font-medium">Team</th>
                  <th className="text-center p-4 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'AI Actions per month', free: '100', pro: 'Unlimited', team: 'Unlimited', enterprise: 'Unlimited' },
                  { feature: 'Content Saves', free: 'Basic', pro: 'Unlimited', team: 'Unlimited', enterprise: 'Unlimited' },
                  { feature: 'Collections', free: '3', pro: 'Unlimited', team: 'Unlimited', enterprise: 'Unlimited' },
                  { feature: 'Team Members', free: '1', pro: '1', team: '10', enterprise: 'Unlimited' },
                  { feature: 'AI Summarization', free: '✗', pro: '✓', team: '✓', enterprise: '✓' },
                  { feature: 'Export to Notion/Docs', free: '✗', pro: '✓', team: '✓', enterprise: '✓' },
                  { feature: 'API Access', free: '✗', pro: '✓', team: '✓', enterprise: '✓' },
                  { feature: 'Priority Support', free: '✗', pro: '✓', team: '✓', enterprise: '✓' },
                  { feature: 'SOC 2 Compliance', free: '✗', pro: '✗', team: '✗', enterprise: '✓' },
                ].map((row, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td className="p-4 text-center">{row.free}</td>
                    <td className="p-4 text-center">{row.pro}</td>
                    <td className="p-4 text-center">{row.team}</td>
                    <td className="p-4 text-center">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Can I change plans anytime?</h4>
                <p className="text-muted-foreground text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Is there a free trial?</h4>
                <p className="text-muted-foreground text-sm">Yes! Pro and Team plans include a 7-day free trial with full access to all features.</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Need Help Choosing?</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">For individuals</h4>
                <p className="text-muted-foreground text-sm">Start with Free, upgrade to Pro when you need unlimited AI actions and advanced features.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">For teams</h4>
                <p className="text-muted-foreground text-sm">Choose Team for collaboration features, or Enterprise for large organizations with compliance needs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center bg-muted/30 rounded-lg p-8">
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium">99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">30-Day Money Back</span>
            </div>
          </div>
          <p className="text-muted-foreground">
            Trusted by thousands of professionals and teams worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
