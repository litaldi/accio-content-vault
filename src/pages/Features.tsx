
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Search, 
  Zap, 
  Shield, 
  Users, 
  Smartphone, 
  Globe, 
  BarChart3,
  ArrowRight,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Organization',
      description: 'Automatically categorize and tag your content using advanced machine learning algorithms.',
      details: [
        'Smart content categorization',
        'Automatic tagging and metadata',
        'Context-aware organization',
        'Learning from your preferences'
      ]
    },
    {
      icon: Search,
      title: 'Semantic Search',
      description: 'Find content by describing what you remember, not just exact keywords.',
      details: [
        'Natural language queries',
        'Context-based results',
        'Smart content discovery',
        'Fuzzy matching capabilities'
      ]
    },
    {
      icon: Zap,
      title: 'Quick Capture',
      description: 'Save content from anywhere with our browser extension and mobile apps.',
      details: [
        'One-click browser extension',
        'Mobile app for iOS & Android',
        'Email integration',
        'API for custom workflows'
      ]
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance with industry security standards.',
      details: [
        'End-to-end encryption',
        'SOC 2 Type II compliance',
        'GDPR & CCPA compliant',
        'Regular security audits'
      ]
    }
  ];

  const additionalFeatures = [
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share collections and collaborate with your team members.'
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform Sync',
      description: 'Access your knowledge base from any device, anywhere.'
    },
    {
      icon: Globe,
      title: 'Offline Access',
      description: 'Continue working even without an internet connection.'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Discover patterns in your knowledge consumption and creation.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Features - AI-Powered Knowledge Management | Accio</title>
        <meta name="description" content="Discover Accio's powerful features: AI organization, semantic search, quick capture, enterprise security, and more. Transform how you manage knowledge." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Zap className="h-3 w-3 mr-1" />
              Platform Features
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Everything You Need for Knowledge Management
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              From AI-powered organization to enterprise security, Accio provides all the tools 
              you need to transform scattered information into organized intelligence.
            </p>
            <Button size="lg" asChild>
              <Link to="/register">
                Try All Features Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Core Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the future of information organization with AI that understands context 
                and learns your preferences.
              </p>
            </div>

            <div className="space-y-24">
              {mainFeatures.map((feature, index) => (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center">
                          <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`bg-gradient-to-br from-primary/5 to-blue-600/5 rounded-2xl p-8 text-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <feature.icon className="h-32 w-32 text-primary mx-auto mb-6" />
                    <div className="bg-background/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        Interactive demo placeholder for {feature.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Additional Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                More powerful features to enhance your knowledge management experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {additionalFeatures.map((feature, index) => (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Seamless Integration</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Connect Accio with your favorite tools and platforms for a unified workflow.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-8">
                <div className="text-4xl mb-4">🌐</div>
                <CardTitle className="text-xl mb-4">Browser Extensions</CardTitle>
                <CardDescription>
                  Save content from any website with one click. Available for Chrome, Firefox, Safari, and Edge.
                </CardDescription>
              </Card>
              
              <Card className="text-center p-8">
                <div className="text-4xl mb-4">📱</div>
                <CardTitle className="text-xl mb-4">Mobile Apps</CardTitle>
                <CardDescription>
                  Native iOS and Android apps for capturing and accessing your knowledge on the go.
                </CardDescription>
              </Card>
              
              <Card className="text-center p-8">
                <div className="text-4xl mb-4">🔗</div>
                <CardTitle className="text-xl mb-4">API Access</CardTitle>
                <CardDescription>
                  Build custom integrations with our comprehensive REST API and webhooks.
                </CardDescription>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience These Features?</h2>
            <p className="text-xl mb-8 opacity-90">
              Start your free trial today and discover how Accio can transform your knowledge management workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/register">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/how-it-works">See How It Works</Link>
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-6">
              No credit card required. All features included in free trial.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Features;
