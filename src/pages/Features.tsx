
import React from 'react';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { UnifiedTypography } from '@/components/ui/unified-design-system';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  Brain, 
  Zap, 
  Shield, 
  Globe,
  ArrowRight,
  Check
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Automatically categorize and tag your content using advanced machine learning algorithms.",
      benefits: ["Smart tagging", "Auto-categorization", "Content insights"]
    },
    {
      icon: Search,
      title: "Intelligent Search",
      description: "Find anything instantly with semantic search that understands context and meaning.",
      benefits: ["Natural language queries", "Instant results", "Context-aware search"]
    },
    {
      icon: Zap,
      title: "Quick Capture",
      description: "Save content from anywhere with our browser extension and mobile apps.",
      benefits: ["One-click saving", "Cross-platform sync", "Offline access"]
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is encrypted and secure. We never sell your information to third parties.",
      benefits: ["End-to-end encryption", "Privacy controls", "Data ownership"]
    },
    {
      icon: Globe,
      title: "Universal Access",
      description: "Access your knowledge library from any device, anywhere in the world.",
      benefits: ["Cloud sync", "Mobile apps", "Web access"]
    },
    {
      icon: Sparkles,
      title: "Smart Recommendations",
      description: "Discover relevant content and connections you might have missed.",
      benefits: ["Content discovery", "Smart connections", "Personalized insights"]
    }
  ];

  return (
    <UnifiedLayout>
      <SEOHead
        title="Features - Accio AI Knowledge Engine"
        description="Discover how Accio's AI-powered features help you organize, search, and access your digital knowledge more effectively than ever before."
        keywords="AI features, knowledge management, smart search, content organization, digital workspace"
      />

      <div className="py-16 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <UnifiedTypography.H1 className="text-4xl lg:text-5xl font-bold">
            Powerful Features for
            <span className="text-primary"> Modern Knowledge Work</span>
          </UnifiedTypography.H1>
          <UnifiedTypography.Body className="text-xl text-muted-foreground">
            Transform how you capture, organize, and retrieve information with AI-powered tools 
            designed for the way you work today.
          </UnifiedTypography.Body>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 bg-muted/30 rounded-2xl p-12">
          <UnifiedTypography.H2 className="text-3xl font-bold">
            Ready to Transform Your Knowledge Workflow?
          </UnifiedTypography.H2>
          <UnifiedTypography.Body className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who have already revolutionized how they manage 
            and access their digital knowledge.
          </UnifiedTypography.Body>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group">
              <Link to="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default Features;
