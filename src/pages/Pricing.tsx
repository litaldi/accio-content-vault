
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Users, Shield } from 'lucide-react';
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
        'Browser extension',
        'Community support'
      ],
      limitations: [
        'Limited storage',
        'Basic categorization',
        'No team features'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      price: '$12',
      period: 'per month',
      description: 'Advanced features for power users',
      features: [
        'Unlimited saved items',
        'Advanced AI organization',
        'Semantic search',
        'Offline access',
        'Custom tags & categories',
        'Export capabilities',
        'Priority support',
        'API access'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Team',
      price: '$25',
      period: 'per user/month',
      description: 'Collaboration features for teams',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Shared collections',
        'Advanced permissions',
        'Team analytics',
        'SSO integration',
        'Admin dashboard',
        'Dedicated support'
      ],
      limitations: [],
      cta: 'Start Team Trial',
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
      answer: 'We accept all major credit cards, PayPal, and offer annual billing discounts.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pricing - Choose Your Plan | Accio</title>
        <meta name="description" content="Choose the perfect Accio plan for your knowledge management needs. From free individual plans to enterprise team solutions." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Zap className="h-3 w-3 mr-1" />
              Pricing Plans
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your knowledge management needs. Start free and upgrade as you grow.
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
                  
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                      asChild
                    >
                      <Link to="/register">{plan.cta}</Link>
                    </Button>
                    
                    <div>
                      <h4 className="font-semibold mb-3">What's included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">All Plans Include</h2>
              <p className="text-lg text-muted-foreground">
                Core features available across all subscription tiers.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Enterprise Security</h3>
                <p className="text-sm text-muted-foreground">
                  Bank-level encryption and SOC 2 compliance for all users.
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced machine learning for content organization.
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Cross-Platform</h3>
                <p className="text-sm text-muted-foreground">
                  Access your knowledge from any device, anywhere.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Get answers to common questions about our pricing and plans.
              </p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
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
              Join thousands of professionals who have transformed their knowledge management with Accio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/register">Start Free Trial</Link>
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
