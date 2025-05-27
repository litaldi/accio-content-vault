
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Typography, Layout, Card } from '@/components/design-system/DesignSystem';
import { Brain, Sparkles, Users, Shield, Clock, Play } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const ImprovedHeroSection: React.FC = () => {
  const { user } = useAuth();

  const trustIndicators = [
    { icon: Users, label: '10,000+ users', color: 'text-blue-500' },
    { icon: Shield, label: 'Enterprise security', color: 'text-green-500' },
    { icon: Clock, label: '99.9% uptime', color: 'text-purple-500' }
  ];

  const benefits = [
    {
      title: 'Save Everything',
      description: 'Capture articles, notes, and ideas from anywhere'
    },
    {
      title: 'AI Organization',
      description: 'Automatically categorize and tag your content'
    },
    {
      title: 'Smart Search',
      description: 'Find anything instantly with semantic search'
    }
  ];

  const socialProof = [
    {
      name: 'Sarah Chen',
      role: 'Product Manager',
      company: 'TechCorp',
      quote: 'Accio transformed how I manage information. I can find anything in seconds!'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Researcher',
      company: 'University',
      quote: 'The AI organization features save me hours every week.'
    }
  ];

  return (
    <Layout.Section spacing="xl" background="primary">
      <Layout.Container size="lg" className="text-center">
        {/* Badge */}
        <div className="mb-8 animate-fade-in">
          <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            <Sparkles className="h-3 w-3 mr-2" />
            AI-Powered Knowledge Engine
          </Badge>
        </div>

        {/* Main Headline */}
        <div className="mb-8 animate-fade-in">
          <Typography.H1 className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Transform scattered information into
            <span className="block bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              organized intelligence
            </span>
          </Typography.H1>
        </div>

        {/* Subheading */}
        <div className="mb-12 animate-fade-in">
          <Typography.Lead className="max-w-4xl mx-auto">
            Save, organize, and rediscover everything that matters. Accio's AI-powered platform 
            helps you build a personal knowledge empire that grows smarter with every interaction.
          </Typography.Lead>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in">
          <EnhancedButton 
            asChild
            intent="primary"
            size="lg"
            className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all group"
          >
            <Link to={user ? "/dashboard" : "/register"}>
              <Brain className="mr-2 h-5 w-5" />
              {user ? "Go to Dashboard" : "Start Free Trial"}
            </Link>
          </EnhancedButton>
          
          <EnhancedButton 
            asChild
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6 group"
          >
            <Link to="/features">
              <Play className="mr-2 h-4 w-4" />
              See How It Works
            </Link>
          </EnhancedButton>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-16 animate-fade-in">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <indicator.icon className={`h-4 w-4 ${indicator.color}`} aria-hidden="true" />
              <span>{indicator.label}</span>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <Layout.Grid columns={3} gap="lg">
            {benefits.map((benefit, index) => (
              <Card.Root key={index} className="text-center p-6">
                <Card.Content>
                  <Typography.H3 className="mb-2 text-lg">
                    {benefit.title}
                  </Typography.H3>
                  <Typography.Body className="text-muted-foreground text-sm">
                    {benefit.description}
                  </Typography.Body>
                </Card.Content>
              </Card.Root>
            ))}
          </Layout.Grid>
        </div>

        {/* Social Proof */}
        <div className="mb-16">
          <Layout.Grid columns={2} gap="lg">
            {socialProof.map((testimonial, index) => (
              <Card.Root key={index} className="text-left p-6">
                <Card.Content>
                  <Typography.Body className="mb-4 italic">
                    "{testimonial.quote}"
                  </Typography.Body>
                  <div>
                    <Typography.Caption className="font-medium">
                      {testimonial.name}
                    </Typography.Caption>
                    <Typography.Caption className="text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </Typography.Caption>
                  </div>
                </Card.Content>
              </Card.Root>
            ))}
          </Layout.Grid>
        </div>

        {/* Demo Account Notice */}
        {!user && (
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800 max-w-2xl mx-auto animate-fade-in">
            <Typography.Caption className="text-blue-700 dark:text-blue-300">
              <strong>Try the demo:</strong> Email: demo@yourapp.com | Password: Demo1234!
            </Typography.Caption>
          </div>
        )}
      </Layout.Container>
    </Layout.Section>
  );
};

export default ImprovedHeroSection;
