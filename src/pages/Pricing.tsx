
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with personal knowledge management.',
      features: [
        'Up to 1,000 saved items',
        'Basic AI organization',
        'Simple search',
        'Mobile app access',
        'Browser extension',
        'Email support'
      ],
      limitations: [
        'Limited search filters',
        'Basic collections only',
        'No team features'
      ],
      cta: 'Get Started Free',
      popular: false,
      ctaVariant: 'outline' as const
    },
    {
      name: 'Pro',
      price: '$12',
      period: 'per month',
      description: 'Advanced features for power users and professionals.',
      features: [
        'Unlimited saved items',
        'Advanced AI organization',
        'Semantic search',
        'Smart collections',
        'Advanced filters',
        'Offline access',
        'API access',
        'Priority support'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true,
      ctaVariant: 'default' as const
    },
    {
      name: 'Team',
      price: '$25',
      period: 'per user/month',
      description: 'Collaboration tools and advanced features for teams.',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Shared collections',
        'Admin dashboard',
        'User management',
        'Team analytics',
        'Custom integrations',
        '24/7 support'
      ],
      limitations: [],
      cta: 'Start Team Trial',
      popular: false,
      ctaVariant: 'outline' as const
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'Enterprise-grade security and custom solutions.',
      features: [
        'Everything in Team',
        'SSO integration',
        'Advanced security',
        'Custom deployment',
        'Dedicated support',
        'Training sessions',
        'Custom features',
        'SLA guarantee'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      ctaVariant: 'outline' as const
    }
  ];

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing adjustments.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your data remains accessible for 30 days after cancellation. You can export all your content during this period.'
    },
    {
      question: 'Do you offer educational discounts?',
      answer: 'Yes, we provide 50% discounts for students and educators. Contact us with your educational email for verification.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption, regular security audits, and comply with SOC 2 and GDPR standards.'
    },
    {
      question: 'Can I try Pro features for free?',
      answer: 'Yes, all new users get a 14-day free trial of Pro features. No credit card required to start.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pricing - Choose Your Perfect Plan | Accio</title>
        <meta name="description" content="Flexible pricing plans for individuals, teams, and enterprises. Start free and scale as you grow with Accio's knowledge management platform." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Zap className="h-3 w-3 mr-1" />
              Simple Pricing
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Start free and scale as you grow. All plans include core AI features, 
              with advanced capabilities available as you need them.
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-muted-foreground">Monthly</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" />
                <div className="w-12 h-6 bg-muted rounded-full shadow-inner"></div>
                <div className="absolute w-4 h-4 bg-primary rounded-full shadow top-1 left-1 transition"></div>
              </div>
              <span className="text-foreground font-medium">
                Annual 
                <Badge variant="secondary" className="ml-2">Save 20%</Badge>
              </span>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 -mt-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-xl scale-105' : 'border-border'}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="mb-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period !== 'pricing' && (
                        <span className="text-muted-foreground ml-1">/{plan.period}</span>
                      )}
                    </div>
                    <CardDescription className="text-sm">{plan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations.length > 0 && (
                      <div className="pt-4 border-t">
                        <p className="text-xs text-muted-foreground mb-2">Limitations:</p>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="text-xs text-muted-foreground">
                              • {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <Button 
                      className="w-full" 
                      variant={plan.ctaVariant}
                      size="lg"
                      asChild
                    >
                      <Link to={plan.name === 'Enterprise' ? '/contact' : '/register'}>
                        {plan.cta}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Accio?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built for the modern knowledge worker with enterprise-grade security and reliability.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-8 border-0 shadow-lg">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Check className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle className="text-xl mb-4">14-Day Free Trial</CardTitle>
                <CardDescription>
                  Try all Pro features risk-free. No credit card required to get started.
                </CardDescription>
              </Card>
              
              <Card className="text-center p-8 border-0 shadow-lg">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle className="text-xl mb-4">Enterprise Ready</CardTitle>
                <CardDescription>
                  SOC 2 compliant with enterprise-grade security, SSO, and dedicated support.
                </CardDescription>
              </Card>
              
              <Card className="text-center p-8 border-0 shadow-lg">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle className="text-xl mb-4">Always Improving</CardTitle>
                <CardDescription>
                  Regular updates with new AI features and capabilities. Your investment grows over time.
                </CardDescription>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Have questions? We have answers. Contact us if you need more help.
              </p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Still have questions? We're here to help.
              </p>
              <Button variant="outline" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Knowledge Management?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who have revolutionized their information workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/register">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Pricing;
