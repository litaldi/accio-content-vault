
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography, Layout, Card } from '@/components/design-system/DesignSystem';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Search, 
  Tags, 
  BookOpen, 
  Zap, 
  Shield, 
  Smartphone, 
  Globe,
  Star,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features: React.FC = () => {
  const coreFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Organization',
      description: 'Automatically categorize and tag your content using advanced AI technology.',
      benefits: ['Smart categorization', 'Auto-tagging', 'Content analysis']
    },
    {
      icon: Search,
      title: 'Semantic Search',
      description: 'Find anything instantly with AI-powered semantic search that understands context.',
      benefits: ['Natural language queries', 'Context understanding', 'Instant results']
    },
    {
      icon: Tags,
      title: 'Smart Tagging System',
      description: 'Organize your knowledge with intelligent tagging and hierarchical organization.',
      benefits: ['Auto-generated tags', 'Custom categories', 'Tag suggestions']
    },
    {
      icon: BookOpen,
      title: 'Knowledge Graph',
      description: 'Visualize connections between your saved content and discover new insights.',
      benefits: ['Visual connections', 'Insight discovery', 'Relationship mapping']
    }
  ];

  const advancedFeatures = [
    {
      icon: Zap,
      title: 'Quick Capture',
      description: 'Save content from anywhere with our browser extension and mobile apps.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is encrypted and secure. We never sell or share your information.'
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform',
      description: 'Access your knowledge base from any device, anywhere, anytime.'
    },
    {
      icon: Globe,
      title: 'Offline Access',
      description: 'Access your saved content even when you\'re offline.'
    }
  ];

  const useCases = [
    {
      title: 'Students & Researchers',
      description: 'Organize research papers, notes, and study materials with AI-powered insights.',
      icon: '🎓'
    },
    {
      title: 'Content Creators',
      description: 'Save inspiration, organize ideas, and never lose track of your creative process.',
      icon: '✨'
    },
    {
      title: 'Professionals',
      description: 'Build a personal knowledge base for work projects and career development.',
      icon: '💼'
    },
    {
      title: 'Lifelong Learners',
      description: 'Curate and organize learning materials across all your interests.',
      icon: '📚'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Features - Accio</title>
        <meta name="description" content="Discover Accio's powerful AI-driven features for knowledge management and organization." />
      </Helmet>

      {/* Hero Section */}
      <Layout.Section spacing="xl" background="primary">
        <Layout.Container size="lg" className="text-center">
          <Badge variant="outline" className="mb-6">
            <Star className="h-3 w-3 mr-2" />
            Powered by AI
          </Badge>
          
          <Typography.H1 className="mb-6">
            Features that make knowledge 
            <span className="block bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              management effortless
            </span>
          </Typography.H1>
          
          <Typography.Lead className="mb-8 max-w-3xl mx-auto">
            Discover how Accio transforms the way you save, organize, and rediscover information 
            with cutting-edge AI technology and intuitive design.
          </Typography.Lead>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EnhancedButton asChild size="lg">
              <Link to="/register">Start Free Trial</Link>
            </EnhancedButton>
            <EnhancedButton variant="outline" size="lg" asChild>
              <Link to="/demo">Try Demo</Link>
            </EnhancedButton>
          </div>
        </Layout.Container>
      </Layout.Section>

      {/* Core Features */}
      <Layout.Section spacing="xl">
        <Layout.Container size="lg">
          <div className="text-center mb-16">
            <Typography.H2 className="mb-4">Core Features</Typography.H2>
            <Typography.Lead>
              Everything you need to build and maintain your personal knowledge empire
            </Typography.Lead>
          </div>

          <Layout.Grid columns={2} gap="xl">
            {coreFeatures.map((feature, index) => (
              <Card.Root key={index} className="p-8 hover:shadow-lg transition-shadow">
                <Card.Content>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <Typography.H3 className="mb-3">{feature.title}</Typography.H3>
                      <Typography.Body className="text-muted-foreground mb-4">
                        {feature.description}
                      </Typography.Body>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card.Content>
              </Card.Root>
            ))}
          </Layout.Grid>
        </Layout.Container>
      </Layout.Section>

      {/* Advanced Features */}
      <Layout.Section spacing="xl" background="muted">
        <Layout.Container size="lg">
          <div className="text-center mb-16">
            <Typography.H2 className="mb-4">Advanced Capabilities</Typography.H2>
            <Typography.Lead>
              Professional-grade features for power users
            </Typography.Lead>
          </div>

          <Layout.Grid columns={4} gap="lg">
            {advancedFeatures.map((feature, index) => (
              <Card.Root key={index} className="text-center p-6">
                <Card.Content>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Typography.H3 className="mb-2 text-lg">{feature.title}</Typography.H3>
                  <Typography.Body className="text-sm text-muted-foreground">
                    {feature.description}
                  </Typography.Body>
                </Card.Content>
              </Card.Root>
            ))}
          </Layout.Grid>
        </Layout.Container>
      </Layout.Section>

      {/* Use Cases */}
      <Layout.Section spacing="xl">
        <Layout.Container size="lg">
          <div className="text-center mb-16">
            <Typography.H2 className="mb-4">Perfect For</Typography.H2>
            <Typography.Lead>
              Whether you're learning, creating, or working - Accio adapts to your needs
            </Typography.Lead>
          </div>

          <Layout.Grid columns={2} gap="lg">
            {useCases.map((useCase, index) => (
              <Card.Root key={index} className="p-6">
                <Card.Content>
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{useCase.icon}</span>
                    <div>
                      <Typography.H3 className="mb-2">{useCase.title}</Typography.H3>
                      <Typography.Body className="text-muted-foreground">
                        {useCase.description}
                      </Typography.Body>
                    </div>
                  </div>
                </Card.Content>
              </Card.Root>
            ))}
          </Layout.Grid>
        </Layout.Container>
      </Layout.Section>

      {/* CTA Section */}
      <Layout.Section spacing="xl" background="primary">
        <Layout.Container size="md" className="text-center">
          <Typography.H2 className="mb-4">Ready to get started?</Typography.H2>
          <Typography.Lead className="mb-8">
            Join thousands of users who have transformed their knowledge management with Accio.
          </Typography.Lead>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EnhancedButton size="lg" asChild>
              <Link to="/register">Start Your Free Trial</Link>
            </EnhancedButton>
            <EnhancedButton variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Sales</Link>
            </EnhancedButton>
          </div>
        </Layout.Container>
      </Layout.Section>
    </div>
  );
};

export default Features;
