
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import EnhancedNavigation from '@/components/navigation/EnhancedNavigation';
import ImprovedFooter from '@/components/Footer/ImprovedFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Search, 
  Tags, 
  Share2, 
  FileText, 
  BarChart3,
  Shield,
  Smartphone,
  Globe,
  ArrowRight
} from 'lucide-react';

const Features = () => {
  const mainFeatures = [
    {
      icon: Zap,
      title: 'AI-Powered Organization',
      description: 'Our AI automatically tags, categorizes, and organizes your content so you can find what you need instantly.',
      benefits: ['Smart auto-tagging', 'Content categorization', 'Intelligent suggestions']
    },
    {
      icon: Search,
      title: 'Powerful Search',
      description: 'Find anything in your knowledge base with our advanced search that understands context and meaning.',
      benefits: ['Natural language search', 'Filter by tags/date', 'Full-text search']
    },
    {
      icon: Tags,
      title: 'Smart Tagging System',
      description: 'Organize content with intelligent tags that help you build connections between related information.',
      benefits: ['Auto-suggested tags', 'Custom tag creation', 'Tag relationships']
    },
    {
      icon: Share2,
      title: 'Team Collaboration',
      description: 'Share collections and collaborate with your team on research and knowledge gathering.',
      benefits: ['Shared collections', 'Team workspaces', 'Permission controls']
    },
    {
      icon: FileText,
      title: 'Multiple Content Types',
      description: 'Save articles, PDFs, images, notes, and more in one unified knowledge management system.',
      benefits: ['Web articles', 'PDF documents', 'Images & screenshots']
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Track your knowledge growth and discover patterns in your learning and research habits.',
      benefits: ['Usage analytics', 'Content insights', 'Learning patterns']
    }
  ];

  const additionalFeatures = [
    { icon: Shield, title: 'Enterprise Security', description: 'Bank-level encryption and security' },
    { icon: Smartphone, title: 'Mobile Access', description: 'Access your knowledge anywhere' },
    { icon: Globe, title: 'Web Clipper', description: 'Save content from any website' }
  ];

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Helmet>
        <title>Features - Accio</title>
        <meta name="description" content="Discover all the powerful features that make Accio the ultimate knowledge management solution." />
      </Helmet>
      
      <EnhancedNavigation />
      
      <main className="flex-grow w-full" role="main">
        {/* Hero Section */}
        <section className="py-20 lg:py-24 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                Powerful Features for Modern Knowledge Management
              </h1>
              <p className="text-xl leading-relaxed mb-8 text-muted-foreground">
                Everything you need to capture, organize, and rediscover your knowledge with AI-powered intelligence.
              </p>
              <Button asChild size="lg">
                <Link to="/register">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Core Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Built for professionals who value their time and knowledge
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainFeatures.map((feature, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
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

        {/* Additional Features */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Everything You Need
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {additionalFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Transform Your Knowledge Management?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have already discovered the power of organized knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/register">Get Started Free</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Schedule Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <ImprovedFooter />
    </div>
  );
};

export default Features;
