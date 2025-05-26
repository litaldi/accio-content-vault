
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedUnifiedLayout from '@/components/layout/EnhancedUnifiedLayout';
import { UnifiedTypography, UnifiedSpacing } from '@/components/ui/unified-design-system';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, Tag, BarChart3, Shield, Zap, Brain, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Find anything in your knowledge library instantly with AI-powered search that understands context and meaning.",
      benefits: ["Natural language queries", "Content summarization", "Relevant suggestions"]
    },
    {
      icon: BookOpen,
      title: "Content Organization",
      description: "Automatically organize your saved content with intelligent tagging and categorization.",
      benefits: ["Auto-tagging", "Smart collections", "Duplicate detection"]
    },
    {
      icon: Tag,
      title: "Advanced Tagging",
      description: "Create and manage tags with hierarchical organization and bulk operations.",
      benefits: ["Hierarchical tags", "Bulk editing", "Tag suggestions"]
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track your learning patterns and discover insights about your knowledge consumption.",
      benefits: ["Usage analytics", "Learning trends", "Content insights"]
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Your data is encrypted and secure. Full control over your privacy settings.",
      benefits: ["End-to-end encryption", "Privacy controls", "Data export"]
    },
    {
      icon: Zap,
      title: "Quick Capture",
      description: "Save content from anywhere with our browser extension and mobile apps.",
      benefits: ["Browser extension", "Mobile apps", "Offline access"]
    },
    {
      icon: Brain,
      title: "AI Assistant",
      description: "Get help organizing, summarizing, and connecting your knowledge with AI assistance.",
      benefits: ["Content summaries", "Connection suggestions", "Q&A"]
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Share collections and collaborate with teams while maintaining privacy.",
      benefits: ["Shared collections", "Team workspaces", "Permission controls"]
    }
  ];

  return (
    <EnhancedUnifiedLayout>
      <Helmet>
        <title>Features - Accio Knowledge Library</title>
        <meta name="description" content="Discover all the powerful features that make Accio the best knowledge management platform for professionals and teams." />
      </Helmet>

      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          {/* Hero Section */}
          <div className="text-center mb-16">
            <UnifiedTypography.H1 className="mb-4">
              Powerful Features for Your Knowledge
            </UnifiedTypography.H1>
            <UnifiedTypography.Lead className="max-w-2xl mx-auto">
              Everything you need to capture, organize, and retrieve your digital knowledge efficiently.
            </UnifiedTypography.Lead>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
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

          {/* CTA Section */}
          <div className="text-center bg-muted/50 rounded-2xl p-8">
            <UnifiedTypography.H2 className="mb-4">
              Ready to Transform Your Knowledge Management?
            </UnifiedTypography.H2>
            <UnifiedTypography.Body className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join thousands of professionals who use Accio to organize their digital knowledge and boost productivity.
            </UnifiedTypography.Body>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/register">Get Started Free</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>
    </EnhancedUnifiedLayout>
  );
};

export default Features;
