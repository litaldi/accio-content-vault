import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProfessionalNavigation from '@/components/navigation/ProfessionalNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, Sparkles, Zap } from 'lucide-react';

const Upgrade = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Save up to 100 items",
        "3 collections",
        "Basic search",
        "Web capture",
        "Mobile access"
      ],
      cta: "Start Free",
      popular: false,
      icon: Sparkles
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      description: "For serious knowledge workers",
      features: [
        "Unlimited items",
        "Unlimited collections",
        "AI-powered search",
        "Advanced analytics",
        "Priority support",
        "API access",
        "Export options"
      ],
      cta: "Start Pro Trial",
      popular: true,
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Upgrade - Accio</title>
        <meta name="description" content="Upgrade your Accio plan for advanced features and unlimited storage" />
      </Helmet>
      
      <ProfessionalNavigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <Badge variant="outline" className="mb-6">Upgrade</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Unlock <span className="text-primary">Premium Features</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Supercharge your knowledge management with advanced tools and unlimited storage.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2">
              {plans.map((plan, index) => (
                <Card key={index} className={`card-elevated relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Crown className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-6">
                    <div className={`w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center ${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                      <plan.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <CardDescription className="mt-2">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                      asChild
                    >
                      <a href="/register">{plan.cta}</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Unlock All the Benefits</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get the most out of Accio with unlimited storage, AI-powered features, and priority support.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Unlimited Storage</CardTitle>
                  <CardDescription>Save as much content as you need without limits.</CardDescription>
                </CardHeader>
                <CardContent>
                  Never worry about running out of space for your knowledge.
                </CardContent>
              </Card>
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>AI-Powered Search</CardTitle>
                  <CardDescription>Find what you need instantly with intelligent search.</CardDescription>
                </CardHeader>
                <CardContent>
                  Our AI understands the meaning of your content, not just the words.
                </CardContent>
              </Card>
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Priority Support</CardTitle>
                  <CardDescription>Get faster help from our dedicated support team.</CardDescription>
                </CardHeader>
                <CardContent>
                  We're here to help you succeed with Accio.
                </CardContent>
              </Card>
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>Track your learning progress and knowledge patterns.</CardDescription>
                </CardHeader>
                <CardContent>
                  See how you're growing your knowledge and identify areas for improvement.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Upgrade?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who have transformed their knowledge management
            </p>
            <Button size="lg" asChild>
              <a href="/register">
                <Sparkles className="h-5 w-5 mr-2" />
                Get Started Now
              </a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Upgrade;
