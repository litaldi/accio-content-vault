
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Search, Zap, Shield, Users, BookOpen, Tag, Globe, Smartphone, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesShowcase = () => {
  const primaryFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Organization',
      description: 'Automatically categorize and tag your content with advanced machine learning algorithms that understand context and meaning.',
      benefits: ['Smart auto-tagging', 'Content categorization', 'Intelligent insights'],
      isNew: true
    },
    {
      icon: Search,
      title: 'Semantic Search',
      description: 'Find content by describing what you remember, not just keywords. Our AI understands intent and context.',
      benefits: ['Natural language queries', 'Context-aware results', 'Smart suggestions'],
      isPopular: true
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Access your knowledge instantly with our optimized search engine and intelligent caching system.',
      benefits: ['Sub-second search', 'Real-time sync', 'Offline access']
    }
  ];

  const additionalFeatures = [
    { icon: Shield, title: 'Enterprise Security', description: 'Bank-level encryption and compliance' },
    { icon: Users, title: 'Team Collaboration', description: 'Share knowledge seamlessly with your team' },
    { icon: BookOpen, title: 'Smart Collections', description: 'Auto-organize content into meaningful groups' },
    { icon: Tag, title: 'Dynamic Tagging', description: 'AI-powered tags that evolve with your content' },
    { icon: Globe, title: 'Universal Capture', description: 'Save from any website or platform' },
    { icon: Smartphone, title: 'Mobile Ready', description: 'Access your knowledge anywhere, anytime' },
    { icon: Cloud, title: 'Cloud Sync', description: 'Your data synced across all devices' }
  ];

  return (
    <section className="section-spacing bg-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <Badge variant="outline" className="mb-4">
            Powerful Features
          </Badge>
          <h2 className="text-4xl font-bold mb-6">Everything you need to manage knowledge</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built for modern professionals who need to organize, search, and leverage information efficiently.
          </p>
        </div>

        {/* Primary Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {primaryFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background via-background to-accent/5"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex gap-2">
                    {feature.isNew && (
                      <Badge variant="secondary" className="text-xs">New</Badge>
                    )}
                    {feature.isPopular && (
                      <Badge variant="outline" className="text-xs">Popular</Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
          {additionalFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" asChild className="text-lg px-8 py-6">
            <Link to="/features">
              Explore All Features
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
