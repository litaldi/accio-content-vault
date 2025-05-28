
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Search, 
  Zap, 
  Shield, 
  Globe, 
  Smartphone, 
  Users, 
  BarChart3,
  BookOpen,
  Archive,
  Link as LinkIcon,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const coreFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Organization',
      description: 'Automatically categorize and tag your content using advanced machine learning algorithms.',
      benefits: ['Smart auto-tagging', 'Content categorization', 'Duplicate detection', 'Topic clustering']
    },
    {
      icon: Search,
      title: 'Semantic Search',
      description: 'Find content by describing what you remember, not just exact keywords.',
      benefits: ['Natural language queries', 'Context understanding', 'Relevant results', 'Search suggestions']
    },
    {
      icon: Zap,
      title: 'Quick Capture',
      description: 'Save content from anywhere with our browser extension and mobile apps.',
      benefits: ['One-click saving', 'Browser extension', 'Mobile apps', 'Email forwarding']
    },
    {
      icon: Archive,
      title: 'Smart Collections',
      description: 'Dynamic collections that adapt and grow based on your content and behavior.',
      benefits: ['Auto-organization', 'Custom rules', 'Smart suggestions', 'Nested collections']
    }
  ];

  const advancedFeatures = [
    {
      icon: BarChart3,
      title: 'Knowledge Analytics',
      description: 'Insights into your learning patterns and content consumption habits.',
      isNew: true
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share collections and collaborate on knowledge bases with your team.',
      isPopular: true
    },
    {
      icon: Globe,
      title: 'Offline Access',
      description: 'Access your most important content even without an internet connection.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance with industry security standards.'
    },
    {
      icon: LinkIcon,
      title: 'API Integration',
      description: 'Connect with your favorite tools and automate your knowledge workflows.'
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform Sync',
      description: 'Seamless synchronization across all your devices and platforms.'
    }
  ];

  const integrations = [
    { name: 'Chrome Extension', icon: '🌐', description: 'Save from any website' },
    { name: 'Mobile Apps', icon: '📱', description: 'iOS and Android support' },
    { name: 'Email Import', icon: '📧', description: 'Forward emails to save' },
    { name: 'Slack Bot', icon: '💬', description: 'Share and search in Slack' },
    { name: 'Notion Sync', icon: '📝', description: 'Two-way synchronization' },
    { name: 'Zapier', icon: '⚡', description: '1000+ app integrations' }
  ];

  return (
    <>
      <Helmet>
        <title>Features - AI-Powered Knowledge Management | Accio</title>
        <meta name="description" content="Discover Accio's powerful features: AI organization, semantic search, quick capture, and enterprise-grade security for knowledge management." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Zap className="h-3 w-3 mr-1" />
              Powerful Features
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Everything You Need for Knowledge Management
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              From AI-powered organization to enterprise security, Accio provides all the tools 
              you need to transform scattered information into organized intelligence.
            </p>
            <Button size="lg" asChild>
              <Link to="/register">Try All Features Free</Link>
            </Button>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Core Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The foundation of intelligent knowledge management, designed for modern professionals.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {coreFeatures.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Advanced Capabilities</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Enterprise-grade features that scale with your growing knowledge needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advancedFeatures.map((feature, index) => (
                <Card key={index} className="text-center relative">
                  {feature.isNew && (
                    <Badge className="absolute -top-2 -right-2 bg-green-500">New</Badge>
                  )}
                  {feature.isPopular && (
                    <Badge variant="secondary" className="absolute -top-2 -right-2">Popular</Badge>
                  )}
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Seamless Integrations</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Connect Accio with your existing tools and workflows for a unified experience.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {integrations.map((integration, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-3">{integration.icon}</div>
                  <h3 className="font-semibold mb-2">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" asChild>
                <Link to="/contact">Request Custom Integration</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">See Accio in Action</h2>
            <p className="text-xl mb-8 opacity-90">
              Experience the power of AI-driven knowledge management with our interactive demo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/register">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/contact">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Features;
