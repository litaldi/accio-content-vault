
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ImprovedMainNavigation from '@/components/navigation/ImprovedMainNavigation';
import ImprovedFooter from '@/components/layout/ImprovedFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with basic knowledge management.',
      features: [
        'Save up to 100 items per month',
        'Basic search and organization',
        'Web app access',
        'Mobile apps (iOS & Android)',
        'Community support',
        'Basic export options'
      ],
      cta: 'Get Started Free',
      popular: false,
      color: 'border-border'
    },
    {
      name: 'Pro',
      price: '$12',
      period: 'per month',
      description: 'Advanced features for power users and professionals.',
      features: [
        'Unlimited saves',
        'AI-powered organization',
        'Advanced search & filters',
        'Knowledge analytics',
        'Browser extension',
        'Priority support',
        'Custom tags and collections',
        'Bulk import/export',
        'API access',
        'Team collaboration (up to 5 users)'
      ],
      cta: 'Start Pro Trial',
      popular: true,
      color: 'border-primary ring-2 ring-primary/20'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'Advanced features and support for larger organizations.',
      features: [
        'Everything in Pro',
        'Unlimited team members',
        'Advanced admin controls',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantee',
        'Custom training sessions',
        'Single Sign-On (SSO)',
        'Advanced security features',
        'On-premise deployment option'
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'border-border'
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'You retain access to all your data. You can export everything before your subscription ends, and we keep your data for 30 days after cancellation.'
    },
    {
      question: 'Do you offer student discounts?',
      answer: 'Yes! Students get 50% off Pro plans with a valid student email address. Contact support with your .edu email for verification.'
    },
    {
      question: 'Is there a free trial for Pro?',
      answer: 'Absolutely! You get a 14-day free trial of Pro with no credit card required. You can cancel anytime during the trial.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Pricing - Accio Knowledge Engine</title>
        <meta name="description" content="Choose the perfect plan for your knowledge management needs. Start free or unlock advanced features with Pro. Enterprise solutions available." />
      </Helmet>

      <ImprovedMainNavigation />

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
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Check className="h-4 w-4 text-green-500" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="h-4 w-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="h-4 w-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={cn(
                    "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
                    plan.color,
                    plan.popular && "scale-105 shadow-xl"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-blue-600 text-white text-center py-2 text-sm font-medium">
                      <Sparkles className="inline h-4 w-4 mr-1" />
                      Most Popular
                    </div>
                  )}
                  
                  <CardHeader className={cn("text-center", plan.popular && "pt-12")}>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="py-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period !== 'contact us' && (
                        <span className="text-muted-foreground ml-1">/{plan.period}</span>
                      )}
                    </div>
                    <CardDescription className="text-base">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <Button 
                      className={cn(
                        "w-full",
                        plan.popular 
                          ? "bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                          : ""
                      )}
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => {
                        if (plan.name === 'Enterprise') {
                          navigate('/contact');
                        } else {
                          navigate('/register');
                        }
                      }}
                    >
                      {plan.name === 'Pro' && <Zap className="mr-2 h-4 w-4" />}
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <Separator />

                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about our pricing and plans.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Supercharge Your Knowledge Management?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their productivity with Accio.
              Start free today!
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/register')} 
              className="bg-white text-primary hover:bg-white/95 text-lg px-8 py-4 font-semibold"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm opacity-75 mt-6">
              No credit card required • Cancel anytime • Full data export
            </p>
          </div>
        </section>
      </main>

      <ImprovedFooter />
    </div>
  );
};

export default Pricing;
