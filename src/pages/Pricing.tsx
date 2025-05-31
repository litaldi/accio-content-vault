
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Shield, Users, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for individuals getting started with knowledge management',
      icon: Zap,
      features: [
        '1,000 documents',
        'Basic AI organization',
        'Search & discovery',
        'Web app access',
        'Email support',
        '1 GB storage'
      ],
      limitations: [
        'Limited integrations',
        'Basic analytics'
      ],
      cta: 'Get Started Free',
      popular: false,
      highlight: false
    },
    {
      name: 'Professional',
      price: '$12',
      period: 'per month',
      description: 'Ideal for professionals and power users who need advanced features',
      icon: Star,
      features: [
        'Unlimited documents',
        'Advanced AI features',
        'Semantic search',
        'All integrations',
        'Priority support',
        '100 GB storage',
        'Custom collections',
        'Analytics dashboard',
        'Offline access',
        'API access'
      ],
      limitations: [],
      cta: 'Start Free Trial',
      popular: true,
      highlight: true
    },
    {
      name: 'Team',
      price: '$24',
      period: 'per user/month',
      description: 'Built for teams who need collaboration and shared knowledge bases',
      icon: Users,
      features: [
        'Everything in Professional',
        'Team collaboration',
        'Shared workspaces',
        'Admin controls',
        'Team analytics',
        '500 GB storage',
        'Advanced permissions',
        'Team training',
        'Dedicated support'
      ],
      limitations: [],
      cta: 'Start Team Trial',
      popular: false,
      highlight: false
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large organizations with custom requirements and compliance needs',
      icon: Crown,
      features: [
        'Everything in Team',
        'Unlimited storage',
        'Custom integrations',
        'SSO & SAML',
        'Advanced security',
        'Compliance tools',
        'Custom AI training',
        'Dedicated CSM',
        'SLA guarantee',
        'On-premise option'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      highlight: false
    }
  ];

  const faqs = [
    {
      question: 'Can I change plans at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing adjustments.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'You can export all your data at any time. After cancellation, you\'ll have 30 days to export your data before it\'s permanently deleted.'
    },
    {
      question: 'Do you offer educational discounts?',
      answer: 'Yes! We offer 50% discounts for students and educational institutions. Contact us with your educational email for verification.'
    },
    {
      question: 'Is there a free trial for paid plans?',
      answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required to start your trial.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and can arrange invoicing for annual enterprise plans.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pricing - Accio Knowledge Management Plans</title>
        <meta name="description" content="Choose the perfect Accio plan for your knowledge management needs. From free starter to enterprise solutions with custom AI training." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Simple, Transparent{' '}
              <span className="text-primary">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Choose the plan that fits your needs. Start free and scale as you grow. 
              No hidden fees, no surprises.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge variant="outline" className="text-sm">
                ✨ 14-day free trial on all paid plans
              </Badge>
              <Badge variant="outline" className="text-sm">
                🔒 Cancel anytime
              </Badge>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-4 gap-8">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${
                  plan.highlight 
                    ? 'border-primary shadow-xl scale-105 lg:scale-110' 
                    : 'border-border shadow-lg hover:shadow-xl'
                } transition-all duration-300 overflow-hidden`}>
                  {plan.popular && (
                    <Badge className="absolute top-4 left-1/2 -translate-x-1/2 bg-primary">
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader className={`text-center ${plan.highlight ? 'pt-12' : 'pt-8'}`}>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
                      plan.highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                    }`}>
                      <plan.icon className="h-6 w-6" />
                    </div>
                    
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    
                    <div className="py-4">
                      <div className="text-3xl font-bold">
                        {plan.price}
                        {plan.price !== 'Free' && plan.price !== 'Custom' && (
                          <span className="text-base font-normal text-muted-foreground">
                            /{plan.period}
                          </span>
                        )}
                      </div>
                      {plan.price === 'Free' && (
                        <div className="text-sm text-muted-foreground">{plan.period}</div>
                      )}
                      {plan.price === 'Custom' && (
                        <div className="text-sm text-muted-foreground">{plan.period}</div>
                      )}
                    </div>
                    
                    <CardDescription className="text-sm">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <Button 
                      className={`w-full ${plan.highlight ? '' : 'variant-outline'}`}
                      variant={plan.highlight ? 'default' : 'outline'}
                      size="lg"
                      asChild
                    >
                      <Link to={plan.name === 'Enterprise' ? '/contact' : '/register'}>
                        {plan.cta}
                      </Link>
                    </Button>
                    
                    <div>
                      <h4 className="font-medium mb-3">What's included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
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

        {/* Enterprise Features */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Enterprise Features</h2>
              <p className="text-lg text-muted-foreground">
                Advanced capabilities for large organizations
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg text-center">
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
                  <CardTitle>Advanced Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    SOC 2 compliance, encryption at rest and in transit, 
                    advanced audit logs, and custom security policies.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg text-center">
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                  <CardTitle>Custom Integrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Build custom integrations with your existing tools, 
                    API access, and dedicated technical support.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg text-center">
                <CardHeader>
                  <Crown className="h-8 w-8 text-primary mx-auto mb-4" />
                  <CardTitle>Dedicated Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Dedicated customer success manager, priority support, 
                    and custom training for your team.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about our pricing
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-0 shadow-lg">
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

        {/* CTA */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who have transformed their knowledge management. 
              Start your free trial today.
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
