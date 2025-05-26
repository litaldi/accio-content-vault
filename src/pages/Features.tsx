
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ImprovedMainNavigation from '@/components/navigation/ImprovedMainNavigation';
import ImprovedFooter from '@/components/layout/ImprovedFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Search, 
  Sparkles, 
  BarChart3, 
  BookOpen, 
  Shield, 
  Zap,
  Globe,
  Smartphone,
  Brain,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();

  const coreFeatures = [
    {
      icon: Save,
      title: 'One-Click Save',
      description: 'Save anything from any website instantly with our browser extension or mobile app.',
      benefits: ['Browser extension', 'Mobile apps', 'Email forwarding', 'API access']
    },
    {
      icon: Brain,
      title: 'AI Organization',
      description: 'Our AI automatically categorizes and tags your content for effortless organization.',
      benefits: ['Auto-tagging', 'Smart folders', 'Content analysis', 'Duplicate detection']
    },
    {
      icon: Search,
      title: 'Intelligent Search',
      description: 'Find anything instantly with semantic search that understands context and meaning.',
      benefits: ['Natural language search', 'Full-text search', 'Visual search', 'Filter & sort']
    },
    {
      icon: BarChart3,
      title: 'Knowledge Analytics',
      description: 'Track your learning patterns and discover insights about your knowledge consumption.',
      benefits: ['Usage analytics', 'Learning insights', 'Content trends', 'Progress tracking'],
      badge: 'Pro'
    }
  ];

  const additionalFeatures = [
    {
      icon: BookOpen,
      title: 'Smart Collections',
      description: 'Create dynamic collections that automatically organize related content.',
    },
    {
      icon: Globe,
      title: 'Universal Access',
      description: 'Access your knowledge from anywhere with our web, mobile, and desktop apps.',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is encrypted and secure. You own your knowledge, not us.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built for speed with instant sync and sub-second search results.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Full-featured mobile apps for iOS and Android with offline access.',
    },
    {
      icon: Sparkles,
      title: 'AI Insights',
      description: 'Get personalized recommendations and discover connections in your knowledge.',
      badge: 'Pro'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Features - Accio Knowledge Engine</title>
        <meta name="description" content="Discover all the powerful features that make Accio the ultimate knowledge management platform. Save, organize, and find anything instantly with AI." />
      </Helmet>

      <ImprovedMainNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-blue-500/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Powerful Features for
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                Knowledge Workers
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Everything you need to transform scattered information into organized intelligence. 
              Save anything, find everything, achieve more.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-lg px-8 py-6"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The essential tools that make knowledge management effortless and powerful.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {coreFeatures.map((feature, index) => (
                <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
                  {feature.badge && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500">
                      {feature.badge}
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
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

        {/* Additional Features Grid */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A complete suite of tools designed to enhance your knowledge workflow.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalFeatures.map((feature, index) => (
                <Card key={index} className="relative text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {feature.badge && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500">
                      {feature.badge}
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="mx-auto p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription className="leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Knowledge Management?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have revolutionized their productivity with Accio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/register')} 
                className="bg-white text-primary hover:bg-white/95 text-lg px-8 py-4 font-semibold"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/demo')} 
                className="border-white/50 text-white hover:bg-white/10 text-lg px-8 py-4 font-semibold"
              >
                Watch Demo
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-6">
              ✅ Free forever plan • ✅ No credit card required • ✅ Setup in 30 seconds
            </p>
          </div>
        </section>
      </main>

      <ImprovedFooter />
    </div>
  );
};

export default Features;
