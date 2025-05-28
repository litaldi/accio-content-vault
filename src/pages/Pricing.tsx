
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Star, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for individuals getting started',
      features: [
        'Up to 1,000 saved items',
        'Basic AI organization',
        'Standard search',
        'Mobile apps',
        'Email support'
      ],
      limitations: [
        'Advanced AI features',
        'Team collaboration',
        'API access',
        'Priority support'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      price: '$12',
      period: 'per month',
      description: 'For professionals who need more power',
      features: [
        'Unlimited saved items',
        'Advanced AI organization',
        'Semantic search',
        'Browser extension',
        'Offline access',
        'Priority support',
        'Export capabilities'
      ],
      limitations: [
        'Team features',
        'Admin controls'
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Team',
      price: '$25',
      period: 'per user/month',
      description: 'For teams that share knowledge',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Shared collections',
        'Admin dashboard',
        'User management',
        'API access',
        'Custom integrations',
        'Dedicated support'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! Pro and Team plans come with a 14-day free trial. No credit card required.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
    },
    {
      question: 'Do you offer discounts for students or nonprofits?',
      answer: 'Yes, we offer 50% discounts for students and qualified nonprofit organizations.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pricing - Choose Your Plan | Accio</title>
        <meta name="description" content="Choose the perfect Accio plan for your knowledge management needs. Start free or unlock advanced AI features with our Pro and Team plans." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <Badge variant="secondary" className="mb-6">
              <DollarSign className="h-3 w-3 mr-1" />
              Simple Pricing
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Choose Your Knowledge Management Plan
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Start free and scale as you grow. All plans include our core AI features with no setup fees or hidden costs.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-xl scale-105' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-2 mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                      asChild
                    >
                      <Link to={plan.name === 'Free' ? '/register' : '/contact'}>
                        {plan.cta}
                      </Link>
                    </Button>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">Included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      {plan.limitations.length > 0 && (
                        <>
                          <h4 className="font-medium text-muted-foreground pt-4">Not included:</h4>
                          <ul className="space-y-2">
                            {plan.limitations.map((limitation, limitationIndex) => (
                              <li key={limitationIndex} className="flex items-center text-sm text-muted-foreground">
                                <X className="h-4 w-4 mr-3 flex-shrink-0" />
                                {limitation}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
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
              <h2 className="text-3xl font-bold mb-4">All Plans Include</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Core features that make Accio the smartest choice for knowledge management.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-8">
                <div className="text-4xl mb-4">🔒</div>
                <CardTitle className="text-xl mb-4">Enterprise Security</CardTitle>
                <CardDescription>
                  End-to-end encryption, SOC 2 compliance, and enterprise-grade security for all your data.
                </CardDescription>
              </Card>
              
              <Card className="text-center p-8">
                <div className="text-4xl mb-4">🌍</div>
                <CardTitle className="text-xl mb-4">Global Sync</CardTitle>
                <CardDescription>
                  Access your knowledge base from anywhere with real-time synchronization across all devices.
                </CardDescription>
              </Card>
              
              <Card className="text-center p-8">
                <div className="text-4xl mb-4">📈</div>
                <CardTitle className="text-xl mb-4">Analytics</CardTitle>
                <CardDescription>
                  Gain insights into your knowledge patterns and discover optimization opportunities.
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
                Everything you need to know about our pricing and plans.
              </p>
            </div>
            
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <CardTitle className="text-lg mb-3">{faq.question}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {faq.answer}
                  </CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who trust Accio with their knowledge management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/register">Start Free Today</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Pricing;
