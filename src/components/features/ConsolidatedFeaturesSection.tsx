
import React from 'react';
import { Brain, Search, Tag, BarChart3, Share2, Zap, Shield, Users, CheckCircle } from 'lucide-react';
import { Typography, Layout, Card } from '@/components/design-system/DesignSystem';
import { Badge } from '@/components/ui/badge';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Link } from 'react-router-dom';

const ConsolidatedFeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Automatically categorize and tag your content with advanced AI algorithms that understand context and meaning.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Search,
      title: "Smart Search & Discovery",
      description: "Find exactly what you need with semantic search that understands intent, not just keywords.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Tag,
      title: "Intelligent Tagging",
      description: "Smart categorization system that learns from your behavior and suggests relevant tags automatically.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track your learning patterns and content engagement with detailed analytics and progress reports.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Share2,
      title: "Seamless Integration",
      description: "Connect with your favorite tools and platforms to create a unified knowledge ecosystem.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Your data is encrypted and securely stored with enterprise-grade security measures.",
      color: "from-green-600 to-teal-600"
    }
  ];

  const benefits = [
    "Unlimited content saving and organization",
    "AI-powered content analysis and insights", 
    "Advanced semantic search capabilities",
    "Detailed analytics and learning patterns",
    "Export to popular productivity tools",
    "Cross-platform access on all devices"
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager at TechCorp",
      content: "Accio has completely transformed how I organize research. The AI tagging is incredibly accurate and saves me hours of manual work every week.",
      avatar: "SC",
      rating: 5
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Research Scientist",
      content: "The semantic search is a game-changer for academic research. I can find relevant content even when I don't remember the exact keywords I used.",
      avatar: "MR", 
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Knowledge Manager",
      content: "Perfect for managing organizational knowledge. The analytics help us track information usage patterns and identify knowledge gaps.",
      avatar: "EW",
      rating: 5
    }
  ];

  return (
    <>
      {/* Features Section */}
      <Layout.Section spacing="lg" background="muted">
        <Layout.Container>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Zap className="h-3 w-3 mr-2" />
              Powerful Features
            </Badge>
            <Typography.H2>
              Everything you need for modern knowledge management
            </Typography.H2>
            <Typography.Lead className="max-w-3xl mx-auto">
              Discover the intelligent features that make Accio the ultimate platform for capturing, 
              organizing, and rediscovering your most valuable information.
            </Typography.Lead>
          </div>

          <Layout.Grid columns={3} gap="lg">
            {features.map((feature, index) => (
              <Card.Root key={index} hover className="h-full group">
                <Card.Header>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <Typography.H3 className="group-hover:text-primary transition-colors">
                    {feature.title}
                  </Typography.H3>
                </Card.Header>
                <Card.Content>
                  <Typography.Body className="text-muted-foreground">
                    {feature.description}
                  </Typography.Body>
                </Card.Content>
              </Card.Root>
            ))}
          </Layout.Grid>
        </Layout.Container>
      </Layout.Section>

      {/* Benefits Section */}
      <Layout.Section spacing="lg">
        <Layout.Container>
          <Layout.Grid columns={2} gap="lg" className="items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                <CheckCircle className="h-3 w-3 mr-2" />
                Key Benefits
              </Badge>
              <Typography.H2 className="mb-6">
                Why choose Accio for your knowledge management?
              </Typography.H2>
              <Typography.Body className="text-muted-foreground mb-8">
                Accio combines cutting-edge AI technology with intuitive design to create 
                the ultimate knowledge management experience for modern professionals.
              </Typography.Body>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <Typography.Body className="mb-0">{benefit}</Typography.Body>
                  </div>
                ))}
              </div>

              <EnhancedButton asChild intent="primary" size="lg">
                <Link to="/features">
                  Explore All Features
                  <Search className="ml-2 h-4 w-4" />
                </Link>
              </EnhancedButton>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl" />
              <Card.Root className="relative z-10">
                <Card.Content className="p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                      <Typography.Caption>Items Organized</Typography.Caption>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">95%</div>
                      <Typography.Caption>Search Accuracy</Typography.Caption>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">5h</div>
                      <Typography.Caption>Time Saved Weekly</Typography.Caption>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                      <Typography.Caption>Global Access</Typography.Caption>
                    </div>
                  </div>
                </Card.Content>
              </Card.Root>
            </div>
          </Layout.Grid>
        </Layout.Container>
      </Layout.Section>

      {/* Testimonials Section */}
      <Layout.Section spacing="lg" background="muted">
        <Layout.Container>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Users className="h-3 w-3 mr-2" />
              Customer Stories
            </Badge>
            <Typography.H2>
              Trusted by knowledge workers worldwide
            </Typography.H2>
            <Typography.Lead className="max-w-3xl mx-auto">
              See how professionals across industries use Accio to transform their knowledge management 
              and boost their productivity.
            </Typography.Lead>
          </div>
          
          <Layout.Grid columns={3} gap="lg">
            {testimonials.map((testimonial, index) => (
              <Card.Root key={index}>
                <Card.Content className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                  <Typography.Body className="text-muted-foreground mb-6">
                    "{testimonial.content}"
                  </Typography.Body>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <Typography.Caption>{testimonial.role}</Typography.Caption>
                    </div>
                  </div>
                </Card.Content>
              </Card.Root>
            ))}
          </Layout.Grid>
        </Layout.Container>
      </Layout.Section>

      {/* Final CTA */}
      <Layout.Section spacing="lg">
        <Layout.Container>
          <div className="text-center max-w-3xl mx-auto">
            <Brain className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse" />
            <Typography.H2 className="mb-6">
              Ready to transform your knowledge management?
            </Typography.H2>
            <Typography.Lead className="mb-8">
              Join thousands of professionals who have revolutionized their information management. 
              Start building your knowledge empire today.
            </Typography.Lead>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton asChild intent="primary" size="lg" className="group">
                <Link to="/register">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </EnhancedButton>
              
              <EnhancedButton asChild variant="outline" size="lg">
                <Link to="/contact">
                  Talk to Sales
                </Link>
              </EnhancedButton>
            </div>
            
            <Typography.Caption className="mt-6 text-muted-foreground">
              No credit card required • 14-day free trial • Cancel anytime
            </Typography.Caption>
          </div>
        </Layout.Container>
      </Layout.Section>
    </>
  );
};

export default ConsolidatedFeaturesSection;
