
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import EnhancedNavigation from '@/components/navigation/EnhancedNavigation';
import ImprovedFooter from '@/components/Footer/ImprovedFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Star } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for individuals getting started',
      popular: false,
      features: [
        '500 saved items',
        'Basic AI tagging',
        'Web clipper',
        'Mobile app access',
        'Basic search',
        'Email support'
      ],
      cta: 'Get Started Free',
      ctaVariant: 'outline' as const
    },
    {
      name: 'Pro',
      price: '$9',
      period: 'per month',
      description: 'For professionals who need more power',
      popular: true,
      features: [
        'Unlimited saved items',
        'Advanced AI organization',
        'Smart collections',
        'Team collaboration (5 members)',
        'Advanced search & filters',
        'Priority support',
        'API access',
        'Custom tags'
      ],
      cta: 'Start Free Trial',
      ctaVariant: 'default' as const
    },
    {
      name: 'Team',
      price: '$24',
      period: 'per month',
      description: 'For teams that work better together',
      popular: false,
      features: [
        'Everything in Pro',
        'Unlimited team members',
        'Team workspaces',
        'Admin controls',
        'Advanced analytics',
        'SSO integration',
        'Custom branding',
        'Dedicated support'
      ],
      cta: 'Contact Sales',
      ctaVariant: 'outline' as const
    }
  ];

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your data is always yours. You can export everything before canceling, and we keep your data for 30 days after cancellation.'
    },
    {
      question: 'Do you offer educational discounts?',
      answer: 'Yes! Students and educators get 50% off Pro plans. Contact us with your educational email for verification.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Helmet>
        <title>Pricing - Accio</title>
        <meta name="description" content="Simple, transparent pricing for individuals and teams. Start free and upgrade when you're ready." />
      </Helmet>
      
      <EnhancedNavigation />
      
      <main className="flex-grow w-full" role="main">
        {/* Hero Section */}
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl leading-relaxed mb-8 text-muted-foreground">
                Start free and upgrade when you're ready. No hidden fees, no surprises.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  30-day free trial
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Cancel anytime
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  No setup fees
                </div>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-2 border-primary shadow-lg scale-105' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-muted-foreground ml-1">/{plan.period}</span>}
                    </div>
                    <p className="text-muted-foreground mt-2">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      asChild 
                      variant={plan.ctaVariant} 
                      className="w-full"
                      size="lg"
                    >
                      <Link to={plan.name === 'Team' ? '/contact' : '/register'}>
                        {plan.cta}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
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
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have transformed their knowledge management with Accio.
              </p>
              <Button asChild size="lg">
                <Link to="/register">
                  Start Your Free Trial
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <ImprovedFooter />
    </div>
  );
};

export default Pricing;
