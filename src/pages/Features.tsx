
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { 
  Search, 
  BookOpen, 
  Archive, 
  Tags, 
  Smartphone, 
  Shield, 
  Zap, 
  Users, 
  BarChart3,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  benefits: string[];
  category: 'Core' | 'Advanced' | 'Pro';
}

const Features: React.FC = () => {
  const { preferences } = useAccessibility();

  const features: Feature[] = [
    {
      icon: Search,
      title: 'Intelligent Search',
      description: 'Find your content instantly with powerful AI-powered search capabilities.',
      benefits: ['Full-text search', 'Smart filtering', 'Quick results', 'Search history'],
      category: 'Core'
    },
    {
      icon: BookOpen,
      title: 'Content Organization',
      description: 'Organize your knowledge with collections, tags, and smart categorization.',
      benefits: ['Custom collections', 'Auto-tagging', 'Nested folders', 'Smart sorting'],
      category: 'Core'
    },
    {
      icon: Archive,
      title: 'Universal Saving',
      description: 'Save content from anywhere - web pages, documents, notes, and more.',
      benefits: ['Browser extension', 'Mobile app', 'API integration', 'Bulk import'],
      category: 'Core'
    },
    {
      icon: Tags,
      title: 'Smart Tagging',
      description: 'Automatically tag and categorize your content for better organization.',
      benefits: ['AI auto-tagging', 'Custom tags', 'Tag suggestions', 'Bulk tagging'],
      category: 'Advanced'
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform Sync',
      description: 'Access your knowledge library from any device, anywhere.',
      benefits: ['Real-time sync', 'Offline access', 'Mobile apps', 'Web interface'],
      category: 'Core'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your data is encrypted and secure with enterprise-grade protection.',
      benefits: ['End-to-end encryption', 'GDPR compliant', 'Secure sharing', 'Data export'],
      category: 'Core'
    },
    {
      icon: Zap,
      title: 'Quick Actions',
      description: 'Streamline your workflow with keyboard shortcuts and quick commands.',
      benefits: ['Keyboard shortcuts', 'Quick save', 'Batch operations', 'Command palette'],
      category: 'Advanced'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share knowledge and collaborate with your team seamlessly.',
      benefits: ['Shared collections', 'Team workspaces', 'Permission controls', 'Activity feeds'],
      category: 'Pro'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Understand your knowledge patterns with detailed analytics.',
      benefits: ['Usage statistics', 'Content insights', 'Search analytics', 'Team metrics'],
      category: 'Pro'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Core': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Advanced': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Pro': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <>
      <Helmet>
        <title>Features - Accio Knowledge Library</title>
        <meta name="description" content="Discover all the powerful features that make Accio the perfect knowledge management solution for individuals and teams." />
      </Helmet>

      <div className={cn(
        "min-h-screen bg-background",
        preferences.highContrast && 'contrast-more'
      )}>
        
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className={cn(
                "text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight",
                preferences.reducedMotion ? '' : 'animate-fade-in'
              )}>
                Powerful Features for
                <span className="text-primary block">Knowledge Management</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Everything you need to capture, organize, and find your knowledge. 
                From simple note-taking to advanced team collaboration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link to="/register">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Everything You Need
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive features designed to make knowledge management effortless and efficient.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={feature.title}
                  className={cn(
                    "h-full hover:shadow-lg transition-all duration-300 border-border/50",
                    preferences.reducedMotion ? '' : 'hover:scale-[1.02]'
                  )}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <Badge className={getCategoryColor(feature.category)}>
                        {feature.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-semibold mb-2">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2" role="list">
                      {feature.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" aria-hidden="true" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-accent/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto">
              <Star className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of users who have transformed their knowledge management with Accio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link to="/register">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Features;
