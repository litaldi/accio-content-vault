
import React from 'react';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Typography, Spacing, animations } from '@/components/ui/design-system';
import { 
  Brain, 
  Search, 
  BookOpen, 
  TrendingUp, 
  Shield,
  Zap,
  Target,
  Users,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Knowledge Processing",
      description: "Transform any content into organized, searchable insights with advanced AI that understands context and meaning.",
      benefits: ["Natural language processing", "Auto-categorization", "Smart tagging", "Content summarization"],
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Search,
      title: "Intelligent Search & Discovery",
      description: "Find exactly what you need with semantic search that understands intent, not just keywords.",
      benefits: ["Semantic search", "Visual similarity", "Context awareness", "Instant results"],
      color: "from-green-500 to-blue-500"
    },
    {
      icon: BookOpen,
      title: "Smart Organization System",
      description: "Create collections that automatically grow and organize themselves as you add more content.",
      benefits: ["Auto-organization", "Smart collections", "Tag suggestions", "Content relationships"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Learning Analytics & Insights",
      description: "Track your knowledge growth with detailed analytics and personalized recommendations.",
      benefits: ["Progress tracking", "Learning patterns", "Knowledge gaps", "Smart recommendations"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const additionalFeatures = [
    { icon: Shield, title: "Enterprise Security", description: "Bank-level encryption and privacy protection" },
    { icon: Zap, title: "Lightning Fast", description: "Sub-second search across millions of items" },
    { icon: Target, title: "99.9% Accuracy", description: "Precision AI processing with human-level understanding" },
    { icon: Users, title: "Team Collaboration", description: "Share knowledge and collaborate seamlessly" }
  ];

  return (
    <UnifiedPageLayout
      title="Features - Powerful AI Knowledge Tools | Accio"
      description="Discover Accio's powerful features: AI-powered knowledge processing, intelligent search, smart organization, and learning analytics."
    >
      {/* Hero Section */}
      <Spacing.Section size="lg" className="bg-gradient-to-br from-primary/10 to-background">
        <Spacing.Container>
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className={`mb-6 ${animations.fadeIn}`}>
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by Advanced AI
            </Badge>
            
            <Typography.H1 className={animations.slideUp}>
              Features That Transform
              <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent"> Knowledge Work</span>
            </Typography.H1>
            
            <Typography.Lead className={animations.slideUp}>
              Discover the powerful capabilities that make Accio the ultimate 
              knowledge management platform for modern professionals.
            </Typography.Lead>
          </div>
        </Spacing.Container>
      </Spacing.Section>

      {/* Main Features */}
      <Spacing.Section>
        <Spacing.Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <div key={index} className={`bg-card border rounded-xl p-6 ${animations.hoverLift}`}>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <Typography.H3 className="text-2xl font-bold mb-4">{feature.title}</Typography.H3>
                <Typography.Body className="text-muted-foreground leading-relaxed mb-6">{feature.description}</Typography.Body>
                
                <div className="space-y-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Spacing.Container>
      </Spacing.Section>

      {/* Additional Features */}
      <Spacing.Section className="bg-gradient-to-br from-primary/5 to-background">
        <Spacing.Container>
          <div className="text-center mb-16">
            <Typography.H2>
              Built for Performance & Scale
            </Typography.H2>
            <Typography.Body className="text-lg">
              Enterprise-grade capabilities that grow with your needs.
            </Typography.Body>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className={`text-center ${animations.hoverLift}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <Typography.H3 className="text-lg font-semibold mb-2">{feature.title}</Typography.H3>
                <Typography.Body className="text-sm text-muted-foreground">{feature.description}</Typography.Body>
              </div>
            ))}
          </div>
        </Spacing.Container>
      </Spacing.Section>

      {/* CTA Section */}
      <Spacing.Section>
        <Spacing.Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-3xl p-12 border border-primary/10">
              <Typography.H2 className="mb-4">
                Ready to experience the future of knowledge management?
              </Typography.H2>
              
              <Typography.Body className="text-lg mb-8">
                Join thousands of professionals who've transformed their productivity with Accio's powerful features.
              </Typography.Body>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" className="group" asChild>
                  <Link to="/register">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button variant="outline" size="xl" asChild>
                  <Link to="/contact">
                    Schedule Demo
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Spacing.Container>
      </Spacing.Section>
    </UnifiedPageLayout>
  );
};

export default Features;
